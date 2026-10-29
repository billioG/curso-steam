// ============================================================
// patrocinios.js — Panel administrativo · Patrocinios
//
// Una ONG, fundación o empresa paga los diplomas y los certificados
// maestros de un grupo de docentes. Aquí el super admin:
//   · crea al patrocinador (nombre, logo, cupos, vigencia, cursos);
//   · define a quiénes cubre: centros, correos y/o códigos de canje;
//   · revisa el reporte (con o sin nombres, según lo acordado) y puede
//     revocar un certificado si detecta una trampa.
//
// Tablas y funciones: migrations/patrocinios.sql. Todo se protege con RLS
// (solo super admin). Se carga después de admin.js y usa sus globales:
// sb, esc, toast, escapeCSV, downloadCSV, fmtDate, _schools, loadSchools,
// STATIC_COURSES, _coursesList, LEARNING_PATHS.
// ============================================================

let _sponsors = [];
const SP_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // sin 0/O ni 1/I
const SP_FLAG_TEXT = {
    cuenta_reciente: 'Cuenta creada hace menos de 3 días',
    poco_tiempo_registrado: 'Poco tiempo de uso registrado para las tarjetas estudiadas',
    varios_certificados_en_24h: 'Varios certificados en 24 horas',
};

const spEl = (id) => document.getElementById(id);
const spCode = (c) => (c && c.length === 10 ? `${c.slice(0, 5)}-${c.slice(5)}` : c);
const spToday = () => new Date().toISOString().slice(0, 10);
const spChunks = (arr, n) => { const out = []; for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n)); return out; };
const spCourseList = () => (typeof _coursesList !== 'undefined' && _coursesList.length ? _coursesList : STATIC_COURSES);
const spCourseTitle = (id) => (spCourseList().find((c) => c.id === id)?.title) || id;
const spPathLabel = (id) => (typeof LEARNING_PATHS !== 'undefined' && LEARNING_PATHS.find((p) => p.id === id)?.label) || id;

function spDbError(error) {
    const msg = String(error?.message || error || '');
    if (/does not exist|schema cache|42P01/i.test(msg)) return 'Falta ejecutar <code>migrations/patrocinios.sql</code> en Supabase.';
    if (/row-level security|permission denied|42501/i.test(msg)) return 'Esta sección es solo para el super admin de la plataforma.';
    return 'No se pudo cargar: ' + esc(msg);
}

function spStatus(s) {
    const today = spToday();
    if (!s.active) return { text: 'Pausado', cls: 'bg-slate-100 text-slate-500' };
    if (s.valid_until && s.valid_until < today) return { text: 'Vencido', cls: 'bg-red-50 text-red-600' };
    if (s.valid_from && s.valid_from > today) return { text: 'Aún no empieza', cls: 'bg-amber-50 text-amber-700' };
    if (s.diploma_used >= s.diploma_seats && s.master_used >= s.master_seats) return { text: 'Sin cupos', cls: 'bg-amber-50 text-amber-700' };
    return { text: 'Activo', cls: 'bg-emerald-50 text-emerald-700' };
}

function spBar(used, total) {
    const pct = total > 0 ? Math.min(100, Math.round(used / total * 100)) : 0;
    const color = pct >= 90 ? '#dc2626' : pct >= 70 ? '#f59e0b' : '#4f46e5';
    return `<div class="w-full bg-slate-100 rounded-full h-1.5 mt-1"><div class="h-1.5 rounded-full" style="width:${pct}%;background:${color}"></div></div>`;
}

