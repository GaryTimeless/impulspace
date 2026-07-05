/**
 * Name puzzle: highlights word parts (IMPULS/PACE/SPACE) in the heading
 * when hovering over the corresponding explanation cards.
 */
export function initNamePuzzle() {
  const cards = document.querySelectorAll('.name-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const part = card.dataset.part;
    const target = document.querySelector(`.${part}-part`);
    if (!target) return;

    card.addEventListener('mouseenter', () => target.classList.add('active'));
    card.addEventListener('mouseleave', () => target.classList.remove('active'));

    // Touch devices: toggle on tap
    card.addEventListener('touchstart', (e) => {
      // Remove all active first
      document.querySelectorAll('.name-part.active').forEach(el => el.classList.remove('active'));
      target.classList.add('active');
    });
  });
}
