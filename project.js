const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = PROJECTS[projectId];

if (project) {
  document.title = project.title + ' — KALAN';
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-desc').textContent = project.desc || '';

  const content = document.getElementById('project-content');

  if (projectId === 'miui-home') {
    buildMiuiHome(content);
  } else if (projectId === 'miui-music') {
    buildMiuiMusic(content);
  } else {
    // 通用：直接列图
    if (project.cover) addImg(content, project.cover, project.title);
    (project.images || []).forEach(src => addImg(content, src, project.title));
  }
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

function addText(container, html) {
  const block = document.createElement('div');
  block.className = 'project-text';
  block.innerHTML = html;
  container.appendChild(block);
}

// ── MIUI Home 图文排版 ────────────────────────

function buildMiuiHome(c) {
  const imgs = project.images;
  const t = project.title;

  addImg(c, imgs[0], t);
  addImg(c, imgs[1], t);

  for (let i = 2; i < imgs.length; i++) {
    addImg(c, imgs[i], t);
  }
}

// ── MIUI Around Music 图文排版 ─────────────────

function buildMiuiMusic(c) {
  const imgs = project.images;
  const t = project.title;

  addImg(c, imgs[0], t);
  addImg(c, imgs[1], t);

  for (let i = 2; i < imgs.length; i++) {
    addImg(c, imgs[i], t);
  }
}
