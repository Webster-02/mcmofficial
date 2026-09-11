(function(){
'use strict';
function studentHome(){
  const hash=location.hash;
  if(hash && hash!=='#' && hash!=='#home' && hash!=='#student-dashboard') return;
  const app=document.getElementById('app');
  if(!app) return;
  app.innerHTML=`
  <div class="student-app-shell">
    <aside class="student-sidebar">
      <div class="student-brand"><span class="student-brand-mark">◆</span><span>UniConnect</span></div>
      <nav class="student-side-nav">
        <a class="active" href="#home"><span>⌂</span>Home</a>
        <a href="#courses"><span>▤</span>My Courses</a>
        <a href="#notes"><span>▧</span>Slides & Notes</a>
        <a href="#discussions"><span>☷</span>Discussions</a>
        <a href="#assignments"><span>✓</span>Assignments</a>
        <a href="#timetable"><span>□</span>Timetable</a>
        <a href="#notifications"><span>♧</span>Notifications</a>
        <a href="#profile"><span>○</span>Profile</a>
      </nav>
      <div class="student-side-bottom"><a href="#settings">⚙ Settings</a><a href="#help">? Help & Support</a><a href="#logout">↪ Logout</a></div>
    </aside>
    <main class="student-main-area">
      <header class="student-topbar"><button class="student-menu-toggle" aria-label="Open navigation">☰</button><div class="student-search">Search courses, notes, discussions...</div><div class="student-user"><span class="student-notification">♧<b>3</b></span><span class="student-user-avatar">D</span><span><strong>Danish</strong><small>Student</small></span><span>⌄</span></div></header>
      <section class="student-dashboard-content">
        <div class="student-dashboard-hero"><div><p class="student-label">MY CLASS MATTERS · STUDENT PORTAL</p><h1>Welcome back, Danish <span>👋</span></h1><p>Everything you need for your academic journey, organized in one place.</p></div><div class="student-hero-badge"><span></span> Academic account active<br><small>Fall Semester · 2026</small></div></div>
        <div class="student-stat-grid">
          <a href="#courses" class="student-stat-card"><span class="student-stat-icon blue">▤</span><span><small>Assigned class</small><strong>BSCS 4A</strong><em>Computer Science</em></span><b>↗</b></a>
          <a href="#profile" class="student-stat-card"><span class="student-stat-icon green">✦</span><span><small>Assigned SVL</small><strong>Dr. Ayesha Khan</strong><em>Your class supervisor</em></span><b>↗</b></a>
          <a href="#class-room" class="student-stat-card"><span class="student-stat-icon purple">♧</span><span><small>Classmates</small><strong>32 Students</strong><em>Connected to your class</em></span><b>↗</b></a>
          <a href="#attendance" class="student-stat-card"><span class="student-stat-icon orange">✓</span><span><small>Attendance</small><strong>88% <mark>Good</mark></strong><em>Current attendance</em></span><b>↗</b></a>
        </div>
        <div class="student-quick-grid">
          <a class="student-quick-card primary" href="#class-room"><span>◉</span><strong>Class Room<small>Connect with your class</small></strong><b>→</b></a>
          <a class="student-quick-card" href="#timetable"><span>□</span><strong>Timetable<small>View today's schedule</small></strong><b>→</b></a>
          <a class="student-quick-card" href="#notes"><span>▧</span><strong>Slides & Notes<small>Study resources</small></strong><b>→</b></a>
          <a class="student-quick-card" href="#assignments"><span>✓</span><strong>Assignments<small>Track your deadlines</small></strong><b>→</b></a>
        </div>
        <div class="student-panels-grid">
          <section class="student-panel"><div class="student-panel-head"><div><small>YOUR SCHEDULE</small><h2>Today's timetable</h2></div><a href="#timetable">View full timetable →</a></div><div class="student-schedule"><div class="student-schedule-row current"><time>09:00<small>AM</small></time><i></i><div><strong>Web Engineering</strong><small>Room 204 · Dr. Ayesha Khan</small></div><mark>Next</mark></div><div class="student-schedule-row"><time>11:00<small>AM</small></time><i></i><div><strong>Database Systems</strong><small>Room 108 · Mr. Hamza Ali</small></div></div><div class="student-schedule-row"><time>02:00<small>PM</small></time><i></i><div><strong>Software Project</strong><small>Lab 3 · Dr. Ayesha Khan</small></div></div></div></section>
          <section class="student-panel"><div class="student-panel-head"><div><small>CLASS UPDATES</small><h2>Latest notices</h2></div><a href="#notifications">See all →</a></div><a class="student-notice" href="#notifications"><span>!</span><div><strong>Project proposal submission</strong><small>Submit your proposal before Friday.</small><time>Today · 2 hours ago</time></div><b>›</b></a><a class="student-notice" href="#notifications"><span>▣</span><div><strong>Next class presentation</strong><small>Presentations begin next Monday.</small><time>Yesterday</time></div><b>›</b></a></section>
          <section class="student-panel"><div class="student-panel-head"><div><small>STUDY MATERIAL</small><h2>SVL slides & notes</h2></div><a href="#notes">Open library →</a></div><a class="student-resource" href="#notes"><span class="student-file pdf">PDF</span><div><strong>Web Engineering — Lecture 06</strong><small>Uploaded today · 2.4 MB</small></div><b>↓</b></a><a class="student-resource" href="#notes"><span class="student-file doc">DOC</span><div><strong>Software Project Guidelines</strong><small>Uploaded yesterday · 1.1 MB</small></div><b>↓</b></a></section>
          <section class="student-panel"><div class="student-panel-head"><div><small>YOUR COMMUNITY</small><h2>Class room</h2></div><a href="#class-room">Open room →</a></div><div class="student-community"><div class="student-people"><span>AK</span><span>HA</span><span>SR</span><span>+29</span></div><strong>Stay connected with BSCS 4A</strong><p>Ask questions, share ideas, discuss assignments and connect with your classmates.</p><a href="#class-room">Enter class room →</a></div></section>
        </div>
      </section>
      <nav class="student-mobile-nav"><a class="active" href="#home">⌂<small>Home</small></a><a href="#courses">▤<small>Courses</small></a><a href="#notes">▧<small>Notes</small></a><a href="#class-room">◉<small>Room</small></a><a href="#profile">○<small>Profile</small></a></nav>
    </main>
  </div>`;
  const toggle=app.querySelector('.student-menu-toggle');
  toggle?.addEventListener('click',()=>app.querySelector('.student-sidebar')?.classList.toggle('open'));
}
window.renderStudentHome=studentHome;
window.addEventListener('hashchange',studentHome);
studentHome();
})();