// ===== 着色效果（bio、meta、footer）=====
const fadeRadius = 160;
const darkColor  = [26, 26, 26];
const lightColor = [153, 153, 153];

function applyProximityColor(el) {
  const text = el.textContent;
  el.innerHTML = text.split('').map(char =>
    char === ' ' ? ' ' : `<span>${char}</span>`
  ).join('');

  const chars = el.querySelectorAll('span');

  el.addEventListener('mousemove', (e) => {
    chars.forEach(span => {
      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
      const t = Math.min(dist / fadeRadius, 1);
      const r = Math.round(darkColor[0] + (lightColor[0] - darkColor[0]) * t);
      const g = Math.round(darkColor[1] + (lightColor[1] - darkColor[1]) * t);
      const b = Math.round(darkColor[2] + (lightColor[2] - darkColor[2]) * t);
      span.style.color = `rgb(${r},${g},${b})`;
    });
  });

  el.addEventListener('mouseleave', () => {
    chars.forEach(span => span.style.color = '');
  });
}

const bioEl = document.getElementById('bio');
if (bioEl) applyProximityColor(bioEl);
const visionEl = document.getElementById('vision-desc');
if (visionEl) applyProximityColor(visionEl);
document.querySelectorAll('.project-meta').forEach(applyProximityColor);
document.querySelectorAll('.slogan, .footer .email').forEach(applyProximityColor);
document.querySelectorAll('.exp-role, .exp-period, .hero-intro, .life-desc').forEach(applyProximityColor);

// ===== Toast =====
const titles = document.querySelectorAll('.project-title');
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.remove('show');
  toastTimer = setTimeout(() => {
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }, 200);
}

titles.forEach(title => {
  const id = title.dataset.id;
  const project = PROJECTS[id];

  if (project && !project.comingSoon) {
    title.addEventListener('click', () => {
      window.open('project.html?id=' + id, '_blank');
    });
  } else {
    title.addEventListener('click', showToast);
  }
});
