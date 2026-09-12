(function(){
'use strict';
const api={
 client(){return window.initMcmSupabase&&window.initMcmSupabase()},
 async user(){const c=api.client();if(!c)return null;const r=await c.auth.getUser();return r.data?.user||null},
 async profile(){const c=api.client(),u=await api.user();if(!c||!u)return null;const r=await c.from('profiles').select('*').eq('id',u.id).maybeSingle();if(r.error)throw r.error;return r.data},
 async profiles(){const c=api.client();const r=await c.from('profiles').select('*').order('full_name');if(r.error)throw r.error;return r.data||[]},
 async profileById(id){const c=api.client();if(!id)return null;const r=await c.from('profiles').select('*').eq('id',id).maybeSingle();if(r.error)throw r.error;return r.data},
 async classes(){const c=api.client();if(!c)throw Error('Supabase is not configured');const r=await c.from('classes').select('*').order('name');if(r.error)throw r.error;return r.data||[]},
 async members(classId){const c=api.client();let q=c.from('class_members').select('*, profiles(*)');if(classId)q=q.eq('class_id',classId);else{const u=await api.user();if(!u)return [];q=q.eq('user_id',u.id);}const r=await q;if(r.error)throw r.error;return r.data||[]},
 async allMembers(){const c=api.client();const r=await c.from('class_members').select('*, profiles(*)');if(r.error)throw r.error;return r.data||[]},
 async notes(classId){const c=api.client();let q=c.from('notes').select('*').order('created_at',{ascending:false});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async notices(classId){const c=api.client();let q=c.from('notices').select('*').order('created_at',{ascending:false});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async addNotice(payload){const c=api.client();const r=await c.from('notices').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async timetable(classId){const c=api.client();let q=c.from('timetable').select('*').order('day').order('start_time');if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async addTimetable(payload){const c=api.client();const r=await c.from('timetable').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async deleteTimetable(id){const c=api.client();const r=await c.from('timetable').delete().eq('id',id);if(r.error)throw r.error;return true},
 async assignments(classId){const c=api.client();let q=c.from('assignments').select('*, assignment_submissions(*)').order('due_date',{ascending:true});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async addAssignment(payload){const c=api.client();const r=await c.from('assignments').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async deleteAssignment(id){const c=api.client();const r=await c.from('assignments').delete().eq('id',id);if(r.error)throw r.error;return true},
 async attendance(studentId){const c=api.client();const u=await api.user();const id=studentId||u?.id;if(!id)return [];const r=await c.from('attendance').select('*').eq('student_id',id).order('attendance_date',{ascending:false});if(r.error)throw r.error;return r.data||[]},
 async discussions(classId){const c=api.client();let q=c.from('discussions').select('*, profiles:author_id(full_name,email), discussion_replies(*)').order('created_at',{ascending:false});if(classId)q=q.eq('class_id',classId);const r=await q;if(r.error)throw r.error;return r.data||[]},
 async addDiscussion(payload){const c=api.client();const r=await c.from('discussions').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async addReply(payload){const c=api.client();const r=await c.from('discussion_replies').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async addClass(payload){const c=api.client();const r=await c.from('classes').insert(payload).select().single();if(r.error)throw r.error;return r.data},
 async updateClass(id,payload){const c=api.client();const r=await c.from('classes').update(payload).eq('id',id).select().single();if(r.error)throw r.error;return r.data},
 async deleteClass(id){const c=api.client();const r=await c.from('classes').delete().eq('id',id);if(r.error)throw r.error;return true},
 async upsertMember(payload){const c=api.client();const r=await c.from('class_members').upsert(payload,{onConflict:'class_id,user_id'}).select().single();if(r.error)throw r.error;return r.data},
 async removeMember(id){const c=api.client();const r=await c.from('class_members').delete().eq('id',id);if(r.error)throw r.error;return true},
 async adminAction(action,payload){const c=api.client();if(!c)throw Error('Supabase is not configured');const r=await c.functions.invoke('admin-user',{body:{action,payload}});if(r.error)throw r.error;if(r.data?.error)throw Error(r.data.error);return r.data}
};
window.mcmDb=api;
})();
