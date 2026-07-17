// ============================================================
// reclutamiento.js — Panel de Reclutamiento STEEAM (solo-admin)
// ============================================================

const SUPABASE_URL = "https://grkjhzkgcmackbafqudu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2poemtnY21hY2tiYWZxdWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjg5MzQsImV4cCI6MjA5NjcwNDkzNH0.2nVTRlhey6HkGs_KZxtCaEp8L2QrvD0NUwY8ZFwZVHY";
const ADMIN_EMAILS  = ['billy@1bot.org'];

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let currentUser = null;
let candidatesCache = [];
let activeFilter = 'all';

const STATUS_LABELS = {
    aplicado: 'Aplicado',
    rechazado_filtro: 'Rechazado (filtro)',
    evaluacion_pendiente: 'Pendiente de evaluación',
    evaluado: 'Evaluado',
    contratado: 'Contratado',
    desertado: 'Desertó',
    rechazado: 'Rechazado',
};

function escapeHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function toast(msg, type = 'info') {
    alert(msg); // panel simple — sin sistema de toasts propio en esta página
}

// NOTA: este gate del lado cliente (ADMIN_EMAILS) es solo UX/redirección.
// El límite de seguridad real está en admin-users/index.ts, que valida
// user_roles.role === 'admin' del lado servidor con el JWT del caller.
async function checkAdminAuth() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { window.location.href = 'admin-login.html'; return false; }
    currentUser = session.user;

    if (!ADMIN_EMAILS.includes(currentUser.email)) {
        alert('Acceso denegado. Solo administradores pueden entrar.');
        await sb.auth.signOut();
        window.location.href = 'admin-login.html';
        return false;
    }
    document.getElementById('adminEmail').textContent = currentUser.email;
    return true;
}

async function callAdminUsers(body) {
    const { data: { session } } = await sb.auth.getSession();
    const token = session?.access_token;
    if (!token) throw new Error('No autenticado');
    const EDGE_URL = `${SUPABASE_URL}/functions/v1/admin-users`;
    const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `Error ${res.status}`);
    return json;
}

async function loadCandidates() {
    document.getElementById('tableWrap').innerHTML = '<div class="loader">Cargando candidatos…</div>';
    try {
        const { candidates } = await callAdminUsers({ action: 'listCandidates' });
        candidatesCache = candidates || [];
        renderTable();
    } catch (e) {
        document.getElementById('tableWrap').innerHTML = `<div class="empty">Error al cargar: ${escapeHtml(e.message)}</div>`;
    }
}

function renderTable() {
    const filtered = activeFilter === 'all'
        ? candidatesCache
        : candidatesCache.filter(c => c.status === activeFilter);

    if (filtered.length === 0) {
        document.getElementById('tableWrap').innerHTML = '<div class="empty">No hay candidatos en esta categoría.</div>';
        return;
    }

    const rows = filtered.map(c => {
        const evalRow = Array.isArray(c.candidate_evaluations) ? c.candidate_evaluations[0] : c.candidate_evaluations;
        const score = evalRow?.overall_score;
        const weak = (evalRow?.weak_areas || []).join(', ');
        const canHire = c.status === 'evaluado';
        const fecha = c.applied_at ? new Date(c.applied_at).toLocaleDateString('es-GT', { day:'numeric', month:'short', year:'numeric' }) : '—';

        const salario = c.pretension_salarial != null ? `Q${Number(c.pretension_salarial).toLocaleString('es-GT')}` : '—';
        const reasonNote = c.rejection_reason === 'salario' ? '<br><span class="weak">Rechazado por salario</span>' : '';

        return `
          <tr>
            <td class="name">${escapeHtml(c.full_name)}</td>
            <td>${escapeHtml(c.email)}<br><span class="weak">${escapeHtml(c.phone || '')}</span></td>
            <td>${escapeHtml(c.jornada_disponible || '—')}</td>
            <td>${salario}</td>
            <td><span class="badge ${escapeHtml(c.status)}">${escapeHtml(STATUS_LABELS[c.status] || c.status)}</span>${reasonNote}</td>
            <td>${score != null ? `<span class="score">${score}</span>` : '—'}${weak ? `<br><span class="weak">Débil: ${escapeHtml(weak)}</span>` : ''}</td>
            <td>${fecha}</td>
            <td>${canHire ? `<button class="hire" data-id="${c.id}">Contratar</button>` : ''}</td>
          </tr>`;
    }).join('');

    document.getElementById('tableWrap').innerHTML = `
      <table>
        <thead><tr><th>Nombre</th><th>Contacto</th><th>Jornada</th><th>Pretensión</th><th>Estado</th><th>Puntaje</th><th>Postuló</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;

    document.querySelectorAll('button.hire').forEach(btn => {
        btn.addEventListener('click', () => hireCandidate(btn.dataset.id, btn));
    });
}

async function hireCandidate(candidateId, btn) {
    const candidate = candidatesCache.find(c => c.id === candidateId);
    if (!confirm(`¿Contratar a ${candidate?.full_name}? Se creará su cuenta en la plataforma de formación.`)) return;

    btn.disabled = true;
    btn.textContent = 'Contratando...';
    try {
        await callAdminUsers({ action: 'provisionCandidate', candidateId });
        toast('Candidato contratado. Se envió invitación por correo.', 'success');
        await loadCandidates();
    } catch (e) {
        toast('Error: ' + e.message, 'error');
        btn.disabled = false;
        btn.textContent = 'Contratar';
    }
}

document.getElementById('filters').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-status]');
    if (!btn) return;
    document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.status;
    renderTable();
});

(async function init() {
    const ok = await checkAdminAuth();
    if (ok) await loadCandidates();
})();
