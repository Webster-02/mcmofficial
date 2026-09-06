# Admin User Function

Deploy this function with Supabase CLI:

```bash
supabase functions deploy admin-user
```

Set the server-side secret (never put it in frontend code):

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

The function uses the logged-in user's bearer token and only allows callers whose `profiles.role` is `admin`. It creates, updates, deletes, and assigns Student/SVL accounts.