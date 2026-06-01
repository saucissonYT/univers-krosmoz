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
  const biographyHref = `${regionPageBase}${currentSlug}-biographie`;
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
  const pageLike = article.querySelector(':scope > .page-like');
  if (pageLike) {
    summary.appendChild(pageLike);
  }

  const regions = [
    { slug: 'krosmoz', name: 'Krosmoz', image: 'krosmoz/krosmoz.webp' },
    { slug: 'plan-materiel', name: 'Plan Matériel', image: 'plan-materiel/plan-materiel.webp' },
    { slug: 'ether', name: 'Ether', image: 'ether/ether.webp' },
    { slug: 'arbre-vagabonds', name: 'Arbre des Vagabonds', image: 'arbre-vagabonds/arbre-vagabonds.webp' },
    { slug: 'pyramide-ocre', name: 'Pyramide Ocre', image: 'pyramide-ocre/pyramide-ocre.webp' },
    { slug: 'inglorium', name: 'Inglorium', image: 'inglorium/inglorium.webp' },
    { slug: 'monde-des-douze', name: 'Monde des Douze', image: 'monde-des-douze/monde-des-douze.webp' },
    { slug: 'mont-zinit', name: 'Mont Zinit', image: 'mont-zinit/mont-zinit.webp' },
    { slug: 'incarnam', name: 'Incarnam', image: 'incarnam/incarnam.webp' },
    { slug: 'externam', name: 'Externam', image: 'externam/externam.webp' },
    { slug: 'necromonde', name: 'Nécromonde', image: 'necromonde/necromonde.webp' },
    { slug: 'xelorium', name: 'Xélorium', image: 'xelorium/xelorium.webp' },
    { slug: 'hormonde', name: 'Hormonde', image: 'hormonde/hormonde.webp' },
    { slug: 'ecaflipus', name: 'Ecaflipus', image: 'ecaflipus/ecaflipus.webp' },
    { slug: 'shukrute', name: 'Shukrute', image: 'shukrute/shukrute.webp' },
    { slug: 'srambad', name: 'Srambad', image: 'srambad/srambad.webp' },
    { slug: 'osavora', name: 'Osavora', image: 'osavora/osavora.jpg' },
    { slug: 'enutrosor', name: 'Enutrosor', image: 'enutrosor/enutrosor.webp' },
    { slug: 'dimension-obscure', name: 'Dimension Obscure', image: 'dimension-obscure/dimension-obscure.webp' },
    { slug: 'frigost', name: 'Frigost', image: 'frigost/frigost.webp' },
    { slug: 'royaume-chuchoku', name: 'Royaume Chuchoku', image: 'royaume-chuchoku/royaume-chuchoku.jpg' },
    { slug: 'cania', name: 'Plaines de Cania', image: 'cania/cania.webp' },
    { slug: 'bibliotemple', name: 'Bibliotemple', image: 'bibliotemple/bibliotemple.webp' },
    { slug: 'bonta', name: 'Bonta', image: 'bonta/bonta.webp' },
    { slug: 'foire-du-trool', name: 'Foire du Trool', image: 'foire-du-trool/foire-du-trool.jpg' },
    { slug: 'brakmar', name: 'Brakmar', image: 'brakmar/brakmar.webp' },
    { slug: 'katrepat', name: 'Katrepat', image: 'katrepat/katrepat.webp' },
    { slug: 'ile-aux-moines', name: 'Île aux Moines', image: 'ile-aux-moines/ile-aux-moines.webp' },
    { slug: 'sufokia', name: 'Sufokia', image: 'sufokia/sufokia.webp' },
    { slug: 'abysses-sufokia', name: 'Abysses de Sufokia', image: 'abysses-sufokia/abysses-sufokia.webp' },
    { slug: 'bilbyza', name: 'Bilbyza', image: 'bilbyza/bilbyza.webp' },
    { slug: 'pandala', name: 'Pandala', image: 'pandala/pandala.webp' },
    { slug: 'pandalousie', name: 'Pandalousie', image: 'pandalousie/pandalousie.webp' },
    { slug: 'amakna', name: 'Amakna', image: 'amakna/amakna.webp' },
    { slug: 'domaine-sauvage', name: 'Domaine Sauvage', image: 'domaine-sauvage/domaine-sauvage.webp' },
    { slug: 'kolizeum', name: 'Kolizéum', image: 'kolizeum/kolizeum.webp' },
    { slug: 'royaume-sadida', name: 'Royaume Sadida', image: 'royaume-sadida/royaume-sadida.webp' },
    { slug: 'montagnes-koalaks', name: 'Montagnes des Koalaks', image: 'montagnes-koalaks/montagnes-koalaks.webp' },
    { slug: 'kelba', name: 'Kelba', image: 'kelba/kelba.webp?v=3' },
    { slug: 'astrub', name: 'Astrub', image: 'astrub/astrub.webp' },
    { slug: 'mer-dasse', name: "Mer d'Asse", image: 'mer-dasse/mer-dasse.webp' },
    { slug: 'ile-des-brumes', name: 'Île des Brumes', image: 'ile-des-brumes/ile-des-brumes.webp' },
    { slug: 'ile-de-rok', name: 'Île de Rok', image: 'ile-de-rok/ile-de-rok.webp' },
    { slug: 'ile-wabbits', name: 'Île des Wabbits', image: 'ile-wabbits/ile-wabbits.jpg' },
    { slug: 'vulkania', name: 'Archipel de Vulkania', image: 'vulkania/vulkania.jpg' },
    { slug: 'ile-nowel', name: 'Île de Nowel', image: 'ile-nowel/ile-nowel.jpg' },
    { slug: 'crocuzko', name: 'Crocuzko', image: 'crocuzko/crocuzko.webp' },
    { slug: 'ile-minotoror', name: 'Île du Minotoror', image: 'ile-minotoror/ile-minotoror.webp' },
    { slug: 'ile-otomai', name: "Île d'Otomaï", image: 'ile-otomai/ile-otomai.webp' },
    { slug: 'nimotopia', name: 'Nimotopia', image: 'nimotopia/nimotopia.webp' },
    { slug: 'saharach', name: 'Saharach', image: 'saharach/saharach.webp' },
    { slug: 'archipel-valonia', name: 'Archipel de Valonia', image: 'archipel-valonia/archipel-valonia.webp' },
    { slug: 'ereboria', name: 'Ereboria', image: 'ereboria/ereboria.webp' },
    { slug: 'ile-moon', name: 'Île de Moon', image: 'ile-moon/ile-de-moon.webp' },
  ];

  const currentIndex = regions.findIndex((region) => region.slug === currentSlug);
  const hero = document.querySelector('.region-hero');
  if (hero && currentIndex !== -1 && !hero.querySelector('.region-hero-nav')) {
    const previousRegion = regions[(currentIndex - 1 + regions.length) % regions.length];
    const nextRegion = regions[(currentIndex + 1) % regions.length];

    const previousLink = document.createElement('a');
    previousLink.className = 'region-hero-nav region-hero-nav-prev';
    previousLink.href = `${regionPageBase}${previousRegion.slug}`;
    previousLink.setAttribute('aria-label', `Région précédente : ${previousRegion.name}`);
    previousLink.title = previousRegion.name;
    previousLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';

    const nextLink = document.createElement('a');
    nextLink.className = 'region-hero-nav region-hero-nav-next';
    nextLink.href = `${regionPageBase}${nextRegion.slug}`;
    nextLink.setAttribute('aria-label', `Région suivante : ${nextRegion.name}`);
    nextLink.title = nextRegion.name;
    nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';

    const firstHeroChild = hero.firstElementChild;
    hero.insertBefore(previousLink, firstHeroChild);
    hero.insertBefore(nextLink, firstHeroChild);
  }

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
      link.href = `${regionPageBase}${region.slug}`;
      link.innerHTML = `
        <img src="${regionAssetBase}${region.image}" alt="">
        <span class="character-cross-group-copy">
          <strong>${region.name}</strong>
        </span>
      `;
      suggestionsGrid.appendChild(link);
    });

  article.appendChild(suggestions);

  if (!article.querySelector('.region-index-back-link')) {
    const indexLink = document.createElement('a');
    indexLink.className = 'region-back-link region-index-back-link';
    indexLink.href = `${regionPageBase}regions`;
    indexLink.textContent = "Retour à l'index des regions";
    article.appendChild(indexLink);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRegionOverview);
} else {
  initRegionOverview();
}
