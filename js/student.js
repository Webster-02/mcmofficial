(function(){
'use strict';
function renderStudent(){
  if(location.hash!=='#student-dashboard') return;
  const app=document.getElementById('app'); if(!app) return;
  app.innerHTML=`<main class="student-page">
    <section class="student-topbar">
      <div class="student-mobile-brand"><span class="brand-mark">◆</span><strong>UniConnect</strong></div>
      <div class="student-search"><span>⌕</span><input aria-label="Search portal" placeholder="Search courses, notes, discussions..." /></div>
      <div class="student-top-actions"><button class="icon-action" aria-label="Notifications">♧<b>3</b></button><div class="student-user"><span class="user-avatar">D</span><span><strong>Danish</strong><small>Student</small></span><span class="user-chevron">⌄</span></div></div>
    </section>

    <section class="student-hero student-hero-image">
      <div class="student-hero-copy"><p class="student-eyebrow">MY CLASS MATTERS · STUDENT SPACE</p><h1>Good morning, Danish <span>👋</span></h1><p>Stay consistent, keep learning, and make progress every day.</p></div>
      <div class="student-semester-card"><strong>Fall Semester · 2026</strong><span><i></i> Academic account active</span><small>BS Computer Science</small><small>Class: BSCS 4A</small><small>SVL: Dr. Ayesha Khan</small></div>
    </section>

    <section class="student-section-heading"><div><p class="panel-kicker">YOUR PORTAL</p><h2>Quick actions</h2></div><span class="section-hint">Everything you need, in one place</span></section>
    <section class="student-quick-actions student-quick-actions-six">
      <a class="quick-action" href="#courses"><span class="quick-symbol blue">▣</span><span><strong>My Courses</strong><small>View all courses</small></span><b>→</b></a>
      <a class="quick-action" href="#notes"><span class="quick-symbol green">▤</span><span><strong>Slides & Notes</strong><small>Access resources</small></span><b>→</b></a>
      <a class="quick-action" href="#assignments"><span class="quick-symbol orange">✓</span><span><strong>Assignments</strong><small>Track deadlines</small></span><b>→</b></a>
      <a class="quick-action" href="#class-room"><span class="quick-symbol purple">♧</span><span><strong>Class Room</strong><small>Join your class</small></span><b>→</b></a>
      <a class="quick-action" href="#discussions"><span class="quick-symbol pink">◌</span><span><strong>Discussions</strong><small>Ask and learn</small></span><b>→</b></a>
      <a class="quick-action" href="#timetable"><span class="quick-symbol teal">□</span><span><strong>Timetable</strong><small>View schedule</small></span><b>→</b></a>
    </section>

    <section class="student-dashboard-grid">
      <article class="student-panel schedule-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR SCHEDULE</p><h2>Today’s classes</h2></div><a href="#timetable">View timetable →</a></div><div class="schedule-list"><div class="schedule-row active"><time>09:00<span>AM</span></time><span class="schedule-line"></span><div class="schedule-info"><strong>Web Engineering</strong><small>Room 204 · Dr. Ayesha Khan</small></div><span class="schedule-tag">Next</span></div><div class="schedule-row"><time>11:00<span>AM</span></time><span class="schedule-line"></span><div class="schedule-info"><strong>Database Systems</strong><small>Room 108 · Mr. Hamza Ali</small></div></div><div class="schedule-row"><time>02:00<span>PM</span></time><span class="schedule-line"></span><div class="schedule-info"><strong>Software Project</strong><small>Lab 3 · Dr. Ayesha Khan</small></div></div></div></article>
      <article class="student-panel assignments-panel"><div class="panel-heading"><div><p class="panel-kicker">KEEP MOVING</p><h2>Upcoming assignments</h2></div><a href="#assignments">View all →</a></div><div class="assignment-mini"><span class="mini-icon orange">▤</span><div><strong>Data Structures Assignment 2</strong><small>Due: 5 Sep 2026</small></div><em>2 days left</em></div><div class="assignment-mini"><span class="mini-icon green">✓</span><div><strong>Web Development Project</strong><small>Due: 10 Sep 2026</small></div><em>1 week left</em></div><div class="assignment-mini"><span class="mini-icon blue">▣</span><div><strong>Business Communication Essay</strong><small>Due: 15 Sep 2026</small></div><em>2 weeks left</em></div></article>
      <article class="student-panel progress-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR PROGRESS</p><h2>Learning overview</h2></div><a href="#attendance">Details →</a></div><div class="progress-layout"><div class="progress-ring"><strong>88%</strong><small>Attendance</small></div><div class="progress-stats"><span><i class="dot green-dot"></i>Present <b>88%</b></span><span><i class="dot blue-dot"></i>Assignments <b>6/8</b></span><span><i class="dot purple-dot"></i>Courses <b>5 active</b></span></div></div></article>
      <article class="student-panel notices-panel"><div class="panel-heading"><div><p class="panel-kicker">CLASS UPDATES</p><h2>Latest notices</h2></div><a href="#notifications">See all →</a></div><a class="notice-item" href="#notifications"><span class="notice-icon orange">!</span><span><strong>Project proposal submission</strong><small>Submit your proposal before Friday.</small><time>Today · 2 hours ago</time></span><b>›</b></a><a class="notice-item" href="#notifications"><span class="notice-icon blue">▣</span><span><strong>Next class presentation</strong><small>Presentations begin next Monday.</small><time>Yesterday</time></span><b>›</b></a></article>
      <article class="student-panel resources-panel"><div class="panel-heading"><div><p class="panel-kicker">STUDY MATERIAL</p><h2>Latest slides & notes</h2></div><a href="#notes">Open library →</a></div><a class="resource-item" href="#notes"><span class="file-icon pdf">PDF</span><span><strong>Web Engineering — Lecture 06</strong><small>Uploaded today · 2.4 MB</small></span><b>↓</b></a><a class="resource-item" href="#notes"><span class="file-icon doc">DOC</span><span><strong>Software Project Guidelines</strong><small>Uploaded yesterday · 1.1 MB</small></span><b>↓</b></a><a class="resource-item" href="#notes"><span class="file-icon pdf">PDF</span><span><strong>Database Systems — Revision</strong><small>Uploaded 2 days ago · 3.2 MB</small></span><b>↓</b></a></article>
      <article class="student-panel community-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR COMMUNITY</p><h2>Class room</h2></div><a href="#class-room">Open room →</a></div><div class="community-avatars"><span>AK</span><span>HA</span><span>SR</span><span>FM</span><span>+28</span></div><strong>Stay connected with BSCS 4A</strong><p>Ask questions, share ideas, discuss assignments and connect with classmates.</p><a class="community-link" href="#class-room">Enter class room <span>→</span></a></article>
    </section>
    <footer class="student-footer"><span>MCM Student Portal</span><span class="footer-divider"></span><a href="#profile">View profile</a><span class="footer-divider"></span><a href="#help">Need help?</a></footer>
  </main>`;
}
window.renderStudent=renderStudent;
window.addEventListener('hashchange',renderStudent);
renderStudent();
})();