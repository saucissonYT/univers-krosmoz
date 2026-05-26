

const axes = ['cœur', 'action', 'sagesse', 'ambition', 'ombre', 'mystere', 'liberte', 'devoir', 'chaos', 'lien'];

const characters = [
  {
    id: 'yugo',
    name: 'Yugo',
    archetype: 'Le cœur qui relie les mondes',
    href: '../personnages/yugo',
    image: '../../assets/personnages/cartes/yugo.webp',
    traits: ['Éliatrope', 'Espoir', 'Responsabilité'],
    vector: { cœur: 5, action: 3, sagesse: 3, ambition: 1, ombre: 0, mystere: 3, liberte: 3, devoir: 4, chaos: 1, lien: 5 },
    text: "Vous avancez avec le cœur avant la couronne. Comme Yugo, vous cherchez à protéger les autres sans perdre votre part d'innocence, même lorsque vos choix pèsent sur plus grand que vous."
  },
  {
    id: 'adamai',
    name: 'Adamaï',
    archetype: 'Le double lucide',
    href: '../personnages/adamai',
    image: '../../assets/personnages/cartes/adamai.webp',
    traits: ['Dragon Éliatrope', 'Mesure', 'Fracture'],
    vector: { cœur: 3, action: 2, sagesse: 4, ambition: 2, ombre: 2, mystere: 4, liberte: 2, devoir: 4, chaos: 2, lien: 4 },
    text: "Vous êtes fait de loyauté et de recul. Comme Adamaï, vous pouvez aimer profondément sans suivre aveuglément, quitte à devenir la voix difficile que personne ne veut entendre."
  },
  {
    id: 'amalia',
    name: 'Amalia Sheran Sharm',
    archetype: 'La souveraine sensible',
    href: '../personnages/amalia-sheran-sharm',
    image: '../../assets/personnages/cartes/amalia-sheran-sharm.webp',
    traits: ['Sadida', 'Nature', 'Royauté'],
    vector: { cœur: 5, action: 2, sagesse: 3, ambition: 2, ombre: 0, mystere: 1, liberte: 2, devoir: 5, chaos: 0, lien: 5 },
    text: "Vous avez besoin d'aimer ce que vous protégez. Comme Amalia, votre force vient d'une sensibilité assumée, mais aussi d'un sens du devoir qui finit toujours par vous rattraper."
  },
  {
    id: 'tristepin',
    name: 'Tristepin de Percedal',
    archetype: "L'élan du héros",
    href: '../personnages/tristepin',
    image: '../../assets/personnages/cartes/tristepin.webp',
    traits: ['Iop', 'Courage', 'Famille'],
    vector: { cœur: 4, action: 5, sagesse: 1, ambition: 1, ombre: 1, mystere: 0, liberte: 4, devoir: 3, chaos: 2, lien: 4 },
    text: "Vous répondez au danger par le mouvement. Comme Tristepin, vous pouvez être impulsif, mais votre courage devient précieux lorsqu'il s'agit de défendre ceux que vous aimez."
  },
  {
    id: 'evangelyne',
    name: 'Évangelyne',
    archetype: 'La précision protectrice',
    href: '../personnages/evangelyne',
    image: '../../assets/personnages/cartes/evangelyne.webp',
    traits: ['Cra', 'Lucidité', 'Protection'],
    vector: { cœur: 4, action: 3, sagesse: 4, ambition: 1, ombre: 0, mystere: 1, liberte: 2, devoir: 4, chaos: 0, lien: 4 },
    text: "Vous ne confondez pas force et agitation. Comme Évangelyne, vous préférez viser juste, protéger sans bruit et garder la tête froide quand tout le monde s'emballe."
  },
  {
    id: 'ruel',
    name: 'Ruel Stroud',
    archetype: 'Le survivant au cœur tendre',
    href: '../personnages/ruel-stroud',
    image: '../../assets/personnages/cartes/ruel-stroud.webp',
    traits: ['Enutrof', 'Instinct', 'Attachement'],
    vector: { cœur: 3, action: 2, sagesse: 3, ambition: 3, ombre: 1, mystere: 0, liberte: 4, devoir: 2, chaos: 1, lien: 3 },
    text: "Vous avez le sens du réel, parfois rude, souvent drôle malgré vous. Comme Ruel, vous savez survivre, négocier, râler, puis rester quand cela compte vraiment."
  },
  {
    id: 'nox',
    name: 'Nox',
    archetype: "L'obsession du temps perdu",
    href: '../personnages/nox',
    image: '../../assets/personnages/cartes/nox.webp',
    traits: ['Xélor', 'Temps', 'Obsession'],
    vector: { cœur: 2, action: 2, sagesse: 4, ambition: 5, ombre: 4, mystere: 4, liberte: 1, devoir: 2, chaos: 4, lien: 2 },
    text: "Vous pourriez traverser le monde pour réparer une perte. Comme Nox, votre intelligence est immense, mais elle devient dangereuse lorsqu'une blessure décide à votre place."
  },
  {
    id: 'qilby',
    name: 'Qilby',
    archetype: 'La mémoire qui refuse les murs',
    href: '../personnages/qilby',
    image: '../../assets/personnages/cartes/qilby.webp',
    traits: ['Éliatrope', 'Savoir', 'Errance'],
    vector: { cœur: 1, action: 2, sagesse: 5, ambition: 4, ombre: 3, mystere: 5, liberte: 5, devoir: 1, chaos: 3, lien: 1 },
    text: "Vous êtes attiré par ce qui dépasse les frontières. Comme Qilby, vous avez soif de comprendre, de partir, de voir encore, même si cette liberté peut devenir une solitude."
  },
  {
    id: 'oropo',
    name: 'Oropo',
    archetype: 'Le messie fissuré',
    href: '../personnages/oropo',
    image: '../../assets/personnages/cartes/oropo.webp',
    traits: ['Éliotrope', 'Idéal', 'Manipulation'],
    vector: { cœur: 2, action: 3, sagesse: 3, ambition: 5, ombre: 4, mystere: 4, liberte: 2, devoir: 4, chaos: 4, lien: 2 },
    text: "Vous voulez changer l'ordre des choses, même si cela vous consume. Comme Oropo, vous portez une idée trop grande pour rester sage, entre idéal sincère et vertige du contrôle."
  },
  {
    id: 'goultard',
    name: 'Goultard',
    archetype: 'La force devenue sagesse',
    href: '../personnages/goultard',
    image: '../../assets/personnages/cartes/goultard.webp',
    traits: ['Iop', 'Puissance', 'Maîtrise'],
    vector: { cœur: 3, action: 5, sagesse: 4, ambition: 1, ombre: 2, mystere: 2, liberte: 3, devoir: 4, chaos: 3, lien: 2 },
    text: "Vous connaissez la violence, mais vous ne lui appartenez pas. Comme Goultard, votre puissance devient intéressante lorsqu'elle apprend à se retenir."
  },
  {
    id: 'rubilax',
    name: 'Rubilax',
    archetype: 'La tentation attachante',
    href: '../personnages/rubilax',
    image: '../../assets/personnages/cartes/rubilax.webp',
    traits: ['Shushu', 'Provocation', 'Lien'],
    vector: { cœur: 2, action: 4, sagesse: 1, ambition: 3, ombre: 5, mystere: 2, liberte: 4, devoir: 1, chaos: 5, lien: 3 },
    text: "Vous aimez provoquer, tester, piquer là où ça réagit. Comme Rubilax, vous portez une part de chaos, mais elle peut s'attacher plus fort qu'elle ne l'admet."
  },
  {
    id: 'kerubim',
    name: 'Kérubim Crépin',
    archetype: 'Le conteur aux mille vies',
    href: '../personnages/kerubim-crepin',
    image: '../../assets/personnages/cartes/kerubim-crepin.webp',
    traits: ['Écaflip', 'Panache', 'Mémoire'],
    vector: { cœur: 4, action: 3, sagesse: 4, ambition: 2, ombre: 1, mystere: 3, liberte: 5, devoir: 2, chaos: 2, lien: 4 },
    text: "Vous transformez l'expérience en récit. Comme Kérubim, vous avez le goût du risque, du souvenir et des détours qui donnent à la vie son relief."
  },
  {
    id: 'ush',
    name: 'Ush Galesh',
    archetype: "Le joueur qui s'ennuie",
    href: '../personnages/ush-galesh',
    image: '../../assets/personnages/cartes/ush-galesh.webp',
    traits: ['Écaflip', 'Jeu', 'Cruauté élégante'],
    vector: { cœur: 1, action: 2, sagesse: 3, ambition: 4, ombre: 5, mystere: 3, liberte: 4, devoir: 0, chaos: 4, lien: 1 },
    text: "Vous aimez les règles surtout quand vous pouvez les tordre. Comme Ush, vous cherchez l'intensité, le défi, la partie rare qui rend l'ennui supportable."
  },
  {
    id: 'joris',
    name: 'Joris Jurgen',
    archetype: 'Le secret sous le chapeau',
    href: '../personnages/joris-jurgen',
    image: '../../assets/personnages/cartes/joris-jurgen.webp',
    traits: ['Mystère', 'Calme', 'Devoir'],
    vector: { cœur: 3, action: 3, sagesse: 5, ambition: 1, ombre: 1, mystere: 5, liberte: 2, devoir: 5, chaos: 0, lien: 3 },
    text: "Vous n'avez pas besoin de tout dire pour exister. Comme Joris, votre force vient du silence, de la fidélité et d'une maîtrise qui laisse peu de prise aux autres."
  },
  {
    id: 'bakara',
    name: 'Bakara Jurgen',
    archetype: "L'intelligence lumineuse",
    href: '../personnages/bakara-jurgen',
    image: '../../assets/personnages/cartes/bakara-jurgen.webp',
    traits: ['Huppermage', 'Génie', 'Audace'],
    vector: { cœur: 4, action: 3, sagesse: 5, ambition: 2, ombre: 0, mystere: 3, liberte: 3, devoir: 3, chaos: 1, lien: 4 },
    text: "Vous cherchez la solution brillante, celle qui sauve sans renoncer à l'élégance. Comme Bakara, votre esprit est une arme, mais aussi une chaleur."
  },
  {
    id: 'ogrest',
    name: 'Ogrest',
    archetype: 'Le chagrin démesuré',
    href: '../personnages/ogrest',
    image: '../../assets/personnages/cartes/ogrest.webp',
    traits: ['Ogre', 'Dofus', 'Débordement'],
    vector: { cœur: 5, action: 4, sagesse: 0, ambition: 3, ombre: 3, mystere: 2, liberte: 2, devoir: 0, chaos: 5, lien: 5 },
    text: "Vous ressentez trop fort pour rester intact. Comme Ogrest, votre amour peut déplacer des montagnes, mais votre douleur peut devenir une marée."
  },
  {
    id: 'dathura',
    name: 'Dathura',
    archetype: 'La muse impossible',
    href: '../personnages/dathura',
    image: '../../assets/personnages/cartes/dathura.webp',
    traits: ['Sadida', 'Désir', 'Distance'],
    vector: { cœur: 2, action: 1, sagesse: 3, ambition: 4, ombre: 3, mystere: 4, liberte: 4, devoir: 1, chaos: 3, lien: 2 },
    text: "Vous attirez les projections, mais vous refusez d'être possédé. Comme Dathura, vous incarnez une beauté qui dérange parce qu'elle ne se laisse pas réduire."
  },
  {
    id: 'rushu',
    name: 'Rushu',
    archetype: 'La domination brute',
    href: '../personnages/rushu',
    image: '../../assets/personnages/cartes/rushu.webp',
    traits: ['Démon', 'Pouvoir', 'Destruction'],
    vector: { cœur: 0, action: 5, sagesse: 2, ambition: 5, ombre: 5, mystere: 2, liberte: 3, devoir: 0, chaos: 5, lien: 0 },
    text: "Vous détestez subir. Comme Rushu, votre énergie cherche l'ascendant, la prise, la victoire nette. Reste à savoir si vous commandez votre ombre ou si elle commande pour vous."
  },
  {
    id: 'comte-harebourg',
    name: 'Comte Harebourg',
    archetype: 'Le calcul glacé',
    href: '../personnages/comte-harebourg',
    image: '../../assets/personnages/cartes/comte-harebourg.webp',
    traits: ['Xélor', 'Frigost', 'Contrôle'],
    vector: { cœur: 1, action: 2, sagesse: 5, ambition: 5, ombre: 4, mystere: 4, liberte: 1, devoir: 3, chaos: 2, lien: 1 },
    text: "Vous aimez comprendre avant d'agir, contrôler avant de risquer. Comme Harebourg, votre précision peut bâtir des merveilles ou enfermer un monde dans votre hiver."
  },
  {
    id: 'toxine',
    name: 'Toxine',
    archetype: 'La lame sans remords',
    href: '../personnages/toxine',
    image: '../../assets/personnages/cartes/toxine.webp',
    traits: ['Sram', 'Poison', 'Froideur'],
    vector: { cœur: 0, action: 4, sagesse: 3, ambition: 4, ombre: 5, mystere: 4, liberte: 4, devoir: 0, chaos: 4, lien: 0 },
    text: "Vous savez où viser. Comme Toxine, vous êtes difficile à lire, précis, dangereux quand on vous sous-estime, et peu sensible aux morales toutes faites."
  },
  {
    id: 'lilotte',
    name: 'Lilotte',
    archetype: 'La petite survivante',
    href: '../personnages/lilotte',
    image: '../../assets/personnages/cartes/lilotte.webp',
    traits: ['Ouginak', 'Vif', 'Instinct'],
    vector: { cœur: 4, action: 4, sagesse: 2, ambition: 1, ombre: 1, mystere: 1, liberte: 5, devoir: 2, chaos: 2, lien: 4 },
    text: "Vous avancez à l'instinct, avec une énergie vive et une loyauté qui ne demande pas de grands discours. Comme Lilotte, vous survivez en restant mobile."
  },
  {
    id: 'lokus',
    name: 'Lokus',
    archetype: 'La machine ancienne',
    href: '../personnages/lokus',
    image: '../../assets/personnages/cartes/lokus.webp',
    traits: ['Méchasme', 'Stasis', 'Étrangeté'],
    vector: { cœur: 0, action: 3, sagesse: 5, ambition: 2, ombre: 3, mystere: 5, liberte: 1, devoir: 4, chaos: 2, lien: 0 },
    text: "Vous semblez venir d'un autre rythme. Comme Lokus, vous incarnez la distance, la logique ancienne, une présence difficile à comprendre depuis les émotions ordinaires."
  },
  {
    id: 'grougaloragran',
    name: 'Grougaloragran',
    archetype: 'Le gardien ancestral',
    href: '../personnages/grougaloragran',
    image: '../../assets/personnages/cartes/grougaloragran.webp',
    traits: ['Dragon Éliatrope', 'Gardien', 'Mémoire'],
    vector: { cœur: 4, action: 3, sagesse: 5, ambition: 0, ombre: 1, mystere: 4, liberte: 1, devoir: 5, chaos: 1, lien: 4 },
    text: "Vous protégez sur le temps long. Comme Grougaloragran, vous portez la mémoire, la patience et cette forme d'amour qui accepte de rester dans l'ombre."
  },
  {
    id: 'remington',
    name: 'Remington Smisse',
    archetype: 'Le panache du voleur',
    href: '../personnages/remington-smisse',
    image: '../../assets/personnages/cartes/remington-smisse.webp',
    traits: ['Roublard', 'Style', 'Liberté'],
    vector: { cœur: 2, action: 4, sagesse: 2, ambition: 4, ombre: 3, mystere: 2, liberte: 5, devoir: 0, chaos: 4, lien: 2 },
    text: "Vous préférez une sortie spectaculaire à une victoire bien rangée. Comme Remington, vous avez le goût du risque, du style et des chemins qui sentent la poudre."
  }
];

