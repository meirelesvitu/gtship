const noButton = document.getElementById('no-btn');
const yesButton = document.getElementById('yes-btn');

if (noButton) {
  const buffer = 120; // distância mínima para fugir
  const padding = 12;
  const minDelay = 80;
  let floating = false;
  let lastMove = 0;

  const ensureFloating = () => {
    if (floating) return;
    const rect = noButton.getBoundingClientRect();
    noButton.style.position = 'fixed';
    noButton.style.left = `${rect.left}px`;
    noButton.style.top = `${rect.top}px`;
    noButton.style.transform = 'none';
    noButton.classList.add('is-floating');
    floating = true;
  };

  const moveRandomly = () => {
    const rect = noButton.getBoundingClientRect();
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
    const x = Math.random() * (maxX - padding) + padding;
    const y = Math.random() * (maxY - padding) + padding;
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
  };

  const evade = () => {
    const now = performance.now();
    if (now - lastMove < minDelay) return;
    ensureFloating();
    moveRandomly();
    lastMove = now;
  };

  const handleMove = (event) => {
    const rect = noButton.getBoundingClientRect();
    const nearX = event.clientX > rect.left - buffer && event.clientX < rect.right + buffer;
    const nearY = event.clientY > rect.top - buffer && event.clientY < rect.bottom + buffer;
    if (nearX && nearY) {
      evade();
    }
  };

  window.addEventListener('mousemove', handleMove, { passive: true });
  window.addEventListener('resize', () => {
    if (!floating) return;
    moveRandomly();
  }, { passive: true });

  noButton.addEventListener('mouseenter', evade, { passive: true });
  noButton.addEventListener('focus', evade, { passive: true });
}

if (yesButton) {
  yesButton.addEventListener('click', () => {
    yesButton.setAttribute('aria-pressed', 'true');
  });
}
