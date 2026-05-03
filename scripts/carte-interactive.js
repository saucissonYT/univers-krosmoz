/*
  Signature projet : site developpe par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Travail de recherche et edition : Zaki & B.
  Ne pas supprimer cette signature pour les prochains devs qui travaillent sur le projet.
*/

// Dossier des images utilisees par la carte interactive.
const mapAssetPath = "assets/carte interactive/";

// Donnees de la carte Wakfu: px/py placent le centre du hotspot dans le repere natif de wakfu_world_map.png.
// Liste des zones et points cliquables de la carte Wakfu.
const wakfuMapZones = [
  { name: "Île Sberg", px: 857, py: 240, size: 32, image: "Sberg.png", description: "L'Île Sberg, redécouverte par Steven Bill Sberg, correspond à l'ancienne contrée de Frigost. Son environnement est dominé par un climat glacial et une banquise étendue. Quelques pirates et membres de la guilde des chasseurs y ont établi des camps. Au-delà de la Crevasse Perge se trouve un village enseveli sous une épaisse couche de neige. Plus loin s'élève le château du Comte Harebourg, dont les sbires poursuivent leurs activités malgré l'emprisonnement prolongé du comte sous l'effet du sort de Djaul." },
  { name: "Tour Minérale", px: 736, py: 312, size: 32, image: "Tour_minerale.webp", description: "La Tour Minérale est une structure mystérieuse apparue dans le Monde des Douze. Son origine demeure inconnue. Elle renfermerait de nombreux trésors, attirant aventuriers et convoitises. Cependant, des créatures hostiles ont émergé en son sein et menacent de se répandre à l'extérieur. Face à cette menace, la Fratrie appelle les combattants capables de contenir l'expansion des monstres et de sécuriser la tour." },
  { name: "Île de Rok", px: 1028, py: 334, size: 32, image: "ile_de_Rok.jpg", description: "Durant le Chaos d'Ogrest, les Huppermages quittèrent leur île afin de préserver leur école et leur savoir. Peu après leur départ, le cœur de l'île explosa. Malgré les sacrifices consentis, celle-ci s'écrasa dans l'océan et fut partiellement submergée. Depuis la stabilisation du monde, les Huppermages ont mis fin à leur isolement. L'École d'Huppermagie accueille désormais de nouveaux élèves désireux d'étudier leur discipline et de perpétuer leur héritage." },
  { name: "Bonta", px: 890, py: 332, size: 32, image: "Bonta.png", description: "Bonta est la cité de la justice et de l'ordre. Malgré le Chaos d'Ogrest, elle a su préserver ses valeurs fondatrices et maintenir son influence politique. Berceau de nombreux héros, elle occupe une place centrale dans l'histoire du Monde des Douze. Les Huppermages assurent la protection des institutions et des reines de Bonta. Des figures emblématiques telles que Joris, Kerubim et Atcham participent discrètement à la sécurité de la cité. Bonta demeure la plus grande ville du Monde des Douze." },
  { name: "Mont Zinit", px: 616, py: 404, size: 32, image: "Mont_zinit.jpg", description: "Le Mont Zinit est le point culminant du Monde des Douze. C'est à son sommet qu'Ogrest, fou de chagrin après la trahison de Dathura, pleure depuis des siècles — provoquant le cataclysme mondial connu sous le nom de Chaos d'Ogrest. Le Vaisseau Zinit, vestige des Éliatropes, repose à proximité de son sommet." },
  { name: "Foire du Trool", px: 1032, py: 410, size: 32, image: "Foire_au_trool.jpg", description: "La Foire du Trool est une île indépendante située à l'est de Bonta. Elle n'est rattachée à aucune des quatre nations. Elle est réputée pour ses attractions et son atmosphère festive permanente. Ses arènes accueillent régulièrement des combats spectaculaires, dont l'affrontement contre le Gladiatrool constitue l'un des événements majeurs." },
  { name: "Royaume Sadida", px: 920, py: 423, size: 32, image: "Royaume_sadida.jpg", description: "Le Royaume Sadida constitue l'un des territoires majeurs de l'Ère du Wakfu. Les Sadidas y ont établi leur communauté autour de l'Arbre de Vie, qu'ils vénèrent comme l'incarnation même de Sadida. Dirigé par la dynastie des Sheram Sharm, le royaume demeure toutefois vassal de Bonta. Amalia Sheram Sharm choisit de parcourir le monde aux côtés de la Confrérie du Tofu. En raison de la densité exceptionnelle de vie et de Wakfu présente sur son territoire, le Royaume Sadida représente un enjeu stratégique majeur." },
  { name: "Astrub", px: 1190, py: 445, size: 32, image: "Astrub.jpg", description: "Astrub constitue le point de passage incontournable des Incarnés lors de leur arrivée dans le Monde des Douze. Ancien centre majeur du culte des Douze Dieux, la cité est devenue le symbole d'une prise d'indépendance des Douziens face aux divinités. Foyer historique du mercenariat, Astrub a vu cette activité s'étendre aux autres contrées du Monde des Douze. Depuis le Chaos d'Ogrest, les mercenaires interviennent à travers le monde afin de résoudre les problématiques rencontrées par les Douziens." },
  { name: "Bibliotemple", px: 978, py: 460, size: 32, image: "Bibliotemple.png", description: "Le Bibliotemple est un sanctuaire consacré aux Mérydes. Il abrite l'une des bibliothèques les plus vastes du Monde des Douze. Le lieu est placé sous la garde de Jenry Hones Sr., membre des disciples d'Otomaï. Il constitue un centre majeur de conservation du savoir et des archives spirituelles." },
  { name: "Île des Brumes", px: 418, py: 449, size: 32, image: "Ile_des_brumes.webp", description: "L'Île des Brumes apparaît et disparaît mystérieusement à l'horizon, ne laissant derrière elle qu'une brume impénétrable. De nombreux marins ont tenté de percer son secret, sans succès. Elle attira notamment l'attention du Xélor Nox, en quête de Wakfu. L'île abriterait certaines des créatures les plus dangereuses connues du Monde des Douze." },
  { name: "Royaume Chuchoku", px: 882, py: 493, size: 32, image: "Royaume_chuchoku.jpg", description: "Le Royaume Chuchoku trouve son origine dans une expérimentation d'Osamodas depuis l'Inglorium. Un petit craqueleur, tombé d'Osamosa, vit sa taille augmenter considérablement jusqu'à devenir une masse colossale. Lors de sa chute sur le Monde des Douze, le craqueleur mourut à l'impact. Sa carcasse devint alors le socle d'un nouvel écosystème. Les Chuchoteurs, dotés d'une affinité naturelle avec les Craqueleurs, s'y installèrent et fondèrent leur royaume sur le dos même de l'entité minérale." },
  { name: "Kelba", px: 1123, py: 488, size: 32, image: "Kelba.jpg", description: "Kelba est un territoire reculé d'Amakna, réputé pour ses marchés et ses marchands ambulants. La concurrence y est intense et la présence des Riktus rend les transactions risquées. Les hauteurs de la région sont dominées par des Corbacs ayant évolué sous la forme de Kroapules." },
  { name: "Pandalousie", px: 1246, py: 492, size: 32, image: "Pandalousie.jpg", description: "La Pandalousie est une île aux reliefs montagneux et aux paysages remarquables. À l'origine dimension du plan astral, elle prit forme matérielle pour devenir une terre où le lait de bambou coule abondamment. Placée sous la surveillance du Grand Pouddah, elle attire depuis des générations les aventuriers en quête de la Vallée de la Pandalousie. Ceux qui l'ont atteinte ont marqué l'histoire." },
  { name: "Récif des Shushardes", px: 544, py: 507, size: 32, image: "Recifs_des_shushardes.jpg", description: "Le Récif des Shushardes constitue un point d'accès vers la Shukrute, dimension-prison des démons depuis le pacte de non-agression conclu avec les dix dieux du Monde des Dix. Arh Kayuh parvint à en ouvrir le passage à partir de recueils éliatropes. Les démons cherchent depuis à accroître leurs rangs en transformant des âmes en shushus. Une invasion eut lieu en l'an 982 sur l'Île des Griffes Pourpres, repoussée par la Confrérie, l'Empire sufokien et Goultard, qui vainquit Rushu dans la Shukrute." },
  { name: "Katrepat", px: 735, py: 526, size: 32, image: "Katrepat.png", description: "Katrepat est une contrée frappée par une malédiction persistante. Ses habitants sont enlevés et transformés en goules par Ombrage, un shushu majeur ayant corrompu le comte Wagnar, désormais connu sous le nom de Vampyro. Les survivants sont capturés par Viktoria-France Kenstein, qui mène des expérimentations au sein du Misolée, à l'ouest de l'île. Le maire, avec l'aide du Comptoir des Mercenaires, demeure l'un des derniers remparts face à ces disparitions." },
  { name: "Amakna", px: 1057, py: 534, size: 32, image: "Amakna.jpg", description: "Amakna est l'une des quatre grandes nations du Monde des Douze. Ses vastes plaines et forêts en font un territoire riche et fertile, berceau de nombreuses aventures. La nation est au cœur de l'histoire du Monde des Douze, abritant des lieux emblématiques comme le village natal de Yugo. Depuis le Chaos d'Ogrest, Amakna a su se relever et maintenir son rôle de puissance centrale parmi les nations." },
  { name: "Saharach", px: 1280, py: 552, size: 32, image: "Saharach.png", description: "Saharach est une île majoritairement désertique où les conditions climatiques extrêmes façonnent la survie de ses habitants. Le sable abrite de nombreuses créatures dangereuses. L'eau, ressource rare et précieuse, est devenue une malédiction pour les autochtones. Un camp d'Ouginaks est établi au nord-est. Dans les profondeurs de l'île, accessibles par un passage complexe, se trouvent des créatures fongiques redoutables ainsi qu'un temple susceptible d'abriter un trésor d'importance." },
  { name: "Brâkmar", px: 544, py: 567, size: 32, image: "Brakmar.png", description: "Brakmar est une cité bâtie sur des terres volcaniques. Son environnement hostile a façonné une culture où la force, l'ambition et la détermination priment sur la compassion. La nation valorise la puissance individuelle et l'ascension par le mérite ou par la richesse. Longtemps engagée dans des guerres sanglantes contre Bonta, Brakmar entretient aujourd'hui une rivalité davantage sportive, notamment autour du boufbawl, sport majeur du Monde des Douze." },
  { name: "Domaine Sauvage", px: 942, py: 564, size: 32, image: "Domaine_sauvage.jpg", description: "Le Domaine Sauvage est un vaste pâturage ayant conservé une faune abondante malgré les bouleversements historiques. Il est principalement peuplé de Bouftous et de Bworks ayant évolué pour survivre aux épreuves du temps. Les Bworks y ont développé une variante singulière du boufbawl, nommée Bworkball. Le territoire demeure riche en mystères et en énigmes non résolues." },
  { name: "Île Wabbit", px: 1194, py: 576, size: 32, image: "Ile_des_wabbits.jpg", description: "L'Île Wabbit est marquée par une tension croissante entre les Lenalds, établis au sud, et les Wabbits, présents dans les souterrains et au nord. Des expérimentations incontrôlées, le retour d'une antique malédiction et le vol d'une relique ont profondément perturbé l'équilibre local. Des créatures végétales hostiles ont émergé, tandis que Tal Kasha s'est installée à l'est avec son vaisseau pyramidal, modifiant durablement l'environnement de l'île." },
  { name: "Île aux Moines", px: 664, py: 617, size: 32, image: "Ile_au_moines.png", description: "L'Île aux Moines, également appelée Couvent Tripotant par certains aventuriers, est un territoire isolé marqué par une forte influence mystique. Elle est surveillée par Dhan Sominik Kraust mais demeure dominée par la Nonne du Sliptorium. Leur histoire, marquée par la trahison et la vengeance, a engendré une présence fantomatique persistante. Les moines parlent un dialecte particulier. À l'est, le Vignoble Ignoble est exploité par les Viticultistes sous l'autorité de Sydonia." },
  { name: "Île de Moon", px: 1140, py: 620, size: 32, image: "Ile_de_moon.png", description: "L'Île de Moon est occupée depuis des siècles par les Kanibouls, une tribu anthropophage hostile aux intrusions extérieures. Le territoire alterne entre une vaste plage et une jungle dense. Les Kanibouls vénèrent Moon, un singe redoutable établi au sommet de la montagne centrale. Cette créature mythique est considérée comme une entité ancienne ayant traversé les âges." },
  { name: "Ereboria", px: 1042, py: 623, size: 32, image: "Ereboria.jpg", description: "Ereboria est une île associée à un trésor légendaire. Elle est décrite comme une terre de malédictions et d'éruptions, marquée par la tristesse, les tromperies et des destins tragiques. Le trésor est gardé par Cire Momore, une entité spirituelle qui poursuit inlassablement ceux qui convoitent sa garde, jusqu'à la destruction complète de leur âme." },
  { name: "Sufokia", px: 825, py: 641, size: 32, image: "Sufokia.jpg", description: "Sufokia est une nation côtière partiellement construite sur l'eau. Son organisation repose sur l'équilibre, la technologie et l'ingéniosité. Réputée pour ses mécanismes hydrauliques et ses innovations techniques, elle incarne l'alliance entre nature et progrès. Ravagée par le Chaos d'Ogrest, Sufokia a néanmoins su se reconstruire en conservant son identité culturelle. Des rumeurs évoquent une tentative de restauration monarchique grâce aux ressources de l'Île des Griffes Pourpres." },
  { name: "Bilbyza", px: 687, py: 669, size: 32, image: "Bilbyza.jpg", description: "Bilbyza est une île profondément transformée par le Chaos d'Ogrest, qui l'a isolée du reste du monde. Ses survivants, principalement des Gelées et quelques aventuriers, ont développé une société fondée sur une fête permanente. Leur alimentation à base de Grand Glucide a progressivement modifié leur physiologie, les rapprochant des Gelées jusqu'à former un peuple hybride. L'Empereur Gelax structura cette société en instituant le Show Gelax." }
];

