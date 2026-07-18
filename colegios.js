// ============================================================
// colegios.js — Gestión de colegios (tenants) · solo super admin
// ============================================================

const SUPABASE_URL = "https://grkjhzkgcmackbafqudu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2poemtnY21hY2tiYWZxdWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjg5MzQsImV4cCI6MjA5NjcwNDkzNH0.2nVTRlhey6HkGs_KZxtCaEp8L2QrvD0NUwY8ZFwZVHY";
const ADMIN_EMAILS  = ['billy@1bot.org'];

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let currentUser = null;
let tenantsCache = [];

function escapeHtml(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Gestionar colegios es una acción de plataforma — SIEMPRE super admin
// (billy@1bot.org), nunca un admin de tenant. Este gate cliente es solo
// UX; admin-users valida server-side que la fila de user_roles del
// caller tenga tenant_id NULL + role='admin'.
async function checkSuperAdmin() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { window.location.href = 'admin-login.html?redirect=colegios.html'; return false; }
    currentUser = session.user;

    if (!ADMIN_EMAILS.includes(currentUser.email)) {
        alert('Acceso denegado. Solo el super admin puede entrar aquí.');
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
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `Error ${res.status}`);
    return json;
}

async function loadTenants() {
    document.getElementById('tableWrap').innerHTML = '<div class="loader">Cargando…</div>';
    try {
        const { tenants } = await callAdminUsers({ action: 'listTenants' });
        tenantsCache = tenants || [];
        renderTenants();
    } catch (e) {
        document.getElementById('tableWrap').innerHTML = `<div class="empty">Error al cargar: ${escapeHtml(e.message)}</div>`;
    }
}

function renderTenants() {
    if (tenantsCache.length === 0) {
        document.getElementById('tableWrap').innerHTML = '<div class="empty">Aún no hay colegios creados.</div>';
        return;
    }

    const rows = tenantsCache.map(t => {
        const url = `${location.origin}/${t.slug}/postulacion.html`;
        return `
          <tr>
            <td><strong>${escapeHtml(t.name)}</strong><br><a class="url-link" href="${url}" target="_blank">${escapeHtml(url)}</a></td>
            <td>${escapeHtml(t.slug)}</td>
            <td>
              <span class="swatch" style="background:${escapeHtml(t.primary_color)}"></span>
              <span class="swatch" style="background:${escapeHtml(t.secondary_color || t.primary_color)}"></span>
            </td>
            <td><span class="badge ${t.active ? 'active' : 'inactive'}">${t.active ? 'Activo' : 'Inactivo'}</span></td>
            <td>
              <button class="small hire" data-action="invite" data-id="${t.id}" data-name="${escapeHtml(t.name)}">Invitar admin</button>
              <button class="small" data-action="toggle" data-id="${t.id}" data-active="${t.active}">${t.active ? 'Desactivar' : 'Activar'}</button>
            </td>
          </tr>`;
    }).join('');

    document.getElementById('tableWrap').innerHTML = `
      <table>
        <thead><tr><th>Colegio</th><th>Slug</th><th>Colores</th><th>Estado</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;

    document.querySelectorAll('button[data-action="invite"]').forEach(btn => {
        btn.addEventListener('click', () => inviteTenantAdmin(btn.dataset.id, btn.dataset.name));
    });
    document.querySelectorAll('button[data-action="toggle"]').forEach(btn => {
        btn.addEventListener('click', () => toggleTenantActive(btn.dataset.id, btn.dataset.active === 'true'));
    });
}

async function inviteTenantAdmin(tenantId, tenantName) {
    const email = prompt(`Correo del primer admin de "${tenantName}":`);
    if (!email || !email.trim()) return;
    try {
        await callAdminUsers({ action: 'invite', email: email.trim(), role: 'admin', tenantId });
        alert(`Invitación enviada a ${email.trim()}. Ese correo ya puede iniciar sesión y administrar solo "${tenantName}".`);
    } catch (e) {
        alert('Error: ' + e.message);
    }
}

async function toggleTenantActive(tenantId, currentlyActive) {
    try {
        await callAdminUsers({ action: 'setTenantActive', targetTenantId: tenantId, active: !currentlyActive });
        await loadTenants();
    } catch (e) {
        alert('Error: ' + e.message);
    }
}

document.getElementById('name').addEventListener('input', (e) => {
    const slugInput = document.getElementById('slug');
    if (!slugInput.dataset.touched) {
        slugInput.value = e.target.value.toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita acentos
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        document.getElementById('slugPreview').textContent = slugInput.value || 'slug';
    }
});
document.getElementById('slug').addEventListener('input', (e) => {
    e.target.dataset.touched = 'true';
    document.getElementById('slugPreview').textContent = e.target.value || 'slug';
});

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errMsg = document.getElementById('errMsg');
    const okMsg = document.getElementById('okMsg');
    const submitBtn = document.getElementById('submitBtn');
    errMsg.textContent = '';
    okMsg.textContent = '';

    const payload = {
        action: 'createTenant',
        name: document.getElementById('name').value.trim(),
        slug: document.getElementById('slug').value.trim(),
        program_name: document.getElementById('program_name').value.trim(),
        primary_color: document.getElementById('primary_color').value,
        secondary_color: document.getElementById('secondary_color').value,
        logo_url: document.getElementById('logo_url').value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creando...';
    try {
        await callAdminUsers(payload);
        okMsg.textContent = `Colegio "${payload.name}" creado. Usa "Invitar admin" en la tabla de abajo para darle acceso a alguien.`;
        e.target.reset();
        document.getElementById('slug').dataset.touched = '';
        document.getElementById('slugPreview').textContent = 'slug';
        await loadTenants();
    } catch (err) {
        errMsg.textContent = err.message;
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Crear colegio';
    }
});

(async function init() {
    const ok = await checkSuperAdmin();
    if (ok) await loadTenants();
})();
