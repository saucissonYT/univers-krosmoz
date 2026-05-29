(function () {
  const ANALYTICS_ID = "G-ENCHQ15LHS";
  const PAGE_LIKE_REFRESH_INTERVAL_MS = 60 * 1000;
  const PAGE_LIKE_ACTION_COOLDOWN_MS = 1500;

  const stripFileName = (pathname) => pathname.replace(/[^/]*$/, "");
  const currentPath = new URL(window.location.href).pathname;
  const basePath = stripFileName(currentPath);
  const rootUrl = new URL(document.currentScript ? "../" : "./", document.currentScript ? document.currentScript.src : window.location.href);

  const links = [
    { label: "L'Univers", href: "pages/histoire/histoire-krosmoz", match: "/pages/histoire/" },
    { label: "À découvrir", href: "pages/chronologies/oeuvres", match: "/pages/chronologies/oeuvres" },
    { label: "Personnages", href: "pages/personnages/personnages", match: "/pages/personnages/" },
    { label: "Groupes", href: "pages/groupes/groupes", match: "/pages/groupes/" },
    {
      label: "Chronologie",
      items: [
        { label: "Histoire", href: "pages/chronologies/chronologie-historique" },
        { label: "Œuvre", href: "pages/chronologies/chronologie-oeuvres" }
      ],
      match: [
        "/pages/chronologies/chronologie-historique",
        "/pages/chronologies/chronologie-oeuvres"
      ]
    },
    { label: "Régions", href: "pages/regions/regions", match: "/pages/regions/" },
    { label: "Lexique", href: "pages/lexique/lexique", match: "/pages/lexique/" },
    {
      label: "Autres",
      items: [
        { label: "Artefacts", href: "pages/artefacts/artefacts" },
        { label: "Jeux", href: "pages/jeux/jeux" },
        { label: "Arbre des affinités", href: "pages/media/arbre-affinites" }
      ],
      match: ["/pages/artefacts/", "/pages/jeux/", "/pages/media/"]
    },
    { label: "Contactez-nous", href: "pages/contact/contact", match: "/pages/contact/" }
  ];

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@ZakiWakfu",
      path: "M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31.2 31.2 0 0 0 2 12a31.2 31.2 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 22 12a31.2 31.2 0 0 0-.4-4.8ZM10 15.4V8.6l5.7 3.4L10 15.4Z"
    },
    {
      label: "Discord",
      href: "https://discord.gg/5Hcf5MZjPP",
      path: "M19.5 5.4A16.2 16.2 0 0 0 15.4 4l-.5 1.1a14.7 14.7 0 0 0-5.8 0L8.6 4a16.2 16.2 0 0 0-4.1 1.4C2 9.1 1.4 12.7 1.7 16.2A16.5 16.5 0 0 0 6.7 19l1.1-1.8a10.6 10.6 0 0 1-1.7-.8l.4-.3a11.7 11.7 0 0 0 11 0l.4.3a10.6 10.6 0 0 1-1.7.8l1.1 1.8a16.5 16.5 0 0 0 5-2.8c.4-4-.6-7.6-2.8-10.8ZM8.8 14.1c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm6.4 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z"
    },
    {
      label: "Twitter",
      href: "https://x.com/ZakiWakfu",
      path: "M14.4 10.2 22.1 1h-1.8l-6.7 8-5.4-8H2l8.1 12L2 23h1.8l7.1-8.5 5.7 8.5H22l-7.6-12.8Zm-2.5 3-1-.1L4.4 2.4h2.9l5.3 8.8 1 .1 6.8 10.4h-2.9l-5.6-8.5Z"
    }
  ];

  const relativeFromPage = (sitePath) => {
    const target = new URL(sitePath, rootUrl);
    return target.pathname.startsWith(basePath)
      ? target.pathname.slice(basePath.length)
      : target.pathname;
  };

  const isActive = (entry) => {
    const matches = Array.isArray(entry.match) ? entry.match : [entry.match];
    return matches.some((match) => currentPath.includes(match));
  };

  const renderNavItem = (entry) => {
    if (entry.items) {
      const active = isActive(entry) ? " active" : "";
      return `
      <div class="nav-item nav-dropdown">
        <button class="nav-link${active}" type="button">${entry.label} <span class="nav-caret">▾</span></button>
        <div class="nav-menu">
          ${entry.items.map((item) => `<a class="nav-menu-item" href="${relativeFromPage(item.href)}">${item.label}</a>`).join("")}
        </div>
      </div>`;
    }

    const active = isActive(entry) ? " active" : "";
    return `<a class="nav-link${active}" href="${relativeFromPage(entry.href)}">${entry.label}</a>`;
  };

  const renderSocialLink = (entry) => `
      <a class="krosmoz-social-link" href="${entry.href}" target="_blank" rel="noopener noreferrer" aria-label="${entry.label}" title="${entry.label}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${entry.path}"></path></svg>
      </a>`;

  const mountHeader = () => {
    document.querySelectorAll("[data-site-header]").forEach((header) => {
      if (header.dataset.ready === "true") {
        return;
      }

      header.dataset.ready = "true";
      header.innerHTML = `
  <div class="site-topbar">
    <a class="brand" href="${relativeFromPage("")}" aria-label="Univers Krosmoz">
      <img src="${relativeFromPage("assets/logo-krosmoz.webp")}" alt="">
      <span>Univers Krosmoz</span>
    </a>
    <button class="mobile-nav-toggle" type="button" aria-expanded="false" aria-label="Afficher le menu"><span>Menu</span><span class="mobile-nav-icon" aria-hidden="true"></span></button>
    <nav class="top-nav" aria-label="Navigation principale">
      ${links.map(renderNavItem).join("")}
    </nav>
    <div class="krosmoz-top-social-links" aria-label="Réseaux sociaux">
      ${socialLinks.map(renderSocialLink).join("")}
    </div>
  </div>`;
    });
  };

  const mountAnalytics = () => {
    if (typeof window.gtag === "function" && document.querySelector(`script[src*="${ANALYTICS_ID}"]`)) {
      return;
    }

    if (!document.querySelector(`script[src*="${ANALYTICS_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
      document.head.append(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ANALYTICS_ID);
  };

  const getPageLikeVoterId = () => {
    const key = "krosmoz-page-like-voter";
    try {
      const existing = window.localStorage.getItem(key);
      if (existing) {
        return existing;
      }

      const generated = window.crypto && typeof window.crypto.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(key, generated);
      return generated;
    } catch {
      return "";
    }
  };

  const getPageLikeTarget = () => {
    const path = currentPath.replace(/\.html$/i, "").replace(/\/+$/g, "");
    const characterMatch = path.match(/^\/pages\/personnages\/([a-z0-9-]+)$/i);
    const isCharacterBiography = new URLSearchParams(window.location.search).get("bio") === "complete";
    const regionOverviewMatch = path.match(/^\/pages\/regions\/([a-z0-9-]+)$/i);
    const groupOverviewMatch = path.match(/^\/pages\/groupes\/([a-z0-9-]+)$/i);
    const isCharacterPage = Boolean(characterMatch) && characterMatch[1] !== "personnages";
    const isRegionBiography = document.body.classList.contains("region-biography-page")
      && /^\/pages\/regions\/[a-z0-9-]+-biographie$/i.test(path);
    const isGroupBiography = document.body.classList.contains("group-biography-page")
      && /^\/pages\/groupes\/[a-z0-9-]+-biographie$/i.test(path);
    const isRegionOverview = document.body.classList.contains("region-overview-page")
      && Boolean(regionOverviewMatch)
      && regionOverviewMatch[1] !== "regions";
    const isGroupOverview = document.body.classList.contains("group-overview-page")
      && Boolean(groupOverviewMatch)
      && groupOverviewMatch[1] !== "groupes";

    if (!isCharacterPage && !isRegionBiography && !isGroupBiography && !isRegionOverview && !isGroupOverview) {
      return null;
    }

    const panel = isCharacterPage
      ? document.querySelector(".bio-panel")
      : document.querySelector(".region-detail-panel");

    if (!panel) {
      return null;
    }

    if (isCharacterPage && characterMatch && !isCharacterBiography) {
      return {
        mode: "summary",
        page: path,
        panel,
        biographyHref: `${characterMatch[1]}?bio=complete`
      };
    }

    if (isRegionOverview && regionOverviewMatch) {
      return {
        mode: "summary",
        page: `/pages/regions/${regionOverviewMatch[1]}-biographie`,
        panel,
        biographyHref: `${regionOverviewMatch[1]}-biographie`
      };
    }

    if (isGroupOverview && groupOverviewMatch) {
      return {
        mode: "summary",
        page: `/pages/groupes/${groupOverviewMatch[1]}-biographie`,
        panel,
        biographyHref: `${groupOverviewMatch[1]}-biographie`
      };
    }

    return { mode: "vote", page: path, panel };
  };

  const updatePageLikeView = (root, status, count) => {
    const button = root.querySelector("[data-page-like-button]");
    const buttonText = root.querySelector("[data-page-like-button-text]");
    const countNode = root.querySelector("[data-page-like-count]");
    const countLabel = root.querySelector("[data-page-like-count-label]");
    const note = root.querySelector("[data-page-like-note]");
    const safeCount = Number.isFinite(count) ? Math.max(0, count) : 0;

    root.classList.toggle("is-active", status === "active");
    root.classList.toggle("is-cancelled", status === "cancelled");
    root.classList.toggle("is-unavailable", status === "unavailable");

    if (countNode) {
      countNode.textContent = safeCount.toLocaleString("fr-FR");
    }
    if (countLabel) {
      countLabel.textContent = safeCount > 1 ? "c\u0153urs" : "c\u0153ur";
    }

    if (!button || !buttonText) {
      return;
    }

    const setNote = (text) => {
      if (note) {
        note.textContent = text;
      }
    };

    button.disabled = status === "unavailable" || status === "loading";
    button.setAttribute("aria-pressed", status === "active" ? "true" : "false");

    if (status === "active") {
      buttonText.textContent = "Retirer mon c\u0153ur";
      setNote("Votre c\u0153ur est compt\u00e9. Cliquez de nouveau pour annuler votre vote.");
    } else if (status === "cancelled") {
      buttonText.textContent = "J'aime cette page";
      setNote("Votre vote est annul\u00e9. Vous pouvez remettre votre c\u0153ur quand vous voulez.");
    } else if (status === "unavailable") {
      buttonText.textContent = "Vote indisponible";
      setNote("Le vote n'est pas disponible pour le moment.");
    } else if (status === "loading") {
      buttonText.textContent = "Chargement";
      setNote("V\u00e9rification du vote en cours.");
    } else {
      buttonText.textContent = "J'aime cette page";
      setNote("");
    }
  };

  const mountPageLike = () => {
    const target = getPageLikeTarget();
    if (!target || target.panel.querySelector("[data-page-like]")) {
      return;
    }

    const voterId = target.mode === "vote" ? getPageLikeVoterId() : "";
    if (target.mode === "vote" && !voterId) {
      return;
    }

    const root = document.createElement("section");
    document.body.classList.add("has-page-like");
    root.className = target.mode === "summary" ? "page-like page-like-summary" : "page-like";
    root.dataset.pageLike = "";
    root.innerHTML = target.mode === "summary"
      ? `
      <p class="page-like-total"><span class="page-like-heart" aria-hidden="true">♥</span> <strong data-page-like-count>0</strong> <span data-page-like-count-label>c\u0153ur</span></p>
      <p class="page-like-note" data-page-like-note><a href="${target.biographyHref}">Lire la biographie</a> pour voter.</p>`
      : `
      <p class="page-like-title">Vous avez aim\u00e9 cette page ?</p>
      <button class="page-like-button" type="button" data-page-like-button aria-pressed="false">
        <span class="page-like-heart" aria-hidden="true">♥</span>
        <span data-page-like-button-text>J'aime cette page</span>
      </button>
      <p class="page-like-total"><strong data-page-like-count>0</strong> <span data-page-like-count-label>c\u0153ur</span></p>`;

    const backLink = Array.from(target.panel.children).find((child) => child.matches(".back-link, .region-back-link"));
    if (backLink) {
      target.panel.insertBefore(root, backLink);
    } else {
      target.panel.append(root);
    }

    const button = root.querySelector("[data-page-like-button]");
    let currentStatus = "loading";
    let currentCount = 0;
    let refreshTimer = 0;
    let refreshInFlight = false;
    let pageLikeRequestId = 0;
    let actionCooldownTimer = 0;
    let isActionCoolingDown = false;
    if (target.mode === "vote") {
      updatePageLikeView(root, currentStatus, currentCount);
    }

    const refresh = (payload) => {
      currentStatus = payload.status || "none";
      currentCount = Number.parseInt(payload.count || 0, 10) || 0;
      updatePageLikeView(root, target.mode === "summary" ? "summary" : currentStatus, currentCount);
      if (button && isActionCoolingDown) {
        button.disabled = true;
      }
    };

    const requestLikeState = () => {
      const params = target.mode === "summary"
        ? new URLSearchParams({ page: target.page })
        : new URLSearchParams({ page: target.page, voterId });
      return fetch(`/api/page-likes?${params.toString()}`, { cache: "no-store" })
        .then((response) => (response.ok ? response.json() : Promise.reject(new Error("like_state_failed"))));
    };

    const sendLikeAction = (action) => fetch("/api/page-likes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ page: target.page, voterId, action })
    }).then(async (response) => {
      const payload = await response.json().catch(() => ({}));
      if (response.ok) {
        return payload;
      }

      const error = new Error("like_action_failed");
      error.payload = payload;
      throw error;
    });

    const startActionCooldown = () => {
      if (!button || !PAGE_LIKE_ACTION_COOLDOWN_MS) {
        return;
      }

      isActionCoolingDown = true;
      button.disabled = true;
      window.clearTimeout(actionCooldownTimer);
      actionCooldownTimer = window.setTimeout(() => {
        isActionCoolingDown = false;
        updatePageLikeView(root, currentStatus, currentCount);
      }, PAGE_LIKE_ACTION_COOLDOWN_MS);
    };

    const refreshLikeState = () => {
      if (refreshInFlight) {
        return Promise.resolve();
      }

      const requestId = ++pageLikeRequestId;
      refreshInFlight = true;
      return requestLikeState()
        .then((payload) => {
          if (requestId === pageLikeRequestId) {
            refresh(payload);
          }
        })
        .catch(() => {
          if (target.mode === "vote" && currentStatus === "loading") {
            updatePageLikeView(root, "unavailable", currentCount);
          }
        })
        .finally(() => {
          refreshInFlight = false;
        });
    };

    const startAutoRefresh = () => {
      if (refreshTimer || !PAGE_LIKE_REFRESH_INTERVAL_MS) {
        return;
      }

      refreshTimer = window.setInterval(() => {
        if (document.visibilityState === "visible") {
          refreshLikeState();
        }
      }, PAGE_LIKE_REFRESH_INTERVAL_MS);

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          refreshLikeState();
        }
      });
    };

    refreshLikeState();
    startAutoRefresh();

    if (button && target.mode === "vote") {
      button.addEventListener("click", () => {
        if (currentStatus === "loading" || isActionCoolingDown) {
          return;
        }

        const action = currentStatus === "active" ? "unlike" : "like";
        pageLikeRequestId += 1;
        updatePageLikeView(root, "loading", currentCount);
        sendLikeAction(action)
          .then(refresh)
          .catch((error) => {
            if (error && error.payload && Number.isFinite(Number.parseInt(error.payload.count, 10))) {
              refresh(error.payload);
            } else {
              updatePageLikeView(root, "unavailable", currentCount);
            }
          })
          .finally(startActionCooldown);
      });
    }
  };

  mountHeader();
  mountAnalytics();
  mountPageLike();
}());
