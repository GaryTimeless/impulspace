/**
 * Name puzzle: highlights individual letters in "IMPULSPACE" when hovering
 * over the corresponding explanation cards.
 *
 * Letter breakdown:
 *   I M P U L S P A C E
 *   [--IMPULS--]        ← positions 1-6
 *             [--SPACE] ← positions 6-10 (shares the S)
 *               [PACE]  ← positions 7-10 (PACE inside SPACE)
 */
export function initNamePuzzle() {
  const cards = document.querySelectorAll('.name-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const part = card.dataset.part; // 'impuls', 'pace', or 'space'
    const letters = document.querySelectorAll(`.${part}-letter`);
    if (!letters.length) return;

    function highlight() {
      letters.forEach(el => el.classList.add('active'));
    }
    function unhighlight() {
      letters.forEach(el => el.classList.remove('active'));
    }

    card.addEventListener('mouseenter', highlight);
    card.addEventListener('mouseleave', unhighlight);

    // Touch devices
    card.addEventListener('touchstart', (e) => {
      document.querySelectorAll('.name-letter.active').forEach(el => el.classList.remove('active'));
      highlight();
    });
  });
}
