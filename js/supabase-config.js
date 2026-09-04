window.MCM_SUPABASE_URL='https://ljbaoglpsjyrotuabixp.supabase.co';
window.MCM_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqYmFvZ2xwc2p5cm90dWFiaXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTE4OTcsImV4cCI6MjEwNDEyNzg5N30.Lu7YaPumuylWyrDLyiejNQ8LDHiTWSkwqXZUZ1ce2lw';
window.mcmSupabase=null;
window.initMcmSupabase=function(){
  if(window.mcmSupabase) return window.mcmSupabase;
  if(window.supabase&&window.MCM_SUPABASE_URL&&window.MCM_SUPABASE_ANON_KEY){
    window.mcmSupabase=window.supabase.createClient(window.MCM_SUPABASE_URL,window.MCM_SUPABASE_ANON_KEY);
  }
  return window.mcmSupabase;
};
