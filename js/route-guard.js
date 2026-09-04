(function(){
  const knownRoutes=new Set(['','student-dashboard','svl-dashboard','admin','login','courses','course-details','notes','discussions','assignments','timetable','notifications','profile','settings','help','logout','attendance','class-room']);
  function normalize(){
    const hash=location.hash.replace(/^#/,'');
    if(!knownRoutes.has(hash)){
      location.hash=localStorage.getItem('portalRole')==='student'?'#student-dashboard':'#login';
      return;
    }
    document.body.classList.add('route-ready');
  }
  window.addEventListener('hashchange',normalize);
  document.addEventListener('click',function(e){
    const link=e.target.closest('a[href^="#"]');
    if(!link)return;
    const target=link.getAttribute('href');
    if(target && target!=='#') document.body.classList.add('route-loading');
    setTimeout(()=>document.body.classList.remove('route-loading'),350);
  });
  normalize();
})();
