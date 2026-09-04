(function(){
  const routes={
    '#student-dashboard':{roles:['student'],fallback:'#login'},
    '#svl-dashboard':{roles:['svl'],fallback:'#login'},
    '#admin':{roles:['admin'],fallback:'#login'},
    '#admin-management':{roles:['admin'],fallback:'#login'},
    '#notes':{roles:['student','svl'],fallback:'#login'},
    '#courses':{roles:['student'],fallback:'#student-dashboard'},
    '#course-details':{roles:['student'],fallback:'#student-dashboard'},
    '#discussions':{roles:['student','svl'],fallback:'#login'},
    '#assignments':{roles:['student','svl'],fallback:'#login'},
    '#timetable':{roles:['student','svl'],fallback:'#login'},
    '#attendance':{roles:['student','svl'],fallback:'#login'},
    '#notifications':{roles:['student','svl','admin'],fallback:'#login'},
    '#profile':{roles:['student','svl','admin'],fallback:'#login'},
    '#settings':{roles:['student','svl','admin'],fallback:'#login'},
    '#help':{roles:['student','svl','admin'],fallback:'#login'},
    '#class-room':{roles:['student','svl'],fallback:'#login'},
    '#login':{roles:null},
    '#logout':{roles:null},
    '#':{roles:null}
  };
  function role(){return localStorage.getItem('portalRole');}
  function normalize(){
    const hash=location.hash || '#login';
    const route=routes[hash];
    if(!route){ location.hash=role()==='student'?'#student-dashboard':'#login'; return; }
    if(route.roles && !route.roles.includes(role())){
      location.hash=route.fallback || '#login';
      setTimeout(()=>alert('You do not have permission to access this section.'),80);
      return;
    }
    document.body.classList.add('route-ready');
  }
  window.addEventListener('hashchange',normalize);
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href^="#"]');
    if(link && link.getAttribute('href')!=='#'){
      document.body.classList.add('route-loading');
      setTimeout(()=>document.body.classList.remove('route-loading'),300);
    }
  });
  normalize();
})();