// Points releves depuis "map avec pts.png".
// Ils ouvrent le meme panneau que les zones Wakfu, mais restent sans contenu pour l'instant.
// Chaque point Dofus garde les coordonnees relevees sur la carte HD.
// Les points 2, 20 et 27 ont ete retires car ils ne doivent plus apparaitre.
// Les textes et images restent provisoires pendant que les fiches sont completees une par une.
// pointOriginal garde le numero donne au depart pour retrouver facilement un point plus tard.
const dofusMapZones = [
  { pointOriginal: 1, name: "Île de Nowel", px: 4179, py: 594, size: 44, image: "Île de Nowel.png", description: "" },
  { pointOriginal: 3, name: "Archipel de Valonia", px: 9026, py: 924, size: 44, description: "" },
  { pointOriginal: 4, name: "Château de Harebourg", px: 2217, py: 948, size: 34, dotSize: 14, ringSize: 26, image: "chateau de harebourg.jpg", description: "" },
  { pointOriginal: 5, name: "Saharach", px: 7418, py: 1729, size: 44, description: "" },
  { pointOriginal: 6, name: "Bonta", px: 4257, py: 2143, size: 44, image: "Bonta.png", description: "" },
  { pointOriginal: 7, name: "Atoll des Possédés", px: 9398, py: 2221, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 8, name: "Cimetière de Grobe", px: 9032, py: 2832, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 9, name: "La Bourgade", px: 1142, py: 2886, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 10, name: "Foire du Trool", px: 5781, py: 3012, size: 44, description: "" },
  { pointOriginal: 11, name: "Tainéla", px: 6549, py: 3396, size: 44, description: "" },
  { pointOriginal: 12, name: "Kolizéum", px: 5642, py: 3486, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 13, name: "Pandala", px: 7965, py: 3499, size: 44, image: "pandala.png", description: "" },
  { pointOriginal: 14, name: "Île de Rok", px: 9206, py: 3901, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 15, name: "Astrub", px: 6813, py: 4080, size: 44, description: "" },
  { pointOriginal: 16, name: "Île du Minotoror", px: 3608, py: 4099, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 17, name: "Île des Wabbits", px: 8192, py: 4596, size: 44, description: "" },
  { pointOriginal: 18, name: "Château D'Amakna", px: 6801, py: 4669, size: 44, description: "" },
  { pointOriginal: 19, name: "Port de Madrestam", px: 7178, py: 4849, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 21, name: "Village des Éleveurs", px: 5355, py: 5071, size: 44, description: "" },
  { pointOriginal: 22, name: "Île de Moon", px: 8673, py: 5365, size: 44, description: "" },
  { pointOriginal: 23, name: "Crocuzko", px: 711, py: 5436, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 24, name: "Île d'Otomaï", px: 2828, py: 5730, size: 44, description: "" },
  { pointOriginal: 25, name: "Dédale du Dark Vlad", px: 6237, py: 5827, size: 44, description: "" },
  { pointOriginal: 26, name: "Gisgoul", px: 5390, py: 5851, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 28, name: "Sufokia", px: 7485, py: 6282, size: 44, description: "" },
  { pointOriginal: 29, name: "Village des Dragoeufs", px: 6236, py: 6360, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 30, name: "Nimotopia", px: 2001, py: 6457, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 31, name: "Brâkmar", px: 4736, py: 6720, size: 44, image: "Brakmar.png", description: "" },
  { pointOriginal: 32, name: "Archipel de Vulkania", px: 2985, py: 6973, size: 44, image: "Archipel de Vulkania.png", description: "" },
  // Points ajoutes depuis t1.png. Ils utilisent le petit format comme l'Ile du Minotoror.
  { pointOriginal: 33, name: "Épaves Silencieuses", px: 3231, py: 888, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 34, name: "Roc des Salbatroces", px: 701, py: 2024, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 35, name: "Village des Kanigs", px: 6503, py: 2254, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 36, name: "Sakaï", px: 2856, py: 2873, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 37, name: "Île de Kartonpath", px: 8001, py: 5309, size: 34, dotSize: 14, ringSize: 26, description: "" },
  { pointOriginal: 38, name: "Temple des Alliances", px: 7395, py: 6704, size: 34, dotSize: 14, ringSize: 26, description: "" },
  // Point ajoute depuis t2.png sur la zone de Frigost.
  { pointOriginal: 39, name: "Île de Frigost", px: 2013, py: 2252, size: 44, description: "" }
].map(zone => ({
  ...zone,
  // Si un point a deja sa vraie image, on la garde. Sinon on affiche l'image d'attente.
  image: zone.image || "a venir.jpg",
  description: zone.description || "..."
}));