// ── Lista ───────────────────────────────────────────────────
async function loadSponsors() {
    const box = spEl('sponsorsList');
    if (!box) return;
    box.innerHTML = '<div class="text-xs text-slate-400 text-center py-8"><i class="fas fa-spinner fa-spin mr-1"></i>Cargando patrocinadores…</div>';
    const { data, error } = await sb.from('sponsors').select('*').order('created_at', { ascending: false });
    if (error) { box.innerHTML = `<div class="card text-sm text-slate-500">${spDbError(error)}</div>`; return; }
    _sponsors = data || [];
    if (!_sponsors.length) {
        box.innerHTML = '<div class="card text-center text-sm text-slate-400 py-10">Todavía no hay patrocinadores. Crea el primero con «Nuevo patrocinador».</div>';
        return;
    }
    const [sch, em, co, mem] = await Promise.all([
        sb.from('sponsor_schools').select('sponsor_id'),
        sb.from('sponsor_emails').select('sponsor_id'),
        sb.from('sponsor_codes').select('sponsor_id, uses, max_uses, active'),
        sb.from('sponsor_members').select('sponsor_id'),
    ]);
    const count = (rows, id) => (rows.data || []).filter((r) => r.sponsor_id === id).length;
    box.innerHTML = _sponsors.map((s) => {
        const st = spStatus(s);
        const codes = (co.data || []).filter((c) => c.sponsor_id === s.id);
        const logo = s.logo_url
            ? `<img src="${esc(s.logo_url)}" alt="" class="w-12 h-12 rounded-xl object-contain bg-slate-50 border border-slate-100 p-1">`
            : '<div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center"><i class="fas fa-hand-holding-heart text-indigo-400"></i></div>';
        const vig = s.valid_from || s.valid_until
            ? `${s.valid_from ? fmtDate(s.valid_from + 'T12:00:00') : 'desde siempre'} → ${s.valid_until ? fmtDate(s.valid_until + 'T12:00:00') : 'sin fecha de fin'}`
            : 'Sin fecha de vencimiento';
        return `<div class="card">
            <div class="flex items-start gap-3 flex-wrap">
                ${logo}
                <div class="flex-1 min-w-[180px]">
                    <div class="flex items-center gap-2 flex-wrap">
                        <p class="font-bold text-slate-800">${esc(s.name)}</p>
                        <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full ${st.cls}">${st.text}</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-0.5">${vig}${s.courses ? ` · diplomas solo de ${s.courses.length} curso${s.courses.length === 1 ? '' : 's'}` : ''}</p>
                    <p class="text-xs text-slate-400">${s.show_on_certificate ? 'Sale en el diploma' : 'No sale en el diploma'} · ${s.report_with_names ? 'reporte con nombres' : 'reporte sin nombres'}</p>
                </div>
                <div class="flex gap-2 flex-wrap">
                    <button onclick="openSponsorEditor('${s.id}')" class="btn-secondary text-xs"><i class="fas fa-pen"></i> Editar</button>
                    <button onclick="openSponsorCoverage('${s.id}')" class="btn-secondary text-xs"><i class="fas fa-users"></i> A quiénes cubre</button>
                    <button onclick="openSponsorReport('${s.id}')" class="btn-primary text-xs"><i class="fas fa-chart-line"></i> Reporte</button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div><p class="text-xs text-slate-500">Diplomas <strong class="text-slate-800">${s.diploma_used}</strong> de ${s.diploma_seats}</p>${spBar(s.diploma_used, s.diploma_seats)}</div>
                <div><p class="text-xs text-slate-500">Certificados maestros <strong class="text-slate-800">${s.master_used}</strong> de ${s.master_seats}</p>${spBar(s.master_used, s.master_seats)}</div>
            </div>
            <p class="text-xs text-slate-400 mt-3">
                <i class="fas fa-school mr-1"></i>${count(sch, s.id)} centro${count(sch, s.id) === 1 ? '' : 's'}
                · <i class="fas fa-envelope mr-1"></i>${count(em, s.id)} correo${count(em, s.id) === 1 ? '' : 's'}
                · <i class="fas fa-ticket mr-1"></i>${codes.length} código${codes.length === 1 ? '' : 's'} (${codes.reduce((a, c) => a + c.uses, 0)} usos)
                · ${count(mem, s.id)} docente${count(mem, s.id) === 1 ? '' : 's'} por código
            </p>
            <div class="mt-3 flex justify-end">
                <button onclick="toggleSponsorActive('${s.id}')" class="text-xs ${s.active ? 'text-slate-400 hover:text-red-500' : 'text-emerald-600 hover:text-emerald-700'}">${s.active ? '<i class="fas fa-pause mr-1"></i>Pausar patrocinio' : '<i class="fas fa-play mr-1"></i>Reactivar patrocinio'}</button>
            </div>
        </div>`;
    }).join('');
}

async function toggleSponsorActive(id) {
    const s = _sponsors.find((x) => x.id === id);
    if (!s) return;
    if (s.active && !confirm(`¿Pausar el patrocinio de «${s.name}»? Los docentes dejarán de recibir certificados gratis hasta que lo reactives (los ya emitidos no cambian).`)) return;
    const { error } = await sb.from('sponsors').update({ active: !s.active }).eq('id', id);
    if (error) { toast('No se pudo cambiar: ' + error.message, 'error'); return; }
    toast(s.active ? 'Patrocinio pausado.' : 'Patrocinio reactivado.');
    loadSponsors();
}

