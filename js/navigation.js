const courses = [
  { name: 'Data Structures', code: 'CS-201', teacher: 'Prof. Dr. Ahmed Khan', progress: 75 },
  { name: 'Web Development', code: 'CS-310', teacher: 'Ms. Sara Malik', progress: 60 },
  { name: 'Business Communication', code: 'BA-105', teacher: 'Dr. Nadia Rehman', progress: 90 },
  { name: 'Digital Marketing', code: 'MKT-220', teacher: 'Mr. Hamza Ali', progress: 40 }
];

const materials = [
  ['Lecture 01 — Introduction', 'Data Structures · 5 Sep 2025', 'PDF'],
  ['Week 1 — Notes', 'Business Communication · 3 Sep 2025', 'DOC'],
  ['HTML & CSS Basics', 'Web Development · 1 Sep 2025', 'PDF'],
  ['Recorded Lecture — Week 2', 'Digital Marketing · 28 Aug 2025', '▶']
];

const assignments = [
  ['Quiz 01', 'Data Structures', '12 Sep 2025', 'Pending'],
  ['Project Report', 'Web Development', '15 Sep 2025', 'In Progress'],
  ['Essay Submission', 'Business Communication', '20 Sep 2025', 'Pending'],
  ['Final Presentation', 'Digital Marketing', '25 Sep 2025', 'Not Started']
];

function courseCard(c, i) {
  return `<article class="course-card"><div class="course-icon">${['</>', '▣', '👥', '▥'][i]}</div><h3>${c.name}</h3><p>${c.code}</p><p>${c.teacher}</p><div class="progress"><span style="width:${c.progress}%"></span></div><p>${c.progress}% complete</p></article>`;
}

function materialRow(m) {
  return `<div class="row"><div class="file-icon">${m[2]}</div><div class="row-main"><strong>${m[0]}</strong><span>${m[1]}</span></div><button class="icon-btn" aria-label="Download">↓</button></div>`;
}

function assignmentRow(a) {
  const type = a[3] === 'Pending' ? 'pending' : a[3] === 'In Progress' ? 'progress' : '';
  return `<div class="row"><div class="file-icon">▤</div><div class="row-main"><strong>${a[0]}</strong><span>${a[1]} · Due ${a[2]}</span></div><span class="status ${type}">${a[3]}</span></div>`;
}

function dashboard() {
  document.querySelector('#app').innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><span class="brand-mark">◆</span> UniConnect</div>
        <nav class="nav">
          <a class="active" href="#"><span class="nav-icon">⌂</span>Home</a>
          <a href="#"><span class="nav-icon">▤</span>My Courses</a>
          <a href="#"><span class="nav-icon">▧</span>Slides & Notes</a>
          <a href="#"><span class="nav-icon">☷</span>Discussions</a>
          <a href="#"><span class="nav-icon">✓</span>Assignments</a>
          <a href="#"><span class="nav-icon">□</span>Timetable</a>
          <a href="#"><span class="nav-icon">♧</span>Notifications</a>
          <a href="#"><span class="nav-icon">○</span>Profile</a>
        </nav>
        <div class="sidebar-bottom">
          <a href="#"><span class="nav-icon">⚙</span>Settings</a>
          <a href="#"><span class="nav-icon">?</span>Help & Support</a>
          <a href="#"><span class="nav-icon">↪</span>Logout</a>
        </div>
      </aside>
      <main class="main">
        <header class="header">
          <button class="menu-button" aria-label="Open menu">☰</button>
          <input class="search" placeholder="Search courses, notes, discussions..." />
          <div class="user">
            <button class="notification" aria-label="Notifications">♧<span class="badge">3</span></button>
            <div class="avatar">D</div>
            <div><strong>Danish</strong><br><span style="color:var(--muted)">Student</span></div>
            <span>⌄</span>
          </div>
        </header>
        <section class="content">
          <div class="welcome"><h1>Welcome back, Danish! 👋</h1><p>Keep learning, keep growing.</p></div>

          <div class="section-title"><h2>My Courses</h2><a class="link" href="#">View All</a></div>
          <div class="grid course-grid">${courses.map(courseCard).join('')}</div>

          <div class="grid two-col">
            <section><div class="section-title"><h2>Recent Slides & Notes</h2><a class="link" href="#">View All</a></div><div class="panel list">${materials.map(materialRow).join('')}</div></section>
            <section><div class="section-title"><h2>Upcoming Assignments</h2><a class="link" href="#">View All</a></div><div class="panel list">${assignments.map(assignmentRow).join('')}</div></section>
          </div>

          <div class="grid three-col">
            <section><div class="section-title"><h2>Today’s Classes</h2><a class="link" href="#">View All</a></div><div class="panel list">${[
              ['Data Structures','10:00 AM – 11:00 AM','Room A-101'],
              ['Business Communication','12:00 PM – 1:00 PM','Room B-203'],
              ['Web Development','2:00 PM – 3:00 PM','Online']
            ].map(x=>`<div class="row"><div class="file-icon">•</div><div class="row-main"><strong>${x[0]}</strong><span>${x[1]} · ${x[2]}</span></div></div>`).join('')}</div></section>
            <section><div class="section-title"><h2>Notifications</h2><a class="link" href="#">View All</a></div><div class="panel list">${[
              ['New note uploaded','Data Structures · 2 hours ago'],
              ['3 new replies','Web Development discussion · 5 hours ago'],
              ['Assignment deadline updated','Digital Marketing · 1 day ago']
            ].map(x=>`<div class="row"><div class="file-icon">•</div><div class="row-main"><strong>${x[0]}</strong><span>${x[1]}</span></div></div>`).join('')}</div></section>
            <section><div class="section-title"><h2>Your Progress</h2></div><div class="panel"><h3 style="margin-top:0">Small progress leads to big results.</h3><p style="color:var(--muted)">Overall learning progress</p><div class="progress"><span style="width:68%"></span></div><p><strong>68%</strong> complete</p></div></section>
          </div>
        </section>
        <nav class="mobile-nav"><a class="active" href="#"><span class="nav-icon">⌂</span>Home</a><a href="#"><span class="nav-icon">▤</span>Courses</a><a href="#"><span class="nav-icon">▧</span>Notes</a><a href="#"><span class="nav-icon">☷</span>Discussions</a><a href="#"><span class="nav-icon">○</span>Profile</a></nav>
      </main>
    </div>`;
}

dashboard();