// Configuration des cartes disponibles dans le menu "Cartes interactives".
// Ajouter une nouvelle carte revient a declarer son image, ses dimensions natives et sa liste de zones.
// Config des cartes disponibles dans cette page.
const mapConfigs = {
  wakfu: {
    label: "L'ere du Wakfu",
    image: "wakfu_world_map.png",
    zoneImageFolder: "wakfu/",
    fit: "cover",
    maxScale: 2.75,
    width: 1672,
    height: 941,
    alt: "Carte du Monde des Douze durant l'ere du Wakfu",
    zones: wakfuMapZones
  },
  dofus: {
    label: "L'ere des Dofus",
    image: "map_complete_dofus_hd.jpg",
    zoneImageFolder: "dofus/",
    // Cette image reste a la racine du dossier carte interactive, contrairement aux futures images de zones.
    placeholderImage: "a venir.jpg",
    version: "v=20260502-hd",
    fit: "contain",
    renderAtNativeSize: true,
    maxScale: 8,
    width: 10000,
    height: 8000,
    alt: "Carte du Monde des Douze durant l'ere des Dofus",
    zones: dofusMapZones
  }
};

let currentMap = mapConfigs.wakfu;
let mapZones = currentMap.zones;
let mapLoadTicket = 0;

// DOM refs
const hotspotLayer    = document.getElementById('map-hotspots');
const mapStage        = document.querySelector('.map-stage');
const mapLoading      = document.getElementById('map-loading');
const mapFrame        = document.querySelector('.map-frame');
const mapViewport     = document.getElementById('map-viewport');
const mapCanvas       = document.getElementById('map-canvas');
const mapBase         = document.querySelector('.map-base');
const zoomInBtn       = document.getElementById('zoom-in');
const zoomOutBtn      = document.getElementById('zoom-out');
const zoomResetBtn    = document.getElementById('zoom-reset');
const slidePanel      = document.getElementById('slide-panel');
const slidePanelClose = document.getElementById('slide-panel-close');
const slidePanelImg   = document.getElementById('slide-panel-img');
const slidePanelImgWrap = document.getElementById('slide-panel-img-wrap');
const slidePanelTitle = document.getElementById('slide-panel-title');
const slidePanelText  = document.getElementById('slide-panel-text');

