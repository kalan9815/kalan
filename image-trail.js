// ImageTrail Variant 1 — vanilla JS, smooth

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getMouseDistance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }
function easeInQuad(t)  { return t * t; }

function createImageTrail({ container, items = [], threshold = 60 }) {
  const root = document.createElement('div');
  root.style.cssText = 'width:100%;height:100%;position:relative;';
  container.appendChild(root);

  const W = 200, H = 200;

  // 预加载所有图片
  items.forEach(url => {
    const img = new Image();
    img.src = url;
  });

  const imgEls = items.map(url => {
    const wrap = document.createElement('div');
    wrap.style.cssText = `
      width: ${W}px;
      height: ${H}px;
      border-radius: 24px;
      position: absolute;
      top: 0; left: 0;
      opacity: 0;
      overflow: hidden;
      will-change: transform, opacity;
      pointer-events: none;
    `;
    const inner = document.createElement('div');
    inner.style.cssText = `
      width: 100%; height: 100%;
      background-size: cover;
      background-position: center;
      background-image: url(${url});
    `;
    wrap.appendChild(inner);
    root.appendChild(wrap);
    return { el: wrap, active: false };
  });

  let imgPosition = 0;
  let zIndexVal = 1;
  let mousePos    = { x: 0, y: 0 };
  let lastMousePos = { x: 0, y: 0 };
  let cacheMousePos = { x: 0, y: 0 };
  let started = false;

  function showNextImage() {
    zIndexVal++;
    imgPosition = (imgPosition + 1) % imgEls.length;
    const img = imgEls[imgPosition];

    const startX = cacheMousePos.x - W / 2;
    const startY = cacheMousePos.y - H / 2;
    const endX   = mousePos.x - W / 2;
    const endY   = mousePos.y - H / 2;

    img.el.style.zIndex   = zIndexVal;
    img.el.style.transform = `translate(${startX}px,${startY}px) scale(0.9)`;
    img.el.style.opacity   = 0;

    const fadeInDur  = 250;  // ms — 淡入
    const moveDur    = 350;  // ms — 移动
    const holdDur    = 180;  // ms — 停留
    const fadeOutDur = 400;  // ms — 淡出

    const t0 = performance.now();

    function animate(now) {
      const elapsed = now - t0;

      if (elapsed < moveDur) {
        // 移动 + 淡入
        const t = elapsed / moveDur;
        const et = easeOutQuad(t);
        const x = lerp(startX, endX, et);
        const y = lerp(startY, endY, et);
        const scale = lerp(0.92, 1, et);

        const fadeT = Math.min(elapsed / fadeInDur, 1);
        const opacity = easeOutQuad(fadeT);

        img.el.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
        img.el.style.opacity   = opacity;
        requestAnimationFrame(animate);

      } else if (elapsed < moveDur + holdDur) {
        // 停留
        img.el.style.transform = `translate(${endX}px,${endY}px) scale(1)`;
        img.el.style.opacity   = 1;
        requestAnimationFrame(animate);

      } else {
        // 淡出 + 缩小
        const t = Math.min((elapsed - moveDur - holdDur) / fadeOutDur, 1);
        const et = easeInQuad(t);
        const opacity = 1 - et;
        const scale   = 1 - 0.15 * et;

        img.el.style.transform = `translate(${endX}px,${endY}px) scale(${scale})`;
        img.el.style.opacity   = opacity;

        if (t < 1) requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  function render() {
    const dist = getMouseDistance(mousePos, lastMousePos);
    cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.12);
    cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.12);

    if (dist > threshold) {
      showNextImage();
      lastMousePos = { ...mousePos };
    }
    requestAnimationFrame(render);
  }

  container.addEventListener('mouseenter', e => {
    const rect = container.getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    mousePos      = { ...pos };
    cacheMousePos = { ...pos };
    lastMousePos  = { ...pos };
    if (!started) {
      started = true;
      render();
    }
  });

  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
}
