(function () {
  const app = document.getElementById('app');
  if (!app) return;

  const profile = {
    name: 'Danish Rehman',
    email: 'danish.rehman@university.edu',
    program: 'Bachelor of Computer Science',
    semester: 'Semester 4',
    studentId: 'MCM-2024-0187',
    phone: '+92 300 1234567'
  };

  function render() {
    if (location.hash !== '#profile') return;
    app.innerHTML = `
      <main class="profile-page">
        <section class="profile-hero">
          <div class="profile-avatar">DR</div>
          <div><p class="eyebrow">Student account</p><h1>${profile.name}</h1><p>${profile.program} · ${profile.semester}</p></div>
          <span class="profile-status">Active student</span>
        </section>
        <section class="profile-grid">
          <article class="profile-card"><div class="card-heading"><div><p class="eyebrow">Personal information</p><h2>Profile details</h2></div><span class="card-icon">⌘</span></div>
            <form id="profile-form" class="profile-form">
              <label>Full name<input name="name" value="${profile.name}" required></label>
              <label>Student ID<input name="studentId" value="${profile.studentId}" readonly></label>
              <label>Email address<input name="email" type="email" value="${profile.email}" required></label>
              <label>Phone number<input name="phone" value="${profile.phone}"></label>
              <div class="form-actions"><button type="button" class="button secondary" id="profile-reset">Cancel</button><button class="button primary" type="submit">Save changes</button></div>
              <p class="form-message" id="profile-message" role="status"></p>
            </form>
          </article>
          <aside class="profile-card account-card"><p class="eyebrow">Academic overview</p><h2>Your account</h2><div class="account-row"><span>Programme</span><strong>${profile.program}</strong></div><div class="account-row"><span>Current semester</span><strong>${profile.semester}</strong></div><div class="account-row"><span>Account status</span><strong class="success-text">Verified</strong></div><div class="account-row"><span>Last sign in</span><strong>Today, 9:42 AM</strong></div></aside>
        </section>
      </main>`;

    const form = document.getElementById('profile-form');
    form.addEventListener('submit', (event) => { event.preventDefault(); document.getElementById('profile-message').textContent = 'Profile changes saved successfully.'; });
    document.getElementById('profile-reset').addEventListener('click', () => { form.reset(); document.getElementById('profile-message').textContent = ''; });
  }
  window.addEventListener('hashchange', render);
  render();
})();