// Map state
// Etat de la carte : zoom, drag et zone active.
const mapState = {
  scale: 1, minScale: 1, maxScale: 2.75,
  x: 0, y: 0,
  dragging: false, pointerId: null, lastX: 0, lastY: 0,
  pinnedZone: null,
  activePointers: new Map(), pinchDistance: 0, pinchScale: 1
};

function getPointerDistance(a, b) { return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY); }
function getPointerCenter(a, b) { return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 }; }

// Change la carte affichee quand on arrive avec un parametre dans l URL.
function getInitialMapKey() {
  // L'index Cartes ouvre cette page avec ?era=dofus ou ?era=wakfu.
  // Sans parametre, on garde Wakfu comme carte historique par defaut.
  const era = new URLSearchParams(window.location.search).get('era');
  return mapConfigs[era] ? era : 'wakfu';
}

function setActiveMapMenuItem(mapKey) {
  // Marque visuellement l'entree du menu correspondant a la carte courante.
  document.querySelectorAll('[data-map-era]').forEach(link => {
    link.classList.toggle('active', link.dataset.mapEra === mapKey);
  });
}

function setMapLoading(isLoading) {
  mapStage.classList.toggle('is-loading', isLoading);
  if (mapLoading) mapLoading.hidden = !isLoading;
}

