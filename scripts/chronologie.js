/*
  Chronologie principale du Krosmoz.
  Ce fichier remplace l'ancien script inline de index.html.
  Il contient les donnees des evenements, construit la timeline et synchronise les fonds d'ere.
*/
// Base de données locale de la chronologie.
// Chaque entrée décrit une carte/événement affiché dans la timeline.
const events = [
  // ─── ÈRE PRIMITIVE ───
  {
    era: "primitif",
    date: "Origines",
    title: "Naissance du Krosmoz",
    preview: "La Grande Déesse Eliatrope et le Grand Dragon créent le Krosmoz lors de leur première danse.",
    details: ["La Grande Déesse Eliatrope et le Grand Dragon créent le Krosmoz lors de leur première danse.", "Thanatena et Prysmaradoth organisent les plans : Externam, Incarnam, etc.", "Les Dix Dieux s'installent sur l'Inglorium.", "Lors de leur seconde danse naissent les six premiers Eliatropes et leurs Dragons jumeaux."],
    major: true
  },
  {
    era: "primitif",
    date: "−11 000 à −10 000",
    title: "Naissance des Éliatropes & Déclin",
    preview: "800 ans de paix avec les Méchasmes, puis Qilby vole l'Eliacube — le début de la tragédie.",
    details: ["Les Éliatropes vivent 800 ans en paix avec les Méchasmes.", "Qilby vole l'Eliacube (cœur d'Orgonax) → guerre.", "Exode à bord du Zinit, fondation d'une colonie sur le futur Monde des Dix.", "Qilby trahit à nouveau : il est vaincu, mutilé par Phaéris, puis enfermé dans la Dimension Blanche par Yugo et Adamaï qui se sacrifient.", "Nora annihile la vie sur la planète avec l'aide de la Déesse Éliatrope."],
    major: true
  },
  {
    era: "primitif",
    date: "−8 000",
    title: "Renaissance du Monde",
    preview: "Osamodas découvre la planète vidée. Les Trois Dragons réinsufflent la vie.",
    details: ["Osamodas découvre la planète vidée.", "Les Trois Dragons réinsufflent la vie.", "Les Dieux créent le Monde des Dix.", "Les Dieux donnent naissance aux Dragons Primordiaux.", "Pacte Dieux/Démons — Rushu annihile les démons et devient Roi des Shushus."],
    major: false
  },
  {
    era: "primitif",
    date: "−7 500 à −352",
    title: "Ère Mythique — Peuplement & Légendes",
    preview: "Le monde est peuplé depuis Incarnam. Arthodan défie les Dieux, Goultard naît, les Forgelances apparaissent.",
    details: ["−7 500 : Le monde est peuplé par les âmes d'Incarnam.", "~−1 500 : Arthodan défie les Dieux → malédiction des Valoniens, naissance des Valkyrs, légende de la lance Heïmer.", "−1 111 : Naissance de Goultard.", "−600 : Vision de l'Éliocalypse → naissance des premiers Forgelances.", "−352 : Intrigues divines, dragons et œufs majeurs (Crocabulia, Grozilla, Grasmera…)."],
    major: false
  },
  // ─── ÂGE DES DOFUS ───
  {
    era: "dofus",
    date: "Âge 0",
    title: "Création du Temps — L'Horloge Divine",
    preview: "Xélor crée l'Horloge Divine basée sur les pulsations des Dofus. Début de l'Âge des Dofus.",
    details: ["Xélor crée l'Horloge Divine basée sur les pulsations des Dofus.", "Xélor instaure les Protecteurs des Mois (Djaul imposé par Rushu).", "Fondation des Gardiens des Dofus Primordiaux."],
    major: true
  },
  {
    era: "dofus",
    date: "An 10 – 26",
    title: "Manigances de Djaul",
    preview: "Djaul manipule Aguabrial, un hiver éternel s'abat et Goultard devient Dark Vlad.",
    details: ["Djaul manipule Aguabrial → naissance d'un nouveau Dofus Turquoise et de Bolgrot.", "Hiver éternel, mort de Solar, ascension de Sacrieur → le Monde des Dix devient Monde des Onze.", "Ereziah crée les Multimen à partir des Dofus (Skale, Lumino, Ombre…).", "Rushu rompt le Pacte : invasion démoniaque.", "Goultard devient Dark Vlad.", "Fondation de Brâkmar (Djaul) puis de Bonta (Jiva).", "Première Aurore Pourpre : guerre Bonta vs Brâkmar."],
    major: false
  },
  {
    era: "dofus",
    date: "An 130 – 400",
    title: "Grandes Guerres & Âge des Héros",
    preview: "Bolgrot est tué, les six Dofus Primordiaux retrouvés. Hyrkul devient liche.",
    details: ["Bolgrot est tué, les six Dofus Primordiaux sont retrouvés.", "Hyrkul devient liche.", "Ruine des Cités → période du « Gel des Cités ».", "Création de Srambad par Sram.", "Crail affronte Dark Vlad et garde le Dofus Pourpre.", "Kerubim Crépin, Julith et Jahash Jurgen : drame du Dofus Ébène.", "Joris devient gardien des Dofus Ivoire et Ébène après avoir sauvé Bonta."],
    major: false
  },
  {
    era: "dofus",
    date: "An 500 – 567",
    title: "Royaumes & Désastres",
    preview: "Invasions démoniaques, Frigost maudite d'un hiver éternel par Djaul.",
    details: ["Invasions démoniaques (Uk'Not'Allag).", "Allister devient roi d'Amakna.", "Sur Frigost : Nileza et le Comte Harebourg créent la Clepsydre (Dofus des Glaces).", "Djaul maudit Frigost d'un hiver éternel.", "Léorictus sombre dans la folie et meurt avec le Dofus Ivoire (récupéré ensuite)."],
    major: false
  },
  {
    era: "dofus",
    date: "An 626 – 634",
    title: "Naissance d'Ogrest",
    preview: "Ogrest découvre les Dofus, mute à leur contact. Les Dofus Primordiaux disparaissent.",
    details: ["Naissance d'Ogrest.", "Il découvre les Dofus, mute à leur contact.", "Disparition des Dofus Primordiaux.", "Début du MMORPG DOFUS."],
    major: true
  },
  {
    era: "dofus",
    date: "An 650 – 711",
    title: "Frigost & Fratrie des Oubliés",
    preview: "Ogrest s'empare du Dofus des Glaces. Les Steamers découvrent la Stasis.",
    details: ["Nouveaux Forgelances face aux premiers signes de l'Éliocalypse.", "Lupa, Kali et Ogrest traquent Dathura.", "Ogrest s'empare du Dofus des Glaces et reste piégé 123 ans avec Dathura et Harebourg.", "Les Steamers découvrent la Stasis.", "Oropo scelle la Tour Minérale hors du temps."],
    major: false
  },
  {
    era: "dofus",
    date: "An 750 – 789",
    title: "Chaos d'Ogrest",
    preview: "Ogrest réunit les six Dofus Primordiaux, affronte les Dieux, trahi par Dathura — il pleure au sommet du Mont Zinit.",
    details: ["Naissance de Noximilien, qui trouve l'Eliacube et sombre dans la folie.", "Ogrest réunit les six Dofus Primordiaux.", "Il affronte les Dieux et est trahi par Dathura.", "Fou de chagrin, Ogrest pleure au sommet du Mont Zinit."],
    major: true
  },
  // ─── ÈRE DU WAKFU ───
  {
    era: "wakfu",
    date: "An 789",
    title: "Début de l'Ère du Wakfu",
    preview: "Le cataclysme d'Ogrest ravage le monde. Fin de l'Âge des Dofus.",
    details: ["Ogrest provoque un cataclysme mondial → fin de l'Âge des Dofus, début de l'Ère du Wakfu.", "Mort du roi Allister.", "Naissance des Cinq Factions (Culte d'Ogrest, Sœurs de Dathura…).", "Nox perd sa famille et devient le Xélor fou."],
    major: true
  },
  {
    era: "wakfu",
    date: "An 790 – 832",
    title: "Reconstruction du Monde",
    preview: "Sadida et Osamodas relancent vie végétale et animale. Reformation des 4 Nations.",
    details: ["Sadida et Osamodas relancent la vie végétale et animale.", "Don des Havre-Sacs par Enutrof.", "Reformation des 4 Nations + Astrub.", "Les Dieux se retirent partiellement.", "Apparition des Membres de Clan (protection des écosystèmes).", "Guerre des Steamers.", "Sram verrouille Srambad."],
    major: false
  },
  {
    era: "wakfu",
    date: "An 965 – 969",
    title: "Retour des Éliatropes & Confrérie du Tofu",
    preview: "Yugo et Adamaï renaissent. Naissance d'Evangelyne, Tristepin, Amalia.",
    details: ["Naissance d'Evangelyne, Tristepin (réincarnation du Iop), Amalia…", "Éclosion du Dofus Éliatrope de Yugo et Adamaï, ils renaissent.", "Grougaloragran confie Yugo à Alibert.", "Début du MMO Wakfu (an 969)."],
    major: true
  },
  {
    era: "wakfu",
    date: "An 970 – 974",
    title: "Mont Zinit & Dimensions",
    preview: "Exploration des Dimensions Divines. Ogrest apaisé. La Fratrie des Oubliés révélée.",
    details: ["Libération du Comte Harebourg.", "Exploration des Dimensions Divines (Srambad, Enutrosor, Xélorium…).", "Ogrest est affronté et apaisé temporairement.", "Révélation de la Fratrie des Oubliés.", "Ullu démasqué (conscience piégée du Vaisseau Éliatrope).", "Découverte du Vaisseau Zinit."],
    major: false
  },
  {
    era: "wakfu",
    date: "An 977",
    title: "Un Jour Sans Fin",
    preview: "Le Héros et Pandora empêchent l'Éliocalypse. Boucle temporelle créée grâce au Dofus Turquoise.",
    details: ["Le Héros et Pandora empêchent l'Éliocalypse.", "Création d'une boucle temporelle grâce au Dofus Turquoise.", "Projet Méthée accompli → arrêt du temps."],
    major: false
  },
  {
    era: "wakfu",
    date: "An 981 – 982",
    title: "Saisons 1 & 2 de Wakfu",
    preview: "Défaite de Nox, libération de Qilby, invasion de Rushu déjouée.",
    details: ["Formation de la Confrérie du Tofu.", "Défaite de Nox au Royaume Sadida (mort de Tristepin, retour via Rubilax).", "Libération de Qilby, voyage à Emrub.", "Invasion de Rushu déjouée.", "Qilby enfermé à nouveau dans la Dimension Blanche."],
    major: true
  },
  {
    era: "wakfu",
    date: "An 988",
    title: "OAV Wakfu — Yugo Dieu",
    preview: "Yugo utilise les 6 Dofus Éliatropes et devient dieu temporaire. Création des Éliotropes.",
    details: ["Nouvelle montée des eaux.", "Les 6 Dofus Éliatropes sont dispersés.", "Alliance forcée avec Harebourg (gelé ensuite).", "Yugo utilise les 6 Dofus → devient dieu temporaire.", "Création des Éliotropes.", "Mont Zinit expulsé dans l'espace puis dans la Shukrute.", "Ogrest retrouve forme humaine.", "Adamaï rejoint la Fratrie et vole les Dofus."],
    major: true
  },
  {
    era: "wakfu",
    date: "An 990",
    title: "Saison 3 — Guerre contre la Fratrie",
    preview: "Révélation du plan d'Oropo : détruire l'Inglorium. L'Eliabombe explose dans la dimension d'Oropo.",
    details: ["Guerre contre la Fratrie des Oubliés.", "Révélation : plan d'Oropo = détruire l'Inglorium.", "Création de l'Eliabombe (Eliacube + Dofus).", "Explosion dans la dimension d'Oropo : Oropo, Dame Echo et Harebourg meurent.", "La Confrérie et la Fratrie se retrouvent dans l'Inglorium."],
    major: true
  },
  {
    era: "wakfu",
    date: "An 990",
    title: "Saison 4 — L'Invasion des Nécromes",
    preview: "Retour des Éliatropes, Qilby se sacrifie, Yugo évolue en adulte, les Nécromes envahissent le monde — et Yugo épouse Amalia.",
    details: [
      "L'Inglorium est dévasté et les dieux l'ont abandonné. Établissement du Temple de la Déesse Éliatrope sur l'Inglorium.",
      "Retour des Éliatropes sur le monde — Qilby est ramené par la Grande Déesse.",
      "Toross Mordal, chef des Nécromes, retrouve la Déesse Éliatrope pour s'emparer de son Wakfu.",
      "Yugo est capturé et son Wakfu aspiré, forçant son évolution en adulte.",
      "Lokus reconnaît la valeur de Qilby et lui offre son cœur de Méchasme.",
      "Qilby se sacrifie pour sauver Yugo et lui lègue le cœur de Méchasme ainsi que les Dofus Éliatropes.",
      "Invasion des Nécromes sur le monde — la Déesse Éliatrope s'enfuit dans le Krosmoz.",
      "Yugo et la Confrérie du Tofu endiguent les Nécromes dans leur monde, au prix du sacrifice de Nora et Efrim.",
      "Yugo et Amalia se marient."
    ],
    major: true
  },
  {
    era: "wakfu",
    date: "An 990",
    title: "Saison 5 — La Revanche du Comte Harebourg",
    preview: "Le Comte Harebourg fusionne avec l'Éliacube. L'île mystérieuse d'Odessa se dévoile.",
    details: [
      "Le Comte Harebourg fusionne avec l'Éliacube.",
      "L'île d'Odessa se dévoile…"
    ],
    major: true
  },
  {
    era: "wakfu",
    date: "An 1000",
    title: "Wakfu — La Grande Vague",
    preview: "Grougalorasalar pose un ultimatum à Yugo. La Source, lieu de terraformation du monde, se dévoile.",
    details: [
      "Grougalorasalar pose un ultimatum à Yugo, il dispose des 6 Dofus Primordiaux.",
      "La Source, lieu de terraformation du monde, se dévoile.",
      "La Source est l'endroit où les 6 Dofus Primordiaux ont été posés sur le Monde des Dix.",
      "Yugo et Amalia déclarent le Royaume Sadida indépendant."
    ],
    major: true
  },
  // ─── ÈRE DU WAVEN ───
  {
    era: "waven",
    date: "An 1005",
    title: "Évènements du MMO Waven",
    preview: "Les dieux ont perdu leurs pouvoirs et se cachent sur le Monde des Douze. Une mystérieuse entité les traque.",
    details: [
      "Les dieux ont perdu leurs pouvoirs et se retrouvent à se cacher sur le Monde des Douze.",
      "Une mystérieuse entité les traque et récupère leurs pouvoirs."
    ],
    major: true
  },
  {
    era: "waven",
    date: "An 1023",
    title: "Lancedur — Fin de la Malédiction",
    preview: "Dernière aventure du Comte Lancedur qui mettra fin à la longue malédiction du Ciré Momore.",
    details: [
      "Dernière aventure du Comte Lancedur qui mettra fin à la longue malédiction du Ciré Momore."
    ],
    major: true
  },
  {
    era: "waven",
    date: "Âge inconnu",
    title: "Waven — La Série",
    preview: "Une nouvelle série animée se déroulant dans l'Ère du Waven. Les détails restent à révéler.",
    details: [
      "Une nouvelle série animée se déroulant dans l'Ère du Waven.",
      "Les détails restent à révéler…"
    ],
    major: true
  },
  {
    era: "waven",
    title: "Coming Soon…",
    preview: "La suite des chroniques du Krosmoz n'a pas encore été écrite.",
    details: [
      "La suite des chroniques du Krosmoz n'a pas encore été écrite…"
    ],
    major: false
  }
];

