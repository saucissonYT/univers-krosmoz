/*
  Site developpe par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et edition : Zaki & B.
*/

(function () {
  const sections = [
    { key: "family", title: "Famille" },
    { key: "friends", title: "Amis" },
    { key: "enemies", title: "Ennemis" }
  ];

  function getCharacterName() {
    return cleanText(document.querySelector(".hero-name")?.textContent || document.title.replace(/\s*\|.*$/, ""));
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function createLinkedName(name) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const icon = window.KrosmozAffinities?.getIcon(name);
    link.href = `../media/arbre-affinites.html?personnage=${encodeURIComponent(name)}`;
    link.className = "character-affinity-token";
    link.title = name;
    link.setAttribute("aria-label", name);

    if (icon) {
      const image = document.createElement("img");
      image.src = icon;
      image.alt = "";
      image.loading = "lazy";
      link.append(image);
    }

    item.append(link);
    return item;
  }

  function createRelationGroup(title, entries) {
    const group = document.createElement("section");
    group.className = "character-affinity-group";

    const heading = document.createElement("h3");
    heading.textContent = title;
    group.append(heading);

    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "character-affinity-empty";
      empty.textContent = "Aucune relation renseignée.";
      group.append(empty);
      return group;
    }

    entries.forEach((entry) => {
      const block = document.createElement("div");
      block.className = "character-affinity-entry";

      if (entry.label !== title) {
        const label = document.createElement("p");
        label.className = "character-affinity-label";
        label.textContent = entry.label;
        block.append(label);
      }

      const list = document.createElement("ul");
      list.className = "character-affinity-list";
      entry.names.forEach((name) => list.append(createLinkedName(name)));
      block.append(list);
      group.append(block);
    });

    return group;
  }

  function initCharacterAffinities() {
    const bio = document.querySelector(".bio-panel");
    const api = window.KrosmozAffinities;
    const characterName = getCharacterName();

    if (!bio || !api || !characterName || bio.querySelector(".character-affinity-summary")) {
      return;
    }

    const relations = api.getRelations(characterName);
    const hasAnyRelation = sections.some(({ key }) => relations[key]?.length);
    if (!hasAnyRelation) {
      return;
    }

    const panel = document.createElement("section");
    panel.className = "character-affinity-summary is-collapsed";
    panel.setAttribute("aria-labelledby", "character-affinity-title");

    const header = document.createElement("div");
    header.className = "character-affinity-header";

    const title = document.createElement("h2");
    title.id = "character-affinity-title";
    title.textContent = "Relations";

    const titleGroup = document.createElement("div");
    titleGroup.className = "character-affinity-title-group";

    const icon = document.createElement("span");
    icon.className = "character-affinity-tree-icon";
    icon.setAttribute("aria-hidden", "true");
    const iconImage = document.createElement("img");
    iconImage.src = "../../assets/affinites/affinity-tree-icon.png";
    iconImage.alt = "";
    iconImage.loading = "lazy";
    iconImage.decoding = "async";
    icon.append(iconImage);
    titleGroup.append(icon, title);

    const treeLink = document.createElement("a");
    treeLink.className = "character-affinity-tree-link";
    treeLink.href = `../media/arbre-affinites.html?personnage=${encodeURIComponent(characterName)}`;
    treeLink.textContent = "Arbre d'affinités";

    const toggle = document.createElement("button");
    toggle.className = "character-affinity-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "character-affinity-content");
    toggle.innerHTML = '<span>Afficher</span><i aria-hidden="true"></i>';

    header.append(titleGroup, toggle);
    panel.append(header);

    const intro = document.createElement("p");
    intro.className = "character-affinity-teaser";
    intro.textContent = "Voir les liens de famille, d'alliés et d'ennemis de ce personnage.";
    panel.append(intro);

    const content = document.createElement("div");
    content.id = "character-affinity-content";
    content.className = "character-affinity-content";
    content.setAttribute("aria-hidden", "true");

    const grid = document.createElement("div");
    grid.className = "character-affinity-grid";
    sections.forEach(({ key, title: sectionTitle }) => {
      grid.append(createRelationGroup(sectionTitle, relations[key] || []));
    });
    content.append(grid, treeLink);
    panel.append(content);

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      panel.classList.toggle("is-collapsed", !isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.querySelector("span").textContent = isOpen ? "Masquer" : "Afficher";
      content.setAttribute("aria-hidden", String(!isOpen));
    });

    const backLink = bio.querySelector(".back-link");
    if (backLink) {
      backLink.after(panel);
    } else {
      bio.append(panel);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCharacterAffinities, { once: true });
  } else {
    initCharacterAffinities();
  }
})();
