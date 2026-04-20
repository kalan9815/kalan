// TiltedCard — vanilla JS port of the React Bits component
// Spring simulation without motion/react

function createTiltedCard({
  container,
  imageSrc,
  altText = '',
  captionText = '',
  width = '300px',
  height = '300px',
  rotateAmplitude = 14,
  scaleOnHover = 1.08,
  showTooltip = true,
  borderRadius = '16px',
} = {}) {

  // ── figure (outer container) ──
  const figure = document.createElement('figure');
  figure.style.cssText = `
    position: relative;
    width: ${width};
    height: ${height};
    perspective: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    cursor: pointer;
  `;

  // ── inner card (tilts) ──
  const inner = document.createElement('div');
  inner.style.cssText = `
    position: relative;
    width: ${width};
    height: ${height};
    transform-style: preserve-3d;
    border-radius: ${borderRadius};
    overflow: hidden;
    will-change: transform;
    transition: transform 0.1s ease-out, box-shadow 0.3s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  `;

  // ── image ──
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = altText;
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: ${borderRadius};
    pointer-events: none;
  `;

  // ── glare overlay ──
  const glare = document.createElement('div');
  glare.style.cssText = `
    position: absolute;
    inset: 0;
    border-radius: ${borderRadius};
    pointer-events: none;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
  `;

  inner.appendChild(img);
  inner.appendChild(glare);
  figure.appendChild(inner);

  // ── tooltip / caption ──
  let caption = null;
  if (showTooltip && captionText) {
    caption = document.createElement('figcaption');
    caption.textContent = captionText;
    caption.style.cssText = `
      pointer-events: none;
      position: absolute;
      border-radius: 4px;
      background: #fff;
      padding: 4px 10px;
      font-size: 10px;
      letter-spacing: 0.04em;
      color: #2d2d2d;
      opacity: 0;
      z-index: 10;
      white-space: nowrap;
      font-family: inherit;
      transition: opacity 0.15s ease;
      top: 0;
      left: 0;
    `;
    figure.appendChild(caption);
  }

  container.appendChild(figure);

  // ── spring state ──
  let rotX = 0, rotY = 0, sc = 1;
  let targetRotX = 0, targetRotY = 0, targetSc = 1;
  let rafId = null;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    rotX = lerp(rotX, targetRotX, 0.12);
    rotY = lerp(rotY, targetRotY, 0.12);
    sc   = lerp(sc,   targetSc,   0.10);

    inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${sc})`;

    const shadow = `0 ${8 + sc * 12}px ${32 + sc * 20}px rgba(0,0,0,${0.08 + (sc - 1) * 0.3})`;
    inner.style.boxShadow = shadow;

    const settling =
      Math.abs(rotX - targetRotX) > 0.01 ||
      Math.abs(rotY - targetRotY) > 0.01 ||
      Math.abs(sc - targetSc) > 0.001;

    if (settling) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  }

  function startTick() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  // ── events ──
  figure.addEventListener('mouseenter', () => {
    targetSc = scaleOnHover;
    glare.style.opacity = '1';
    if (caption) caption.style.opacity = '1';
    startTick();
  });

  figure.addEventListener('mousemove', (e) => {
    const rect = figure.getBoundingClientRect();
    const ox = e.clientX - rect.left - rect.width / 2;
    const oy = e.clientY - rect.top - rect.height / 2;

    targetRotX = (oy / (rect.height / 2)) * -rotateAmplitude;
    targetRotY = (ox / (rect.width  / 2)) *  rotateAmplitude;

    // glare follows cursor
    const px = ((e.clientX - rect.left) / rect.width)  * 100;
    const py = ((e.clientY - rect.top)  / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)`;

    if (caption) {
      caption.style.left = (e.clientX - rect.left + 14) + 'px';
      caption.style.top  = (e.clientY - rect.top  - 28) + 'px';
    }

    startTick();
  });

  figure.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    targetSc   = 1;
    glare.style.opacity = '0';
    if (caption) caption.style.opacity = '0';
    startTick();
  });

  return figure;
}
