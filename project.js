const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = PROJECTS[projectId];

if (project) {
  document.title = project.title + ' — KALAN';
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-desc').textContent = project.desc || '';

  const content = document.getElementById('project-content');

  if (projectId === 'miui-music') {
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
  container.appendChild(img);
}

function addText(container, html) {
  const block = document.createElement('div');
  block.className = 'project-text';
  block.innerHTML = html;
  container.appendChild(block);
}

// ── MIUI Around Music 图文排版 ─────────────────

function buildMiuiMusic(c) {
  const imgs = project.images;
  const t = project.title;

  // 背景
  addText(c, `
    <p class="pt-zh">随着 AIOT 设备渗透率持续提升，用户的听歌场景从单一手机端延伸至 Speaker、TV、Panel、CarOS 等多个触点。头部音乐产品已通过「硬件 + 订阅服务 + 内容生态」构筑竞争壁垒，软件体验成为硬件溢价与用户粘性的核心载体。</p>
    <p class="pt-en">As AIOT device penetration grows, users' music-listening scenarios have expanded from a single phone to multiple touchpoints. Leading products have built moats through "hardware + subscription + content ecosystem." Software experience has become the core vehicle for hardware premium and user retention.</p>
  `);

  // 封面 + 背景图
  addImg(c, imgs[0], t);
  addImg(c, imgs[1], t);

  for (let i = 2; i < imgs.length; i++) {
    addImg(c, imgs[i], t);
  }
}
