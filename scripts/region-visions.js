/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.querySelector('.region-vision-viewer');

  if (!viewer) {
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.body.classList.add('is-ready');
      document.body.classList.remove('is-entering');
    });
  });

  const galleryLinks = viewer.querySelectorAll('.region-vision-nav[href]');

  galleryLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      if (!href) {
        return;
      }

      event.preventDefault();
      document.body.classList.remove('is-ready');
      document.body.classList.add('is-leaving');

      window.setTimeout(() => {
        window.location.href = href;
      }, 780);
    });
  });
});
