(function(){
'use strict';

const esc=value=>String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[char]));
const initials=name=>String(name||'Student').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const formatDate=value=>{if(!value)return 'Not available';const d=new Date(value);return Number.isNaN(d.getTime())?'Not available':d.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});};
const formatTime=value=>value?String(value).slice(0,5):'--:--';

function sidebar(){return `<aside class="student-sidebar"><div class="student-brand"><span class="student-brand-mark">◆</span><span>UniConnect</span></div><nav class="student-side-nav">
<a class="active" href="#home"><span>⌂</span>Home</a><a href="#courses"><span>▤</span>My Courses</a><a href="#notes"><span>▧</span>Slides & Notes</a><a href="#discussions"><span>☷</span>Discussions</a><a href="#class-room"><span>◉</span>Class Room</a><a href="#assignments"><span>✓</span>Assignments</a><a href="#timetable"><span>□</span>Timetable</a><a href="#notifications"><span>♧</span>Notifications</a><a href="#profile"><span>○</span>Profile</a>
</nav><div class="student-side-bottom"><a href="#settings">⚙ Settings</a><a href="#help">? Help & Support</a><a href="#logout">↪ Logout</a></div></aside>`;}

function topbar(profile){const name=profile?.full_name||'Student';return `<header class="student-topbar"><button class="student-menu-toggle" aria-label="Open navigation">☰</button><div class="student-mobile-brand"><span class="student-brand-mark">◆</span><strong>UniConnect</strong></div><div class="student-search">Search courses, notes, discussions...</div><div class="student-user"><span class="student-notification">♧</span><span class="student-user-avatar">${esc(initials(name))}</span><span><strong>${esc(name)}</strong><small>Student</small></span><span>⌄</span></div></header>`;}

function empty(label){return `<div class="student-empty-state">${esc(label)}</div>`;}

function dashboardMarkup(data){
 const {profile,membership,klass,svl,classmates,notices,notes,timetable}=data;
 const className=klass?.name||'No class assigned';
 const classCode=klass?.code||'Class assignment pending';
 const svlName=svl?.full_name||'No SVL assigned';
 const today=new Date().toLocaleDateString(undefined,{weekday:'long'});
 const todayClasses=(timetable||[]).filter(x=>String(x.day||'').toLowerCase()===today.toLowerCase()).slice(0,3);
 const schedule=todayClasses.length?todayClasses.map((x,i)=>`<div class="schedule-row ${i===0?'active':''}"><time>${esc(formatTime(x.start_time))}<span></span></time><span class="schedule-line"></span><div class="schedule-info"><strong>${esc(x.subject)}</strong><small>${esc(x.room||'Room not specified')}</small></div>${i===0?'<span class="schedule-tag">Next</span>':''}</div>`).join(''):empty('No timetable has been published for today.');
 const noticeMarkup=notices.length?notices.slice(0,3).map(n=>`<a class="notice-item" href="#notifications"><span class="notice-icon orange">!</span><span><strong>${esc(n.title)}</strong><small>${esc(n.body)}</small><time>${esc(formatDate(n.created_at))}</time></span><b>›</b></a>`).join(''):empty('No notices have been published yet.');
 const noteMarkup=notes.length?notes.slice(0,3).map(n=>`<a class="resource-item" href="#notes"><span class="file-icon pdf">FILE</span><span><strong>${esc(n.title)}</strong><small>Uploaded ${esc(formatDate(n.created_at))}</small></span><b>→</b></a>`).join(''):empty('No slides or notes have been uploaded yet.');
 return `<div class="student-app-shell"><aside class="student-sidebar">${sidebar().replace('<aside class="student-sidebar">','').replace('</aside>','')}</aside><main class="student-main-area">${topbar(profile)}<section class="student-dashboard-content">
 <div class="student-dashboard-hero"><div><p class="student-label">MY CLASS MATTERS · STUDENT PORTAL</p><h1>Welcome back, ${esc(profile?.full_name||'Student')} <span>👋</span></h1><p>Your academic information, class resources, and updates in one place.</p></div><div class="student-hero-badge"><span></span> Academic account active<br><small>Student Portal</small></div></div>
 <div class="student-stat-grid"><div class="student-stat-card"><span class="student-stat-icon blue">▤</span><span><small>Assigned class</small><strong>${esc(className)}</strong><em>${esc(classCode)}</em></span></div><div class="student-stat-card"><span class="student-stat-icon green">✦</span><span><small>Assigned SVL</small><strong>${esc(svlName)}</strong><em>Your class supervisor</em></span></div><div class="student-stat-card"><span class="student-stat-icon purple">♧</span><span><small>Classmates</small><strong>${classmates.length?`${classmates.length} Students`:'Not available'}</strong><em>Assigned to your class</em></span></div><div class="student-stat-card"><span class="student-stat-icon orange">✓</span><span><small>Attendance</small><strong>Not available</strong><em>Attendance data is not connected yet</em></span></div></div>
 <section class="student-section-heading"><div><p class="panel-kicker">YOUR PORTAL</p><h2>Quick actions</h2></div><span class="section-hint">Open the tools assigned to your class</span></section><section class="student-quick-actions student-quick-actions-six"><a class="quick-action" href="#courses"><span class="quick-symbol blue">▣</span><span><strong>My Courses</strong><small>View your courses</small></span><b>→</b></a><a class="quick-action" href="#notes"><span class="quick-symbol green">▤</span><span><strong>Slides & Notes</strong><small>Access class resources</small></span><b>→</b></a><a class="quick-action" href="#assignments"><span class="quick-symbol orange">✓</span><span><strong>Assignments</strong><small>Track deadlines</small></span><b>→</b></a><a class="quick-action" href="#class-room"><span class="quick-symbol purple">♧</span><span><strong>Class Room</strong><small>Connect with your class</small></span><b>→</b></a><a class="quick-action" href="#discussions"><span class="quick-symbol pink">◌</span><span><strong>Discussions</strong><small>Ask and learn</small></span><b>→</b></a><a class="quick-action" href="#timetable"><span class="quick-symbol teal">□</span><span><strong>Timetable</strong><small>View your schedule</small></span><b>→</b></a></section>
 <section class="student-dashboard-grid"><article class="student-panel schedule-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR SCHEDULE</p><h2>Today's classes</h2></div><a href="#timetable">View timetable →</a></div><div class="schedule-list">${schedule}</div></article><article class="student-panel assignments-panel"><div class="panel-heading"><div><p class="panel-kicker">ASSIGNMENTS</p><h2>Assignment area</h2></div><a href="#assignments">Open assignments →</a></div>${empty('Assignment data will appear here when assignments are connected.')}</article><article class="student-panel progress-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR PROGRESS</p><h2>Learning overview</h2></div><a href="#attendance">View attendance →</a></div>${empty('Attendance data will appear here when attendance is connected.')}</article><article class="student-panel notices-panel"><div class="panel-heading"><div><p class="panel-kicker">CLASS UPDATES</p><h2>Latest notices</h2></div><a href="#notifications">See all →</a></div>${noticeMarkup}</article><article class="student-panel resources-panel"><div class="panel-heading"><div><p class="panel-kicker">STUDY MATERIAL</p><h2>Latest slides & notes</h2></div><a href="#notes">Open library →</a></div>${noteMarkup}</article><article class="student-panel community-panel"><div class="panel-heading"><div><p class="panel-kicker">YOUR COMMUNITY</p><h2>Class room</h2></div><a href="#class-room">Open room →</a></div><div class="community-avatars">${classmates.slice(0,4).map(x=>`<span>${esc(initials(x.profiles?.full_name||x.full_name))}</span>`).join('')}${classmates.length>4?`<span>+${classmates.length-4}</span>`:''}</div><strong>${esc(className)}</strong><p>Connect with the students assigned to your class.</p><a class="community-link" href="#class-room">Enter class room <span>→</span></a></article></section></section><nav class="student-mobile-nav"><a class="active" href="#home">⌂<small>Home</small></a><a href="#courses">▤<small>Courses</small></a><a href="#notes">▧<small>Notes</small></a><a href="#class-room">◉<small>Room</small></a><a href="#profile">○<small>Profile</small></a></nav></main></div>`;
}

