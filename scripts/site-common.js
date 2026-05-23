(function () {
  const ANALYTICS_ID = "G-ENCHQ15LHS";

  const stripFileName = (pathname) => pathname.replace(/[^/]*$/, "");
  const currentPath = new URL(window.location.href).pathname;
  const basePath = stripFileName(currentPath);
  const rootUrl = new URL(document.currentScript ? "../" : "./", document.currentScript ? document.currentScript.src : window.location.href);

  const links = [
    { label: "Histoire", href: "pages/histoire/histoire-krosmoz.html", match: "/pages/histoire/" },
    { label: "Personnages", href: "pages/personnages/personnages.html", match: "/pages/personnages/" },
    {
      label: "Chronologie",
      items: [
        { label: "Histoire", href: "pages/chronologies/chronologie-historique.html" },
        { label: "Œuvre", href: "pages/chronologies/chronologie-oeuvres.html" }
      ],
      match: "/pages/chronologies/"
    },
    { label: "Régions", href: "pages/regions/regions.html", match: "/pages/regions/" },
    { label: "Lexique", href: "pages/lexique/lexique.html", match: "/pages/lexique/" },
    { label: "Jeux", href: "pages/jeux/jeux.html", match: "/pages/jeux/" },
    {
      label: "Médias",
      items: [
        { label: "Arbre des affinités", href: "pages/media/arbre-affinites.html" }
      ],
      match: "/pages/media/"
    },
    { label: "Contactez-nous", href: "pages/contact/contact.html", match: "/pages/contact/" }
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

  const isActive = (entry) => currentPath.includes(entry.match);

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
    <a class="brand" href="${relativeFromPage("index.html")}" aria-label="Univers Krosmoz">
      <img src="${relativeFromPage("assets/logo_krosmoz.webp")}" alt="">
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

  mountHeader();
  mountAnalytics();
}());
