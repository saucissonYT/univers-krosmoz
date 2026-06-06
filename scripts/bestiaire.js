/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const spread = document.querySelector("[data-bestiary-spread]");
  if (!spread) return;

  const cursor = spread.querySelector("[data-bestiary-cursor]");
  const pages = Array.from(spread.querySelectorAll("[data-bestiary-page]"));
  const turnButtons = Array.from(spread.querySelectorAll("[data-bestiary-turn]"));
  const parchmentUrl = "/assets/bestiaire/parcho-page-v1.webp?v=20260605-single";
  let spreadStart = 0;
  let focusedSide = "left";

  pages.forEach((page) => {
    page.style.setProperty("--bestiary-parchment", `url("${parchmentUrl}")`);
  });

  const getMaxSpreadStart = () => Math.max(0, pages.length - 2);

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

    if (cursor) {
      cursor.classList.toggle("is-left", focusedSide === "left");
      cursor.classList.toggle("is-right", focusedSide === "right");
    }
  };

  const focusSide = (side) => {
    focusedSide = side === "right" ? "right" : "left";
    renderSpread();
  };

  const turnSpread = (side) => {
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

  const getSideFromPointer = (event) => {
    const bounds = spread.getBoundingClientRect();
    return event.clientX < bounds.left + bounds.width / 2 ? "left" : "right";
  };

  spread.addEventListener("pointermove", (event) => {
    const side = getSideFromPointer(event);
    focusSide(side);

    if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      cursor.classList.add("is-visible");
      cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
    }
  });

  spread.addEventListener("pointerleave", () => {
    cursor?.classList.remove("is-visible");
  });

  turnButtons.forEach((button) => {
    button.addEventListener("click", () => {
      turnSpread(button.dataset.bestiaryTurn);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      turnSpread("left");
    } else if (event.key === "ArrowRight") {
      turnSpread("right");
    }
  });

  renderSpread();
})();