function waitForMapImage(image) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
  }
  return new Promise(resolve => {
    const done = () => {
      image.removeEventListener('load', done);
      image.removeEventListener('error', done);
      resolve();
    };
    image.addEventListener('load', done, { once: true });
    image.addEventListener('error', done, { once: true });
  }).then(() => image.decode ? image.decode().catch(() => {}) : undefined);
}

function waitForStableLayout() {
  return new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

async function applyMapConfig(mapKey) {
  // Change l'image principale, attend son chargement, puis recalcule le zoom et les zones.
  const loadTicket = ++mapLoadTicket;
  setMapLoading(true);
  currentMap = mapConfigs[mapKey] || mapConfigs.wakfu;
  mapZones = [];
  hotspotLayer.innerHTML = '';
  const imageUrl = mapAssetPath + currentMap.image + (currentMap.version ? `?${currentMap.version}` : '');
  mapBase.src = imageUrl;
  mapBase.alt = currentMap.alt;
  document.documentElement.dataset.mapEra = mapKey;
  document.documentElement.style.setProperty('--map-background-image', `url("${imageUrl}")`);
  document.title = `Carte - ${currentMap.label}`;
  setActiveMapMenuItem(mapKey);
  try {
    await waitForMapImage(mapBase);
    if (loadTicket !== mapLoadTicket) return;
    mapZones = currentMap.zones;
    await waitForStableLayout();
    if (loadTicket !== mapLoadTicket) return;
    resetMapView();
    refreshMapLayout();
  } finally {
    if (loadTicket === mapLoadTicket) setMapLoading(false);
  }
}

function getRenderedImageMetrics() {
  // Wakfu utilise un rendu couvrant, Dofus un rendu contenu pour voir la carte entiere de haut en bas.
  const frameRect = mapFrame.getBoundingClientRect();
  const viewportRect = mapViewport.getBoundingClientRect();
  if (currentMap.renderAtNativeSize) {
    return {
      frameRect, viewportRect, scaleX: 1, scaleY: 1,
      renderedWidth: currentMap.width,
      renderedHeight: currentMap.height,
      offsetX: 0,
      offsetY: 0
    };
  }
  const scaleMethod = currentMap.fit === 'contain' ? Math.min : Math.max;
  const scale = scaleMethod(frameRect.width / currentMap.width, frameRect.height / currentMap.height);
  const renderedWidth  = currentMap.width * scale;
  const renderedHeight = currentMap.height * scale;
  return {
    frameRect, viewportRect, scaleX: scale, scaleY: scale,
    renderedWidth, renderedHeight,
    offsetX: (frameRect.width  - renderedWidth)  / 2,
    offsetY: (frameRect.height - renderedHeight) / 2
  };
}

function getInitialMapScale() {
  // La carte Dofus reste physiquement en 10000x8000 dans le DOM pour garder sa nettete.
  // On calcule donc une echelle de depart qui la fait rentrer dans son cadre visible.
  if (!currentMap.renderAtNativeSize) return 1;
  const frameRect = mapFrame.getBoundingClientRect();
  return Math.min(frameRect.width / currentMap.width, frameRect.height / currentMap.height);
}

function syncScaleLimits(keepZoomRatio = false) {
  const previousMinScale = mapState.minScale || 1;
  const previousZoomRatio = mapState.scale / previousMinScale;
  mapState.minScale = getInitialMapScale();
  mapState.maxScale = mapState.minScale * currentMap.maxScale;
  mapState.scale = keepZoomRatio ? mapState.minScale * previousZoomRatio : mapState.minScale;
  mapState.scale = Math.min(mapState.maxScale, Math.max(mapState.minScale, mapState.scale));
}

// Slide panel
function openSlidePanel(zone) {
  // Un seul panneau sert a toutes les zones; on remplace simplement son texte et son image.
  const hasContent = Boolean(zone.name || zone.description || zone.image);
  slidePanel.classList.toggle('empty', !hasContent);
  slidePanelTitle.textContent = zone.name || '';
  slidePanelText.textContent  = zone.description || '';
  if (zone.image) {
    // Si c'est l'image d'attente, on la prend a la racine. Sinon on utilise le dossier de la carte courante.
    const imageFolder = zone.image === currentMap.placeholderImage ? '' : (currentMap.zoneImageFolder || '');
    slidePanelImg.src = mapAssetPath + imageFolder + zone.image;
    slidePanelImg.alt = zone.name;
    slidePanelImgWrap.style.display = 'block';
  } else {
    slidePanelImgWrap.style.display = 'none';
    slidePanelImg.src = '';
  }
  slidePanel.classList.add('open');
}

function closeSlidePanel() {
  slidePanel.classList.remove('open');
  slidePanel.classList.remove('empty');
  mapState.pinnedZone = null;
  document.querySelectorAll('.map-zone.active').forEach(b => b.classList.remove('active'));
}

slidePanelClose.addEventListener('click', closeSlidePanel);

// Pan/zoom
function clampPan() {
  // Evite de deplacer la carte au-dela de ses bords visibles quand elle est zoomee.
  const m = getRenderedImageMetrics();
  const maxX = Math.max(0, (m.renderedWidth  * mapState.scale - m.viewportRect.width)  / 2);
  const maxY = Math.max(0, (m.renderedHeight * mapState.scale - m.viewportRect.height) / 2);
  mapState.x = Math.min(maxX, Math.max(-maxX, mapState.x));
  mapState.y = Math.min(maxY, Math.max(-maxY, mapState.y));
}
function canPan() {
  const m = getRenderedImageMetrics();
  return m.renderedWidth * mapState.scale > m.viewportRect.width + 1
      || m.renderedHeight * mapState.scale > m.viewportRect.height + 1;
}
function applyTransform() {
  clampPan();
  const centeredNativeMap = currentMap.renderAtNativeSize ? 'translate(-50%,-50%) ' : '';
  const hotspotCounterScale = currentMap.renderAtNativeSize ? 1 / mapState.scale : 1;
  hotspotLayer.style.setProperty('--hotspot-counter-scale', hotspotCounterScale);
  mapCanvas.style.transform = `${centeredNativeMap}translate(${mapState.x}px,${mapState.y}px) scale(${mapState.scale})`;
}
function zoomMap(next) {
  mapState.scale = Math.min(mapState.maxScale, Math.max(mapState.minScale, next));
  applyTransform();
}
function zoomAroundPoint(next, cx, cy) {
  // Garde le point sous la souris/le pincement au meme endroit pendant le changement d'echelle.
  const { viewportRect } = getRenderedImageMetrics();
  const target = Math.min(mapState.maxScale, Math.max(mapState.minScale, next));
  if (target === mapState.scale) return;
  const lx = cx - viewportRect.left - viewportRect.width  / 2;
  const ly = cy - viewportRect.top  - viewportRect.height / 2;
  const r  = target / mapState.scale;
  mapState.x = (mapState.x - lx) * r + lx;
  mapState.y = (mapState.y - ly) * r + ly;
  mapState.scale = target;
  applyTransform();
}
function resetMapView() {
  syncScaleLimits();
  mapState.x = 0; mapState.y = 0;
  closeSlidePanel();
  applyTransform();
}

// Hotspots
// Cree les boutons visibles par-dessus l image de carte.
function renderHotspots() {
  // Recalcule les positions a chaque resize, car le "cover" change les offsets de l'image.
  const m = getRenderedImageMetrics();
  hotspotLayer.innerHTML = mapZones.map((zone, index) => {
    const left = m.offsetX + zone.px * m.scaleX;
    const top  = m.offsetY + zone.py * m.scaleY;
    const label = zone.name ? `<span class="map-zone-label">${zone.name}</span>` : '';
    const ariaLabel = zone.name || `Point d'interet ${index + 1}`;
    const dotSize = zone.dotSize ? `--dot-size:${zone.dotSize}px;` : '';
    const ringSize = zone.ringSize ? `--ring-size:${zone.ringSize}px;` : '';
    return `<button class="map-zone" type="button" aria-label="${ariaLabel}"
      style="left:${left}px;top:${top}px;--size:${zone.size}px;${dotSize}${ringSize}">
      ${label}
    </button>`;
  }).join('');
  document.querySelectorAll('.map-zone').forEach((btn, i) => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      document.querySelectorAll('.map-zone.active').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mapState.pinnedZone = mapZones[i];
      openSlidePanel(mapZones[i]);
    });
  });
}

