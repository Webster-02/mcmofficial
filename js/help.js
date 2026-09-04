(() => {
  const renderHelp = () => {
    const app = document.querySelector('#app');
    if (!app || location.hash !== '#help') return;
    app.innerHTML = `<main class="help-page">
      <section class="help-hero"><div><span class="eyebrow">Student support</span><h1>Help & Support</h1><p>Find quick answers or send a request to the university support team.</p></div></section>
      <div class="help-grid">
        <section class="help-card"><h2>Frequently asked questions</h2><div class="faq-list">
          <details class="faq-item"><summary>How do I access my course notes?</summary><p>Open Slides & Notes from the sidebar, choose a course, and select the required material.</p></details>
          <details class="faq-item"><summary>Where can I see assignment deadlines?</summary><p>Use the Assignments page to view upcoming deadlines, submission status, and task details.</p></details>
          <details class="faq-item"><summary>How do I update my profile?</summary><p>Go to Profile, select Edit profile, and save your updated information.</p></details>
          <details class="faq-item"><summary>Why are my notifications not updated?</summary><p>Refresh the portal and check that you are viewing the Notifications section for the latest demo updates.</p></details>
        </div></section>
        <section class="help-card"><h2>Contact support</h2><div class="support-options"><div class="support-option"><div>✉️</div><div><strong>Email support</strong><span>support@uniconnect.edu</span></div></div><div class="support-option"><div>🕘</div><div><strong>Support hours</strong><span>Monday–Friday · 9:00 AM–5:00 PM</span></div></div><div class="support-option"><div>💬</div><div><strong>Community discussions</strong><span>Ask classmates and instructors in Discussions.</span></div></div></div></section>
        <section class="help-card"><h2>Submit a support request</h2><form class="help-form" id="helpForm"><label>Category<select required><option value="">Select a category</option><option>Technical issue</option><option>Course access</option><option>Account & profile</option><option>Other</option></select></label><label>Subject<input required placeholder="Briefly describe the issue" /></label><label>Message<textarea required placeholder="Tell us how we can help..."></textarea></label><button type="submit">Send request</button><div class="help-success" id="helpSuccess">Your request has been recorded. The support team will follow up soon.</div></form></section>
      </div></main>`;
    document.querySelector('#helpForm').addEventListener('submit', e => { e.preventDefault(); document.querySelector('#helpSuccess').classList.add('show'); e.target.reset(); });
  };
  window.addEventListener('hashchange', renderHelp); renderHelp();
})();