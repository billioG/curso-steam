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

    // 2. Verificar que el caller es admin en user_roles
    const { data: roleRow } = await userClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle()

    if (roleRow?.role !== 'admin') return json({ error: 'Acceso denegado — solo admins' }, 403)

    // 3. Cliente con service role (puede modificar auth.users y user_roles)
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const { action } = body

    // ── Cambiar rol ──────────────────────────────────────────
    if (action === 'setRole') {
      const { userId, role } = body
      if (!userId || !role) return json({ error: 'userId y role son requeridos' }, 400)
      if (!['student', 'coordinator', 'admin'].includes(role))
        return json({ error: 'Rol inválido' }, 400)

      const { error } = await admin
        .from('user_roles')
        .upsert({ user_id: userId, role }, { onConflict: 'user_id' })

      if (error) return json({ error: error.message }, 500)
      return json({ ok: true, userId, role })
    }

    // ── Invitar usuario ──────────────────────────────────────
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
          { user_id: invited.user.id, role },
          { onConflict: 'user_id' }
        )
      }
      return json({ ok: true, email, role })
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
