// MagnetLines — vanilla JS port of the React Bits component

function createMagnetLines({
  container,
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#1a1a1a',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
} = {}) {
  // Container styles
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  container.style.justifyItems = 'center';
  container.style.alignItems = 'center';
  container.style.width = containerSize;
  container.style.height = containerSize;

  // Create spans
  const total = rows * columns;
  const spans = [];
  for (let i = 0; i < total; i++) {
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.transformOrigin = 'center';
    span.style.willChange = 'transform';
    span.style.transform = `rotate(${baseAngle}deg)`;
    span.style.backgroundColor = lineColor;
    span.style.width = lineWidth;
    span.style.height = lineHeight;
    span.style.borderRadius = '9999px';
    container.appendChild(span);
    spans.push(span);
  }

  // Pointer move handler
  function onPointerMove(pointer) {
    spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;
      const b = pointer.x - centerX;
      const a = pointer.y - centerY;
      const c = Math.sqrt(a * a + b * b) || 1;
      const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);
      span.style.transform = `rotate(${r}deg)`;
    });
  }

  window.addEventListener('pointermove', onPointerMove);

  // Init with center span position
  if (spans.length) {
    const middleIndex = Math.floor(spans.length / 2);
    requestAnimationFrame(() => {
      const rect = spans[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    });
  }

  return () => window.removeEventListener('pointermove', onPointerMove);
}