const questions = [
  {
    kicker: 'Instinct premier',
    title: 'Quand une situation tourne mal, que faites-vous en premier ',
    answers: [
      { label: 'Protéger', text: 'Je vérifie tout de suite que mes proches vont bien.', weights: { cœur: 3, lien: 3, devoir: 1 } },
      { label: 'Agir', text: 'Je fonce et je règle le problème avant qu’il empire.', weights: { action: 4, liberte: 2, chaos: 1 } },
      { label: 'Observer', text: 'Je prends quelques secondes pour comprendre ce qui se passe.', weights: { sagesse: 3, mystere: 2, devoir: 1 } },
      { label: 'Contrôler', text: 'Je cherche le meilleur moyen de reprendre l’avantage.', weights: { ambition: 3, ombre: 3, chaos: 2 } }
    ]
  },
  {
    kicker: 'Rapport au pouvoir',
    title: 'On vous confie un objet très puissant. Quelle est votre priorité ',
    answers: [
      { label: 'Aider', text: 'Je l’utilise pour sauver ou réparer ce qui peut l’être.', weights: { cœur: 3, devoir: 3, lien: 2 } },
      { label: 'Étudier', text: 'Je veux d’abord comprendre comment il fonctionne.', weights: { sagesse: 4, mystere: 3 } },
      { label: 'Laisser libre', text: 'Je refuse qu’un tel pouvoir soit enfermé ou confisqué.', weights: { liberte: 4, chaos: 2, mystere: 1 } },
      { label: 'Le garder', text: 'Je préfère l’avoir entre mes mains plutôt que chez un ennemi.', weights: { ambition: 4, ombre: 3, action: 1 } }
    ]
  },
  {
    kicker: 'Blessure intime',
    title: 'Quel défaut pourrait le plus vous faire déraper ',
    answers: [
      { label: 'Culpabilité', text: 'Je peux trop me reprocher ce que je n’ai pas réussi à empêcher.', weights: { cœur: 2, devoir: 3, lien: 2 } },
      { label: 'Obsession', text: 'Je peux rester bloqué sur une idée, une perte ou une vérité.', weights: { ambition: 3, sagesse: 2, ombre: 2 } },
      { label: 'Besoin de risque', text: 'Je peux provoquer les choses quand je m’ennuie.', weights: { liberte: 3, chaos: 3, ombre: 2 } },
      { label: 'Colère', text: 'Je peux réagir trop fort quand quelque chose me touche.', weights: { action: 3, chaos: 4, cœur: 1 } }
    ]
  },
  {
    kicker: 'Lien aux autres',
    title: 'Dans un groupe, quel rôle prenez-vous le plus souvent ',
    answers: [
      { label: 'Rassembler', text: 'J’essaie de garder le groupe uni.', weights: { lien: 4, cœur: 3 } },
      { label: 'Protéger', text: 'Je veille sur les autres et je prends les coups durs.', weights: { devoir: 4, cœur: 2, sagesse: 1 } },
      { label: 'Explorer', text: 'Je pars devant et je teste les limites.', weights: { action: 3, liberte: 3 } },
      { label: 'Bousculer', text: 'Je dis ce que les autres n’osent pas dire.', weights: { ombre: 3, mystere: 2, chaos: 2 } }
    ]
  },
  {
    kicker: 'Race intérieure',
    title: 'Quelle nature du Krosmoz vous ressemble le plus ',
    answers: [
      { label: 'Éliatrope', text: 'Je me sens lié aux autres, aux voyages et aux secrets anciens.', weights: { lien: 3, mystere: 3, cœur: 2 } },
      { label: 'Dragon', text: 'Je me reconnais dans la patience, la mémoire et la puissance retenue.', weights: { sagesse: 4, devoir: 3, mystere: 2 } },
      { label: 'Shushu', text: 'J’ai une part de chaos, d’ironie et de provocation.', weights: { ombre: 4, chaos: 3, action: 1 } },
      { label: 'Écaflip', text: 'J’aime le hasard, le jeu, le style et les paris risqués.', weights: { liberte: 4, ambition: 2, chaos: 2 } }
    ]
  },
  {
    kicker: 'Face au destin',
    title: 'Si on vous annonce un grand destin, comment réagissez-vous ',
    answers: [
      { label: 'J’accepte', text: 'Si c’est mon rôle, je ferai ce qu’il faut.', weights: { devoir: 4, cœur: 2 } },
      { label: 'Je contourne', text: 'Je cherche une autre façon d’arriver au bout.', weights: { liberte: 4, sagesse: 2 } },
      { label: 'Je refuse', text: 'Je veux choisir ma route moi-même.', weights: { liberte: 3, chaos: 2, ambition: 2 } },
      { label: 'Je l’utilise', text: 'Si les autres y croient, ça peut devenir un avantage.', weights: { ambition: 4, ombre: 3 } }
    ]
  },
  {
    kicker: 'Morale',
    title: 'Dans quel cas pourriez-vous cacher la vérité à vos proches ',
    answers: [
      { label: 'Presque jamais', text: 'Je préfère être honnête, même quand c’est difficile.', weights: { cœur: 3, lien: 3 } },
      { label: 'Pour protéger', text: 'Je peux mentir si ça évite de blesser ou de mettre en danger.', weights: { devoir: 4, sagesse: 2, mystere: 1 } },
      { label: 'Pour gagner', text: 'Je peux cacher la vérité si la situation l’exige.', weights: { ambition: 3, ombre: 3 } },
      { label: 'Pour découvrir', text: 'Je peux garder un secret si ça me permet d’aller plus loin.', weights: { mystere: 4, liberte: 3 } }
    ]
  },
  {
    kicker: 'Combat',
    title: 'Si vous devez vous battre, quelle méthode choisissez-vous ',
    answers: [
      { label: 'Face à face', text: 'J’y vais franchement, sans détour.', weights: { action: 5, chaos: 1 } },
      { label: 'À distance', text: 'Je préfère viser juste et rester maître de la situation.', weights: { sagesse: 3, devoir: 2, action: 2 } },
      { label: 'Par ruse', text: 'Je tends un piège et je laisse l’autre tomber dedans.', weights: { ombre: 4, mystere: 3, ambition: 1 } },
      { label: 'Par surprise', text: 'Je change le terrain pour prendre l’ennemi de court.', weights: { mystere: 3, liberte: 2, lien: 2 } }
    ]
  },
  {
    kicker: 'Amour et attachement',
    title: 'Comment montrez-vous le plus votre affection ',
    answers: [
      { label: 'Je reste présent', text: 'Même quand ça va mal, je ne laisse pas tomber.', weights: { cœur: 4, lien: 4, devoir: 1 } },
      { label: 'Je protège', text: 'Je prends les coups ou les décisions difficiles.', weights: { devoir: 4, cœur: 2 } },
      { label: 'Je taquine', text: 'Je montre mon attachement avec humour et provocation.', weights: { chaos: 2, ombre: 2, lien: 2 } },
      { label: 'Je laisse respirer', text: 'J’aime sans enfermer l’autre.', weights: { liberte: 4, mystere: 2 } }
    ]
  },
  {
    kicker: 'Mémoire',
    title: 'Quelle relation avez-vous avec le passé ',
    answers: [
      { label: 'Je l’honore', text: 'Il faut respecter ce qui nous a construits.', weights: { devoir: 4, sagesse: 2 } },
      { label: 'Il me marque', text: 'Certaines blessures restent difficiles à dépasser.', weights: { cœur: 2, ombre: 2, chaos: 2 } },
      { label: 'Je l’analyse', text: 'Le passé donne des indices pour comprendre la suite.', weights: { sagesse: 4, mystere: 2 } },
      { label: 'Je m’en libère', text: 'Je refuse de rester enfermé dans ce qui est arrivé.', weights: { liberte: 4, ambition: 1 } }
    ]
  },
  {
    kicker: 'Physique symbolique',
    title: 'Quel détail physique fantastique vous irait le mieux ',
    answers: [
      { label: 'Ailes ou écailles', text: 'Quelque chose d’ancien, puissant et impressionnant.', weights: { sagesse: 3, mystere: 3, devoir: 2 } },
      { label: 'Masque ou chapeau', text: 'Un détail qui garde une part de mystère.', weights: { mystere: 4, sagesse: 2 } },
      { label: 'Arme vivante', text: 'Une force dangereuse que je dois apprendre à maîtriser.', weights: { action: 3, ombre: 3, chaos: 3 } },
      { label: 'Regard étrange', text: 'Un regard qui montre que je ne suis pas tout à fait ordinaire.', weights: { cœur: 2, mystere: 3, lien: 1 } }
    ]
  },
  {
    kicker: 'Fin de partie',
    title: 'À la fin d’une grande aventure, qu’avez-vous envie de faire ',
    answers: [
      { label: 'Rentrer', text: 'Je veux retrouver les miens et souffler enfin.', weights: { cœur: 4, lien: 4 } },
      { label: 'Comprendre', text: 'Je veux savoir ce que cette aventure m’a appris.', weights: { sagesse: 4, mystere: 3 } },
      { label: 'Repartir', text: 'Je cherche déjà la prochaine aventure.', weights: { liberte: 5, mystere: 2 } },
      { label: 'Construire', text: 'Je veux transformer la victoire en quelque chose de durable.', weights: { ambition: 4, devoir: 2, ombre: 1 } }
    ]
  }
];

