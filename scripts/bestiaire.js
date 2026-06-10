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
  const hunter = document.querySelector("[data-bestiary-hunter]");
  const hunterList = document.querySelector("[data-bestiary-hunter-list]");
  const hunterDetail = document.querySelector("[data-bestiary-hunter-detail]");
  const hunterImage = document.querySelector("[data-bestiary-hunter-image]");
  const hunterNumber = document.querySelector("[data-bestiary-hunter-number]");
  const hunterTitle = document.querySelector("[data-bestiary-hunter-title]");
  const hunterKicker = document.querySelector("[data-bestiary-hunter-kicker]");
  const hunterNature = document.querySelector("[data-bestiary-hunter-nature]");
  const hunterSummary = document.querySelector("[data-bestiary-hunter-summary]");
  const hunterOpen = document.querySelector("[data-bestiary-hunter-open]");
  const hunterPrev = document.querySelector("[data-bestiary-hunter-prev]");
  const hunterNext = document.querySelector("[data-bestiary-hunter-next]");
  const hunterPageLabel = document.querySelector("[data-bestiary-hunter-page-label]");
  const parchmentUrl = "/assets/bestiaire/parcho-page-v1.webp?v=20260605-single";
  const hunterPageSize = 5;
  const mobileMedia = window.matchMedia("(max-width: 920px)");
  let spreadStart = 0;
  let focusedSide = "left";
  let selectedHunterIndex = 0;
  let hunterIndexPage = 0;

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

  const getEntrySlug = (value) => normalize(value).replace(/\s+/g, "-");

  const entries = pages.map((page, index) => {
    const title = page.querySelector("h2")?.textContent?.trim() || `Fiche ${index + 1}`;
    const kicker = page.querySelector(".bestiary-kicker")?.textContent?.trim() || "";
    const image = page.querySelector(".bestiary-illustration img");
    const number = page.querySelector(".bestiary-page-number")?.textContent?.trim() || String(index + 1);
    const paragraphs = Array.from(page.querySelectorAll(".bestiary-scroll p"))
      .map((paragraph) => paragraph.textContent?.trim())
      .filter(Boolean);
    return {
      index,
      page,
      title,
      kicker,
      number,
      imageSrc: image?.getAttribute("src") || "",
      imageAlt: image?.getAttribute("alt") || title,
      paragraphs,
      slug: getEntrySlug(title),
      search: normalize(`${title} ${kicker} ${page.textContent || ""}`)
    };
  });

  const syncLayoutMode = () => {
    const isMobile = mobileMedia.matches;
    if (hunter) hunter.hidden = isMobile;
    spread.hidden = !isMobile;
    spread.setAttribute("aria-hidden", String(!isMobile));
    if (isMobile) {
      spread.removeAttribute("inert");
      renderSpread();
    } else {
      spread.setAttribute("inert", "");
    }
  };

  const setActiveHunterItem = (index) => {
    hunterList?.querySelectorAll(".bestiary-hunter-item").forEach((item) => {
      const isActive = Number(item.dataset.index) === index;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
  };

  const getHunterPageCount = () => Math.max(1, Math.ceil(entries.length / hunterPageSize));

  const updateHunterControls = () => {
    const pageCount = getHunterPageCount();
    if (hunterPageLabel) hunterPageLabel.textContent = `${hunterIndexPage + 1} / ${pageCount}`;
    if (hunterPrev) hunterPrev.disabled = hunterIndexPage === 0;
    if (hunterNext) hunterNext.disabled = hunterIndexPage >= pageCount - 1;
  };

  const renderHunterPage = (nextSelectedIndex) => {
    if (!hunterList) return;

    const pageCount = getHunterPageCount();
    hunterIndexPage = Math.min(Math.max(0, hunterIndexPage), pageCount - 1);
    const start = hunterIndexPage * hunterPageSize;
    const visibleEntries = entries.slice(start, start + hunterPageSize);

    hunterList.innerHTML = "";
    visibleEntries.forEach((entry) => {
      const item = document.createElement("button");
      item.className = "bestiary-hunter-item";
      item.type = "button";
      item.dataset.index = String(entry.index);
      item.innerHTML = `
        <span class="bestiary-hunter-medallion" data-creature="${entry.slug}"><img src="${entry.imageSrc}" alt="" loading="lazy" decoding="async"></span>
        <span class="bestiary-hunter-item-copy">
          <strong>${entry.title}</strong>
          <span class="bestiary-hunter-leader" aria-hidden="true"></span>
          <span class="bestiary-hunter-page-number">${entry.number}</span>
        </span>
      `;
      hunterList.appendChild(item);
    });

    updateHunterControls();

    if (typeof nextSelectedIndex === "number") {
      setActiveHunterItem(nextSelectedIndex);
    }
  };

  const updateHunterDetail = (index) => {
    const entry = entries[Math.min(Math.max(0, index), entries.length - 1)];
    if (!entry || !hunterDetail) return;

    selectedHunterIndex = entry.index;
    const targetHunterPage = Math.floor(entry.index / hunterPageSize);
    if (targetHunterPage !== hunterIndexPage || !hunterList?.children.length) {
      hunterIndexPage = targetHunterPage;
      renderHunterPage(entry.index);
    }

    if (hunterImage) {
      hunterImage.src = entry.imageSrc;
      hunterImage.alt = entry.imageAlt;
      hunterImage.dataset.creature = entry.slug;
    }
    if (hunterNumber) hunterNumber.textContent = `Page ${entry.number}`;
    if (hunterTitle) hunterTitle.textContent = entry.title;
    if (hunterKicker) hunterKicker.textContent = entry.kicker;
    if (hunterNature) hunterNature.textContent = entry.kicker || "Creature du Monde des Douze";
    if (hunterSummary) {
      hunterSummary.replaceChildren();
      const paragraphs = entry.paragraphs.length ? entry.paragraphs : [entry.kicker].filter(Boolean);
      paragraphs.forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        hunterSummary.appendChild(paragraph);
      });
    }
    hunterDetail.scrollTop = 0;
    setActiveHunterItem(entry.index);
  };

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
    updateHunterDetail(targetIndex);

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

  const populateHunterList = () => {
    if (!hunterList) return;

    renderHunterPage(0);
    updateHunterDetail(0);
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
  populateHunterList();

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

  hunterList?.addEventListener("click", (event) => {
    const item = event.target.closest(".bestiary-hunter-item");
    if (!item) return;
    updateHunterDetail(Number(item.dataset.index || 0));
  });

  hunterPrev?.addEventListener("click", () => {
    if (hunterIndexPage <= 0) return;
    hunterIndexPage -= 1;
    const nextIndex = hunterIndexPage * hunterPageSize;
    renderHunterPage(nextIndex);
    updateHunterDetail(nextIndex);
  });

  hunterNext?.addEventListener("click", () => {
    if (hunterIndexPage >= getHunterPageCount() - 1) return;
    hunterIndexPage += 1;
    const nextIndex = hunterIndexPage * hunterPageSize;
    renderHunterPage(nextIndex);
    updateHunterDetail(nextIndex);
  });

  hunterOpen?.addEventListener("click", (event) => {
    event.preventDefault();
  });

  searchInput?.addEventListener("input", applySearch);

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-bestiary-filter]")) closeFilterMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFilterMenu();
  });

  renderSpread();
  syncLayoutMode();
  mobileMedia.addEventListener("change", syncLayoutMode);
})();
