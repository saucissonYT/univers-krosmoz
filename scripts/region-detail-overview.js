/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

const initRegionOverview = () => {
  const body = document.body;
  if (!body.classList.contains('region-overview-page')) return;

  const article = document.querySelector('.region-detail-panel');
  if (!article || article.querySelector('.region-overview-summary')) return;

  const regionTitle = document.querySelector('.region-hero-name')?.textContent?.trim() || 'la région';
  const regionSubtitle = document.querySelector('.region-hero-subtitle')?.textContent?.trim() || '';
  const pathname = window.location.pathname;
  const pageName = pathname.split('/').pop() || '';
  const currentSlug = pageName.replace(/\.html$/, '');
  const isRegionDirectoryPage = pathname.includes('/pages/regions/');
  const regionPageBase = isRegionDirectoryPage ? '' : '/pages/regions/';
  const regionAssetBase = isRegionDirectoryPage ? '../../assets/regions/' : '/assets/regions/';
  const biographyHref = `${regionPageBase}${currentSlug}-biographie.html`;
  const paragraphs = Array.from(article.children).filter((child) => child.tagName === 'P');
  const summaryParagraphs = paragraphs.slice(0, 2);

  const characterGrid = article.querySelector('.region-characters-grid');
  const characterTitle = article.querySelector('.region-characters-section h2');
  if (characterTitle) characterTitle.textContent = `Personnages de ${regionTitle}`;

  const visionTitle = article.querySelector('.region-visions-section h2');
  if (visionTitle) visionTitle.textContent = `Visions de ${regionTitle}`;

  if (characterGrid) {
    const cards = Array.from(characterGrid.querySelectorAll('.region-character-card'));
    cards
      .sort(() => Math.random() - 0.5)
      .forEach((card, index) => {
        if (index < 3) {
          characterGrid.appendChild(card);
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
  }

  const summary = document.createElement('section');
  summary.className = 'region-overview-summary';
  summary.setAttribute('aria-label', `Résumé de ${regionTitle}`);

  const kicker = document.createElement('p');
  kicker.className = 'character-overview-kicker';
  kicker.textContent = 'Biographie';
  summary.appendChild(kicker);

  const heading = document.createElement('h2');
  heading.textContent = regionTitle;
  summary.appendChild(heading);

  if (regionSubtitle) {
    const role = document.createElement('p');
    role.className = 'character-overview-role';
    role.textContent = regionSubtitle;
    summary.appendChild(role);
  }

  const copy = document.createElement('div');
  copy.className = 'region-overview-copy';
  summaryParagraphs.forEach((paragraph) => copy.appendChild(paragraph));
  summary.appendChild(copy);

  const biographyLink = document.createElement('a');
  biographyLink.className = 'character-biography-link region-biography-link';
  biographyLink.href = biographyHref;
  biographyLink.textContent = 'Lire la biographie complete';
  summary.appendChild(biographyLink);

  article.prepend(summary);

  const regions = [
    { slug: 'krosmoz', name: 'Krosmoz', image: 'krosmoz/krosmoz.png' },
    { slug: 'inglorium', name: 'Inglorium', image: 'inglorium/inglorium.png' },
    { slug: 'monde-des-douze', name: 'Monde des Douze', image: 'monde-des-douze/monde-des-douze.png' },
    { slug: 'incarnam', name: 'Incarnam', image: 'incarnam/incarnam.png' },
    { slug: 'necromonde', name: 'Nécromonde', image: 'necromonde/necromonde.webp' },
    { slug: 'xelorium', name: 'Xélorium', image: 'xelorium/xelorium.png' },
    { slug: 'hormonde', name: 'Hormonde', image: 'hormonde/hormonde.png' },
    { slug: 'ecaflipus', name: 'Ecaflipus', image: 'ecaflipus/ecaflipus.png' },
    { slug: 'shukrute', name: 'Shukrute', image: 'shukrute/shukrute.png' },
    { slug: 'osavora', name: 'Osavora', image: 'osavora/osavora.jpg' },
    { slug: 'enutrosor', name: 'Enutrosor', image: 'enutrosor/enutrosor.png' },
    { slug: 'frigost', name: 'Frigost', image: 'frigost/frigost.webp' },
    { slug: 'bonta', name: 'Bonta', image: 'bonta/bonta.webp' },
    { slug: 'brakmar', name: 'Brakmar', image: 'brakmar/brakmar.webp' },
    { slug: 'sufokia', name: 'Sufokia', image: 'sufokia/sufokia.webp' },
    { slug: 'pandala', name: 'Pandala', image: 'pandala/pandala.webp' },
    { slug: 'amakna', name: 'Amakna', image: 'amakna/amakna.webp' },
    { slug: 'astrub', name: 'Astrub', image: 'astrub/astrub.webp' },
    { slug: 'ile-otomai', name: "Île d'Otomaï", image: 'ile-otomai/ile-otomai.webp' },
    { slug: 'saharach', name: 'Saharach', image: 'saharach/saharach.webp' },
    { slug: 'archipel-valonia', name: 'Archipel de Valonia', image: 'archipel-valonia/archipel-valonia.webp' },
    { slug: 'ile-moon', name: 'Île de Moon', image: 'ile-moon/ile-de-moon.webp' },
  ];

  const suggestions = document.createElement('section');
  suggestions.className = 'character-cross-group-panel region-suggestions-section';
  suggestions.setAttribute('aria-labelledby', 'region-suggestions-title');
  suggestions.innerHTML = `
    <h2 class="character-cross-group-title" id="region-suggestions-title">Explorer d'autres régions</h2>
    <div class="character-cross-group-list region-suggestions-grid"></div>
  `;

  const suggestionsGrid = suggestions.querySelector('.region-suggestions-grid');
  regions
    .filter((region) => region.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .forEach((region) => {
      const link = document.createElement('a');
      link.className = 'character-cross-group-card region-suggestion-card';
      link.href = `${regionPageBase}${region.slug}.html`;
      link.innerHTML = `
        <img src="${regionAssetBase}${region.image}" alt="">
        <span class="character-cross-group-copy">
          <strong>${region.name}</strong>
        </span>
      `;
      suggestionsGrid.appendChild(link);
    });

  article.appendChild(suggestions);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegionOverview);
} else {
  initRegionOverview();
}