// ── Ventanas ────────────────────────────────────────────────
function spModal(id, title, bodyHtml, wide = false) {
    spEl(id)?.remove();
    const m = document.createElement('div');
    m.id = id;
    m.className = 'fixed inset-0 bg-black/60 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto';
    m.innerHTML = `<div class="bg-white rounded-2xl w-full ${wide ? 'max-w-4xl' : 'max-w-lg'} shadow-2xl p-6 my-4">
        <div class="flex items-center justify-between mb-4 sticky top-0 bg-white py-2 -mt-2 z-10">
            <h3 class="font-bold text-slate-800">${esc(title)}</h3>
            <button data-close aria-label="Cerrar" class="text-slate-400 hover:text-slate-600 text-2xl leading-none px-1">&times;</button>
        </div>
        <div data-body>${bodyHtml}</div>
    </div>`;
    document.body.appendChild(m);
    const onKey = (e) => { if (e.key === 'Escape') m.remove(); };
    m.remove = ((orig) => () => { document.removeEventListener('keydown', onKey); orig(); })(m.remove.bind(m));
    document.addEventListener('keydown', onKey);
    m.querySelector('[data-close]').onclick = () => m.remove();
    m.addEventListener('mousedown', (e) => { if (e.target === m) m.remove(); });
    return m;
}

// ── Crear / editar ──────────────────────────────────────────
let _spLogoUrl = null;

function openSponsorEditor(id) {
    const s = id ? _sponsors.find((x) => x.id === id) : null;
    _spLogoUrl = s?.logo_url || null;
    const courses = spCourseList();
    const m = spModal('sponsorEditor', s ? 'Editar patrocinador' : 'Nuevo patrocinador', `
        <div class="space-y-3">
            <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Nombre (así sale en el diploma) *</label>
                <input id="spName" class="input-field" maxlength="120" placeholder="Fundación Ejemplo" value="${esc(s?.name || '')}">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Logo (PNG, JPG, WebP o SVG, máx. 1 MB)</label>
                <div class="flex items-center gap-3">
                    <div id="spLogoPreview" class="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0"></div>
                    <div class="flex-1">
                        <input id="spLogoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" class="text-xs">
                        <button id="spLogoClear" type="button" class="text-xs text-slate-400 hover:text-red-500 block mt-1">Quitar logo</button>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-slate-500 mb-1">Cupos de diplomas</label>
                    <input id="spDiplomaSeats" type="number" min="0" step="1" class="input-field" value="${s?.diploma_seats ?? 0}">
                    ${s ? `<p class="text-[11px] text-slate-400 mt-1">Usados: ${s.diploma_used}</p>` : ''}
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 mb-1">Cupos de certificados maestros</label>
                    <input id="spMasterSeats" type="number" min="0" step="1" class="input-field" value="${s?.master_seats ?? 0}">
                    ${s ? `<p class="text-[11px] text-slate-400 mt-1">Usados: ${s.master_used}</p>` : ''}
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 mb-1">Vigente desde</label>
                    <input id="spFrom" type="date" class="input-field" value="${s?.valid_from || ''}">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-500 mb-1">Vigente hasta</label>
                    <input id="spUntil" type="date" class="input-field" value="${s?.valid_until || ''}">
                </div>
            </div>
            <div class="space-y-2 text-sm text-slate-600">
                <label class="flex items-start gap-2 cursor-pointer"><input id="spShow" type="checkbox" class="mt-1" ${(s?.show_on_certificate ?? true) ? 'checked' : ''}><span>Mostrar «Con el apoyo de» y el logo en los diplomas y certificados maestros<br><span class="text-xs text-slate-400">Pide permiso por escrito al patrocinador antes de publicar su logo.</span></span></label>
                <label class="flex items-start gap-2 cursor-pointer"><input id="spNames" type="checkbox" class="mt-1" ${s?.report_with_names ? 'checked' : ''}><span>Sus reportes incluyen los nombres de los docentes<br><span class="text-xs text-slate-400">Si no, los reportes salen con «Docente 001», «Docente 002»… Recomendado: pedir el consentimiento de los docentes antes de activar esto.</span></span></label>
                <label class="flex items-start gap-2 cursor-pointer"><input id="spLimit" type="checkbox" class="mt-1" ${s?.courses ? 'checked' : ''}><span>Limitar los diplomas a algunos cursos</span></label>
            </div>
            <div id="spCoursesBox" class="${s?.courses ? '' : 'hidden'} max-h-40 overflow-y-auto border border-slate-200 rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-1">
                ${courses.map((c) => `<label class="flex items-center gap-2 text-xs text-slate-600 cursor-pointer"><input type="checkbox" class="sp-course" value="${esc(c.id)}" ${s?.courses?.includes(c.id) ? 'checked' : ''}>${esc(c.title)}</label>`).join('')}
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1">Notas internas (opcional)</label>
                <textarea id="spNotes" rows="2" class="input-field" placeholder="Contrato, contacto, condiciones…">${esc(s?.notes || '')}</textarea>
            </div>
            <button id="spSave" class="btn-primary w-full justify-center text-sm"><i class="fas fa-save"></i> ${s ? 'Guardar cambios' : 'Crear patrocinador'}</button>
        </div>`);

    const paintLogo = () => {
        spEl('spLogoPreview').innerHTML = _spLogoUrl
            ? `<img src="${esc(_spLogoUrl)}" alt="" class="w-full h-full object-contain">`
            : '<i class="fas fa-image text-slate-300"></i>';
    };
    paintLogo();
    m.querySelector('#spLogoClear').onclick = () => { _spLogoUrl = null; spEl('spLogoFile').value = ''; paintLogo(); };
    m.querySelector('#spLimit').onchange = (e) => spEl('spCoursesBox').classList.toggle('hidden', !e.target.checked);
    m.querySelector('#spLogoFile').onchange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 1024 * 1024) { toast('El logo pesa más de 1 MB.', 'error'); e.target.value = ''; return; }
        const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
        const path = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
        toast('Subiendo logo…', 'info');
        const { error } = await sb.storage.from('sponsor-logos').upload(path, file, { upsert: false, contentType: file.type });
        if (error) { toast('No se pudo subir el logo: ' + error.message, 'error'); return; }
        _spLogoUrl = sb.storage.from('sponsor-logos').getPublicUrl(path).data.publicUrl;
        paintLogo();
        toast('Logo subido. Guarda para confirmar.');
    };
    m.querySelector('#spSave').onclick = () => saveSponsor(id);
}

