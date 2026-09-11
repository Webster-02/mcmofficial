# Admin User Edge Function

This function securely creates, updates, deletes, and assigns Student/SVL accounts from the University Admin Panel.

## Required Supabase setup

Deploy from the project root:

```bash
supabase functions deploy admin-user
```

Set the service-role secret only in Supabase Edge Functions:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Do not place the service-role key in frontend files, GitHub, or browser code.

## Required database setup

Run these SQL files in the Supabase SQL Editor before testing:

- `supabase/schema.sql`
- `supabase/member-assignment.sql`
- `supabase/admin-policies.sql`

## Admin account

Create the first admin account manually in Supabase Authentication, then ensure its profile has:

```text
role = admin
```

The function rejects all callers whose profile role is not `admin`.

## Managed relationships

- A class can have an assigned SVL.
- Students are linked to a class and an SVL through `class_members`.
- Editing an account updates its profile and class membership.
- Deleting an account removes its Supabase Authentication user and related profile through the database relationship.
