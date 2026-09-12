(function(){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const db=()=>window.initMcmSupabase&&window.initMcmSupabase();
  async function current(){const c=db();const r=await c.auth.getUser();return r.data&&r.data.user;}
  async function openSubmission(id){
    const old=document.getElementById('submission-modal');if(old)old.remove();
    const modal=document.createElement('div');modal.id='submission-modal';modal.className='modal-backdrop';
    modal.innerHTML='<div class="modal-card"><button class="modal-close" aria-label="Close">×</button><h2>Submit Assignment</h2><p class="submission-help">Write your answer or attach a file for this assignment.</p><form id="submission-form"><label>Answer / comments<textarea id="submission-text" rows="5" placeholder="Write your answer here..."></textarea></label><label>Attachment<input id="submission-file" type="file" /></label><button class="primary" type="submit">Submit Assignment</button><p id="submission-message" class="form-message"></p></form></div>';
    document.body.appendChild(modal);modal.querySelector('.modal-close').onclick=()=>modal.remove();
    modal.querySelector('#submission-form').onsubmit=async e=>{e.preventDefault();const msg=modal.querySelector('#submission-message');const btn=modal.querySelector('button[type=submit]');btn.disabled=true;msg.textContent='Submitting...';try{const c=db(),u=await current();if(!u)throw Error('Please login first');let fileUrl=null;const file=modal.querySelector('#submission-file').files[0];if(file){const path=u.id+'/'+id+'/'+Date.now()+'-'+file.name;const up=await c.storage.from('assignment-submissions').upload(path,file,{upsert:true});if(up.error)throw up.error;const pub=c.storage.from('assignment-submissions').getPublicUrl(path);fileUrl=pub.data.publicUrl;}const payload={assignment_id:Number(id),student_id:u.id,submission_text:modal.querySelector('#submission-text').value.trim(),file_url:fileUrl,submitted_at:new Date().toISOString(),status:'submitted'};const r=await c.from('assignment_submissions').upsert(payload,{onConflict:'assignment_id,student_id'});if(r.error)throw r.error;msg.textContent='Assignment submitted successfully.';setTimeout(()=>{modal.remove();window.location.reload()},700)}catch(err){msg.textContent=err.message||'Submission failed.';btn.disabled=false}};
  }
  function setup(){if(location.hash!=='#assignments')return;document.querySelectorAll('[data-submit]').forEach(b=>{if(b.dataset.submissionBound)return;b.dataset.submissionBound='1';b.onclick=()=>openSubmission(b.dataset.submit)});}
  window.addEventListener('hashchange',()=>setTimeout(setup,150));setTimeout(setup,300);window.openAssignmentSubmission=openSubmission;
})();