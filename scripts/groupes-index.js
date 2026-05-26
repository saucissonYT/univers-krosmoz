(function () {
  const searchInput = document.getElementById("group-search");
  const sortButton = document.querySelector("[data-group-sort='az']");
  const filterButtons = Array.from(document.querySelectorAll("[data-group-filter]"));
  const grid = document.querySelector(".groupes-grid");

  if (!searchInput || !sortButton || !grid) return;

  const cards = Array.from(grid.querySelectorAll(".group-card"));
  let isSortedAz = false;
  let activeFilter = "all";

  cards.forEach((card, index) => {
    card.dataset.originalOrder = String(index);
  });

  const getGroupName = (card) => card.querySelector(".group-card-copy strong")?.textContent?.trim() || "";
  const normalizeSearch = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();

  const refreshGroups = () => {
    const query = normalizeSearch(searchInput.value);

    cards.forEach((card) => {
      const haystack = normalizeSearch(`${getGroupName(card)} ${card.dataset.group || ""} ${card.dataset.universe || ""}`);
      const matchesSearch = !query || haystack.includes(query);
      const matchesFilter = activeFilter === "all" || (card.dataset.universe || "").split(/\s+/).includes(activeFilter);
      card.hidden = !matchesSearch || !matchesFilter;
    });

    const sortedCards = [...cards].sort((first, second) => {
      if (!isSortedAz) {
        return Number(first.dataset.originalOrder) - Number(second.dataset.originalOrder);
      }

      return getGroupName(first).localeCompare(getGroupName(second), "fr", {
        sensitivity: "base",
        ignorePunctuation: true,
      });
    });

    grid.append(...sortedCards);
  };

  searchInput.addEventListener("input", refreshGroups);
  sortButton.addEventListener("click", () => {
    isSortedAz = true;
    sortButton.classList.add("is-active");
    sortButton.setAttribute("aria-pressed", "true");
    refreshGroups();
  });
  sortButton.setAttribute("aria-pressed", "false");

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.groupFilter === activeFilter ? "true" : "false");
    button.addEventListener("click", () => {
      activeFilter = button.dataset.groupFilter || "all";
      filterButtons.forEach((entry) => {
        const isActive = entry === button;
        entry.classList.toggle("is-active", isActive);
        entry.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      refreshGroups();
    });
  });
}());