const QUESTION_COUNT_PER_RUN = 20;

characters.push(
  {
    id: 'aerafal',
    name: 'Aerafal',
    archetype: 'La puissance qui choisit son heure',
    href: '../personnages/aerafal',
    image: '../../assets/personnages/cartes/aerafal.webp',
    traits: ['Dragon', 'Patience', 'Sagesse'],
    vector: { cœur: 2, action: 3, sagesse: 5, ambition: 2, ombre: 1, mystere: 5, liberte: 2, devoir: 5, chaos: 1, lien: 3 },
    text: "Vous préférez la force tenue à la force jetée. Comme Aerafal, vous avancez avec une ancienneté calme, une mémoire profonde et une présence qui n'a pas besoin de bruit pour peser."
  },
  {
    id: 'aguabrial',
    name: 'Aguabrial',
    archetype: "L'onde ancienne",
    href: '../personnages/aguabrial',
    image: '../../assets/personnages/cartes/aguabrial.webp',
    traits: ['Dragon', 'Eau', 'Mystère'],
    vector: { cœur: 3, action: 2, sagesse: 5, ambition: 1, ombre: 1, mystere: 5, liberte: 3, devoir: 4, chaos: 1, lien: 3 },
    text: "Vous traversez les conflits comme une eau profonde. Comme Aguabrial, vous cachez votre intensité sous une surface posée, avec une intuition ancienne des courants du monde."
  },
  {
    id: 'alibert',
    name: 'Alibert',
    archetype: 'Le foyer qui tient bon',
    href: '../personnages/alibert',
    image: '../../assets/personnages/cartes/alibert.webp',
    traits: ['Enutrof', 'Tendresse', 'Accueil'],
    vector: { cœur: 5, action: 2, sagesse: 4, ambition: 1, ombre: 0, mystere: 0, liberte: 2, devoir: 4, chaos: 0, lien: 5 },
    text: "Vous êtes de ceux qui rendent le monde habitable. Comme Alibert, votre grandeur se voit dans les gestes simples, la fidélité et cette chaleur qui donne aux autres un endroit où revenir."
  },
  {
    id: 'arpagone',
    name: 'Arpagone',
    archetype: "L'amour devenu manque",
    href: '../personnages/arpagone',
    image: '../../assets/personnages/cartes/arpagone.webp',
    traits: ['Enutrof', 'Blessure', 'Attachement'],
    vector: { cœur: 4, action: 2, sagesse: 3, ambition: 4, ombre: 3, mystere: 2, liberte: 1, devoir: 2, chaos: 3, lien: 4 },
    text: "Vous aimez fort, parfois au point de garder les cicatrices ouvertes. Comme Arpagone, vous pouvez transformer une perte en moteur, quitte à marcher longtemps avec elle."
  },
  {
    id: 'atcham-crepin',
    name: 'Atcham Crépin',
    archetype: 'La griffe élégante',
    href: '../personnages/atcham-crepin',
    image: '../../assets/personnages/cartes/atcham-crepin.webp',
    traits: ['Écaflip', 'Adresse', 'Défi'],
    vector: { cœur: 2, action: 4, sagesse: 3, ambition: 3, ombre: 3, mystere: 2, liberte: 5, devoir: 1, chaos: 3, lien: 2 },
    text: "Vous aimez gagner avec style. Comme Atcham, vous avez le goût du défi, de la précision et des coups qui paraissent légers seulement à ceux qui n'ont pas vu les griffes."
  },
  {
    id: 'balthazar',
    name: 'Balthazar',
    archetype: 'Le vieux gardien du savoir',
    href: '../personnages/balthazar',
    image: '../../assets/personnages/cartes/balthazar.webp',
    traits: ['Dragon Éliatrope', 'Mémoire', 'Transmission'],
    vector: { cœur: 4, action: 1, sagesse: 5, ambition: 0, ombre: 0, mystere: 4, liberte: 1, devoir: 5, chaos: 0, lien: 4 },
    text: "Vous protégez mieux en transmettant qu'en possédant. Comme Balthazar, votre force vient de la patience, du savoir et d'une fidélité qui pense àu futur des autres."
  },
  {
    id: 'chibi',
    name: 'Chibi',
    archetype: "L'esprit d'invention",
    href: '../personnages/chibi',
    image: '../../assets/personnages/cartes/chibi.webp',
    traits: ['Éliatrope', 'Création', 'Curiosité'],
    vector: { cœur: 3, action: 3, sagesse: 5, ambition: 3, ombre: 1, mystere: 4, liberte: 4, devoir: 3, chaos: 1, lien: 3 },
    text: "Vous cherchez la solution qui n'existe pas encore. Comme Chibi, vous reliez l'intelligence, l'audace et la curiosité pour ouvrir des chemins que personne n'avait envisagés."
  },
  {
    id: 'cleophee',
    name: 'Cléophée',
    archetype: 'La flèche indocile',
    href: '../personnages/cleophee',
    image: '../../assets/personnages/cartes/cleophee.webp',
    traits: ['Cra', 'Impulsion', 'Famille'],
    vector: { cœur: 4, action: 5, sagesse: 2, ambition: 2, ombre: 1, mystere: 1, liberte: 5, devoir: 2, chaos: 3, lien: 4 },
    text: "Vous avez besoin d'air, de mouvement et de réponses franches. Comme Cléophée, vous pouvez foncer trop vite, mais rarement sans cœur."
  },
  {
    id: 'dark-vlad',
    name: 'Dark Vlad',
    archetype: "L'ombre du guerrier",
    href: '../personnages/dark-vlad',
    image: '../../assets/personnages/cartes/dark-vlad.webp',
    traits: ['Iop', 'Colère', 'Malédiction'],
    vector: { cœur: 1, action: 5, sagesse: 1, ambition: 4, ombre: 5, mystere: 3, liberte: 2, devoir: 1, chaos: 5, lien: 1 },
    text: "Vous portez une intensité qui peut devenir brûlante. Comme Dark Vlad, votre défi est de ne pas laisser la blessure choisir la forme de votre puissance."
  },
  {
    id: 'echo',
    name: 'Dame Echo',
    archetype: 'La foi qui complote',
    href: '../personnages/echo',
    image: '../../assets/personnages/cartes/echo.webp',
    traits: ['Eniripsa', 'Secret', 'Idéal'],
    vector: { cœur: 3, action: 2, sagesse: 4, ambition: 5, ombre: 4, mystere: 5, liberte: 2, devoir: 4, chaos: 3, lien: 3 },
    text: "Vous savez attendre, soigner, convaincre et dissimuler. Comme Echo, vous pouvez servir une cause avec douceur en surface et une stratégie redoutable en dessous."
  },
  {
    id: 'elely-de-percedal',
    name: 'Élely de Percedal',
    archetype: 'Le courage qui déborde',
    href: '../personnages/elely-de-percedal',
    image: '../../assets/personnages/cartes/elely-de-percedal.webp',
    traits: ['Iop', 'Énergie', 'Famille'],
    vector: { cœur: 4, action: 5, sagesse: 1, ambition: 2, ombre: 1, mystere: 0, liberte: 5, devoir: 3, chaos: 3, lien: 5 },
    text: "Vous transformez l'amour en élan. Comme Élely, vous n'attendez pas que le monde soit prêt pour agir, surtout si quelqu'un que vous aimez est en danger."
  },
  {
    id: 'flopin-de-percedal',
    name: 'Flopin de Percedal',
    archetype: 'La justesse discrète',
    href: '../personnages/flopin-de-percedal',
    image: '../../assets/personnages/cartes/flopin-de-percedal.webp',
    traits: ['Cra', 'Calme', 'Famille'],
    vector: { cœur: 4, action: 3, sagesse: 4, ambition: 1, ombre: 0, mystere: 1, liberte: 2, devoir: 4, chaos: 0, lien: 4 },
    text: "Vous préférez viser juste plutôt que parler fort. Comme Flopin, vous observez, vous comprenez, puis vous agissez au bon moment."
  },
  {
    id: 'grany-smisse',
    name: 'Grany Smisse',
    archetype: 'La loyauté sous la poudre',
    href: '../personnages/grany-smisse',
    image: '../../assets/personnages/cartes/grany-smisse.webp',
    traits: ['Roublard', 'Famille', 'Risques'],
    vector: { cœur: 4, action: 4, sagesse: 2, ambition: 3, ombre: 3, mystere: 1, liberte: 4, devoir: 2, chaos: 4, lien: 4 },
    text: "Vous pouvez vivre dans le désordre sans perdre vos attaches. Comme Grany, votre fidélité n'est pas toujours sage, mais elle est réelle."
  },
  {
    id: 'jiva',
    name: 'Jiva',
    archetype: 'Le devoir lumineux',
    href: '../personnages/jiva',
    image: '../../assets/personnages/cartes/jiva.webp',
    traits: ['Protectrice', 'Ordre', 'Sacrifice'],
    vector: { cœur: 3, action: 3, sagesse: 5, ambition: 2, ombre: 1, mystere: 3, liberte: 1, devoir: 5, chaos: 0, lien: 3 },
    text: "Vous tenez une ligne même quand elle coûte cher. Comme Jiva, vous pouvez paraître froide parce que votre priorité reste ce qui doit être préservé."
  },
  {
    id: 'kriss-la-krass',
    name: 'Kriss la Krass',
    archetype: 'Le panache de l’arène',
    href: '../personnages/kriss-la-krass',
    image: '../../assets/personnages/cartes/kriss-la-krass.webp',
    traits: ['Sacrieur', 'Spectacle', 'Courage'],
    vector: { cœur: 3, action: 5, sagesse: 2, ambition: 4, ombre: 2, mystere: 0, liberte: 5, devoir: 1, chaos: 4, lien: 3 },
    text: "Vous aimez que la vie ait du rythme et du répondant. Comme Kriss, vous avez besoin de sentir l'intensité du moment et de jouer votre chance en pleine lumière."
  },
  {
    id: 'lancedur',
    name: 'Lancedur',
    archetype: 'La droiture armée',
    href: '../personnages/lancedur',
    image: '../../assets/personnages/cartes/lancedur.webp',
    traits: ['Forgelance', 'Honneur', 'Action'],
    vector: { cœur: 3, action: 5, sagesse: 3, ambition: 2, ombre: 1, mystere: 1, liberte: 2, devoir: 5, chaos: 1, lien: 3 },
    text: "Vous avancez avec une idée nette de ce qui se fait et ne se fait pas. Comme Lancedur, votre courage cherche une forme droite, lisible, tenue."
  },
  {
    id: 'moon',
    name: 'Moon',
    archetype: 'Le sauvage sacré',
    href: '../personnages/moon',
    image: '../../assets/personnages/cartes/moon.webp',
    traits: ['Instinct', 'Île', 'Puissance'],
    vector: { cœur: 1, action: 5, sagesse: 2, ambition: 2, ombre: 3, mystere: 4, liberte: 5, devoir: 0, chaos: 5, lien: 1 },
    text: "Vous êtes plus proche de l'instinct que du règlement. Comme Moon, vous incarnez une force libre, difficile à ranger, presque impossible à apprivoiser."
  },
  {
    id: 'nora',
    name: 'Nora',
    archetype: 'La flamme liée',
    href: '../personnages/nora',
    image: '../../assets/personnages/cartes/nora.webp',
    traits: ['Éliatrope', 'Lien', 'Courage'],
    vector: { cœur: 5, action: 4, sagesse: 3, ambition: 1, ombre: 1, mystere: 4, liberte: 3, devoir: 4, chaos: 2, lien: 5 },
    text: "Vous puisez votre courage dans les liens qui vous fondent. Comme Nora, vous êtes capable d'une grande douceur, puis d'une détermination totale quand tout bascule."
  },
  {
    id: 'phaeris',
    name: 'Phaéris',
    archetype: 'Le dragon qui veille',
    href: '../personnages/phaeris',
    image: '../../assets/personnages/cartes/phaeris.webp',
    traits: ['Dragon', 'Vigilance', 'Devoir'],
    vector: { cœur: 3, action: 4, sagesse: 5, ambition: 1, ombre: 1, mystere: 4, liberte: 1, devoir: 5, chaos: 1, lien: 3 },
    text: "Vous savez que protéger demande parfois de tenir seul. Comme Phaéris, vous avez une vigilance grave, patiente, entièrement tournée vers ce qui ne doit pas tomber."
  },
  {
    id: 'pandora',
    name: 'Pandora',
    archetype: 'La chercheuse des portes',
    href: '../personnages/pandora',
    image: '../../assets/personnages/cartes/pandora.webp',
    traits: ['Curiosité', 'Savoir', 'Passage'],
    vector: { cœur: 3, action: 2, sagesse: 5, ambition: 3, ombre: 1, mystere: 5, liberte: 4, devoir: 2, chaos: 1, lien: 3 },
    text: "Vous avez besoin de comprendre ce qui se cache derrière la prochaine porte. Comme Pandora, votre curiosité peut devenir une boussole, même lorsqu'elle vous mène trop loin."
  },
  {
    id: 'shinonome',
    name: 'Shinonome',
    archetype: 'La mémoire jumelle',
    href: '../personnages/shinonome',
    image: '../../assets/personnages/cartes/shinonome.webp',
    traits: ['Dragon Éliatrope', 'Lien', 'Secret'],
    vector: { cœur: 4, action: 2, sagesse: 5, ambition: 2, ombre: 2, mystere: 5, liberte: 3, devoir: 4, chaos: 1, lien: 5 },
    text: "Vous vivez les liens comme des vérités profondes. Comme Shinonome, votre présence parle de mémoire, de fidélité et de choses que l'on comprend rarement au premier regard."
  },
  {
    id: 'toross-mordal',
    name: 'Toross Mordal',
    archetype: 'Le roi de la faim',
    href: '../personnages/toross-mordal',
    image: '../../assets/personnages/cartes/toross-mordal.webp',
    traits: ['Pouvoir', 'Manque', 'Ombre'],
    vector: { cœur: 0, action: 5, sagesse: 3, ambition: 5, ombre: 5, mystere: 4, liberte: 2, devoir: 1, chaos: 5, lien: 0 },
    text: "Vous refusez d'être petit devant le monde. Comme Toross, votre énergie cherche la prise et la souveraineté, avec le risque de confondre besoin et domination."
  },
  {
    id: 'vampyro',
    name: 'Vampyro',
    archetype: 'La théâtralité mordante',
    href: '../personnages/vampyro',
    image: '../../assets/personnages/cartes/vampyro.webp',
    traits: ['Ombre', 'Style', 'Excès'],
    vector: { cœur: 1, action: 3, sagesse: 2, ambition: 4, ombre: 5, mystere: 4, liberte: 3, devoir: 0, chaos: 4, lien: 1 },
    text: "Vous aimez l'effet, le mystère et la scène. Comme Vampyro, vous pouvez transformer une faiblesse en personnage, puis un personnage en arme."
  },
  {
    id: 'wa-wabbit',
    name: 'Wa Wabbit',
    archetype: 'La couronne capricieuse',
    href: '../personnages/wa-wabbit',
    image: '../../assets/personnages/cartes/wa-wabbit.webp',
    traits: ['Roi', 'Caprice', 'Territoire'],
    vector: { cœur: 1, action: 2, sagesse: 1, ambition: 5, ombre: 3, mystere: 1, liberte: 2, devoir: 2, chaos: 4, lien: 1 },
    text: "Vous aimez que les choses reconnaissent votre place. Comme le Wa Wabbit, vous avez une énergie de territoire, de caprice et de pouvoir assumé."
  },
  {
    id: 'djaul',
    name: 'Djaul',
    archetype: 'Le froid qui mord',
    href: '../personnages/djaul',
    image: '../../assets/personnages/cartes/djaul.webp',
    traits: ['Démon', 'Hiver', 'Ruse'],
    vector: { cœur: 0, action: 4, sagesse: 4, ambition: 5, ombre: 5, mystere: 4, liberte: 2, devoir: 1, chaos: 4, lien: 0 },
    text: "Vous avez l'art de frapper là où cela laisse une trace. Comme Djaul, votre intelligence peut devenir glaciale quand vous décidez de ne plus ménager personne."
  },
  {
    id: 'dardondakal',
    name: 'Dardondakal',
    archetype: 'La braise du dragon',
    href: '../personnages/dardondakal',
    image: '../../assets/personnages/cartes/dardondakal.webp',
    traits: ['Dragon', 'Feu', 'Majesté'],
    vector: { cœur: 2, action: 5, sagesse: 4, ambition: 3, ombre: 2, mystere: 4, liberte: 3, devoir: 4, chaos: 3, lien: 2 },
    text: "Vous avez une chaleur de puissance, fière et difficile à ignorer. Comme Dardondakal, vous mêlez instinct, autorité et mémoire ancienne."
  },
  {
    id: 'grand-dragon',
    name: 'Grand Dragon',
    archetype: 'La stasis primordiale',
    href: '../personnages/grand-dragon',
    image: '../../assets/personnages/cartes/grand-dragon.webp',
    traits: ['Primordial', 'Stasis', 'Absolu'],
    vector: { cœur: 0, action: 4, sagesse: 5, ambition: 4, ombre: 5, mystere: 5, liberte: 1, devoir: 3, chaos: 5, lien: 0 },
    text: "Vous êtes attiré par les forces premières, celles qui ne demandent pas la permission d'exister. Comme le Grand Dragon, vous portez une gravité rare, presque cosmique."
  },
  {
    id: 'grande-deesse-eliatrope',
    name: 'Grande Déesse Éliatrope',
    archetype: 'Le souffle qui relie',
    href: '../personnages/grande-deesse-eliatrope',
    image: '../../assets/personnages/cartes/grande-deesse-eliatrope.webp',
    traits: ['Primordiale', 'Wakfu', 'Lien'],
    vector: { cœur: 5, action: 2, sagesse: 5, ambition: 1, ombre: 0, mystere: 5, liberte: 3, devoir: 5, chaos: 0, lien: 5 },
    text: "Vous cherchez à unir, nourrir et ouvrir. Comme la Grande Déesse Éliatrope, votre force se manifeste dans le lien, la création et l'élan vital."
  },
  {
    id: 'efrim',
    name: 'Efrim',
    archetype: 'Le lien fragile',
    href: '../personnages/efrim',
    image: '../../assets/personnages/cartes/efrim.webp',
    traits: ['Éliatrope', 'Sensibilité', 'Attache'],
    vector: { cœur: 5, action: 2, sagesse: 3, ambition: 1, ombre: 1, mystere: 4, liberte: 2, devoir: 3, chaos: 1, lien: 5 },
    text: "Vous ressentez les séparations comme des secousses profondes. Comme Efrim, vous avez une manière intense d'aimer, de rester lié et de chercher votre place."
  },
  {
    id: 'mina',
    name: 'Mina',
    archetype: 'La douceur ancienne',
    href: '../personnages/mina',
    image: '../../assets/personnages/cartes/mina.webp',
    traits: ['Éliatrope', 'Tendresse', 'Mémoire'],
    vector: { cœur: 5, action: 1, sagesse: 4, ambition: 0, ombre: 0, mystere: 4, liberte: 2, devoir: 4, chaos: 0, lien: 5 },
    text: "Vous avez une tendresse qui n'est pas faiblesse. Comme Mina, vous portez le lien avec délicatesse, mais aussi avec une mémoire que le temps n'efface pas."
  },
  {
    id: 'lou',
    name: 'Lou',
    archetype: 'La présence vive',
    href: '../personnages/lou',
    image: '../../assets/personnages/cartes/lou.webp',
    traits: ['Énergie', 'Lien', 'Élan'],
    vector: { cœur: 4, action: 4, sagesse: 2, ambition: 1, ombre: 1, mystere: 1, liberte: 4, devoir: 2, chaos: 2, lien: 4 },
    text: "Vous avancez avec une vivacité qui réchauffe les autres. Comme Lou, vous pouvez sembler léger, mais vos attaches vous donnent une vraie force."
  },
  {
    id: 'poo',
    name: 'Poo',
    archetype: 'Le réflexe débrouillard',
    href: '../personnages/poo',
    image: '../../assets/personnages/cartes/poo.webp',
    traits: ['Instinct', 'Survie', 'Mouvement'],
    vector: { cœur: 3, action: 4, sagesse: 2, ambition: 2, ombre: 2, mystere: 1, liberte: 5, devoir: 1, chaos: 3, lien: 3 },
    text: "Vous trouvez souvent une sortie avant que les autres aient fini de paniquer. Comme Poo, vous avez un instinct de terrain, mobile et très difficile à coincer."
  },
  {
    id: 'simone',
    name: 'Simone',
    archetype: 'La douceur décidée',
    href: '../personnages/simone',
    image: '../../assets/personnages/cartes/simone.webp',
    traits: ['Cœur', 'Calme', 'Volonté'],
    vector: { cœur: 5, action: 2, sagesse: 4, ambition: 1, ombre: 0, mystere: 1, liberte: 2, devoir: 4, chaos: 0, lien: 5 },
    text: "Vous n'avez pas besoin de brutalité pour tenir bon. Comme Simone, vous pouvez être doux, clair et beaucoup plus solide qu'on ne le croit."
  }
);

