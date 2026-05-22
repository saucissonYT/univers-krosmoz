

(function () {
  const characters = [
    {
      "name": "Adamaï",
      "href": "adamai.html"
    },
    {
      "name": "Aerafal",
      "href": "aerafal.html"
    },
    {
      "name": "Agard",
      "href": "agard.html"
    },
    {
      "name": "Aguabrial",
      "href": "aguabrial.html"
    },
    {
      "name": "Alibert",
      "href": "alibert.html"
    },
    {
      "name": "Amalia Sheran Sharm",
      "href": "amalia-sheran-sharm.html"
    },
    {
      "name": "Anathar",
      "href": "anathar.html"
    },
    {
      "name": "Armant Sheran Sharm",
      "href": "armant-sheran-sharm.html"
    },
    {
      "name": "Arpagone",
      "href": "arpagone.html"
    },
    {
      "name": "Arty",
      "href": "arty.html"
    },
    {
      "name": "Atcham Crépin",
      "href": "atcham-crepin.html"
    },
    {
      "name": "Atone",
      "href": "atone.html"
    },
    {
      "name": "Aurora",
      "href": "aurora.html"
    },
    {
      "name": "Bakara Jurgen",
      "href": "bakara-jurgen.html"
    },
    {
      "name": "Baltazar",
      "href": "balthazar.html"
    },
    {
      "name": "Belladone",
      "href": "belladone.html"
    },
    {
      "name": "Bellaphone",
      "href": "bellaphone.html"
    },
    {
      "name": "Biste",
      "href": "biste.html"
    },
    {
      "name": "Bolgrot",
      "href": "bolgrot.html"
    },
    {
      "name": "Bordegann",
      "href": "bordegann.html"
    },
    {
      "name": "Bouillon",
      "href": "bouillon.html"
    },
    {
      "name": "Bump",
      "href": "bump.html"
    },
    {
      "name": "Cadence",
      "href": "cadence.html"
    },
    {
      "name": "Chaille",
      "href": "chaille.html"
    },
    {
      "name": "Chêne Mou",
      "href": "chene-mou.html"
    },
    {
      "name": "Chevalier Justice",
      "href": "chevalier-justice.html"
    },
    {
      "name": "Chibi",
      "href": "chibi.html"
    },
    {
      "name": "Cire Momore",
      "href": "cire-momore.html"
    },
    {
      "name": "Cléophée",
      "href": "cleophee.html"
    },
    {
      "name": "Comte Harebourg",
      "href": "comte-harebourg.html"
    },
    {
      "name": "Coqueline",
      "href": "coqueline.html"
    },
    {
      "name": "Corbeau Noir",
      "href": "corbeau-noir.html"
    },
    {
      "name": "Cornu Mollu",
      "href": "cornu-mollu.html"
    },
    {
      "name": "Dame Echo",
      "href": "echo.html"
    },
    {
      "name": "Dardondakal",
      "href": "dardondakal.html"
    },
    {
      "name": "Dark Vlad",
      "href": "dark-vlad.html"
    },
    {
      "name": "Dathura",
      "href": "dathura.html"
    },
    {
      "name": "Déesse Cra",
      "href": "deesse-cra.html"
    },
    {
      "name": "Déesse Eniripsa",
      "href": "deesse-eniripsa.html"
    },
    {
      "name": "Déesse Féca",
      "href": "deesse-feca.html"
    },
    {
      "name": "Déesse Panda",
      "href": "deesse-panda.html"
    },
    {
      "name": "Déesse Sacrieur",
      "href": "deesse-sacrieur.html"
    },
    {
      "name": "Desperia",
      "href": "desperia.html"
    },
    {
      "name": "Dieu Écaflip",
      "href": "dieu-ecaflip.html"
    },
    {
      "name": "Dieu Enutrof",
      "href": "dieu-enutrof.html"
    },
    {
      "name": "Dieu Iop",
      "href": "dieu-iop.html"
    },
    {
      "name": "Dieu Osamodas",
      "href": "dieu-osamodas.html"
    },
    {
      "name": "Dieu Ouginak",
      "href": "dieu-ouginak.html"
    },
    {
      "name": "Dieu Sadida",
      "href": "dieu-sadida.html"
    },
    {
      "name": "Dieu Sram",
      "href": "dieu-sram.html"
    },
    {
      "name": "Dieu Xélor",
      "href": "dieu-xelor.html"
    },
    {
      "name": "Djaul",
      "href": "djaul.html"
    },
    {
      "name": "Dragon Cochon",
      "href": "dragon-cochon.html"
    },
    {
      "name": "Efrim",
      "href": "efrim.html"
    },
    {
      "name": "Elaine & Encre noir",
      "href": "elaine-encre-noir.html"
    },
    {
      "name": "Élante",
      "href": "elante.html"
    },
    {
      "name": "Elely de Percedal",
      "href": "elely-de-percedal.html"
    },
    {
      "name": "Évangelyne",
      "href": "evangelyne.html"
    },
    {
      "name": "Flopin de Percedal",
      "href": "flopin-de-percedal.html"
    },
    {
      "name": "Frida Mofette",
      "href": "frida-mofette.html"
    },
    {
      "name": "Glip",
      "href": "glip.html"
    },
    {
      "name": "Goultard",
      "href": "goultard.html"
    },
    {
      "name": "Grand Dragon",
      "href": "grand-dragon.html"
    },
    {
      "name": "Grany Smisse",
      "href": "grany-smisse.html"
    },
    {
      "name": "Grougaloragran",
      "href": "grougaloragran.html"
    },
    {
      "name": "Grougalorasalar",
      "href": "grougalorasalar.html"
    },
    {
      "name": "Grufon",
      "href": "gruffon.html"
    },
    {
      "name": "Hyrkul",
      "href": "hyrkul.html"
    },
    {
      "name": "Ignemikhal",
      "href": "ignemikhal.html"
    },
    {
      "name": "Igole",
      "href": "igole.html"
    },
    {
      "name": "Indie Delagrandaventure",
      "href": "indie-delagrandaventure.html"
    },
    {
      "name": "Jahash Jurgen",
      "href": "jahash-jurgen.html"
    },
    {
      "name": "Jiva",
      "href": "jiva.html"
    },
    {
      "name": "Joris Jurgen",
      "href": "joris-jurgen.html"
    },
    {
      "name": "Julith Abigor",
      "href": "julith-abigor.html"
    },
    {
      "name": "Kali",
      "href": "kali.html"
    },
    {
      "name": "Karn",
      "href": "karn.html"
    },
    {
      "name": "Kabrok",
      "href": "kabrok.html"
    },
    {
      "name": "Katar",
      "href": "katar.html"
    },
    {
      "name": "Kérubim Crépin",
      "href": "kerubim-crepin.html"
    },
    {
      "name": "Khan Karkass",
      "href": "khan-karkass.html"
    },
    {
      "name": "Kriss la Krass",
      "href": "kriss-la-krass.html"
    },
    {
      "name": "La Déesse Éliatrope",
      "href": "grande-deesse-eliatrope.html"
    },
    {
      "name": "Lance Dur",
      "href": "lancedur.html"
    },
    {
      "name": "Les Miss Moches",
      "href": "les-miss-moches.html"
    },
    {
      "name": "Lilotte",
      "href": "lilotte.html"
    },
    {
      "name": "Lokus",
      "href": "lokus.html"
    },
    {
      "name": "Lou",
      "href": "lou.html"
    },
    {
      "name": "Luis",
      "href": "luis.html"
    },
    {
      "name": "Madagaskan",
      "href": "madagaskan.html"
    },
    {
      "name": "Maskemane",
      "href": "maskemane.html"
    },
    {
      "name": "Maude",
      "href": "maude.html"
    },
    {
      "name": "Médoroziam",
      "href": "medoroziam.html"
    },
    {
      "name": "Mina",
      "href": "mina.html"
    },
    {
      "name": "Miranda",
      "href": "miranda.html"
    },
    {
      "name": "Monsieur M",
      "href": "monsieur-m.html"
    },
    {
      "name": "Moon",
      "href": "moon.html"
    },
    {
      "name": "Mouche",
      "href": "mouche.html"
    },
    {
      "name": "Moumoune Stroud",
      "href": "moumoune-stroud.html"
    },
    {
      "name": "Nimoda",
      "href": "nimoda.html"
    },
    {
      "name": "Nora",
      "href": "nora.html"
    },
    {
      "name": "Nox",
      "href": "nox.html"
    },
    {
      "name": "Ogrest",
      "href": "ogrest.html"
    },
    {
      "name": "Otomaï",
      "href": "otomai.html"
    },
    {
      "name": "Ombrage",
      "href": "ombrage.html"
    },
    {
      "name": "Orgonax",
      "href": "orgonax.html"
    },
    {
      "name": "Oropo",
      "href": "oropo.html"
    },
    {
      "name": "Pandiego de la Vega",
      "href": "pandiego-de-la-vega.html"
    },
    {
      "name": "Pandora",
      "href": "pandora.html"
    },
    {
      "name": "Percimol",
      "href": "percimol.html"
    },
    {
      "name": "Phaeris le puissant",
      "href": "phaeris.html"
    },
    {
      "name": "Pin de Percedal",
      "href": "pin-de-percedal.html"
    },
    {
      "name": "Poo",
      "href": "poo.html"
    },
    {
      "name": "Prince Adale",
      "href": "prince-adale.html"
    },
    {
      "name": "Prince de Brakmar",
      "href": "prince-de-brakmar.html"
    },
    {
      "name": "Qilby",
      "href": "qilby.html"
    },
    {
      "name": "Rasha",
      "href": "rasha.html"
    },
    {
      "name": "Razortemps",
      "href": "razortemps.html"
    },
    {
      "name": "Reines de Bonta",
      "href": "reines-de-bonta.html"
    },
    {
      "name": "Remington Smisse",
      "href": "remington-smisse.html"
    },
    {
      "name": "Ripulse",
      "href": "ripulse.html"
    },
    {
      "name": "Roi Osamodas",
      "href": "roi-osamodas.html"
    },
    {
      "name": "Roi Sheran Sharm",
      "href": "roi-sheran-sharm.html"
    },
    {
      "name": "Rotalstrom",
      "href": "rotalstrom.html"
    },
    {
      "name": "Rubilax",
      "href": "rubilax.html"
    },
    {
      "name": "Ruel Stroud",
      "href": "ruel-stroud.html"
    },
    {
      "name": "Rushu",
      "href": "rushu.html"
    },
    {
      "name": "Shinonomé",
      "href": "shinonome.html"
    },
    {
      "name": "Sidaire",
      "href": "sidaire.html"
    },
    {
      "name": "Simone",
      "href": "simone.html"
    },
    {
      "name": "Sipho",
      "href": "sipho.html"
    },
    {
      "name": "Terrakourial",
      "href": "terrakourial.html"
    },
    {
      "name": "Toross Mordal",
      "href": "toross-mordal.html"
    },
    {
      "name": "Toxine",
      "href": "toxine.html"
    },
    {
      "name": "Tristepin de Percedal",
      "href": "tristepin.html"
    },
    {
      "name": "Uk’Not’Allag",
      "href": "uk-not-allag.html"
    },
    {
      "name": "Ush Galesh",
      "href": "ush-galesh.html"
    },
    {
      "name": "Vampyro",
      "href": "vampyro.html"
    },
    {
      "name": "Wa Wabbit",
      "href": "wa-wabbit.html"
    },
    {
      "name": "Xav le Boulanger",
      "href": "xav-le-boulanger.html"
    },
    {
      "name": "Yrehn",
      "href": "yrehn.html"
    },
    {
      "name": "Yugo",
      "href": "yugo.html"
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
  const makeIndexHref = (filter, label) => { const value = normalizeValue(label); return value ? 'personnages.html?' + filter + '=' + encodeURIComponent(value) : 'personnages.html'; };
  const splitInfoValues = (text) => text.split(/\s*,\s*/g).map((part) => part.trim()).filter(Boolean);
  const linkInfoFilters = () => { document.querySelectorAll('.info-block').forEach((block) => { const labelEl = block.querySelector('.info-label'); const value = block.querySelector('.info-value'); if (!labelEl || !value || value.querySelector('a')) return; const label = normalizeValue(labelEl.textContent || ''); const filter = label === 'classe' ? 'class' : label === 'groupe' ? 'group' : label === 'univers' ? 'universe' : ''; if (!filter) return; const parts = splitInfoValues(value.textContent || ''); if (!parts.length) return; value.replaceChildren(...parts.flatMap((part, index) => { const link = document.createElement('a'); link.className = 'character-filter-link'; link.href = makeIndexHref(filter, part); link.textContent = part; link.setAttribute('aria-label', 'Voir les personnages filtrés par ' + part); return index === 0 ? [link] : [document.createTextNode(', '), link]; })); }); };
  const initBackToTop = () => { if (!document.querySelector('.bio-panel')) return; let backToTop = document.querySelector('.back-to-top'); if (!backToTop) { backToTop = document.createElement('button'); backToTop.className = 'back-to-top'; backToTop.type = 'button'; backToTop.setAttribute('aria-label', 'Revenir en haut de la page'); backToTop.title = 'Revenir en haut'; const label = document.createElement('span'); label.setAttribute('aria-hidden', 'true'); label.textContent = '↑'; backToTop.appendChild(label); document.body.appendChild(backToTop); } const syncBackToTop = () => { backToTop.classList.toggle('is-visible', window.scrollY > 420); }; window.addEventListener('scroll', syncBackToTop, { passive: true }); backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })); syncBackToTop(); };
  const relatedCharacters = [
    {
      "name": "Adamaï",
      "href": "adamai.html",
      "image": "../assets/personnages/cartes/adamai.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Confrérie du Tofu",
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Aerafal",
      "href": "aerafal.html",
      "image": "../assets/personnages/cartes/aerafal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Agard",
      "href": "agard.html",
      "image": "../assets/personnages/cartes/agard.webp",
      "classLabel": "Forgelance",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Aguabrial",
      "href": "aguabrial.html",
      "image": "../assets/personnages/cartes/aguabrial.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Alibert",
      "href": "alibert.html",
      "image": "../assets/personnages/cartes/alibert.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Amalia Sheran Sharm",
      "href": "amalia-sheran-sharm.html",
      "image": "../assets/personnages/cartes/amalia-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Confrérie du Tofu",
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Anathar",
      "href": "anathar.html",
      "image": "../assets/personnages/cartes/anathar.webp",
      "classLabel": "Shushu",
      "groups": [
        "Ennemis",
        "Shushu"
      ]
    },
    {
      "name": "Armant Sheran Sharm",
      "href": "armant-sheran-sharm.html",
      "image": "../assets/personnages/cartes/armant-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Arpagone",
      "href": "arpagone.html",
      "image": "../assets/personnages/cartes/arpagone.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Arty",
      "href": "arty.html",
      "image": "../assets/personnages/cartes/arty.webp",
      "classLabel": "Féca",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Atcham Crépin",
      "href": "atcham-crepin.html",
      "image": "../assets/personnages/cartes/atcham-crepin.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Crépin"
      ]
    },
    {
      "name": "Atone",
      "href": "atone.html",
      "image": "../assets/personnages/cartes/atone.webp",
      "classLabel": "Eliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Aurora",
      "href": "aurora.html",
      "image": "../assets/personnages/cartes/aurora.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Bakara Jurgen",
      "href": "bakara-jurgen.html",
      "image": "../assets/personnages/cartes/bakara-jurgen.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Baltazar",
      "href": "balthazar.html",
      "image": "../assets/personnages/cartes/balthazar.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Belladone",
      "href": "belladone.html",
      "image": "../assets/personnages/cartes/belladone.webp",
      "classLabel": "Eniripsa",
      "groups": [
        "Mythe & légende",
        "Ennemis"
      ]
    },
    {
      "name": "Bellaphone",
      "href": "bellaphone.html",
      "image": "../assets/personnages/cartes/bellaphone.webp",
      "classLabel": "Monstre",
      "groups": [
        "Mythe & légende"
      ]
    },
    {
      "name": "Biste",
      "href": "biste.html",
      "image": "../assets/personnages/cartes/biste.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Bolgrot",
      "href": "bolgrot.html",
      "image": "../assets/personnages/cartes/bolgrot.webp",
      "classLabel": "Dragon",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Bordegann",
      "href": "bordegann.html",
      "image": "../assets/personnages/cartes/bordegann.webp",
      "classLabel": "Forgelance",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Bouillon",
      "href": "bouillon.html",
      "image": "../assets/personnages/cartes/bouillon.webp",
      "classLabel": "Eliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Bump",
      "href": "bump.html",
      "image": "../assets/personnages/cartes/bump.webp",
      "classLabel": "FÉCA",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Cadence",
      "href": "cadence.html",
      "image": "../assets/personnages/cartes/cadence.webp",
      "classLabel": "Xélor",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chaille",
      "href": "chaille.html",
      "image": "../assets/personnages/cartes/chaille.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chêne Mou",
      "href": "chene-mou.html",
      "image": "../assets/personnages/cartes/chene-mou.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Chevalier Justice",
      "href": "chevalier-justice.html",
      "image": "../assets/personnages/cartes/chevalier-justice.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Chibi",
      "href": "chibi.html",
      "image": "../assets/personnages/cartes/chibi.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Cire Momore",
      "href": "cire-momore.html",
      "image": "../assets/personnages/cartes/cire-momore.webp",
      "classLabel": "Maudit",
      "groups": [
        "Mythe & légende",
        "Ennemis"
      ]
    },
    {
      "name": "Cléophée",
      "href": "cleophee.html",
      "image": "../assets/personnages/cartes/cleophee.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Comte Harebourg",
      "href": "comte-harebourg.html",
      "image": "../assets/personnages/cartes/comte-harebourg.webp",
      "classLabel": "XELOR",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Coqueline",
      "href": "coqueline.html",
      "image": "../assets/personnages/cartes/coqueline.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Corbeau Noir",
      "href": "corbeau-noir.html",
      "image": "../assets/personnages/cartes/corbeau-noir.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Cornu Mollu",
      "href": "cornu-mollu.html",
      "image": "../assets/personnages/cartes/cornu-mollu.webp",
      "classLabel": "Sadida/Iop",
      "groups": [
        "Demi-dieu",
        "Ennemis"
      ]
    },
    {
      "name": "Dame Echo",
      "href": "echo.html",
      "image": "../assets/personnages/cartes/echo.webp",
      "classLabel": "ENIRIPSA",
      "groups": [
        "Demi-dieu",
        "Ennemis",
        "Fratrie"
      ]
    },
    {
      "name": "Dardondakal",
      "href": "dardondakal.html",
      "image": "../assets/personnages/cartes/dardondakal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Dark Vlad",
      "href": "dark-vlad.html",
      "image": "../assets/personnages/cartes/dark-vlad.webp",
      "classLabel": "Iop",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Dathura",
      "href": "dathura.html",
      "image": "../assets/personnages/cartes/dathura.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Déesse Cra",
      "href": "deesse-cra.html",
      "image": "../assets/personnages/cartes/deesse-cra.webp",
      "classLabel": "CRA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Eniripsa",
      "href": "deesse-eniripsa.html",
      "image": "../assets/personnages/cartes/deesse-eniripsa.webp",
      "classLabel": "ENIRIPSA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Féca",
      "href": "deesse-feca.html",
      "image": "../assets/personnages/cartes/deesse-feca.webp",
      "classLabel": "FÉCA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Panda",
      "href": "deesse-panda.html",
      "image": "../assets/personnages/cartes/deesse-panda.webp",
      "classLabel": "PANDAWA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Déesse Sacrieur",
      "href": "deesse-sacrieur.html",
      "image": "../assets/personnages/cartes/deesse-sacrieur.webp",
      "classLabel": "SACRIEUR",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Desperia",
      "href": "desperia.html",
      "image": "../assets/personnages/cartes/desperia.webp",
      "classLabel": "Eliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Dieu Écaflip",
      "href": "dieu-ecaflip.html",
      "image": "../assets/personnages/cartes/dieu-ecaflip.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Enutrof",
      "href": "dieu-enutrof.html",
      "image": "../assets/personnages/cartes/dieu-enutrof.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Iop",
      "href": "dieu-iop.html",
      "image": "../assets/personnages/cartes/dieu-iop.webp",
      "classLabel": "IOP",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Osamodas",
      "href": "dieu-osamodas.html",
      "image": "../assets/personnages/cartes/dieu-osamodas.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Ouginak",
      "href": "dieu-ouginak.html",
      "image": "../assets/personnages/cartes/dieu-ouginak.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Sadida",
      "href": "dieu-sadida.html",
      "image": "../assets/personnages/cartes/dieu-sadida.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Sram",
      "href": "dieu-sram.html",
      "image": "../assets/personnages/cartes/dieu-sram.webp",
      "classLabel": "SRAM",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Dieu Xélor",
      "href": "dieu-xelor.html",
      "image": "../assets/personnages/cartes/dieu-xelor.webp",
      "classLabel": "XÉLOR",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Djaul",
      "href": "djaul.html",
      "image": "../assets/personnages/cartes/djaul.webp",
      "classLabel": "Shushu",
      "groups": [
        "Shushu"
      ]
    },
    {
      "name": "Dragon Cochon",
      "href": "dragon-cochon.html",
      "image": "../assets/personnages/cartes/dragon-cochon.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis",
        "Figurants"
      ]
    },
    {
      "name": "Efrim",
      "href": "efrim.html",
      "image": "../assets/personnages/cartes/efrim.webp",
      "classLabel": "Dragon eliatrope",
      "groups": [
        "Eliatrope primordial",
        "Nécromes"
      ]
    },
    {
      "name": "Elaine & Encre noir",
      "href": "elaine-encre-noir.html",
      "image": "../assets/personnages/cartes/elaine-encre-noir.webp",
      "classLabel": "Roublard",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Élante",
      "href": "elante.html",
      "image": "../assets/personnages/cartes/elante.webp",
      "classLabel": "MONSTRE",
      "groups": [
        "Mythe & légende"
      ]
    },
    {
      "name": "Elely de Percedal",
      "href": "elely-de-percedal.html",
      "image": "../assets/personnages/cartes/elely-de-percedal.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Évangelyne",
      "href": "evangelyne.html",
      "image": "../assets/personnages/cartes/evangelyne.webp",
      "classLabel": "CRA",
      "groups": [
        "Confrérie du Tofu",
        "Famille Percedal",
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Flopin de Percedal",
      "href": "flopin-de-percedal.html",
      "image": "../assets/personnages/cartes/flopin-de-percedal.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Frida Mofette",
      "href": "frida-mofette.html",
      "image": "../assets/personnages/cartes/frida-mofette.webp",
      "classLabel": "Steamer",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Glip",
      "href": "glip.html",
      "image": "../assets/personnages/cartes/glip.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Goultard",
      "href": "goultard.html",
      "image": "../assets/personnages/cartes/goultard.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Grand Dragon",
      "href": "grand-dragon.html",
      "image": "../assets/personnages/cartes/grand-dragon.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Grany Smisse",
      "href": "grany-smisse.html",
      "image": "../assets/personnages/cartes/grany-smisse.webp",
      "classLabel": "Roublard",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Grougaloragran",
      "href": "grougaloragran.html",
      "image": "../assets/personnages/cartes/grougaloragran.webp",
      "classLabel": "DRAGON ELIATROPE",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Grougalorasalar",
      "href": "grougalorasalar.html",
      "image": "../assets/personnages/cartes/grougalorasalar.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Grufon",
      "href": "gruffon.html",
      "image": "../assets/personnages/cartes/gruffon.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu"
      ]
    },
    {
      "name": "Hyrkul",
      "href": "hyrkul.html",
      "image": "../assets/personnages/cartes/hyrkul.webp",
      "classLabel": "Féca",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Ignemikhal",
      "href": "ignemikhal.html",
      "image": "../assets/personnages/cartes/ignemikhal.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Igole",
      "href": "igole.html",
      "image": "../assets/personnages/cartes/igole.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Indie Delagrandaventure",
      "href": "indie-delagrandaventure.html",
      "image": "../assets/personnages/cartes/indie-delagrandaventure.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Jahash Jurgen",
      "href": "jahash-jurgen.html",
      "image": "../assets/personnages/cartes/jahash-jurgen.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Jiva",
      "href": "jiva.html",
      "image": "../assets/personnages/cartes/jiva.webp",
      "classLabel": "Divinité",
      "groups": [
        "Mythe & légende",
        "Ennemis"
      ]
    },
    {
      "name": "Joris Jurgen",
      "href": "joris-jurgen.html",
      "image": "../assets/personnages/cartes/joris-jurgen.webp",
      "classLabel": "INCONNUE",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Julith Abigor",
      "href": "julith-abigor.html",
      "image": "../assets/personnages/cartes/julith-abigor.webp",
      "classLabel": "Huppermage",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Kali",
      "href": "kali.html",
      "image": "../assets/personnages/cartes/kali.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Karn",
      "href": "karn.html",
      "image": "../assets/personnages/cartes/karn.webp",
      "classLabel": "IOP",
      "groups": [
        "Ennemis",
        "Mythe & légende"
      ]
    },
    {
      "name": "Kabrok",
      "href": "kabrok.html",
      "image": "../assets/personnages/cartes/kabrok.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Katar",
      "href": "katar.html",
      "image": "../assets/personnages/cartes/katar.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Kérubim Crépin",
      "href": "kerubim-crepin.html",
      "image": "../assets/personnages/cartes/kerubim-crepin.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Demi-dieu",
        "Héros",
        "Crépin"
      ]
    },
    {
      "name": "Khan Karkass",
      "href": "khan-karkass.html",
      "image": "../assets/personnages/cartes/khan-karkass.webp",
      "classLabel": "Iop",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Kriss la Krass",
      "href": "kriss-la-krass.html",
      "image": "../assets/personnages/cartes/kriss-la-krass.webp",
      "classLabel": "Sacrieur",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "La Déesse Éliatrope",
      "href": "grande-deesse-eliatrope.html",
      "image": "../assets/personnages/cartes/grande-deesse-eliatrope.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Dieu"
      ]
    },
    {
      "name": "Lance Dur",
      "href": "lancedur.html",
      "image": "../assets/personnages/cartes/lancedur.webp",
      "classLabel": "FORGELANCE",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Les Miss Moches",
      "href": "les-miss-moches.html",
      "image": "../assets/personnages/cartes/les-miss-moches.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Lilotte",
      "href": "lilotte.html",
      "image": "../assets/personnages/cartes/lilotte.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Lokus",
      "href": "lokus.html",
      "image": "../assets/personnages/cartes/lokus.webp",
      "classLabel": "Mechasme",
      "groups": [
        "Mechasme"
      ]
    },
    {
      "name": "Lou",
      "href": "lou.html",
      "image": "../assets/personnages/cartes/lou.webp",
      "classLabel": "Ouginak",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Luis",
      "href": "luis.html",
      "image": "../assets/personnages/cartes/luis.webp",
      "classLabel": "Shushu",
      "groups": [
        "Héros",
        "Shushu"
      ]
    },
    {
      "name": "Madagaskan",
      "href": "madagaskan.html",
      "image": "../assets/personnages/cartes/madagaskan.webp",
      "classLabel": "CRA",
      "groups": [
        "Famille d'Évangelyne"
      ]
    },
    {
      "name": "Maskemane",
      "href": "maskemane.html",
      "image": "../assets/personnages/cartes/maskemane.webp",
      "classLabel": "Zobal",
      "groups": [
        "Mythe & légende",
        "Héros"
      ]
    },
    {
      "name": "Maude",
      "href": "maude.html",
      "image": "../assets/personnages/cartes/maude.webp",
      "classLabel": "Sram",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Médoroziam",
      "href": "medoroziam.html",
      "image": "../assets/personnages/cartes/medoroziam.webp",
      "classLabel": "Démon",
      "groups": [
        "Démon"
      ]
    },
    {
      "name": "Mina",
      "href": "mina.html",
      "image": "../assets/personnages/cartes/mina.webp",
      "classLabel": "Éliatrope",
      "groups": [
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Miranda",
      "href": "miranda.html",
      "image": "../assets/personnages/cartes/miranda.webp",
      "classLabel": "Ecaflip",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Monsieur M",
      "href": "monsieur-m.html",
      "image": "../assets/personnages/cartes/monsieur-m.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Moon",
      "href": "moon.html",
      "image": "../assets/personnages/cartes/moon.webp",
      "classLabel": "Monstre",
      "groups": [
        "Dieu",
        "Mythe & légende"
      ]
    },
    {
      "name": "Mouche",
      "href": "mouche.html",
      "image": "../assets/personnages/cartes/mouche.webp",
      "classLabel": "Crâ",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Moumoune Stroud",
      "href": "moumoune-stroud.html",
      "image": "../assets/personnages/cartes/moumoune-stroud.webp",
      "classLabel": "Enutrof",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Nimoda",
      "href": "nimoda.html",
      "image": "../assets/personnages/cartes/nimoda.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Nora",
      "href": "nora.html",
      "image": "../assets/personnages/cartes/nora.webp",
      "classLabel": "Eliatrope",
      "groups": [
        "Eliatrope primordial"
      ]
    },
    {
      "name": "Nox",
      "href": "nox.html",
      "image": "../assets/personnages/cartes/nox.webp",
      "classLabel": "XELOR",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Ogrest",
      "href": "ogrest.html",
      "image": "../assets/personnages/cartes/ogrest.webp",
      "classLabel": "OGRE",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Otomaï",
      "href": "otomai.html",
      "image": "../assets/personnages/cartes/otomai.webp",
      "classLabel": "Féca",
      "groups": [
        "Héros",
        "Mythe & légende"
      ]
    },
    {
      "name": "Ombrage",
      "href": "ombrage.html",
      "image": "../assets/personnages/cartes/ombrage.webp",
      "classLabel": "Shushu",
      "groups": [
        "Shushu",
        "Ennemis"
      ]
    },
    {
      "name": "Orgonax",
      "href": "orgonax.html",
      "image": "../assets/personnages/cartes/orgonax.webp",
      "classLabel": "Mechasme",
      "groups": [
        "Mechasme"
      ]
    },
    {
      "name": "Oropo",
      "href": "oropo.html",
      "image": "../assets/personnages/cartes/oropo.webp",
      "classLabel": "ELIOTROPE",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Pandiego de la Vega",
      "href": "pandiego-de-la-vega.html",
      "image": "../assets/personnages/cartes/pandiego-de-la-vega.webp",
      "classLabel": "Pandawa",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Pandora",
      "href": "pandora.html",
      "image": "../assets/personnages/cartes/pandora.webp",
      "classLabel": "Voyageur temporel",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Percimol",
      "href": "percimol.html",
      "image": "../assets/personnages/cartes/percimol.webp",
      "classLabel": "Monstre",
      "groups": [
        "Mythe & légende",
        "Héros"
      ]
    },
    {
      "name": "Phaeris le puissant",
      "href": "phaeris.html",
      "image": "../assets/personnages/cartes/phaeris.webp",
      "classLabel": "Dragon eliatrope",
      "groups": [
        "Eliatrope primordial"
      ]
    },
    {
      "name": "Pin de Percedal",
      "href": "pin-de-percedal.html",
      "image": "../assets/personnages/cartes/pin-de-percedal.webp",
      "classLabel": "IOP",
      "groups": [
        "Famille Percedal"
      ]
    },
    {
      "name": "Poo",
      "href": "poo.html",
      "image": "../assets/personnages/cartes/poo.webp",
      "classLabel": "PANDAWA",
      "groups": [
        "Demi-dieu",
        "Fratrie"
      ]
    },
    {
      "name": "Prince Adale",
      "href": "prince-adale.html",
      "image": "../assets/personnages/cartes/prince-adale.webp",
      "classLabel": "Steamer",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Prince de Brakmar",
      "href": "prince-de-brakmar.html",
      "image": "../assets/personnages/cartes/prince-de-brakmar.webp",
      "classLabel": "Sram",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Qilby",
      "href": "qilby.html",
      "image": "../assets/personnages/cartes/qilby.webp",
      "classLabel": "ELIATROPE",
      "groups": [
        "Ennemis",
        "Éliatrope primordial"
      ]
    },
    {
      "name": "Rasha",
      "href": "rasha.html",
      "image": "../assets/personnages/cartes/rasha.webp",
      "classLabel": "Démon",
      "groups": [
        "Démon"
      ]
    },
    {
      "name": "Razortemps",
      "href": "razortemps.html",
      "image": "../assets/personnages/cartes/razortemps.webp",
      "classLabel": "INCONNUE",
      "groups": [
        "WIP"
      ]
    },
    {
      "name": "Reines de Bonta",
      "href": "reines-de-bonta.html",
      "image": "../assets/personnages/cartes/reines-de-bonta.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Remington Smisse",
      "href": "remington-smisse.html",
      "image": "../assets/personnages/cartes/remington-smisse.webp",
      "classLabel": "Roublard",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Ripulse",
      "href": "ripulse.html",
      "image": "../assets/personnages/cartes/ripulse.webp",
      "classLabel": "Eliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Roi Osamodas",
      "href": "roi-osamodas.html",
      "image": "../assets/personnages/cartes/roi-osamodas.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Roi Sheran Sharm",
      "href": "roi-sheran-sharm.html",
      "image": "../assets/personnages/cartes/roi-sheran-sharm.webp",
      "classLabel": "SADIDA",
      "groups": [
        "Famille Sheran Sharm"
      ]
    },
    {
      "name": "Rotalstrom",
      "href": "rotalstrom.html",
      "image": "../assets/personnages/cartes/rotalstrom.webp",
      "classLabel": "Dragon",
      "groups": [
        "Nécromes",
        "Dragon primordial"
      ]
    },
    {
      "name": "Rubilax",
      "href": "rubilax.html",
      "image": "../assets/personnages/cartes/rubilax.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu"
      ]
    },
    {
      "name": "Ruel Stroud",
      "href": "ruel-stroud.html",
      "image": "../assets/personnages/cartes/ruel-stroud.webp",
      "classLabel": "ENUTROF",
      "groups": [
        "Confrérie du Tofu"
      ]
    },
    {
      "name": "Rushu",
      "href": "rushu.html",
      "image": "../assets/personnages/cartes/rushu.webp",
      "classLabel": "DÉMON",
      "groups": [
        "Démon",
        "Ennemis"
      ]
    },
    {
      "name": "Shinonomé",
      "href": "shinonome.html",
      "image": "../assets/personnages/cartes/shinonome.webp",
      "classLabel": "Dragon eliatrope",
      "groups": [
        "Eliatrope primordial"
      ]
    },
    {
      "name": "Sidaire",
      "href": "sidaire.html",
      "image": "../assets/personnages/cartes/sidaire.webp",
      "classLabel": "Eliotrope",
      "groups": [
        "Ennemis",
        "Fratrie",
        "Eliotropes"
      ]
    },
    {
      "name": "Simone",
      "href": "simone.html",
      "image": "../assets/personnages/cartes/simone.webp",
      "classLabel": "Osamodas",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Sipho",
      "href": "sipho.html",
      "image": "../assets/personnages/cartes/sipho.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Terrakourial",
      "href": "terrakourial.html",
      "image": "../assets/personnages/cartes/terrakourial.webp",
      "classLabel": "DRAGON",
      "groups": [
        "Dragon primordial"
      ]
    },
    {
      "name": "Toross Mordal",
      "href": "toross-mordal.html",
      "image": "../assets/personnages/cartes/toross-mordal.webp",
      "classLabel": "IOP",
      "groups": [
        "Nécromes"
      ]
    },
    {
      "name": "Toxine",
      "href": "toxine.html",
      "image": "../assets/personnages/cartes/toxine.webp",
      "classLabel": "Sram",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Tristepin de Percedal",
      "href": "tristepin.html",
      "image": "../assets/personnages/cartes/tristepin.webp",
      "classLabel": "IOP",
      "groups": [
        "Confrérie du Tofu",
        "Famille Percedal"
      ]
    },
    {
      "name": "Uk’Not’Allag",
      "href": "uk-not-allag.html",
      "image": "../assets/personnages/cartes/uk-not-allag.webp",
      "classLabel": "SHUSHU",
      "groups": [
        "Shushu",
        "Ennemis"
      ]
    },
    {
      "name": "Ush Galesh",
      "href": "ush-galesh.html",
      "image": "../assets/personnages/cartes/ush-galesh.webp",
      "classLabel": "ÉCAFLIP",
      "groups": [
        "Fratrie",
        "Demi-dieu"
      ]
    },
    {
      "name": "Vampyro",
      "href": "vampyro.html",
      "image": "../assets/personnages/cartes/vampyro.webp",
      "classLabel": "Iop",
      "groups": [
        "Ennemis"
      ]
    },
    {
      "name": "Wa Wabbit",
      "href": "wa-wabbit.html",
      "image": "../assets/personnages/cartes/wa-wabbit.webp",
      "classLabel": "Monstre",
      "groups": [
        "Ennemis",
        "Mythe & légende"
      ]
    },
    {
      "name": "Xav le Boulanger",
      "href": "xav-le-boulanger.html",
      "image": "../assets/personnages/cartes/xav-le-boulanger.webp",
      "classLabel": "Inconnue",
      "groups": [
        "Figurants"
      ]
    },
    {
      "name": "Yrehn",
      "href": "yrehn.html",
      "image": "../assets/personnages/cartes/yrehn.webp",
      "classLabel": "OSAMODAS",
      "groups": [
        "Héros"
      ]
    },
    {
      "name": "Yugo",
      "href": "yugo.html",
      "image": "../assets/personnages/cartes/yugo.webp",
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
  const init = () => { updateHeroNavigation(); linkInfoFilters(); initBackToTop(); initCharacterBiographyMode(); createRelatedPanel(); createCrossGroupPanel(); initBiographyScrollIndicator(); initBiographyScrollFade(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
