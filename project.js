const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = PROJECTS[projectId];

if (project) {
  document.title = project.title + ' — KALAN';
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-desc').textContent = project.desc;

  const content = document.getElementById('project-content');

  if (project.cover) {
    const img = document.createElement('img');
    img.src = project.cover;
    img.alt = project.title;
    img.className = 'project-img';
    content.appendChild(img);
  }

  if (project.images) {
    project.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = project.title;
      img.className = 'project-img';
      content.appendChild(img);
    });
  }
}
