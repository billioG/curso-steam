import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    // 1. Verificar que el caller tiene un JWT válido
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'No autorizado' }, 401)

    // Cliente con el JWT del usuario (para verificar su identidad)
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authErr } = await userClient.auth.getUser()
    if (authErr || !user) return json({ error: 'No autenticado' }, 401)

    const body = await req.json()
    const { action, tenantId } = body

    // 2. Verificar rol del caller — un mismo usuario puede tener una fila
    // por tenant en user_roles (composite unique tenant_id+user_id).
    // - "super admin" = fila con tenant_id NULL y role='admin' (1bot,
    //   billy@1bot.org como hoy) — puede actuar sobre CUALQUIER tenant.
    // - "admin de tenant" = fila con tenant_id = ese colegio y role='admin'
    //   — SOLO puede usar las acciones de reclutamiento para SU tenant, no
    //   las acciones de la plataforma de cursos (fuera de alcance Fase 1).
    const { data: roleRows, error: roleErr } = await userClient
      .from('user_roles')
      .select('role, tenant_id')
      .eq('user_id', user.id)

    if (roleErr) return json({ error: roleErr.message }, 500)

    const isSuperAdmin = (roleRows || []).some(r => r.tenant_id === null && r.role === 'admin')
    const isTenantAdminForRequest = !!tenantId && (roleRows || []).some(r => r.tenant_id === tenantId && r.role === 'admin')
    const TENANT_ADMIN_ACTIONS = ['listCandidates', 'provisionCandidate']
    const allowed = isSuperAdmin || (TENANT_ADMIN_ACTIONS.includes(action) && isTenantAdminForRequest)

    if (!allowed) return json({ error: 'Acceso denegado — solo admins' }, 403)

    // 3. Cliente con service role (puede modificar auth.users y user_roles)
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // ── Cambiar rol ──────────────────────────────────────────
    if (action === 'setRole') {
      const { userId, role } = body
      if (!userId || !role) return json({ error: 'userId y role son requeridos' }, 400)
      if (!['student', 'coordinator', 'admin'].includes(role))
        return json({ error: 'Rol inválido' }, 400)

      const { error } = await admin
        .from('user_roles')
        .upsert({ user_id: userId, role, tenant_id: null }, { onConflict: 'tenant_id,user_id' })

      if (error) return json({ error: error.message }, 500)
      return json({ ok: true, userId, role })
    }

    // ── Invitar usuario ──────────────────────────────────────
    // tenantId opcional: onboarding manual del primer admin de un colegio
    // nuevo (solo super admin puede pasarlo — invite no está en
    // TENANT_ADMIN_ACTIONS, así que un admin de tenant nunca llega aquí).
    if (action === 'invite') {
      const { email, role = 'student' } = body
      if (!email) return json({ error: 'email es requerido' }, 400)

      const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(email, {
        data: { invited_by: user.email }
      })
      if (invErr) return json({ error: invErr.message }, 500)

      // Asignar rol inicial
      if (invited?.user?.id) {
        await admin.from('user_roles').upsert(
          { user_id: invited.user.id, role, tenant_id: tenantId || null },
          { onConflict: 'tenant_id,user_id' }
        )
      }
      return json({ ok: true, email, role })
    }

    // ── Importar docentes en lote (CSV) + asignar a un centro ─
    if (action === 'bulkImportTeachers') {
      const { schoolId, teachers } = body
      if (!schoolId) return json({ error: 'schoolId es requerido' }, 400)
      if (!Array.isArray(teachers) || !teachers.length) return json({ error: 'teachers debe ser un array no vacío' }, 400)
      if (teachers.length > 500) return json({ error: 'Máximo 500 docentes por importación' }, 400)

      // Mapa email → userId de cuentas ya existentes (una sola pasada, evita N búsquedas)
      const emailToId: Record<string, string> = {}
      for (let page = 1; ; page++) {
        const { data: listData, error: listErr } = await admin.auth.admin.listUsers({ page, perPage: 1000 })
        if (listErr) return json({ error: listErr.message }, 500)
        for (const u of listData.users) if (u.email) emailToId[u.email.toLowerCase()] = u.id
        if (listData.users.length < 1000) break
      }

      const results: Array<{ email: string, status: string, message?: string }> = []

      for (const row of teachers) {
        const email = String(row?.email || '').trim().toLowerCase()
        const name = String(row?.name || '').trim()

        if (!email || !email.includes('@')) {
          results.push({ email: row?.email || '(vacío)', status: 'error', message: 'Correo inválido' })
          continue
        }

        try {
          let userId = emailToId[email]
          let status = 'linked'

          if (!userId) {
            const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(email, {
              data: { invited_by: user.email, ...(name ? { name } : {}) }
            })
            if (invErr) { results.push({ email, status: 'error', message: invErr.message }); continue }
            userId = invited.user.id
            emailToId[email] = userId
            status = 'invited'
            await admin.from('user_roles').upsert({ user_id: userId, role: 'student', tenant_id: null }, { onConflict: 'tenant_id,user_id' })
          }

          const { error: linkErr } = await admin
            .from('user_schools')
            .upsert({ user_id: userId, school_id: schoolId }, { onConflict: 'user_id,school_id' })
          if (linkErr) { results.push({ email, status: 'error', message: linkErr.message }); continue }

          results.push({ email, status })
        } catch (e) {
          results.push({ email, status: 'error', message: String(e) })
        }
      }

      return json({ ok: true, results })
    }

    // ── Listar colegios (tenants) — solo super admin ─────────
    if (action === 'listTenants') {
      const { data, error } = await admin
        .from('tenants')
        .select('id, slug, name, program_name, primary_color, secondary_color, tertiary_color, logo_url, active, created_at')
        .order('created_at', { ascending: false })

      if (error) return json({ error: error.message }, 500)
      return json({ ok: true, tenants: data })
    }

    // ── Crear colegio (tenant) — solo super admin ────────────
    if (action === 'createTenant') {
      const { name, slug, program_name, primary_color, secondary_color, tertiary_color, logo_url } = body
      if (!name || !String(name).trim()) return json({ error: 'name es requerido' }, 400)

      const cleanSlug = String(slug || '').trim().toLowerCase()
      if (!/^[a-z0-9-]{2,40}$/.test(cleanSlug)) {
        return json({ error: 'slug inválido — usa solo minúsculas, números y guiones (2-40 caracteres)' }, 400)
      }
      const RESERVED_SLUGS = ['recursos', 'supabase', 'migrations', 'admin', 'app', 'data']
      if (RESERVED_SLUGS.includes(cleanSlug)) return json({ error: 'slug reservado, elige otro' }, 400)

      const { data: tenant, error } = await admin
        .from('tenants')
        .insert({
          slug: cleanSlug,
          name: String(name).trim(),
          program_name: (program_name && String(program_name).trim()) || 'Programa STEEAM',
          primary_color: primary_color || '#07B0E4',
          secondary_color: secondary_color || null,
          tertiary_color: tertiary_color || null,
          logo_url: logo_url || null,
        })
        .select()
        .single()

      if (error) {
        const msg = error.message.includes('duplicate') ? 'Ya existe un colegio con ese slug' : error.message
        return json({ error: msg }, 500)
      }
      return json({ ok: true, tenant })
    }

    // ── Activar/desactivar colegio — solo super admin ────────
    if (action === 'setTenantActive') {
      const { targetTenantId, active } = body
      if (!targetTenantId) return json({ error: 'targetTenantId es requerido' }, 400)

      const { error } = await admin.from('tenants').update({ active: !!active }).eq('id', targetTenantId)
      if (error) return json({ error: error.message }, 500)
      return json({ ok: true })
    }

    // ── Eliminar usuario ─────────────────────────────────────
    if (action === 'deleteUser') {
      const { userId } = body
      if (!userId) return json({ error: 'userId es requerido' }, 400)
      // No permitir auto-eliminación
      if (userId === user.id) return json({ error: 'No puedes eliminarte a ti mismo' }, 400)

      const { error } = await admin.auth.admin.deleteUser(userId)
      if (error) return json({ error: error.message }, 500)
      // Limpiar tablas relacionadas
      await Promise.all([
        admin.from('user_roles').delete().eq('user_id', userId),
        admin.from('progress').delete().eq('user_id', userId),
      ])
      return json({ ok: true, userId })
    }

    // ── Listar candidatos de reclutamiento ───────────────────
    // tenantId null/omitido = candidatos del 1bot original.
    if (action === 'listCandidates') {
      let query = admin
        .from('candidates')
        .select('id, full_name, email, phone, jornada_disponible, pretension_salarial, interes_mineduc, status, rejection_reason, applied_at, candidate_evaluations(technical_score, soft_score, overall_score, passed, feedback, weak_areas, candidate_decision)')
      query = tenantId ? query.eq('tenant_id', tenantId) : query.is('tenant_id', null)

      const { data, error } = await query.order('applied_at', { ascending: false })

      if (error) return json({ error: error.message }, 500)
      return json({ ok: true, candidates: data })
    }

    // ── Contratar candidato: crea cuenta real + rol student ──
    if (action === 'provisionCandidate') {
      const { candidateId } = body
      if (!candidateId) return json({ error: 'candidateId es requerido' }, 400)

      const { data: candidate, error: candErr } = await admin
        .from('candidates')
        .select('id, full_name, email, status, tenant_id')
        .eq('id', candidateId)
        .maybeSingle()

      if (candErr) return json({ error: candErr.message }, 500)
      if (!candidate) return json({ error: 'Candidato no encontrado' }, 404)
      // Defensa en profundidad: un admin de tenant no puede contratar un
      // candidato de OTRO tenant aunque adivine su candidateId.
      if (candidate.tenant_id !== (tenantId || null) && !isSuperAdmin) {
        return json({ error: 'Este candidato no pertenece a tu institución' }, 403)
      }
      if (candidate.status !== 'evaluado') return json({ error: 'El candidato debe estar evaluado antes de contratar' }, 409)

      const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(candidate.email, {
        data: { invited_by: user.email, name: candidate.full_name, source: 'reclutamiento' }
      })
      if (invErr) return json({ error: invErr.message }, 500)

      if (invited?.user?.id) {
        await admin.from('user_roles').upsert(
          { user_id: invited.user.id, role: 'student', tenant_id: candidate.tenant_id },
          { onConflict: 'tenant_id,user_id' }
        )
      }

      const { error: statusErr } = await admin
        .from('candidates')
        .update({ status: 'contratado', updated_at: new Date().toISOString() })
        .eq('id', candidateId)
      if (statusErr) return json({ error: statusErr.message }, 500)

      return json({ ok: true, candidateId, email: candidate.email })
    }

    return json({ error: 'Acción desconocida' }, 400)

  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}
