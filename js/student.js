(function(){
  function renderStudent(){
    if(location.hash !== '#student-dashboard') return;
    const app=document.getElementById('app'); if(!app) return;
    app.innerHTML=`<main class="student-page">
      <section class="student-hero">
        <div class="student-welcome">
          <div class="student-avatar">DR</div>
          <div>
            <p class="student-eyebrow">MY CLASS MATTERS <span class="live-dot"></span> Student space</p>
            <h1>Good morning, Danish 👋</h1>
            <p class="student-subtitle">Stay focused, stay connected, and keep moving forward with your class.</p>
          </div>
        </div>
        <div class="student-hero-meta"><span class="student-status"><i></i> Semester active</span><span class="student-date">Monday, 11 September 2026</span></div>
      </section>

      <section class="student-overview">
        <article class="overview-card overview-primary"><div class="overview-icon">⌂</div><div><span>Assigned class</span><strong>BSCS 4A</strong><small>Computer Science</small></div><b>→</b></article>
        <article class="overview-card"><div class="overview-icon blue">✦</div><div><span>Assigned SVL</span><strong>Dr. Ayesha Khan</strong><small>Your class supervisor</small></div></article>
        <article class="overview-card"><div class="overview-icon green">◉</div><div><span>Attendance</span><strong>88% <em>Good</em></strong><small>Keep your consistency</small></div></article>
        <article class="overview-card"><div class="overview-icon purple">♧</div><div><span>Classmates</span><strong>32 students</strong><small>Connected to your class</small></div></article>
      </section>

      <section class="student-quick-actions">
        <a href="#class-room" class="quick-action featured"><span class="quick-symbol">⌁</span><span><strong>Class Room</strong><small>Connect with your classmates</small></span><b>↗</b></a>
        <a href="#timetable" class="quick-action"><span class="quick-symbol">▦</span><span><strong>Today’s timetable</strong><small>View your upcoming classes</small></span><b>↗</b></a>
        <a href="#notes" class="quick-action"><span class="quick-symbol">▤</span><span><strong>Slides & notes</strong><small>Access learning resources</small></span><b>↗</b></a>
        <a href="#assignments" class="quick-action"><span class="quick-symbol">✓</span><span><strong>Assignments</strong><small>Check pending submissions</small></span><b>↗</b></a>
      </section>

      <section class="student-content-grid">
        <div class="student-panel schedule-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR DAY</p><h2>Today’s timetable</h2></div><a href="#timetable">View full schedule →</a></div><div class="schedule-list"><div class="schedule-row active"><time>09:00<span>AM</span></time><div class="schedule-line"></div><div class="schedule-info"><strong>Web Engineering</strong><small>Room 204 · Dr. Ayesha Khan</small></div><span class="schedule-tag">Now</span></div><div class="schedule-row"><time>11:00<span>AM</span></time><div class="schedule-line"></div><div class="schedule-info"><strong>Database Systems</strong><small>Room 108 · Mr. Hamza Ali</small></div></div><div class="schedule-row"><time>02:00<span>PM</span></time><div class="schedule-line"></div><div class="schedule-info"><strong>Software Project</strong><small>Lab 3 · Dr. Ayesha Khan</small></div></div></div></div>

        <div class="student-panel notices-panel"><div class="panel-heading"><div><p class="panel-kicker">KEEP UPDATED</p><h2>Class notices</h2></div><a href="#notifications">See all →</a></div><div class="notice-list"><a class="notice-item" href="#notifications"><span class="notice-icon orange">!</span><span><strong>Project proposal submission</strong><small>Submit your proposal before Friday.</small><time>Today</time></span><b>›</b></a><a class="notice-item" href="#notifications"><span class="notice-icon blue">▣</span><span><strong>Next class presentation</strong><small>Presentations begin next Monday.</small><time>Yesterday</time></span><b>›</b></a><div class="empty-note">No more recent notices</div></div></div>

        <div class="student-panel resources-panel"><div class="panel-heading"><div><p class="panel-kicker">LEARNING HUB</p><h2>SVL slides & notes</h2></div><a href="#notes">Open library →</a></div><div class="resource-list"><a class="resource-item" href="#notes"><span class="file-icon pdf">PDF</span><span><strong>Web Engineering — Lecture 06</strong><small>Uploaded today · 2.4 MB</small></span><b>↓</b></a><a class="resource-item" href="#notes"><span class="file-icon doc">DOC</span><span><strong>Software Project Guidelines</strong><small>Uploaded yesterday · 1.1 MB</small></span><b>↓</b></a></div></div>

        <div class="student-panel community-panel"><div class="panel-heading"><div><p class="panel-kicker">CLASS COMMUNITY</p><h2>Stay connected</h2></div><a href="#class-room">Open room →</a></div><div class="community-preview"><div class="community-avatars"><span>AK</span><span>HM</span><span>SA</span><span>+29</span></div><strong>12 new discussion messages</strong><p>Your classmates are discussing the project deadline.</p><a href="#class-room" class="community-link">Join the conversation <span>↗</span></a></div></div>
      </section>

      <footer class="student-footer"><span>Need help with your studies?</span><a href="#help">Visit Help & Support →</a><span class="footer-divider"></span><span>My Class Matters · Student Portal</span></footer>
    </main>`;
  }
  window.addEventListener('hashchange',renderStudent); renderStudent();
})();