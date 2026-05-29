/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const works = window.KROSMOZ_WORKS || [];
  const targets = {
    launcher: 'https://www.ankama.com/fr/launcher',
    webtoon: 'https://www.allskreen.com/webtoon'
  };
  const eraLabels = {
    primitif: 'Ère Primitive',
    dofus: 'Âge des Dofus',
    wakfu: 'Ère du Wakfu',
    waven: 'Ère du Waven'
  };
  const featuredTitles = [
    'Wakfu - Saison 4',
    'Dofus le film',
    'Waven',
    'Lancedur',
    'Bestiale'
  ];
  const animatedExtraTitles = new Set([
    'Welsh & Shedar',
    'Wakfu OAV - Livre I : Le Trone de Glace',
    'Wakfu OAV - Livre II : Ush',
    'Wakfu OAV - Livre III : Mont Dragons'
  ]);
  const hiddenAnimatedTitles = new Set([
    'Waven - Série animée'
  ]);
  const librarySelection = [
    { title: 'Hyrkul le Tendancieux', type: 'Webtoon' },
    { title: 'Cire Momore', type: 'Webtoon' },
    { title: 'Ogrest - Épisodes 1 à 8', type: 'Webtoon' },
    { title: 'Kérubim', type: 'Webtoon' },
    { title: 'Dofus - Manga', type: 'Manga' },
    { title: 'Wakfu - Manga', type: 'Manga' },
    { title: 'Wakfu - La Grande Vague', type: 'Webtoon' }
  ];
  const showcaseImages = {
    'Wakfu - Saison 4': '../../assets/oeuvres/wakfu-saison-4-showcase.webp',
    'Lancedur': '../../assets/oeuvres/lancedur-showcase.webp',
    'Bestiale': '../../assets/oeuvres/bestiale-showcase.webp',
    'Dofus le film': '../../assets/oeuvres/dofus-film-showcase.webp',
    'Ogrest - Épisodes 1 à 8': '../../assets/oeuvres/ogrest-episodes-1-8-showcase.jpg',
    'Mini Wakfu': '../../assets/oeuvres/mini-wakfu-showcase.jpg',
    'Dofus aux trésors de Kérubim': '../../assets/oeuvres/aux-tresors-kerubim-showcase.webp',
    'Dofus - Manga': '../../assets/oeuvres/dofus-manga-showcase.jpg',
    'Wakfu - Saison 1': '../../assets/oeuvres/wakfu-saison-1-showcase.webp',
    'Wakfu - Saison 2': '../../assets/oeuvres/wakfu-saison-2-showcase.webp',
    'Wakfu - Saison 3': '../../assets/oeuvres/wakfu-saison-3-showcase.webp',
    'Wakfu - Manga': '../../assets/oeuvres/wakfu-manga-showcase.webp',
    'Wakfu - La Grande Vague': '../../assets/oeuvres/wakfu-grande-vague-showcase.webp',
    'Welsh & Shedar': '../../assets/oeuvres/welsh-shedar-showcase.webp',
    "Wakfu - Noximilien l'Horloger": '../../assets/oeuvres/wakfu-noximilien-showcase.webp',
    'Wakfu OAV - Livre I : Le Trone de Glace': '../../assets/oeuvres/wakfu-oav-livre-1-showcase.webp',
    'Wakfu OAV - Livre II : Ush': '../../assets/oeuvres/wakfu-oav-livre-2-showcase.webp',
    'Wakfu OAV - Livre III : Mont Dragons': '../../assets/oeuvres/wakfu-oav-livre-3-showcase.webp',
    "WAKFU OAV Oropo : Bataille pour l'Éliacube": '../../assets/oeuvres/wakfu-oav-oropo-showcase.webp',
    'One More Gate: A Wakfu Legend': '../../assets/oeuvres/one-more-gate-showcase.jpg',
    'Savara': '../../assets/oeuvres/savara-showcase.webp'
  };
  const showcaseImagesByEntry = {
    'Dofus|Game': '../../assets/oeuvres/dofus-mmo-showcase.jpg',
    'Wakfu|Game': '../../assets/oeuvres/wakfu-mmo-showcase.webp'
  };
  const getUrl = (work) => work.href || targets[work.linkType] || '';
  const getActionLabel = (work) => {
    if (work.href) return 'Voir la fiche';
    if (work.linkType === 'webtoon') return 'Lire';
    if (work.linkType === 'launcher') return 'Lancer';
    return 'Découvrir';
  };
  const fixPath = (path) => path ? path.replace(/^\.\.\//, '../') : '';
  const getImage = (work) => showcaseImagesByEntry[`${work.title}|${work.type}`] || showcaseImages[work.title] || work.image;
  const hasImage = (work) => Boolean(getImage(work));

  function createCard(work, variant = 'mini') {
    const url = getUrl(work);
    const tag = url ? 'a' : 'article';
    const element = document.createElement(tag);
    const isExternal = !work.href && Boolean(url);

    element.className = variant === 'featured' ? `work-card era-${work.era}` : `work-mini era-${work.era}`;
    element.dataset.workTitle = work.title;
    element.dataset.workType = work.type;
    if (url) {
      element.href = url;
      if (isExternal) {
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
      }
    }

    const image = getImage(work);
    const media = image
      ? `<img src="${fixPath(image)}" alt="" loading="lazy" decoding="async">`
      : '';

    if (variant === 'featured') {
      element.innerHTML = `
        ${media}
        <span class="work-era">${eraLabels[work.era] || work.era}</span>
        <h3>${work.title}</h3>
        <p>${work.preview || ''}</p>
      `;
      return element;
    }

    element.innerHTML = `
      <div class="work-mini-media" aria-hidden="true">${media}</div>
      <div class="work-mini-body">
        <span class="work-type">${work.type}</span>
        <h3>${work.title}</h3>
        <p>${work.preview || ''}</p>
        ${url ? `<span class="work-card-link">${getActionLabel(work)}</span>` : ''}
      </div>
    `;

    return element;
  }

  function renderFeatured() {
    const container = document.querySelector('[data-featured-works]');
    if (!container) return;

    featuredTitles
      .map(title => works.find(work => work.title === title))
      .filter(Boolean)
      .forEach(work => container.append(createCard(work, 'featured')));
  }

  function renderGroup(selector, predicate, limit = 12, variant = 'mini') {
    const container = document.querySelector(selector);
    if (!container) return;

    works
      .filter(predicate)
      .filter(work => work.major || hasImage(work) || getUrl(work))
      .slice(0, limit)
      .forEach(work => container.append(createCard(work, variant)));
  }

  function renderLibrary() {
    const container = document.querySelector('[data-work-group="webtoons"]');
    if (!container) return;

    librarySelection
      .map(({ title, type }) => works.find(work => work.title === title && work.type === type))
      .filter(Boolean)
      .forEach(work => {
        const url = getUrl(work) || targets.webtoon;
        const tag = url ? 'a' : 'article';
        const item = document.createElement(tag);
        const image = getImage(work);
        const isExternal = !work.href && Boolean(url);
        item.className = `work-library-item era-${work.era}`;
        item.dataset.workTitle = work.title;
        item.dataset.workType = work.type;
        if (url) {
          item.href = url;
          if (isExternal) {
            item.target = '_blank';
            item.rel = 'noopener noreferrer';
          }
        }
        item.innerHTML = `
          <div class="work-library-media" aria-hidden="true">
            ${image ? `<img src="${fixPath(image)}" alt="" loading="lazy" decoding="async">` : ''}
          </div>
          <div class="work-library-copy">
            <span class="work-type">${work.type}</span>
            <h3>${work.title}</h3>
            <p>${work.preview || ''}</p>
            <span class="work-pill-link">${getActionLabel(work)}</span>
          </div>
        `;
        container.append(item);
      });
  }

  function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    window.addEventListener('scroll', () => {
      button.classList.toggle('is-visible', window.scrollY > 520);
    }, { passive: true });

    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  renderFeatured();
  renderGroup(
    '[data-work-group="animated"]',
    work => !hiddenAnimatedTitles.has(work.title) && (work.type === 'Série / film' || animatedExtraTitles.has(work.title)),
    18
  );
  renderGroup('[data-work-group="games"]', work => ['Game', 'MMO'].includes(work.type), 9);
  renderLibrary();
  initBackToTop();
}());