questions.push(
  {
    kicker: 'Décision rapide',
    title: 'Quand personne ne sait quoi faire, quelle décision prenez-vous ',
    answers: [
      { label: 'Je rassure', text: 'Je calme le groupe avant de choisir.', weights: { cœur: 3, lien: 3, sagesse: 1 } },
      { label: 'Je tranche', text: 'Je prends une décision nette pour débloquer la situation.', weights: { action: 4, devoir: 2 } },
      { label: 'Je questionne', text: 'Je cherche l’information qui manque.', weights: { sagesse: 4, mystere: 2 } },
      { label: 'Je dirige', text: 'Je prends la tête parce que quelqu’un doit le faire.', weights: { ambition: 4, devoir: 2 } }
    ]
  },
  {
    kicker: 'Rapport au risque',
    title: 'Face à une porte interdite, que faites-vous ',
    answers: [
      { label: 'Je l’œuvre', text: 'Si elle est interdite, c’est qu’elle cache quelque chose.', weights: { mystere: 4, liberte: 3, chaos: 1 } },
      { label: 'Je vérifie', text: 'Je cherche le piège avant d’avancer.', weights: { sagesse: 4, devoir: 2 } },
      { label: 'Je préviens', text: 'Je ne veux pas entraîner les autres sans leur accord.', weights: { cœur: 3, lien: 3 } },
      { label: 'Je m’en sers', text: 'Une porte interdite peut devenir un avantage.', weights: { ambition: 4, ombre: 2 } }
    ]
  },
  {
    kicker: 'Autorité',
    title: 'Quel type de chef vous ressemble le plus ',
    answers: [
      { label: 'Le protecteur', text: 'Je guide pour que personne ne soit laissé derrière.', weights: { cœur: 4, lien: 3, devoir: 2 } },
      { label: 'Le stratège', text: 'Je répartis les rôles et je garde une vue d’ensemble.', weights: { sagesse: 4, devoir: 3 } },
      { label: 'Le meneur', text: 'J’avance devant et les autres suivent le mouvement.', weights: { action: 4, ambition: 2 } },
      { label: 'Le manipulateur', text: 'Je préfère faire bouger les pièces sans tout révéler.', weights: { ombre: 4, mystere: 3, ambition: 3 } }
    ]
  },
  {
    kicker: 'Perte',
    title: 'Quand vous perdez quelque chose d’important, que faites-vous ',
    answers: [
      { label: 'Je répare', text: 'Je cherche comment reconstruire ce qui peut l’être.', weights: { cœur: 4, devoir: 3 } },
      { label: 'Je poursuis', text: 'Je refuse de lâcher tant que je n’ai pas essayé.', weights: { ambition: 4, action: 2, ombre: 1 } },
      { label: 'Je comprends', text: 'Je veux donner un sens à ce qui s’est passé.', weights: { sagesse: 4, mystere: 2 } },
      { label: 'Je pars', text: 'Je bouge pour ne pas rester prisonnier du manque.', weights: { liberte: 4, chaos: 1 } }
    ]
  },
  {
    kicker: 'Magie',
    title: 'Quelle forme de pouvoir vous attire le plus ',
    answers: [
      { label: 'Le soin', text: 'Un pouvoir qui protège et répare.', weights: { cœur: 4, devoir: 3, lien: 2 } },
      { label: 'Le temps', text: 'Un pouvoir qui permet de prévoir, ralentir ou corriger.', weights: { sagesse: 4, ambition: 3, mystere: 3 } },
      { label: 'Le portail', text: 'Un pouvoir qui œuvre des chemins impossibles.', weights: { liberte: 4, mystere: 4, lien: 2 } },
      { label: 'La destruction', text: 'Un pouvoir direct, dangereux, difficile à ignorer.', weights: { action: 4, chaos: 4, ombre: 2 } }
    ]
  },
  {
    kicker: 'Face au mensonge',
    title: 'On vous ment. Quelle est votre réaction ',
    answers: [
      { label: 'Je confronte', text: 'Je veux une réponse claire tout de suite.', weights: { action: 3, devoir: 2, cœur: 1 } },
      { label: 'J’observe', text: 'Je laisse parler pour comprendre le vrai motif.', weights: { sagesse: 4, mystere: 3 } },
      { label: 'Je pardonne', text: 'Je peux comprendre si la peur ou la douleur explique le mensonge.', weights: { cœur: 4, lien: 3 } },
      { label: 'Je rends coup pour coup', text: 'Si on joue avec moi, je peux jouer aussi.', weights: { ombre: 4, ambition: 2, chaos: 2 } }
    ]
  },
  {
    kicker: 'Voyage',
    title: 'Pourquoi partiriez-vous à l’aventure ',
    answers: [
      { label: 'Pour aider', text: 'Quelqu’un a besoin de moi.', weights: { cœur: 4, devoir: 3, lien: 2 } },
      { label: 'Pour découvrir', text: 'Je veux voir ce qu’il y a au-delà de la carte.', weights: { liberte: 5, mystere: 3 } },
      { label: 'Pour prouver', text: 'Je veux montrer ce dont je suis capable.', weights: { ambition: 4, action: 3 } },
      { label: 'Pour fuir', text: 'Rester en place m’étouffe.', weights: { liberte: 4, ombre: 2, chaos: 1 } }
    ]
  },
  {
    kicker: 'Méthode',
    title: 'Quel plan vous correspond le mieux ',
    answers: [
      { label: 'Simple', text: 'On entre, on règle le problème, on sort.', weights: { action: 5, chaos: 1 } },
      { label: 'Prudent', text: 'On prépare chaque étape avant de bouger.', weights: { sagesse: 4, devoir: 3 } },
      { label: 'Invisible', text: 'Personne ne doit comprendre ce qu’on fait avant la fin.', weights: { ombre: 4, mystere: 4 } },
      { label: 'Flexible', text: 'On improvise selon ce que le terrain donne.', weights: { liberte: 4, chaos: 2 } }
    ]
  },
  {
    kicker: 'Fierté',
    title: 'Qu’aimeriez-vous qu’on dise de vous ',
    answers: [
      { label: 'Fiable', text: 'On peut compter sur moi quand ça compte vraiment.', weights: { devoir: 4, cœur: 3, lien: 2 } },
      { label: 'Brillant', text: 'Je comprends vite et je trouve la bonne solution.', weights: { sagesse: 4, ambition: 2 } },
      { label: 'Libre', text: 'Personne ne peut m’enfermer dans un rôle.', weights: { liberte: 5, mystere: 1 } },
      { label: 'Redoutable', text: 'On réfléchit à deux fois avant de me provoquer.', weights: { ombre: 4, action: 3, ambition: 3 } }
    ]
  },
  {
    kicker: 'Colère',
    title: 'Quand vous êtes en colère, que se passe-t-il ',
    answers: [
      { label: 'Je parle', text: 'Je cherche à dire ce qui m’a blessé.', weights: { cœur: 3, lien: 2 } },
      { label: 'J’agis', text: 'J’ai besoin de bouger ou de régler le problème.', weights: { action: 4, chaos: 2 } },
      { label: 'Je me ferme', text: 'Je deviens froid et difficile à lire.', weights: { ombre: 3, mystere: 3, sagesse: 1 } },
      { label: 'Je calcule', text: 'Je retiens tout et j’attends le bon moment.', weights: { sagesse: 3, ambition: 3, ombre: 3 } }
    ]
  },
  {
    kicker: 'Objet fétiche',
    title: 'Quel objet emporteriez-vous partout ',
    answers: [
      { label: 'Une carte', text: 'Pour trouver la prochaine route.', weights: { liberte: 3, mystere: 2, sagesse: 2 } },
      { label: 'Une arme', text: 'Pour répondre vite au danger.', weights: { action: 4, chaos: 2 } },
      { label: 'Un souvenir', text: 'Pour garder un lien avec les miens.', weights: { cœur: 4, lien: 4 } },
      { label: 'Un symbole', text: 'Pour rappeler ma place ou ma mission.', weights: { devoir: 3, ambition: 3 } }
    ]
  },
  {
    kicker: 'Justice',
    title: 'Une injustice se produit devant vous. Que faites-vous ',
    answers: [
      { label: 'J’interviens', text: 'Je ne supporte pas de regarder sans agir.', weights: { action: 4, cœur: 3, devoir: 2 } },
      { label: 'Je protège la victime', text: 'Je m’occupe d’abord de la personne touchée.', weights: { cœur: 4, lien: 3 } },
      { label: 'Je cherche la preuve', text: 'Je veux que la vérité soit impossible à nier.', weights: { sagesse: 4, devoir: 3 } },
      { label: 'Je punis', text: 'Certains doivent apprendre qu’il y a un prix.', weights: { ombre: 4, chaos: 3, action: 2 } }
    ]
  },
  {
    kicker: 'Solitude',
    title: 'Comment vivez-vous la solitude ',
    answers: [
      { label: 'Difficilement', text: 'J’ai besoin de sentir que je compte pour quelqu’un.', weights: { cœur: 4, lien: 4 } },
      { label: 'Calmement', text: 'Elle m’aide à réfléchir et à me recentrer.', weights: { sagesse: 4, mystere: 2 } },
      { label: 'Librement', text: 'Seul, je peux aller où je veux.', weights: { liberte: 5, mystere: 1 } },
      { label: 'Dangereusement', text: 'Seul, je rumine trop ou je vais trop loin.', weights: { ombre: 3, chaos: 3, ambition: 2 } }
    ]
  },
  {
    kicker: 'Promesse',
    title: 'Quelle promesse tiendriez-vous coûte que coûte ',
    answers: [
      { label: 'Revenir', text: 'Je reviendrai vers ceux que j’aime.', weights: { cœur: 4, lien: 4 } },
      { label: 'Protéger', text: 'Je garderai quelqu’un ou quelque chose en sécurité.', weights: { devoir: 5, cœur: 2 } },
      { label: 'Réussir', text: 'J’irai jusqu’au bout de mon objectif.', weights: { ambition: 5, action: 2 } },
      { label: 'Découvrir', text: 'Je trouverai la vérité, même cachée.', weights: { mystere: 4, sagesse: 4 } }
    ]
  },
  {
    kicker: 'Humour',
    title: 'Votre humour ressemble plutôt à quoi ',
    answers: [
      { label: 'Chaleureux', text: 'Je fais rire pour rapprocher les gens.', weights: { cœur: 3, lien: 4 } },
      { label: 'Provocateur', text: 'J’aime piquer un peu pour voir les réactions.', weights: { chaos: 3, ombre: 2, liberte: 2 } },
      { label: 'Sec', text: 'Je place une phrase au bon moment.', weights: { sagesse: 3, mystere: 2 } },
      { label: 'Spectaculaire', text: 'J’aime faire mon effet.', weights: { ambition: 3, action: 2, liberte: 2 } }
    ]
  },
  {
    kicker: 'Loyauté',
    title: 'Votre loyauté a quelle limite ',
    answers: [
      { label: 'Aucune', text: 'Je reste même quand c’est compliqué.', weights: { cœur: 4, lien: 4, devoir: 2 } },
      { label: 'La vérité', text: 'Je ne suivrai pas quelqu’un qui se ment.', weights: { sagesse: 3, devoir: 3 } },
      { label: 'Ma liberté', text: 'Je refuse qu’un lien devienne une cage.', weights: { liberte: 4, mystere: 1 } },
      { label: 'Mon intérêt', text: 'Je peux partir si le pacte ne tient plus.', weights: { ambition: 3, ombre: 3 } }
    ]
  },
  {
    kicker: 'Rapport au monde',
    title: 'Le monde vous semble surtout...',
    answers: [
      { label: 'À protéger', text: 'Il est fragile et mérite qu’on s’en occupe.', weights: { cœur: 4, devoir: 4 } },
      { label: 'À comprendre', text: 'Il cache des règles fascinantes.', weights: { sagesse: 5, mystere: 3 } },
      { label: 'À parcourir', text: 'Il est trop vaste pour rester immobile.', weights: { liberte: 5, action: 2 } },
      { label: 'À conquérir', text: 'Il appartient à ceux qui osent prendre leur place.', weights: { ambition: 5, ombre: 2 } }
    ]
  },
  {
    kicker: 'Conflit familial',
    title: 'Un proche fait un choix que vous jugez dangereux. Vous faites quoi ',
    answers: [
      { label: 'Je le retiens', text: 'Je préfère qu’il m’en veuille plutôt qu’il se perde.', weights: { cœur: 4, devoir: 3, lien: 3 } },
      { label: 'Je discute', text: 'Je veux comprendre avant de condamner.', weights: { sagesse: 4, lien: 3 } },
      { label: 'Je le suis', text: 'Je viens avec lui pour limiter les dégâts.', weights: { cœur: 3, action: 3, lien: 3 } },
      { label: 'Je coupe', text: 'Je ne peux pas porter les choix de tout le monde.', weights: { liberte: 4, ombre: 2 } }
    ]
  },
  {
    kicker: 'Regard des autres',
    title: 'Comment gérez-vous le jugement des autres ',
    answers: [
      { label: 'Je m’en sers', text: 'Il peut devenir une motivation.', weights: { ambition: 4, action: 2 } },
      { label: 'Je l’ignore', text: 'Je sais qui je suis, ça suffit.', weights: { liberte: 4, sagesse: 2 } },
      { label: 'Ça me touche', text: 'Même si je le cache, ça compte.', weights: { cœur: 3, lien: 2 } },
      { label: 'Je le retourne', text: 'Qu’on me sous-estime, c’est pratique.', weights: { ombre: 4, mystere: 3 } }
    ]
  },
  {
    kicker: 'Sacrifice',
    title: 'Que seriez-vous prêt à sacrifier ',
    answers: [
      { label: 'Mon confort', text: 'Pour aider ceux que j’aime.', weights: { cœur: 4, lien: 3 } },
      { label: 'Ma réputation', text: 'Si c’est nécessaire pour faire ce qui est juste.', weights: { devoir: 4, ombre: 1 } },
      { label: 'Ma sécurité', text: 'Si l’action demande de prendre un risque.', weights: { action: 4, chaos: 2 } },
      { label: 'Mes attaches', text: 'Si elles m’empêchent d’aller au bout.', weights: { ambition: 4, liberte: 3 } }
    ]
  },
  {
    kicker: 'Savoir interdit',
    title: 'Vous trouvez un savoir dangereux. Que faites-vous ',
    answers: [
      { label: 'Je le cache', text: 'Tout le monde n’est pas prêt à l’utiliser.', weights: { devoir: 4, sagesse: 3, mystere: 2 } },
      { label: 'Je l’étudie', text: 'Le danger ne disparaît pas parce qu’on détourne le regard.', weights: { sagesse: 5, mystere: 4 } },
      { label: 'Je le détruis', text: 'Certains risques ne valent pas la curiosité.', weights: { devoir: 4, action: 2 } },
      { label: 'Je l’exploite', text: 'Un outil dangereux reste un outil.', weights: { ambition: 4, ombre: 4, chaos: 2 } }
    ]
  },
  {
    kicker: 'Tempérament',
    title: 'On vous décrit le plus souvent comme...',
    answers: [
      { label: 'Attachant', text: 'Je crée facilement des liens.', weights: { cœur: 4, lien: 4 } },
      { label: 'Intense', text: 'Je vis les choses très fort.', weights: { action: 3, chaos: 3, cœur: 2 } },
      { label: 'Mystérieux', text: 'On ne sait jamais tout à fait ce que je pense.', weights: { mystere: 4, ombre: 2 } },
      { label: 'Ambitieux', text: 'J’ai besoin d’avancer vers quelque chose de grand.', weights: { ambition: 5, devoir: 1 } }
    ]
  },
  {
    kicker: 'Après la victoire',
    title: 'Vous venez de gagner. Quelle est votre première pensée ',
    answers: [
      { label: 'Les autres', text: 'Je vérifie que tout le monde va bien.', weights: { cœur: 4, lien: 3 } },
      { label: 'La suite', text: 'Je prépare déjà le prochain problème.', weights: { sagesse: 3, devoir: 3 } },
      { label: 'La liberté', text: 'Je veux profiter du moment et respirer.', weights: { liberte: 4, chaos: 1 } },
      { label: 'Le pouvoir', text: 'Cette victoire doit servir à obtenir plus.', weights: { ambition: 5, ombre: 2 } }
    ]
  },
  {
    kicker: 'Échec',
    title: 'Quand vous échouez, que faites-vous ensuite ',
    answers: [
      { label: 'Je recommence', text: 'Je ne veux pas rester sur une défaite.', weights: { action: 4, ambition: 3 } },
      { label: 'J’apprends', text: 'Je décortique ce qui n’a pas marché.', weights: { sagesse: 5, devoir: 1 } },
      { label: 'Je m’isole', text: 'J’ai besoin de digérer seul.', weights: { mystere: 3, ombre: 2 } },
      { label: 'Je demande aide', text: 'Je sais que je n’ai pas à tout porter seul.', weights: { cœur: 3, lien: 4 } }
    ]
  },
  {
    kicker: 'Règles',
    title: 'Que faites-vous avec une règle injuste ',
    answers: [
      { label: 'Je la change', text: 'Je cherche une solution durable.', weights: { devoir: 4, sagesse: 3, ambition: 2 } },
      { label: 'Je la brise', text: 'Une règle injuste ne mérite pas d’obéir.', weights: { liberte: 4, action: 3, chaos: 2 } },
      { label: 'Je la contourne', text: 'Le chemin discret est souvent le plus efficace.', weights: { mystere: 3, ombre: 3, sagesse: 2 } },
      { label: 'Je l’utilise', text: 'Même une mauvaise règle peut servir un plan.', weights: { ambition: 4, ombre: 3 } }
    ]
  },
  {
    kicker: 'Apparence',
    title: 'Quel détail visuel vous correspond le mieux ',
    answers: [
      { label: 'Un symbole clair', text: 'Quelque chose qui annonce mes valeurs.', weights: { devoir: 3, cœur: 2 } },
      { label: 'Un détail étrange', text: 'Quelque chose qui intrigue sans tout expliquer.', weights: { mystere: 4, sagesse: 1 } },
      { label: 'Une allure vive', text: 'Quelque chose qui donne envie de bouger.', weights: { action: 3, liberte: 4 } },
      { label: 'Une présence sombre', text: 'Quelque chose qui impose une distance.', weights: { ombre: 4, ambition: 3 } }
    ]
  },
  {
    kicker: 'Énergie',
    title: 'Qu’est-ce qui vous recharge le plus ',
    answers: [
      { label: 'Les proches', text: 'Retrouver les miens me remet debout.', weights: { cœur: 4, lien: 4 } },
      { label: 'Le silence', text: 'J’ai besoin de calme pour retrouver ma clarté.', weights: { sagesse: 4, mystere: 2 } },
      { label: 'L’action', text: 'Je récupère en faisant quelque chose.', weights: { action: 4, liberte: 2 } },
      { label: 'Le défi', text: 'Je me sens vivant quand il y a un enjeu.', weights: { ambition: 3, chaos: 3 } }
    ]
  },
  {
    kicker: 'Dernier choix',
    title: 'Si tout dépendait de vous, quelle force choisiriez-vous ',
    answers: [
      { label: 'Le cœur', text: 'Parce qu’un monde sans lien ne vaut rien.', weights: { cœur: 5, lien: 5 } },
      { label: 'La maîtrise', text: 'Parce qu’il faut comprendre pour ne pas détruire.', weights: { sagesse: 5, devoir: 3 } },
      { label: 'La liberté', text: 'Parce qu’exister, c’est pouvoir choisir.', weights: { liberte: 5, action: 2 } },
      { label: 'La puissance', text: 'Parce qu’on ne protège rien sans pouvoir agir.', weights: { ambition: 4, action: 4, ombre: 2 } }
    ]
  }
);

