

(function () {
  const grid = document.querySelector("[data-gallery-grid]");
  const count = document.querySelector("[data-gallery-count]");
  const empty = document.querySelector("[data-gallery-empty]");
  const search = document.querySelector("#gallery-search");
  const backToTop = document.querySelector(".back-to-top");
  const modal = document.querySelector("[data-gallery-modal]");
  const modalImage = document.querySelector("[data-gallery-modal-image]");
  const modalTitle = document.querySelector("[data-gallery-modal-title]");
  const modalProfile = document.querySelector("[data-gallery-modal-profile]");
  const modalCloseButtons = document.querySelectorAll("[data-gallery-close]");
  let lastFocusedElement = null;

  if (!grid) {
    return;
  }

  const sourceUrl = "../../scripts/character-page-links.js";
  const characterBase = "../personnages/";
  const unique = new Map();

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const icon = (type) => {
    if (type === "download") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>';
    }

    if (type === "view") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }

    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"></path><path d="M9 7h8v8"></path></svg>';
  };

  const openModal = (item) => {
    if (!modal || !modalImage || !modalTitle || !modalProfile) {
      return;
    }

    lastFocusedElement = document.activeElement;
    modalImage.src = item.image;
    modalImage.alt = "Bannière de " + item.name;
    modalTitle.textContent = item.name;
    modalProfile.href = item.href;
    modalProfile.setAttribute("aria-label", "Ouvrir la fiche de " + item.name);
    modal.hidden = false;
    document.body.classList.add("is-gallery-modal-open");

    const closeButton = modal.querySelector(".gallery-modal-close");
    if (closeButton) {
      closeButton.focus();
    }
  };

  const closeModal = () => {
    if (!modal || modal.hidden) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("is-gallery-modal-open");
    if (modalImage) {
      modalImage.removeAttribute("src");
      modalImage.alt = "";
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const parseCharacters = (source) => {
    const pattern = /\{\s*"name":\s*"([^"]+)",\s*"href":\s*"([^"]+)",\s*"image":\s*"\.\.\/assets\/personnages\/cartes\/([^"]+)"/g;
    const items = [];
    let match;

    while ((match = pattern.exec(source)) !== null) {
      const [, name, href, image] = match;
      const slug = image.replace(/\.(webp|png|jpe?g)$/i, "");

      if (unique.has(slug)) {
        continue;
      }

      const item = {
        name,
        href: characterBase + href,
        image: "../../assets/personnages/" + image,
        download: image,
        search: normalize(name + " " + slug)
      };

      unique.set(slug, item);
      items.push(item);
    }

    return items.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }));
  };

  const mapManifest = (items) => items
    .filter((item) => item && item.name && item.href && item.slug)
    .map((item) => ({
      name: item.name,
      href: characterBase + item.href,
      image: "../../assets/personnages/" + item.image,
      download: item.image,
      search: normalize(item.name + " " + item.slug)
    }));

  const downloadImage = (item) => {
    fetch(item.image)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Image introuvable");
        }

        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = item.download;
        document.body.append(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      })
      .catch(() => {
        window.location.href = item.image;
      });
  };

  const createCard = (item) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.dataset.search = item.search;

    const media = document.createElement("button");
    media.className = "gallery-card-media";
    media.type = "button";
    media.setAttribute("aria-label", "Afficher la bannière de " + item.name);
    media.addEventListener("click", () => openModal(item));

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "Bannière de " + item.name;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      card.remove();
      syncVisibility();
    }, { once: true });

    media.append(image);

    const download = document.createElement("a");
    download.className = "gallery-download";
    download.href = item.image;
    download.download = item.download;
    download.title = "Télécharger l'image";
    download.setAttribute("aria-label", "Télécharger la bannière de " + item.name);
    download.innerHTML = icon("download");
    download.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      downloadImage(item);
    });

    card.append(media, download);

    return card;
  };

  const syncVisibility = () => {
    const query = normalize(search ? search.value : "");
    const cards = Array.from(grid.querySelectorAll(".gallery-card"));
    let visible = 0;

    cards.forEach((card) => {
      const matches = !query || card.dataset.search.includes(query);
      card.hidden = !matches;
      card.classList.remove("is-gallery-row-four");
      if (matches) {
        const positionInCycle = visible % 9;
        if (positionInCycle >= 5) {
          card.classList.add("is-gallery-row-four");
        }

        visible += 1;
      }
    });

    if (count) {
      count.textContent = String(visible);
    }

    if (empty) {
      empty.hidden = visible !== 0;
    }

  };

  const render = (items) => {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.append(createCard(item)));
    grid.replaceChildren(fragment);
    syncVisibility();
  };

  if (Array.isArray(window.KROSMOZ_GALLERY_IMAGES)) {
    render(mapManifest(window.KROSMOZ_GALLERY_IMAGES));
  } else {
    fetch(sourceUrl)
      .then((response) => {
      if (!response.ok) {
        throw new Error("Liste introuvable");
      }
      return response.text();
      })
      .then((source) => render(parseCharacters(source)))
      .catch(() => {
        if (empty) {
          empty.hidden = false;
          empty.textContent = "La galerie n'a pas pu être chargée.";
        }
      });
  }

  if (search) {
    search.addEventListener("input", syncVisibility);
  }

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  const syncBackToTop = () => {
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 520);
    }
  };

  if (backToTop) {
    window.addEventListener("scroll", syncBackToTop, { passive: true });
    window.addEventListener("load", syncBackToTop);
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    syncBackToTop();
  }
}());
