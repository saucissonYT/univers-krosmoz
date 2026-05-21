/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const detailHero = document.querySelector('.history-detail-hero');
  const detailMain = document.querySelector('.history-detail-main');

  function initImmersiveHistoryPage() {
    if (!detailHero || !detailMain) {
      return;
    }

    document.body.classList.add('history-immersive-page');

    document.querySelectorAll('.history-detail-side').forEach((side) => side.remove());

    const heroContent = detailHero.querySelector('.history-detail-hero-content');
    if (heroContent && !heroContent.querySelector('.history-scroll-indicator')) {
      const indicator = document.createElement('div');
      indicator.className = 'history-scroll-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      indicator.innerHTML = '<span>Scroll</span><i></i>';
      heroContent.append(indicator);
    }

    const updateFade = () => {
      const distance = Math.max(window.innerHeight * 0.16, 120);
      const rawProgress = Math.min(Math.max(window.scrollY / distance, 0), 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      document.documentElement.style.setProperty('--history-bio-fade', easedProgress.toFixed(3));
      document.documentElement.style.setProperty('--history-bio-image-opacity', Math.max(0, 1 - easedProgress * 1.85).toFixed(3));
      document.documentElement.style.setProperty('--history-bio-content-opacity', Math.max(0, 1 - easedProgress * 1.95).toFixed(3));
    };

    updateFade();
    window.addEventListener('scroll', updateFade, { passive: true });
    window.addEventListener('resize', updateFade);

    let isSnappingToScript = false;
    let touchStartY = 0;

    const isNearHeroStart = () => window.scrollY < window.innerHeight * 0.64;

    const snapToScript = () => {
      if (isSnappingToScript || !isNearHeroStart()) {
        return false;
      }

      isSnappingToScript = true;
      detailMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        isSnappingToScript = false;
      }, 760);
      return true;
    };

    window.addEventListener('wheel', (event) => {
      if (event.deltaY <= 0 || !snapToScript()) {
        return;
      }

      event.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'PageDown', ' '].includes(event.key) || !snapToScript()) {
        return;
      }

      event.preventDefault();
    });

    window.addEventListener('touchstart', (event) => {
      touchStartY = event.touches && event.touches.length ? event.touches[0].clientY : 0;
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
      const touchY = event.touches && event.touches.length ? event.touches[0].clientY : touchStartY;
      if (touchStartY - touchY < 18 || !snapToScript()) {
        return;
      }

      event.preventDefault();
    }, { passive: false });
  }

  initImmersiveHistoryPage();

  const triggers = document.querySelectorAll('[data-history-illustration]');

  if (!triggers.length) {
    return;
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'history-image-dialog';
  dialog.innerHTML = `
    <button class="history-image-dialog-close" type="button" aria-label="Fermer l'illustration">×</button>
    <img alt="">
  `;

  document.body.appendChild(dialog);

  const image = dialog.querySelector('img');
  const closeButton = dialog.querySelector('button');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const thumbnail = trigger.querySelector('img');
      image.src = trigger.dataset.historyIllustration;
      image.alt = thumbnail ? thumbnail.alt : '';
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
})();
