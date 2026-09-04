(function(){
  function renderStudent(){
    if(location.hash !== '#student-dashboard') return;
    const app=document.getElementById('app'); if(!app) return;
    app.innerHTML=`<main class="student-page">
      <section class="student-hero"><div><p class="muted">My learning space</p><h1>Student Dashboard</h1><p>Welcome back. Here is your assigned class information.</p></div><span class="student-badge">Student Portal</span></section>
      <section class="student-grid">
        <div class="student-card"><span>Assigned Class</span><strong>BSCS 4A</strong></div>
        <div class="student-card"><span>Assigned SVL</span><strong>Dr. Ayesha Khan</strong></div>
        <div class="student-card"><span>Classmates</span><strong>32 Students</strong></div>
        <div class="student-card"><span>Attendance</span><strong>88%</strong></div>
      </section>
      <section class="student-feature-card"><div class="feature-icon">💬</div><div><p class="muted">Your private class community</p><h2>BSCS 4A Class Room</h2><p>Chat with classmates, ask questions, share documents and connect with your SVL in one smooth space.</p></div><a class="student-feature-btn" href="#class-room">Open Class Room <span>→</span></a></section>
      <section class="student-layout">
        <div class="student-panel"><h2>Today’s Timetable</h2><div class="student-list"><div class="student-item"><strong>09:00 AM — Web Engineering</strong><small>Room 204 · Dr. Ayesha Khan</small></div><div class="student-item"><strong>11:00 AM — Database Systems</strong><small>Room 108 · Mr. Hamza Ali</small></div><div class="student-item"><strong>02:00 PM — Software Project</strong><small>Lab 3 · Dr. Ayesha Khan</small></div></div></div>
        <div class="student-panel"><h2>Latest Class Notices</h2><div class="student-list"><div class="student-item"><strong>Project proposal submission</strong><small>Submit your proposal before Friday.</small></div><div class="student-item"><strong>Next class presentation</strong><small>Presentations will begin next Monday.</small></div></div></div>
        <div class="student-panel"><h2>SVL Slides & Notes</h2><div class="student-list"><div class="student-item"><strong>Web Engineering — Lecture 06</strong><small>Uploaded today · PDF slides</small></div><div class="student-item"><strong>Software Project Guidelines</strong><small>Uploaded yesterday · Notes</small></div></div></div>
        <div class="student-panel"><h2>Class Community</h2><div class="student-list"><div class="student-item"><strong>12 new discussion messages</strong><small>Classmates are discussing the project deadline.</small></div><div class="student-item"><strong>3 assignment updates</strong><small>Review your upcoming submissions.</small></div></div></div>
      </section>
      <div class="student-actions"><a href="#timetable">View Timetable</a><a href="#notes" class="secondary">Open Notes</a><a href="#class-room" class="secondary">Class Room</a><a href="#attendance" class="secondary">Attendance</a><a href="#login" class="secondary">Switch Role</a></div>
    </main>`;
  }
  window.addEventListener('hashchange',renderStudent); renderStudent();
})();