async function saveSponsor(id) {
    const name = spEl('spName').value.trim();
    const num = (elId) => Math.max(0, Math.floor(Number(spEl(elId).value) || 0));
    const from = spEl('spFrom').value || null, until = spEl('spUntil').value || null;
    if (!name) { toast('Escribe el nombre del patrocinador.', 'error'); return; }
    if (from && until && until < from) { toast('La fecha de fin es anterior a la de inicio.', 'error'); return; }
    let courses = null;
    if (spEl('spLimit').checked) {
        courses = [...document.querySelectorAll('.sp-course:checked')].map((c) => c.value);
        if (!courses.length) { toast('Marca al menos un curso o desactiva la limitación.', 'error'); return; }
    }
    const row = {
        name, logo_url: _spLogoUrl,
        diploma_seats: num('spDiplomaSeats'), master_seats: num('spMasterSeats'),
        valid_from: from, valid_until: until,
        show_on_certificate: spEl('spShow').checked, report_with_names: spEl('spNames').checked,
        courses, notes: spEl('spNotes').value.trim() || null,
    };
    const old = id ? _sponsors.find((x) => x.id === id) : null;
    if (old && (row.diploma_seats < old.diploma_used || row.master_seats < old.master_used)) {
        toast('Los cupos no pueden ser menores a los ya usados.', 'error'); return;
    }
    const q = id ? sb.from('sponsors').update(row).eq('id', id) : sb.from('sponsors').insert(row);
    const { error } = await q;
    if (error) { toast('No se pudo guardar: ' + error.message, 'error'); return; }
    spEl('sponsorEditor')?.remove();
    toast(id ? 'Cambios guardados.' : 'Patrocinador creado. Ahora define a quiénes cubre.');
    loadSponsors();
}

