(function(){
  function rolePage(){
    return `<main class="mcm-landing"><div class="mcm-overlay"></div><header class="mcm-topbar"><a class="mcm-brand" href="#login"><span class="mcm-brand-mark">⌂</span><span><strong>MCM</strong><small>My Class Matters</small></span></a><div class="mcm-topline">Better classes. Brighter futures.</div></header><div class="mcm-layout"><section class="mcm-intro"><p class="mcm-eyebrow">WELCOME TO MCM</p><h1>My Class<br><span>Matters</span></h1><p class="mcm-lead">A smarter, simpler and more connected university experience for every student.</p><div class="mcm-highlights"><div><span>▣</span><b>Access<br>Notes</b></div><div><span>♧</span><b>Connect<br>with Your Class</b></div><div><span>▦</span><b>Stay on Top<br>of Your Schedule</b></div><div><span>▥</span><b>Track Your<br>Progress</b></div></div><p class="mcm-tagline">Same campus,<br>stronger together.</p></section><section class="mcm-login-panel"><div class="mcm-panel-heading"><p>WELCOME BACK</p><h2>Login to MCM</h2><span>Choose your role to continue</span></div><div class="mcm-login-options"><button class="mcm-login-option student" data-role="student"><span class="mcm-option-icon">🎓</span><span class="mcm-option-copy"><strong>Student Login</strong><small>Access your classes, notes and more</small></span><b>›</b></button><button class="mcm-login-option svl" data-role="svl"><span class="mcm-option-icon">♟</span><span class="mcm-option-copy"><strong>SVL Login</strong><small>Manage your class and connect with students</small></span><b>›</b></button></div><div class="mcm-quote"><span></span><em>Learning today, leading tomorrow</em><span></span></div><p class="mcm-panel-note">Your class. Your progress. Your community.</p></section></div><footer class="mcm-footer"><span><strong>MCM</strong> · My Class Matters</span><span>Empowering education, building futures</span><span class="mcm-secret">© ${new Date().getFullYear()} MCM</span></footer></main>`;
  }
  function openLogin(role){
    const label=role==='svl'?'SVL':'Student';
    const box=document.createElement('div'); box.className='mcm-auth-modal';
    box.innerHTML=`<div class="mcm-auth-card"><button class="mcm-auth-close">×</button><h2>${label} Login</h2><p>Enter your MCM account details</p><form><input type="email" placeholder="Email address" required><input type="password" placeholder="Password" required><div class="mcm-auth-error"></div><button type="submit">Continue</button></form><small>Use an account created in Supabase Authentication.</small></div>`;
    document.body.appendChild(box); box.querySelector('.mcm-auth-close').onclick=()=>box.remove();
    box.querySelector('form').onsubmit=async e=>{e.preventDefault(); const email=box.querySelector('input[type=email]').value.trim(); const password=box.querySelector('input[type=password]').value; const error=box.querySelector('.mcm-auth-error'); const submit=box.querySelector('button[type=submit]'); submit.disabled=true; submit.textContent='Signing in...';
      try{
        const client=window.initMcmSupabase&&window.initMcmSupabase();
        if(!client) throw new Error('Supabase client is not initialized.');
        const result=await client.auth.signInWithPassword({email,password});
        if(result.error) throw result.error;
        const user=result.data.user;
        const profile=await client.from('profiles').select('role,full_name').eq('id',user.id).single();
        if(profile.error) throw new Error('Your account exists, but its MCM profile is missing.');
        if(profile.data.role!==role) throw new Error('This account is not registered as a '+label+' account.');
        localStorage.setItem('portalRole',profile.data.role);
        localStorage.setItem('mcmUserName',profile.data.full_name||user.email);
        box.remove(); location.hash=role==='svl'?'svl-dashboard':'student-dashboard';
      }catch(err){error.textContent=err.message||'Login failed. Please check your details.'; submit.disabled=false; submit.textContent='Continue';}
    };
  }
  function render(){if(location.hash==='#login'||!location.hash){document.querySelector('#app').innerHTML=rolePage();document.querySelectorAll('[data-role]').forEach(b=>b.onclick=()=>openLogin(b.dataset.role));let taps=0;const secret=document.querySelector('.mcm-secret');secret.onclick=()=>{if(++taps>=5){localStorage.setItem('portalRole','admin');location.hash='admin';taps=0;}};}}
  window.addEventListener('hashchange',render); render();
})();