/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/



(function () {
  const characters = [
    {
      "name": "Adamaï",
      "href": "adamai"
    },
    {
      "name": "Aerafal",
      "href": "aerafal"
    },
    {
      "name": "Agard",
      "href": "agard"
    },
    {
      "name": "Aguabrial",
      "href": "aguabrial"
    },
    {
      "name": "Alibert",
      "href": "alibert"
    },
    {
      "name": "Allister",
      "href": "allister"
    },
    {
      "name": "Amalia Sheran Sharm",
      "href": "amalia-sheran-sharm"
    },
    {
      "name": "Anathar",
      "href": "anathar"
    },
    {
      "name": "Armant Sheran Sharm",
      "href": "armant-sheran-sharm"
    },
    {
      "name": "Arpagone",
      "href": "arpagone"
    },
    {
      "name": "Arty",
      "href": "arty"
    },
    {
      "name": "Atcham Crépin",
      "href": "atcham-crepin"
    },
    {
      "name": "Atone",
      "href": "atone"
    },
    {
      "name": "Aurora",
      "href": "aurora"
    },
    {
      "name": "Bakara Jurgen",
      "href": "bakara-jurgen"
    },
    {
      "name": "Balance Krosmique",
      "href": "balance-krosmique"
    },
    {
      "name": "Baltazar",
      "href": "balthazar"
    },
    {
      "name": "Belladone",
      "href": "belladone"
    },
    {
      "name": "Biste",
      "href": "biste"
    },
    {
      "name": "Bolgrot",
      "href": "bolgrot"
    },
    {
      "name": "Bordegann",
      "href": "bordegann"
    },
    {
      "name": "Bouillon",
      "href": "bouillon"
    },
    {
      "name": "Brumaire",
      "href": "brumaire"
    },
    {
      "name": "Bump",
      "href": "bump"
    },
    {
      "name": "Cadence",
      "href": "cadence"
    },
    {
      "name": "Chaille",
      "href": "chaille"
    },
    {
      "name": "Chêne Mou",
      "href": "chene-mou"
    },
    {
      "name": "Chevalier Justice",
      "href": "chevalier-justice"
    },
    {
      "name": "Chibi",
      "href": "chibi"
    },
    {
      "name": "Cire Momore",
      "href": "cire-momore"
    },
    {
      "name": "Cléophée",
      "href": "cleophee"
    },
    {
      "name": "Comte Harebourg",
      "href": "comte-harebourg"
    },
    {
      "name": "Coqueline",
      "href": "coqueline"
    },
    {
      "name": "Corbeau Noir",
      "href": "corbeau-noir"
    },
    {
      "name": "Cornu Mollu",
      "href": "cornu-mollu"
    },
    {
      "name": "Dame Echo",
      "href": "echo"
    },
    {
      "name": "Dardondakal",
      "href": "dardondakal"
    },
    {
      "name": "Dark Vlad",
      "href": "dark-vlad"
    },
    {
      "name": "Dathura",
      "href": "dathura"
    },
    {
      "name": "Déesse Cra",
      "href": "deesse-cra"
    },
    {
      "name": "Déesse Eniripsa",
      "href": "deesse-eniripsa"
    },
    {
      "name": "Déesse Féca",
      "href": "deesse-feca"
    },
    {
      "name": "Déesse Panda",
      "href": "deesse-panda"
    },
    {
      "name": "Déesse Sacrieur",
      "href": "deesse-sacrieur"
    },
    {
      "name": "Desperia",
      "href": "desperia"
    },
    {
      "name": "Dieu Écaflip",
      "href": "dieu-ecaflip"
    },
    {
      "name": "Dieu Enutrof",
      "href": "dieu-enutrof"
    },
    {
      "name": "Dieu Iop",
      "href": "dieu-iop"
    },
    {
      "name": "Dieu Osamodas",
      "href": "dieu-osamodas"
    },
    {
      "name": "Dieu Ouginak",
      "href": "dieu-ouginak"
    },
    {
      "name": "Dieu Sadida",
      "href": "dieu-sadida"
    },
    {
      "name": "Dieu Sram",
      "href": "dieu-sram"
    },
    {
      "name": "Dieu Xélor",
      "href": "dieu-xelor"
    },
    {
      "name": "Djaul",
      "href": "djaul"
    },
    {
      "name": "Dragon Cochon",
      "href": "dragon-cochon"
    },
    {
      "name": "Efrim",
      "href": "efrim"
    },
    {
      "name": "Elaine & Encre noir",
      "href": "elaine-encre-noir"
    },
    {
      "name": "Élante",
      "href": "elante"
    },
    {
      "name": "Elely de Percedal",
      "href": "elely-de-percedal"
    },
    {
      "name": "Ereziah Melkewel",
      "href": "ereziah-melkewel"
    },
    {
      "name": "Évangelyne",
      "href": "evangelyne"
    },
    {
      "name": "Flopin de Percedal",
      "href": "flopin-de-percedal"
    },
    {
      "name": "Frida Mofette",
      "href": "frida-mofette"
    },
    {
      "name": "Glip",
      "href": "glip"
    },
    {
      "name": "Goultard",
      "href": "goultard"
    },
    {
      "name": "Grand Dragon",
      "href": "grand-dragon"
    },
    {
      "name": "Grany Smisse",
      "href": "grany-smisse"
    },
    {
      "name": "Grougaloragran",
      "href": "grougaloragran"
    },
    {
      "name": "Grougalorasalar",
      "href": "grougalorasalar"
    },
    {
      "name": "Grufon",
      "href": "gruffon"
    },
    {
      "name": "Hécate",
      "href": "hecate"
    },
    {
      "name": "Hyrkul",
      "href": "hyrkul"
    },
    {
      "name": "Ignemikhal",
      "href": "ignemikhal"
    },
    {
      "name": "Igole",
      "href": "igole"
    },
    {
      "name": "Indie Delagrandaventure",
      "href": "indie-delagrandaventure"
    },
    {
      "name": "Jahash Jurgen",
      "href": "jahash-jurgen"
    },
    {
      "name": "Jiva",
      "href": "jiva"
    },
    {
      "name": "Joris Jurgen",
      "href": "joris-jurgen"
    },
    {
      "name": "Julith Abigor",
      "href": "julith-abigor"
    },
    {
      "name": "Kali",
      "href": "kali"
    },
    {
      "name": "Karn",
      "href": "karn"
    },
    {
      "name": "Kabrok",
      "href": "kabrok"
    },
    {
      "name": "Katar",
      "href": "katar"
    },
    {
      "name": "Kérubim Crépin",
      "href": "kerubim-crepin"
    },
    {
      "name": "Khan Karkass",
      "href": "khan-karkass"
    },
    {
      "name": "Kriss la Krass",
      "href": "kriss-la-krass"
    },
    {
      "name": "La Déesse Éliatrope",
      "href": "grande-deesse-eliatrope"
    },
    {
      "name": "Lance Dur",
      "href": "lancedur"
    },
    {
      "name": "Lance Originelle",
      "href": "lance-originelle"
    },
    {
      "name": "Les Miss Moches",
      "href": "les-miss-moches"
    },
    {
      "name": "Lilotte",
      "href": "lilotte"
    },
    {
      "name": "Lokus",
      "href": "lokus"
    },
    {
      "name": "Lou",
      "href": "lou"
    },
    {
      "name": "Luis",
      "href": "luis"
    },
    {
      "name": "Madagaskan",
      "href": "madagaskan"
    },
    {
      "name": "Maïmane",
      "href": "maimane"
    },
    {
      "name": "Maskemane",
      "href": "maskemane"
    },
    {
      "name": "Maude",
      "href": "maude"
    },
    {
      "name": "Médoroziam",
      "href": "medoroziam"
    },
    {
      "name": "Ménalt",
      "href": "menalt"
    },
    {
      "name": "Mina",
      "href": "mina"
    },
    {
      "name": "Miranda",
      "href": "miranda"
    },
    {
      "name": "Monsieur M",
      "href": "monsieur-m"
    },
    {
      "name": "Moon",
      "href": "moon"
    },
    {
      "name": "Mouche",
      "href": "mouche"
    },
    {
      "name": "Moumoune Stroud",
      "href": "moumoune-stroud"
    },
    {
      "name": "Nimoda",
      "href": "nimoda"
    },
    {
      "name": "Nora",
      "href": "nora"
    },
    {
      "name": "Nox",
      "href": "nox"
    },
    {
      "name": "Ogrest",
      "href": "ogrest"
    },
    {
      "name": "Otomaï",
      "href": "otomai"
    },
    {
      "name": "Ombre",
      "href": "ombre"
    },
    {
      "name": "Ombrage",
      "href": "ombrage"
    },
    {
      "name": "Orgonax",
      "href": "orgonax"
    },
    {
      "name": "Oropo",
      "href": "oropo"
    },
    {
      "name": "Pandiego de la Vega",
      "href": "pandiego-de-la-vega"
    },
    {
      "name": "Pandora",
      "href": "pandora"
    },
    {
      "name": "Percimol",
      "href": "percimol"
    },
    {
      "name": "Phaeris le puissant",
      "href": "phaeris"
    },
    {
      "name": "Pin de Percedal",
      "href": "pin-de-percedal"
    },
    {
      "name": "Poo",
      "href": "poo"
    },
    {
      "name": "Pouchecot",
      "href": "pouchecot"
    },
    {
      "name": "Prince Adale",
      "href": "prince-adale"
    },
    {
      "name": "Prince de Brakmar",
      "href": "prince-de-brakmar"
    },
    {
      "name": "Prosperus Elementor",
      "href": "prosperus-elementor"
    },
    {
      "name": "Prysmaradoth",
      "href": "prysmaradoth"
    },
    {
      "name": "Qilby",
      "href": "qilby"
    },
    {
      "name": "Rasha",
      "href": "rasha"
    },
    {
      "name": "Raval",
      "href": "raval"
    },
    {
      "name": "Rathrosk",
      "href": "rathrosk"
    },
    {
      "name": "Razortemps",
      "href": "razortemps"
    },
    {
      "name": "Reine des Voleurs",
      "href": "reine-des-voleurs"
    },
    {
      "name": "Reines de Bonta",
      "href": "reines-de-bonta"
    },
    {
      "name": "Remington Smisse",
      "href": "remington-smisse"
    },
    {
      "name": "Ripulse",
      "href": "ripulse"
    },
    {
      "name": "Roi Nidas",
      "href": "roi-nidas"
    },
    {
      "name": "Roi Osamodas",
      "href": "roi-osamodas"
    },
    {
      "name": "Roi Sheran Sharm",
      "href": "roi-sheran-sharm"
    },
    {
      "name": "Rotalstrom",
      "href": "rotalstrom"
    },
    {
      "name": "Rubilax",
      "href": "rubilax"
    },
    {
      "name": "Ruel Stroud",
      "href": "ruel-stroud"
    },
    {
      "name": "Rushu",
      "href": "rushu"
    },
    {
      "name": "Rosal",
      "href": "rosal"
    },
    {
      "name": "Shinonomé",
      "href": "shinonome"
    },
    {
      "name": "Sidaire",
      "href": "sidaire"
    },
    {
      "name": "Silouate",
      "href": "silouate"
    },
    {
      "name": "Silvosse",
      "href": "silvosse"
    },
    {
      "name": "Simone",
      "href": "simone"
    },
    {
      "name": "Sipho",
      "href": "sipho"
    },
    {
      "name": "Solar",
      "href": "solar"
    },
    {
      "name": "Sumens",
      "href": "sumens"
    },
    {
      "name": "Terrakourial",
      "href": "terrakourial"
    },
    {
      "name": "Thanatena",
      "href": "thanatena"
    },
    {
      "name": "Toross Mordal",
      "href": "toross-mordal"
    },
    {
      "name": "Toxine",
      "href": "toxine"
    },
    {
      "name": "Tristepin de Percedal",
      "href": "tristepin"
    },
    {
      "name": "Ulgrude",
      "href": "ulgrude"
    },
    {
      "name": "Uk’Not’Allag",
      "href": "uk-not-allag"
    },
    {
      "name": "Ush Galesh",
      "href": "ush-galesh"
    },
    {
      "name": "Vampyro",
      "href": "vampyro"
    },
    {
      "name": "Wa Wabbit",
      "href": "wa-wabbit"
    },
    {
      "name": "Xav le Boulanger",
      "href": "xav-le-boulanger"
    },
    {
      "name": "Yrehn",
      "href": "yrehn"
    },
    {
      "name": "Yugo",
      "href": "yugo"
    }
  ];
  const currentHref = () => decodeURIComponent((window.location.pathname.split('/').pop() || '').toLowerCase());
  const currentIndex = () => characters.findIndex((character) => character.href.toLowerCase() === currentHref());
  const updateHeroNavigation = () => {
    const previousLink = document.querySelector('.character-hero-nav-prev');
    const nextLink = document.querySelector('.character-hero-nav-next');
    const index = currentIndex();
    if (!previousLink || !nextLink || index === -1) return;
    const previous = characters[(index - 1 + characters.length) % characters.length];
    const next = characters[(index + 1) % characters.length];
    previousLink.href = previous.href; previousLink.title = previous.name; previousLink.setAttribute('aria-label', 'Personnage précédent : ' + previous.name); previousLink.innerHTML = '<span aria-hidden="true">←</span>';
    nextLink.href = next.href; nextLink.title = next.name; nextLink.setAttribute('aria-label', 'Personnage suivant : ' + next.name); nextLink.innerHTML = '<span aria-hidden="true">→</span>';
  };
  const normalizeValue = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const makeIndexHref = (filter, label) => { const value = normalizeValue(label); return value ? 'personnages?' + filter + '=' + encodeURIComponent(value) : 'personnages'; };
  const splitInfoValues = (text) => text.split(/\s*,\s*/g).map((part) => part.trim()).filter(Boolean);
  const linkInfoFilters = () => { document.querySelectorAll('.info-block').forEach((block) => { const labelEl = block.querySelector('.info-label'); const value = block.querySelector('.info-value'); if (!labelEl || !value || value.querySelector('a')) return; const label = normalizeValue(labelEl.textContent || ''); const filter = label === 'classe' ? 'class' : label === 'groupe' ? 'group' : label === 'univers' ? 'universe' : ''; if (!filter) return; const parts = splitInfoValues(value.textContent || ''); if (!parts.length) return; value.replaceChildren(...parts.flatMap((part, index) => { const link = document.createElement('a'); link.className = 'character-filter-link'; link.href = makeIndexHref(filter, part); link.textContent = part; link.setAttribute('aria-label', 'Voir les personnages filtrés par ' + part); return index === 0 ? [link] : [document.createTextNode(', '), link]; })); }); };
  const initBackToTop = () => { if (!document.querySelector('.bio-panel')) return; let backToTop = document.querySelector('.back-to-top'); if (!backToTop) { backToTop = document.createElement('button'); backToTop.className = 'back-to-top'; backToTop.type = 'button'; backToTop.setAttribute('aria-label', 'Revenir en haut de la page'); backToTop.title = 'Revenir en haut'; const label = document.createElement('span'); label.setAttribute('aria-hidden', 'true'); label.textContent = '↑'; backToTop.appendChild(label); document.body.appendChild(backToTop); } const syncBackToTop = () => { backToTop.classList.toggle('is-visible', window.scrollY > 420); }; window.addEventListener('scroll', syncBackToTop, { passive: true }); backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); syncBackToTop(); };
  const relatedCharacters = [
    {
      "name": "Adamaï",
      "href": "adamai",
      "image": "../../assets/personnages/cartes/adamai.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Confrérie du Tofu",
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Aerafal",
      "href": "aerafal",
      "image": "../../assets/personnages/cartes/aerafal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Agard",
      "href": "agard",
      "image": "../../assets/personnages/cartes/agard.webp",
      "classLabel": "Forgelance",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Aguabrial",
      "href": "aguabrial",
      "image": "../../assets/personnages/cartes/aguabrial.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Alibert",
      "href": "alibert",
      "image": "../../assets/personnages/cartes/alibert.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Allister",
      "href": "allister",
      "image": "../../assets/personnages/cartes/allister.webp",
      "classLabel": "Féca",
      "groups": [
        "Héros",
        "Mythe & Légende"
      ]
    },
    {
      "name": "Amalia Sheran Sharm",
      "href": "amalia-sheran-sharm",
      "image": "../../assets/personnages/cartes/amalia-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Confrérie du Tofu",
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Anathar",
      "href": "anathar",
      "image": "../../assets/personnages/cartes/anathar.webp",
      "classLabel": "Shushu",
      "groups": [
        "Ennemis",
        "Shushu"
      ]
    },
    {
      "name": "Armant Sheran Sharm",
      "href": "armant-sheran-sharm",
      "image": "../../assets/personnages/cartes/armant-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Arpagone",
      "href": "arpagone",
      "image": "../../assets/personnages/cartes/arpagone.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Arty",
      "href": "arty",
      "image": "../../assets/personnages/cartes/arty.webp",
      "classLabel": "Féca",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Atcham Crépin",
      "href": "atcham-crepin",
      "image": "../../assets/personnages/cartes/atcham-crepin.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Crépin"
      ]
    },
    {
      "name": "Atone",
      "href": "atone",
      "image": "../../assets/personnages/cartes/atone.webp",
      "classLabel": "Éliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Aurora",
      "href": "aurora",
      "image": "../../assets/personnages/cartes/aurora.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Bakara Jurgen",
      "href": "bakara-jurgen",
      "image": "../../assets/personnages/cartes/bakara-jurgen.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Balance Krosmique",
      "href": "balance-krosmique",
      "image": "../../assets/personnages/cartes/balance-krosmique.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Baltazar",
      "href": "balthazar",
      "image": "../../assets/personnages/cartes/balthazar.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Belladone",
      "href": "belladone",
      "image": "../../assets/personnages/cartes/belladone.webp",
      "classLabel": "Eniripsa",
      "groups": [
        "Mythe & légende",
        "Ennemis"
      ]
    },
    {
      "name": "Biste",
      "href": "biste",
      "image": "../../assets/personnages/cartes/biste.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Bolgrot",
      "href": "bolgrot",
      "image": "../../assets/personnages/cartes/bolgrot.webp",
      "classLabel": "Dragon",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Bordegann",
      "href": "bordegann",
      "image": "../../assets/personnages/cartes/bordegann.webp",
      "classLabel": "Forgelance",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Bouillon",
      "href": "bouillon",
      "image": "../../assets/personnages/cartes/bouillon.webp",
      "classLabel": "Éliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Brumaire",
      "href": "brumaire",
      "image": "../../assets/personnages/cartes/brumaire.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Bump",
      "href": "bump",
      "image": "../../assets/personnages/cartes/bump.webp",
      "classLabel": "FÉCA",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Cadence",
      "href": "cadence",
      "image": "../../assets/personnages/cartes/cadence.webp",
      "classLabel": "Xélor",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chaille",
      "href": "chaille",
      "image": "../../assets/personnages/cartes/chaille.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chêne Mou",
      "href": "chene-mou",
      "image": "../../assets/personnages/cartes/chene-mou.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Chevalier Justice",
      "href": "chevalier-justice",
      "image": "../../assets/personnages/cartes/chevalier-justice.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chibi",
      "href": "chibi",
      "image": "../../assets/personnages/cartes/chibi.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Cire Momore",
      "href": "cire-momore",
      "image": "../../assets/personnages/cartes/cire-momore.webp",
      "classLabel": "Maudit",
      "groups": [
        "Mythe & légende",
        "Ennemis"
      ]
    },
    {
      "name": "Cléophée",
      "href": "cleophee",
      "image": "../../assets/personnages/cartes/cleophee.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Comte Harebourg",
      "href": "comte-harebourg",
      "image": "../../assets/personnages/cartes/comte-harebourg.webp",
      "classLabel": "XELOR",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Coqueline",
      "href": "coqueline",
      "image": "../../assets/personnages/cartes/coqueline.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Corbeau Noir",
      "href": "corbeau-noir",
      "image": "../../assets/personnages/cartes/corbeau-noir.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Cornu Mollu",
      "href": "cornu-mollu",
      "image": "../../assets/personnages/cartes/cornu-mollu.webp",
      "classLabel": "Sadida/Iop",
      "groups": [
        "Demi-dieu",
        "Ennemis"
      ]
    },
    {
      "name": "Dame Echo",
      "href": "echo",
      "image": "../../assets/personnages/cartes/echo.webp",
      "classLabel": "ENIRIPSA",
      "groups": [
        "Demi-dieu",
        "Ennemis",
        "Fratrie"
      ]
    },
    {
      "name": "Dardondakal",
      "href": "dardondakal",
      "image": "../../assets/personnages/cartes/dardondakal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Dark Vlad",
      "href": "dark-vlad",
      "image": "../../assets/personnages/cartes/dark-vlad.webp",
      "classLabel": "Iop",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Dathura",
      "href": "dathura",
      "image": "../../assets/personnages/cartes/dathura.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Déesse Cra",
      "href": "deesse-cra",
      "image": "../../assets/personnages/cartes/deesse-cra.webp",
      "classLabel": "CRA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Eniripsa",
      "href": "deesse-eniripsa",
      "image": "../../assets/personnages/cartes/deesse-eniripsa.webp",
      "classLabel": "ENIRIPSA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Féca",
      "href": "deesse-feca",
      "image": "../../assets/personnages/cartes/deesse-feca.webp",
      "classLabel": "FÉCA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Panda",
      "href": "deesse-panda",
      "image": "../../assets/personnages/cartes/deesse-panda.webp",
      "classLabel": "PANDAWA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Sacrieur",
      "href": "deesse-sacrieur",
      "image": "../../assets/personnages/cartes/deesse-sacrieur.webp",
      "classLabel": "SACRIEUR",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Desperia",
      "href": "desperia",
      "image": "../../assets/personnages/cartes/desperia.webp",
      "classLabel": "Éliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Dieu Écaflip",
      "href": "dieu-ecaflip",
      "image": "../../assets/personnages/cartes/dieu-ecaflip.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Enutrof",
      "href": "dieu-enutrof",
      "image": "../../assets/personnages/cartes/dieu-enutrof.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Iop",
      "href": "dieu-iop",
      "image": "../../assets/personnages/cartes/dieu-iop.webp",
      "classLabel": "IOP",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Osamodas",
      "href": "dieu-osamodas",
      "image": "../../assets/personnages/cartes/dieu-osamodas.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Ouginak",
      "href": "dieu-ouginak",
      "image": "../../assets/personnages/cartes/dieu-ouginak.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Sadida",
      "href": "dieu-sadida",
      "image": "../../assets/personnages/cartes/dieu-sadida.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Sram",
      "href": "dieu-sram",
      "image": "../../assets/personnages/cartes/dieu-sram.webp",
      "classLabel": "SRAM",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Xélor",
      "href": "dieu-xelor",
      "image": "../../assets/personnages/cartes/dieu-xelor.webp",
      "classLabel": "XÉLOR",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Djaul",
      "href": "djaul",
      "image": "../../assets/personnages/cartes/djaul-2026.webp",
      "classLabel": "Shushu, Gardien des mois",
      "groups": [
        "Shushu",
        "Protecteur"
      ]
    },
    {
      "name": "Dragon Cochon",
      "href": "dragon-cochon",
      "image": "../../assets/personnages/cartes/dragon-cochon.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis",
        "Figurants"
      ]
    },
    {
      "name": "Efrim",
      "href": "efrim",
      "image": "../../assets/personnages/cartes/efrim.webp",
      "classLabel": "Dragon éliatrope",
      "groups": [
        "Éliatrope primordial",
        "Nécromes"
      ]
    },
    {
      "name": "Elaine & Encre noir",
      "href": "elaine-encre-noir",
      "image": "../../assets/personnages/cartes/elaine-encre-noir.webp",
      "classLabel": "Roublard",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Élante",
      "href": "elante",
      "image": "../../assets/personnages/cartes/elante.webp",
      "classLabel": "MONSTRE",
      "groups": [
        "Mythe & légende"
      ]
    },
    {
      "name": "Elely de Percedal",
      "href": "elely-de-percedal",
      "image": "../../assets/personnages/cartes/elely-de-percedal.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Ereziah Melkewel",
      "href": "ereziah-melkewel",
      "image": "../../assets/personnages/cartes/ereziah-melkewel.webp",
      "classLabel": "Féca",
      "groups": [
        "Mythe & légende"
      ]
    },
    {
      "name": "Évangelyne",
      "href": "evangelyne",
      "image": "../../assets/personnages/cartes/evangelyne.webp",
      "classLabel": "CRA",
      "groups": [
        "Confrérie du Tofu",
        "Famille Percedal",
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Flopin de Percedal",
      "href": "flopin-de-percedal",
      "image": "../../assets/personnages/cartes/flopin-de-percedal.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Frida Mofette",
      "href": "frida-mofette",
      "image": "../../assets/personnages/cartes/frida-mofette.webp",
      "classLabel": "Steamer",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Glip",
      "href": "glip",
      "image": "../../assets/personnages/cartes/glip.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Goultard",
      "href": "goultard",
      "image": "../../assets/personnages/cartes/goultard.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Grand Dragon",
      "href": "grand-dragon",
      "image": "../../assets/personnages/cartes/grand-dragon.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Grany Smisse",
      "href": "grany-smisse",
      "image": "../../assets/personnages/cartes/grany-smisse.webp",
      "classLabel": "Roublard",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Grougaloragran",
      "href": "grougaloragran",
      "image": "../../assets/personnages/cartes/grougaloragran.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Grougalorasalar",
      "href": "grougalorasalar",
      "image": "../../assets/personnages/cartes/grougalorasalar.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Grufon",
      "href": "gruffon",
      "image": "../../assets/personnages/cartes/gruffon.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu"
      ]
    },
    {
      "name": "Hécate",
      "href": "hecate",
      "image": "../../assets/personnages/cartes/hecate.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Hyrkul",
      "href": "hyrkul",
      "image": "../../assets/personnages/cartes/hyrkul.webp",
      "classLabel": "Féca",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Ignemikhal",
      "href": "ignemikhal",
      "image": "../../assets/personnages/cartes/ignemikhal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Igole",
      "href": "igole",
      "image": "../../assets/personnages/cartes/igole.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Indie Delagrandaventure",
      "href": "indie-delagrandaventure",
      "image": "../../assets/personnages/cartes/indie-delagrandaventure.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Jahash Jurgen",
      "href": "jahash-jurgen",
      "image": "../../assets/personnages/cartes/jahash-jurgen.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Jiva",
      "href": "jiva",
      "image": "../../assets/personnages/cartes/jiva-carte-v2.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Joris Jurgen",
      "href": "joris-jurgen",
      "image": "../../assets/personnages/cartes/joris-jurgen.webp",
      "classLabel": "INCONNUE",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Julith Abigor",
      "href": "julith-abigor",
      "image": "../../assets/personnages/cartes/julith-abigor.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Kali",
      "href": "kali",
      "image": "../../assets/personnages/cartes/kali.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Karn",
      "href": "karn",
      "image": "../../assets/personnages/cartes/karn.webp",
      "classLabel": "IOP",
      "groups": [
        "Ennemis",
        "Mythe & légende"
      ]
    },
    {
      "name": "Kabrok",
      "href": "kabrok",
      "image": "../../assets/personnages/cartes/kabrok.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Katar",
      "href": "katar",
      "image": "../../assets/personnages/cartes/katar.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Kérubim Crépin",
      "href": "kerubim-crepin",
      "image": "../../assets/personnages/cartes/kerubim-crepin.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Demi-dieu",
        "Héros",
        "Crépin"
      ]
    },
    {
      "name": "Khan Karkass",
      "href": "khan-karkass",
      "image": "../../assets/personnages/cartes/khan-karkass.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Kriss la Krass",
      "href": "kriss-la-krass",
      "image": "../../assets/personnages/cartes/kriss-la-krass.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "La Déesse Éliatrope",
      "href": "grande-deesse-eliatrope",
      "image": "../../assets/personnages/cartes/grande-deesse-eliatrope.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Lance Dur",
      "href": "lancedur",
      "image": "../../assets/personnages/cartes/lancedur.webp",
      "classLabel": "FORGELANCE",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Lance Originelle",
      "href": "lance-originelle",
      "image": "../../assets/personnages/cartes/lance-originelle.webp",
      "classLabel": "Forgelance",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Les Miss Moches",
      "href": "les-miss-moches",
      "image": "../../assets/personnages/cartes/les-miss-moches.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Lilotte",
      "href": "lilotte",
      "image": "../../assets/personnages/cartes/lilotte.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Lokus",
      "href": "lokus",
      "image": "../../assets/personnages/cartes/lokus.webp",
      "classLabel": "Mechasme",
      "groups": [
        "Mechasme"
      ]
    },
    {
      "name": "Lou",
      "href": "lou",
      "image": "../../assets/personnages/cartes/lou.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Luis",
      "href": "luis",
      "image": "../../assets/personnages/cartes/luis.webp",
      "classLabel": "Shushu",
      "groups": [
        "Héros",
        "Shushu"
      ]
    },
    {
      "name": "Madagaskan",
      "href": "madagaskan",
      "image": "../../assets/personnages/cartes/madagaskan.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Maïmane",
      "href": "maimane",
      "image": "../../assets/personnages/cartes/maimane.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Maskemane",
      "href": "maskemane",
      "image": "../../assets/personnages/cartes/maskemane.webp",
      "classLabel": "Zobal",
      "groups": [
        "Mythe & légende",
        "Héros"
      ]
    },
    {
      "name": "Maude",
      "href": "maude",
      "image": "../../assets/personnages/cartes/maude.webp",
      "classLabel": "Sram",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Médoroziam",
      "href": "medoroziam",
      "image": "../../assets/personnages/cartes/medoroziam.webp",
      "classLabel": "Démon",
      "groups": [
        "Démon"
      ]
    },
    {
      "name": "Ménalt",
      "href": "menalt",
      "image": "../../assets/personnages/cartes/menalt.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Mina",
      "href": "mina",
      "image": "../../assets/personnages/cartes/mina.webp",
      "classLabel": "Éliatrope",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Miranda",
      "href": "miranda",
      "image": "../../assets/personnages/cartes/miranda.webp",
      "classLabel": "Ecaflip",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Monsieur M",
      "href": "monsieur-m",
      "image": "../../assets/personnages/cartes/monsieur-m.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Moon",
      "href": "moon",
      "image": "../../assets/personnages/cartes/moon.webp",
      "classLabel": "Monstre",
      "groups": [
        "Dieu",
        "Mythe & légende"
      ]
    },
    {
      "name": "Mouche",
      "href": "mouche",
      "image": "../../assets/personnages/cartes/mouche.webp",
      "classLabel": "Crâ",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Moumoune Stroud",
      "href": "moumoune-stroud",
      "image": "../../assets/personnages/cartes/moumoune-stroud.webp",
      "classLabel": "Enutrof",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Nimoda",
      "href": "nimoda",
      "image": "../../assets/personnages/cartes/nimoda.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Nora",
      "href": "nora",
      "image": "../../assets/personnages/cartes/nora.webp",
      "classLabel": "Éliatrope",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Nox",
      "href": "nox",
      "image": "../../assets/personnages/cartes/nox.webp",
      "classLabel": "XELOR",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Ogrest",
      "href": "ogrest",
      "image": "../../assets/personnages/cartes/ogrest.webp",
      "classLabel": "OGRE",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Otomaï",
      "href": "otomai",
      "image": "../../assets/personnages/cartes/otomai.webp",
      "classLabel": "Féca",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Ombre",
      "href": "ombre",
      "image": "../../assets/personnages/cartes/ombre.webp",
      "classLabel": "Multiman",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Ombrage",
      "href": "ombrage",
      "image": "../../assets/personnages/cartes/ombrage.webp",
      "classLabel": "Shushu",
      "groups": [
        "Shushu",
        "Ennemis"
      ]
    },
    {
      "name": "Orgonax",
      "href": "orgonax",
      "image": "../../assets/personnages/cartes/orgonax.webp",
      "classLabel": "Mechasme",
      "groups": [
        "Mechasme"
      ]
    },
    {
      "name": "Oropo",
      "href": "oropo",
      "image": "../../assets/personnages/cartes/oropo.webp",
      "classLabel": "ELIOTROPE",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Pandiego de la Vega",
      "href": "pandiego-de-la-vega",
      "image": "../../assets/personnages/cartes/pandiego-de-la-vega.webp",
      "classLabel": "Pandawa",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Pandora",
      "href": "pandora",
      "image": "../../assets/personnages/cartes/pandora.webp",
      "classLabel": "Voyageur temporel",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Percimol",
      "href": "percimol",
      "image": "../../assets/personnages/cartes/percimol.webp",
      "classLabel": "Monstre",
      "groups": [
        "Mythe & légende",
        "Héros"
      ]
    },
    {
      "name": "Phaeris le puissant",
      "href": "phaeris",
      "image": "../../assets/personnages/cartes/phaeris.webp",
      "classLabel": "Dragon éliatrope",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Pin de Percedal",
      "href": "pin-de-percedal",
      "image": "../../assets/personnages/cartes/pin-de-percedal.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Poo",
      "href": "poo",
      "image": "../../assets/personnages/cartes/poo.webp",
      "classLabel": "PANDAWA",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Pouchecot",
      "href": "pouchecot",
      "image": "../../assets/personnages/cartes/pouchecot.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Prince Adale",
      "href": "prince-adale",
      "image": "../../assets/personnages/cartes/prince-adale.webp",
      "classLabel": "Steamer",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Prince de Brakmar",
      "href": "prince-de-brakmar",
      "image": "../../assets/personnages/cartes/prince-de-brakmar.webp",
      "classLabel": "Sram",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Prosperus Elementor",
      "href": "prosperus-elementor",
      "image": "../../assets/personnages/cartes/prosperus-elementor.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Prysmaradoth",
      "href": "prysmaradoth",
      "image": "../../assets/personnages/cartes/prysmaradoth.webp",
      "classLabel": "Dragon",
      "groups": [
        "Dragon"
      ]
    },
    {
      "name": "Qilby",
      "href": "qilby",
      "image": "../../assets/personnages/cartes/qilby.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Ennemis",
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Rasha",
      "href": "rasha",
      "image": "../../assets/personnages/cartes/rasha.webp",
      "classLabel": "Démon",
      "groups": [
        "Démon"
      ]
    },
    {
      "name": "Raval",
      "href": "raval",
      "image": "../../assets/personnages/cartes/raval.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Rathrosk",
      "href": "rathrosk",
      "image": "../../assets/personnages/cartes/rathrosk.webp",
      "classLabel": "Dragon",
      "groups": [
        "Dragon"
      ]
    },
    {
      "name": "Razortemps",
      "href": "razortemps",
      "image": "../../assets/personnages/cartes/razortemps.webp",
      "classLabel": "INCONNUE",
      "groups": [
        "WIP"
      ]
    },
    {
      "name": "Reine des Voleurs",
      "href": "reine-des-voleurs",
      "image": "../../assets/personnages/cartes/reine-des-voleurs.webp",
      "classLabel": "Sram",
      "groups": [
        "Srambad"
      ]
    },
    {
      "name": "Reines de Bonta",
      "href": "reines-de-bonta",
      "image": "../../assets/personnages/cartes/reines-de-bonta.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Remington Smisse",
      "href": "remington-smisse",
      "image": "../../assets/personnages/cartes/remington-smisse.webp",
      "classLabel": "Roublard",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Ripulse",
      "href": "ripulse",
      "image": "../../assets/personnages/cartes/ripulse.webp",
      "classLabel": "Éliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Roi Nidas",
      "href": "roi-nidas",
      "image": "../../assets/personnages/cartes/roi-nidas.webp",
      "classLabel": "Enutrof",
      "groups": [
        "Énutrofors"
      ]
    },
    {
      "name": "Roi Osamodas",
      "href": "roi-osamodas",
      "image": "../../assets/personnages/cartes/roi-osamodas.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Roi Sheran Sharm",
      "href": "roi-sheran-sharm",
      "image": "../../assets/personnages/cartes/roi-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Rotalstrom",
      "href": "rotalstrom",
      "image": "../../assets/personnages/cartes/rotalstrom.webp",
      "classLabel": "Dragon",
      "groups": [
        "Nécromes",
        "Dragon primordial"
      ]
    },
    {
      "name": "Rubilax",
      "href": "rubilax",
      "image": "../../assets/personnages/cartes/rubilax.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu"
      ]
    },
    {
      "name": "Ruel Stroud",
      "href": "ruel-stroud",
      "image": "../../assets/personnages/cartes/ruel-stroud.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Confrérie du Tofu"
      ]
    },
    {
      "name": "Rushu",
      "href": "rushu",
      "image": "../../assets/personnages/cartes/rushu.webp",
      "classLabel": "DÉMON",
      "groups": [
        "Démon",
        "Ennemis"
      ]
    },
    {
      "name": "Rosal",
      "href": "rosal",
      "image": "../../assets/personnages/cartes/rosal.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Shinonomé",
      "href": "shinonome",
      "image": "../../assets/personnages/cartes/shinonome.webp",
      "classLabel": "Dragon éliatrope",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Sidaire",
      "href": "sidaire",
      "image": "../../assets/personnages/cartes/sidaire.webp",
      "classLabel": "Éliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Éliotropes"
      ]
    },
    {
      "name": "Silouate",
      "href": "silouate",
      "image": "../../assets/personnages/cartes/silouate.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Silvosse",
      "href": "silvosse",
      "image": "../../assets/personnages/cartes/silvosse.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Simone",
      "href": "simone",
      "image": "../../assets/personnages/cartes/simone.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Sipho",
      "href": "sipho",
      "image": "../../assets/personnages/cartes/sipho.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Solar",
      "href": "solar",
      "image": "../../assets/personnages/cartes/solar.webp",
      "classLabel": "Iop, Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Sumens",
      "href": "sumens",
      "image": "../../assets/personnages/cartes/sumens.webp",
      "classLabel": "Enutrof, Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Terrakourial",
      "href": "terrakourial",
      "image": "../../assets/personnages/cartes/terrakourial.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Thanatena",
      "href": "thanatena",
      "image": "../../assets/personnages/cartes/thanatena.webp",
      "classLabel": "Grande Faucheuse",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Toross Mordal",
      "href": "toross-mordal",
      "image": "../../assets/personnages/cartes/toross-mordal.webp",
      "classLabel": "IOP",
      "groups": [
        "Nécromes"
      ]
    },
    {
      "name": "Toxine",
      "href": "toxine",
      "image": "../../assets/personnages/cartes/toxine.webp",
      "classLabel": "Sram",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Tristepin de Percedal",
      "href": "tristepin",
      "image": "../../assets/personnages/cartes/tristepin.webp",
      "classLabel": "IOP",
      "groups": [
        "Confrérie du Tofu",
        "Famille Percedal"
      ]
    },
    {
      "name": "Ulgrude",
      "href": "ulgrude",
      "image": "../../assets/personnages/cartes/ulgrude.webp",
      "classLabel": "Gardien des mois",
      "groups": [
        "Protecteur"
      ]
    },
    {
      "name": "Uk’Not’Allag",
      "href": "uk-not-allag",
      "image": "../../assets/personnages/cartes/uk-not-allag.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu",
        "Ennemis"
      ]
    },
    {
      "name": "Ush Galesh",
      "href": "ush-galesh",
      "image": "../../assets/personnages/cartes/ush-galesh.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Vampyro",
      "href": "vampyro",
      "image": "../../assets/personnages/cartes/vampyro.webp",
      "classLabel": "Iop",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Wa Wabbit",
      "href": "wa-wabbit",
      "image": "../../assets/personnages/cartes/wa-wabbit.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis",
        "Mythe & légende"
      ]
    },
    {
      "name": "Xav le Boulanger",
      "href": "xav-le-boulanger",
      "image": "../../assets/personnages/cartes/xav-le-boulanger.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Yrehn",
      "href": "yrehn",
      "image": "../../assets/personnages/cartes/yrehn.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Yugo",
      "href": "yugo",
      "image": "../../assets/personnages/cartes/yugo.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Confrérie du Tofu",
        "Éliatrope primordial"
      ]
    }
  ];
  const getCurrentGroups = () => { const blocks = [...document.querySelectorAll('.info-block')]; const groupBlock = blocks.find((block) => normalizeValue(block.querySelector('.info-label')?.textContent || '') === 'groupe'); const value = groupBlock?.querySelector('.info-value'); return value ? splitInfoValues(value.textContent || '') : []; };
  const scoreCharacter = (character, groups) => { const wanted = groups.map(normalizeValue); return (character.groups || []).reduce((score, group) => score + (wanted.includes(normalizeValue(group)) ? 1 : 0), 0); };
  const chooseDisplayedGroup = (groups, related) => groups.find((group) => { const value = normalizeValue(group); return related.some((character) => (character.groups || []).some((item) => normalizeValue(item) === value)); }) || groups[0];
  const shuffleCharacters = (items) => items.map((item) => ({ item, seed: Math.random() })).sort((a, b) => a.seed - b.seed).map(({ item }) => item);
  const createRelatedPanel = () => { const main = document.querySelector('.character-main'); const bio = document.querySelector('.bio-panel'); if (!main || !bio || main.querySelector('.related-panel')) return; const groups = getCurrentGroups(); if (!groups.length) return; const file = currentHref(); const isFullBio = biographyMode(); const scored = relatedCharacters.filter((character) => character.href.toLowerCase() !== file).map((character) => ({ ...character, score: scoreCharacter(character, groups) })).filter((character) => character.score > 0); if (!scored.length) return; const displayedGroup = chooseDisplayedGroup(groups, scored); const displayedGroupKey = normalizeValue(displayedGroup); const groupRelated = scored.filter((character) => (character.groups || []).some((group) => normalizeValue(group) === displayedGroupKey)); const related = isFullBio ? scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })).slice(0, 8) : shuffleCharacters(groupRelated.length ? groupRelated : scored).slice(0, 3); if (!related.length) return; const panel = document.createElement('aside'); panel.className = 'related-panel'; panel.setAttribute('aria-label', 'Biographies du groupe ' + displayedGroup); const title = document.createElement('h2'); title.className = 'related-title'; title.textContent = isFullBio ? 'Biographies liées' : displayedGroup; panel.appendChild(title); const list = document.createElement('div'); list.className = 'related-list'; related.forEach((character) => { const link = document.createElement('a'); link.className = 'related-card'; link.href = isFullBio ? character.href + '?bio=complete' : character.href; const image = document.createElement('img'); image.src = character.image; image.alt = ''; image.loading = 'lazy'; const copy = document.createElement('span'); copy.className = 'related-card-copy'; const name = document.createElement('strong'); name.textContent = character.name; const classLabel = document.createElement('span'); classLabel.textContent = character.classLabel || 'Personnage'; copy.append(name, classLabel); link.append(image, copy); list.appendChild(link); }); panel.appendChild(list); main.appendChild(panel); };
  const createCrossGroupPanel = () => { const main = document.querySelector('.character-main'); const bio = document.querySelector('.bio-panel'); if (!main || !bio || biographyMode() || main.querySelector('.character-cross-group-panel')) return; const groups = getCurrentGroups(); if (!groups.length) return; const file = currentHref(); const relatedPool = relatedCharacters.filter((character) => character.href.toLowerCase() !== file); const scored = relatedPool.map((character) => ({ ...character, score: scoreCharacter(character, groups) })).filter((character) => character.score > 0); const displayedGroup = chooseDisplayedGroup(groups, scored.length ? scored : relatedPool); const displayedGroupKey = normalizeValue(displayedGroup); const candidates = relatedPool.filter((character) => !(character.groups || []).some((group) => normalizeValue(group) === displayedGroupKey)); const picks = shuffleCharacters(candidates).slice(0, 2); if (picks.length < 2) return; const panel = document.createElement('section'); panel.className = 'character-cross-group-panel'; panel.setAttribute('aria-label', 'Explorer d’autres héros'); const title = document.createElement('h2'); title.className = 'character-cross-group-title'; title.textContent = 'Explorer d’autres héros'; const list = document.createElement('div'); list.className = 'character-cross-group-list'; picks.forEach((character) => { const link = document.createElement('a'); link.className = 'character-cross-group-card'; link.href = character.href; const image = document.createElement('img'); image.src = character.image; image.alt = ''; image.loading = 'lazy'; const copy = document.createElement('span'); copy.className = 'character-cross-group-copy'; const name = document.createElement('strong'); name.textContent = character.name; const classLabel = document.createElement('span'); classLabel.textContent = character.classLabel || 'Personnage'; copy.append(name, classLabel); link.append(image, copy); list.appendChild(link); }); panel.append(title, list); main.appendChild(panel); };
  const biographyMode = () => new URLSearchParams(window.location.search).get('bio') === 'complete';
  const summarizeBio = (text) => {
    const normalized = String(text || '').replace(/\s+/g, ' ').trim();
    if (normalized.length <= 430) return normalized;
    const slice = normalized.slice(0, 430);
    const lastSentence = Math.max(slice.lastIndexOf('.'), slice.lastIndexOf('!'), slice.lastIndexOf('?'));
    return (lastSentence > 180 ? slice.slice(0, lastSentence + 1) : slice.replace(/\s+\S*$/, '') + '…');
  };
  const initCharacterBiographyMode = () => {
    const bio = document.querySelector('.bio-panel');
    const bioText = bio?.querySelector('.bio-text');
    if (!bio || !bioText) return;
    const isFullBio = biographyMode();
    document.body.classList.toggle('character-biography-page', isFullBio);
    document.body.classList.toggle('character-overview-page', !isFullBio);
    if (!isFullBio && !bio.querySelector('.character-overview-summary')) {
      const name = document.querySelector('.hero-name')?.textContent?.trim() || document.title.replace(/\s*\|.*$/, '');
      const role = document.querySelector('.hero-subtitle')?.textContent?.trim() || 'Personnage du Krosmoz';
      const firstParagraph = bioText.querySelector('p');
      const intro = summarizeBio(firstParagraph?.textContent || '');
      const overview = document.createElement('section');
      overview.className = 'character-overview-summary';
      overview.setAttribute('aria-labelledby', 'character-overview-title');
      const kicker = document.createElement('p');
      kicker.className = 'character-overview-kicker';
      kicker.textContent = 'Biographie';
      const title = document.createElement('h2');
      title.id = 'character-overview-title';
      title.textContent = name;
      const subtitle = document.createElement('p');
      subtitle.className = 'character-overview-role';
      subtitle.textContent = role;
      const summary = document.createElement('p');
      summary.className = 'character-overview-copy';
      summary.textContent = intro;
      const cta = document.createElement('a');
      cta.className = 'character-biography-link';
      cta.href = window.location.pathname.split('/').pop() + '?bio=complete';
      cta.textContent = 'Lire la biographie';
      overview.append(kicker, title, subtitle, summary, cta);
      bio.insertBefore(overview, bioText);
    }
    const backLink = bio.querySelector('.back-link');
    if (backLink && isFullBio) {
      backLink.href = window.location.pathname.split('/').pop();
      backLink.textContent = '← Retour à la fiche personnage';
    }
  };
  const initBiographyScrollFade = () => {
    if (!biographyMode()) return;
    const hero = document.querySelector('.character-hero');
    if (!hero) return;
    const syncFade = () => {
      const distance = Math.max(1, window.innerHeight * 0.24);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const imageOpacity = Math.max(0, 1 - easedProgress * 1.08);
      const contentOpacity = Math.max(0, 1 - easedProgress * 1.18);
      document.documentElement.style.setProperty('--character-bio-fade', easedProgress.toFixed(3));
      document.documentElement.style.setProperty('--character-bio-image-opacity', imageOpacity.toFixed(3));
      document.documentElement.style.setProperty('--character-bio-content-opacity', contentOpacity.toFixed(3));
    };
    window.addEventListener('scroll', syncFade, { passive: true });
    window.addEventListener('resize', syncFade);
    syncFade();
  };
  const initBiographyScrollIndicator = () => {
    if (!biographyMode()) return;
    const rule = document.querySelector('.hero-rule');
    if (!rule || rule.querySelector('.bio-scroll-indicator')) return;
    const indicator = document.createElement('span');
    indicator.className = 'bio-scroll-indicator';
    indicator.textContent = 'Scroll';
    rule.appendChild(indicator);
  };
  const createCharacterIndexBackLink = () => {
    if (biographyMode()) return;
    const main = document.querySelector('.character-main');
    if (!main || main.querySelector('.character-index-back-link')) return;
    const link = document.createElement('a');
    link.className = 'back-link character-index-back-link';
    link.href = 'personnages';
    link.textContent = "Retour à l'index des personnages";
    main.appendChild(link);
  };
  const init = () => { updateHeroNavigation(); linkInfoFilters(); initBackToTop(); initCharacterBiographyMode(); createRelatedPanel(); createCrossGroupPanel(); createCharacterIndexBackLink(); initBiographyScrollIndicator(); initBiographyScrollFade(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
