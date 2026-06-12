// admin.js - Dashboard de administración

const SUPABASE_URL = "https://grkjhzkgcmackbafqudu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2poemtnY21hY2tiYWZxdWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjg5MzQsImV4cCI6MjA5NjcwNDkzNH0.2nVTRlhey6HkGs_KZxtCaEp8L2QrvD0NUwY8ZFwZVHY";
supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let weeklyChart = null;
let moduleTimeChart = null;
let eventsChart = null;

// ==================== HELPERS ====================
function formatTime(seconds) {
    if (!seconds || seconds <= 0) return '—';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
    return `${(seconds / 3600).toFixed(1)}h`;
}

function getUserLabel(emailOrId) {
    if (!emailOrId) return 'Docente';
    if (emailOrId.includes('@')) return emailOrId.split('@')[0];
    return emailOrId.substring(0, 8) + '…';
}

// ==================== AUTH ====================
async function checkAdminAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = '/admin-login.html'; return false; }
    currentUser = session.user;
    if (!['profebillio@gmail.com'].includes(currentUser.email)) {
        alert('Acceso denegado');
        await supabase.auth.signOut();
        window.location.href = '/';
        return false;
    }
    document.querySelectorAll('[id^="adminEmail"]').forEach(el => el.innerText = currentUser.email);
    return true;
}

