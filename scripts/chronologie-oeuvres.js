/*
  Signature projet : site developpe par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Travail de recherche et edition : Zaki & B.
  Ne pas supprimer cette signature pour les prochains devs qui travaillent sur le projet.
*/

// Cibles partagees par plusieurs oeuvres. Le tableau works stocke seulement linkType pour eviter les doublons.
// Liens externes reutilises par plusieurs oeuvres.
const LINK_TARGETS = {
  launcher: 'https://www.ankama.com/fr/launcher',
  webtoon: 'https://www.allskreen.com/webtoon'
};

// Source unique de la chronologie des oeuvres: le DOM est regenere depuis ce tableau a chaque filtre.
// Donnees des oeuvres affichees dans la frise.
const works = [
  {
    era: 'primitif',
    date: 'Origines',
    title: 'Island of Wakfu',
    type: 'Game',
    preview: 'Jeu situe aux origines du Krosmoz.',
    details: ['Game. Aucun lien specifique demande.'],
    major: true
  },
  {
    era: 'primitif',
    date: 'Origines',
    title: 'Goultard le Barbare',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Recit anime place dans les premiers grands mythes du Krosmoz.',
    details: ['Lien associe a l icone ecran avec symbole play.'],
    major: true
  },

  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Hyrkul le Tendancieux',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon autour de la legende d Hyrkul.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Cire Momore',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon consacre a la malediction du Cire Momore.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Dofus Monster - Le Dragon Cochon',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur le Dragon Cochon.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Dofus Monster - Sphincter Cell',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Sphincter Cell.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Kerubim',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon dedie a Kerubim Crepin.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers recits Dofus',
    title: 'Dofus Monster - Le Chevalier Noir',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster autour du Chevalier Noir.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus',
    type: 'Game',
    linkType: 'launcher',
    preview: 'Le MMORPG DOFUS, point d entree majeur de l Age des Dofus.',
    details: ['Lien associe a l icone game.'],
    major: true
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Nomekop',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Nomekop.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Ogrest - Episodes 1 a 8',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Premiers episodes webtoon autour d Ogrest.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Arena',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Oeuvre derivee de l univers DOFUS Arena.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Zatoishwan',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Zatoishwan.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Brumen Tinctorias',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Brumen Tinctorias.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Pets',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Oeuvre liee aux familiers de l univers DOFUS.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Firefoux',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Firefoux.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus - Manga',
    type: 'Manga',
    linkType: 'webtoon',
    preview: 'Manga DOFUS ajoute dans la chronologie des oeuvres.',
    details: ['Lien associe aux supports de lecture.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Adaptation ou recit DOFUS signale par l icone webtoon.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus aux tresors de Kerubim',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Serie animee autour des souvenirs et tresors de Kerubim.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus le film',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Film DOFUS ajoute apres Dofus aux tresors de Kerubim.',
    details: ['Lien demande vers le launcher Ankama.']
  },
  {
    era: 'dofus',
    date: 'Soon',
    title: 'Welsh & Shedar',
    type: 'Soon',
    preview: 'Oeuvre indiquee comme a venir.',
    details: ['Soon. Aucun lien specifique demande.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'La BD officielle du film DOFUS - Julith & Jahash 1/2',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit lie au film DOFUS : Livre 1 - Julith.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Les Dessous de Dofus',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Oeuvre derivee explorant les coulisses et recits de DOFUS.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Moon',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Moon.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Pandala',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon autour de Pandala.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Wa Wabbit',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur le Wa Wabbit.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Age des Dofus',
    title: 'Dofus Monster - Koulosse',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Koulosse.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'Ogrest - Episodes 9 a 24',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Suite des episodes webtoon autour d Ogrest.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'One More Gate: A Wakfu Legend',
    type: 'Game',
    linkType: 'launcher',
    preview: 'Jeu situe dans les legendes du Krosmoz.',
    details: ['Lien associe a l icone game.'],
    major: true
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: "Wakfu - Noximilien l'Horloger",
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Episode special consacre a Noximilien.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'Ogrest - Episodes 25 a 35',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Derniere partie DOFUS des episodes webtoon autour d Ogrest.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },

  {
    era: 'wakfu',
    date: 'Debut de l ere Wakfu',
    title: 'Ogrest - Episodes 36 a 43',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episodes webtoon places apres le Chaos d Ogrest.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ere Wakfu',
    title: 'Ogrest - Episodes 44 a 52',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Suite des episodes webtoon places apres le Chaos d Ogrest.',
    details: ['Meme lien que Ogrest - Episodes 36 a 43.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ere Wakfu',
    title: 'Le Corbeau Noir',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon autour du Corbeau Noir.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ere Wakfu',
    title: 'Justice',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon autour de Justice.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu',
    type: 'Game',
    linkType: 'launcher',
    preview: 'Le MMORPG WAKFU ouvre la chronologie interactive de l ere Wakfu.',
    details: ['Lien associe a l icone game.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Remington',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon dedie a Remington.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Maskemane',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon dedie a Maskemane.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Ogrest la Legende',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Special anime consacre a la legende d Ogrest.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu - Saison 1',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Premiere saison de la serie animee WAKFU.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu les Gardiens',
    type: 'Game',
    preview: 'Jeu WAKFU place apres la saison 1.',
    details: ['Game. Aucun lien specifique demande.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Tangomango',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon signale dans la frise officielle.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Mini Wakfu',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Format anime court rattache a WAKFU.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu - Saison 2',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Deuxieme saison de la serie animee WAKFU.',
    details: ['Lien associe a l icone ecran avec symbole play.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu les Gardiens 2',
    type: 'Game',
    preview: 'Jeu WAKFU place apres la saison 2.',
    details: ['Game. Aucun lien specifique demande.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu - Manga',
    type: 'Manga',
    linkType: 'webtoon',
    preview: 'Manga WAKFU ajoute dans la chronologie des oeuvres.',
    details: ['Lien associe aux supports de lecture.']
  },
  {
    era: 'wakfu',
    date: 'Ere du Wakfu',
    title: 'Wakfu',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit WAKFU signale par l icone webtoon.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre I : Le Trone de Glace',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Premier livre OAV WAKFU signale par l icone webtoon.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre II : Ush',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Deuxieme livre OAV WAKFU consacre a Ush.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre III : Mont Dragons',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Troisieme livre OAV WAKFU autour du Mont Dragons.',
    details: ['Lien associe a l icone smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Fin de l ere Wakfu',
    title: 'Wakfu - Saison 3',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Troisieme saison de la serie animee WAKFU.',
    details: ['Meme lien que Wakfu - Saison 4.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ere Wakfu',
    title: 'Wakfu - Saison 4',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Suite animee de WAKFU ajoutee en fin d ere Wakfu.',
    details: ['Lien demande vers le launcher Ankama.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ere Wakfu',
    title: 'Wakfu - Saison 5',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Cinquieme saison annoncee de WAKFU.',
    details: ['Lien demande vers le launcher Ankama.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ere Wakfu',
    title: 'Wakfu - La Grande Vague',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Recit webtoon place apres les grands evenements de WAKFU.',
    details: ['Lien demande vers Allskreen.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ere Wakfu',
    title: 'Bestiale',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Oeuvre ajoutee a la fin de l ere Wakfu.',
    details: ['Lien demande vers le launcher Ankama.'],
    major: true
  },

  {
    era: 'waven',
    date: 'Debut de l ere Waven',
    title: 'Waven',
    type: 'MMO',
    linkType: 'launcher',
    preview: 'Le MMO WAVEN ouvre l ere du Waven dans cette chronologie des oeuvres.',
    details: ['Lien demande vers le launcher Ankama.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Ere du Waven',
    title: 'Lancedur',
    type: 'Serie / film',
    linkType: 'launcher',
    preview: 'Aventure rattachee a l ere du Waven.',
    details: ['Lien demande vers le launcher Ankama.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Soon',
    title: 'Waven - Serie animee',
    type: 'Serie / film',
    preview: 'Serie animee Waven indiquee comme a venir.',
    details: ['Soon. Aucun lien specifique demande.'],
    major: true
  }
];

// Libelles et classes CSS utilises pour les titres de sections et les couleurs d'ere.
// Libelles des eres pour les titres de section.
const eraLabels = {
  primitif: { label: 'Ere Primitive', cls: 'primitif' },
  dofus: { label: 'Age des Dofus', cls: 'dofus' },
  wakfu: { label: 'Ere du Wakfu', cls: 'wakfu' },
  waven: { label: 'Ere du Waven', cls: 'waven' }
};

const eraBgClass = {
  primitif: 'era-bg-primitif',
  dofus: 'era-bg-dofus',
  wakfu: 'era-bg-wakfu',
  waven: 'era-bg-waven'
};

// Etat minimal de l'interface: filtre courant et ancres utiles pour synchroniser le fond au scroll.
let currentFilter = 'all';
let allEraTitleAnchors = [];
let scrollFramePending = false;

// Recupere l URL finale selon le type de lien.
function getWorkUrl(work) {
  if (!work.linkType) {
    return '';
  }

  return LINK_TARGETS[work.linkType] || '';
}

function getLinkLabel(work) {
  if (work.linkType === 'webtoon') {
    return 'Allskreen';
  }

  if (work.linkType === 'launcher') {
    return 'Ankama Launcher';
  }

  return '';
}

// Prepare les badges visibles sur chaque carte.
function renderMeta(work) {
  // Les badges restent visuels; le lien cliquable est porte par la carte entiere dans buildTimeline().
  const url = getWorkUrl(work);
  const linkLabel = getLinkLabel(work);
  const link = url ? `<span class="work-pill link-target ${work.linkType}">${linkLabel}</span>` : '<span class="work-pill no-link">Sans lien</span>';

  return `
    <div class="work-meta">
      <span class="work-pill">${work.type}</span>
      ${link}
    </div>
  `;
}

function setActiveBackground(filter) {
  // Une seule image de fond est active a la fois pour garder une transition lisible.
  const bgMap = {
    primitif: document.getElementById('bg-primitif'),
    dofus: document.getElementById('bg-dofus'),
    wakfu: document.getElementById('bg-wakfu'),
    waven: document.getElementById('bg-waven')
  };

  Object.values(bgMap).forEach(bg => bg.classList.remove('active'));

  if (filter === 'all') {
    bgMap.primitif.classList.add('active');
    return;
  }

  if (bgMap[filter]) {
    bgMap[filter].classList.add('active');
  }
}

function syncBackgroundWithScroll() {
  // En mode "all", on choisit le fond selon le dernier titre d'ere passe sous la ligne d'activation.
  if (currentFilter !== 'all' || allEraTitleAnchors.length === 0) {
    return;
  }

  const bottomThreshold = 24;
  const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - bottomThreshold;

  if (reachedBottom) {
    setActiveBackground(allEraTitleAnchors[allEraTitleAnchors.length - 1].dataset.era);
    return;
  }

  const activationLine = window.innerHeight * 0.35;
  let activeEra = allEraTitleAnchors[0].dataset.era;

  allEraTitleAnchors.forEach(anchor => {
    if (anchor.getBoundingClientRect().top <= activationLine) {
      activeEra = anchor.dataset.era;
    }
  });

  setActiveBackground(activeEra);
}

function requestScrollBackgroundSync() {
  if (scrollFramePending) {
    return;
  }

  scrollFramePending = true;
  window.requestAnimationFrame(() => {
    scrollFramePending = false;
    syncBackgroundWithScroll();
  });
}

// Reconstruit la frise des oeuvres selon le filtre choisi.
function buildTimeline(filter) {
  // Reconstruction complete: plus simple et plus fiable que de cacher/reordonner les anciennes cartes.
  currentFilter = filter;
  const timeline = document.getElementById('works-timeline');
  timeline.innerHTML = '';
  setActiveBackground(filter);

  let currentEra = null;
  let eraWrap = null;
  let index = 0;

  works.forEach(work => {
    if (filter !== 'all' && work.era !== filter) {
      return;
    }

    if (work.era !== currentEra) {
      currentEra = work.era;

      const titleWrap = document.createElement('div');
      titleWrap.className = 'era-title-wrap';
      titleWrap.dataset.era = work.era;
      titleWrap.innerHTML = `<span class="era-title ${eraLabels[work.era].cls}">${eraLabels[work.era].label}</span>`;
      timeline.appendChild(titleWrap);

      eraWrap = document.createElement('div');
      eraWrap.className = `era-bg ${eraBgClass[work.era]}`;
      timeline.appendChild(eraWrap);
    }

    const isOdd = index % 2 === 0;
    const event = document.createElement('div');
    event.className = `event ${work.era}`;
    event.style.animationDelay = `${index * 0.04}s`;

    const url = getWorkUrl(work);
    const contentTag = url ? 'a' : 'div';
    const contentAttrs = url ? ` href="${url}" target="_blank" rel="noopener noreferrer"` : '';
    const contentHtml = `
      <div class="event-date">${work.date}</div>
      <div class="event-title">${work.title}</div>
      ${renderMeta(work)}
    `;

    const contentClass = `event-content${url ? ' direct-link' : ' static-open'}`;
    const dot = `<div class="event-dot ${work.era}${work.major ? ' major' : ''}"></div>`;

    if (isOdd) {
      event.innerHTML = `
        <${contentTag} class="${contentClass}"${contentAttrs}>${contentHtml}</${contentTag}>
        <div class="event-dot-col">${dot}</div>
        <div class="event-empty"></div>
      `;
    } else {
      event.innerHTML = `
        <div class="event-empty"></div>
        <div class="event-dot-col">${dot}</div>
        <${contentTag} class="${contentClass}"${contentAttrs}>${contentHtml}</${contentTag}>
      `;
    }

    eraWrap.appendChild(event);
    index++;
  });

  if (filter === 'all' && works.length > 0) {
    const tail = document.createElement('div');
    tail.className = 'timeline-tail';
    timeline.appendChild(tail);
  }

  allEraTitleAnchors = Array.from(document.querySelectorAll('.era-title-wrap[data-era]'));
  requestScrollBackgroundSync();
}

function setActiveEraButton(filter) {
  document.querySelectorAll('.era-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
}

document.querySelectorAll('.era-btn').forEach(button => {
  button.addEventListener('click', () => {
    setActiveEraButton(button.dataset.filter);
    buildTimeline(button.dataset.filter);
  });
});

window.addEventListener('scroll', requestScrollBackgroundSync, { passive: true });
window.addEventListener('resize', requestScrollBackgroundSync);

buildTimeline('all');
