(function () {
  const works = [
    { title: 'Islands of Wakfu', href: 'island-of-wakfu.html', image: '../assets/oeuvres/island-of-wakfu.webp', type: 'Game', era: 'primitif' },
    { title: 'Goultard le Barbare', href: 'goultard-le-barbare.html', image: '../assets/personnages/GOULTARD.webp', type: 'Série / film', era: 'primitif' },
    { title: 'Hyrkul le Tendancieux', href: 'hyrkul-le-tendancieux.html', image: '../assets/personnages/HYRKUL.webp', type: 'Webtoon', era: 'dofus' },
    { title: 'Cire Momore', href: 'cire-momore.html', image: '../assets/personnages/CIRE MOMORE.webp', type: 'Webtoon', era: 'dofus' },
    { title: 'Kérubim', href: 'kerubim.html', image: '../assets/oeuvres/kerubim.webp', type: 'Webtoon', era: 'dofus' },
    { title: 'Aux trésors de Kerubim', href: 'dofus-aux-tresors-kerubim.html', image: '../assets/oeuvres/dofus-aux-tresors-kerubim.webp', type: 'Série / film', era: 'dofus' },
    { title: 'Dofus le film', href: 'dofus-le-film.html', image: '../assets/oeuvres/dofus-le-film.webp', type: 'Série / film', era: 'dofus' },
    { title: 'Welsh & Shedar', href: 'welsh-shedar.html', image: '../assets/oeuvres/welsh-shedar.webp', type: 'Soon', era: 'dofus' },
    { title: "Wakfu - Noximilien l'Horloger", href: 'noximilien-horloger.html', image: '../assets/oeuvres/noximilien-horloger.webp', type: 'Série / film', era: 'dofus' },
    { title: 'Ogrest la Légende', href: 'ogrest-la-legende.html', image: '../assets/oeuvres/ogrest-la-legende.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Wakfu - Saison 1', href: 'wakfu-saison-1.html', image: '../assets/oeuvres/wakfu-saison-1.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Wakfu - Saison 2', href: 'wakfu-saison-2.html', image: '../assets/oeuvres/wakfu-saison-2.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Wakfu OAV - Livre I', href: 'wakfu-oav-livre-1.html', image: '../assets/oeuvres/wakfu-oav-livre-1.webp', type: 'Webtoon', era: 'wakfu' },
    { title: 'Wakfu OAV - Livre II', href: 'wakfu-oav-livre-2.html', image: '../assets/oeuvres/wakfu-oav-livre-2.webp', type: 'Webtoon', era: 'wakfu' },
    { title: 'Wakfu OAV - Livre III', href: 'wakfu-oav-livre-3.html', image: '../assets/oeuvres/wakfu-oav-livre-3.webp', type: 'Webtoon', era: 'wakfu' },
    { title: 'Wakfu - Saison 3', href: 'wakfu-saison-3.html', image: '../assets/oeuvres/wakfu-saison-3.webp', type: 'Série / film', era: 'wakfu' },
    { title: "Wakfu OAV Oropo : Bataille pour l'Eliacube", href: 'wakfu-oav-oropo.html', image: '../assets/oeuvres/wakfu-oav-oropo.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Wakfu - Saison 4', href: 'wakfu-saison-4.html', image: '../assets/oeuvres/wakfu-saison-4.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Wakfu - Saison 5', href: 'wakfu-saison-5.html', image: '../assets/oeuvres/wakfu-saison-5.webp', type: 'Série / film', era: 'wakfu' },
    { title: 'Waven', href: 'waven-jeu.html', image: '../assets/oeuvres/waven-jeu.webp', type: 'MMO', era: 'waven' },
    { title: 'Lancedur', href: 'lancedur.html', image: '../assets/oeuvres/lancedur.webp', type: 'Série / film', era: 'waven' },
    { title: 'Bestiale', href: 'bestiale.html', image: '../assets/oeuvres/bestiale.webp', type: 'Série / film', era: 'waven' },
    { title: 'Waven - Série animée', href: 'histoire-ere-piraterie.html', image: '../assets/histoire/illustrations/ere-piraterie.webp', type: 'Série / film', era: 'waven' }
  ];

  const eraLabels = {
    primitif: 'Ère primitive',
    dofus: 'Âge des Dofus',
    wakfu: 'Ère du Wakfu',
    waven: 'Ère du Waven'
  };

  const currentHref = () => decodeURIComponent((window.location.pathname.split('/').pop() || '').toLowerCase());

  function createSuggestions() {
    const main = document.querySelector('.history-detail-main');
    const panel = document.querySelector('.history-detail-panel');
    if (!main || !panel || main.querySelector('.work-related-panel')) return;

    const current = works.find((work) => work.href.toLowerCase() === currentHref());
    if (!current) return;

    const related = works
      .filter((work) => work.href !== current.href && work.era === current.era)
      .sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' }))
      .slice(0, 8);

    if (!related.length) return;

    main.classList.add('has-work-related');

    const aside = document.createElement('aside');
    aside.className = 'work-related-panel';
    aside.setAttribute('aria-label', 'Autres œuvres de ' + (eraLabels[current.era] || current.era));

    const title = document.createElement('h2');
    title.className = 'work-related-title';
    title.textContent = eraLabels[current.era] || current.era;
    aside.appendChild(title);

    const list = document.createElement('div');
    list.className = 'work-related-list';

    related.forEach((work) => {
      const link = document.createElement('a');
      link.className = 'work-related-card';
      link.href = work.href;

      const image = document.createElement('img');
      image.src = work.image;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';

      const copy = document.createElement('span');
      copy.className = 'work-related-card-copy';

      const name = document.createElement('strong');
      name.textContent = work.title;

      const type = document.createElement('span');
      type.textContent = work.type;

      copy.append(name, type);
      link.append(image, copy);
      list.appendChild(link);
    });

    aside.appendChild(list);
    panel.insertAdjacentElement('afterend', aside);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSuggestions, { once: true });
  } else {
    createSuggestions();
  }
})();
