// FlowingMenu — vanilla JS port of the React Bits component

function createFlowingMenu({ container, items = [], speed = 12 } = {}) {

  // Inject CSS
  if (!document.getElementById('flowing-menu-style')) {
    const link = document.createElement('link');
    link.id = 'flowing-menu-style';
    link.rel = 'stylesheet';
    link.href = 'flowing-menu.css';
    document.head.appendChild(link);
  }

  const wrap = document.createElement('div');
  wrap.className = 'menu-wrap';

  const nav = document.createElement('nav');
  nav.className = 'flowing-menu';

  items.forEach(({ text, desc, image, color = '#1a1a1a', textColor }) => {
    // auto text color: light bg → dark text, dark bg → white text
    if (!textColor) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
      const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
      textColor = luminance > 0.5 ? '#1a1a1a' : '#ffffff';
    }
    // ── item ──
    const item = document.createElement('div');
    item.className = 'menu__item';

    // ── link ──
    const link = document.createElement('div');
    link.className = 'menu__item-link';
    link.textContent = text;

    // ── marquee overlay ──
    const marquee = document.createElement('div');
    marquee.className = 'marquee';
    marquee.style.backgroundColor = color;

    const innerWrap = document.createElement('div');
    innerWrap.className = 'marquee__inner-wrap';

    const inner = document.createElement('div');
    inner.className = 'marquee__inner';

    // Build enough parts to fill viewport
    const buildParts = () => {
      inner.innerHTML = '';
      const partCount = 8;
      for (let i = 0; i < partCount; i++) {
        const part = document.createElement('div');
        part.className = 'marquee__part';

        const span = document.createElement('span');
        span.textContent = desc || text;
        span.style.color = textColor;

        part.appendChild(span);
        inner.appendChild(part);
      }
    };

    buildParts();
    innerWrap.appendChild(inner);
    marquee.appendChild(innerWrap);
    item.appendChild(link);
    item.appendChild(marquee);
    nav.appendChild(item);

    // ── marquee animation (RAF-based) ──
    let x = 0;
    let partWidth = 0;
    let rafId = null;
    let running = false;

    function getPartWidth() {
      const first = inner.querySelector('.marquee__part');
      return first ? first.offsetWidth : 200;
    }

    function startMarquee() {
      if (running) return;
      running = true;
      partWidth = getPartWidth();

      function tick() {
        if (!running) return;
        x -= partWidth / (speed * 60);
        if (Math.abs(x) >= partWidth) x = 0;
        inner.style.transform = `translateX(${x}px)`;
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    function stopMarquee() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    }

    // ── spring slide in/out ──
    let marqueeY = 101;   // % — starts offscreen bottom
    let targetY = 101;
    let innerY = -101;
    let targetInnerY = -101;
    let slideRaf = null;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tickSlide() {
      marqueeY = lerp(marqueeY, targetY, 0.14);
      innerY   = lerp(innerY, targetInnerY, 0.14);

      marquee.style.transform = `translate3d(0, ${marqueeY}%, 0)`;
      inner.style.transform   = `translateX(${x}px) translateY(${innerY}%)`;

      const settling =
        Math.abs(marqueeY - targetY) > 0.05 ||
        Math.abs(innerY - targetInnerY) > 0.05;

      if (settling) {
        slideRaf = requestAnimationFrame(tickSlide);
      } else {
        marqueeY = targetY;
        innerY   = targetInnerY;
        marquee.style.transform = `translate3d(0, ${marqueeY}%, 0)`;
        slideRaf = null;
        if (targetY !== 0) stopMarquee();
      }
    }

    function startSlide() {
      if (slideRaf) cancelAnimationFrame(slideRaf);
      slideRaf = requestAnimationFrame(tickSlide);
    }

    function findEdge(mouseX, mouseY, w, h) {
      const top    = (mouseX - w/2)**2 + (mouseY - 0)**2;
      const bottom = (mouseX - w/2)**2 + (mouseY - h)**2;
      return top < bottom ? 'top' : 'bottom';
    }

    link.addEventListener('mouseenter', (e) => {
      const rect = item.getBoundingClientRect();
      const edge = findEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
      marqueeY     = edge === 'top' ? -101 : 101;
      innerY       = edge === 'top' ?  101 : -101;
      targetY      = 0;
      targetInnerY = 0;
      startMarquee();
      startSlide();
    });

    link.addEventListener('mouseleave', (e) => {
      const rect = item.getBoundingClientRect();
      const edge = findEdge(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
      targetY      = edge === 'top' ? -101 : 101;
      targetInnerY = edge === 'top' ?  101 : -101;
      startSlide();
    });
  });

  wrap.appendChild(nav);
  container.appendChild(wrap);
}
