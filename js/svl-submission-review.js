(function(){
  'use strict';
  var db=function(){return window.mcmDb;};
  var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
  function setup(){
    if(location.hash!=='#svl-dashboard'||!db()||document.querySelector('[data-review-assignment-btn]'))return;
    var actions=document.querySelector('.svl-actions'); if(!actions)return;
    var b=document.createElement('button'); b.className='svl-action'; b.type='button'; b.dataset.reviewAssignmentBtn='1';
    b.innerHTML='<strong>Review Submissions</strong><span>View answers, marks and feedback</span>'; b.onclick=open;
    actions.appendChild(b);
  }
  function open(){
    var old=document.getElementById('svl-review-panel'); if(old)old.remove();
    var panel=document.createElement('section'); panel.id='svl-review-panel'; panel.className='svl-content-panel';
    panel.innerHTML='<div class="section-heading"><div><span class="eyebrow">Assessment</span><h2>Review Submissions</h2><p>Choose an assignment to review student work.</p></div></div><div id="svl-review-body"><p class="muted">Loading...</p></div>';
    var actions=document.querySelector('.svl-actions'); actions.parentNode.insertBefore(panel,actions.nextSibling); panel.scrollIntoView({behavior:'smooth',block:'start'});
    Promise.all([db().user(),db().members(),db().classes()]).then(function(x){
      var m=(x[1]||[]).find(function(v){return v.user_id===x[0].id;}); var cls=(x[2]||[]).find(function(v){return Number(v.id)===Number(m&&m.class_id);});
      if(!cls)throw new Error('No class assigned to this account.');
      return db().assignments(cls.id);
    }).then(renderAssignments).catch(function(e){document.getElementById('svl-review-body').innerHTML='<p class="error-text">'+esc(e.message)+'</p>';});
  }
  function renderAssignments(items){
    var body=document.getElementById('svl-review-body');
    if(!items.length){body.innerHTML='<p class="muted">No assignments found.</p>';return;}
    body.innerHTML='<label>Select assignment<select id="svl-review-select"><option value="">Choose assignment...</option>'+items.map(function(a){return '<option value="'+esc(a.id)+'">'+esc(a.title)+'</option>';}).join('')+'</select></label><div id="svl-review-submissions" class="svl-review-submissions"></div>';
    document.getElementById('svl-review-select').onchange=function(){loadSubmissions(this.value);};
  }
  function loadSubmissions(id){
    var box=document.getElementById('svl-review-submissions'); if(!id){box.innerHTML='';return;}
    box.innerHTML='<p class="muted">Loading submissions...</p>';
    db().client().from('assignment_submissions').select('*, profiles(full_name,email)').eq('assignment_id',id).order('submitted_at',{ascending:false}).then(function(r){
      if(r.error)throw r.error; var rows=r.data||[];
      box.innerHTML=rows.length?rows.map(function(s){return '<article class="review-card"><div class="review-card-head"><div><h4>'+esc(s.profiles&&s.profiles.full_name||s.profiles&&s.profiles.email||s.student_id)+'</h4><small>Submitted: '+esc(s.submitted_at?new Date(s.submitted_at).toLocaleString():'Not recorded')+'</small></div><span class="assignment-status status-'+esc(s.status||'submitted')+'">'+esc(s.status||'submitted')+'</span></div><p class="review-answer">'+esc(s.submission_text||'No written answer provided.')+'</p><form class="review-form" data-id="'+esc(s.id)+'"><label>Marks<input name="grade" type="number" min="0" step="0.5" value="'+esc(s.grade==null?'':s.grade)+'" required></label><label>Feedback<textarea name="feedback" rows="2">'+esc(s.feedback||'')+'</textarea></label><button class="primary-btn" type="submit">Save Grade</button></form></article>';}).join(''):'<p class="muted">No submissions received yet.</p>';
      box.querySelectorAll('.review-form').forEach(function(f){f.onsubmit=function(e){e.preventDefault();saveGrade(f);};});
    }).catch(function(e){box.innerHTML='<p class="error-text">'+esc(e.message||'Unable to load submissions.')+'</p>';});
  }
  function saveGrade(form){
    var btn=form.querySelector('button'); btn.disabled=true; btn.textContent='Saving...';
    db().client().from('assignment_submissions').update({grade:Number(form.grade.value),feedback:form.feedback.value.trim(),status:'graded'}).eq('id',form.dataset.id).then(function(r){if(r.error)throw r.error;btn.textContent='Saved';setTimeout(function(){btn.textContent='Save Grade';btn.disabled=false;},900);}).catch(function(e){alert(e.message||'Unable to save grade.');btn.disabled=false;btn.textContent='Save Grade';});
  }
  window.addEventListener('hashchange',function(){setTimeout(setup,150);}); setTimeout(setup,250);
})();