// ==================== DASHBOARD ====================
async function loadDashboardStats() {
    try {
        const { data: allProgress } = await supabase
            .from('progress')
            .select('user_id, email, xp, level, streak, completed_cards, updated_at')
            .order('xp', { ascending: false });

        document.getElementById('weeklyUsers').innerText = allProgress?.length || 0;
        const totalCards = allProgress?.reduce((acc, u) => acc + (u.completed_cards?.length || 0), 0) || 0;
        document.getElementById('totalCardsCompleted').innerText = totalCards;

        // Tiempo promedio desde resource_views
        const { data: rvData } = await supabase
            .from('resource_views')
            .select('time_spent_seconds')
            .not('time_spent_seconds', 'is', null);

        const avgSeconds = rvData?.length
            ? rvData.reduce((a, b) => a + (b.time_spent_seconds || 0), 0) / rvData.length
            : 0;
        document.getElementById('avgTime').innerText = avgSeconds > 0 ? formatTime(Math.round(avgSeconds)) : 'Sin datos';

        // NPS desde feedback
        const { data: feedbackData } = await supabase.from('feedback').select('nps');
        if (feedbackData?.length) {
            const promoters  = feedbackData.filter(f => f.nps >= 9).length;
            const detractors = feedbackData.filter(f => f.nps <= 6).length;
            const nps = Math.round(((promoters - detractors) / feedbackData.length) * 100);
            document.getElementById('globalNps').innerHTML = `${nps}<span class="text-base font-normal text-slate-400">/100</span>`;
        } else {
            document.getElementById('globalNps').innerText = 'N/A';
        }

        // Gráfico XP por usuario
        if (weeklyChart) weeklyChart.destroy();
        const ctx = document.getElementById('weeklyChart')?.getContext('2d');
        if (ctx && allProgress?.length) {
            const top10 = allProgress.slice(0, 10);
            weeklyChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: top10.map(u => getUserLabel(u.email || u.user_id)),
                    datasets: [{
                        label: 'XP',
                        data: top10.map(u => u.xp || 0),
                        backgroundColor: '#818cf8',
                        borderRadius: 6
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#f8fafc' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        } else if (ctx) {
            ctx.canvas.parentElement.innerHTML = '<p class="text-slate-400 text-sm text-center py-8">Sin datos de XP aún</p>';
        }

        // Top recursos por tiempo
        const { data: topRV } = await supabase
            .from('resource_views')
            .select('resource_id, time_spent_seconds')
            .order('time_spent_seconds', { ascending: false })
            .limit(5);

        const topContainer = document.getElementById('topResources');
        if (topContainer) {
            topContainer.innerHTML = topRV?.length
                ? topRV.map(r => `
                    <div class="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-500">${r.resource_id}</div>
                            <span class="text-sm text-slate-600">Tarjeta ${r.resource_id}</span>
                        </div>
                        <span class="text-sm font-bold text-indigo-600">⏱ ${formatTime(r.time_spent_seconds)}</span>
                    </div>`).join('')
                : '<p class="text-slate-400 text-sm text-center py-6">Sin datos de tiempo aún</p>';
        }

        // Actividad reciente
        await loadRecentActivity(allProgress);

    } catch(e) { console.error('Dashboard error:', e); }
}

async function loadRecentActivity(progressData) {
    const container = document.getElementById('recentActivity');
    if (!container) return;

    // Map user_id → email desde progressData
    const emailMap = {};
    progressData?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email; });

    const { data: rvActivity } = await supabase
        .from('resource_views')
        .select('resource_id, time_spent_seconds, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(8);

    if (rvActivity?.length) {
        container.innerHTML = `<table class="w-full text-sm">
            <thead><tr class="text-xs text-slate-400 uppercase tracking-wide">
                <th class="text-left pb-3 pr-4">Docente</th>
                <th class="text-left pb-3 pr-4">Tarjeta</th>
                <th class="text-left pb-3 pr-4">Tiempo</th>
                <th class="text-left pb-3">Fecha</th>
            </tr></thead>
            <tbody>${rvActivity.map(v => `
            <tr class="border-t border-slate-50">
                <td class="py-2.5 pr-4 text-slate-600 font-medium">${getUserLabel(emailMap[v.user_id] || v.user_id)}</td>
                <td class="py-2.5 pr-4 text-slate-500">Tarjeta ${v.resource_id}</td>
                <td class="py-2.5 pr-4 font-semibold text-indigo-600">${formatTime(v.time_spent_seconds)}</td>
                <td class="py-2.5 text-slate-400 text-xs">${new Date(v.created_at).toLocaleString('es', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
            </tr>`).join('')}</tbody>
        </table>`;
    } else if (progressData?.length) {
        // Fallback: mostrar últimas entradas del progreso
        container.innerHTML = `<table class="w-full text-sm">
            <thead><tr class="text-xs text-slate-400 uppercase tracking-wide">
                <th class="text-left pb-3 pr-4">Docente</th>
                <th class="text-left pb-3 pr-4">XP</th>
                <th class="text-left pb-3 pr-4">Tarjetas</th>
                <th class="text-left pb-3">Última actividad</th>
            </tr></thead>
            <tbody>${progressData.slice(0,8).map(u => `
            <tr class="border-t border-slate-50">
                <td class="py-2.5 pr-4 font-medium text-slate-700">${getUserLabel(u.email || u.user_id)}<div class="text-xs text-slate-400">${u.email || ''}</div></td>
                <td class="py-2.5 pr-4 font-bold text-amber-600">⭐ ${u.xp || 0}</td>
                <td class="py-2.5 pr-4 text-slate-600">${u.completed_cards?.length || 0}</td>
                <td class="py-2.5 text-slate-400 text-xs">${u.updated_at ? new Date(u.updated_at).toLocaleString('es', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '—'}</td>
            </tr>`).join('')}</tbody>
        </table>`;
    } else {
        container.innerHTML = '<p class="text-slate-400 text-sm text-center py-6">Sin actividad registrada aún.</p>';
    }
}

// ==================== COURSES ====================
async function loadCourses() {
    const container = document.getElementById('coursesList');
    if (!container) return;

    const staticCourse = {
        id: 'steam-static',
        title: '📚 Curso STEAM para Docentes',
        slug: 'curso-steam',
        description: 'Formación profesional en metodología STEAM. 5 módulos, 73 tarjetas, examen final con certificado.',
        isStatic: true
    };

    const { data: dbCourses } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    const allCourses = [staticCourse, ...(dbCourses || [])];

    container.innerHTML = allCourses.map(c => `
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap mb-1">
                        <h3 class="font-bold text-slate-800">${c.title}</h3>
                        ${c.isStatic ? '<span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">Principal</span>' : ''}
                    </div>
                    <p class="text-xs text-slate-400">slug: ${c.slug}</p>
                    ${c.description ? `<p class="text-sm text-slate-500 mt-2">${c.description}</p>` : ''}
                    ${c.isStatic ? '<p class="text-xs text-amber-600 mt-2 bg-amber-50 rounded-lg px-3 py-1.5 inline-block">⚠️ Contenido (tarjetas) fijo en data.js — aquí puedes editar solo la metadata visible.</p>' : ''}
                </div>
                <div class="flex gap-2 shrink-0 flex-wrap justify-end">
                    <button data-course='${JSON.stringify(c).replace(/'/g,"&#39;")}' class="edit-course-btn bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition border border-slate-200">
                        <i class="fas fa-edit mr-1"></i>Editar
                    </button>
                    ${!c.isStatic ? `<button data-id="${c.id}" class="delete-course-btn bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-xs font-semibold transition border border-red-100"><i class="fas fa-trash mr-1"></i>Eliminar</button>` : ''}
                </div>
            </div>
        </div>`).join('');

    document.querySelectorAll('.edit-course-btn').forEach(btn =>
        btn.addEventListener('click', () => {
            try {
                const course = JSON.parse(btn.dataset.course.replace(/&#39;/g, "'"));
                openCourseModal(course);
            } catch(e) { console.error('Parse error:', e); }
        })
    );
    document.querySelectorAll('.delete-course-btn').forEach(btn =>
        btn.addEventListener('click', async () => {
            if (confirm('¿Eliminar este curso?')) {
                const { error } = await supabase.from('courses').delete().eq('id', btn.dataset.id);
                if (error) alert(`Error: ${error.message}`);
                else loadCourses();
            }
        })
    );
}

// ==================== USERS ====================
async function loadUsers() {
    const { data: users, error } = await supabase
        .from('progress')
        .select('user_id, email, xp, level, streak, completed_cards, updated_at')
        .order('xp', { ascending: false });

    const container = document.getElementById('usersTable');
    if (!container) return;

    if (error || !users?.length) {
        container.innerHTML = '<div class="text-slate-400 p-8 text-center text-sm">No hay usuarios registrados aún.</div>';
        return;
    }

    container.innerHTML = `<table class="w-full text-sm">
        <thead class="bg-slate-50 border-b border-slate-100">
            <tr>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Docente</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">XP</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nivel</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tarjetas</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Racha</th>
                <th class="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Última actividad</th>
            </tr>
        </thead>
        <tbody>${users.map(u => `
        <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition">
            <td class="px-5 py-3">
                <p class="font-semibold text-slate-700">${getUserLabel(u.email || u.user_id)}</p>
                <p class="text-xs text-slate-400 mt-0.5">${u.email || '(email pendiente — sincroniza el progreso)'}</p>
            </td>
            <td class="px-5 py-3 font-bold text-amber-600">⭐ ${u.xp || 0}</td>
            <td class="px-5 py-3 text-slate-600">Nv. ${u.level || 1}</td>
            <td class="px-5 py-3 text-slate-600">${u.completed_cards?.length || 0}</td>
            <td class="px-5 py-3">🔥 ${u.streak || 0}d</td>
            <td class="px-5 py-3 text-slate-400 text-xs">${u.updated_at ? new Date(u.updated_at).toLocaleDateString('es') : '—'}</td>
        </tr>`).join('')}</tbody>
    </table>`;
}

// ==================== FEEDBACK ====================
async function loadFeedback() {
    const { data: feedback } = await supabase.from('feedback').select('*').order('created_at', { ascending: false });
    const container = document.getElementById('feedbackList');
    if (!container) return;
    if (!feedback?.length) {
        container.innerHTML = '<div class="bg-white rounded-2xl p-8 text-slate-400 text-sm text-center border border-slate-100">No hay feedback aún.</div>';
        return;
    }
    container.innerHTML = feedback.map(f => `
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div class="flex items-start justify-between gap-3 flex-wrap">
                <div>
                    <p class="font-semibold text-slate-800">Módulo ${f.module_id}${f.module_name ? ` — ${f.module_name}` : ''}</p>
                    <p class="text-xs text-slate-400 mt-0.5">${new Date(f.created_at).toLocaleString('es')}</p>
                </div>
                <div class="flex gap-2">
                    <span class="bg-amber-50 text-amber-600 font-semibold px-2.5 py-1 rounded-lg text-xs">⭐ ${f.rating}/5</span>
                    <span class="bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-lg text-xs">NPS: ${f.nps}</span>
                </div>
            </div>
            ${f.comment ? `<p class="mt-3 text-sm text-slate-600 bg-slate-50 rounded-xl p-3 italic">"${f.comment}"</p>` : ''}
        </div>`).join('');
}

// ==================== ANALYTICS ====================
async function loadAnalyticsDetail() {
    // Gráfico 1: Tiempo por módulo
    const { data: rvData } = await supabase.from('resource_views').select('resource_id, time_spent_seconds');
    const moduleTimes = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    rvData?.forEach(r => {
        const mod = parseInt(r.resource_id?.split('-')[0]);
        if (mod >= 1 && mod <= 5) moduleTimes[mod].push(r.time_spent_seconds || 0);
    });
    const avgByModule = [1,2,3,4,5].map(m =>
        moduleTimes[m].length ? Math.round(moduleTimes[m].reduce((a,b) => a+b,0) / moduleTimes[m].length) : 0
    );

    if (moduleTimeChart) moduleTimeChart.destroy();
    const ctx = document.getElementById('moduleTimeChart')?.getContext('2d');
    if (ctx) {
        moduleTimeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Módulo 1','Módulo 2','Módulo 3','Módulo 4','Módulo 5'],
                datasets: [{ label: 'Seg. promedio', data: avgByModule, backgroundColor: '#818cf8', borderRadius: 6 }]
            },
            options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: '#f8fafc' } }, x: { grid: { display: false } } } }
        });
    }

    // Gráfico 2: Distribución
    const { data: progressData } = await supabase.from('progress').select('completed_cards, quiz_correct_count, badges, xp');
    const totalCardsD  = progressData?.reduce((a,u) => a+(u.completed_cards?.length||0), 0) || 0;
    const totalQuizzes = progressData?.reduce((a,u) => a+(u.quiz_correct_count||0), 0) || 0;
    const totalBadges  = progressData?.reduce((a,u) => a+(u.badges?.length||0), 0) || 0;
    const totalUsersD  = progressData?.length || 0;

    if (eventsChart) eventsChart.destroy();
    const eventsCtx = document.getElementById('eventsChart')?.getContext('2d');
    if (eventsCtx) {
        eventsChart = new Chart(eventsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Tarjetas completadas','Quizzes correctos','Logros desbloqueados','Usuarios activos'],
                datasets: [{ data: [totalCardsD, totalQuizzes, totalBadges, totalUsersD], backgroundColor: ['#818cf8','#34d399','#fbbf24','#a78bfa'], borderWidth: 2, borderColor: '#fff' }]
            },
            options: { plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
        });
    }

    // Sesiones recientes — con email mapping
    const { data: recentViews } = await supabase
        .from('resource_views')
        .select('resource_id, time_spent_seconds, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(10);

    const { data: progEmails } = await supabase.from('progress').select('user_id, email');
    const emailMap = {};
    progEmails?.forEach(p => { if (p.email) emailMap[p.user_id] = p.email; });

    const sessionsTable = document.getElementById('sessionsTable');
    if (sessionsTable) {
        sessionsTable.innerHTML = recentViews?.length
            ? `<table class="w-full text-sm">
                <thead><tr class="text-xs text-slate-400 uppercase tracking-wide">
                    <th class="text-left pb-3 pr-4">Docente</th>
                    <th class="text-left pb-3 pr-4">Tarjeta</th>
                    <th class="text-left pb-3 pr-4">Tiempo</th>
                    <th class="text-left pb-3">Fecha</th>
                </tr></thead>
                <tbody>${recentViews.map(v => `
                <tr class="border-t border-slate-50">
                    <td class="py-2.5 pr-4 text-slate-600">${getUserLabel(emailMap[v.user_id] || v.user_id)}</td>
                    <td class="py-2.5 pr-4 font-medium text-slate-700">Tarjeta ${v.resource_id}</td>
                    <td class="py-2.5 pr-4 font-semibold text-indigo-600">${formatTime(v.time_spent_seconds)}</td>
                    <td class="py-2.5 text-slate-400 text-xs">${new Date(v.created_at).toLocaleString('es', {day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
                </tr>`).join('')}</tbody>
               </table>`
            : '<p class="text-slate-400 text-sm text-center py-6">Sin actividad en tarjetas registrada aún. Los docentes deben navegar el curso para que aparezca actividad aquí.</p>';
    }
}

// ==================== COURSE MODAL ====================
function openCourseModal(course = null) {
    const modal = document.getElementById('courseModal');
    const errorEl = document.getElementById('courseFormError');
    if (errorEl) errorEl.classList.add('hidden');

    if (course) {
        document.getElementById('modalTitle').innerText = course.isStatic ? 'Editar metadata del curso' : 'Editar Curso';
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseTitle').value = course.title || '';
        document.getElementById('courseSlug').value = course.slug || '';
        document.getElementById('courseDesc').value = course.description || '';
        document.getElementById('courseCover').value = course.cover_image || '';
        // Para el curso estático, el slug no se puede cambiar
        const slugField = document.getElementById('courseSlug');
        slugField.disabled = !!course.isStatic;
        slugField.classList.toggle('bg-slate-50', !!course.isStatic);
    } else {
        document.getElementById('modalTitle').innerText = 'Nuevo Curso';
        document.getElementById('courseForm').reset();
        document.getElementById('courseId').value = '';
        document.getElementById('courseSlug').disabled = false;
        document.getElementById('courseSlug').classList.remove('bg-slate-50');
    }
    modal.classList.remove('hidden');
}

document.getElementById('courseForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('courseFormError');
    if (errorEl) errorEl.classList.add('hidden');
    const saveBtn = document.getElementById('saveCourseBtn');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Guardando…'; }

    const id = document.getElementById('courseId').value;
    const payload = {
        title: document.getElementById('courseTitle').value.trim(),
        slug: document.getElementById('courseSlug').value.trim() || 'curso-steam',
        description: document.getElementById('courseDesc').value.trim(),
        cover_image: document.getElementById('courseCover').value.trim(),
        updated_at: new Date().toISOString()
    };

    let error;
    if (id === 'steam-static') {
        ({ error } = await supabase.from('courses').upsert(
            { ...payload, slug: 'curso-steam', created_by: currentUser.id },
            { onConflict: 'slug' }
        ));
    } else if (id) {
        ({ error } = await supabase.from('courses').update(payload).eq('id', id));
    } else {
        ({ error } = await supabase.from('courses').insert({ ...payload, created_by: currentUser.id }));
    }

    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Guardar'; }

    if (error) {
        if (errorEl) { errorEl.textContent = `Error: ${error.message}`; errorEl.classList.remove('hidden'); }
        return;
    }
    document.getElementById('courseModal').classList.add('hidden');
    loadCourses();
});

// ==================== NAV ====================
function switchView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const viewEl = document.getElementById(`${view}View`);
    if (viewEl) viewEl.classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-btn[data-view="${view}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    if (view === 'dashboard') loadDashboardStats();
    if (view === 'courses')   loadCourses();
    if (view === 'analytics') loadAnalyticsDetail();
    if (view === 'users')     loadUsers();
    if (view === 'feedback')  loadFeedback();
}

function closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('overlay')?.classList.add('hidden');
}

// ==================== EVENT LISTENERS ====================
document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => { switchView(btn.dataset.view); closeSidebar(); })
);

document.getElementById('menuBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('hidden');
});

document.getElementById('newCourseBtn')?.addEventListener('click', () => openCourseModal());
document.getElementById('closeModalBtn')?.addEventListener('click', () => document.getElementById('courseModal').classList.add('hidden'));
document.getElementById('cancelModalBtn')?.addEventListener('click', () => document.getElementById('courseModal').classList.add('hidden'));
document.getElementById('logoutAdminBtn')?.addEventListener('click', async () => { await supabase.auth.signOut(); window.location.href = '/'; });

document.getElementById('exportAllDataBtn')?.addEventListener('click', async () => {
    const tables = ['courses','feedback','progress','resource_views'];
    const allData = {};
    for (const table of tables) {
        const { data } = await supabase.from(table).select('*');
        allData[table] = data;
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `steam_backup_${new Date().toISOString().slice(0,10)}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
});

document.getElementById('resetAnalyticsBtn')?.addEventListener('click', async () => {
    if (confirm('¿Resetear analytics? Se eliminarán todos los eventos y vistas de tarjetas.')) {
        await supabase.from('user_events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('resource_views').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        alert('Analytics reseteados');
        loadDashboardStats();
    }
});

checkAdminAuth().then(ok => { if(ok) switchView('dashboard'); });
