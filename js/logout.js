(function(){
  function logoutPage(){return `<section class="content auth-state"><div class="auth-card panel"><div class="auth-icon">↪</div><p class="eyebrow">SESSION</p><h1>You’re signed out</h1><p class="muted">Your demo session has ended. Sign in again to continue using UniConnect.</p><a class="primary-btn" href="#">Return to Dashboard</a></div></section>`}
  function renderLogout(){if(location.hash==='#logout'){const app=document.querySelector('#app');if(app)app.innerHTML=logoutPage()}}
  window.addEventListener('hashchange',renderLogout);renderLogout();
})();
