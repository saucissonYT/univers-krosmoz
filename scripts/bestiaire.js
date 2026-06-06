/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const spread = document.querySelector("[data-bestiary-spread]");
  if (!spread) return;

  const pages = Array.from(spread.querySelectorAll("[data-bestiary-page]"));
  const turnButtons = Array.from(spread.querySelectorAll("[data-bestiary-turn]"));
  const searchInput = document.querySelector("[data-bestiary-search]");
  const filter = document.querySelector("[data-bestiary-filter]");
  const filterToggle = filter?.querySelector(".bestiary-filter-toggle");
  const filterLabel = filterToggle?.querySelector("strong");
  const filterMenu = filter?.querySelector(".bestiary-filter-menu");
  const filterCount = document.querySelector("[data-bestiary-filter-count]");
  const parchmentUrl = "/assets/bestiaire/parcho-page-v1.webp?v=20260605-single";
  let spreadStart = 0;
  let focusedSide = "left";

  pages.forEach((page) => {
    page.style.setProperty("--bestiary-parchment", `url("${parchmentUrl}")`);
  });

  const getMaxSpreadStart = () => Math.max(0, pages.length - 2);
  const clampSpreadStart = (index) => Math.min(Math.max(0, index), getMaxSpreadStart());

  const normalize = (value) => (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const entries = pages.map((page, index) => {
    const title = page.querySelector("h2")?.textContent?.trim() || `Fiche ${index + 1}`;
    const kicker = page.querySelector(".bestiary-kicker")?.textContent?.trim() || "";
    return {
      index,
      page,
      title,
      search: normalize(`${title} ${kicker} ${page.textContent || ""}`)
    };
  });

  const renderSpread = () => {
    pages.forEach((page, index) => {
      const side = index === spreadStart ? "left" : index === spreadStart + 1 ? "right" : "";
      page.hidden = !side;
      page.classList.toggle("is-focused", side === focusedSide);

      if (side) {
        page.dataset.bestiaryPage = side;
      } else {
        page.removeAttribute("data-bestiary-page");
      }
    });

    spread.classList.toggle("is-focused-left", focusedSide === "left");
    spread.classList.toggle("is-focused-right", focusedSide === "right");
  };

  const setFilterLabel = (label) => {
    if (filterLabel) filterLabel.textContent = label || "Toutes";
  };

  const setActiveFilterItem = (value) => {
    filterMenu?.querySelectorAll(".bestiary-filter-item").forEach((item) => {
      const isActive = item.dataset.value === value;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  };

  const updateCount = (text) => {
    if (filterCount) filterCount.textContent = text || "";
  };

  const resetFilterState = () => {
    if (searchInput) searchInput.value = "";
    setFilterLabel("Toutes");
    setActiveFilterItem("");
    updateCount("");
  };

  const focusSide = (side) => {
    focusedSide = side === "right" ? "right" : "left";
    renderSpread();
  };

  const showEntry = (index, options = {}) => {
    const targetIndex = Math.min(Math.max(0, index), pages.length - 1);
    spreadStart = clampSpreadStart(targetIndex);
    focusedSide = targetIndex === spreadStart ? "left" : "right";
    renderSpread();

    if (!options.keepFilterLabel) {
      const entry = entries[targetIndex];
      setFilterLabel(entry?.title || "Toutes");
      setActiveFilterItem(String(targetIndex));
    }
  };

  const turnSpread = (side) => {
    if (window.matchMedia("(max-width: 920px)").matches) {
      const currentIndex = spreadStart + (focusedSide === "right" ? 1 : 0);
      const direction = side === "right" ? 1 : -1;
      showEntry(currentIndex + direction, { keepFilterLabel: true });
      return;
    }

    const maxStart = getMaxSpreadStart();

    if (side === "right" && spreadStart < maxStart) {
      spreadStart += 1;
      focusedSide = "right";
      renderSpread();
      return;
    }

    if (side === "left" && spreadStart > 0) {
      spreadStart -= 1;
      focusedSide = "left";
      renderSpread();
      return;
    }

    focusSide(side);
  };

  const closeFilterMenu = () => {
    filter?.classList.remove("is-open");
    filterToggle?.setAttribute("aria-expanded", "false");
  };

  const openFilterMenu = () => {
    filter?.classList.add("is-open");
    filterToggle?.setAttribute("aria-expanded", "true");
  };

  const populateFilterMenu = () => {
    if (!filterMenu) return;

    filterMenu.innerHTML = "";

    const createItem = (label, value) => {
      const item = document.createElement("button");
      item.className = "bestiary-filter-item";
      item.type = "button";
      item.role = "menuitem";
      item.dataset.value = value;
      item.textContent = label;
      return item;
    };

    filterMenu.appendChild(createItem("Toutes", ""));
    entries.forEach((entry) => {
      filterMenu.appendChild(createItem(entry.title, String(entry.index)));
    });

    setActiveFilterItem("");
  };

  const applySearch = () => {
    const query = normalize(searchInput?.value || "");

    if (!query) {
      setFilterLabel("Toutes");
      setActiveFilterItem("");
      updateCount("");
      showEntry(0, { keepFilterLabel: true });
      return;
    }

    const matches = entries.filter((entry) => entry.search.includes(query));

    if (!matches.length) {
      updateCount("Aucun resultat");
      return;
    }

    const firstMatch = matches[0];
    showEntry(firstMatch.index);
    updateCount(matches.length === 1 ? "1 fiche" : `${matches.length} fiches`);
  };

  turnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetFilterState();
      turnSpread(button.dataset.bestiaryTurn);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      resetFilterState();
      turnSpread("left");
    } else if (event.key === "ArrowRight") {
      resetFilterState();
      turnSpread("right");
    }
  });

  populateFilterMenu();

  if (filterToggle && filter) {
    filterToggle.addEventListener("click", (event) => {
      event.preventDefault();
      if (filter.classList.contains("is-open")) {
        closeFilterMenu();
      } else {
        openFilterMenu();
      }
    });
  }

  filterMenu?.addEventListener("click", (event) => {
    const item = event.target.closest(".bestiary-filter-item");
    if (!item) return;

    const value = item.dataset.value || "";
    if (searchInput) searchInput.value = "";
    updateCount("");

    if (!value) {
      setFilterLabel("Toutes");
      setActiveFilterItem("");
      showEntry(0, { keepFilterLabel: true });
    } else {
      showEntry(Number(value));
    }

    closeFilterMenu();
  });

  searchInput?.addEventListener("input", applySearch);

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-bestiary-filter]")) closeFilterMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFilterMenu();
  });

  renderSpread();
})();
