/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

document.addEventListener('DOMContentLoaded', () => {
  const visionCards = document.querySelectorAll('.region-vision-card[href]');

  if (!visionCards.length) {
    return;
  }

  document.body.classList.add('has-vision-card-transition', 'is-vision-card-ready');

  visionCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      const href = card.getAttribute('href');

      if (!href) {
        return;
      }

      event.preventDefault();
      document.body.classList.remove('is-vision-card-ready');
      document.body.classList.add('is-vision-card-leaving');

      window.setTimeout(() => {
        window.location.href = href;
      }, 780);
    });
  });
});