const eraLabels = {
  primitif: { label: "Ère Primitive", cls: "primitif" },
  dofus: { label: "Âge des Dofus", cls: "dofus" },
  wakfu: { label: "Ère du Wakfu", cls: "wakfu" },
  waven: { label: "Ère du Waven", cls: "waven" }
};

// Classes ajoutees aux conteneurs d'ere. Elles permettent au CSS de garder une ligne verticale par section.
const eraBgClass = {
  primitif: 'era-bg-primitif',
  dofus: 'era-bg-dofus',
  wakfu: 'era-bg-wakfu',
  waven: 'era-bg-waven'
};

// Etat de rendu partage par les handlers: filtre actif, titres visibles et throttle requestAnimationFrame.
let currentFilter = 'all';
let allEraTitleAnchors = [];
let scrollFramePending = false;

// Active le bon fond visuel selon l'ère sélectionnée.
function setActiveBackground(filter) {
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

// En vue "Toutes les ères", le fond change en fonction de la position réelle dans la page.
function syncBackgroundWithScroll() {
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
  // Evite de recalculer le fond a chaque evenement scroll natif; un calcul par frame suffit.
  if (scrollFramePending) {
    return;
  }

  scrollFramePending = true;
  window.requestAnimationFrame(() => {
    scrollFramePending = false;
    syncBackgroundWithScroll();
  });
}

// Reconstruit entièrement la timeline selon le filtre courant.
// On repart de zéro à chaque changement pour garder un DOM propre et prévisible.
function buildTimeline(filter) {
  currentFilter = filter;
  const tl = document.getElementById('timeline');
  tl.innerHTML = '';
  setActiveBackground(filter);
  const shouldAutoExpand = filter !== 'all';
  let currentEra = null;
  let eraWrap = null;
  let idx = 0;

  events.forEach(ev => {
    if (filter !== 'all' && ev.era !== filter) return;

    if (ev.era !== currentEra) {
      // A chaque changement d'ere, on ajoute un titre puis un wrapper pour regrouper ses evenements.
      currentEra = ev.era;

      const titleWrap = document.createElement('div');
      titleWrap.className = 'era-title-wrap';
      titleWrap.dataset.era = ev.era;
      titleWrap.innerHTML = `<span class="era-title ${eraLabels[ev.era].cls}">${eraLabels[ev.era].label}</span>`;
      tl.appendChild(titleWrap);

      eraWrap = document.createElement('div');
      eraWrap.className = `era-bg ${eraBgClass[ev.era]}`;
      tl.appendChild(eraWrap);
    }

    const eventIndex = idx;
    const isOdd = eventIndex % 2 === 0;
    const div = document.createElement('div');
    div.className = `event ${ev.era}`;
    div.style.animationDelay = (eventIndex * 0.06) + 's';

    // Le contenu est cree ici car les evenements viennent de donnees locales, pas du HTML statique.
    const contentHtml = `
      <div class="event-date">${ev.date}</div>
      <div class="event-title">${ev.title}</div>
      <div class="event-preview${shouldAutoExpand ? ' full-preview' : ''}">${ev.preview}</div>
      <div class="event-expanded${shouldAutoExpand ? ' open' : ''}" id="exp-${eventIndex}">
        <ul>${ev.details.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>`;

    const contentClass = `event-content${shouldAutoExpand ? ' static-open' : ''}`;

    if (isOdd) {
      div.innerHTML = `
        <div class="${contentClass}">${contentHtml}</div>
        <div class="event-dot-col"><div class="event-dot ${ev.era}${ev.major ? ' major' : ''}"></div></div>
        <div class="event-empty"></div>`;
    } else {
      div.innerHTML = `
        <div class="event-empty"></div>
        <div class="event-dot-col"><div class="event-dot ${ev.era}${ev.major ? ' major' : ''}"></div></div>
        <div class="${contentClass}">${contentHtml}</div>`;
    }

    if (!shouldAutoExpand) {
      // Pas de onclick inline: le comportement reste dans le JS, le DOM genere reste declaratif.
      div.querySelector('.event-content').addEventListener('click', () => toggleExp(`exp-${eventIndex}`));
    }

    eraWrap.appendChild(div);
    idx++;
  });

  if (filter === 'all' && events.length > 0) {
    // Petite extension en bas pour laisser le dernier fond respirer jusqu'au bas de page.
    const tail = document.createElement('div');
    tail.className = 'timeline-tail';
    tl.appendChild(tail);
  }

  allEraTitleAnchors = Array.from(document.querySelectorAll('.era-title-wrap[data-era]'));
  requestScrollBackgroundSync();
}

// Ouvre ou ferme les détails d'un événement dans la vue multi-cartes.
function toggleExp(id) {
  const el = document.getElementById(id);
  el.classList.toggle('open');
}

// Synchronise l'état visuel des boutons avec le filtre actuellement appliqué.
function setActiveEraButton(filter) {
  document.querySelectorAll('.era-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

document.querySelectorAll('.era-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setActiveEraButton(btn.dataset.filter);
    buildTimeline(btn.dataset.filter);
  });
});

document.querySelectorAll('[data-nav-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.navFilter;
    setActiveEraButton(filter);
    buildTimeline(filter);
  });
});

window.addEventListener('scroll', requestScrollBackgroundSync, { passive: true });
window.addEventListener('resize', requestScrollBackgroundSync);

const initialFilter = (() => {
  const era = new URLSearchParams(window.location.search).get('era');
  return eraLabels[era] ? era : 'all';
})();

setActiveEraButton(initialFilter);
buildTimeline(initialFilter);
