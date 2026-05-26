/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

// Cibles partagées par plusieurs œuvres. Le tableau works stocke seulement linkType pour Éviter les doublons.
// Liens externes partages: le tableau works reference seulement une cle courte.
const LINK_TARGETS = {
  launcher: 'https://www.ankama.com/fr/launcher',
  webtoon: 'https://www.allskreen.com/webtoon'
};

// Source unique de la chronologie des œuvres: le DOM est régénéré depuis ce tableau à chaque filtre.
// Données source des œuvres; buildTimeline() régénère le DOM après chaque filtre.
const works = [
  {
    era: 'primitif',
    date: 'Origines',
    title: 'Islands of Wakfu',
    type: 'Game',
    href: '../histoire/island-of-wakfu',
    image: '../../assets/oeuvres/island-of-wakfu.webp',
    linkLabel: 'Fiche',
    preview: 'Jeu situe aux origines du Krosmoz.',
    details: ['Fiche accessible depuis la chronologie des œuvres.'],
    major: true
  },
  {
    era: 'primitif',
    date: 'Origines',
    title: 'Goultard le Barbare',
    type: 'Série / film',
    href: '../histoire/goultard-le-barbare',
    image: '../../assets/personnages/GOULTARD.webp',
    linkLabel: 'Fiche',
    preview: 'Récit animé placé dans les premiers grands mythes du Krosmoz.',
    details: ['Lien associé à l’icône écran avec symbole play.'],
    major: true
  },

  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Hyrkul le Tendancieux',
    type: 'Webtoon',
    href: '../histoire/hyrkul-le-tendancieux',
    image: '../../assets/personnages/HYRKUL.webp',
    linkLabel: 'Fiche',
    preview: 'Récit webtoon autour de la légende d’Hyrkul.',
    details: ['Fiche dédiée à Hyrkul le Tendancieux.']
  },
  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Cire Momore',
    type: 'Webtoon',
    href: '../histoire/cire-momore',
    image: '../../assets/personnages/CIRE MOMORE.webp',
    linkLabel: 'Fiche',
    preview: 'Récit webtoon consacré à la malédiction de Cire Momore.',
    details: ['Fiche dédiée à Cire Momore.']
  },
  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Dofus Monster - Le Dragon Cochon',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur le Dragon Cochon.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Dofus Monster - Sphincter Cell',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Sphincter Cell.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Kérubim',
    type: 'Webtoon',
    href: '../histoire/kerubim',
    image: '../../assets/oeuvres/kerubim.webp',
    linkLabel: 'Fiche',
    preview: 'Récit webtoon dédié à Kérubim Crépin.',
    details: ['Fiche dédiée à Kérubim.']
  },
  {
    era: 'dofus',
    date: 'Premiers récits Dofus',
    title: 'Dofus Monster - Le Chevalier Noir',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster autour du Chevalier Noir.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Nomekop',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Nomekop.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Ogrest - Épisodes 1 à 8',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Premiers episodes webtoon autour d Ogrest.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Arena',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Œuvre dérivée de lu{2019}univers DOFUS Arena.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Zatoishwan',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Zatoishwan.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Brumen Tinctorias',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Brumen Tinctorias.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Pets',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Œuvre liée aux familiers de lu{2019}univers DOFUS.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Firefoux',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Firefoux.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus - Manga',
    type: 'Manga',
    linkType: 'webtoon',
    preview: 'Manga DOFUS ajouté dans la chronologie des œuvres.',
    details: ['Lien associé aux supports de lecture.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Adaptation ou récit DOFUS signalé par l’icône webtoon.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus aux trésors de Kérubim',
    type: 'Série / film',
    href: '../histoire/dofus-aux-tresors-kerubim',
    image: '../../assets/oeuvres/dofus-aux-tresors-kerubim.webp',
    linkLabel: 'Fiche',
    preview: 'Série animée autour des souvenirs, trésors et aventures de Kérubim.',
    details: ['Fiche dédiée à Aux trésors de Kérubim.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus le film',
    type: 'Série / film',
    href: '../histoire/dofus-le-film',
    image: '../../assets/oeuvres/dofus-le-film.webp',
    linkLabel: 'Fiche',
    preview: 'Film DOFUS autour de Joris, Julith et la cité de Bonta.',
    details: ['Fiche dédiée à Dofus le film.']
  },
  {
    era: 'dofus',
    date: 'Soon',
    title: 'Welsh & Shedar',
    type: 'Soon',
    href: '../histoire/welsh-shedar',
    image: '../../assets/oeuvres/welsh-shedar.webp',
    linkLabel: 'Fiche',
    preview: 'Œuvre à venir autour de Welsh, Shedar et Zabelle Sheran Sharm.',
    details: ['Fiche dédiée à Welsh & Shedar.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus',
    type: 'Game',
    linkType: 'launcher',
    preview: "Le MMORPG DOFUS, point d'entrée majeur de l'Âge des Dofus.",
    details: ['Lien associé à l’icône game.'],
    major: true
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'La BD officielle du film DOFUS - Julith & Jahash 1/2',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit lié au film DOFUS : Livre 1 - Julith.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Les Dessous de Dofus',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Œuvre dérivée explorant les coulisses et récits de DOFUS.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Moon',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Moon.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Pandala',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon autour de Pandala.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Wa Wabbit',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur le Wa Wabbit.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Âge des Dofus',
    title: 'Dofus Monster - Koulosse',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Episode Dofus Monster centre sur Koulosse.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'Ogrest - Épisodes 9 à 24',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Suite des episodes webtoon autour d Ogrest.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'One More Gate: A Wakfu Legend',
    type: 'Game',
    linkType: 'launcher',
    preview: 'Jeu situé dans les légendes du Krosmoz.',
    details: ['Lien associé à l’icône game.'],
    major: true
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: "Wakfu - Noximilien l'Horloger",
    type: 'Série / film',
    href: '../histoire/noximilien-horloger',
    image: '../../assets/oeuvres/noximilien-horloger.webp',
    linkLabel: 'Fiche',
    preview: "OAV consacré à la chute de Noximilien Colxen et à la naissance de Nox.",
    details: ["Fiche dédiée à Noximilien l'horloger."]
  },
  {
    era: 'dofus',
    date: 'Transition vers le Wakfu',
    title: 'Ogrest - Épisodes 25 à 35',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Derniere partie DOFUS des episodes webtoon autour d Ogrest.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },

  {
    era: 'wakfu',
    date: 'Debut de l ère Wakfu',
    title: 'Ogrest - Épisodes 36 à 43',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Épisodes webtoon places apres le Chaos d Ogrest.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ère Wakfu',
    title: 'Ogrest - Épisodes 44 à 52',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Suite des episodes webtoon places apres le Chaos d Ogrest.',
    details: ['Même lien que Ogrest - Épisodes 36 à 43.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ère Wakfu',
    title: 'Le Corbeau Noir',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon autour du Corbeau Noir.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Debut de l ère Wakfu',
    title: 'Justice',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon autour de Justice.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu',
    type: 'Game',
    linkType: 'launcher',
    preview: 'Le MMORPG WAKFU œuvre la chronologie interactive de l ère Wakfu.',
    details: ['Lien associé à l’icône game.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Remington',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon dédié à Remington.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Maskemane',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon dédié à Maskemane.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Ogrest la Legende',
    type: 'Série / film',
    href: '../histoire/ogrest-la-legende',
    image: '../../assets/oeuvres/ogrest-la-legende.webp',
    linkLabel: 'Fiche',
    preview: 'Spécial animé consacré aux origines tragiques d’Ogrest.',
    details: ['Fiche dédiée à Ogrest la Légende.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu - Saison 1',
    type: 'Série / film',
    href: '../histoire/wakfu-saison-1',
    image: '../../assets/oeuvres/wakfu-saison-1.webp',
    linkLabel: 'Fiche',
    preview: 'Première saison de la série animée WAKFU.',
    details: ['Fiche dédiée à la première saison de Wakfu.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu les Gardiens',
    type: 'Game',
    preview: 'Jeu WAKFU place apres la saison 1.',
    details: ['Game. Aucun lien spécifique demande.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Tangomango',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon signalé dans la frise officielle.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Mini Wakfu',
    type: 'Série / film',
    linkType: 'launcher',
    preview: 'Format animé court rattaché à WAKFU.',
    details: ['Lien associé à l’icône écran avec symbole play.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu - Saison 2',
    type: 'Série / film',
    href: '../histoire/wakfu-saison-2',
    image: '../../assets/oeuvres/wakfu-saison-2.webp',
    linkLabel: 'Fiche',
    preview: 'Deuxième saison de la série animée WAKFU.',
    details: ['Fiche dédiée à la deuxième saison de Wakfu.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu les Gardiens 2',
    type: 'Game',
    preview: 'Jeu WAKFU place apres la saison 2.',
    details: ['Game. Aucun lien spécifique demande.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu - Manga',
    type: 'Manga',
    linkType: 'webtoon',
    preview: 'Manga WAKFU ajouté dans la chronologie des œuvres.',
    details: ['Lien associé aux supports de lecture.']
  },
  {
    era: 'wakfu',
    date: 'Ère du Wakfu',
    title: 'Wakfu',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit WAKFU signalé par l’icône webtoon.',
    details: ['Lien associé à l’icône smartphone avec point blanc.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre I : Le Trone de Glace',
    type: 'Webtoon',
    href: '../histoire/wakfu-oav-livre-1',
    image: '../../assets/oeuvres/wakfu-oav-livre-1.webp',
    linkLabel: 'Fiche',
    preview: 'Premier livre OAV WAKFU autour du Trône de Glace et des Dofus Éliatropes.',
    details: ['Fiche dédiée à Wakfu OAV Livre 1.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre II : Ush',
    type: 'Webtoon',
    href: '../histoire/wakfu-oav-livre-2',
    image: '../../assets/oeuvres/wakfu-oav-livre-2.webp',
    linkLabel: 'Fiche',
    preview: 'Deuxième livre OAV WAKFU consacré à Ush et à la Dimension Ecaflip.',
    details: ['Fiche dédiée à Wakfu OAV Livre 2.']
  },
  {
    era: 'wakfu',
    date: 'OAV',
    title: 'Wakfu OAV - Livre III : Mont Dragons',
    type: 'Webtoon',
    href: '../histoire/wakfu-oav-livre-3',
    image: '../../assets/oeuvres/wakfu-oav-livre-3.webp',
    linkLabel: 'Fiche',
    preview: 'Troisième livre OAV WAKFU consacré au dénouement face à Ogrest.',
    details: ['Fiche dédiée à Wakfu OAV Livre 3.']
  },
  {
    era: 'wakfu',
    date: 'Fin de l ère Wakfu',
    title: 'Wakfu - Saison 3',
    type: 'Série / film',
    href: '../histoire/wakfu-saison-3',
    image: '../../assets/oeuvres/wakfu-saison-3.webp',
    linkLabel: 'Fiche',
    preview: 'Troisième saison de la série animée WAKFU.',
    details: ['Fiche dédiée à la troisième saison de Wakfu.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ère Wakfu',
    title: "WAKFU OAV Oropo : Bataille pour l'Éliacube",
    type: 'Série / film',
    href: '../histoire/wakfu-oav-oropo',
    image: '../../assets/oeuvres/wakfu-oav-oropo.webp',
    linkLabel: 'Fiche',
    preview: "OAV consacré à Oropo, à la Fratrie et à la bataille pour l'Éliacube.",
    details: ['Fiche dédiée à Wakfu OAV Oropo.']
  },
  {
    era: 'wakfu',
    date: 'Fin de l ère Wakfu',
    title: 'Wakfu - Saison 4',
    type: 'Série / film',
    href: '../histoire/wakfu-saison-4',
    image: '../../assets/oeuvres/wakfu-saison-4.webp',
    linkLabel: 'Fiche',
    preview: 'Suite animée de WAKFU ajoutée en fin d’ère Wakfu.',
    details: ['Fiche dédiée à la quatrième saison de Wakfu.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ère Wakfu',
    title: 'Wakfu - Saison 5',
    type: 'Série / film',
    href: '../histoire/wakfu-saison-5',
    image: '../../assets/oeuvres/wakfu-saison-5.webp',
    linkLabel: 'Fiche',
    preview: 'Cinquieme saison annoncee de WAKFU.',
    details: ['Fiche dédiée à la cinquième saison de Wakfu.'],
    major: true
  },
  {
    era: 'wakfu',
    date: 'Fin de l ère Wakfu',
    title: 'Wakfu - La Grande Vague',
    type: 'Webtoon',
    linkType: 'webtoon',
    preview: 'Récit webtoon placé après les grands événements de WAKFU.',
    details: ['Lien demande vers Allskreen.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Debut de l ère Waven',
    title: 'Waven',
    type: 'MMO',
    href: '../histoire/waven-jeu',
    image: '../../assets/oeuvres/waven-jeu.webp',
    linkLabel: 'Fiche',
    preview: 'Le RPG tactique WAVEN œuvre une nouvelle ère maritime du Monde des Douze.',
    details: ['Fiche dédiée au jeu Waven.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Ère du Waven',
    title: 'Savara',
    type: 'Game',
    href: '../histoire/savara',
    image: '../../assets/oeuvres/savara-showcase.webp',
    linkLabel: 'Fiche',
    preview: "Jeu rogue-lite d'arènes orchestré par le Dieu Iop dans les profondeurs d'Iopabagar.",
    details: ['Fiche dédiée à Savara.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Ère du Waven',
    title: 'Lancedur',
    type: 'Série / film',
    href: '../histoire/lancedur',
    image: '../../assets/oeuvres/lancedur.webp',
    linkLabel: 'Fiche',
    preview: "L'ultime aventure de Lance Dur, vieux héros marqué par Ereboria.",
    details: ['Fiche dédiée à Lancedur.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Ère du Waven',
    title: 'Bestiale',
    type: 'Série / film',
    href: '../histoire/bestiale',
    image: '../../assets/oeuvres/bestiale.webp',
    linkLabel: 'Fiche',
    preview: "Yrehn protège l'Élante, joyau d'une île oubliée, face à la convoitise de Karn.",
    details: ['Fiche dédiée à Bestiale.'],
    major: true
  },
  {
    era: 'waven',
    date: 'Soon',
    title: 'Waven - Série animée',
    type: 'Série / film',
    href: '../histoire/histoire-ere-piraterie',
    image: '../../assets/histoire/illustrations/ere-piraterie.webp',
    linkLabel: 'Fiche',
    preview: "Série animée Waven rattachée à l'ère de la piraterie.",
    details: ["Fiche dédiée à l'ère de la piraterie dans l'Ère du Waven."],
    major: true
  }
];

window.KROSMOZ_WORKS = works;

// Libellés et classes CSS utilisés pour les titres de sections et les couleurs d'ère.
// Libellés d'ère affichés dans les sections générées.
const eraLabels = {
  primitif: { label: 'Ère Primitive', cls: 'primitif' },
  dofus: { label: 'Âge des Dofus', cls: 'dofus' },
  wakfu: { label: 'Ère du Wakfu', cls: 'wakfu' },
  waven: { label: 'Ère du Waven', cls: 'waven' }
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

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Transforme linkType en URL finale pour Éviter de recopier les mêmes liens.
function getWorkUrl(work) {
  if (work.href) {
    return work.href;
  }

  if (!work.linkType) {
    return '';
  }

  return LINK_TARGETS[work.linkType] || '';
}

function getLinkLabel(work) {
  if (work.linkLabel) {
    return work.linkLabel;
  }

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
  // Les badges restent visuels; le lien cliquable est porte par la carte entière dans buildTimeline().
  const url = getWorkUrl(work);
  const linkLabel = getLinkLabel(work);
  const linkClass = work.linkType ? escapeHtml(work.linkType) : 'internal';
  const link = url ? `<span class="work-pill link-target ${linkClass}">${escapeHtml(linkLabel)}</span>` : '<span class="work-pill no-link">Sans lien</span>';

  return `
    <div class="work-meta">
      <span class="work-pill">${escapeHtml(work.type)}</span>
      ${link}
    </div>
  `;
}

function setActiveBackground(filter) {
  // Une seule image de fond est active à la fois pour garder une transition lisible.
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
  // En mode "all", on choisit le fond selon le dernier titre d'ère passe sous la ligne d'activation.
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

// Reconstruit la frise des œuvres selon le filtre choisi.
function buildTimeline(filter) {
  // Reconstruction complète: plus simple et plus fiable que de cacher/réordonner les anciennes cartes.
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
      titleWrap.innerHTML = `<span class="era-title ${escapeHtml(eraLabels[work.era].cls)}">${escapeHtml(eraLabels[work.era].label)}</span>`;
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
    const isInternalCard = Boolean(work.href);
    const contentTag = url ? 'a' : 'div';
    const contentAttrs = url ? ` href="${url}"${isInternalCard ? ` aria-label="Ouvrir la fiche : ${escapeHtml(work.title)}"` : ' target="_blank" rel="noopener noreferrer"'}` : '';
    const mediaHtml = isInternalCard && work.image ? `
      <div class="event-history-media" aria-hidden="true">
        <img src="${escapeHtml(work.image)}" alt="" loading="lazy" decoding="async">
      </div>` : '';
    const metaHtml = isInternalCard ? '' : renderMeta(work);
    const previewHtml = isInternalCard ? `<div class="event-preview">${escapeHtml(work.preview)}</div>` : '';
    const detailsHtml = isInternalCard && Array.isArray(work.details) ? `
      <div class="event-expanded">
        <ul>${work.details.map(detail => `<li>${escapeHtml(detail)}</li>`).join('')}</ul>
      </div>` : '';
    const contentHtml = `
      ${mediaHtml}
      <div class="event-date">${escapeHtml(work.date)}</div>
      <div class="event-title">${escapeHtml(work.title)}</div>
      ${metaHtml}
      ${previewHtml}
      ${detailsHtml}
    `;

    const contentClass = `event-content${isInternalCard ? ' has-history-link' : url ? ' direct-link' : ' static-open'}`;
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

const worksTimeline = document.getElementById('works-timeline');

if (worksTimeline) {
  document.querySelectorAll('.era-btn').forEach(button => {
    button.addEventListener('click', () => {
      setActiveEraButton(button.dataset.filter);
      buildTimeline(button.dataset.filter);
    });
  });

  window.addEventListener('scroll', requestScrollBackgroundSync, { passive: true });
  window.addEventListener('resize', requestScrollBackgroundSync);

  buildTimeline('all');
}