const startButton = document.querySelector('[data-start-test]');
const quizRoot = document.querySelector('[data-quiz]');
const resultRoot = document.querySelector('[data-result]');
const hero = document.querySelector('.personality-hero');
const questionCount = document.querySelector('[data-question-count]');
const progressBar = document.querySelector('[data-progress-bar]');
const questionKicker = document.querySelector('[data-question-kicker]');
const questionTitle = document.querySelector('[data-question-title]');
const answerGrid = document.querySelector('[data-answer-grid]');
const resultImage = document.querySelector('[data-result-image]');
const resultName = document.querySelector('[data-result-name]');
const resultArchetype = document.querySelector('[data-result-archetype]');
const resultText = document.querySelector('[data-result-text]');
const resultTraits = document.querySelector('[data-result-traits]');
const resultLink = document.querySelector('[data-result-link]');
const nearResults = document.querySelector('[data-near-results]');
const resetButtons = document.querySelectorAll('[data-reset-test]');
const previousQuestionButton = document.querySelector('[data-previous-question]');
const shareName = document.querySelector('[data-share-name]');
const shareArchetype = document.querySelector('[data-share-archetype]');
const shareImage = document.querySelector('[data-share-image]');
const shareButton = document.querySelector('[data-open-share-modal]');
const copyShareLinkButton = document.querySelector('[data-copy-share-link]');
const shareStatus = document.querySelector('[data-share-status]');
const shareModal = document.querySelector('[data-share-modal]');
const closeShareModalButtons = document.querySelectorAll('[data-close-share-modal]');
const generatedShareImage = document.querySelector('[data-generated-share-image]');
const shareXButton = document.querySelector('[data-share-x]');
const downloadShareCardButton = document.querySelector('[data-download-share-card]');
const shareModalStatus = document.querySelector('[data-share-modal-status]');

