/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const searchInput = document.getElementById("region-search");
  const sortButton = document.querySelector("[data-region-sort='az']");
  const grid = document.querySelector(".regions-grid");

  if (!searchInput || !sortButton || !grid) {
    return;
  }

  const cards = Array.from(grid.querySelectorAll(".region-card"));
  let isSortedAz = false;

  cards.forEach((card, index) => {
    card.dataset.originalOrder = String(index);
  });

  const getRegionName = (card) => card.querySelector(".region-card-copy strong")?.textContent?.trim() || "";
  const normalizeSearch = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();

  const refreshRegions = () => {
    const query = normalizeSearch(searchInput.value);

    cards.forEach((card) => {
      const matchesSearch = !query || normalizeSearch(getRegionName(card)).includes(query);
      card.hidden = !matchesSearch;
    });

    const sortedCards = [...cards].sort((first, second) => {
      if (!isSortedAz) {
        return Number(first.dataset.originalOrder) - Number(second.dataset.originalOrder);
      }

      return getRegionName(first).localeCompare(getRegionName(second), "fr", {
        sensitivity: "base",
        ignorePunctuation: true,
      });
    });

    grid.append(...sortedCards);
  };

  searchInput.addEventListener("input", refreshRegions);
  sortButton.addEventListener("click", () => {
    isSortedAz = true;
    sortButton.classList.add("is-active");
    sortButton.setAttribute("aria-pressed", "true");
    refreshRegions();
  });
  sortButton.setAttribute("aria-pressed", "false");
}());
