(function(){
  function rolePage(){
    return `<main class="mcm-landing">
      <div class="mcm-overlay"></div>
      <header class="mcm-topbar">
        <a class="mcm-brand" href="#login" aria-label="MCM home">
          <span class="mcm-brand-mark">⌂</span>
          <span><strong>MCM</strong><small>My Class Matters</small></span>
        </a>
        <div class="mcm-topline">Better classes. Brighter futures.</div>
      </header>
      <div class="mcm-layout">
        <section class="mcm-intro">
          <p class="mcm-eyebrow">WELCOME TO MCM</p>
          <h1>My Class<br><span>Matters</span></h1>
          <p class="mcm-lead">A smarter, simpler and more connected university experience for every student.</p>
          <div class="mcm-highlights">
            <div><span>▣</span><b>Access<br>Notes</b></div>
            <div><span>♧</span><b>Connect<br>with Your Class</b></div>
            <div><span>▦</span><b>Stay on Top<br>of Your Schedule</b></div>
            <div><span>▥</span><b>Track Your<br>Progress</b></div>
          </div>
          <p class="mcm-tagline">Same campus,<br>stronger together.</p>
        </section>
        <section class="mcm-login-panel" aria-label="MCM login options">
          <div class="mcm-panel-heading"><p>WELCOME BACK</p><h2>Login to MCM</h2><span>Choose your role to continue</span></div>
          <div class="mcm-login-options">
            <button class="mcm-login-option student" data-role="student"><span class="mcm-option-icon">🎓</span><span class="mcm-option-copy"><strong>Student Login</strong><small>Access your classes, notes and more</small></span><b>›</b></button>
            <button class="mcm-login-option svl" data-role="svl"><span class="mcm-option-icon">♟</span><span class="mcm-option-copy"><strong>SVL Login</strong><small>Manage your class and connect with students</small></span><b>›</b></button>
          </div>
          <div class="mcm-quote"><span></span><em>Learning today, leading tomorrow</em><span></span></div>
          <p class="mcm-panel-note">Your class. Your progress. Your community.</p>
        </section>
      </div>
      <footer class="mcm-footer"><span><strong>MCM</strong> · My Class Matters</span><span>Empowering education, building futures</span><span class="mcm-secret" title="Admin access">© ${new Date().getFullYear()} MCM</span></footer>
    </main>`;
  }
  function render(){
    if(location.hash==='#login'||!location.hash){
      document.querySelector('#app').innerHTML=rolePage();
      document.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>{const r=b.dataset.role;localStorage.setItem('portalRole',r);location.hash=r==='svl'?'svl-dashboard':'student-dashboard'}));
      let taps=0; const secret=document.querySelector('.mcm-secret');
      secret.addEventListener('click',()=>{taps++; if(taps>=5){localStorage.setItem('portalRole','admin');location.hash='admin';taps=0;}});
      document.addEventListener('keydown',adminShortcut,{once:true});
    }
  }
  function adminShortcut(e){if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==='a'){localStorage.setItem('portalRole','admin');location.hash='admin';}else if(location.hash==='#login'){document.addEventListener('keydown',adminShortcut,{once:true});}}
  window.addEventListener('hashchange',render);render();
})();