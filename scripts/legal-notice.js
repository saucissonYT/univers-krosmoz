

(function () {
  const sharedScript = document.currentScript;
  const globalSearchUrl = sharedScript ? new URL("global-search.js", sharedScript.src).href : "";
  const searchDataUrl = sharedScript ? new URL("../data/search/search-data.js", sharedScript.src).href : "";
  const mobileMapLockQuery = "(max-width: 1024px), (pointer: coarse) and (max-width: 1180px)";

  const isMobileMapLocked = () => window.matchMedia(mobileMapLockQuery).matches;

  const isMapPathname = (pathname) => pathname.toLowerCase().includes("/__section-cartes-supprimee__/");

  const isMapHref = (href) => {
    if (!href) {
      return false;
    }

    try {
      return isMapPathname(new URL(href, window.location.href).pathname);
    } catch (error) {
      return href.toLowerCase().includes("__section-cartes-supprimee__/");
    }
  };

  const noticeLines = [
    "Univers Krosmoz est un site cr\u00e9\u00e9 par des passionn\u00e9s pour c\u00e9l\u00e9brer l\u2019univers du Krosmoz et les projets d'animations et d'\u00e9ditions d\u2019Ankama.",
    "Toutes les \u0153uvres du Krosmoz et leurs contenus associ\u00e9s demeurent la propri\u00e9t\u00e9 d\u2019Ankama.",
    "Ce site est enti\u00e8rement non-officiel et n'est pas li\u00e9 \u00e0 Ankama."
  ];

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@ZakiWakfu",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.4V8.6l5.7 3.4L10 15.4Z"/></svg>'
    },
    {
      label: "Discord",
      href: "https://discord.gg/5Hcf5MZjPP",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.4A16.2 16.2 0 0 0 15.4 4l-.5 1.1a14.7 14.7 0 0 0-5.8 0L8.6 4a16.2 16.2 0 0 0-4.1 1.4C2 9.1 1.4 12.7 1.7 16.2A16.5 16.5 0 0 0 6.7 19l1.1-1.8a10.6 10.6 0 0 1-1.7-.8l.4-.3a11.7 11.7 0 0 0 11 0l.4.3a10.6 10.6 0 0 1-1.7.8l1.1 1.8a16.5 16.5 0 0 0 5-2.8c.4-4-.6-7.6-2.8-10.8ZM8.8 14.1c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.4 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"/></svg>'
    },
    {
      label: "Twitter",
      href: "https://x.com/ZakiWakfu",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 10.2 22.1 1h-1.8l-6.7 8-5.4-8H2l8.1 12L2 23h1.8l7.1-8.5 5.7 8.5H22l-7.6-12.8Zm-2.5 3-1-.1L4.4 2.4h2.9l5.3 8.8 1 .1 6.8 10.4h-2.9l-5.6-8.5Z"/></svg>'
    }
  ];

  const createSocialLinks = (className) => {
    const socials = document.createElement("div");
    socials.className = className;

    socialLinks.forEach((social) => {
      const link = document.createElement("a");
      link.className = "krosmoz-social-link";
      link.href = social.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", social.label);
      link.title = social.label;
      link.innerHTML = social.icon;
      socials.append(link);
    });

    return socials;
  };

  const languageOptions = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" }
  ];

  const getCookieDomain = () => {
    const host = window.location.hostname;
    return host && !host.includes("localhost") && !/^\d+\.\d+\.\d+\.\d+$/.test(host) ? `;domain=.${host}` : "";
  };

  const getTranslateCookieTargets = () => {
    const host = window.location.hostname;
    const targets = [""];

    if (host && !host.includes("localhost") && !/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      targets.push(`;domain=${host}`, `;domain=.${host}`);
    }

    return targets;
  };

  const clearTranslateCookie = () => {
    getTranslateCookieTargets().forEach((cookieDomain) => {
      document.cookie = `googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT${cookieDomain}`;
      document.cookie = `googtrans=;path=/;max-age=0${cookieDomain}`;
    });
  };

  const setTranslateCookie = (targetLanguage) => {
    if (targetLanguage === "fr") {
      clearTranslateCookie();
      return;
    }

    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    const value = `/fr/${targetLanguage}`;
    getTranslateCookieTargets().forEach((cookieDomain) => {
      document.cookie = `googtrans=${value};path=/;${expires}${cookieDomain}`;
    });
  };

  const getStoredLanguage = () => {
    try {
      return window.localStorage.getItem("krosmoz-language") || "fr";
    } catch (error) {
      return "fr";
    }
  };

  const setStoredLanguage = (targetLanguage) => {
    try {
      window.localStorage.setItem("krosmoz-language", targetLanguage);
    } catch (error) {
      // La traduction reste possible via le cookie même si le stockage local est bloqué.
    }
  };

  let translateReadyPromise;

  window.krosmozTranslateInit = () => {
    if (!window.google || !window.google.translate) {
      return;
    }

    if (!document.querySelector("#google_translate_element select")) {
      new window.google.translate.TranslateElement({
        pageLanguage: "fr",
        includedLanguages: "fr,en,es,pt",
        autoDisplay: false
      }, "google_translate_element");
    }
  };

  const loadTranslateEngine = () => {
    if (translateReadyPromise) {
      return translateReadyPromise;
    }

    translateReadyPromise = new Promise((resolve, reject) => {
      if (!document.querySelector("#google_translate_element")) {
        const host = document.createElement("div");
        host.id = "google_translate_element";
        host.setAttribute("aria-hidden", "true");
        document.body.append(host);
      }

      const waitForSelect = () => {
        const select = document.querySelector("#google_translate_element select, .goog-te-combo");
        if (select && select.options.length > 1) {
          resolve(select);
          return;
        }

        window.setTimeout(waitForSelect, 120);
      };

      if (document.querySelector('script[data-krosmoz-translate]')) {
        waitForSelect();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=krosmozTranslateInit";
      script.defer = true;
      script.dataset.krosmozTranslate = "true";
      script.addEventListener("load", waitForSelect, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.body.append(script);
    });

    return translateReadyPromise;
  };

  const applyLanguage = async (targetLanguage) => {
    setStoredLanguage(targetLanguage);
    setTranslateCookie(targetLanguage);

    window.setTimeout(() => window.location.reload(), 80);
  };

  const restoreStoredLanguage = () => {
    const storedLanguage = getStoredLanguage();
    if (storedLanguage === "fr") {
      setTranslateCookie("fr");
      return;
    }

    setTranslateCookie(storedLanguage);
    loadTranslateEngine()
      .then((select) => {
        if (select.value !== storedLanguage) {
          select.value = storedLanguage;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        }
      })
      .catch(() => {
        // Si le moteur externe ne répond pas, on garde juste le choix pour la prochaine page.
      });
  };

  const createLanguageSelector = () => {
    const language = document.createElement("div");
    language.className = "krosmoz-language notranslate";
    language.setAttribute("translate", "no");

    const button = document.createElement("button");
    button.className = "krosmoz-language-toggle";
    button.type = "button";
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Choisir la langue");
    button.title = "Langue";
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.1a9.9 9.9 0 1 0 0 19.8 9.9 9.9 0 0 0 0-19.8Zm6.9 8.8h-3.1a15.4 15.4 0 0 0-1.2-5 7.8 7.8 0 0 1 4.3 5Zm-6.9-6.7c.7 1 1.5 3.1 1.7 6.7h-3.4c.2-3.6 1-5.7 1.7-6.7Zm-2.6 1.7a15.4 15.4 0 0 0-1.2 5H5.1a7.8 7.8 0 0 1 4.3-5Zm-4.3 7h3.1a15.4 15.4 0 0 0 1.2 5 7.8 7.8 0 0 1-4.3-5Zm6.9 6.7c-.7-1-1.5-3.1-1.7-6.7h3.4c-.2 3.6-1 5.7-1.7 6.7Zm2.6-1.7a15.4 15.4 0 0 0 1.2-5h3.1a7.8 7.8 0 0 1-4.3 5Z"/>
      </svg>
    `;

    const menu = document.createElement("div");
    menu.className = "krosmoz-language-menu";
    menu.setAttribute("role", "menu");

    languageOptions.forEach((option) => {
      const item = document.createElement("button");
      item.className = "krosmoz-language-option";
      item.type = "button";
      item.setAttribute("role", "menuitem");
      item.dataset.language = option.code;
      item.textContent = option.label;
      if (getStoredLanguage() === option.code) {
        item.classList.add("is-active");
        item.setAttribute("aria-current", "true");
      }
      item.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        applyLanguage(option.code);
      });
      menu.append(item);
    });

    const setOpen = (isOpen) => {
      language.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
    };

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!language.classList.contains("is-open"));
    });

    document.addEventListener("click", (event) => {
      if (!language.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    language.append(button, menu);
    return language;
  };

  const loadGlobalSearch = () => {
    if (!globalSearchUrl || document.querySelector('script[data-krosmoz-global-search]')) {
      return;
    }

    const loadSearchScript = () => {
      if (document.querySelector('script[data-krosmoz-global-search]')) {
        return;
      }

      const script = document.createElement("script");
      script.src = globalSearchUrl;
      script.defer = true;
      script.dataset.krosmozGlobalSearch = "true";
      document.body.append(script);
    };

    if (searchDataUrl && !document.querySelector('script[data-krosmoz-search-data]')) {
      const dataScript = document.createElement("script");
      dataScript.src = searchDataUrl;
      dataScript.defer = true;
      dataScript.dataset.krosmozSearchData = "true";
      dataScript.addEventListener("load", loadSearchScript, { once: true });
      dataScript.addEventListener("error", loadSearchScript, { once: true });
      document.body.append(dataScript);
      return;
    }

    loadSearchScript();
  };

  const shouldMountShareButton = () => {
    const path = window.location.pathname.toLowerCase();
    const page = path.split("/").pop() || "";

    if (path.includes("/pages/personnages/")) {
      return page !== "personnages";
    }

    if (
      path.includes("/__section-cartes-supprimee__/section-supprimee") &&
      ["wakfu", "dofus"].includes(new URLSearchParams(window.location.search).get("era"))
    ) {
      return false;
    }

    return (
      path.includes("/pages/chronologies/") ||
      path.includes("/pages/histoire/") ||
      path.includes("/__section-cartes-supprimee__/")
    );
  };

  const getContactHref = () => {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("/pages/contact/")) {
      return "contact";
    }

    if (
      path.includes("/pages/personnages/") ||
      path.includes("/pages/histoire/") ||
      path.includes("/pages/chronologies/") ||
      path.includes("/pages/regions/") ||
      path.includes("/pages/lexique/") ||
      path.includes("/pages/media/") ||
      path.includes("/pages/jeux/") ||
      path.includes("/__section-cartes-supprimee__/")
    ) {
      return "../contact/contact";
    }

    return "pages/contact/contact";
  };

  const createContributionLink = () => {
    const link = document.createElement("a");
    link.className = "krosmoz-contribution-link";
    link.href = getContactHref();
    link.textContent = "Contribuez au contenu";
    return link;
  };

  let mobileMapNoticeTimer;

  const showMobileMapNotice = () => {
    let notice = document.querySelector(".krosmoz-mobile-map-notice");
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "krosmoz-mobile-map-notice";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      notice.textContent = "Les cartes interactives sont disponibles uniquement sur ordinateur.";
      document.body.append(notice);
    }

    notice.classList.add("is-visible");
    window.clearTimeout(mobileMapNoticeTimer);
    mobileMapNoticeTimer = window.setTimeout(() => {
      notice.classList.remove("is-visible");
    }, 2800);
  };

  const mountMobileMapBlocker = () => {
    if (!isMapPathname(window.location.pathname) || !isMobileMapLocked()) {
      document.body.classList.remove("is-mobile-map-page-blocked");
      document.querySelector(".krosmoz-mobile-map-blocker-main")?.remove();
      return;
    }

    document.body.classList.add("is-mobile-map-page-blocked");

    if (document.querySelector(".krosmoz-mobile-map-blocker-main")) {
      return;
    }

    const isNestedPage = window.location.pathname.toLowerCase().includes("/__section-cartes-supprimee__/");
    const homeHref = isNestedPage ? "../" : "./";
    const blocker = document.createElement("main");
    blocker.className = "krosmoz-mobile-map-blocker-main";
    blocker.innerHTML = `
      <section class="krosmoz-mobile-map-blocker" aria-labelledby="krosmoz-mobile-map-title">
        <span class="krosmoz-mobile-map-eyebrow">Cartes verrouillées sur mobile</span>
        <h1 id="krosmoz-mobile-map-title">Cette section est disponible sur ordinateur.</h1>
        <p>Les cartes interactives demandent une surface d'affichage plus large pour rester lisibles et confortables.</p>
        <a class="krosmoz-mobile-map-action" href="${homeHref}">Retour à l'accueil</a>
      </section>
    `;

    const header = document.querySelector("header");
    if (header) {
      header.after(blocker);
    } else {
      document.body.prepend(blocker);
    }
  };

  const updateMobileMapLock = () => {
    const locked = isMobileMapLocked();
    document.documentElement.classList.toggle("is-mobile-map-locked", locked);

    document.querySelectorAll("a[href]").forEach((link) => {
      const pointsToMap = isMapHref(link.getAttribute("href"));
      if (locked && pointsToMap) {
        link.setAttribute("data-krosmoz-map-locked", "true");
      } else {
        link.removeAttribute("data-krosmoz-map-locked");
      }

      const homeBand = link.closest(".home-band-maps");
      if (homeBand) {
        homeBand.classList.toggle("is-mobile-map-hidden", locked && pointsToMap);
      }

      if (!pointsToMap) {
        return;
      }

      if (locked) {
        if (!link.dataset.krosmozPreviousTabindex) {
          link.dataset.krosmozPreviousTabindex = link.getAttribute("tabindex") || "";
        }
        link.setAttribute("tabindex", "-1");
        link.setAttribute("aria-hidden", "true");
      } else {
        const previousTabindex = link.dataset.krosmozPreviousTabindex || "";
        if (previousTabindex) {
          link.setAttribute("tabindex", previousTabindex);
        } else {
          link.removeAttribute("tabindex");
        }
        link.removeAttribute("aria-hidden");
        delete link.dataset.krosmozPreviousTabindex;
      }
    });

    mountMobileMapBlocker();
  };

  const mountContributionLink = () => {
    if (document.querySelector(".krosmoz-contribution-link")) {
      return;
    }

    const path = window.location.pathname.toLowerCase();
    const page = path.split("/").pop() || "";
    const link = createContributionLink();

    if (path.includes("/pages/personnages/") && page !== "personnages") {
      const isFullBiography = new URLSearchParams(window.location.search).get("bio") === "complete";
      if (!isFullBiography) {
        const infoPanel = document.querySelector(".info-panel");
        if (infoPanel) {
          infoPanel.append(link);
          return;
        }
      }

      const characterMain = document.querySelector(".character-main");
      if (characterMain) {
        characterMain.append(link);
      }
      return;
    }

    if (path.includes("/pages/histoire/")) {
      if (page === "histoire-krosmoz") {
        return;
      }

      const detailMain = document.querySelector(".history-detail-main");
      if (detailMain) {
        detailMain.append(link);
        return;
      }

      const detailSide = document.querySelector(".history-detail-side");
      if (detailSide) {
        detailSide.append(link);
        return;
      }

      const historyHero = document.querySelector(".history-hero");
      const historyDescription = historyHero ? historyHero.querySelector("p:last-of-type") : null;
      if (historyDescription) {
        historyDescription.before(link);
      } else if (historyHero) {
        historyHero.append(link);
      }
      return;
    }

    if (path.includes("/pages/chronologies/")) {
      const main = document.querySelector("main");
      if (main) {
        main.append(link);
      }
      return;
    }

    if (path.includes("/pages/lexique/")) {
      const lexiconMain = document.querySelector(".lexicon-main");
      if (lexiconMain) {
        lexiconMain.prepend(link);
      }
    }
  };

  const getShareUrl = () => {
    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonical ? canonical.href : "";

    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      return `${window.location.origin}${window.location.pathname}${window.location.search}`;
    }

    if (canonicalUrl && window.location.search) {
      return `${canonicalUrl.split("?")[0]}${window.location.search}`;
    }

    return canonicalUrl || window.location.href.split("#")[0];
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.top = "-9999px";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  };

  const createShareButton = () => {
    const share = document.createElement("section");
    share.className = "krosmoz-page-share";
    share.setAttribute("aria-label", "Partager cette page");

    const button = document.createElement("button");
    button.className = "krosmoz-share-button";
    button.type = "button";
    button.setAttribute("aria-label", "Partager cette page");
    button.title = "Partager";
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 16.1c-1 0-1.9.4-2.5 1.1L8.9 13.4c.1-.4.1-.7 0-1.1l6.5-3.8A3.2 3.2 0 1 0 14.3 7l-6.5 3.8a3.2 3.2 0 1 0 0 4.2l6.6 3.9A3.2 3.2 0 1 0 18 16.1Z"/>
      </svg>
    `;

    const status = document.createElement("span");
    status.className = "krosmoz-share-status";
    status.setAttribute("aria-live", "polite");

    let resetTimer;
    button.addEventListener("click", async () => {
      clearTimeout(resetTimer);
      try {
        await copyText(getShareUrl());
        status.textContent = "Lien copie !";
        button.classList.add("is-copied");
      } catch (error) {
        status.textContent = "Copie impossible";
        button.classList.remove("is-copied");
      }

      resetTimer = window.setTimeout(() => {
        status.textContent = "";
        button.classList.remove("is-copied");
      }, 2400);
    });

    share.append(button, status);
    return share;
  };

  const mountShareButton = () => {
    if (!shouldMountShareButton() || document.querySelector(".krosmoz-page-share")) {
      return;
    }

    const share = createShareButton();
    const path = window.location.pathname.toLowerCase();

    const contribution = document.querySelector(".krosmoz-contribution-link");
    if (contribution) {
      const actions = document.createElement("div");
      actions.className = "krosmoz-page-actions";
      contribution.before(actions);
      actions.append(contribution, share);
      return;
    }

    if (path.includes("/pages/histoire/")) {
      const detailMain = document.querySelector(".history-detail-main");
      if (detailMain) {
        detailMain.append(share);
        return;
      }

      const storyEnding = document.querySelector(".story-ending");
      if (storyEnding) {
        storyEnding.prepend(share);
        return;
      }
    }

    document.body.append(share);
  };

  const mountNotice = () => {
    const existingNotice = document.querySelector(".krosmoz-legal-notice");

    const style = document.createElement("style");
    style.textContent = `
      .krosmoz-legal-notice {
        width: min(92vw, 980px);
        margin: 2.1rem auto 0.7rem;
        padding-top: 0.9rem;
        border-top: 1px solid rgba(201, 168, 76, 0.18);
        color: rgba(246, 242, 231, 0.58);
        font-family: inherit;
        font-size: 0.68rem;
        line-height: 1.35;
        text-align: center;
        letter-spacing: 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
      }

      .krosmoz-page-share {
        position: relative;
        z-index: 8;
        width: min(92vw, 980px);
        margin: 2.4rem auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.55rem;
        text-align: center;
      }

      .krosmoz-page-actions {
        position: relative;
        z-index: 8;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.85rem;
        width: min(92vw, 980px);
        margin: clamp(2.4rem, 5vw, 4rem) auto 0;
        text-align: center;
      }

      .krosmoz-page-actions .krosmoz-contribution-link,
      .krosmoz-page-actions .krosmoz-page-share {
        margin: 0 auto;
      }

      .krosmoz-page-actions .krosmoz-page-share {
        width: auto;
      }

      .krosmoz-contribution-link {
        position: relative;
        z-index: 8;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.48rem;
        width: fit-content;
        max-width: calc(100% - 2rem);
        min-height: 42px;
        padding: 0.58rem 1.15rem;
        border: 1px solid rgba(232, 201, 122, 0.48);
        border-radius: 6px;
        background: linear-gradient(180deg, rgba(232, 201, 122, 0.15), rgba(8, 8, 16, 0.58));
        color: #fff4d6;
        font-family: "Cinzel", serif;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(246, 242, 231, 0.06);
        transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
      }

      .krosmoz-contribution-link::before,
      .krosmoz-contribution-link::after {
        content: "\\2726";
        color: #e8c97a;
        font-size: 0.82em;
        text-shadow: 0 0 9px rgba(232, 201, 122, 0.66);
      }

      .krosmoz-contribution-link:hover,
      .krosmoz-contribution-link:focus-visible {
        color: #fff7df;
        background: linear-gradient(180deg, rgba(232, 201, 122, 0.22), rgba(8, 8, 16, 0.64));
        border-color: rgba(232, 201, 122, 0.76);
        transform: translateY(-1px);
        box-shadow: 0 16px 34px rgba(0, 0, 0, 0.34), 0 0 24px rgba(232, 201, 122, 0.12), inset 0 0 0 1px rgba(246, 242, 231, 0.08);
        outline: none;
      }

      .bio-panel .krosmoz-contribution-link {
        display: flex;
        margin: -0.15rem auto 1.1rem;
      }

      .info-panel .krosmoz-contribution-link,
      .history-detail-side .krosmoz-contribution-link {
        display: flex;
        width: 100%;
        margin: 1.15rem 0 0;
      }

      body.character-overview-page .info-panel .krosmoz-page-actions {
        align-items: flex-start;
        width: 100%;
        margin: clamp(1.4rem, 2.4vw, 2rem) 0 0;
        text-align: left;
      }

      body.character-overview-page .info-panel .krosmoz-page-actions .krosmoz-contribution-link,
      body.character-overview-page .info-panel .krosmoz-page-actions .krosmoz-page-share {
        margin-right: 0;
        margin-left: 0;
      }

      body.character-overview-page .info-panel .krosmoz-page-actions .krosmoz-page-share {
        align-items: flex-start;
      }

      .history-detail-side .krosmoz-page-share {
        width: 100%;
        margin: 1.15rem 0 0;
      }

      .history-detail-side .krosmoz-page-share + .krosmoz-contribution-link {
        margin-top: 0.75rem;
      }

      .character-main > .krosmoz-contribution-link {
        grid-column: 1 / -1;
        display: flex;
        margin: -2.4rem auto -0.45rem;
      }

      .character-main > .krosmoz-page-actions,
      .region-detail-main > .krosmoz-page-actions,
      .history-detail-main > .krosmoz-page-actions {
        grid-column: 1 / -1;
      }

      .history-detail-main > .krosmoz-page-actions {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }

      .character-main:has(> .related-panel) > .krosmoz-page-actions,
      .history-detail-main:has(> .work-related-panel) > .krosmoz-page-actions,
      .region-detail-main:has(> .region-visions-section) > .krosmoz-page-actions,
      .region-detail-main:has(> .region-characters-section) > .krosmoz-page-actions {
        margin-top: clamp(8rem, 14vw, 11rem);
      }

      .history-hero .krosmoz-contribution-link,
      .history-detail-hero-content .krosmoz-contribution-link,
      .lexicon-main > .krosmoz-contribution-link,
      .lexicon-hero + .krosmoz-contribution-link {
        display: flex;
        margin: -2rem auto 1.15rem;
      }

      .chronologies-index > .krosmoz-contribution-link,
      main > .krosmoz-contribution-link {
        display: flex;
        margin: 1rem auto 1.4rem;
      }

      body.krosmoz-chronology-page main > .krosmoz-page-actions {
        width: 100%;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;
      }

      .krosmoz-share-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        padding: 0;
        border: 1px solid rgba(232, 201, 122, 0.48);
        border-radius: 6px;
        background: linear-gradient(180deg, rgba(232, 201, 122, 0.15), rgba(8, 8, 16, 0.58));
        color: #fff4d6;
        font: inherit;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(246, 242, 231, 0.06);
        cursor: pointer;
        transition: color 0.18s ease, background 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
      }

      .krosmoz-share-button:hover,
      .krosmoz-share-button:focus-visible {
        color: #fff7df;
        background: linear-gradient(180deg, rgba(232, 201, 122, 0.22), rgba(8, 8, 16, 0.64));
        border-color: rgba(232, 201, 122, 0.76);
        transform: translateY(-1px);
        box-shadow: 0 16px 34px rgba(0, 0, 0, 0.34), 0 0 24px rgba(232, 201, 122, 0.12), inset 0 0 0 1px rgba(246, 242, 231, 0.08);
        outline: none;
      }

      .krosmoz-share-button.is-copied {
        border-color: rgba(126, 214, 169, 0.72);
      }

      .krosmoz-share-button svg {
        width: 17px;
        height: 17px;
        fill: currentColor;
        flex: 0 0 auto;
      }

      .krosmoz-share-status {
        min-height: 1.1rem;
        color: rgba(246, 242, 231, 0.72);
        font-size: 0.76rem;
        line-height: 1.2;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
      }

      body.krosmoz-map-page .krosmoz-page-share {
        position: fixed;
        left: 50%;
        bottom: 1rem;
        width: auto;
        margin: 0;
        transform: translateX(-50%);
        z-index: 42;
        pointer-events: none;
      }

      body.krosmoz-map-page .krosmoz-share-button,
      body.krosmoz-map-page .krosmoz-share-status {
        pointer-events: auto;
      }

      body.krosmoz-map-page .krosmoz-legal-notice {
        display: none;
      }

      .krosmoz-legal-text,
      .story-legal-notice p {
        margin: 0 auto;
        max-width: 760px;
        text-transform: none !important;
      }

      .krosmoz-legal-links {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.55rem;
        margin-top: 0.75rem;
        text-transform: none !important;
      }

      .krosmoz-about-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.42rem;
        color: rgba(246, 242, 231, 0.7);
        font-family: 'Cinzel', Georgia, serif;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-decoration: none;
        text-transform: none !important;
        transition: color 0.18s ease, text-shadow 0.18s ease;
      }

      .krosmoz-about-link:hover,
      .krosmoz-about-link:focus-visible {
        color: #e8c97a;
        text-shadow: 0 0 14px rgba(232, 201, 122, 0.24);
        outline: none;
      }

      .krosmoz-about-icon {
        position: relative;
        width: 1.25rem;
        height: 1.25rem;
        border: 1px solid rgba(232, 201, 122, 0.62);
        border-radius: 50%;
        color: #e8c97a;
        flex: 0 0 auto;
        box-shadow: 0 0 12px rgba(232, 201, 122, 0.1);
      }

      .krosmoz-about-icon::before {
        content: 'i';
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        font-family: Georgia, serif;
        font-size: 0.78rem;
        font-style: italic;
        font-weight: 700;
        line-height: 1;
      }

      .krosmoz-about-icon::after {
        content: '';
        position: absolute;
        width: 0.48rem;
        height: 1px;
        right: -0.36rem;
        bottom: -0.14rem;
        background: currentColor;
        transform: rotate(45deg);
      }

      .site-topbar .nav-link,
      .site-topbar .nav-menu-item {
        font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif !important;
      }

      body.character-page .krosmoz-legal-notice,
      body.character-biography-page .krosmoz-legal-notice,
      body.krosmoz-character-detail-page .krosmoz-legal-notice,
      body.region-detail-page .krosmoz-legal-notice,
      body.krosmoz-region-detail-page .krosmoz-legal-notice,
      body.history-detail-page .krosmoz-legal-notice,
      body.krosmoz-history-detail-page .krosmoz-legal-notice,
      body.history-immersive-page .krosmoz-legal-notice {
        width: min(92vw, 980px);
        margin: clamp(2rem, 4vw, 3rem) auto 1.2rem;
      }

      body.history-immersive-page .krosmoz-legal-notice {
        border-top-color: rgba(201, 168, 76, 0.14);
        background: #080810;
      }

      .character-main > .krosmoz-legal-notice,
      .region-detail-main > .krosmoz-legal-notice,
      .history-detail-main > .krosmoz-legal-notice {
        grid-column: 1 / -1;
      }

      body.krosmoz-character-detail-page .character-main > .krosmoz-legal-notice {
        margin-bottom: -4.5rem;
      }

      .krosmoz-top-social-links {
        display: inline-flex;
        align-items: center;
        gap: 0.82rem;
        margin-left: auto;
        flex-shrink: 0;
      }

      .site-topbar .krosmoz-top-social-links {
        align-self: center;
      }

      .krosmoz-top-social-links::before {
        content: '';
        width: 1px;
        height: 20px;
        margin-right: 0.15rem;
        background: rgba(201, 168, 76, 0.18);
        flex-shrink: 0;
      }

      .krosmoz-social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border: 0;
        background: transparent;
        color: rgba(246, 242, 231, 0.92);
        box-shadow: none;
        text-decoration: none;
        transition: color 0.2s ease, transform 0.2s ease;
      }

      .krosmoz-social-link:hover,
      .krosmoz-social-link:focus-visible {
        color: #ffffff;
        transform: translateY(-1px);
        outline: none;
      }

      .krosmoz-social-link svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
      }

      .krosmoz-header-contact {
        margin-left: 0.25rem;
        flex-shrink: 0;
      }

      .krosmoz-language {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: 0.1rem;
      }

      .krosmoz-language-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 3px;
        background: transparent;
        color: rgba(246, 242, 231, 0.9);
        box-shadow: none;
        cursor: pointer;
        transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      }

      .krosmoz-language-toggle:hover,
      .krosmoz-language-toggle:focus-visible,
      .krosmoz-language.is-open .krosmoz-language-toggle {
        color: #ffffff;
        background: transparent;
        box-shadow: none;
        transform: translateY(-1px);
        outline: none;
      }

      .krosmoz-language-toggle svg {
        width: 19px;
        height: 19px;
        fill: currentColor;
      }

      .krosmoz-language-menu {
        position: absolute;
        top: calc(100% + 0.55rem);
        right: 0;
        z-index: 60;
        min-width: 154px;
        padding: 0.38rem;
        border: 1px solid rgba(201, 168, 76, 0.28);
        border-radius: 4px;
        background: rgba(8, 8, 16, 0.96);
        box-shadow: 0 22px 54px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 247, 223, 0.04);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-6px);
        transition: opacity 0.18s ease, visibility 0.18s ease, transform 0.18s ease;
      }

      .krosmoz-language.is-open .krosmoz-language-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .krosmoz-language-option {
        display: block;
        width: 100%;
        padding: 0.58rem 0.7rem;
        border: 0;
        border-radius: 3px;
        background: transparent;
        color: rgba(246, 242, 231, 0.78);
        font: inherit;
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.09em;
        text-align: left;
        text-transform: uppercase;
        cursor: pointer;
        transition: color 0.18s ease, background 0.18s ease;
      }

      .krosmoz-language-option:hover,
      .krosmoz-language-option:focus-visible,
      .krosmoz-language-option.is-active {
        color: #fff7df;
        background: rgba(201, 168, 76, 0.12);
        outline: none;
      }

      .krosmoz-mobile-map-notice {
        position: fixed;
        left: 50%;
        bottom: 1rem;
        z-index: 1200;
        width: min(92vw, 430px);
        padding: 0.82rem 1rem;
        border: 1px solid rgba(201, 168, 76, 0.34);
        border-radius: 4px;
        background: rgba(9, 9, 15, 0.94);
        color: rgba(255, 247, 223, 0.92);
        font: 700 0.76rem/1.35 'Cinzel', Georgia, serif;
        letter-spacing: 0.04em;
        text-align: center;
        text-transform: uppercase;
        box-shadow: 0 22px 58px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 247, 223, 0.05);
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, 18px);
        transition: opacity 0.22s ease, transform 0.22s ease;
      }

      .krosmoz-mobile-map-notice.is-visible {
        opacity: 1;
        transform: translate(-50%, 0);
      }

      html.is-mobile-map-locked a[data-krosmoz-map-locked],
      html.is-mobile-map-locked .is-mobile-map-hidden {
        display: none !important;
      }

      body.is-mobile-map-page-blocked {
        min-height: 100dvh;
        overflow-x: hidden !important;
        overflow-y: auto !important;
      }

      body.is-mobile-map-page-blocked main:not(.krosmoz-mobile-map-blocker-main),
      body.is-mobile-map-page-blocked .map-section,
      body.is-mobile-map-page-blocked .slide-panel,
      body.is-mobile-map-page-blocked .krosmoz-page-share {
        display: none !important;
      }

      .krosmoz-mobile-map-blocker-main {
        width: min(92vw, 780px);
        min-height: calc(100dvh - 92px);
        display: grid;
        place-items: center;
        margin: 0 auto;
        padding: 2rem 0;
      }

      .krosmoz-mobile-map-blocker {
        width: 100%;
        padding: clamp(1.25rem, 6vw, 2.4rem);
        border: 1px solid rgba(201, 168, 76, 0.28);
        border-radius: 4px;
        background: linear-gradient(145deg, rgba(13, 13, 19, 0.92), rgba(22, 18, 12, 0.84));
        color: rgba(246, 242, 231, 0.82);
        text-align: center;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 247, 223, 0.05);
      }

      .krosmoz-mobile-map-eyebrow {
        display: block;
        margin-bottom: 0.7rem;
        color: rgba(232, 201, 122, 0.84);
        font: 700 0.72rem/1.2 'Cinzel', Georgia, serif;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .krosmoz-mobile-map-blocker h1 {
        margin: 0;
        color: #fff7df;
        font: 700 clamp(1.35rem, 8vw, 2.25rem)/1.05 'Cinzel Decorative', 'Cinzel', Georgia, serif;
        letter-spacing: 0;
      }

      .krosmoz-mobile-map-blocker p {
        max-width: 38rem;
        margin: 0.9rem auto 0;
        font-size: 1rem;
        line-height: 1.55;
      }

      .krosmoz-mobile-map-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.15rem;
        min-height: 40px;
        padding: 0.62rem 1rem;
        border: 1px solid rgba(201, 168, 76, 0.42);
        border-radius: 3px;
        background: rgba(201, 168, 76, 0.13);
        color: #fff7df;
        font: 700 0.76rem/1.2 'Cinzel', Georgia, serif;
        letter-spacing: 0.1em;
        text-decoration: none;
        text-transform: uppercase;
      }

      #google_translate_element,
      .goog-te-banner-frame,
      .skiptranslate iframe {
        display: none !important;
      }

      body {
        top: 0 !important;
      }

      @media (max-width: 640px) {
        .krosmoz-legal-notice {
          width: 94vw;
          margin-top: 1.5rem;
          padding-top: 0.75rem;
          font-size: 0.62rem;
        }

        .krosmoz-page-share {
          width: 94vw;
          margin-top: 1.7rem;
        }

        .krosmoz-page-actions {
          width: 94vw;
          gap: 0.7rem;
          margin-top: 2rem;
        }

        .krosmoz-contribution-link {
          max-width: calc(100% - 1.25rem);
          min-height: 30px;
          padding: 0.42rem 0.68rem;
          font-size: 0.64rem;
          letter-spacing: 0.08em;
        }

        .character-main > .krosmoz-contribution-link {
          margin: -2.1rem auto -0.25rem;
        }

        .info-panel .krosmoz-contribution-link,
        .history-detail-side .krosmoz-contribution-link {
          max-width: 100%;
          margin-top: 1rem;
        }

        .lexicon-main > .krosmoz-contribution-link {
          margin: -1.6rem auto 1rem;
        }

        .krosmoz-share-button {
          width: auto;
          max-width: 260px;
          padding-inline: 0.85rem;
          font-size: 0.68rem;
        }

        body.krosmoz-map-page .krosmoz-page-share {
          width: min(92vw, 320px);
          bottom: 0.75rem;
        }

        .krosmoz-top-social-links {
          align-self: flex-end;
          margin-left: 0;
        }

        .krosmoz-language {
          align-self: flex-end;
          margin-left: 0;
        }

        .krosmoz-language-toggle {
          width: 32px;
          height: 32px;
        }

        .krosmoz-language-menu {
          right: 0;
        }

        .krosmoz-social-link {
          width: 17px;
          height: 17px;
        }
      }

      @media (max-width: 1024px) {
        .site-topbar {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) auto auto auto !important;
          align-items: center !important;
          gap: 0.42rem !important;
          position: relative;
          z-index: 100;
          width: 100%;
          max-width: 100vw;
          overflow: visible;
        }

        header.krosmoz-mobile-nav-shell {
          min-height: var(--krosmoz-mobile-topbar-height, 54px);
        }

        .site-topbar.is-mobile-scroll-ready {
          position: fixed !important;
          top: 0 !important;
          right: 0 !important;
          left: 0 !important;
          transform: translateY(0);
          transition: transform 0.24s ease, opacity 0.2s ease;
          will-change: transform;
        }

        .site-topbar.is-mobile-scroll-hidden:not(.is-mobile-nav-open) {
          transform: translateY(calc(-100% - 2px));
        }

        .site-topbar.is-mobile-scroll-visible,
        .site-topbar.is-mobile-nav-open {
          transform: translateY(0);
        }

        .site-topbar > .brand {
          min-width: 0;
          overflow: hidden;
          order: 1;
        }

        .site-topbar > .brand span {
          display: block;
          max-width: clamp(7.8rem, 34vw, 12.5rem);
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .site-topbar > .mobile-nav-toggle {
          order: 4;
          justify-self: end;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 0.5rem !important;
          min-height: 38px !important;
          padding: 0.52rem 0.72rem !important;
          border: 1px solid rgba(201,168,76,0.58) !important;
          border-radius: 3px !important;
          background: rgba(12,10,8,0.72) !important;
          color: #f3df9b !important;
          font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif !important;
          font-size: 0.68rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.12em !important;
          line-height: 1 !important;
          text-transform: uppercase !important;
          box-shadow: inset 0 0 0 1px rgba(255,247,223,0.05), 0 8px 22px rgba(0,0,0,0.24) !important;
        }

        .site-topbar > .mobile-nav-toggle .mobile-nav-icon,
        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::before,
        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::after {
          content: "" !important;
          display: block !important;
          width: 18px !important;
          height: 2px !important;
          border-radius: 999px !important;
          background: currentColor !important;
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }

        .site-topbar > .mobile-nav-toggle .mobile-nav-icon {
          position: relative !important;
          flex: 0 0 auto !important;
        }

        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::before,
        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::after {
          position: absolute !important;
          left: 0 !important;
        }

        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::before {
          top: -6px !important;
        }

        .site-topbar > .mobile-nav-toggle .mobile-nav-icon::after {
          top: 6px !important;
        }

        .site-topbar > .krosmoz-global-search {
          display: inline-flex !important;
          grid-column: auto !important;
          order: 2;
          justify-self: end;
          margin-left: 0 !important;
        }

        .site-topbar > .krosmoz-language {
          display: inline-flex !important;
          grid-column: auto !important;
          order: 3;
          justify-self: end;
          margin-left: 0 !important;
        }

        .site-topbar > .krosmoz-top-social-links,
        .site-topbar > .krosmoz-header-contact {
          display: none !important;
          grid-column: auto;
          margin-left: 0 !important;
        }

        .site-topbar.is-mobile-nav-open > .krosmoz-header-contact {
          display: none !important;
        }

        .site-topbar.is-mobile-nav-open > .krosmoz-global-search {
          display: inline-flex !important;
          grid-column: auto !important;
          justify-self: end;
          order: 2;
        }

        .site-topbar.is-mobile-nav-open > .krosmoz-language {
          display: inline-flex !important;
          grid-column: auto !important;
          justify-self: end;
          order: 3;
        }

        .site-topbar.is-mobile-nav-open > .krosmoz-top-social-links {
          display: none !important;
        }

        .site-topbar .top-nav {
          position: fixed !important;
          top: var(--krosmoz-mobile-topbar-height, 54px) !important;
          right: 0 !important;
          bottom: auto !important;
          left: auto !important;
          grid-column: auto !important;
          width: min(76vw, 320px) !important;
          max-width: calc(100vw - 1rem) !important;
          max-height: calc(100dvh - 62px) !important;
          display: grid !important;
          align-content: start;
          gap: 0 !important;
          padding: 0.45rem 0 0.9rem !important;
          border: 1px solid rgba(201,168,76,0.2);
          border-left: 0;
          border-bottom: 0;
          border-right: 0;
          background:
            linear-gradient(90deg, rgba(6,6,12,0), rgba(7,7,14,0.84) 18%, rgba(8,8,16,0.98) 42%, rgba(6,6,12,0.99)),
            linear-gradient(180deg, rgba(12,12,20,0.98), rgba(6,6,12,0.98)),
            radial-gradient(circle at 100% 0%, rgba(201,168,76,0.11), transparent 42%);
          -webkit-mask: linear-gradient(90deg, transparent 0, rgba(0,0,0,0.16) 7%, rgba(0,0,0,0.72) 18%, #000 32%);
          mask: linear-gradient(90deg, transparent 0, rgba(0,0,0,0.16) 7%, rgba(0,0,0,0.72) 18%, #000 32%);
          box-shadow: -22px 28px 70px rgba(0,0,0,0.54);
          overflow-x: hidden !important;
          overflow-y: auto !important;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          opacity: 0 !important;
          pointer-events: none;
          transform: translateX(104%);
          transition: transform 0.24s ease, opacity 0.2s ease !important;
        }

        .site-topbar .top-nav::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          height: 1px;
          margin: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.08) 18%, rgba(232,201,122,0.28) 44%, rgba(232,201,122,0.68) 78%, #fff7df 96%, #fff7df 100%);
          box-shadow:
            0 0 10px rgba(255,247,223,0.28),
            0 0 24px rgba(232,201,122,0.2);
          pointer-events: none;
        }

        .site-topbar.is-mobile-nav-open .top-nav {
          max-height: calc(100dvh - 62px) !important;
          opacity: 1 !important;
          pointer-events: auto;
          transform: translateX(0);
        }

        .site-topbar .top-nav .nav-link,
        .site-topbar .nav-dropdown,
        .site-topbar .nav-item {
          max-width: 100%;
          min-width: 0;
        }

        .site-topbar .top-nav .nav-link {
          width: 100% !important;
          min-height: 44px;
          justify-content: flex-end !important;
          padding: 0.86rem 1.05rem !important;
          color: #f6f2e7;
          font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.14em !important;
          line-height: 1.2 !important;
          text-align: right !important;
          border: 0 !important;
          background: transparent !important;
        }

        .site-topbar .top-nav .nav-link::after {
          left: auto !important;
          right: 1.05rem !important;
          width: 42%;
          bottom: 0.54rem !important;
        }

        .site-topbar .top-nav .nav-caret {
          order: -1;
          margin-left: 0;
          margin-right: 0.55rem;
        }

        .site-topbar .nav-menu {
          display: none;
          max-width: 100%;
          overflow-wrap: anywhere;
          margin: 0 !important;
          padding: 0 0 0.35rem !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .site-topbar .nav-dropdown:focus-within .nav-menu,
        .site-topbar .nav-dropdown:hover .nav-menu {
          display: grid;
        }

        .site-topbar .nav-menu-item {
          justify-content: flex-end;
          padding: 0.62rem 1.25rem !important;
          color: rgba(246,242,231,0.74);
          font-family: 'Cinzel Decorative', 'Cinzel', Georgia, serif !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.14em !important;
          line-height: 1.2 !important;
          text-align: right;
        }

        .site-topbar.is-mobile-nav-open > .krosmoz-top-social-links::before {
          display: none;
        }
      }

        @media (min-width: 721px) and (max-width: 1024px) {
          .site-topbar > .brand span {
            max-width: clamp(12rem, 34vw, 18rem);
          }

          .site-topbar .top-nav {
            top: var(--krosmoz-mobile-topbar-height, 62px) !important;
            width: min(44vw, 360px) !important;
            max-height: calc(100dvh - 70px) !important;
          }

        .site-topbar.is-mobile-nav-open .top-nav {
          max-height: calc(100dvh - 70px) !important;
        }
      }
    `;

    const notice = existingNotice || document.createElement("div");
    if (!existingNotice) {
      notice.className = "krosmoz-legal-notice";
      notice.setAttribute("aria-label", noticeLines.join(" "));
    }

    if (document.querySelector(".map-section")) {
      document.body.classList.add("krosmoz-map-page");
    }

    if (document.querySelector(".character-main")) {
      document.body.classList.add("krosmoz-character-detail-page");
    }

    if (document.querySelector(".region-detail-main")) {
      document.body.classList.add("krosmoz-region-detail-page");
    }

    if (document.querySelector(".history-detail-main")) {
      document.body.classList.add("krosmoz-history-detail-page");
    }

    if (window.location.pathname.toLowerCase().includes("/pages/chronologies/")) {
      document.body.classList.add("krosmoz-chronology-page");
    }

    const text = document.createElement("div");
    text.className = "krosmoz-legal-text";
    text.setAttribute("translate", "no");
    text.style.setProperty("text-transform", "none", "important");
    text.style.setProperty("font-family", '"Crimson Text", Georgia, serif', "important");
    text.style.setProperty("font-style", "normal", "important");
    text.style.setProperty("font-variant", "normal", "important");
    text.style.setProperty("letter-spacing", "0", "important");

    noticeLines.forEach((line, index) => {
      if (index > 0) {
        text.append(document.createElement("br"));
      }
      const lineText = document.createElement("span");
      lineText.style.setProperty("text-transform", "none", "important");
      lineText.style.setProperty("font-family", '"Crimson Text", Georgia, serif', "important");
      lineText.style.setProperty("font-style", "normal", "important");
      lineText.style.setProperty("font-variant", "normal", "important");
      lineText.style.setProperty("letter-spacing", "0", "important");
      lineText.textContent = line;
      text.append(lineText);
    });

    const aboutLinks = document.createElement("div");
    aboutLinks.className = "krosmoz-legal-links";
    aboutLinks.style.setProperty("text-transform", "none", "important");

    const pagePath = window.location.pathname.toLowerCase();
    const isRootPage = !pagePath.includes("/pages/");
    const aboutLink = document.createElement("a");
    aboutLink.className = "krosmoz-about-link";
    aboutLink.href = isRootPage ? "pages/about/a-propos" : (pagePath.includes("/pages/about/") ? "a-propos" : "../about/a-propos");
    aboutLink.setAttribute("aria-label", "À propos du site et sources");
    aboutLink.style.setProperty("text-transform", "none", "important");
    aboutLink.innerHTML = '<span class="krosmoz-about-icon" aria-hidden="true"></span><span>À propos</span>';
    aboutLinks.append(aboutLink);

    document.head.append(style);
    const topbar = document.querySelector(".site-topbar");
    const mediaMenu = topbar ? Array.from(topbar.querySelectorAll(".nav-dropdown")).find((dropdown) => {
      const button = dropdown.querySelector(".nav-link");
      return button && /(?:m[eé]dias|autres)/i.test(button.textContent || "");
    }) : null;
    const mediaMenuList = mediaMenu ? mediaMenu.querySelector(".nav-menu") : null;
    if (mediaMenuList && !mediaMenuList.querySelector('a[href*="galerie"]')) {
      const galleryLink = document.createElement("a");
      galleryLink.className = "nav-menu-item";
      galleryLink.href = isRootPage ? "pages/media/galerie" : (pagePath.includes("/pages/media/") ? "galerie" : "../media/galerie");
      galleryLink.textContent = "Galerie";
      mediaMenuList.prepend(galleryLink);
    }
    if (topbar && !topbar.querySelector(".krosmoz-top-social-links")) {
      topbar.append(createSocialLinks("krosmoz-top-social-links"));
    }
    if (topbar && !topbar.querySelector(":scope > .krosmoz-header-contact")) {
      const contactLink = topbar.querySelector('.top-nav a[href$="contact"], .top-nav a[href*="pages/contact/contact"]');
      const socials = topbar.querySelector(".krosmoz-top-social-links");
      const language = createLanguageSelector();
      if (contactLink) {
        contactLink.classList.add("krosmoz-header-contact");
        topbar.append(contactLink);
        contactLink.after(language);
        if (socials) {
          language.after(socials);
        } else {
          topbar.append(language);
        }
      } else if (socials) {
        topbar.insertBefore(language, socials);
      } else {
        topbar.append(language);
      }
    }
    restoreStoredLanguage();

    mountContributionLink();
    mountShareButton();
    updateMobileMapLock();
    loadGlobalSearch();

    if (!existingNotice) {
      notice.append(text, aboutLinks);

      const historyDetailMain = document.querySelector(".history-detail-main");
      const noticeTarget = document.querySelector(".region-detail-main, .character-main");
      if (historyDetailMain) {
        historyDetailMain.after(notice);
      } else if (noticeTarget) {
        noticeTarget.append(notice);
      } else {
        document.body.append(notice);
      }
    } else if (!notice.querySelector(".krosmoz-about-link")) {
      notice.append(aboutLinks);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountNotice, { once: true });
  } else {
    mountNotice();
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || !isMobileMapLocked() || !isMapHref(link.getAttribute("href"))) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    showMobileMapNotice();
  }, true);

  window.addEventListener("resize", updateMobileMapLock);
  window.addEventListener("orientationchange", updateMobileMapLock);
}());

