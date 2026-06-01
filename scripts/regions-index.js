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
  const regionTiers = [
    {
      id: "plans",
      title: "Plans du Krosmoz",
      subtitle: "Structures majeures du Krosmoz",
      regions: [
        "krosmoz",
        "plan-materiel",
        "ether",
        "arbre-vagabonds",
        "inglorium",
        "incarnam",
        "externam",
        "necromonde",
        "shukrute",
      ],
    },
    {
      id: "dimensions",
      title: "Dimensions",
      subtitle: "Royaumes divins et lieux hors du monde",
      regions: [
        "xelorium",
        "hormonde",
        "ecaflipus",
        "srambad",
        "osavora",
        "enutrosor",
        "dimension-obscure",
        "pyramide-ocre",
      ],
    },
    {
      id: "monde",
      title: "Monde des Douze",
      subtitle: "Continents, cités, îles et archipels",
      regions: [
        "monde-des-douze",
        "mont-zinit",
        "frigost",
        "royaume-chuchoku",
        "cania",
        "bibliotemple",
        "bonta",
        "foire-du-trool",
        "brakmar",
        "katrepat",
        "ile-aux-moines",
        "sufokia",
        "abysses-sufokia",
        "bilbyza",
        "pandala",
        "pandalousie",
        "amakna",
        "domaine-sauvage",
        "kolizeum",
        "royaume-sadida",
        "montagnes-koalaks",
        "kelba",
        "astrub",
        "mer-dasse",
        "ile-des-brumes",
        "ile-de-rok",
        "ile-wabbits",
        "vulkania",
        "ile-nowel",
        "crocuzko",
        "ile-minotoror",
        "ile-otomai",
        "nimotopia",
        "saharach",
        "archipel-valonia",
        "ereboria",
        "ile-moon",
      ],
    },
  ];
  const tierByRegion = new Map(regionTiers.flatMap((tier) => tier.regions.map((region) => [region, tier.id])));
  const orderByRegion = new Map(regionTiers.flatMap((tier) => tier.regions.map((region, index) => [region, index])));
  const tierElements = new Map();

  cards.forEach((card, index) => {
    card.dataset.originalOrder = String(index);
    const regionKey = card.getAttribute("href") || "";
    card.dataset.regionTier = tierByRegion.get(regionKey) || "monde";
    card.dataset.regionOrder = String(orderByRegion.get(regionKey) ?? index);
  });

  grid.replaceChildren();
  regionTiers.forEach((tier) => {
    const section = document.createElement("section");
    section.className = "region-tier";
    section.dataset.regionTier = tier.id;
    section.setAttribute("aria-labelledby", `region-tier-${tier.id}`);

    const heading = document.createElement("div");
    heading.className = "region-tier-heading";

    const title = document.createElement("h2");
    title.className = "region-tier-title";
    title.id = `region-tier-${tier.id}`;
    title.textContent = tier.title;

    const subtitle = document.createElement("p");
    subtitle.className = "region-tier-subtitle";
    subtitle.textContent = tier.subtitle;

    const list = document.createElement("div");
    list.className = "region-tier-list";

    heading.append(title, subtitle);
    section.append(heading, list);
    grid.append(section);
    tierElements.set(tier.id, { section, list });
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
        return Number(first.dataset.regionOrder) - Number(second.dataset.regionOrder);
      }

      return getRegionName(first).localeCompare(getRegionName(second), "fr", {
        sensitivity: "base",
        ignorePunctuation: true,
      });
    });

    regionTiers.forEach((tier) => {
      const tierElement = tierElements.get(tier.id);
      if (tierElement) {
        tierElement.list.replaceChildren();
      }
    });

    sortedCards.forEach((card) => {
      const tierElement = tierElements.get(card.dataset.regionTier || "monde") || tierElements.get("monde");
      tierElement?.list.append(card);
    });

    tierElements.forEach(({ section, list }) => {
      const hasVisibleCard = Array.from(list.children).some((card) => !card.hidden);
      section.hidden = !hasVisibleCard;
    });
  };

  searchInput.addEventListener("input", refreshRegions);
  sortButton.addEventListener("click", () => {
    isSortedAz = true;
    sortButton.classList.add("is-active");
    sortButton.setAttribute("aria-pressed", "true");
    refreshRegions();
  });
  sortButton.setAttribute("aria-pressed", "false");
  refreshRegions();
}());