let questionIndex = 0;
let playerVector = createEmptyVector();
let currentWinner = null;
let currentCloseCharacters = [];
let activeQuestions = [];
let answerHistory = [];
let generatedShareBlob = null;
let generatedShareUrl = '';

function getCharacterSlug(character) {
  return character.href.split('/').pop().replace(/\.html$/i, '');
}

function getCharacterBySlug(slug) {
  return characters.find((character) => getCharacterSlug(character) === slug || character.id === slug) || null;
}

function createEmptyVector() {
  return axes.reduce((vector, axis) => {
    vector[axis] = 0;
    return vector;
  }, {});
}

function addWeights(weights) {
  Object.entries(weights).forEach(([axis, value]) => {
    playerVector[axis] = (playerVector[axis] || 0) + value;
  });
}

function removeWeights(weights) {
  Object.entries(weights).forEach(([axis, value]) => {
    playerVector[axis] = (playerVector[axis] || 0) - value;
  });
}

function getVectorMagnitude(vector) {
  return Math.sqrt(axes.reduce((total, axis) => total + (vector[axis] || 0) ** 2, 0));
}

function scoreCharacter(character) {
  const playerMagnitude = getVectorMagnitude(playerVector);
  const characterMagnitude = getVectorMagnitude(character.vector);

  if (!playerMagnitude || !characterMagnitude) {
    return 0;
  }

  const similarity = axes.reduce((total, axis) => {
    return total + (playerVector[axis] || 0) * (character.vector[axis] || 0);
  }, 0);

  return similarity / (playerMagnitude * characterMagnitude);
}

