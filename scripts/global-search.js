/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/



(function () {
  const currentScript = document.currentScript;
  const siteRoot = currentScript ? new URL("../", currentScript.src) : new URL("/", window.location.href);

  const seedEntries = [
    {
      title: "Accueil",
      type: "Page",
      href: "",
      summary: "Point d'entree vers l'histoire, les personnages, les chronologies et le lexique du Krosmoz.",
      keywords: "univers krosmoz dofus wakfu waven accueil"
    },
    {
      title: "Personnages",
      type: "Page",
      href: "pages/personnages/personnages",
      summary: "Index des personnages majeurs du Krosmoz avec filtres par classe, groupe et univers.",
      keywords: "yugo adamai tristepin evangelyne ruel nox qilby oropo personnages"
    },
    {
      title: "Histoire du Krosmoz",
      type: "Histoire",
      href: "pages/histoire/histoire-krosmoz",
      summary: "Fil conducteur des grandes ères du Krosmoz, depuis les origines jusqu'à l’ère du Waven.",
      keywords: "origines âge primitif dofus wakfu waven chaos ogrest histoire"
    },
    {
      title: "Origines",
      type: "Histoire",
      href: "pages/histoire/histoire-origines",
      summary: "Naissance du Krosmoz, forces primordiales et premiers fondements du monde.",
      keywords: "origines krosmoz grand dragon grande déesse éliatrope stasis wakfu"
    },
    {
      title: "Âge des Dofus",
      type: "Histoire",
      href: "pages/histoire/histoire-age-des-dofus",
      summary: "Epoque du Monde des Douze, des Dofus primordiaux et des grandes nations.",
      keywords: "dofus monde des douze bonta brakmar amakna sufokia"
    },
    {
      title: "Chaos d'Ogrest",
      type: "Histoire",
      href: "pages/histoire/histoire-chaos-ogrest",
      summary: "Cataclysme provoque par Ogrest et bouleversements majeurs du Monde des Douze.",
      keywords: "ogrest chaos dathura mont zinit dofus"
    },
    {
      title: "Ère du Wakfu",
      type: "Histoire",
      href: "pages/histoire/histoire-ere-du-wakfu",
      summary: "Periode de la Confrerie du Tofu et des aventures de Yugo.",
      keywords: "wakfu yugo confrérie tofu éliatrope nox qilby"
    },
    {
      title: "Ère du Waven",
      type: "Histoire",
      href: "pages/histoire/histoire-ere-du-waven",
      summary: "Le monde englouti et les suites des grands bouleversements du Krosmoz.",
      keywords: "waven monde englouti krosmoz"
    },
    {
      title: "Chronologie historique",
      type: "Chronologie",
      href: "pages/chronologies/chronologie-historique",
      summary: "Frise des grands événements du Krosmoz.",
      keywords: "événements timeline âge dofus wakfu waven ogrest"
    },
    {
      title: "Chronologie des œuvres",
      type: "Chronologie",
      href: "pages/chronologies/chronologie-oeuvres",
      summary: "Parcours des séries, jeux, mangas, webtoons et autres œuvres liées au Krosmoz.",
      keywords: "œuvres ankama wakfu dofus waven manga série webtoon"
    },
    {
      title: "Lexique",
      type: "Lexique",
      href: "pages/lexique/lexique",
      summary: "Definitions des lieux, peuples, energies, objets, entites et monstres du Krosmoz.",
      keywords: "lexique definitions wakfu stasis dofus shushu"
    },
    {
      title: "Régions",
      type: "Région",
      href: "pages/regions/regions",
      summary: "Index des régions majeures du Krosmoz, des plans divins aux terres du Monde des Douze.",
      keywords: "régions lieux monde des douze mont zinit plan materiel ether arbre vagabonds pyramide ocre incarnam externam nécromonde amakna domaine sauvage kolizeum kolizéum royaume sadida montagnes koalaks kelba astrub cania bibliotemple mer d'asse ile brumes ile rok ile wabbits vulkania ile nowel crocuzko corcuzko ile minotoror bonta foire trool brakmar katrepat frigost royaume chuchoku sufokia abysses bilbyza pandala pandalousie shukrute srambad osavora enutrosor dimension obscure nimotopia valonia ereboria"
    },
    {
      title: "Plan Matériel",
      type: "Région",
      href: "pages/regions/plan-materiel",
      summary: "Immense espace physique du Krosmoz, composé de galaxies, de systèmes solaires, de planètes et de mondes habités comme le Monde des Douze.",
      keywords: "plan materiel monde physique krosmoz galaxies systemes solaires planetes monde des douze dofus primordiaux wakfu terraformation"
    },
    {
      title: "Mont Zinit",
      type: "Région",
      href: "pages/regions/mont-zinit",
      summary: "Plus haute montagne du Monde des Douze, dissimulant le Vaisseau Zinit et liée aux Éliatropes, à Ogrest et au Chaos d’Ogrest.",
      keywords: "mont zinit vaisseau zinit ogrest dathura chaos ogrest yugo tristepin otomai goultard éliatrope dofus éliatropes plage zinit slek smare phorreur shukrute"
    },
    {
      title: "Ether",
      type: "Région",
      href: "pages/regions/ether",
      summary: "Plan Éthéré entre le Plan Astral et le Plan Matériel, espace de transition abritant la Pyramide Ocre et l’Arbre des Vagabonds.",
      keywords: "ether plan ethere plan astral plan materiel lumes lemures pyramide ocre arbre des vagabonds prosperus bivoak kaliptus"
    },
    {
      title: "Arbre des Vagabonds",
      type: "Région",
      href: "pages/regions/arbre-vagabonds",
      summary: "Immense Kaliptus perdu au cœur de l’Ether, refuge mystique et halte protectrice pour les voyageurs du Krosmoz.",
      keywords: "arbre des vagabonds ether kaliptus grand arbre bivoak koalak voyageurs dimensions refuge krosmoz"
    },
    {
      title: "Pyramide Ocre",
      type: "Région",
      href: "pages/regions/pyramide-ocre",
      summary: "Structure mystique dérivant dans l’Ether, construite par Prosperus Elementor afin d’y sceller une Particule de Vide.",
      keywords: "pyramide ocre ether prosperus elementor particule de vide balance krosmique omnirune huppermage dame jhessica saharach portail"
    },
    {
      title: "Montagnes des Koalaks",
      type: "Région",
      href: "pages/regions/montagnes-koalaks",
      summary: "Massif sauvage du continent amaknéen, habité par les Koalaks et marqué par les forêts de Kaliptus, les Dragodindes et une faune incontrôlable.",
      keywords: "montagnes koalaks koalak kaliptus amakna canyon sauvage cimetiere primitif lacs enchantes foret kaliptus village eleveurs dragodindes crocodailles"
    },
    {
      title: "Foire du Trool",
      type: "Région",
      href: "pages/regions/foire-du-trool",
      summary: "Immense fête foraine de Cania créée par Léonzi Trool, célèbre pour ses attractions, ses jeux, le Gladiatrool et son accès au Monde de Nowel.",
      keywords: "foire trool foire du trool cania leonzi trool gladiatrool monde nowel attractions roulette bouftou course larves tofu smash koin koins boostache academie trool bonta"
    },
    {
      title: "Plaines de Cania",
      type: "Région",
      href: "pages/regions/cania",
      summary: "Vaste territoire situé entre Bonta, Astrub et les Landes de Sidimote, composé de plaines, de massifs rocheux, de villages isolés et de zones sauvages.",
      keywords: "cania plaines de cania lac champs porkass pics massif landes bois litneg bonta astrub sidimote kanigs dopeuls brigandins foire trool blops vetaurans malles outillees"
    },
    {
      title: "Bibliotemple",
      type: "Région",
      href: "pages/regions/bibliotemple",
      summary: "Sanctuaire consacré aux Mérydes dans la Plaine des Porkass, abritant l’Almanax et d’immenses archives spirituelles du Monde des Douze.",
      keywords: "bibliotemple merydes mérydes almanax mage ax theodoran ax yacinthe ax vermo xanamla jenry hones porkass saisons sanctuaire calendrier"
    },
    {
      title: "Domaine Sauvage",
      type: "Région",
      href: "pages/regions/domaine-sauvage",
      summary: "Immense pâturage vivant et hostile, peuplé de Bouftous, de Bworks, de ruines anciennes et de mystères non résolus.",
      keywords: "domaine sauvage paturage bouftous bworks bworkball boufbawl ruines mysteres enigmes monde des douze faune hostile"
    },
    {
      title: "Kolizéum",
      type: "Région",
      href: "pages/regions/kolizeum",
      summary: "Infrastructure majeure du PvP dans Dofus, dédiée aux combats équilibrés, aux ligues, à la cote et aux Kolizétons.",
      keywords: "kolizeum kolizéum pvp dofus combat joueurs trois contre trois cote ligues saisons kolizetons kolizétons galets arene arène tactique"
    },
    {
      title: "Royaume Sadida",
      type: "Région",
      href: "pages/regions/royaume-sadida",
      summary: "Royaume apparu après le Chaos d’Ogrest, construit autour de l’Arbre de Vie et marqué par la famille Sheran Sharm, Nox, les Nécromes et la Corruption.",
      keywords: "royaume sadida arbre de vie arbre de mort sheran sharm amalia armant aurora yugo nox wakfu harebourg ogrest nécromes eliasphere eliocalypse corruption stasis cavalier"
    },
    {
      title: "Île des Brumes",
      type: "Région",
      href: "pages/regions/ile-des-brumes",
      summary: "Île énigmatique entourée de légendes maritimes, de ruines antiques, de vestiges éliatropes et de secrets liés à Nox.",
      keywords: "ile des brumes brumes nox xelor éliatropes vestiges éliatropes nuit ebene ruines antiques brouillard ile inconnue donjons village maritime"
    },
    {
      title: "Île de Rok",
      type: "Région",
      href: "pages/regions/ile-de-rok",
      summary: "Sanctuaire huppermage isolé après les persécutions de l’an 567, abritant le Temple de l’Équilibre, une école d’Huppermagie et des savoirs magiques.",
      keywords: "ile de rok rok huppermages huppermagie temple equilibre forgemagie amakna gobernic chuchoteur chulien prosperus elementor chaos ogrest portail colosse pierre"
    },
    {
      title: "Royaume Chuchoku",
      type: "Région",
      href: "pages/regions/royaume-chuchoku",
      summary: "Royaume fondé par les Chuchoteurs sur la carcasse d’un gigantesque Craqueleur, entre falaises minérales, Mansots, Gloursons et échos de Frigost.",
      keywords: "royaume chuchoku chuchoteurs craqueleur osamodas osamosa inglorium mansots gloursons frigost mont torrideau banquise ecosystème carcasse colosse"
    },
    {
      title: "Kelba",
      type: "Région",
      href: "pages/regions/kelba",
      summary: "Territoire indépendant entre Amakna et Astrub, réputé pour son marché, ses Corbacs, ses Kroapules, Chez Kabrok et les attaques de bandits.",
      keywords: "kelba amakna astrub clan magik riktus kroapules corbacs kabrok miranda chez kabrok corbeau noir guilde chasseurs landes pics port contrebandiers marchands"
    },
    {
      title: "Incarnam",
      type: "Région",
      href: "pages/regions/incarnam",
      summary: "Plan spirituel suspendu au-dessus du Monde des Douze, où les âmes viennent s'incarner ou se réincarner avant de rejoindre le monde matériel.",
      keywords: "incarnam prysmaradoth ames incarnation reincarnation astrub kardorim hargnok milimulou ternette nhin kerubims kerubim crepin"
    },
    {
      title: "Externam",
      type: "Région",
      href: "pages/regions/externam",
      summary: "Royaume des morts où reposent les âmes ayant achevé leur cycle de réincarnation dans le Krosmoz.",
      keywords: "externam thanatena royaume morts ames reincarnation shukrute frigost belvedere ilyzaelle sentinelle eternelle hall des valeureux"
    },
    {
      title: "Nécromonde",
      type: "Région",
      href: "pages/regions/necromonde",
      summary: "Planète mourante vidée de son Wakfu, royaume de Toross Mordal et prison de la Grande Déesse Éliatrope.",
      keywords: "nécromonde toross mordal nécromes wakfu grande déesse éliatrope nora efrim dofus planete mourante"
    },
    {
      title: "Srambad",
      type: "Région",
      href: "pages/regions/srambad",
      summary: "Cité du mal associée au Dieu Sram, royaume des criminels, assassins et conspirateurs.",
      keywords: "srambad sram cite du mal reine des voleurs gein catacombres necrotiques haut tenebreux cour sombre venome dieu sram"
    },
    {
      title: "Osavora",
      type: "Région",
      href: "pages/regions/osavora",
      summary: "Dimension sauvage liée au Dieu Osamodas, située sur le dos de Gargandyas et dominée par la loi de la prédation.",
      keywords: "osavora osamodas gargandyas osavane rhoarims zarbivores kabombz osamandyas reprouve"
    },
    {
      title: "Enutrosor",
      type: "Région",
      href: "pages/regions/enutrosor",
      summary: "Royaume du Dieu Enutrof, coffre-fort céleste rempli d'or, de kamas, de mines et de confréries vouées à la richesse.",
      keywords: "enutrosor enutrof kamas or trésor quatrieme dimension koffrefors phorreurs phossile roi nidas reine des voleurs"
    },
    {
      title: "Dimension Obscure",
      type: "Région",
      href: "pages/regions/dimension-obscure",
      summary: "Dimension hostile plongée dans les ténèbres, royaume d’Ombre, des Obscuranti, de l’Obscurantis et de la Pyramide d’Ombre.",
      keywords: "dimension obscure ombre ereziah melkewel obscuranti obscurantis pyramide d'ombre multiman harebourg frigost sylargh tenebres corruption plan hostile"
    },
    {
      title: "Katrepat",
      type: "Région",
      href: "pages/regions/katrepat",
      summary: "Village maudit des Landes de Sidimote, plongé dans une nuit éternelle et marqué par les Vampyres, les goules et les Shushus.",
      keywords: "katrepat landes sidimote vampyre vampyro ombrage anerice shushu shushess goules rubilaxia chauffes souris"
    },
    {
      title: "Île aux Moines",
      type: "Région",
      href: "pages/regions/ile-aux-moines",
      summary: "Terre fermée entre Brâkmar et Sufokia, surnommée le Couvent Tripotant et hantée par des fantômes, des moines hostiles et des malédictions.",
      keywords: "ile aux moines couvent tripotant dhan sominik kraust nonne sliptorium ratacombes vignoble ignoble viticultistes sydonia brakmar sufokia fantomes"
    },
    {
      title: "Pandalousie",
      type: "Région",
      href: "pages/regions/pandalousie",
      summary: "Contrée légendaire pandalienne, paradis caché de bambous, de sérénité et d’abondance revenu des brumes durant l’ère du Wakfu.",
      keywords: "pandalousie pandala pandalien ginju pouddah shun gokong zang zang bambou lait de bambou plantalas pandissidans fleopards"
    },
    {
      title: "Mer d'Asse",
      type: "Région",
      href: "pages/regions/mer-dasse",
      summary: "Grande étendue maritime du Monde des Douze reliant Amakna, Sufokia, Pandala, Saharach, l’Île de Moon et des mystères engloutis.",
      keywords: "mer d'asse mer asse sufokia abysses temple éliotrope ile moon wabbits kartonpath pandala saharach aguabrial madrestam sarakech osakwa"
    },
    {
      title: "Abysses de Sufokia",
      type: "Région",
      href: "pages/regions/abysses-sufokia",
      summary: "Territoire englouti sous Sufokia, peuplé de ruines steamer, de Trithons, de créatures abyssales et de secrets antiques.",
      keywords: "abysses sufokia abysse mer d'asse steamers technomagie scaphandre trithons rlyugluglu temple éliotrope ruines englouties muldos"
    },
    {
      title: "Île des Wabbits",
      type: "Région",
      href: "pages/regions/ile-wabbits",
      summary: "Archipel de la Mer d’Asse envahi par le Wa Wabbit, ancien royaume des Lenalds devenu un territoire de Cawottes, de laboratoires et de donjons absurdes.",
      keywords: "ile wabbits wa wabbit lenalds cawotte madrestam lily myxomawose wobots tal kasha dofus ivoire weine potorose legumutants"
    },
    {
      title: "Archipel de Vulkania",
      type: "Région",
      href: "pages/regions/vulkania",
      summary: "Destination estivale volcanique ouverte entre Joullier et Fraouctor, liée à Grozilla, Grasmera, l'Agence Touriste et aux expéditions du Monde des Douze.",
      keywords: "vulkania archipel vulkania grozilla grasmera agence touriste joullier fraouctor volcan sous marin dragons dragoeufs dragœufs ile nowel plages tropicales ete estivale"
    },
    {
      title: "Île de Nowel",
      type: "Région",
      href: "pages/regions/ile-nowel",
      summary: "Destination hivernale saisonnière au nord-ouest d’Amakna, liée à Nicolas Nowel, Papa Nowel, Grozilla, Grasmera et aux Krokilles.",
      keywords: "ile nowel île nowel nicolas nowel papa nowel descendre javian amakna frigost djaul mer kantil grozilla grasmera krokilles novamaire neige hiver"
    },
    {
      title: "Crocuzko",
      type: "Région",
      href: "pages/regions/crocuzko",
      summary: "Île énigmatique absente des cartes amaknéennes, plongée dans une nuit éternelle et liée à des mystères temporels.",
      keywords: "crocuzko corcuzko ile mystérieuse cartes amakneennes portails magiques voyage temps nuit eternelle panthéon cultes vestiges phénomènes temporels"
    },
    {
      title: "Île du Minotoror",
      type: "Région",
      href: "pages/regions/ile-minotoror",
      summary: "Île mystérieuse à l’ouest du continent amaknéen, connue pour le Labyrinthe du Minotoror, le Minotoror, le Minotot et les rumeurs autour du Dofus Pourpre.",
      keywords: "ile minotoror île minotoror labyrinthe minotoror minotot dofus pourpre amakna sanctuaire antique dedale pièges salles secretes trésors"
    },
    {
      title: "Ereboria",
      type: "Région",
      href: "pages/regions/ereboria",
      summary: "Île maudite de l’Archipel de Valonia, dominée par un volcan et hantée par des morts-vivants liés à une ancienne malédiction.",
      keywords: "ereboria valonia albuera selma reen morts vivants malediction bourreau des dieux nascherite ephèdre cire momore marteaux aigris nimbos volcan"
    },
    {
      title: "Bilbyza",
      type: "Région",
      href: "pages/regions/bilbyza",
      summary: "Île tropicale au sud de Sufokia, transformée par le Grand Glucide après le Chaos d’Ogrest et entièrement tournée vers la fête.",
      keywords: "bilbyza sufokia gelee gelees gelax bilby king grand glucide chaos ogrest show gelax arene dansante palais marin gelaxieme dimension"
    },
    {
      title: "Nimotopia",
      type: "Région",
      href: "pages/regions/nimotopia",
      summary: "Île sanctuaire de Coqueline destinée à protéger les espèces animales et végétales les plus rares du Monde des Douze.",
      keywords: "nimotopia coqueline sanctuaire animalier chassouilleurs animaux especes rares ile otomai osamodas refuge arche"
    },
    {
      title: "Jeux",
      type: "Page",
      href: "pages/jeux/jeux",
      summary: "Index des jeux du site : test de personnage et grand quiz aleatoire du Krosmoz.",
      keywords: "jeux quiz jeu personnage krosmoz questions score"
    },
    {
      title: "Grand quiz du Krosmoz",
      type: "Jeu",
      href: "pages/jeux/quiz-krosmoz",
      summary: "Quiz aleatoire avec questions sur les personnages, l'histoire, les lieux, les objets, les peuples et le lexique.",
      keywords: "quiz krosmoz questions aleatoire personnages histoire lieux dofus wakfu waven"
    },
    {
      title: "Jeu personnage",
      type: "Jeu",
      href: "pages/jeux/jeu-personnage",
      summary: "Test pour decouvrir quel personnage du Krosmoz vous ressemble le plus.",
      keywords: "jeu personnage personnage resultat yugo nox amalia tristepin"
    },
    {
      title: "À propos",
      type: "Page",
      href: "pages/about/a-propos",
      summary: "Présentation du site Univers Krosmoz, de Zaki et des sources utilisées pour documenter les articles.",
      keywords: "a propos zaki sources ankama allskreen wiki role play dofus krosmoz otakia"
    },
    {
      title: "Contactez-nous",
      type: "Page",
      href: "pages/contact/contact",
      summary: "Formulaire de contact pour signaler une erreur, proposer une correction ou envoyer un message.",
      keywords: "contact message formulaire correction suggestion univers krosmoz"
    }
  ];

  const normalize = (value) => (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019]/g, "")
    .toLowerCase();

  const absoluteHref = (href) => new URL(href, siteRoot).href;
  const compactText = (text, maxLength = 170) => {
    const compact = (text || "").replace(/\s+/g, " ").trim();
    if (compact.length <= maxLength) return compact;
    return `${compact.slice(0, maxLength).trim()}...`;
  };

  const setSearchMessage = (resultsContainer, className, text) => {
    resultsContainer.replaceChildren();
    const message = document.createElement("p");
    message.className = className;
    message.textContent = text;
    resultsContainer.append(message);
  };

  const safeSearchHref = (href) => {
    try {
      const url = new URL(href, window.location.href);
      return ["http:", "https:", "file:"].includes(url.protocol) ? url.href : "#";
    } catch (error) {
      return "#";
    }
  };

  const slugify = (value) => normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const contextualTerms = new Set([
    "d",
    "dans",
    "de",
    "des",
    "du",
    "groupe",
    "groupes",
    "l",
    "la",
    "le",
    "les",
    "personnage",
    "personnages"
  ]);

  const getSearchTerms = (query) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length <= 1) return terms;

    const filteredTerms = terms.filter((term) => !contextualTerms.has(term));
    return filteredTerms.length ? filteredTerms : terms;
  };

  const textIncludesTerm = (text, term) => {
    if (!term) return true;
    if (text.includes(term)) return true;
    if (term.endsWith("s") && term.length > 3 && text.includes(term.slice(0, -1))) return true;
    return false;
  };

  const readDocument = async (href) => {
    const response = await fetch(absoluteHref(href), { cache: "force-cache" });
    if (!response.ok) throw new Error(`Impossible de charger ${href}`);
    const html = await response.text();
    return new DOMParser().parseFromString(html, "text/html");
  };

  const createBaseEntries = () => seedEntries.map((entry) => ({
    ...entry,
    href: absoluteHref(entry.href),
    searchText: normalize(`${entry.title} ${entry.type} ${entry.summary} ${entry.keywords || ""}`)
  }));

  const getStaticSearchEntries = () => {
    if (!Array.isArray(window.KROSMOZ_SEARCH_DATA)) {
      return [];
    }

    return window.KROSMOZ_SEARCH_DATA.map((entry) => ({
      title: entry.title,
      type: entry.type,
      href: absoluteHref(entry.href),
      summary: entry.type === "Personnage" ? `Fiche biographique - ${entry.summary || ""}` : entry.summary || "",
      searchText: normalize(`${entry.title} ${entry.type} ${entry.summary || ""} ${entry.keywords || ""}`)
    }));
  };

  const buildCharacterEntries = async () => {
    const doc = await readDocument("pages/personnages/personnages");
    return Array.from(doc.querySelectorAll(".character-card")).map((card) => {
      const title = card.querySelector("strong")?.textContent || card.querySelector("img")?.alt || "Personnage";
      const rôle = card.querySelector(".character-card-copy span")?.textContent || card.dataset.classLabel || "";
      const groups = (card.dataset.groupLabel || "").replace(/\|\|/g, ", ");
      const universes = (card.dataset.universeLabel || "").replace(/\|\|/g, ", ");
      const summaryParts = [rôle, groups, universes].filter(Boolean);
      const summary = summaryParts.length ? `Fiche biographique - ${summaryParts.join(" - ")}` : "Fiche biographique du Krosmoz.";

      return {
        title,
        type: "Personnage",
        href: absoluteHref(`pages/personnages/${card.getAttribute("href")}`),
        summary,
        searchText: normalize(`${title} ${rôle} ${groups} ${universes} ${card.dataset.character || ""}`)
      };
    });
  };

  const buildLexiconEntries = async () => {
    const doc = await readDocument("pages/lexique/lexique");
    return Array.from(doc.querySelectorAll(".lexicon-entry")).map((entry) => {
      const title = entry.querySelector("h2")?.textContent || "Entree du lexique";
      const category = entry.querySelector(".lexicon-entry-type")?.textContent || "Lexique";
      const summary = compactText(entry.querySelector("p")?.textContent || "");

      return {
        title,
        type: `Lexique - ${category}`,
        href: absoluteHref(`pages/lexique/lexique?q=${encodeURIComponent(title)}#${slugify(title)}`),
        summary,
        searchText: normalize(`${title} ${category} ${entry.dataset.search || ""} ${summary}`)
      };
    });
  };

  let indexPromise;
  const loadIndex = () => {
    if (!indexPromise) {
      indexPromise = Promise.allSettled([
        Promise.resolve(createBaseEntries()),
        Promise.resolve(getStaticSearchEntries()),
        buildCharacterEntries(),
        buildLexiconEntries()
      ]).then((groups) => {
        const entries = groups.flatMap((group) => group.status === "fulfilled" ? group.value : []);
        const seen = new Set();
        return entries.filter((entry) => {

          const key = `${entry.type}|${entry.title}|${entry.href}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      });
    }
    return indexPromise;
  };

  const createSearchStyle = () => {
    if (document.getElementById("krosmoz-global-search-style")) return;

    const style = document.createElement("style");
    style.id = "krosmoz-global-search-style";
    style.textContent = `
      .krosmoz-global-search {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin-left: auto;
        flex-shrink: 0;
      }

      .site-topbar .krosmoz-global-search + .krosmoz-top-social-links {
        margin-left: 0;
      }

      .krosmoz-search-toggle {
        width: 38px;
        height: 38px;
        display: inline-grid;
        place-items: center;
        border: 1px solid transparent;
        background: transparent;
        color: #f6f2e7;
        cursor: pointer;
        box-shadow: none;
        transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, filter 0.2s ease, transform 0.2s ease;
      }

      .krosmoz-search-toggle:hover,
      .krosmoz-search-toggle:focus-visible {
        color: var(--gold-light, #e8c97a);
        border-color: rgba(232,201,122,0.38);
        background: rgba(255,247,223,0.035);
        filter: brightness(1.16);
        transform: translateY(-1px);
        outline: none;
      }

      .krosmoz-search-toggle svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      .krosmoz-search-layer {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding: clamp(4rem, 12vh, 7rem) 1rem 2rem;
        background: rgba(3, 3, 8, 0.72);
        backdrop-filter: blur(8px);
      }

      .krosmoz-search-layer.is-open {
        display: flex;
      }

      .krosmoz-search-panel {
        width: min(760px, 100%);
        max-height: min(720px, calc(100dvh - 6rem));
        display: grid;
        grid-template-rows: auto 1fr;
        border: 1px solid rgba(201,168,76,0.28);
        background: rgba(10, 10, 17, 0.98);
        box-shadow: 0 28px 80px rgba(0,0,0,0.58);
      }

      .krosmoz-search-head {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 0.75rem;
        padding: 0.85rem;
        border-bottom: 1px solid rgba(201,168,76,0.18);
      }

      .krosmoz-search-field {
        min-width: 0;
        width: 100%;
        padding: 0.85rem 1rem;
        border: 1px solid rgba(201,168,76,0.22);
        background: rgba(255,255,255,0.04);
        color: #f8f1df;
        font: 600 1rem/1.2 'Cinzel', serif;
        letter-spacing: 0;
        outline: none;
      }

      .krosmoz-search-field:focus {
        border-color: rgba(232,201,122,0.7);
        box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
      }

      .krosmoz-search-close {
        width: 44px;
        height: 44px;
        border: 1px solid rgba(201,168,76,0.2);
        background: transparent;
        color: #f6f2e7;
        font: 600 1.2rem/1 'Cinzel', serif;
        cursor: pointer;
      }

      .krosmoz-search-close:hover,
      .krosmoz-search-close:focus-visible {
        color: var(--gold-light, #e8c97a);
        background: rgba(201,168,76,0.08);
        outline: none;
      }

      .krosmoz-search-results {
        overflow: auto;
        padding: 0.45rem;
      }

      .krosmoz-search-empty,
      .krosmoz-search-loading {
        padding: 1.3rem;
        color: var(--text-muted, #a99d88);
        font-size: 1rem;
        text-align: center;
      }

      .krosmoz-search-group {
        padding: 0.45rem 0.35rem 0.25rem;
      }

      .krosmoz-search-group-title {
        padding: 0.4rem 0.5rem;
        color: var(--gold-light, #e8c97a);
        font: 700 0.72rem/1.2 'Cinzel', serif;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .krosmoz-search-result {
        display: block;
        padding: 0.82rem 0.9rem;
        border: 1px solid transparent;
        color: var(--text-main, #e8e0d0);
        text-decoration: none;
      }

      .krosmoz-search-result:hover,
      .krosmoz-search-result:focus-visible,
      .krosmoz-search-result.is-active {
        border-color: rgba(201,168,76,0.22);
        background: rgba(201,168,76,0.08);
        outline: none;
      }

      .krosmoz-search-result strong {
        display: block;
        color: #fff7df;
        font: 700 0.92rem/1.25 'Cinzel', serif;
        letter-spacing: 0;
      }

      .krosmoz-search-result span {
        display: block;
        margin-top: 0.25rem;
        color: var(--text-muted, #a99d88);
        font-size: 0.95rem;
        line-height: 1.35;
      }

      @media (max-width: 1024px) {
        .site-topbar {
          flex-wrap: wrap;
        }

        .krosmoz-global-search {
          margin-left: 0 !important;
          order: 2 !important;
          justify-self: end;
        }

        .site-topbar .krosmoz-global-search + .krosmoz-top-social-links {
          display: none !important;
        }

        .krosmoz-search-panel {
          max-height: calc(100dvh - 3rem);
        }
      }
    `;
    document.head.append(style);
  };

  const scoreEntry = (entry, terms) => {
    const title = normalize(entry.title);
    const priorityByType = {
      Personnage: 24,
      Lexique: 22,
      Région: 18,
      Page: 4,
      Histoire: 3,
      Carte: 2,
      Chronologie: 1
    };
    let score = 0;
    const typeRoot = entry.type.split(" - ")[0];
    score += priorityByType[typeRoot] || 0;

    terms.forEach((term) => {
      if (title === term) score += typeRoot === "Personnage" ? 160 : 80;
      else if (title.startsWith(term)) score += 45;
      else if (title.includes(term)) score += 25;
      if (textIncludesTerm(entry.searchText, term)) score += 10;
    });

    return score;
  };

  const renderResults = (resultsContainer, entries, query) => {
    const terms = getSearchTerms(query);
    if (!terms.length) {
      setSearchMessage(resultsContainer, "krosmoz-search-empty", "Tapez un personnage ou un mot du lexique.");
      return;
    }

    const results = entries
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter((result) => {
        if (result.score <= 0) return false;
        const title = normalize(result.entry.title);
        return terms.every((term) => textIncludesTerm(result.entry.searchText, term) || textIncludesTerm(title, term));
      })
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "fr"))
      .slice(0, 24)
      .map((result) => result.entry);

    if (!results.length) {
      setSearchMessage(resultsContainer, "krosmoz-search-empty", "Aucun resultat trouve.");
      return;
    }

    const grouped = results.reduce((groups, entry) => {
      const key = entry.type.split(" - ")[0];
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
      return groups;
    }, new Map());

    const sections = Array.from(grouped.entries()).map(([type, groupEntries]) => {
      const section = document.createElement("section");
      section.className = "krosmoz-search-group";
      section.setAttribute("aria-label", type);

      const title = document.createElement("h2");
      title.className = "krosmoz-search-group-title";
      title.textContent = type;
      section.append(title);

      groupEntries.forEach((entry) => {
        const link = document.createElement("a");
        link.className = "krosmoz-search-result";
        link.href = safeSearchHref(entry.href);

        const name = document.createElement("strong");
        name.textContent = entry.title;

        const summary = document.createElement("span");
        summary.textContent = entry.summary || entry.type;

        link.append(name, summary);
        section.append(link);
      });

      return section;
    });

    resultsContainer.replaceChildren(...sections);
  };

  const mountGlobalSearch = () => {
    const topbar = document.querySelector(".site-topbar");
    if (!topbar || document.querySelector(".krosmoz-global-search")) return;

    createSearchStyle();

    const searchMount = document.createElement("div");
    searchMount.className = "krosmoz-global-search";
    searchMount.innerHTML = `
      <button class="krosmoz-search-toggle" type="button" aria-label="Ouvrir la recherche" title="Rechercher">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.8 4a6.8 6.8 0 1 0 4.2 12.1l3.9 3.9 1.1-1.1-3.9-3.9A6.8 6.8 0 0 0 10.8 4Zm0 1.6a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Z"/></svg>
      </button>
    `;

    const language = topbar.querySelector(".krosmoz-language");
    const contact = topbar.querySelector(".krosmoz-header-contact");
    const socials = topbar.querySelector(".krosmoz-top-social-links");
    if (contact) {
      topbar.insertBefore(searchMount, contact);
    } else if (language) {
      topbar.insertBefore(searchMount, language);
    } else if (socials) {
      topbar.insertBefore(searchMount, socials);
    } else {
      topbar.append(searchMount);
    }

    const layer = document.createElement("div");
    layer.className = "krosmoz-search-layer";
    layer.setAttribute("role", "dialog");
    layer.setAttribute("aria-modal", "true");
    layer.setAttribute("aria-label", "Recherche globale");
    layer.innerHTML = `
      <div class="krosmoz-search-panel">
        <div class="krosmoz-search-head">
          <input class="krosmoz-search-field" type="search" autocomplete="off" placeholder="Personnage ou mot du lexique">
          <button class="krosmoz-search-close" type="button" aria-label="Fermer la recherche">×</button>
        </div>
        <div class="krosmoz-search-results" aria-live="polite">
          <p class="krosmoz-search-loading">Chargement de l'index...</p>
        </div>
      </div>
    `;
    document.body.append(layer);

    const toggle = searchMount.querySelector(".krosmoz-search-toggle");
    const input = layer.querySelector(".krosmoz-search-field");
    const close = layer.querySelector(".krosmoz-search-close");
    const resultsContainer = layer.querySelector(".krosmoz-search-results");
    let entries = [];

    const openSearch = async () => {
      layer.classList.add("is-open");
      document.body.style.overflow = "hidden";
      window.setTimeout(() => input.focus(), 0);

      if (!entries.length) {
        setSearchMessage(resultsContainer, "krosmoz-search-loading", "Chargement de l'index...");
        entries = await loadIndex();
        renderResults(resultsContainer, entries, input.value);
      }
    };

    const closeSearch = () => {
      layer.classList.remove("is-open");
      document.body.style.overflow = "";
      toggle.focus();
    };

    toggle.addEventListener("click", openSearch);
    close.addEventListener("click", closeSearch);
    layer.addEventListener("click", (event) => {
      if (event.target === layer) closeSearch();
    });

    input.addEventListener("input", () => renderResults(resultsContainer, entries, input.value));
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const firstResult = resultsContainer.querySelector(".krosmoz-search-result");
      if (firstResult) firstResult.click();
    });

    document.addEventListener("keydown", (event) => {
      const activeTag = document.activeElement?.tagName;
      const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag) || document.activeElement?.isContentEditable;

      if (event.key === "Escape" && layer.classList.contains("is-open")) {
        event.preventDefault();
        closeSearch();
      }

      if (event.key === "/" && !isTyping && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        openSearch();
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountGlobalSearch, { once: true });
  } else {
    mountGlobalSearch();
  }
}());
