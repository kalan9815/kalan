const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = PROJECTS[projectId];

if (project) {
  document.title = project.title + ' — KALAN';
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-desc').textContent = project.desc || '';

  const content = document.getElementById('project-content');

  if (project.cover) addImg(content, project.cover, project.title);
  (project.images || []).forEach(src => addImg(content, src, project.title));
}

// ── 工具函数 ──────────────────────────────────

function addImg(container, src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = 'project-img';
  img.loading = 'lazy';
  container.appendChild(img);
}


