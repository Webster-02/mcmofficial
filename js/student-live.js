(function(){
'use strict';
async function renderLiveStudent(){
  if(location.hash!=='#student-dashboard') return;
  const app=document.getElementById('app'); if(!app) return;
  const db=window.mcmDb;
  if(!db){return;}
  try{
    const user=await db.user();
    const profile=await db.profile();
    if(!user||!profile){return;}
    const classes=await db.classes();
    const allMembers=[];
    for(const c of classes){const rows=await db.members(c.id);rows.forEach(r=>allMembers.push({...r,class:c}));}
    const mine=allMembers.find(r=>r.user_id===user.id);
    const cls=mine?.class;
    const classmates=cls?allMembers.filter(r=>String(r.class_id)===String(cls.id)&&r.user_id!==user.id&&r.profiles?.role==='student'):[];
    const svl=cls?allMembers.find(r=>String(r.class_id)===String(cls.id)&&(r.member_type==='svl'||r.profiles?.role==='svl')):null;
    const notes=cls?await db.notes(cls.id):[];
    const notices=cls?await db.notices(cls.id):[];
    const timetable=cls?await db.timetable(cls.id):[];
    const esc=x=>String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    const list=(items,empty)=>items.length?items.map(x=>`<div class="student-item"><strong>${esc(x.title||x.subject||x.name||'Class update')}</strong><small>${esc(x.body||x.file_url||x.room||x.day||'Available in your class')}</small></div>`).join(''):`<div class="student-item"><small>${empty}</small></div>`;
    app.innerHTML=`<main class="student-page"><section class="student-hero"><div><p class="muted">My learning space</p><h1>Student Dashboard</h1><p>Welcome back, ${esc(profile.full_name||user.email)}.</p></div><span class="student-badge">Student Portal</span></section><section class="student-grid"><div class="student-card"><span>Assigned Class</span><strong>${esc(cls?.name||'Not assigned')}</strong></div><div class="student-card"><span>Assigned SVL</span><strong>${esc(svl?.profiles?.full_name||'Not assigned')}</strong></div><div class="student-card"><span>Classmates</span><strong>${classmates.length} Students</strong></div><div class="student-card"><span>Account</span><strong>Connected</strong></div></section><section class="student-feature-card"><div class="feature-icon">💬</div><div><p class="muted">Your private class community</p><h2>${esc(cls?.name||'Class Room')}</h2><p>Connect with classmates and your assigned SVL.</p></div><a class="student-feature-btn" href="#class-room">Open Class Room <span>→</span></a></section><section class="student-layout"><div class="student-panel"><h2>Today’s Timetable</h2><div class="student-list">${list(timetable,'No timetable has been published yet.')}</div></div><div class="student-panel"><h2>Latest Class Notices</h2><div class="student-list">${list(notices,'No notices have been published yet.')}</div></div><div class="student-panel"><h2>SVL Slides & Notes</h2><div class="student-list">${list(notes,'No slides or notes have been uploaded yet.')}</div></div><div class="student-panel"><h2>Classmates</h2><div class="student-list">${classmates.length?classmates.map(x=>`<div class="student-item"><strong>${esc(x.profiles?.full_name||'Student')}</strong><small>${esc(x.profiles?.email||'')}</small></div>`).join(''):'No classmates assigned yet.'}</div></div></section><div class="student-actions"><a href="#timetable">View Timetable</a><a href="#notes" class="secondary">Open Notes</a><a href="#class-room" class="secondary">Class Room</a><a href="#attendance" class="secondary">Attendance</a><a href="#login" class="secondary">Switch Role</a></div></main>`;
  }catch(error){console.error(error);app.innerHTML='<main class="student-page"><section class="student-hero"><h1>Student Dashboard</h1><p>Unable to load your class data. Please check your Supabase profile and class assignment.</p></section></main>';}
}
window.renderStudent=renderLiveStudent;
window.addEventListener('hashchange',renderLiveStudent);
if(location.hash==='#student-dashboard') renderLiveStudent();
})();