function getStrongAxes(character) {
  const axisLabels = {
    cœur: 'le cœur',
    action: 'l’action',
    sagesse: 'la réflexion',
    ambition: 'l’ambition',
    ombre: 'la part d’ombre',
    mystere: 'le mystère',
    liberte: 'la liberté',
    devoir: 'le devoir',
    chaos: 'l’instinct',
    lien: 'les liens'
  };

  return Object.entries(character.vector)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 3)
    .map(([axis]) => axisLabels[axis]);
}

function scoreVectorAgainstCharacter(sourceVector, character) {
  const sourceMagnitude = getVectorMagnitude(sourceVector);
  const characterMagnitude = getVectorMagnitude(character.vector);

  if (!sourceMagnitude || !characterMagnitude) {
    return 0;
  }

  const similarity = axes.reduce((total, axis) => {
    return total + (sourceVector[axis] || 0) * (character.vector[axis] || 0);
  }, 0);

  return similarity / (sourceMagnitude * characterMagnitude);
}

function getCloseCharacters(character) {
  return characters
    .filter((candidate) => candidate.id !== character.id)
    .map((candidate) => ({ ...candidate, score: scoreVectorAgainstCharacter(character.vector, candidate) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function getSimpleResultText(character) {
  const strengths = getStrongAxes(character);
  return `Comme ${character.name}, vous avancez surtout avec ${strengths[0]}, ${strengths[1]} et ${strengths[2]}. Votre profil est marqué par ces traits : ${character.traits.join(', ')}.`;
}

function getShareDescription(character) {
  const sentences = character.text.match(/[^.!]+[.!]+/g) || [character.text];
  const description = sentences.slice(0, 2).join(' ').replace(/\s+/g, ' ').trim();
  if (description.length <= 150) {
    return description;
  }
  return `${description.slice(0, 147).replace(/[,\s]+[^,\s]*$/, '')}...`;
}

function getTestUrl() {
  if (!/^https:$/.test(window.location.protocol)) {
    return new URL('jeu-personnage', window.location.href).href;
  }

  return new URL('/pages/jeux/jeu-personnage', window.location.origin).href;
}

function getResultUrl(character) {
  if (!/^https:$/.test(window.location.protocol)) {
    const url = new URL('jeu-personnage', window.location.href);
    url.searchParams.set('result', getCharacterSlug(character));
    return url.href;
  }

  return new URL(`/result/${getCharacterSlug(character)}`, window.location.origin).href;
}

function getRouteResultSlug() {
  const querySlug = new URLSearchParams(window.location.search).get('result');
  if (querySlug) {
    return querySlug;
  }

  const match = window.location.pathname.match(/^\/result[:/]([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : '';
}

function setPageUrl(url) {
  if (window.location.href !== url) {
    try {
      window.history.replaceState({}, '', url);
    } catch {
      // Le quiz doit rester jouable même si le navigateur bloque la mise à jour de l'URL.
    }
  }
}

function resetGeneratedShareCard() {
  generatedShareBlob = null;
  if (generatedShareUrl) {
    URL.revokeObjectURL(generatedShareUrl);
    generatedShareUrl = '';
  }
}

function pickRandomQuestions() {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled.slice(0, QUESTION_COUNT_PER_RUN);
}

function renderQuestion() {
  const question = activeQuestions[questionIndex];
  questionCount.textContent = `Question ${questionIndex + 1} / ${activeQuestions.length}`;
  progressBar.style.width = `${(questionIndex / activeQuestions.length) * 100}%`;
  questionKicker.textContent = question.kicker;
  questionTitle.textContent = question.title;
  if (previousQuestionButton) {
    previousQuestionButton.disabled = questionIndex === 0;
  }

  answerGrid.replaceChildren(...question.answers.map((answer) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.type = 'button';
    button.innerHTML = `<strong>${answer.label}</strong><span>${answer.text}</span>`;
    button.addEventListener('click', () => {
      addWeights(answer.weights);
      answerHistory[questionIndex] = answer.weights;
      questionIndex += 1;
      if (questionIndex >= activeQuestions.length) {
        showResult();
      } else {
        renderQuestion();
      }
    });
    return button;
  }));
}

function renderResult(winner, close, shouldUpdateUrl = true) {
  resetGeneratedShareCard();
  currentWinner = winner;
  currentCloseCharacters = close;

  hero.hidden = true;
  quizRoot.hidden = true;
  resultRoot.hidden = false;
  resultImage.src = winner.image;
  resultImage.alt = winner.name;
  resultName.textContent = winner.name;
  resultArchetype.textContent = winner.archetype;
  resultText.textContent = getSimpleResultText(winner);
  resultLink.href = winner.href;
  shareName.textContent = winner.name;
  shareArchetype.textContent = winner.archetype;
  shareImage.src = winner.image;
  shareImage.alt = `Carte de partage ${winner.name}`;
  shareStatus.textContent = '';
  if (shareModalStatus) {
    shareModalStatus.textContent = '';
  }

  resultTraits.replaceChildren(...winner.traits.map((trait) => {
    const tag = document.createElement('span');
    tag.textContent = trait;
    return tag;
  }));

  nearResults.replaceChildren(...close.map((character) => {
    const link = document.createElement('a');
    link.className = 'near-card';
    link.href = character.href;
    link.setAttribute('aria-label', character.name);
    link.title = character.name;

    const image = document.createElement('img');
    image.src = character.image;
    image.alt = character.name;
    image.loading = 'lazy';
    link.append(image);

    return link;
  }));

  if (shouldUpdateUrl) {
    setPageUrl(getResultUrl(winner));
  }
  resultRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showResult() {
  progressBar.style.width = '100%';
  const tiePrecision = 0.000000001;
  const ranked = [...characters]
    .map((character) => ({ ...character, score: scoreCharacter(character), tieBreaker: Math.random() }))
    .sort((a, b) => {
      const scoreGap = b.score - a.score;
      return Math.abs(scoreGap) > tiePrecision ? scoreGap : b.tieBreaker - a.tieBreaker;
    });
  renderResult(ranked[0], ranked.slice(1, 4));
}

function startTest() {
  questionIndex = 0;
  playerVector = createEmptyVector();
  activeQuestions = pickRandomQuestions();
  answerHistory = [];
  currentWinner = null;
  currentCloseCharacters = [];
  resetGeneratedShareCard();
  setPageUrl(getTestUrl());
  hero.hidden = true;
  resultRoot.hidden = true;
  nearResults.replaceChildren();
  quizRoot.hidden = false;
  renderQuestion();
  quizRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetTest() {
  questionIndex = 0;
  playerVector = createEmptyVector();
  currentWinner = null;
  currentCloseCharacters = [];
  resetGeneratedShareCard();
  setPageUrl(getTestUrl());
  activeQuestions = [];
  answerHistory = [];
  quizRoot.hidden = true;
  resultRoot.hidden = true;
  nearResults.replaceChildren();
  hero.hidden = false;
  hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goToPreviousQuestion() {
  if (questionIndex <= 0) {
    return;
  }

  questionIndex -= 1;
  const previousAnswer = answerHistory[questionIndex];
  if (previousAnswer) {
    removeWeights(previousAnswer);
    answerHistory.splice(questionIndex, 1);
  }
  renderQuestion();
  quizRoot.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getShareUrl() {
  return currentWinner ? getResultUrl(currentWinner) : getTestUrl();
}

function loadShareImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundedImagePath(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawCoverImage(context, image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawCircleImage(context, image, centerX, centerY, radius) {
  context.save();
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.clip();
  drawCoverImage(context, image, centerX - radius, centerY - radius, radius * 2, radius * 2);
  context.restore();
  context.strokeStyle = 'rgba(232,201,122,0.48)';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.stroke();
}

function drawPortraitFrame(context, x, y, width, height) {
  const corner = 48;
  const inset = 10;

  context.save();
  context.strokeStyle = 'rgba(232,201,122,0.62)';
  context.lineWidth = 2;

  context.beginPath();
  context.moveTo(x, y + corner);
  context.lineTo(x, y);
  context.lineTo(x + corner, y);
  context.moveTo(x + width - corner, y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + corner);
  context.moveTo(x + width, y + height - corner);
  context.lineTo(x + width, y + height);
  context.lineTo(x + width - corner, y + height);
  context.moveTo(x + corner, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x, y + height - corner);
  context.stroke();

  context.strokeStyle = 'rgba(46,207,176,0.28)';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x + inset, y + corner + 18);
  context.lineTo(x + inset, y + inset);
  context.lineTo(x + corner + 18, y + inset);
  context.moveTo(x + width - corner - 18, y + inset);
  context.lineTo(x + width - inset, y + inset);
  context.lineTo(x + width - inset, y + corner + 18);
  context.moveTo(x + width - inset, y + height - corner - 18);
  context.lineTo(x + width - inset, y + height - inset);
  context.lineTo(x + width - corner - 18, y + height - inset);
  context.moveTo(x + corner + 18, y + height - inset);
  context.lineTo(x + inset, y + height - inset);
  context.lineTo(x + inset, y + height - corner - 18);
  context.stroke();

  context.fillStyle = 'rgba(232,201,122,0.9)';
  [
    [x + inset, y + inset],
    [x + width - inset, y + inset],
    [x + width - inset, y + height - inset],
    [x + inset, y + height - inset]
  ].forEach(([pointX, pointY]) => {
    context.save();
    context.translate(pointX, pointY);
    context.rotate(Math.PI / 4);
    context.fillRect(-3, -3, 6, 6);
    context.restore();
  });

  context.beginPath();
  context.arc(x + width / 2, y - 1, 3, 0, Math.PI * 2);
  context.arc(x + width / 2, y + height + 1, 3, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) {
    lines.push(line);
  }

  lines.slice(0, maxLines).forEach((textLine, index) => {
    context.fillText(textLine, x, y + index * lineHeight);
  });
}

function getCanvasTextLines(context, text, maxWidth, maxLines) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) {
    lines.push(line);
  }

  return lines.slice(0, maxLines);
}

function drawCanvasTextLines(context, lines, x, y, lineHeight) {
  lines.forEach((textLine, index) => {
    context.fillText(textLine, x, y + index * lineHeight);
  });
}

function fitCanvasFont(context, text, maxWidth, initialSize, minSize, fontFamily) {
  let size = initialSize;
  do {
    context.font = `700 ${size}px ${fontFamily}`;
    if (context.measureText(text).width <= maxWidth) {
      return size;
    }
    size -= 2;
  } while (size >= minSize);
  return minSize;
}

async function createShareCard(character, closeCharacters = []) {
  if (document.fonts.ready) {
    await document.fonts.ready;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const context = canvas.getContext('2d');
  const logoImage = await loadShareImage('../../assets/logo_krosmoz.webp').catch(() => null);
  const image = await loadShareImage(character.image).catch(() => logoImage);
  const closeImages = await Promise.all(closeCharacters.slice(0, 3).map((closeCharacter) => {
    return loadShareImage(closeCharacter.image).catch(() => null);
  }));
  const cardX = 44;
  const cardY = 44;
  const cardWidth = 1112;
  const cardHeight = 542;
  const gradient = context.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
  gradient.addColorStop(0, '#080811');
  gradient.addColorStop(0.52, '#0c1517');
  gradient.addColorStop(1, '#12100b');

  context.save();
  roundedImagePath(context, cardX, cardY, cardWidth, cardHeight, 18);
  context.clip();
  context.fillStyle = gradient;
  context.fillRect(cardX, cardY, cardWidth, cardHeight);

  context.fillStyle = 'rgba(255,247,223,0.035)';
  roundedImagePath(context, cardX, cardY, cardWidth, cardHeight, 18);
  context.fill();
  context.restore();

  roundedImagePath(context, cardX, cardY, cardWidth, cardHeight, 18);
  context.strokeStyle = 'rgba(232,201,122,0.36)';
  context.lineWidth = 2;
  context.stroke();

  context.save();
  roundedImagePath(context, 104, 116, 326, 390, 14);
  context.clip();
  if (image) {
    drawCoverImage(context, image, 104, 116, 326, 390);
  } else {
    context.fillStyle = 'rgba(255,247,223,0.055)';
    context.fillRect(104, 116, 326, 390);
    context.fillStyle = '#e8c97a';
    context.font = '700 24px Cinzel, Georgia, serif';
    context.textAlign = 'center';
    context.fillText('UNIVERS KROSMOZ', 267, 320);
    context.textAlign = 'left';
  }
  const imageOverlay = context.createLinearGradient(104, 116, 430, 506);
  imageOverlay.addColorStop(0, 'rgba(0,0,0,0)');
  imageOverlay.addColorStop(1, 'rgba(0,0,0,0.48)');
  context.fillStyle = imageOverlay;
  context.fillRect(104, 116, 326, 390);
  context.restore();
  context.strokeStyle = 'rgba(255,247,223,0.24)';
  context.strokeRect(104, 116, 326, 390);
  drawPortraitFrame(context, 88, 100, 358, 422);

  const siteLabel = 'univers-krosmoz.fr';
  context.font = '700 21px Cinzel, Georgia, serif';
  const siteLabelWidth = context.measureText(siteLabel).width;
  const logoSize = 24;
  const siteGap = 10;
  const siteBlockWidth = siteLabelWidth + logoSize + siteGap;
  const siteX = 104 + (326 - siteBlockWidth) / 2;
  const siteY = 544;
  if (logoImage) {
    context.save();
    context.beginPath();
    context.arc(siteX + logoSize / 2, siteY - logoSize / 2 + 3, logoSize / 2, 0, Math.PI * 2);
    context.clip();
    drawCoverImage(context, logoImage, siteX, siteY - logoSize + 3, logoSize, logoSize);
    context.restore();
  }
  context.fillStyle = '#e8c97a';
  context.fillText(siteLabel, siteX + logoSize + siteGap, siteY);

  context.fillStyle = 'rgba(8,8,16,0.74)';
  roundedImagePath(context, 506, 82, 618, 466, 14);
  context.fill();
  context.strokeStyle = 'rgba(46,207,176,0.18)';
  context.stroke();

  context.fillStyle = '#e8c97a';
  context.font = '700 24px Cinzel, Georgia, serif';
  const shareTitle = 'MON REFLET DANS LE KROSMOZ';
  context.fillText(shareTitle, 540, 122);
  const shareTitleWidth = context.measureText(shareTitle).width;
  const shareTitleLineWidth = Math.min(shareTitleWidth * 0.82, 334);
  const shareTitleLineX = 540 + (shareTitleWidth - shareTitleLineWidth) / 2;
  context.strokeStyle = 'rgba(232,201,122,0.62)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(shareTitleLineX, 136);
  context.lineTo(shareTitleLineX + shareTitleLineWidth, 136);
  context.stroke();

  context.fillStyle = '#fff7df';
  const nameFontFamily = 'Cinzel Decorative, Cinzel, Georgia, serif';
  fitCanvasFont(context, character.name.toUpperCase(), 520, 68, 42, nameFontFamily);
  const nameLines = getCanvasTextLines(context, character.name.toUpperCase(), 520, 3);
  drawCanvasTextLines(context, nameLines, 540, 204, 58);

  context.fillStyle = '#2ecfb0';
  context.font = '700 23px Cinzel, Georgia, serif';
  const archetypeY = 226 + (nameLines.length - 1) * 58 + 36;
  const archetypeLines = getCanvasTextLines(context, character.archetype, 520, 2);
  drawCanvasTextLines(context, archetypeLines, 540, archetypeY, 30);

  context.fillStyle = 'rgba(245,234,216,0.9)';
  context.font = '21px Crimson Text, Georgia, serif';
  const descriptionY = archetypeY + archetypeLines.length * 27 + 8;
  const descriptionLines = getCanvasTextLines(context, getShareDescription(character), 520, 2);
  drawCanvasTextLines(context, descriptionLines, 540, descriptionY, 24);

  const closeY = Math.min(descriptionY + descriptionLines.length * 24 + 44, 434);
  context.fillStyle = '#e8c97a';
  context.font = '700 19px Cinzel, Georgia, serif';
  context.fillText('PERSONNAGES PROCHES', 540, closeY);

  closeCharacters.slice(0, 3).forEach((closeCharacter, index) => {
    const centerX = 594 + index * 142;
    const centerY = closeY + 52;
    const closeName = closeCharacter.name.toUpperCase();
    if (closeImages[index]) {
      drawCircleImage(context, closeImages[index], centerX, centerY, 36);
    } else {
      context.fillStyle = 'rgba(255,247,223,0.055)';
      context.beginPath();
      context.arc(centerX, centerY, 36, 0, Math.PI * 2);
      context.fill();
    }
    context.fillStyle = '#fff7df';
    const closeFontSize = fitCanvasFont(context, closeName, 108, 15, 11, 'Cinzel, Georgia, serif');
    context.font = `700 ${closeFontSize}px Cinzel, Georgia, serif`;
    const nameWidth = context.measureText(closeName).width;
    context.fillText(closeName, centerX - nameWidth / 2, centerY + 52);
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
  });
}

async function copyShareLink() {
  const url = getShareUrl();
  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = 'Lien du test copié.';
  } catch {
    shareStatus.textContent = url;
  }
}

function getShareText() {
  if (!currentWinner) {
    return '';
  }
  return `Je suis ${currentWinner.name} dans le test Univers Krosmoz. Et vous, quel personnage du Krosmoz êtes-vous `;
}

function downloadGeneratedShareCard() {
  if (!currentWinner || !generatedShareBlob) {
    return;
  }

  const downloadUrl = URL.createObjectURL(generatedShareBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = downloadUrl;
  downloadLink.download = `resultat-${currentWinner.id}.png`;
  downloadLink.click();
  URL.revokeObjectURL(downloadUrl);
}

async function copyGeneratedShareCard() {
  if (!generatedShareBlob || !navigator.clipboard || !window.ClipboardItem) {
    return false;
  }

  try {
    await navigator.clipboard.write([
      new ClipboardItem({ [generatedShareBlob.type]: generatedShareBlob })
    ]);
    return true;
  } catch {
    return false;
  }
}

async function ensureShareCard() {
  if (!currentWinner) {
    return null;
  }

  if (generatedShareBlob && generatedShareUrl) {
    return generatedShareBlob;
  }

  const statusTarget = shareModal && !shareModal.hidden ? shareModalStatus : shareStatus;
  if (statusTarget) {
    statusTarget.textContent = 'Création de la fiche...';
  }

  try {
    generatedShareBlob = await createShareCard(currentWinner, currentCloseCharacters);
    if (!generatedShareBlob) {
      throw new Error('share_card_empty');
    }
    generatedShareUrl = URL.createObjectURL(generatedShareBlob);
    if (generatedShareImage) {
      generatedShareImage.src = generatedShareUrl;
      generatedShareImage.alt = `Fiche de résultat ${currentWinner.name}`;
    }
    if (statusTarget) {
      statusTarget.textContent = 'Fiche prête.';
    }
    return generatedShareBlob;
  } catch {
    await copyShareLink();
    if (statusTarget) {
      statusTarget.textContent = 'La fiche n’a pas pu être générée. Le lien du test a été copié.';
    }
    return null;
  }
}

async function openShareModal() {
  if (!currentWinner || !shareModal) {
    return;
  }

  shareModal.hidden = false;
  document.body.classList.add('is-share-modal-open');
  if (shareModalStatus) {
    shareModalStatus.textContent = 'Création de la fiche...';
  }
  await ensureShareCard();
  shareModal.querySelector('button').focus();
}

function closeShareModal() {
  if (!shareModal) {
    return;
  }

  shareModal.hidden = true;
  document.body.classList.remove('is-share-modal-open');
}

async function shareWithNativeTarget() {
  const blob = await ensureShareCard();
  if (!currentWinner || !blob || !navigator.share) {
    return false;
  }

  const file = new File([blob], `resultat-${currentWinner.id}.png`, { type: 'image/png' });
  const shareData = navigator.canShare?.({ files: [file] }) ?
    { title: `Je suis ${currentWinner.name} dans le Krosmoz`, text: getShareText(), url: getShareUrl(), files: [file] }
    : { title: `Je suis ${currentWinner.name} dans le Krosmoz`, text: getShareText(), url: getShareUrl() };

  try {
    await navigator.share(shareData);
    return true;
  } catch {
    return false;
  }
}

async function shareOnDiscord() {
  const blob = await ensureShareCard();
  if (!blob) {
    return;
  }

  if (await shareWithNativeTarget()) {
    shareModalStatus.textContent = 'Partage envoyé.';
    return;
  }

  const imageCopied = await copyGeneratedShareCard();
  if (!imageCopied) {
    downloadGeneratedShareCard();
    await navigator.clipboard.writeText(`${getShareText()} ${getShareUrl()}`).catch(() => {});
  }
  window.open('https://discord.com/channels/@me', '_blank', 'noopener,noreferrer');
  shareModalStatus.textContent = imageCopied
    ? 'Image copiée. Discord est ouvert : collez la fiche dans votre message.'
    : 'Image téléchargée et texte copié. Discord est ouvert : ajoutez la fiche à votre message.';
}

async function shareOnX() {
  const blob = await ensureShareCard();
  if (!blob) {
    return;
  }

  const imageCopied = await copyGeneratedShareCard();
  if (!imageCopied) {
    downloadGeneratedShareCard();
  }
  const tweetUrl = new URL('https://twitter.com/intent/tweet');
  tweetUrl.searchParams.set('text', getShareText());
  tweetUrl.searchParams.set('url', getShareUrl());
  window.open(tweetUrl.href, '_blank', 'noopener,noreferrer');
  shareModalStatus.textContent = imageCopied
    ? 'Image copiée. X est ouvert : collez la fiche dans le post avant de publier.'
    : 'La fiche est téléchargée. Ajoutez-la à votre post X avant de publier.';
}

function renderResultFromRoute() {
  const slug = getRouteResultSlug();
  if (!slug) {
    return false;
  }

  const character = getCharacterBySlug(slug);
  if (!character) {
    setPageUrl(getTestUrl());
    return false;
  }

  renderResult(character, getCloseCharacters(character), false);
  return true;
}

startButton.addEventListener('click', startTest);
resetButtons.forEach((button) => button.addEventListener('click', resetTest));
previousQuestionButton.addEventListener('click', goToPreviousQuestion);
shareButton.addEventListener('click', openShareModal);
copyShareLinkButton.addEventListener('click', copyShareLink);
closeShareModalButtons.forEach((button) => button.addEventListener('click', closeShareModal));
downloadShareCardButton.addEventListener('click', async () => {
  const blob = await ensureShareCard();
  if (blob) {
    downloadGeneratedShareCard();
    shareModalStatus.textContent = 'Fiche téléchargée.';
  }
});
shareXButton.addEventListener('click', shareOnX);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && shareModal && !shareModal.hidden) {
    closeShareModal();
  }
});
renderResultFromRoute();
