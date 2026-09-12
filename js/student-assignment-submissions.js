(() => {
  'use strict';
  const esc = (v) => String(v ?? '').replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  const db = () => window.mcmDb;
  async function currentClass() {
    const user = await db().user();
    if (!user) return null;
    const memberships = await db().members();
    const membership = memberships.find((m) => m.user_id === user.id);
    return membership?.class_id || null;
  }
  async function loadLiveAssignments() {
    if (location.hash !== '#assignments' || !db()) return;
    try {
      const classId = await currentClass();
      if (!classId) return;
      const rows = await db().assignments(classId);
      const list = document.getElementById('assignmentList');
      if (!list) return;
      const user = await db().user();
      const all = rows || [];
      const counts = {pending:0, progress:0, completed:0};
      list.innerHTML = all.length ? all.map((a) => {
        const submissions = a.assignment_submissions || [];
        const mine = submissions.find((s) => s.student_id === user?.id);
        const submitted = Boolean(mine);
        const status = submitted ? 'completed' : (a.due_date && new Date(a.due_date) < new Date() ? 'progress' : 'pending');
        counts[status]++;
        return `<article class="assignment-card"><div><h3>${esc(a.title)}</h3><div class="assignment-meta"><span>${esc(a.course || 'Class assignment')}</span><span>Due: ${esc(a.due_date ? new Date(a.due_date).toLocaleDateString() : 'Not set')}</span><span>${esc(a.total_marks ? `${a.total_marks} marks` : 'Assignment')}</span></div></div><div class="assignment-side"><span class="assignment-status status-${status}">${submitted ? 'Submitted' : status === 'progress' ? 'Due/Overdue' : 'Pending'}</span><div class="assignment-actions"><button class="secondary live-details" data-id="${esc(a.id)}">Details</button>${!submitted ? `<button class="primary live-submit" data-id="${esc(a.id)}">Submit</button>` : ''}</div></div></article>`;
      }).join('') : '<p class="empty-state">No assignments have been published for your class yet.</p>';
      document.querySelectorAll('.assignment-stat strong').forEach((el, i) => { el.textContent = [all.length, counts.pending, counts.progress, counts.completed][i] ?? 0; });
      document.querySelectorAll('.live-details').forEach((b) => b.onclick = () => { const a = all.find((x) => String(x.id) === b.dataset.id); alert(`${a.title}\n\n${a.description || 'No instructions provided.'}`); });
      document.querySelectorAll('.live-submit').forEach((b) => b.onclick = () => openSubmit(all.find((x) => String(x.id) === b.dataset.id)));
    } catch (error) { console.error('Unable to load live assignments', error); }
  }
  function openSubmit(assignment) {
    if (!assignment) return;
    const text = prompt(`Submit your answer for: ${assignment.title}\n\nWrite your answer below:`);
    if (text === null || !text.trim()) return;
    submit(assignment.id, text.trim());
  }
  async function submit(assignmentId, text) {
    try {
      const user = await db().user();
      const c = db().client();
      const { error } = await c.from('assignment_submissions').upsert({ assignment_id: assignmentId, student_id: user.id, submission_text: text, status: 'submitted', submitted_at: new Date().toISOString() }, { onConflict: 'assignment_id,student_id' });
      if (error) throw error;
      alert('Assignment submitted successfully.');
      loadLiveAssignments();
    } catch (error) { alert(`Submission failed: ${error.message || error}`); }
  }
  window.addEventListener('hashchange', () => setTimeout(loadLiveAssignments, 150));
  setTimeout(loadLiveAssignments, 300);
})();