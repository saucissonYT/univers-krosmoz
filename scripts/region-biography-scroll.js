/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

const initRegionBiographyScroll = () => {
  if (!document.body.classList.contains('region-biography-page')) return;

  const hero = document.querySelector('.region-hero');
  const rule = document.querySelector('.region-hero-rule');
  if (!hero) return;

  if (rule && !rule.querySelector('.region-scroll-indicator')) {
    const indicator = document.createElement('span');
    indicator.className = 'region-scroll-indicator';
    indicator.textContent = 'Scroll';
    rule.appendChild(indicator);
  }

  const syncFade = () => {
    const distance = Math.max(56, window.innerHeight * 0.08);
    const progress = Math.min(1, Math.max(0, window.scrollY / distance));
    const easedProgress = 1 - Math.pow(1 - progress, 2);
    const imageOpacity = Math.max(0, 1 - easedProgress * 1.08);
    const contentOpacity = Math.max(0, 1 - easedProgress * 1.18);

    document.documentElement.style.setProperty('--region-bio-fade', easedProgress.toFixed(3));
    document.documentElement.style.setProperty('--region-bio-image-opacity', imageOpacity.toFixed(3));
    document.documentElement.style.setProperty('--region-bio-content-opacity', contentOpacity.toFixed(3));
  };

  window.addEventListener('scroll', syncFade, { passive: true });
  window.addEventListener('resize', syncFade);
  syncFade();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegionBiographyScroll, { once: true });
} else {
  initRegionBiographyScroll();
}
