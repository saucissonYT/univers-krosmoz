/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const DISPLAY_DURATION = 30000;

  const pad = (value) => String(value).padStart(2, '0');

  const getTodayKeys = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = pad(today.getMonth() + 1);
    const day = pad(today.getDate());
    return {
      exact: `${year}-${month}-${day}`,
      monthDay: `${month}-${day}`
    };
  };

  const normalizeAssetPath = (assetPath) => {
    if (!assetPath) return '';
    return assetPath.replace(/^(\.\.\/)+assets\//, 'assets/');
  };

  const findTodayMeryde = (records) => {
    const { exact, monthDay } = getTodayKeys();
    return records.find((record) => record.date === exact)
      || records.find((record) => record.date && record.date.slice(5) === monthDay)
      || records.find((record) => record.date === monthDay);
  };

  const dismiss = (card) => {
    card.classList.add('is-leaving');
    window.setTimeout(() => card.remove(), 520);
  };

  const renderMeryde = (record) => {
    if (!record || !record.meryde || !record.description) return;

    const card = document.createElement('aside');
    card.className = 'home-meryde-card';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Méryde du jour : ${record.meryde}`);

    const image = normalizeAssetPath(record.image);
    card.innerHTML = `
      <button class="home-meryde-close" type="button" aria-label="Fermer le Méryde du jour"></button>
      ${image ? `<img class="home-meryde-image" src="${image}" alt="" loading="eager" decoding="async">` : ''}
      <div class="home-meryde-copy">
        <span class="home-meryde-kicker">Méryde du jour</span>
        <strong>${record.meryde}</strong>
        <blockquote>${record.description}</blockquote>
      </div>
    `;

    document.body.append(card);
    card.addEventListener('click', () => {
      window.location.href = 'pages/almanax/almanax';
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = 'pages/almanax/almanax';
      }
    });
    card.querySelector('.home-meryde-close')?.addEventListener('click', (event) => {
      event.stopPropagation();
      dismiss(card);
    });
    window.setTimeout(() => card.classList.add('is-visible'), 80);
    window.setTimeout(() => dismiss(card), DISPLAY_DURATION);
  };

  const init = async () => {
    try {
      const response = await fetch('data/almanax/merydes.json', { cache: 'no-store' });
      if (!response.ok) return;
      const records = await response.json();
      renderMeryde(findTodayMeryde(records));
    } catch {
      // The homepage stays silent if the Almanax data is unavailable.
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}());
