(function(){
'use strict';
const api={
 client(){return window.initMcmSupabase&&window.initMcmSupabase()},
 async user(){const c=api.client();if(!c)return null;const r=await c.auth.getUser();return r.data?.user||null},
 async profile(){const c=api.client(),u=await api.user();if(!c||!u)return null;const r=await c.from('profiles').select('*').eq('id',u.id).maybeSingle();if(r.error)throw r.error;return r.data},
 async profiles(){const c=api.client();const r=await c.from('profiles').select('*').order('full_name');if(r.error)throw r.error;return r.data||[]},
 async classes(){const c=api.client();if(!c)throw Error('Supabase is not configured');const r=await c.from('classes').select('*').order('name');if(r.error)throw r.error;return r.data||[]},
 async members(classId){const c=api.client();const r=await c.from('class_members').select('*, profiles(*)').eq('class_id',classId);if(r.error)throw r.error;return r.data||[]},
 async allMembers(){const c=api.client();const r=await c.from('class_members').select('*, profiles(*)');if(r.error)throw r.error;return r.data||[]},
 async notes(classId){const c=api.client();let q=c.from('notes').select('*').order('created_at',{ascending:false});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async notices(classId){const c=api.client();let q=c.from('notices').select('*').order('created_at',{ascending:false});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async timetable(classId){const c=api.client();let q=c.from('timetable').select('*').order('day').order('start_time');if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async addClass(payload){const c=api.client();const r=await c.from('classes').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async updateClass(id,payload){const c=api.client();const r=await c.from('classes').update(payload).eq('id',id).select().single();if(r.error)throw r.error;return r.data},
 async deleteClass(id){const c=api.client();const r=await c.from('classes').delete().eq('id',id);if(r.error)throw r.error;return true},
 async upsertMember(payload){const c=api.client();const r=await c.from('class_members').upsert(payload,{onConflict:'class_id,user_id'}).select().single();if(r.error)throw r.error;return r.data},
 async removeMember(id){const c=api.client();const r=await c.from('class_members').delete().eq('id',id);if(r.error)throw r.error;return true}
};
window.mcmDb=api;
})();
