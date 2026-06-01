/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

const storySections = Array.from(document.querySelectorAll('[data-story-era]'));
const compassLinks = Array.from(document.querySelectorAll('[data-compass-era]'));
const backToTop = document.querySelector('.back-to-top');

let currentEra = '';
let syncPending = false;

function setEra(era) {
  if (!era || era === currentEra) {
    return;
  }

  currentEra = era;
  document.body.dataset.era = era;

  compassLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.compassEra === era);
  });
}

function syncReadingState() {
  if (syncPending) {
    return;
  }

  syncPending = true;

  window.requestAnimationFrame(() => {
    syncPending = false;
    const activationPoint = window.innerHeight * 0.48;
    let activeSection = storySections[0];

    storySections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= activationPoint && rect.bottom >= activationPoint * 0.45) {
        activeSection = section;
      }
    });

    setEra(activeSection?.dataset.storyEra || 'krosmoz');

    if (backToTop) {
      backToTop.classList.toggle('is-visible', window.scrollY > 520);
    }
  });
}

window.addEventListener('scroll', syncReadingState, { passive: true });
window.addEventListener('resize', syncReadingState);
window.addEventListener('load', syncReadingState);

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

syncReadingState();
