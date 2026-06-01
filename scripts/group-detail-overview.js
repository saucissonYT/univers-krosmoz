/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

const initGroupOverview = () => {
  const body = document.body;
  if (!body.classList.contains('group-overview-page')) return;

  const article = document.querySelector('.region-detail-panel');
  if (!article || article.querySelector('.region-overview-summary')) return;

  const groupTitle = document.querySelector('.region-hero-name')?.textContent?.trim() || 'le groupe';
  const groupSubtitle = document.querySelector('.region-hero-subtitle')?.textContent?.trim() || '';
  const pathname = window.location.pathname;
  const currentSlug = (pathname.split('/').pop() || '').replace(/\.html$/, '');
  const groupPageBase = pathname.includes('/pages/groupes/') ? '' : '/pages/groupes/';
  const groupAssetBase = pathname.includes('/pages/groupes/') ? '../../assets/groupes/' : '/assets/groupes/';
  const biographyHref = `${groupPageBase}${currentSlug}-biographie`;
  const paragraphs = Array.from(article.children).filter((child) => child.tagName === 'P');
  const summaryParagraphs = paragraphs.slice(0, 2);

  const membersTitle = article.querySelector('.region-characters-section h2');
  if (membersTitle) membersTitle.textContent = `Membres de ${groupTitle}`;

  const memberGrid = article.querySelector('.region-characters-grid');
  if (memberGrid) {
    const cards = Array.from(memberGrid.querySelectorAll('.region-character-card'));
    const shuffledCards = cards
      .map((card) => ({ card, seed: Math.random() }))
      .sort((first, second) => first.seed - second.seed)
      .map(({ card }) => card);
    memberGrid.append(...shuffledCards);
    shuffledCards.forEach((card, index) => {
      card.hidden = index >= 3;
    });
  }

  const summary = document.createElement('section');
  summary.className = 'region-overview-summary';
  summary.setAttribute('aria-label', `Résumé de ${groupTitle}`);

  const kicker = document.createElement('p');
  kicker.className = 'character-overview-kicker';
  kicker.textContent = 'Biographie';
  summary.appendChild(kicker);

  const heading = document.createElement('h2');
  heading.textContent = groupTitle;
  summary.appendChild(heading);

  if (groupSubtitle) {
    const role = document.createElement('p');
    role.className = 'character-overview-role';
    role.textContent = groupSubtitle;
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

  const groups = [
    { slug: 'bellaphones', name: 'Les Bellaphones', image: 'bellaphones/bellaphones-carte.webp' },
    { slug: 'eliatropes', name: 'Les Éliatropes', image: 'eliatropes/eliatropes-carte.webp' },
    { slug: 'confrerie-du-tofu', name: 'La Confrérie du Tofu', image: 'confrerie-du-tofu/confrerie-du-tofu-carte.jpg' },
    { slug: 'eliotropes', name: 'Les Éliotropes', image: 'eliotropes/eliotropes.webp' },
    { slug: 'fratrie-des-oublies', name: 'La Fratrie des Oubliés', image: 'fratrie-des-oublies/fratrie-des-oublies-carte.webp' },
    { slug: 'gardiens-des-mois', name: 'Les Gardiens des Mois', image: 'gardiens-des-mois/gardiens-des-mois-carte.webp' },
    { slug: 'merydes', name: 'Les Mérydes', image: 'merydes/merydes-carte.png' },
    { slug: 'mechasmes', name: 'Les Méchasmes', image: 'mechasmes/mechasmes-carte.webp' },
    { slug: 'multiman', name: 'Les Multiman', image: 'multiman/multiman-418932-carte.webp' },
    { slug: 'poupees-de-sadida', name: 'Les Poupées de Sadida', image: 'poupees-de-sadida/poupees-de-sadida-carte.webp' },
    { slug: 'ordre-du-coeur-vaillant', name: "L'Ordre du Cœur Vaillant", image: 'ordre-du-coeur-vaillant/ordre-du-coeur-vaillant-carte.webp' },
  ];

  const currentIndex = groups.findIndex((group) => group.slug === currentSlug);
  const hero = document.querySelector('.region-hero');
  if (hero && currentIndex !== -1 && !hero.querySelector('.region-hero-nav') && groups.length > 1) {
    const previousGroup = groups[(currentIndex - 1 + groups.length) % groups.length];
    const nextGroup = groups[(currentIndex + 1) % groups.length];

    const previousLink = document.createElement('a');
    previousLink.className = 'region-hero-nav region-hero-nav-prev';
    previousLink.href = `${groupPageBase}${previousGroup.slug}`;
    previousLink.setAttribute('aria-label', `Groupe précédent : ${previousGroup.name}`);
    previousLink.title = previousGroup.name;
    previousLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';

    const nextLink = document.createElement('a');
    nextLink.className = 'region-hero-nav region-hero-nav-next';
    nextLink.href = `${groupPageBase}${nextGroup.slug}`;
    nextLink.setAttribute('aria-label', `Groupe suivant : ${nextGroup.name}`);
    nextLink.title = nextGroup.name;
    nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';

    const firstHeroChild = hero.firstElementChild;
    hero.insertBefore(previousLink, firstHeroChild);
    hero.insertBefore(nextLink, firstHeroChild);
  }

  if (groups.length > 1) {
    const suggestions = document.createElement('section');
    suggestions.className = 'character-cross-group-panel region-suggestions-section';
    suggestions.setAttribute('aria-labelledby', 'group-suggestions-title');
    suggestions.innerHTML = `
      <h2 class="character-cross-group-title" id="group-suggestions-title">Explorer d'autres groupes</h2>
      <div class="character-cross-group-list region-suggestions-grid"></div>
    `;

    const suggestionsGrid = suggestions.querySelector('.region-suggestions-grid');
    groups
      .filter((group) => group.slug !== currentSlug)
      .slice(0, 2)
      .forEach((group) => {
        const link = document.createElement('a');
        link.className = 'character-cross-group-card region-suggestion-card';
        link.href = `${groupPageBase}${group.slug}`;
        link.innerHTML = `
          <img src="${groupAssetBase}${group.image}" alt="">
          <span class="character-cross-group-copy">
            <strong>${group.name}</strong>
          </span>
        `;
        suggestionsGrid.appendChild(link);
      });

    article.appendChild(suggestions);
  }

  if (!article.querySelector('.region-index-back-link')) {
    const indexLink = document.createElement('a');
    indexLink.className = 'region-back-link region-index-back-link';
    indexLink.href = `${groupPageBase}groupes`;
    indexLink.textContent = "Retour à l'index des groupes";
    article.appendChild(indexLink);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGroupOverview);
} else {
  initGroupOverview();
}
