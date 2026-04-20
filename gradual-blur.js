// GradualBlur — canvas 实现，可靠跨浏览器

function gradualBlur(container, opts = {}) {
  const cfg = Object.assign({
    height:   280,
    strength: 20,
    steps:    8,
  }, opts);

  // 等最后一张图加载完再绘制
  const imgs = container.querySelectorAll('img.project-img');
  if (!imgs.length) return;
  const lastImg = imgs[imgs.length - 1];

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    display: block;
    width: 100%;
    height: ${cfg.height}px;
    margin-top: -${cfg.height}px;
    position: relative;
    z-index: 10;
    pointer-events: none;
  `;

  function draw() {
    const w = lastImg.naturalWidth  || lastImg.offsetWidth;
    const h = lastImg.naturalHeight || lastImg.offsetHeight;
    const displayW = lastImg.offsetWidth;
    const displayH = lastImg.offsetHeight;

    // canvas 实际像素匹配显示尺寸
    canvas.width  = displayW * window.devicePixelRatio;
    canvas.height = cfg.height * window.devicePixelRatio;
    canvas.style.width  = displayW + 'px';
    canvas.style.height = cfg.height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const sliceH = cfg.height / cfg.steps;

    for (let i = 0; i < cfg.steps; i++) {
      const progress = (i + 1) / cfg.steps;
      // bezier curve: 越往下模糊越深
      const t = progress * progress * (3 - 2 * progress);
      const blur = t * cfg.strength;

      // 从原图底部对应位置取 sliceH 高度的内容
      const srcY = h - cfg.height * (h / displayH) + (i * sliceH) * (h / displayH);
      const srcH = sliceH * (h / displayH);

      ctx.save();
      ctx.filter = `blur(${blur}px)`;

      // 裁切到当前条带
      ctx.beginPath();
      ctx.rect(0, i * sliceH, displayW, sliceH + 1);
      ctx.clip();

      ctx.drawImage(lastImg, 0, srcY, w, srcH, -blur * 2, i * sliceH - blur * 2, displayW + blur * 4, sliceH + blur * 4);
      ctx.restore();

      // 叠加透明度渐变，越往下越白
      const alpha = t * 0.9;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, i * sliceH, displayW, sliceH + 1);
      ctx.restore();
    }

    // 最底部完全白色
    const grad = ctx.createLinearGradient(0, cfg.height * 0.6, 0, cfg.height);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, displayW, cfg.height);
  }

  if (lastImg.complete && lastImg.naturalWidth) {
    container.appendChild(canvas);
    draw();
  } else {
    lastImg.addEventListener('load', () => {
      container.appendChild(canvas);
      draw();
    });
  }

  window.addEventListener('resize', () => {
    if (lastImg.complete) draw();
  });
}
