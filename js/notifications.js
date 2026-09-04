(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const notifications = [
    {id:1,icon:'📚',title:'New course material available',text:'Database Systems lecture slides for Week 4 are now available.',time:'10 minutes ago',type:'Academic',unread:true},
    {id:2,icon:'⏰',title:'Assignment due soon',text:'Web Engineering assignment is due tomorrow at 11:59 PM.',time:'2 hours ago',type:'Deadline',unread:true},
    {id:3,icon:'💬',title:'New discussion reply',text:'A classmate replied to your question in Software Design.',time:'Yesterday',type:'Discussion',unread:false},
    {id:4,icon:'✅',title:'Submission graded',text:'Your Computer Networks assignment has been graded.',time:'2 days ago',type:'Result',unread:false}
  ];

  function render(){
    if(location.hash !== '#notifications') return;
    app.innerHTML = `<main class="notifications-page"><header class="notifications-header"><div><p class="eyebrow">Stay up to date</p><h1>Notifications</h1><p>Important updates from your courses and campus.</p></div><div class="notification-actions"><button id="markAll">Mark all as read</button><select class="notification-filter" id="filter"><option value="all">All notifications</option><option value="unread">Unread</option></select></div></header><section class="notification-list" id="notificationList"></section></main>`;
    draw();
    document.getElementById('markAll').onclick=()=>{notifications.forEach(n=>n.unread=false);draw()};
    document.getElementById('filter').onchange=draw;
  }

  function draw(){
    const filter=document.getElementById('filter')?.value||'all';
    const list=document.getElementById('notificationList');
    if(!list)return;
    const visible=notifications.filter(n=>filter==='all'||n.unread);
    list.innerHTML=visible.length?visible.map(n=>`<article class="notification-item ${n.unread?'unread':''}" data-id="${n.id}"><div class="notification-icon">${n.icon}</div><div class="notification-content"><h3>${n.title}</h3><p>${n.text}</p><div class="notification-meta"><span>${n.type}</span><span>${n.time}</span></div></div><button class="dismiss" aria-label="Mark notification as read">${n.unread?'○':'✓'}</button></article>`).join(''):'<p class="empty-state">You have no notifications in this view.</p>';
    list.querySelectorAll('.notification-item').forEach(item=>item.onclick=()=>{const n=notifications.find(x=>x.id==item.dataset.id);if(n)n.unread=false;draw()});
  }
  window.addEventListener('hashchange',render);render();
})();