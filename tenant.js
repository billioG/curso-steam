// ============================================================
// tenant.js — Resolución de tenant (Fase 1: solo módulo reclutamiento)
// Cargar ANTES que cualquier otro script en postulacion.html,
// evaluacion.html y reclutamiento.html.
// ============================================================
//
// Sin tenant (uso directo, ej. yoaprendo.online/postulacion.html):
// window.TENANT = null — comportamiento actual de 1bot, sin cambios.
//
// Con tenant (ej. yoaprendo.online/vdf/postulacion.html, resuelto por
// 404.html): window.TENANT = { id, slug, name, program_name,
// primary_color, secondary_color, logo_url }, se inyectan variables CSS
// (--brand-primary/--brand-secondary) y se reemplazan los elementos
// marcados con data-tenant="name|program|logo".

(function () {
  const TENANT_SUPABASE_URL = "https://grkjhzkgcmackbafqudu.supabase.co";
  const TENANT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2poemtnY21hY2tiYWZxdWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjg5MzQsImV4cCI6MjA5NjcwNDkzNH0.2nVTRlhey6HkGs_KZxtCaEp8L2QrvD0NUwY8ZFwZVHY";

  window.TENANT = null;
  window.TENANT_READY = (async function resolveTenant() {
    // El slug llega vía sessionStorage (redirigido por 404.html) o, para
    // pruebas directas, por ?tenant=. Se consume una sola vez: así una
    // navegación posterior a una URL sin tenant en la misma pestaña no
    // arrastra la marca del tenant anterior.
    let slug = sessionStorage.getItem('tenantSlug');
    sessionStorage.removeItem('tenantSlug');
    if (!slug) slug = new URLSearchParams(location.search).get('tenant');
    if (!slug) return null;

    // Restaura la URL "bonita" /slug/pagina.html en la barra de direcciones
    // (la página real se sirvió desde la raíz vía el redirect de 404.html).
    const currentPage = location.pathname.split('/').filter(Boolean).pop() || 'postulacion.html';
    const prettyUrl = '/' + slug + '/' + currentPage + location.search;
    if (location.pathname !== '/' + slug + '/' + currentPage) {
      history.replaceState(null, '', prettyUrl);
    }

    try {
      const url = `${TENANT_SUPABASE_URL}/rest/v1/tenants?slug=eq.${encodeURIComponent(slug)}&active=eq.true&select=id,slug,name,program_name,primary_color,secondary_color,logo_url`;
      const res = await fetch(url, {
        headers: { 'apikey': TENANT_ANON_KEY, 'Authorization': `Bearer ${TENANT_ANON_KEY}` },
      });
      if (!res.ok) return null;
      const rows = await res.json();
      const tenant = rows[0] || null;
      if (!tenant) return null;

      window.TENANT = tenant;
      applyBranding(tenant);
      return tenant;
    } catch (e) {
      return null; // sin conexión / tenant inválido -> se ve como 1bot por defecto, no rompe la página
    }
  })();

  function applyBranding(tenant) {
    const style = document.createElement('style');
    style.id = 'tenant-theme';
    style.textContent = `:root { --brand-primary: ${tenant.primary_color || '#07B0E4'}; --brand-secondary: ${tenant.secondary_color || tenant.primary_color || '#07B0E4'}; }`;
    document.head.appendChild(style);

    if (tenant.name) document.title = tenant.name + ' — ' + document.title;

    document.querySelectorAll('[data-tenant="name"]').forEach(el => { el.textContent = tenant.name; });
    document.querySelectorAll('[data-tenant="program"]').forEach(el => { el.textContent = tenant.program_name || tenant.name; });
    document.querySelectorAll('[data-tenant="logo"]').forEach(el => {
      if (tenant.logo_url) { el.src = tenant.logo_url; el.style.display = ''; }
    });
  }
})();
