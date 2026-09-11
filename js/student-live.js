(function(){
'use strict';
/*
  The live Supabase student renderer is intentionally paused while the
  frontend is being reviewed. The stable student dashboard is rendered by
  student.js. This prevents an asynchronous backend response from replacing
  the polished frontend with an incomplete/empty state during testing.
  Live data integration can be re-enabled after the backend assignments and
  policies are fully configured.
*/
window.renderLiveStudent=function(){ return false; };
})();