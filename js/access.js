(function () {
  const protectedRoutes = {
    '#student-dashboard': 'student',
    '#svl-dashboard': 'svl',
    '#admin': 'admin',
    '#admin-management': 'admin'
  };

  async function getSessionUser() {
    const client =
      window.mcmSupabase ||
      (window.initMcmSupabase && window.initMcmSupabase());

    if (!client) return null;

    const { data, error } = await client.auth.getSession();

    if (error || !data.session) return null;

    return data.session.user;
  }

  async function checkAccess() {
    const required = protectedRoutes[location.hash];

    if (!required) return;

    const user = await getSessionUser();

    if (!user) {
      location.hash = '#login';
      return;
    }

    const client =
      window.mcmSupabase ||
      (window.initMcmSupabase && window.initMcmSupabase());

    const { data: profile, error } = await client
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (error || !profile || profile.role !== required) {
      await client.auth.signOut();
      location.hash = '#login';
      setTimeout(() => alert('Your account is not authorized for this portal.'), 50);
      return;
    }

    localStorage.setItem('portalRole', profile.role);
  }

  window.addEventListener('hashchange', checkAccess);
  window.addEventListener('load', checkAccess);
  checkAccess();
})();
