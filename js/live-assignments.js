(() => {
  const app = () => document.getElementById('app');
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  const dateLabel = (value) => {
    if (!value) return 'No due date';
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'});
  };
  const getRows = async () => {
    if (!window.mcmDb || !window.mcmDb.members || !window.mcmDb.assignments) return [];
    const memberships = await window.mcmDb.members();
    const ids = [...new Set((memberships || []).map((m) => m.class_id).filter(Boolean))];
    const groups = await Promise.all(ids.map((id) => window.mcmDb.assignments(id)));
    const map = new Map();
    groups.flat().forEach((a) => map.set(a.id, a));
    return [...map.values()].sort((a,b) => new Date(a.due_date || 0) - new Date(b.due_date || 0));
  };
  const statusFor = (a) => {
    if (a.assignment_submissions && a.assignment_submissions.length) return 'completed';
    if (a.due_date && new Date(a.due_date) < new Date()) return 'progress';
    return 'pending';
  };
  const renderLive = async () => {
    if (location.hash !== '#assignments') return;
    try {
      const rows = await getRows();
      const list = document.getElementById('assignmentList');
      if (!list) return;
      const cards = rows.map((a) => {
        const status = statusFor(a);
        const label = status === 'completed' ? 'Submitted' : status === 'progress' ? 'Due/Review' : 'Pending';
        return `<article class="assignment-card"><div><h3>${esc(a.title)}</h3><div class="assignment-meta"><span>${esc(a.course_name || a.course || 'Class assignment')}</span><span>Due: ${esc(dateLabel(a.due_date))}</span><span>${a.total_marks ? esc(a.total_marks) + ' marks' : 'Assignment'}</span></div></div><div class="assignment-side"><span class="assignment-status status-${status}">${label}</span><div class="assignment-actions"><button class="secondary" data-live-view="${esc(a.id)}">Details</button><button class="primary" data-live-submit="${esc(a.id)}">Submit</button></div></div></article>`;
      }).join('');
      list.innerHTML = cards || '<p class="empty-state">No assignments have been published for your class yet.</p>';
      const total = rows.length;
      const pending = rows.filter((a) => statusFor(a) === 'pending').length;
      const progress = rows.filter((a) => statusFor(a) === 'progress').length;
      const completed = rows.filter((a) => statusFor(a) === 'completed').length;
      const stats = document.querySelectorAll('.assignment-stat strong');
      [total,pending,progress,completed].forEach((n,i) => { if (stats[i]) stats[i].textContent = n; });
      list.querySelectorAll('[data-live-view]').forEach((button) => button.addEventListener('click', () => {
        const a = rows.find((item) => String(item.id) === button.dataset.liveView);
        if (a) alert(`${a.title}\n\n${a.description || 'No instructions provided.'}\n\nDue: ${dateLabel(a.due_date)}`);
      }));
      list.querySelectorAll('[data-live-submit]').forEach((button) => button.addEventListener('click', () => alert('Submission upload will be connected in the next step.')));
    } catch (error) {
      console.error('Live assignments failed:', error);
    }
  };
  window.addEventListener('hashchange', () => setTimeout(renderLive, 150));
  setTimeout(renderLive, 300);
})();