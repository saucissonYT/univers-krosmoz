

(function () {
  const currentScript = document.currentScript;
  const siteRoot = currentScript ? new URL("../", currentScript.src) : new URL("/", window.location.href);

  const seedEntries = [
    {
      title: "Accueil",
      type: "Page",
      href: "index.html",
      summary: "Point d'entree vers l'histoire, les personnages, les chronologies et le lexique du Krosmoz.",
      keywords: "univers krosmoz dofus wakfu waven accueil"
    },
    {
      title: "Personnages",
      type: "Page",
      href: "pages/personnages/personnages.html",
      summary: "Index des personnages majeurs du Krosmoz avec filtres par classe, groupe et univers.",
      keywords: "yugo adamai tristepin evangelyne ruel nox qilby oropo personnages"
    },
    {
      title: "Histoire du Krosmoz",
      type: "Histoire",
      href: "pages/histoire/histoire-krosmoz.html",
      summary: "Fil conducteur des grandes ères du Krosmoz, depuis les origines jusqu'à l’ère du Waven.",
      keywords: "origines âge primitif dofus wakfu waven chaos ogrest histoire"
    },
    {
      title: "Origines",
      type: "Histoire",
      href: "pages/histoire/histoire-origines.html",
      summary: "Naissance du Krosmoz, forces primordiales et premiers fondements du monde.",
      keywords: "origines krosmoz grand dragon grande deesse éliatrope stasis wakfu"
    },
    {
      title: "Âge des Dofus",
      type: "Histoire",
      href: "pages/histoire/histoire-age-des-dofus.html",
      summary: "Epoque du Monde des Douze, des Dofus primordiaux et des grandes nations.",
      keywords: "dofus monde des douze bonta brakmar amakna sufokia"
    },
    {
      title: "Chaos d'Ogrest",
      type: "Histoire",
      href: "pages/histoire/histoire-chaos-ogrest.html",
      summary: "Cataclysme provoque par Ogrest et bouleversements majeurs du Monde des Douze.",
      keywords: "ogrest chaos dathura mont zinit dofus"
    },
    {
      title: "Ère du Wakfu",
      type: "Histoire",
      href: "pages/histoire/histoire-ere-du-wakfu.html",
      summary: "Periode de la Confrerie du Tofu et des aventures de Yugo.",
      keywords: "wakfu yugo confrerie tofu éliatrope nox qilby"
    },
    {
      title: "Ère du Waven",
      type: "Histoire",
      href: "pages/histoire/histoire-ere-du-waven.html",
      summary: "Le monde englouti et les suites des grands bouleversements du Krosmoz.",
      keywords: "waven monde englouti krosmoz"
    },
    {
      title: "Chronologie historique",
      type: "Chronologie",
      href: "pages/chronologies/chronologie-historique.html",
      summary: "Frise des grands événements du Krosmoz.",
      keywords: "événements timeline âge dofus wakfu waven ogrest"
    },
    {
      title: "Chronologie des œuvres",
      type: "Chronologie",
      href: "pages/chronologies/chronologie-oeuvres.html",
      summary: "Parcours des séries, jeux, mangas, webtoons et autres œuvres liées au Krosmoz.",
      keywords: "œuvres ankama wakfu dofus waven manga serie webtoon"
    },
    {
      title: "Lexique",
      type: "Lexique",
      href: "pages/lexique/lexique.html",
      summary: "Definitions des lieux, peuples, energies, objets, entites et monstres du Krosmoz.",
      keywords: "lexique definitions wakfu stasis dofus shushu"
    },
    {
      title: "Régions",
      type: "Région",
      href: "pages/regions/regions.html",
      summary: "Index des régions majeures du Krosmoz, des plans divins aux terres du Monde des Douze.",
      keywords: "régions lieux monde des douze incarnam necromonde amakna astrub bonta brakmar frigost sufokia pandala osavora enutrosor"
    },
    {
      title: "Incarnam",
      type: "Région",
      href: "pages/regions/incarnam.html",
      summary: "Plan spirituel suspendu au-dessus du Monde des Douze, où les âmes viennent s'incarner ou se réincarner avant de rejoindre le monde matériel.",
      keywords: "incarnam prysmaradoth ames incarnation reincarnation astrub kardorim hargnok milimulou ternette nhin kerubims kerubim crepin"
    },
    {
      title: "Nécromonde",
      type: "Région",
      href: "pages/regions/necromonde.html",
      summary: "Planète mourante vidée de son Wakfu, royaume de Toross Mordal et prison de la Grande Déesse Éliatrope.",
      keywords: "necromonde toross mordal necromes wakfu grande deesse eliatrope nora efrim dofus planete mourante"
    },
    {
      title: "Osavora",
      type: "Région",
      href: "pages/regions/osavora.html",
      summary: "Dimension sauvage liée au Dieu Osamodas, située sur le dos de Gargandyas et dominée par la loi de la prédation.",
      keywords: "osavora osamodas gargandyas osavane rhoarims zarbivores kabombz osamandyas reprouve"
    },
    {
      title: "Enutrosor",
      type: "Région",
      href: "pages/regions/enutrosor.html",
      summary: "Royaume du Dieu Enutrof, coffre-fort céleste rempli d'or, de kamas, de mines et de confréries vouées à la richesse.",
      keywords: "enutrosor enutrof kamas or tresor quatrieme dimension koffrefors phorreurs phossile roi nidas reine des voleurs"
    },
    {
      title: "Jeux",
      type: "Page",
      href: "pages/jeux/jeux.html",
      summary: "Index des jeux du site : test de personnage et grand quiz aleatoire du Krosmoz.",
      keywords: "jeux quiz jeu personnage krosmoz questions score"
    },
    {
      title: "Grand quiz du Krosmoz",
      type: "Jeu",
      href: "pages/jeux/quiz-krosmoz.html",
      summary: "Quiz aleatoire avec questions sur les personnages, l'histoire, les lieux, les objets, les peuples et le lexique.",
      keywords: "quiz krosmoz questions aleatoire personnages histoire lieux dofus wakfu waven"
    },
    {
      title: "Jeu personnage",
      type: "Jeu",
      href: "pages/jeux/jeu-personnage.html",
      summary: "Test pour decouvrir quel personnage du Krosmoz vous ressemble le plus.",
      keywords: "jeu personnage personnage resultat yugo nox amalia tristepin"
    },
    {
      title: "À propos",
      type: "Page",
      href: "pages/about/a-propos.html",
      summary: "Présentation du site Univers Krosmoz, de Zaki et des sources utilisées pour documenter les articles.",
      keywords: "a propos zaki sources ankama allskreen wiki role play dofus krosmoz otakia"
    },
    {
      title: "Contactez-nous",
      type: "Page",
      href: "pages/contact/contact.html",
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
    const doc = await readDocument("pages/personnages/personnages.html");
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
    const doc = await readDocument("pages/lexique/lexique.html");
    return Array.from(doc.querySelectorAll(".lexicon-entry")).map((entry) => {
      const title = entry.querySelector("h2")?.textContent || "Entree du lexique";
      const category = entry.querySelector(".lexicon-entry-type")?.textContent || "Lexique";
      const summary = compactText(entry.querySelector("p")?.textContent || "");

      return {
        title,
        type: `Lexique - ${category}`,
        href: absoluteHref(`pages/lexique/lexique.html?q=${encodeURIComponent(title)}#${slugify(title)}`),
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
      if (entry.searchText.includes(term)) score += 10;
    });

    return score;
  };

  const renderResults = (resultsContainer, entries, query) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) {
      setSearchMessage(resultsContainer, "krosmoz-search-empty", "Tapez un personnage ou un mot du lexique.");
      return;
    }

    const results = entries
      .filter((entry) => !isMobileMapLocked() || !isMapHref(entry.href))
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter((result) => result.score > 0 && terms.every((term) => result.entry.searchText.includes(term) || normalize(result.entry.title).includes(term)))
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
