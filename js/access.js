(function(){
  const protectedRoutes={
    '#student-dashboard':'student',
    '#svl-dashboard':'svl',
    '#admin':'admin'
  };
  function checkAccess(){
    const required=protectedRoutes[location.hash];
    if(!required) return;
    const role=localStorage.getItem('portalRole');
    if(role!==required){
      location.hash='#login';
      setTimeout(()=>alert('Please select the correct portal for this page.'),50);
    }
  }
  window.addEventListener('hashchange',checkAccess);
  checkAccess();
})();
