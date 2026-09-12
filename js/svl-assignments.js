(function(){
  'use strict';
  var repo='';
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function getClass(){
    return Promise.all([window.mcmDb.user(),window.mcmDb.members(),window.mcmDb.classes()]).then(function(a){
      var u=a[0], ms=a[1]||[], cs=a[2]||[];
      var m=ms.find(function(x){return x.user_id===u.id;});
      return {user:u, cls:m&&cs.find(function(x){return Number(x.id)===Number(m.class_id);})};
    });
  }
  function setup(){
    if(location.hash!=='#svl-dashboard') return;
    var actions=document.querySelector('.svl-actions');
    if(!actions || actions.querySelector('[data-svl-assignment-btn]')) return;
    var b=document.createElement('button');
    b.className='svl-action'; b.type='button'; b.dataset.svlAssignmentBtn='1';
    b.innerHTML='<strong>Manage Assignments</strong><span>Create and publish class work</span>';
    b.addEventListener('click',open);
    actions.appendChild(b);
    var panel=document.createElement('section');
    panel.id='svl-assignments'; panel.className='svl-content-panel'; panel.style.display='none';
    panel.innerHTML='<div class="section-heading"><div><span class="eyebrow">Academic work</span><h2>Manage Assignments</h2><p id="svl-assignment-class">Loading class...</p></div></div><div id="svl-assignment-body"></div>';
    actions.parentNode.insertBefore(panel,actions.nextSibling);
  }
  function open(){
    var panel=document.getElementById('svl-assignments'); if(!panel) return;
    panel.style.display='block'; panel.scrollIntoView({behavior:'smooth',block:'start'});
    var body=document.getElementById('svl-assignment-body'); body.innerHTML='<p class="muted">Loading assignments...</p>';
    getClass().then(function(x){
      if(!x.cls){body.innerHTML='<p class="muted">No class is assigned to your account yet.</p>';return;}
      document.getElementById('svl-assignment-class').textContent='Class: '+(x.cls.name||x.cls.class_name||('Class '+x.cls.id));
      return window.mcmDb.assignments(x.cls.id).then(function(items){render(x.cls,items||[]);});
    }).catch(function(e){body.innerHTML='<p class="error-text">'+esc(e.message||'Unable to load assignments.')+'</p>';});
  }
  function render(cls,items){
    var body=document.getElementById('svl-assignment-body');
    body.innerHTML='<form id="svl-assignment-form" class="svl-form"><div class="form-grid"><label>Title<input name="title" required placeholder="e.g. Database Project" /></label><label>Due date<input name="due_date" type="date" required /></label><label class="full">Description<textarea name="description" rows="3" placeholder="Instructions for students"></textarea></label></div><button class="primary-btn" type="submit">Publish Assignment</button></form><div class="svl-assignment-list"><h3>Published assignments</h3><div id="svl-assignment-items"></div></div>';
    document.getElementById('svl-assignment-form').addEventListener('submit',function(e){save(e,cls);});
    var list=document.getElementById('svl-assignment-items');
    if(!items.length){list.innerHTML='<p class="muted">No assignments published yet.</p>';return;}
    list.innerHTML=items.map(function(a){return '<article class="assignment-row"><div><h4>'+esc(a.title)+'</h4><p>'+esc(a.description||'No description')+'</p><small>Due: '+esc(a.due_date||'Not set')+'</small></div><button type="button" class="danger-btn" data-delete-assignment="'+esc(a.id)+'">Delete</button></article>';}).join('');
    list.querySelectorAll('[data-delete-assignment]').forEach(function(btn){btn.addEventListener('click',function(){if(!confirm('Delete this assignment?'))return;window.mcmDb.deleteAssignment(btn.dataset.deleteAssignment).then(open).catch(function(e){alert(e.message||'Unable to delete assignment.');});});});
  }
  function save(e,cls){
    e.preventDefault(); var f=e.currentTarget; var b=f.querySelector('button[type=submit]'); b.disabled=true; b.textContent='Publishing...';
    window.mcmDb.addAssignment({class_id:Number(cls.id),title:f.title.value.trim(),description:f.description.value.trim(),due_date:f.due_date.value}).then(open).catch(function(err){alert(err.message||'Unable to publish assignment.');b.disabled=false;b.textContent='Publish Assignment';});
  }
  window.addEventListener('hashchange',function(){setTimeout(setup,100);});
  setTimeout(setup,200);
})();