function refreshMapLayout() { syncScaleLimits(true); applyTransform(); renderHotspots(); }

// Events
mapViewport.addEventListener('click', e => {
  if (!e.target.closest('.map-zone') && mapState.pinnedZone) closeSlidePanel();
});
mapViewport.addEventListener('wheel', e => {
  e.preventDefault();
  zoomAroundPoint(mapState.scale * (e.deltaY < 0 ? 1.12 : 0.9), e.clientX, e.clientY);
}, { passive: false });
mapViewport.addEventListener('pointerdown', e => {
  // Deux pointeurs passent en mode pinch; un seul pointeur sert au drag quand la carte depasse le cadre.
  mapState.activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
  if (mapState.activePointers.size === 2) {
    const [a, b] = [...mapState.activePointers.values()];
    mapState.dragging = false; mapState.pointerId = null;
    mapStage.classList.remove('dragging');
    mapState.pinchDistance = getPointerDistance(a, b);
    mapState.pinchScale = mapState.scale;
    return;
  }
  // Si on appuie sur un point, on laisse le bouton gerer son clic au lieu de lancer le deplacement de la carte.
  if (e.target.closest('.map-zone')) return;
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  if (!canPan()) return;
  e.preventDefault();
  mapState.dragging = true; mapState.pointerId = e.pointerId;
  mapState.lastX = e.clientX; mapState.lastY = e.clientY;
  mapStage.classList.add('dragging');
  mapViewport.setPointerCapture(e.pointerId);
});
mapViewport.addEventListener('pointermove', e => {
  if (mapState.activePointers.has(e.pointerId))
    mapState.activePointers.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
  if (mapState.activePointers.size === 2) {
    const [a, b] = [...mapState.activePointers.values()];
    const d = getPointerDistance(a, b);
    if (mapState.pinchDistance > 0) zoomAroundPoint(mapState.pinchScale * d / mapState.pinchDistance, ...Object.values(getPointerCenter(a, b)));
    return;
  }
  if (!mapState.dragging || e.pointerId !== mapState.pointerId) return;
  mapState.x += e.clientX - mapState.lastX;
  mapState.y += e.clientY - mapState.lastY;
  mapState.lastX = e.clientX; mapState.lastY = e.clientY;
  applyTransform();
});
function endDrag(e) {
  if (e && mapState.pointerId !== null && e.pointerId !== mapState.pointerId) { mapState.activePointers.delete(e.pointerId); return; }
  if (e) mapState.activePointers.delete(e.pointerId);
  mapState.dragging = false; mapStage.classList.remove('dragging'); mapState.pointerId = null;
  if (mapState.activePointers.size < 2) mapState.pinchDistance = 0;
}
mapViewport.addEventListener('pointerup',     endDrag);
mapViewport.addEventListener('pointercancel', endDrag);
mapViewport.addEventListener('pointerleave',  endDrag);
zoomInBtn.addEventListener('click',    () => zoomMap(mapState.scale * 1.16));
zoomOutBtn.addEventListener('click',   () => zoomMap(mapState.scale * 0.86));
zoomResetBtn.addEventListener('click', resetMapView);
mapBase.addEventListener('dragstart',  e => e.preventDefault());
window.addEventListener('resize', refreshMapLayout);
if (typeof ResizeObserver === 'function') new ResizeObserver(refreshMapLayout).observe(mapViewport);
applyMapConfig(getInitialMapKey());
