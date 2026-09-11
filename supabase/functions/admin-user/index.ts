import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' }
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const authHeader = req.headers.get('Authorization') || ''
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const anon = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    })

    const { data: { user: caller } } = await anon.auth.getUser()
    if (!caller) throw new Error('You must be logged in.')

    const admin = createClient(supabaseUrl, serviceRoleKey)
    const { data: callerProfile, error: callerProfileError } = await admin
      .from('profiles')
      .select('role')
      .eq('id', caller.id)
      .single()

    if (callerProfileError || callerProfile?.role !== 'admin') {
      throw new Error('Only University Admin can manage accounts.')
    }

    const body = await req.json()
    const action = body.action
    const input = body.payload || {}
    let result: unknown

    if (action === 'create') {
      if (!input.email || !input.password || !input.full_name || !['student', 'svl'].includes(input.role)) {
        throw new Error('Name, email, password and valid role are required.')
      }

      if (!input.class_id) throw new Error('A class must be selected.')
      if (input.role === 'student' && !input.svl_id) {
        throw new Error('An assigned SVL must be selected for every student.')
      }

      const created = await admin.auth.admin.createUser({
        email: input.email,
        password: input.password,
        email_confirm: true,
        user_metadata: { full_name: input.full_name, role: input.role }
      })
      if (created.error) throw created.error

      const user = created.data.user
      const profile = await admin
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: input.full_name,
          email: input.email,
          role: input.role
        })
        .select()
        .single()
      if (profile.error) throw profile.error

      const member = await admin.from('class_members').insert({
        class_id: Number(input.class_id),
        user_id: user.id,
        member_type: input.role,
        svl_id: input.role === 'student' ? input.svl_id : null
      })
      if (member.error) throw member.error

      result = { user: profile.data }
    } else if (action === 'update') {
      if (!input.user_id) throw new Error('User ID is required.')
      if (!input.full_name || !input.email || !input.role) {
        throw new Error('Name, email and role are required.')
      }
      if (!['student', 'svl'].includes(input.role)) {
        throw new Error('Only student and SVL accounts can be edited here.')
      }
      if (!input.class_id) throw new Error('A class must be selected.')
      if (input.role === 'student' && !input.svl_id) {
        throw new Error('An assigned SVL must be selected for every student.')
      }

      const authUpdate: { email?: string; password?: string } = {
        email: input.email
      }
      if (input.password) authUpdate.password = input.password

      const updated = await admin.auth.admin.updateUserById(input.user_id, authUpdate)
      if (updated.error) throw updated.error

      const profile = await admin
        .from('profiles')
        .update({
          full_name: input.full_name,
          email: input.email,
          role: input.role
        })
        .eq('id', input.user_id)
        .select()
        .single()
      if (profile.error) throw profile.error

      const removed = await admin
        .from('class_members')
        .delete()
        .eq('user_id', input.user_id)
      if (removed.error) throw removed.error

      const member = await admin.from('class_members').insert({
        class_id: Number(input.class_id),
        user_id: input.user_id,
        member_type: input.role,
        svl_id: input.role === 'student' ? input.svl_id : null
      })
      if (member.error) throw member.error

      result = { user: profile.data }
    } else if (action === 'delete') {
      if (!input.user_id) throw new Error('User ID is required.')

      const deleted = await admin.auth.admin.deleteUser(input.user_id)
      if (deleted.error) throw deleted.error
      result = { deleted: true }
    } else if (action === 'assign') {
      if (!input.class_id || !input.user_id || !input.member_type) {
        throw new Error('Class, user and member type are required.')
      }

      const member = await admin.from('class_members').upsert({
        class_id: Number(input.class_id),
        user_id: input.user_id,
        member_type: input.member_type,
        svl_id: input.svl_id || null
      }, { onConflict: 'class_id,user_id' }).select().single()
      if (member.error) throw member.error
      result = { member: member.data }
    } else if (action === 'unassign') {
      if (!input.user_id) throw new Error('User ID is required.')

      const query = admin.from('class_members').delete().eq('user_id', input.user_id)
      if (input.class_id) query.eq('class_id', Number(input.class_id))
      const removed = await query
      if (removed.error) throw removed.error
      result = { removed: true }
    } else {
      throw new Error('Unsupported admin action.')
    }

    return json(result)
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Request failed.' }, 400)
  }
})