(function () {
  const initMobileNavigation = () => {
    document.querySelectorAll(".site-topbar").forEach((topbar) => {
      const toggle = topbar.querySelector(".mobile-nav-toggle");
      const nav = topbar.querySelector(".top-nav");

      if (!toggle || !nav || toggle.dataset.mobileNavReady === "true") {
        return;
      }

      toggle.dataset.mobileNavReady = "true";

      const mobileQuery = window.matchMedia("(max-width: 1024px)");
      const header = topbar.closest("header");
      let lastScrollY = window.scrollY || 0;
      let scrollFrame = 0;

      const syncTopbarHeight = () => {
        if (!mobileQuery.matches) {
          header?.classList.remove("krosmoz-mobile-nav-shell");
          topbar.classList.remove("is-mobile-scroll-ready", "is-mobile-scroll-hidden", "is-mobile-scroll-visible");
          topbar.style.removeProperty("--krosmoz-mobile-topbar-height");
          return;
        }

        const height = Math.ceil(topbar.getBoundingClientRect().height);
        header?.classList.add("krosmoz-mobile-nav-shell");
        topbar.style.setProperty("--krosmoz-mobile-topbar-height", `${height}px`);
        topbar.classList.add("is-mobile-scroll-ready");
      };

      const setScrollVisibility = () => {
        if (!mobileQuery.matches) {
          syncTopbarHeight();
          lastScrollY = window.scrollY || 0;
          return;
        }

        const currentScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
        const isMenuOpen = topbar.classList.contains("is-mobile-nav-open");
        const isScrollingUp = currentScrollY < lastScrollY - 6;
        const isScrollingDown = currentScrollY > lastScrollY + 6;
        const shouldShow = isMenuOpen || currentScrollY < 12 || isScrollingUp;
        const shouldHide = !isMenuOpen && isScrollingDown && currentScrollY > (topbar.offsetHeight + 24);

        if (shouldShow) {
          topbar.classList.add("is-mobile-scroll-visible");
          topbar.classList.remove("is-mobile-scroll-hidden");
        } else if (shouldHide) {
          topbar.classList.add("is-mobile-scroll-hidden");
          topbar.classList.remove("is-mobile-scroll-visible");
        }

        lastScrollY = currentScrollY;
      };

      const requestScrollVisibility = () => {
        if (scrollFrame) {
          return;
        }

        scrollFrame = window.requestAnimationFrame(() => {
          scrollFrame = 0;
          setScrollVisibility();
        });
      };

      const setOpen = (isOpen) => {
        topbar.classList.toggle("is-mobile-nav-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Masquer le menu" : "Afficher le menu");
        if (isOpen) {
          topbar.classList.add("is-mobile-scroll-visible");
          topbar.classList.remove("is-mobile-scroll-hidden");
        }
        window.requestAnimationFrame(syncTopbarHeight);
      };

      syncTopbarHeight();
      setScrollVisibility();
      setOpen(false);

      toggle.addEventListener("click", () => {
        setOpen(!topbar.classList.contains("is-mobile-nav-open"));
      });

      nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
          setOpen(false);
        }
      });

      document.addEventListener("click", (event) => {
        if (!topbar.contains(event.target)) {
          setOpen(false);
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      });

      window.addEventListener("scroll", requestScrollVisibility, { passive: true });
      window.addEventListener("resize", () => {
        syncTopbarHeight();
        setScrollVisibility();
      });
      window.addEventListener("orientationchange", () => {
        window.setTimeout(() => {
          syncTopbarHeight();
          setScrollVisibility();
        }, 160);
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMobileNavigation, { once: true });
  } else {
    initMobileNavigation();
  }
}());