// ── A quiénes cubre: centros, correos y códigos ─────────────
async function openSponsorCoverage(id) {
    const s = _sponsors.find((x) => x.id === id);
    if (!s) return;
    if (typeof _schools !== 'undefined' && !_schools.length && typeof loadSchools === 'function') await loadSchools();
    const [sch, em, co] = await Promise.all([
        sb.from('sponsor_schools').select('school_id').eq('sponsor_id', id),
        sb.from('sponsor_emails').select('email').eq('sponsor_id', id).order('email'),
        sb.from('sponsor_codes').select('*').eq('sponsor_id', id).order('created_at', { ascending: false }),
    ]);
    const err = sch.error || em.error || co.error;
    if (err) { toast(spDbError(err).replace(/<[^>]+>/g, ''), 'error'); return; }
    const chosen = new Set((sch.data || []).map((r) => r.school_id));
    const schools = (typeof _schools !== 'undefined' ? _schools : []);

    const m = spModal('sponsorCoverage', `A quiénes cubre · ${s.name}`, `
        <p class="text-xs text-slate-500 mb-4">Un docente queda cubierto si cumple <strong>cualquiera</strong> de las tres: pertenece a un centro de la lista, su correo está en la lista, o canjeó un código. Además, para cada certificado se comprueba en el servidor que estudió el curso y aprobó el examen.</p>

        <div class="border border-slate-200 rounded-xl p-4 mb-4">
            <p class="font-semibold text-sm text-slate-700 mb-2"><i class="fas fa-school text-slate-400 mr-1"></i>Centros educativos</p>
            <input id="spSchoolFilter" class="input-field mb-2" placeholder="Buscar centro…">
            <div id="spSchoolList" class="max-h-44 overflow-y-auto space-y-1">
                ${schools.length ? schools.map((c) => `<label class="sp-school flex items-center gap-2 text-xs text-slate-600 cursor-pointer" data-name="${esc(c.name.toLowerCase())}"><input type="checkbox" value="${c.id}" ${chosen.has(c.id) ? 'checked' : ''}>${esc(c.name)}</label>`).join('') : '<p class="text-xs text-slate-400">Todavía no hay centros creados (sección Centros).</p>'}
            </div>
            <button id="spSaveSchools" class="btn-secondary text-xs mt-3"><i class="fas fa-save"></i> Guardar centros</button>
        </div>

        <div class="border border-slate-200 rounded-xl p-4 mb-4">
            <p class="font-semibold text-sm text-slate-700 mb-2"><i class="fas fa-envelope text-slate-400 mr-1"></i>Correos</p>
            <textarea id="spEmails" rows="5" class="input-field" placeholder="uno@correo.com&#10;otro@correo.com">${esc((em.data || []).map((r) => r.email).join('\n'))}</textarea>
            <p class="text-[11px] text-slate-400 mt-1">Un correo por línea (también sirve separarlos con coma). Cubre a quien se registre o ya esté registrado con ese correo.</p>
            <button id="spSaveEmails" class="btn-secondary text-xs mt-2"><i class="fas fa-save"></i> Guardar correos</button>
        </div>

        <div class="border border-slate-200 rounded-xl p-4">
            <p class="font-semibold text-sm text-slate-700 mb-2"><i class="fas fa-ticket text-slate-400 mr-1"></i>Códigos de canje</p>
            <p class="text-xs text-slate-500 mb-3">Cada docente escribe su código en Perfil → «Código de patrocinio». Un código sirve para <strong>1 persona</strong> (o para un grupo, si le pones más usos).</p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                <div><label class="block text-[11px] text-slate-500 mb-1">Cantidad</label><input id="spCodeQty" type="number" min="1" max="500" value="10" class="input-field"></div>
                <div><label class="block text-[11px] text-slate-500 mb-1">Usos por código</label><input id="spCodeUses" type="number" min="1" max="1000" value="1" class="input-field"></div>
                <div><label class="block text-[11px] text-slate-500 mb-1">Vence (opcional)</label><input id="spCodeExp" type="date" class="input-field"></div>
                <div><label class="block text-[11px] text-slate-500 mb-1">Etiqueta</label><input id="spCodeLabel" maxlength="60" class="input-field" placeholder="Grupo Norte"></div>
            </div>
            <div class="flex gap-2 flex-wrap">
                <button id="spGenCodes" class="btn-primary text-xs"><i class="fas fa-wand-magic-sparkles"></i> Generar códigos</button>
                <button id="spExportCodes" class="btn-secondary text-xs"><i class="fas fa-file-csv"></i> Descargar códigos (CSV)</button>
            </div>
            <div id="spCodesTable" class="mt-3"></div>
        </div>`, true);

    m.querySelector('#spSchoolFilter').oninput = (e) => {
        const q = e.target.value.trim().toLowerCase();
        m.querySelectorAll('.sp-school').forEach((l) => l.classList.toggle('hidden', q && !l.dataset.name.includes(q)));
    };
    m.querySelector('#spSaveSchools').onclick = async () => {
        const now = new Set([...m.querySelectorAll('.sp-school input:checked')].map((c) => c.value));
        const add = [...now].filter((x) => !chosen.has(x)), del = [...chosen].filter((x) => !now.has(x));
        if (del.length) { const { error } = await sb.from('sponsor_schools').delete().eq('sponsor_id', id).in('school_id', del); if (error) { toast(error.message, 'error'); return; } }
        if (add.length) { const { error } = await sb.from('sponsor_schools').insert(add.map((school_id) => ({ sponsor_id: id, school_id }))); if (error) { toast(error.message, 'error'); return; } }
        chosen.clear(); now.forEach((x) => chosen.add(x));
        toast('Centros guardados.'); loadSponsors();
    };
    m.querySelector('#spSaveEmails').onclick = async () => {
        const raw = spEl('spEmails').value.split(/[\s,;]+/).map((x) => x.trim().toLowerCase()).filter(Boolean);
        const bad = raw.filter((x) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
        if (bad.length) { toast(`Correo inválido: ${bad[0]}${bad.length > 1 ? ` (y ${bad.length - 1} más)` : ''}`, 'error'); return; }
        const want = new Set(raw), have = new Set((em.data || []).map((r) => r.email));
        const add = [...want].filter((x) => !have.has(x)), del = [...have].filter((x) => !want.has(x));
        if (del.length) { const { error } = await sb.from('sponsor_emails').delete().eq('sponsor_id', id).in('email', del); if (error) { toast(error.message, 'error'); return; } }
        for (const part of spChunks(add, 200)) {
            const { error } = await sb.from('sponsor_emails').insert(part.map((email) => ({ sponsor_id: id, email })));
            if (error) { toast(error.message, 'error'); return; }
        }
        em.data = [...want].sort().map((email) => ({ email }));
        toast(`Correos guardados (${want.size}).`); loadSponsors();
    };

    let codes = co.data || [];
    const paintCodes = () => {
        const t = spEl('spCodesTable');
        if (!codes.length) { t.innerHTML = '<p class="text-xs text-slate-400">Aún no hay códigos.</p>'; return; }
        t.innerHTML = `<div class="overflow-x-auto max-h-64 overflow-y-auto"><table class="w-full text-xs"><thead><tr class="text-left text-slate-400"><th class="py-1 pr-3">Código</th><th class="pr-3">Etiqueta</th><th class="pr-3">Usos</th><th class="pr-3">Vence</th><th></th></tr></thead><tbody>
            ${codes.map((c) => `<tr class="border-t border-slate-100"><td class="py-1.5 pr-3 font-mono font-bold tracking-wider ${c.active ? 'text-slate-800' : 'text-slate-300 line-through'}">${spCode(c.code)}</td><td class="pr-3 text-slate-500">${esc(c.label || '—')}</td><td class="pr-3">${c.uses}/${c.max_uses}</td><td class="pr-3 text-slate-500">${c.expires_at ? fmtDate(c.expires_at) : '—'}</td>
            <td class="text-right whitespace-nowrap"><button data-copy="${c.code}" class="text-indigo-500 hover:underline mr-2">Copiar</button><button data-toggle="${c.code}" class="text-slate-400 hover:text-red-500">${c.active ? 'Desactivar' : 'Activar'}</button></td></tr>`).join('')}
        </tbody></table></div><p class="text-[11px] text-slate-400 mt-1">${codes.length} código${codes.length === 1 ? '' : 's'}</p>`;
        t.querySelectorAll('[data-copy]').forEach((b) => b.onclick = async () => { try { await navigator.clipboard.writeText(spCode(b.dataset.copy)); toast('Código copiado.'); } catch { toast('No se pudo copiar.', 'error'); } });
        t.querySelectorAll('[data-toggle]').forEach((b) => b.onclick = async () => {
            const c = codes.find((x) => x.code === b.dataset.toggle);
            const { error } = await sb.from('sponsor_codes').update({ active: !c.active }).eq('code', c.code);
            if (error) { toast(error.message, 'error'); return; }
            c.active = !c.active; paintCodes();
        });
    };
    paintCodes();

    m.querySelector('#spGenCodes').onclick = async () => {
        const qty = Math.min(500, Math.max(1, Math.floor(Number(spEl('spCodeQty').value) || 0)));
        const uses = Math.min(1000, Math.max(1, Math.floor(Number(spEl('spCodeUses').value) || 1)));
        const exp = spEl('spCodeExp').value ? new Date(spEl('spCodeExp').value + 'T23:59:59').toISOString() : null;
        const label = spEl('spCodeLabel').value.trim() || null;
        const gen = () => { const b = new Uint8Array(10); crypto.getRandomValues(b); return [...b].map((x) => SP_ALPHABET[x % SP_ALPHABET.length]).join(''); };
        let made = 0;
        for (let attempt = 0; attempt < 5 && made < qty; attempt++) {
            const batch = [...new Set(Array.from({ length: qty - made }, gen))].map((code) => ({ code, sponsor_id: id, max_uses: uses, expires_at: exp, label }));
            const { data, error } = await sb.from('sponsor_codes').insert(batch).select();
            if (error) {
                if (error.code === '23505') continue;   // choque improbable de códigos: se reintenta
                toast('No se pudieron crear los códigos: ' + error.message, 'error'); return;
            }
            codes = [...(data || []), ...codes]; made += (data || []).length;
        }
        paintCodes(); loadSponsors();
        toast(`${made} código${made === 1 ? '' : 's'} creado${made === 1 ? '' : 's'}.`);
    };
    m.querySelector('#spExportCodes').onclick = () => {
        if (!codes.length) { toast('No hay códigos.', 'error'); return; }
        downloadCSV(`codigos_${s.name.replace(/\W+/g, '_')}.csv`, [['Código', 'Etiqueta', 'Usos', 'Máximo de usos', 'Vence', 'Activo'],
            ...codes.map((c) => [spCode(c.code), c.label || '', c.uses, c.max_uses, c.expires_at ? c.expires_at.slice(0, 10) : '', c.active ? 'sí' : 'no'])]);
    };
}

// ── Reporte ─────────────────────────────────────────────────
async function spLoadClaims(id) {
    const { data: pays, error } = await sb.from('certificate_payments')
        .select('id, user_id, cert_type, ref_id, status, paid_at')
        .eq('sponsor_id', id).in('status', ['paid', 'failed']).order('paid_at', { ascending: false }).limit(2000);
    if (error) throw error;
    const rows = pays || [];
    const logs = {}, people = {}, centers = {};
    for (const part of spChunks(rows.map((r) => r.id), 150)) {
        const { data } = await sb.from('sponsor_claim_log').select('payment_id, meta, flags').in('payment_id', part);
        (data || []).forEach((l) => { logs[l.payment_id] = l; });
    }
    const userIds = [...new Set(rows.map((r) => r.user_id))];
    for (const part of spChunks(userIds, 150)) {
        const [pr, us] = await Promise.all([
            sb.from('progress').select('user_id, email, daily_missions').in('user_id', part),
            sb.from('user_schools').select('user_id, school_id').in('user_id', part),
        ]);
        (pr.data || []).forEach((p) => { people[p.user_id] = { name: p.daily_missions?.fullName || '', email: p.email || '' }; });
        (us.data || []).forEach((u) => { (centers[u.user_id] = centers[u.user_id] || []).push(u.school_id); });
    }
    const schoolName = (sid) => (typeof _schools !== 'undefined' ? _schools.find((c) => c.id === sid)?.name : null) || '';
    return rows.map((r) => ({
        ...r,
        meta: logs[r.id]?.meta || {}, flags: logs[r.id]?.flags || [],
        name: people[r.user_id]?.name || '', email: people[r.user_id]?.email || '',
        center: (centers[r.user_id] || []).map(schoolName).filter(Boolean).join(' / '),
    }));
}

function spDetail(c) {
    const m = c.meta || {};
    if (c.cert_type === 'master') return `Examen maestro ${m.examen_maestro ?? '—'} · portafolio ${m.portafolio_ia ?? '—'}/50 · total ${m.total ?? '—'}/100`;
    return `Examen ${m.examen ?? '—'} · tarjetas ${m.tarjetas ?? '—'} · relato ${m.relato_ia ?? '—'}/10`;
}

async function openSponsorReport(id) {
    const s = _sponsors.find((x) => x.id === id);
    if (!s) return;
    const m = spModal('sponsorReport', `Reporte · ${s.name}`, '<div class="text-xs text-slate-400 text-center py-10"><i class="fas fa-spinner fa-spin mr-1"></i>Cargando…</div>', true);
    let claims;
    try { if (typeof _schools !== 'undefined' && !_schools.length) await loadSchools(); claims = await spLoadClaims(id); }
    catch (e) { m.querySelector('[data-body]').innerHTML = `<p class="text-sm text-slate-500">${spDbError(e)}</p>`; return; }

    const live = claims.filter((c) => c.status === 'paid');
    const diplomas = live.filter((c) => c.cert_type === 'diploma').length, masters = live.filter((c) => c.cert_type === 'master').length;
    const people = new Set(live.map((c) => c.user_id)).size;
    const flagged = live.filter((c) => c.flags.length).length;
    const revoked = claims.length - live.length;
    const tile = (n, label, cls = 'text-indigo-600') => `<div class="bg-slate-50 rounded-xl p-3 text-center"><p class="text-2xl font-black ${cls}">${n}</p><p class="text-[11px] text-slate-500">${label}</p></div>`;

    m.querySelector('[data-body]').innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
            ${tile(diplomas, 'diplomas emitidos')}${tile(masters, 'certificados maestros')}${tile(people, 'docentes distintos', 'text-emerald-600')}
            ${tile(flagged, 'con alertas', flagged ? 'text-amber-600' : 'text-slate-400')}${tile(revoked, 'revocados', revoked ? 'text-red-500' : 'text-slate-400')}
        </div>
        <div class="flex gap-2 flex-wrap mb-3">
            <button id="spCsvSponsor" class="btn-primary text-xs"><i class="fas fa-file-csv"></i> Reporte para el patrocinador (${s.report_with_names ? 'con nombres' : 'sin nombres'})</button>
            <button id="spCsvAudit" class="btn-secondary text-xs"><i class="fas fa-user-shield"></i> Auditoría interna (con alertas)</button>
        </div>
        <p class="text-[11px] text-slate-400 mb-3">El reporte para el patrocinador no incluye correos ni alertas. La auditoría interna es solo para ti: no la compartas.${flagged ? ' Las <strong>alertas</strong> no bloquean el certificado: son una señal para que revises ese caso.' : ''}</p>
        ${claims.length ? `<div class="overflow-x-auto max-h-96 overflow-y-auto"><table class="w-full text-xs">
            <thead class="sticky top-0 bg-white"><tr class="text-left text-slate-400"><th class="py-1.5 pr-3">Fecha</th><th class="pr-3">Certificado</th><th class="pr-3">Docente</th><th class="pr-3">Centro</th><th class="pr-3">Datos</th><th class="pr-3">Alertas</th><th></th></tr></thead><tbody>
            ${claims.map((c) => `<tr class="border-t border-slate-100 align-top ${c.status === 'failed' ? 'opacity-50' : ''}">
                <td class="py-1.5 pr-3 whitespace-nowrap">${c.paid_at ? fmtDate(c.paid_at) : '—'}</td>
                <td class="pr-3">${c.cert_type === 'master' ? 'Maestro · ' + esc(spPathLabel(c.ref_id)) : 'Diploma · ' + esc(spCourseTitle(c.ref_id))}</td>
                <td class="pr-3"><span class="font-semibold text-slate-700">${esc(c.name || '—')}</span><br><span class="text-slate-400">${esc(c.email)}</span></td>
                <td class="pr-3 text-slate-500">${esc(c.center || '—')}</td>
                <td class="pr-3 text-slate-500">${esc(spDetail(c))}</td>
                <td class="pr-3">${c.flags.map((f) => `<span title="${esc(SP_FLAG_TEXT[f] || f)}" class="inline-block text-[10px] font-semibold bg-amber-50 text-amber-700 rounded-full px-2 py-0.5 mr-1 mb-1">${esc(SP_FLAG_TEXT[f] || f)}</span>`).join('') || '<span class="text-slate-300">—</span>'}</td>
                <td class="text-right whitespace-nowrap">${c.status === 'paid' ? `<button data-revoke="${c.id}" class="text-slate-400 hover:text-red-500">Revocar</button>` : '<span class="text-red-400">Revocado</span>'}</td></tr>`).join('')}
        </tbody></table></div>` : '<p class="text-sm text-slate-400 text-center py-8">Todavía no se emitió ningún certificado con este patrocinio.</p>'}`;

    const fileBase = s.name.replace(/\W+/g, '_');
    const certName = (c) => c.cert_type === 'master' ? 'Certificado maestro' : 'Diploma';
    const refName = (c) => c.cert_type === 'master' ? spPathLabel(c.ref_id) : spCourseTitle(c.ref_id);
    const dateOf = (c) => (c.paid_at || '').slice(0, 10);
    m.querySelector('#spCsvSponsor').onclick = () => {
        const order = new Map();   // «Docente 001», «Docente 002»… estable dentro del reporte
        const who = (c) => {
            if (s.report_with_names) return c.name || 'Sin nombre';
            if (!order.has(c.user_id)) order.set(c.user_id, `Docente ${String(order.size + 1).padStart(3, '0')}`);
            return order.get(c.user_id);
        };
        const rows = [...live].reverse().map((c) => [dateOf(c), certName(c), refName(c), who(c), c.center]);
        downloadCSV(`reporte_${fileBase}_${spToday()}.csv`, [['Fecha', 'Certificado', 'Curso o ruta', 'Docente', 'Centro educativo'], ...rows]);
    };
    m.querySelector('#spCsvAudit').onclick = () => {
        downloadCSV(`auditoria_${fileBase}_${spToday()}.csv`, [['Fecha', 'Estado', 'Certificado', 'Curso o ruta', 'Docente', 'Correo', 'Centro educativo', 'Datos', 'Alertas'],
            ...claims.map((c) => [dateOf(c), c.status === 'paid' ? 'vigente' : 'revocado', certName(c), refName(c), c.name, c.email, c.center, spDetail(c), c.flags.map((f) => SP_FLAG_TEXT[f] || f).join(' | ')])]);
    };
    m.querySelectorAll('[data-revoke]').forEach((b) => b.onclick = async () => {
        if (!confirm('¿Revocar este certificado patrocinado? Se devuelve el cupo y el docente vuelve a ver el certificado como no obtenido. El código de verificación ya emitido sigue existiendo: bórralo en la tabla «certificates» si quieres que deje de verificarse.')) return;
        const { data, error } = await sb.rpc('revoke_sponsored_cert', { p_payment_id: b.dataset.revoke });
        if (error || !data?.ok) { toast('No se pudo revocar: ' + (error?.message || data?.error || ''), 'error'); return; }
        toast('Certificado revocado y cupo devuelto.');
        await loadSponsors();
        openSponsorReport(id);
    });
}
