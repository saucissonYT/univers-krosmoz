(function () {
  const searchInput = document.getElementById("lexicon-search-input");
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const list = document.querySelector("[data-lexicon-list]");
  const indexLetters = Array.from(document.querySelectorAll("[data-letter-target]"));
  const backToTop = document.querySelector(".back-to-top");
  const entriesData = Array.isArray(window.KROSMOZ_LEXICON_ENTRIES) ? window.KROSMOZ_LEXICON_ENTRIES : [];

  const normalizeSearch = (value) => (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019]/g, "")
    .toLowerCase();

  const slugifyLexiconEntry = (value) => normalizeSearch(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const buildSearchText = (entry) => normalizeSearch([
    entry.title,
    entry.type,
    entry.description
  ].join(" "));

  const renderEntries = () => {
    if (!list) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let currentLetter = "";

    entriesData.forEach((entry) => {
      if (entry.letter && entry.letter !== currentLetter) {
        currentLetter = entry.letter;
        const letter = document.createElement("div");
        letter.className = "lexicon-letter";
        letter.dataset.letter = currentLetter;
        letter.textContent = currentLetter;
        fragment.append(letter);
      }

      const article = document.createElement("article");
      article.className = "lexicon-entry";
      article.dataset.category = entry.category || "";
      article.dataset.search = buildSearchText(entry);

      const slug = slugifyLexiconEntry(entry.title);
      if (slug) {
        article.id = slug;
      }

      const head = document.createElement("div");
      head.className = "lexicon-entry-head";

      const type = document.createElement("span");
      type.className = "lexicon-entry-type";
      type.textContent = entry.type || entry.category || "";

      const title = document.createElement("h2");
      title.textContent = entry.title || "";

      const description = document.createElement("p");
      description.textContent = entry.description || "";

      head.append(type, title);
      article.append(head, description);
      fragment.append(article);
    });

    list.replaceChildren(fragment);
  };

  renderEntries();

  const entries = Array.from(document.querySelectorAll(".lexicon-entry"));
  const letters = Array.from(document.querySelectorAll(".lexicon-letter"));

  indexLetters.forEach((button) => {
    const hasSection = Boolean(document.querySelector(`.lexicon-letter[data-letter="${button.dataset.letterTarget}"]`));
    button.disabled = !hasSection;
  });

  const refreshLexicon = () => {
    const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";
    const query = normalizeSearch((searchInput?.value || "").trim());

    entries.forEach((entry) => {
      const matchesFilter = activeFilter === "all" || entry.dataset.category === activeFilter;
      const matchesSearch = !query || normalizeSearch(entry.dataset.search).includes(query);
      entry.hidden = !(matchesFilter && matchesSearch);
    });

    letters.forEach((letter) => {
      let sibling = letter.nextElementSibling;
      let hasVisibleEntry = false;

      while (sibling && !sibling.classList.contains("lexicon-letter")) {
        if (sibling.classList.contains("lexicon-entry") && !sibling.hidden) {
          hasVisibleEntry = true;
          break;
        }

        sibling = sibling.nextElementSibling;
      }

      letter.hidden = !hasVisibleEntry;
    });
  };

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      filter.classList.add("active");
      refreshLexicon();
    });
  });

  indexLetters.forEach((button) => {
    button.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }

      filters.forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
      refreshLexicon();

      const target = document.querySelector(`.lexicon-letter[data-letter="${button.dataset.letterTarget}"]`);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      indexLetters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", refreshLexicon);

    const initialQuery = new URLSearchParams(window.location.search).get("q");
    if (initialQuery) {
      searchInput.value = initialQuery;
    }
  }

  const scrollToTargetEntry = () => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 520);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  refreshLexicon();
  window.setTimeout(scrollToTargetEntry, 80);
}());