async function loadStudentData(){
 const db=window.mcmDb;if(!db)return {profile:null,membership:null,klass:null,svl:null,classmates:[],notices:[],notes:[],timetable:[]};
 try{
  const profile=await db.profile();
  if(!profile)return {profile:null,membership:null,klass:null,svl:null,classmates:[],notices:[],notes:[],timetable:[]};
  const memberships=await db.members();
  const membership=memberships.find(x=>x.user_id===profile.id)||memberships[0]||null;
  const classId=membership?.class_id;
  const classes=classId?await db.classes():[];
  const klass=classes.find(x=>String(x.id)===String(classId))||null;
  const classmates=classId?await db.members(classId):[];
  const svlId=membership?.svl_id;
  let svl=null;
  if(svlId){const profiles=await db.profiles();svl=profiles.find(x=>x.id===svlId)||null;}
  const [notices,notes,timetable]=await Promise.all([db.notices(classId),db.notes(classId),db.timetable(classId)]);
  return {profile,membership,klass,svl,classmates:classmates.filter(x=>x.user_id!==profile.id),notices,notes,timetable};
 }catch(error){console.warn('Student data loading failed:',error);return {profile:null,membership:null,klass:null,svl:null,classmates:[],notices:[],notes:[],timetable:[]};}
}

async function studentHome(){
 const hash=location.hash;if(hash&&hash!=='#'&&hash!=='#home'&&hash!=='#student-dashboard')return;
 const app=document.getElementById('app');if(!app)return;
 app.innerHTML='<div class="student-loading-screen">Loading your academic portal...</div>';
 const data=await loadStudentData();
 app.innerHTML=dashboardMarkup(data);
 app.querySelector('.student-menu-toggle')?.addEventListener('click',()=>app.querySelector('.student-sidebar')?.classList.toggle('open'));
}
window.renderStudentHome=studentHome;window.addEventListener('hashchange',studentHome);studentHome();
})();