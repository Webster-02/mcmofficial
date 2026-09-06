(function(){
'use strict';
const originalRender=window.renderAdminRoute;
const originalSave=window.adminSave;
const originalRemove=window.adminRemove;
async function isAdmin(){
  try{const p=await window.mcmDb?.profile();return p?.role==='admin';}catch(e){return false;}
}
async function syncClasses(){
  if(!(await isAdmin())) return;
  const rows=await window.mcmDb.classes();
  const current=JSON.parse(localStorage.getItem('mcmPortalData')||'{"classes":[],"svls":[],"students":[]}');
  current.classes=rows.map(x=>({id:String(x.id),name:x.name,code:x.code}));
  localStorage.setItem('mcmPortalData',JSON.stringify(current));
}
window.renderAdminRoute=async function(){
  try{await syncClasses();}catch(e){console.warn('Supabase class sync failed',e);}
  if(originalRender) originalRender();
};
window.adminSave=async function(type,editId,button){
  if(type!=='classes'||!(await isAdmin())) return originalSave(type,editId,button);
  const name=document.querySelector('[name="className"]')?.value.trim();
  const code=document.querySelector('[name="classCode"]')?.value.trim();
  if(!name||!code){alert('Class name and code are required.');return;}
  try{
    if(editId) await window.mcmDb.updateClass(editId,{name,code});
    else await window.mcmDb.addClass({name,code});
    document.querySelector('.admin-modal')?.remove();
    await syncClasses();
    window.renderAdminRoute();
  }catch(e){alert(e.message||'Unable to save class to Supabase.');}
};
window.adminRemove=async function(type,id){
  if(type!=='classes'||!(await isAdmin())) return originalRemove(type,id);
  if(!confirm('Delete this class?')) return;
  try{await window.mcmDb.deleteClass(id);await syncClasses();window.renderAdminRoute();}
  catch(e){alert(e.message||'Unable to delete class from Supabase.');}
};
window.addEventListener('hashchange',()=>{if(location.hash==='#admin')setTimeout(()=>window.renderAdminRoute(),100);});
})();