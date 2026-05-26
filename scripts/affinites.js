/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et edition : Zaki & B.
*/

document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector(".affinities-svg-host");
  const select = document.querySelector("#affinity-character-select");
  const reset = document.querySelector(".affinities-reset");
  const details = document.querySelector(".affinity-details");

  if (!host || !select || !reset) {
    return;
  }

  setupAffinityCharacterDropdown(select);

  function initializeLoadedSvg(svg) {
    if (!svg) {
      return;
    }

    normalizeExtractedPortraitPaths(svg);
    repairAffinityPortraits(svg);
    straightenAffinityLinks(svg);
    setupSvgTokenHover(host, svg);
    renderFamilyTitles(host, svg);
    renderHoverLabels(host, svg, svg.viewBox.baseVal);
    syncAffinityOverlaySize(host, svg);
    requestAnimationFrame(() => syncAffinityOverlaySize(host, svg));
    window.addEventListener("resize", () => syncAffinityOverlaySize(host, svg), { passive: true });
    setupStaticLabelHover(host);
    setupAffinityTree(svg, select, reset, details);
    setupAffinityEditor(host, svg);
  }

  const inlineSvg = host.querySelector("svg");
  if (inlineSvg) {
    host.classList.remove("is-loading", "is-fallback");
    initializeLoadedSvg(inlineSvg);
    setupStaticLabelHover(host);
    return;
  }

  const source = host.dataset.src;
  if (!source) {
    host.classList.remove("is-loading");
    host.classList.add("is-fallback");
    setupStaticLabelHover(host);
    return;
  }

  setupFallbackAffinityDetails(host, select, reset, details);

  const loadSource = getSvgLoadSource(source);

  if (window.location.protocol === "file:") {
    loadSvgThroughObject(loadSource)
      .then((svg) => {
        host.classList.remove("is-loading", "is-fallback");
        host.innerHTML = "";
        host.append(svg);
        initializeLoadedSvg(svg);
      })
      .catch(() => {
        host.classList.remove("is-loading");
        host.classList.add("is-fallback");
      });
    setupStaticLabelHover(host);
    return;
  }

  fetch(source)
    .then((response) => {
      if (!response.ok) {
        throw new Error("SVG unavailable");
      }
      return response.text();
    })
    .then((svgText) => {
      host.classList.remove("is-loading", "is-fallback");
      host.innerHTML = svgText;
      const svg = host.querySelector("svg");
      if (!svg) {
        return;
      }

      initializeLoadedSvg(svg);
    })
    .catch(() => loadSvgThroughObject(loadSource)
      .then((svg) => {
        host.classList.remove("is-loading", "is-fallback");
        host.innerHTML = "";
        host.append(svg);
        initializeLoadedSvg(svg);
      })
      .catch(() => {
        host.classList.remove("is-loading");
        host.classList.add("is-fallback");
      }));

  setupStaticLabelHover(host);
});

function getSvgLoadSource(source) {
  if (window.location.protocol !== "file:") {
    return source;
  }

  return source.split("?")[0];
}

function loadSvgThroughObject(source) {
  return new Promise((resolve, reject) => {
    const object = document.createElement("object");
    const timeout = window.setTimeout(() => {
      object.remove();
      reject(new Error("SVG object timeout"));
    }, 3500);

    object.type = "image/svg+xml";
    object.data = source;
    object.setAttribute("aria-hidden", "true");
    object.style.position = "absolute";
    object.style.width = "1px";
    object.style.height = "1px";
    object.style.opacity = "0";
    object.style.pointerEvents = "none";

    object.addEventListener("load", () => {
      window.clearTimeout(timeout);
      try {
        const svg = object.contentDocument?.documentElement;
        if (!svg || svg.tagName.toLowerCase() !== "svg") {
          throw new Error("SVG object unavailable");
        }
        const importedSvg = document.importNode(svg, true);
        object.remove();
        resolve(importedSvg);
      } catch (error) {
        object.remove();
        reject(error);
      }
    }, { once: true });

    object.addEventListener("error", () => {
      window.clearTimeout(timeout);
      object.remove();
      reject(new Error("SVG object unavailable"));
    }, { once: true });

    document.body.append(object);
  });
}

const AFFINITY_NODE_INDEX = new Map();
const KROSMOZ_EXTRAS_START_Y = 6850;
const KROSMOZ_EXTRAS_DESKTOP_SHIFT = 360;
const DESKTOP_TITLE_POSITIONS = new Map([
  [getAffinityLookupKey("ÉLIATROPES"), { x: 626.124, y: 427.657 }],
  [getAffinityLookupKey("DRAGONS PRIMORDIAUX"), { x: 1339.312, y: 430.625 }],
  [getAffinityLookupKey("FRATRIE DES OUBLIÉS"), { x: 653.437, y: 3034.592 }],
  [getAffinityLookupKey("SHERAN SHARM"), { x: 1360.687, y: 3035.783 }]
]);

function setupSvgTokenHover(host, svg) {
  const tooltip = document.createElement("div");
  tooltip.className = "affinity-svg-hover-tooltip";
  tooltip.setAttribute("aria-hidden", "true");
  host.append(tooltip);

  function moveTooltip(event) {
    const box = host.getBoundingClientRect();
    tooltip.style.left = `${event.clientX - box.left}px`;
    tooltip.style.top = `${event.clientY - box.top}px`;
  }

  function showTooltip(group, event) {
    const name = group.dataset.affinityName || group.dataset.editorName || "";
    const role = group.dataset.affinityRole || "";
    if (!name) return;
    tooltip.innerHTML = `<strong>${escapeHtml(name)}</strong>${role ? `<span>${escapeHtml(role)}</span>` : ""}`;
    tooltip.classList.add("is-visible");
    moveTooltip(event);
  }

  function hideTooltip(group) {
    group?.classList.remove("is-hovered");
    tooltip.classList.remove("is-visible");
  }

  getCharacterGroups(svg).forEach((group, index) => {
    const texts = getCharacterTexts(group);
    const name = cleanLabel(texts[0]?.textContent || `Jeton ${index + 1}`);
    const role = cleanDisplayLabel(cleanLabel(texts[1]?.textContent || ""), 11);
    group.classList.add("affinity-token");
    group.dataset.affinityName = name;
    group.dataset.affinityRole = role;
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", role ? `${name}, ${role}` : name);

    let title = group.querySelector(":scope > title");
    if (!title) {
      title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      group.insertBefore(title, group.firstChild);
    }
    title.textContent = role ? `${name} - ${role}` : name;

    group.addEventListener("mouseenter", (event) => {
      group.classList.add("is-hovered");
      showTooltip(group, event);
    });
    group.addEventListener("mousemove", moveTooltip);
    group.addEventListener("mouseleave", () => hideTooltip(group));
    group.addEventListener("focus", (event) => {
      group.classList.add("is-hovered");
      showTooltip(group, event);
    });
    group.addEventListener("blur", () => hideTooltip(group));
  });
}

function setupStaticLabelHover(host) {
  const hotspots = Array.from(host.querySelectorAll(".affinity-hotspot"));
  const labels = Array.from(host.querySelectorAll(".affinity-person-name-html, .affinity-person-class-html"));

  function setVisible(index, visible) {
    host
      .querySelectorAll(`.affinity-tooltip[data-label-index="${index}"]`)
      .forEach((tooltip) => tooltip.classList.toggle("is-visible", visible));
  }

  hotspots.forEach((hotspot) => {
    const index = hotspot.dataset.labelIndex;
    hotspot.addEventListener("mouseenter", () => setVisible(index, true));
    hotspot.addEventListener("mouseleave", () => setVisible(index, false));
    hotspot.addEventListener("focus", () => setVisible(index, true));
    hotspot.addEventListener("blur", () => setVisible(index, false));
  });
}

function setupAffinityEditor(host, svg) {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("edit") || document.querySelector(".affinity-editor-panel")) {
    return;
  }

  const overlay = host.querySelector(".affinity-title-overlay");
  const titles = Array.from(host.querySelectorAll(".affinity-family-title-html"));
  const viewBox = svg.viewBox.baseVal;
  if (!overlay || !titles.length || !viewBox.width || !viewBox.height) {
    return;
  }

  document.body.classList.add("affinity-editor-active");
  svg.classList.add("affinity-editor-svg");

  const panel = document.createElement("aside");
  panel.className = "affinity-editor-panel";
  panel.innerHTML = `
    <div class="affinity-editor-row">
      <strong>Édition titres</strong>
      <button type="button" data-editor-copy>Copier</button>
    </div>
    <p data-editor-current>Déplace un bandeau de titre.</p>
    <textarea readonly spellcheck="false"></textarea>
  `;
  document.body.append(panel);

  const output = panel.querySelector("textarea");
  const current = panel.querySelector("[data-editor-current]");
  const copy = panel.querySelector("[data-editor-copy]");
  let selected = null;
  let drag = null;

  function getTitleName(title) {
    return cleanLabel(title.textContent || "");
  }

  function titleToData(title, index) {
    const left = parseFloat(title.style.left || "0");
    const top = parseFloat(title.style.top || "0");
    return {
      index: index + 1,
      name: getTitleName(title),
      x: Number(formatPathNumber(viewBox.x + (left / 100) * viewBox.width)),
      y: Number(formatPathNumber(viewBox.y + (top / 100) * viewBox.height))
    };
  }

  function refreshOutput() {
    output.value = JSON.stringify({ titles: titles.map(titleToData) }, null, 2);
    if (selected) {
      current.textContent = `Sélection : ${getTitleName(selected)}`;
    }
  }

  function selectTitle(title) {
    selected?.classList.remove("is-editor-selected");
    selected = title;
    selected.classList.add("is-editor-selected");
    refreshOutput();
  }

  function moveTitle(event) {
    if (!drag) {
      return;
    }

    const box = overlay.getBoundingClientRect();
    const x = Math.max(0, Math.min(box.width, event.clientX - box.left - drag.offsetX));
    const y = Math.max(0, Math.min(box.height, event.clientY - box.top - drag.offsetY));
    drag.title.style.left = `${(x / box.width) * 100}%`;
    drag.title.style.top = `${(y / box.height) * 100}%`;
    refreshOutput();
  }

  titles.forEach((title, index) => {
    title.dataset.editorIndex = String(index + 1);
    title.dataset.editorName = getTitleName(title);
    title.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      selectTitle(title);
      const box = overlay.getBoundingClientRect();
      const anchorX = (parseFloat(title.style.left || "0") / 100) * box.width;
      const anchorY = (parseFloat(title.style.top || "0") / 100) * box.height;
      drag = {
        title,
        offsetX: event.clientX - box.left - anchorX,
        offsetY: event.clientY - box.top - anchorY
      };
      title.setPointerCapture?.(event.pointerId);
    });
  });

  window.addEventListener("pointermove", moveTitle);
  window.addEventListener("pointerup", () => {
    drag = null;
  });

  copy?.addEventListener("click", async () => {
    output.select();
    try {
      await navigator.clipboard.writeText(output.value);
    } catch (_error) {
      document.execCommand("copy");
    }
    current.textContent = "Positions copiées.";
  });

  refreshOutput();
}

function renderFamilyTitles(host, svg) {
  if (host.querySelector(".affinity-title-overlay")) {
    return;
  }

  const viewBox = svg.viewBox.baseVal;
  if (!viewBox.width || !viewBox.height) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.className = "affinity-title-overlay";
  overlay.setAttribute("aria-hidden", "true");

  Array.from(svg.querySelectorAll(".affinity-family-title")).forEach((title) => {
    const label = cleanLabel(title.textContent || "");
    if (!label) {
      return;
    }

    const titlePosition = DESKTOP_TITLE_POSITIONS.get(getAffinityLookupKey(label));
    const titleX = titlePosition?.x ?? Number(title.getAttribute("x"));
    const titleY = titlePosition?.y ?? Number(title.getAttribute("y"));
    const xPercent = toViewBoxPercent(titleX, viewBox.x, viewBox.width);
    const item = document.createElement("span");
    item.className = "affinity-family-title-html";
    item.classList.add(getFamilyTitleSide(xPercent));
    const labelText = document.createElement("span");
    labelText.className = "affinity-family-title-text";
    labelText.textContent = label;
    item.append(labelText);
    item.style.left = `${xPercent}%`;
    item.style.top = `${toViewBoxPercent(titleY, viewBox.y, viewBox.height)}%`;
    item.style.color = title.getAttribute("fill") || "#c9a84c";
    if (getAffinityLookupKey(label).includes("AUTRES PERSONNAGES DU KROSMOZ")) {
      item.classList.add("is-krosmoz-extras-title");
    }
    overlay.append(item);
    title.classList.add("is-svg-hidden");
  });

  host.append(overlay);
  renderPersonLabels(host, svg, viewBox);
}

function getFamilyTitleSide(xPercent) {
  if (xPercent < 45) {
    return "is-left-column";
  }

  if (xPercent > 55) {
    return "is-right-column";
  }

  return "is-center-column";
}

function toViewBoxPercent(value, offset, size) {
  return ((value - offset) / size) * 100;
}

function syncAffinityOverlaySize(host, svg) {
  const box = svg.getBoundingClientRect();
  const width = `${box.width}px`;
  const height = `${box.height}px`;
  const viewBox = svg.viewBox.baseVal;
  const extraShift = window.matchMedia("(min-width: 761px)").matches && viewBox.height
    ? KROSMOZ_EXTRAS_DESKTOP_SHIFT * (box.height / viewBox.height)
    : 0;

  host.style.setProperty("--krosmoz-extras-overlay-shift", `${extraShift}px`);

  host
    .querySelectorAll(".affinity-title-overlay, .affinity-person-overlay, .affinity-hotspot-overlay, .affinity-tooltip-overlay")
    .forEach((overlay) => {
      overlay.style.width = width;
      overlay.style.height = height;
    });
}

function renderPersonLabels(host, svg, viewBox) {
  const overlay = document.createElement("div");
  overlay.className = "affinity-person-overlay";
  overlay.setAttribute("aria-hidden", "true");

  Array.from(svg.querySelectorAll("g"))
    .filter((group) => getCharacterTexts(group).length > 0)
    .flatMap((group) => Array.from(group.querySelectorAll("text")))
    .forEach((text) => {
    const size = Number(text.getAttribute("font-size") || 0);
    const label = cleanDisplayLabel(cleanLabel(text.textContent || ""), size);
    if (!label || (size !== 16 && size !== 11)) {
      return;
    }

    const item = document.createElement("span");
    item.className = size === 16 ? "affinity-person-name-html" : "affinity-person-class-html";
    item.textContent = label;
    item.style.left = `${toViewBoxPercent(Number(text.getAttribute("x")), viewBox.x, viewBox.width)}%`;
    item.style.top = `${toViewBoxPercent(Number(text.getAttribute("y")), viewBox.y, viewBox.height)}%`;
    item.style.color = text.getAttribute("fill") || "#f6f2e7";
    overlay.append(item);
  });

  host.append(overlay);
}

function renderHoverLabels(host, svg, viewBox) {
  if (host.querySelector(".affinity-hotspot-overlay") || !viewBox.width || !viewBox.height) {
    return;
  }

  const hotspotOverlay = document.createElement("div");
  hotspotOverlay.className = "affinity-hotspot-overlay";
  hotspotOverlay.setAttribute("aria-hidden", "true");

  const tooltipOverlay = document.createElement("div");
  tooltipOverlay.className = "affinity-tooltip-overlay";
  tooltipOverlay.setAttribute("aria-hidden", "true");

  getCharacterGroups(svg).forEach((group, index) => {
    const circle = getAffinityNodeCircle(group);
    const texts = getCharacterTexts(group);
    const name = cleanLabel(texts[0]?.textContent || "");
    const role = cleanDisplayLabel(cleanLabel(texts[1]?.textContent || ""), 11);
    const cx = Number(circle?.getAttribute("cx") || 0);
    const cy = Number(circle?.getAttribute("cy") || 0);
    const r = Number(circle?.getAttribute("r") || 48);

    if (!name || !cx || !cy) {
      return;
    }

    const hotspot = document.createElement("span");
    hotspot.className = "affinity-hotspot";
    hotspot.dataset.labelIndex = String(index);
    hotspot.dataset.affinityName = name;
    if (cy >= KROSMOZ_EXTRAS_START_Y) {
      hotspot.classList.add("is-krosmoz-extra");
    }
    hotspot.tabIndex = 0;
    hotspot.style.left = `${toViewBoxPercent(cx, viewBox.x, viewBox.width)}%`;
    const top = `${toViewBoxPercent(cy, viewBox.y, viewBox.height)}%`;
    hotspot.style.top = cy >= KROSMOZ_EXTRAS_START_Y
      ? `calc(${top} + var(--krosmoz-extras-overlay-shift, 0px))`
      : top;
    hotspot.style.width = `${((r * 2.55) / viewBox.width) * 100}%`;
    hotspot.style.height = `${((r * 2.55) / viewBox.height) * 100}%`;
    hotspotOverlay.append(hotspot);

    const tooltip = document.createElement("span");
    tooltip.className = "affinity-tooltip";
    tooltip.dataset.labelIndex = String(index);
    tooltip.dataset.affinityName = name;
    if (cy >= KROSMOZ_EXTRAS_START_Y) {
      tooltip.classList.add("is-krosmoz-extra");
    }
    tooltip.style.left = `${toViewBoxPercent(cx, viewBox.x, viewBox.width)}%`;
    tooltip.style.top = cy >= KROSMOZ_EXTRAS_START_Y
      ? `calc(${top} + var(--krosmoz-extras-overlay-shift, 0px))`
      : top;

    const tooltipName = document.createElement("span");
    tooltipName.className = "affinity-tooltip-name";
    tooltipName.textContent = name;
    tooltip.append(tooltipName);

    if (role) {
      const tooltipClass = document.createElement("span");
      tooltipClass.className = "affinity-tooltip-class";
      tooltipClass.textContent = role;
      tooltip.append(tooltipClass);
    }

    tooltipOverlay.append(tooltip);
  });

  host.append(hotspotOverlay, tooltipOverlay);
}

function getCharacterGroups(svg) {
  return Array.from(svg.querySelectorAll("g")).filter((group) => getAffinityNodeCircle(group) && getCharacterTexts(group).length > 0);
}

function getAffinityNodeCircle(group) {
  const circles = Array.from(group.children).filter((child) => child.tagName?.toLowerCase() === "circle");
  return circles[circles.length - 1] || null;
}

function getCharacterTexts(group) {
  return Array.from(group.querySelectorAll("text")).filter((text) => {
    const size = Number(text.getAttribute("font-size") || 0);
    return size === 16 || size === 11 || size === 13 || size === 9;
  });
}

function normalizeExtractedPortraitPaths(svg) {
  svg.querySelectorAll("image").forEach((image) => {
    const source = getAffinityImageSource(image);
    if (!source.startsWith("portraits/")) {
      return;
    }

    const pageRelativeSource = `../../assets/affinites/${source}`;
    image.setAttribute("href", pageRelativeSource);
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", pageRelativeSource);
  });
}

function repairAffinityPortraits(svg) {
  getCharacterGroups(svg).forEach((group) => {
    const texts = getCharacterTexts(group);
    let image = group.querySelector("image");
    const name = cleanLabel(texts[0]?.textContent || "");
    const icon = getAffinityIconForName(name);
    const roleText = texts[1];
    if (roleText) {
      roleText.textContent = cleanDisplayLabel(cleanLabel(roleText.textContent || ""), Number(roleText.getAttribute("font-size") || 0));
    }

    if (!name) {
      return;
    }

    if (image) {
      alignSvgPortraitToCircle(group, image);
    }

    if (!icon) {
      return;
    }

    if (!image) {
      image = createSvgPortraitImage(group, name, icon);
    }

    if (!image) {
      return;
    }

    image.dataset.affinityOriginalSrc = getAffinityImageSource(image);
    image.dataset.affinityName = name;
    image.addEventListener("error", () => markMissingSvgPortrait(image), { once: true });
    image.setAttribute("href", icon);
    image.setAttributeNS("http://www.w3.org/1999/xlink", "href", icon);
    alignSvgPortraitToCircle(group, image);
  });
}

function alignSvgPortraitToCircle(group, image) {
  const circle = getAffinityNodeCircle(group);
  if (!circle || !image) {
    return;
  }

  const cx = Number(circle.getAttribute("cx") || 0);
  const cy = Number(circle.getAttribute("cy") || 0);
  const r = Number(circle.getAttribute("r") || 48);
  if (!cx || !cy || !r) {
    return;
  }

  group.querySelectorAll("clipPath circle").forEach((clipCircle) => {
    clipCircle.setAttribute("cx", formatPathNumber(cx));
    clipCircle.setAttribute("cy", formatPathNumber(cy));
    clipCircle.setAttribute("r", formatPathNumber(r));
  });

  const clipPath = ensureSvgPortraitClipPath(group, image, cx, cy, r);
  if (clipPath?.id) {
    image.setAttribute("clip-path", `url(#${clipPath.id})`);
  }

  image.setAttribute("x", formatPathNumber(cx - r));
  image.setAttribute("y", formatPathNumber(cy - r));
  image.setAttribute("width", formatPathNumber(r * 2));
  image.setAttribute("height", formatPathNumber(r * 2));
  image.setAttribute("preserveAspectRatio", "xMidYMid slice");
}

function ensureSvgPortraitClipPath(group, image, cx, cy, r) {
  let clipPath = null;
  const clipId = image.getAttribute("clip-path")?.match(/#([^)]+)/)?.[1];
  if (clipId) {
    clipPath = group.querySelector(`#${CSS.escape(clipId)}`);
  }

  if (!clipPath) {
    clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.id = clipId || `clip-${group.dataset.affinityId || Math.random().toString(36).slice(2)}`;
    group.insertBefore(clipPath, group.firstChild);
  }

  let clipCircle = clipPath.querySelector("circle");
  if (!clipCircle) {
    clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clipPath.append(clipCircle);
  }

  clipCircle.setAttribute("cx", formatPathNumber(cx));
  clipCircle.setAttribute("cy", formatPathNumber(cy));
  clipCircle.setAttribute("r", formatPathNumber(r));
  return clipPath;
}

function createSvgPortraitImage(group, name, icon) {
  const circles = Array.from(group.children).filter((child) => child.tagName?.toLowerCase() === "circle");
  const circle = circles[circles.length - 1] || null;
  if (!circle) {
    return null;
  }

  const cx = Number(circle.getAttribute("cx") || 0);
  const cy = Number(circle.getAttribute("cy") || 0);
  const r = Number(circle.getAttribute("r") || 48);
  const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttribute("href", icon);
  image.setAttributeNS("http://www.w3.org/1999/xlink", "href", icon);
  image.setAttribute("x", String(cx - r));
  image.setAttribute("y", String(cy - r));
  image.setAttribute("width", String(r * 2));
  image.setAttribute("height", String(r * 2));
  image.setAttribute("preserveAspectRatio", "xMidYMid slice");
  const clipPath = group.querySelector('clipPath[id^="clip-"]');
  if (clipPath?.id) {
    image.setAttribute("clip-path", `url(#${clipPath.id})`);
  }

  image.dataset.affinityName = name;
  group.insertBefore(image, circle);
  return image;
}

function markMissingSvgPortrait(image) {
  image.classList.add("is-missing");
  image.removeAttribute("href");
  image.removeAttributeNS("http://www.w3.org/1999/xlink", "href");
}

function setupAffinityTree(svg, select, reset, details) {
  svg.classList.add("affinity-map");
  select.dataset.affinityMode = "svg";
  resetSelectOptions(select);

  const nodes = getCharacterGroups(svg)
    .map((group, index) => {
      const clipPath = group.querySelector('clipPath[id^="clip-"]');
      const circle = getAffinityNodeCircle(group);
      const texts = getCharacterTexts(group);
      const name = cleanLabel(texts[0]?.textContent || `Personnage ${index + 1}`);
      const role = cleanDisplayLabel(cleanLabel(texts[1]?.textContent || ""), 11);
      const id = clipPath?.id || `affinity-node-${index}-${slugify(name)}`;
      const portrait = group.querySelector("image");
      const icon = getAffinityIconForName(name, getAffinityImageSource(portrait));
      const center = {
        x: Number(circle?.getAttribute("cx") || 0),
        y: Number(circle?.getAttribute("cy") || 0)
      };

      if (portrait && icon) {
        portrait.addEventListener("error", () => markMissingSvgPortrait(portrait), { once: true });
        portrait.setAttribute("href", icon);
        portrait.setAttributeNS("http://www.w3.org/1999/xlink", "href", icon);
      }

      group.classList.add("affinity-node");
      if (center.y >= KROSMOZ_EXTRAS_START_Y) {
        group.classList.add("is-krosmoz-extra");
      }
      group.dataset.affinityId = id;
      group.dataset.affinityName = name;
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", role ? `${name}, ${role}` : name);

      return { id, name, icon, group, center, links: new Set() };
    });

  nodes.forEach((node) => registerAffinityNode(node.name, node.id, node.icon));

  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const nodesByName = createNodesByName(nodes);
  const links = Array.from(svg.querySelectorAll('path[fill="none"][stroke]'))
    .flatMap((path) => buildLinks(path, nodes))
    .filter(Boolean);

  links.forEach((link, index) => {
    link.path.classList.add("affinity-link");
    link.path.dataset.affinityLink = String(index);
    nodeById.get(link.from)?.links.add(link);
    nodeById.get(link.to)?.links.add(link);
  });

  const listedCharacters = new Set();
  nodes
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, "fr"))
    .forEach((node) => {
      const characterKey = getAffinityLookupKey(node.name);
      if (listedCharacters.has(characterKey)) {
        return;
      }
      listedCharacters.add(characterKey);
      const option = document.createElement("option");
      option.value = node.id;
      option.textContent = node.name;
      option.dataset.affinityName = node.name;
      option.dataset.affinityIcon = node.icon;
      select.append(option);
    });

  function selectNode(id, options = {}) {
    const selected = nodeById.get(id);
    if (!selected) {
      clearSelection();
      return;
    }

    const linkedNames = getLinkedNames(selected, nodeById);
    const relationTargets = getRelationTargets(selected.name, linkedNames, nodesByName);
    const related = new Set([selected.id]);
    selected.links.forEach((link) => {
      related.add(link.from);
      related.add(link.to);
    });
    relationTargets.forEach((target) => {
      target.nodes.forEach((node) => related.add(node.id));
    });

    svg.classList.add("has-selection");
    nodes.forEach((node) => {
      node.group.classList.toggle("is-active", node.id === selected.id);
      node.group.classList.toggle("is-related", related.has(node.id) && node.id !== selected.id);
      node.group.classList.toggle("is-relation-family", isRelationNode(node, relationTargets, "family"));
      node.group.classList.toggle("is-relation-friends", isRelationNode(node, relationTargets, "friends"));
      node.group.classList.toggle("is-relation-enemies", isRelationNode(node, relationTargets, "enemies"));
    });
    links.forEach((link) => {
      link.path.classList.toggle("is-active", link.from === selected.id || link.to === selected.id);
    });
    select.value = selected.id;
    syncAffinityCharacterDropdown(select);
    renderAffinityDetails(details, selected.name, linkedNames);
    if (options.scrollToDetails) {
      scrollAffinityDetailsIntoView(details);
    }
    if (options.scrollToNode) {
      requestAnimationFrame(() => scrollAffinityNodeIntoView(selected));
    }
  }

  function clearSelection() {
    svg.classList.remove("has-selection");
    nodes.forEach((node) => {
      node.group.classList.remove("is-active", "is-related", "is-relation-family", "is-relation-friends", "is-relation-enemies");
    });
    links.forEach((link) => {
      link.path.classList.remove("is-active");
    });
    select.value = "";
    syncAffinityCharacterDropdown(select);
    clearAffinityDetails(details);
  }

  nodes.forEach((node) => {
    node.group.addEventListener("click", () => selectNode(node.id, { scrollToDetails: true }));
    node.group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node.id, { scrollToDetails: true });
      }
    });
  });

  Array.from(document.querySelectorAll(".affinity-hotspot")).forEach((hotspot) => {
    const node = nodes[Number(hotspot.dataset.labelIndex)];
    if (!node) {
      return;
    }

    hotspot.addEventListener("click", () => selectNode(node.id, { scrollToDetails: true }));
    hotspot.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node.id, { scrollToDetails: true });
      }
    });
  });

  select.addEventListener("change", () => selectNode(select.value, { scrollToNode: Boolean(select.value) }));
  reset.addEventListener("click", clearSelection);

  const requestedName = getRequestedAffinityName();
  if (requestedName) {
    const requestedKey = getAffinityLookupKey(requestedName);
    const requestedNode = nodes.find((node) => getAffinityLookupKey(node.name) === requestedKey);
    if (requestedNode) {
      requestAnimationFrame(() => selectNode(requestedNode.id, { scrollToNode: true }));
    }
  }
}

function scrollAffinityDetailsIntoView(details) {
  const target = details || document.querySelector(".affinity-details") || document.querySelector(".affinities-tools");
  if (!target) {
    return;
  }

  const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const top = Math.max(0, target.getBoundingClientRect().top + currentScroll - 96);

  try {
    if (typeof window.scrollTo === "function") {
      window.scrollTo(0, top);
      return;
    }
  } catch {
    // Some embedded preview runtimes expose scrollTo but reject calls to it.
  }

  try {
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  } catch {
    target.scrollIntoView?.({ block: "start" });
  }
}

function scrollAffinityNodeIntoView(node) {
  const rect = node?.group?.getBoundingClientRect?.();
  if (!rect) {
    return;
  }

  const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const targetTop = Math.max(0, currentScroll + rect.top + (rect.height / 2) - (window.innerHeight / 2));

  try {
    node.group.focus?.({ preventScroll: true });
  } catch {
    node.group.focus?.();
  }

  try {
    if (typeof window.scrollTo === "function") {
      window.scrollTo(0, targetTop);
      return;
    }
  } catch {
    // Some embedded preview runtimes expose scrollTo but reject calls to it.
  }

  document.documentElement.scrollTop = targetTop;
  document.body.scrollTop = targetTop;
}

function getRequestedAffinityName() {
  try {
    const params = new URLSearchParams(window.location.search);
    return cleanLabel(params.get("personnage") || params.get("character") || "");
  } catch {
    return "";
  }
}

function setupFallbackAffinityDetails(host, select, reset, details) {
  select.dataset.affinityMode = "fallback";
  const names = Array.from(host.querySelectorAll(".affinity-tooltip-name, .affinity-person-name-html"))
    .map((item) => cleanLabel(item.textContent || ""))
    .filter(Boolean);

  names.forEach((name) => registerAffinityNode(name, name, getAffinityIconForName(name)));
  populateFallbackSelect(select, names);

  select.addEventListener("change", () => {
    if (select.dataset.affinityMode === "svg") {
      return;
    }
    if (!select.value) {
      clearAffinityDetails(details);
      syncAffinityCharacterDropdown(select);
      return;
    }
    syncAffinityCharacterDropdown(select);
    renderAffinityDetails(details, select.value, []);
  });
  reset.addEventListener("click", () => {
    if (select.dataset.affinityMode === "svg") {
      return;
    }
    select.value = "";
    syncAffinityCharacterDropdown(select);
    clearAffinityDetails(details);
  });
}

function setupAffinityCharacterDropdown(select) {
  const dropdown = document.querySelector(".affinities-character-dropdown");
  const toggle = dropdown?.querySelector(".affinities-character-toggle");
  const label = dropdown?.querySelector("[data-affinity-selected-label]");
  const menu = dropdown?.querySelector(".affinities-character-menu");

  if (!dropdown || !toggle || !label || !menu) {
    return;
  }

  function closeMenu() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  function openMenu() {
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    menu.removeAttribute("aria-hidden");
  }

  function updateSelectedLabel() {
    const selected = select.selectedOptions[0] || select.options[0];
    const selectedIcon = selected?.dataset.affinityIcon || "";
    let toggleIcon = toggle.querySelector(".affinities-character-toggle-icon");
    label.textContent = selected?.textContent || "Tous les personnages";
    if (selectedIcon) {
      if (!toggleIcon) {
        toggleIcon = document.createElement("span");
        toggleIcon.className = "affinities-character-toggle-icon";
        toggle.insertBefore(toggleIcon, label);
      }
      toggleIcon.replaceChildren();
      const image = document.createElement("img");
      image.src = selectedIcon;
      image.alt = "";
      image.loading = "lazy";
      image.addEventListener("error", () => {
        toggleIcon.remove();
      }, { once: true });
      toggleIcon.append(image);
    } else if (selected?.value) {
      toggleIcon?.remove();
    } else {
      if (!toggleIcon) {
        toggleIcon = document.createElement("span");
        toggleIcon.className = "affinities-character-toggle-icon";
        toggle.insertBefore(toggleIcon, label);
      }
      toggleIcon.replaceChildren(createQuestionIcon());
    }
    menu.querySelectorAll(".affinities-character-option").forEach((option) => {
      const isSelected = option.dataset.value === select.value;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  }

  function renderOptions() {
    menu.replaceChildren();
    Array.from(select.options).forEach((nativeOption) => {
      const option = document.createElement("button");
      const icon = nativeOption.dataset.affinityIcon || "";
      option.type = "button";
      option.className = "nav-menu-item affinities-character-option";
      option.setAttribute("role", "option");
      option.dataset.value = nativeOption.value;

      const iconWrap = document.createElement("span");
      iconWrap.className = "affinities-character-option-icon";
      if (icon) {
        const image = document.createElement("img");
        image.src = icon;
        image.alt = "";
        image.loading = "lazy";
        image.addEventListener("error", () => {
          image.remove();
        }, { once: true });
        iconWrap.append(image);
      } else {
        iconWrap.append(createQuestionIcon());
      }
      option.append(iconWrap);

      const text = document.createElement("span");
      text.className = "affinities-character-option-label";
      text.textContent = nativeOption.textContent;
      option.append(text);

      option.addEventListener("click", () => {
        select.value = nativeOption.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));
        closeMenu();
        option.blur();
      });
      menu.append(option);
    });
    updateSelectedLabel();
  }

  toggle.addEventListener("click", () => {
    if (dropdown.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  toggle.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
      menu.querySelector(".affinities-character-option")?.focus();
    }
  });

  menu.addEventListener("keydown", (event) => {
    const options = Array.from(menu.querySelectorAll(".affinities-character-option"));
    const currentIndex = options.indexOf(document.activeElement);

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      toggle.focus();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + direction + options.length) % options.length;
    options[nextIndex]?.focus();
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      closeMenu();
    }
  });

  select.addEventListener("change", () => {
    updateSelectedLabel();
    closeMenu();
  });
  select.addEventListener("affinity-selection-sync", updateSelectedLabel);
  new MutationObserver(renderOptions).observe(select, { childList: true });
  renderOptions();
}

function createQuestionIcon() {
  const icon = document.createElement("span");
  icon.className = "affinity-icon-question";
  icon.textContent = "?";
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function syncAffinityCharacterDropdown(select) {
  select.dispatchEvent(new Event("affinity-selection-sync"));
}

function resetSelectOptions(select) {
  Array.from(select.querySelectorAll("option:not(:first-child)")).forEach((option) => option.remove());
}

function populateFallbackSelect(select, names) {
  const existing = new Set(Array.from(select.options).map((option) => option.value));
  Array.from(new Set(names))
    .sort((left, right) => left.localeCompare(right, "fr"))
    .forEach((name) => {
      if (existing.has(name)) {
        return;
      }
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      option.dataset.affinityName = name;
      option.dataset.affinityIcon = getAffinityIconForName(name);
      select.append(option);
    });
}

function getAffinityImageSource(image) {
  if (!image) {
    return "";
  }

  return image.getAttribute("href")
    || image.getAttribute("xlink:href")
    || image.getAttributeNS("http://www.w3.org/1999/xlink", "href")
    || "";
}

function getAffinityIconForName(name, preferredIcon = "") {
  if (preferredIcon && !preferredIcon.startsWith("data:")) {
    return preferredIcon;
  }

  const specialIcons = {
    "LA DÉESSE ÉLIATROPE": "grande-deesse-eliatrope.webp",
    "DÉESSE ÉLIATROPE": "grande-deesse-eliatrope.webp",
    "GRANDE DÉESSE": "grande-deesse-eliatrope.webp",
    "PHAERIS LE PUISSANT": "phaeris.webp",
    "TRISTEPIN DE PERCEDAL": "tristepin.webp",
    "JORIS": "joris-jurgen.webp",
    "LANCE DUR": "lancedur.webp",
    "OTOMAÏ": "otomai.webp",
    "OTOMAI": "otomai.webp",
    "GRUFON": "gruffon.webp",
    "BALTAZAR": "balthazar.webp",
    "MINA": "mina.webp",
    "MÉDOROZIAM": "medoroziam.webp",
    "MÉDOROZIAM": "medoroziam.webp",
    "MEDOROZIAM": "medoroziam.webp",
    "DJAUL": "djaul.webp",
    "DAME ECHO": "echo.webp",
    "JULITH ABIGOR": "julith-abigor.webp",
    "KATAR": "katar.webp",
    "OGREST": "ogrest.webp",
    "ELAINE & ENCRE NOIR": "elaine-encre-noir.webp",
    "ELAINE &AMP; ENCRE NOIR": "elaine-encre-noir.webp",
    "ATCHANTÉ": "atcham-crepin.webp",
    "SHINONOMÉ": "shinonome.webp",
    "ELAINE &AMP;AMP; ENCRE NOIR": "elaine-encre-noir.webp",
    "UK’NOT’ALLAG": "uk-not-allag.webp",
    "DÉESSE PANDAWA": "deesse-panda.webp"
  };
  const fileName = specialIcons[cleanLabel(name).toUpperCase()] || `${slugify(name)}.webp`;
  return `../../assets/personnages/cartes/${fileName}`;
}

function renderAffinityDetails(panel, name, linkedNames) {
  if (!panel) {
    return;
  }

  const title = panel.querySelector(".affinity-details-title");
  const grid = panel.querySelector(".affinity-details-grid");
  const relations = getAffinityRelations(name, linkedNames);

  panel.hidden = false;
  if (title) {
    title.textContent = name;
  }
  if (!grid) {
    return;
  }

  grid.innerHTML = "";
  [
    ["Famille", relations.family],
    ["Amis", relations.friends],
    ["Ennemis", relations.enemies]
  ].forEach(([sectionTitle, entries]) => {
    grid.append(createRelationBlock(sectionTitle, entries, panel, getRelationType(sectionTitle)));
  });
}

function clearAffinityDetails(panel) {
  if (!panel) {
    return;
  }
  panel.hidden = true;
}

function createRelationBlock(title, entries, panel, type) {
  const block = document.createElement("article");
  block.className = "affinity-relation-block";
  block.classList.add(`is-${type}`);

  const heading = document.createElement("h3");
  heading.className = "affinity-relation-title";
  heading.textContent = title;
  block.append(heading);

  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "affinity-relation-empty";
    empty.textContent = title === "Ennemis"
      ? "Aucun ennemi renseigné pour le moment."
      : "Aucune relation renseignée pour le moment.";
    block.append(empty);
    return block;
  }

  const list = document.createElement("ul");
  list.className = "affinity-relation-list";
  entries.forEach((entry) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    label.className = "affinity-relation-label";
    label.textContent = `${entry.label} : `;

    const icons = document.createElement("span");
    icons.className = "affinity-relation-icons";
    entry.names.forEach((name) => {
      icons.append(createRelationIcon(name, panel, type));
    });

    item.append(label, icons);
    list.append(item);
  });
  block.append(list);
  return block;
}

function createRelationIcon(name, panel, type) {
  const button = document.createElement("button");
  const node = getRegisteredAffinityNode(name);
  const displayName = node?.name || name;
  const icon = node?.icon || getAffinityIconForName(displayName);

  button.type = "button";
  button.className = "affinity-relation-icon";
  button.classList.add(`is-${type}`);
  button.title = displayName;
  button.setAttribute("aria-label", `Filtrer ${displayName}`);
  button.addEventListener("click", () => selectAffinityByName(displayName, panel));

  if (icon) {
    const img = document.createElement("img");
    img.src = icon;
    img.alt = "";
    img.loading = "lazy";
    img.addEventListener("error", () => {
      img.remove();
    }, { once: true });
    button.append(img);
  }

  const hoverName = document.createElement("span");
  hoverName.className = "affinity-relation-hover-name";
  hoverName.textContent = displayName;
  button.append(hoverName);

  return button;
}

function selectAffinityByName(name, panel) {
  const select = document.querySelector("#affinity-character-select");
  if (!select) {
    renderAffinityDetails(panel, name, []);
    return;
  }

  const normalized = getAffinityLookupKey(name);
  const matchingOption = Array.from(select.options).find((option) => {
    const optionName = option.dataset.affinityName || option.textContent || option.value;
    return getAffinityLookupKey(optionName) === normalized;
  });

  if (!matchingOption) {
    renderAffinityDetails(panel, name, []);
    return;
  }

  select.value = matchingOption.value;
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

function registerAffinityNode(name, id, icon) {
  const key = normalizeRelationName(name);
  const current = AFFINITY_NODE_INDEX.get(key);
  if (!current || (!current.icon && icon)) {
    AFFINITY_NODE_INDEX.set(key, { id, name, icon });
  }
}

function getRegisteredAffinityNode(name) {
  return AFFINITY_NODE_INDEX.get(getAffinityLookupKey(name));
}

function getAffinityLookupKey(name) {
  const key = normalizeRelationName(name);
  const aliases = {
    JORIS: "JORIS JURGEN",
    "ATCHANTE": "ATCHAM CREPIN",
    LANCEDUR: "LANCE DUR"
  };
  return aliases[key] ? normalizeRelationName(aliases[key]) : key;
}

function getInitials(name) {
  return cleanLabel(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function getAffinityRelations(name, linkedNames) {
  const relation = AFFINITY_RELATIONS.get(normalizeRelationName(name));
  const family = relation ? cloneRelationEntries(relation.family) : [];
  const friends = relation ? cloneRelationEntries(relation.friends) : [];
  const enemies = relation ? cloneRelationEntries(relation.enemies) : [];

  if (!family.length && linkedNames.length) {
    family.push({ label: "Liens proches", names: linkedNames });
  }

  return { family, friends, enemies };
}

function getRelationType(title) {
  if (title === "Famille") {
    return "family";
  }
  if (title === "Amis") {
    return "friends";
  }
  return "enemies";
}

function createNodesByName(nodes) {
  const byName = new Map();
  nodes.forEach((node) => {
    const key = normalizeRelationName(node.name);
    if (!byName.has(key)) {
      byName.set(key, []);
    }
    byName.get(key).push(node);
  });
  return byName;
}

function getRelationTargets(name, linkedNames, nodesByName) {
  const relations = getAffinityRelations(name, linkedNames);
  return [
    ...getRelationTargetGroup("family", relations.family, nodesByName),
    ...getRelationTargetGroup("friends", relations.friends, nodesByName),
    ...getRelationTargetGroup("enemies", relations.enemies, nodesByName)
  ];
}

function getRelationTargetGroup(type, entries, nodesByName) {
  return entries.flatMap((entry) => entry.names.map((name) => ({
    type,
    name,
    nodes: nodesByName.get(normalizeRelationName(name)) || []
  }))).filter((target) => target.nodes.length > 0);
}

function isRelationNode(node, targets, type) {
  return targets.some((target) => target.type === type && target.nodes.some((targetNode) => targetNode.id === node.id));
}

function cloneRelationEntries(entries) {
  return entries.map((entry) => ({
    label: entry.label,
    names: entry.names.slice()
  }));
}

function getLinkedNames(selected, nodeById) {
  const names = new Set();
  selected.links.forEach((link) => {
    const otherId = link.from === selected.id ? link.to : link.from;
    const other = nodeById.get(otherId);
    if (other?.name) {
      names.add(other.name);
    }
  });
  return Array.from(names).sort((left, right) => left.localeCompare(right, "fr"));
}

const AFFINITY_RELATIONS = createAffinityRelations();

function createAffinityRelations() {
  const relations = new Map();

  function ensure(name) {
    const key = normalizeRelationName(name);
    if (!relations.has(key)) {
      relations.set(key, { family: [], friends: [], enemies: [] });
    }
    return relations.get(key);
  }

  function add(name, section, label, names) {
    const bucket = ensure(name)[section];
    const values = Array.isArray(names) ? names : [names];
    const existing = bucket.find((entry) => entry.label === label);
    if (existing) {
      values.forEach((value) => addUnique(existing.names, value));
      return;
    }
    bucket.push({ label, names: values.filter(Boolean) });
  }

  function familyRelation(left, leftLabel, right, rightLabel) {
    add(left, "family", leftLabel, right);
    add(right, "family", rightLabel, left);
  }

  function parent(parentName, childNames, parentLabel) {
    childNames.forEach((childName) => {
      add(parentName, "family", "Enfants", childName);
      add(childName, "family", parentLabel, parentName);
    });
  }

  function siblings(names, label = "Frères et soeurs") {
    names.forEach((name) => {
      add(name, "family", label, names.filter((other) => other !== name));
    });
  }

  function couple(left, right) {
    add(left, "family", "Couple", right);
    add(right, "family", "Couple", left);
  }

  function friendship(name, friends) {
    friends.forEach((friend) => {
      add(name, "friends", "Amis", friend);
      add(friend, "friends", "Amis", name);
    });
  }

  function enemy(name, enemies) {
    enemies.forEach((foe) => {
      add(name, "enemies", "Ennemis", foe);
      add(foe, "enemies", "Ennemis", name);
    });
  }

  function friendshipMany(name, friends) {
    const normalizedName = normalizeRelationName(name);
    friendship(name, friends.filter((friend) => normalizeRelationName(friend) !== normalizedName));
  }

  function friendshipGroup(names) {
    names.forEach((name, index) => {
      friendship(name, names.slice(index + 1));
    });
  }

  function remove(name, section, label, names) {
    const relation = relations.get(normalizeRelationName(name));
    if (!relation) {
      return;
    }
    const values = Array.isArray(names) ? names : [names];
    const normalizedValues = new Set(values.map((value) => normalizeRelationName(value)));
    relation[section].forEach((entry) => {
      if (entry.label === label) {
        entry.names = entry.names.filter((value) => !normalizedValues.has(normalizeRelationName(value)));
      }
    });
    relation[section] = relation[section].filter((entry) => entry.names.length);
  }

  function removeEnemy(name, enemies) {
    enemies.forEach((foe) => {
      remove(name, "enemies", "Ennemis", foe);
      remove(foe, "enemies", "Ennemis", name);
    });
  }

  function removeFriend(name, friends) {
    friends.forEach((friend) => {
      remove(name, "friends", "Amis", friend);
      remove(friend, "friends", "Amis", name);
    });
  }

  function clearBidirectional(name, section, label) {
    const relation = relations.get(normalizeRelationName(name));
    if (!relation) {
      return;
    }

    const linkedNames = relation[section]
      .filter((entry) => entry.label === label)
      .flatMap((entry) => entry.names);

    linkedNames.forEach((linkedName) => remove(linkedName, section, label, name));
    relation[section] = relation[section].filter((entry) => entry.label !== label);
  }

  function replaceEnemies(name, enemies) {
    clearBidirectional(name, "enemies", "Ennemis");
    enemy(name, enemies);
  }

  function enemiesEachOther(names) {
    names.forEach((name, index) => {
      enemy(name, names.slice(index + 1));
    });
  }

  function identity(left, right) {
    add(left, "family", "Autre identité", right);
    add(right, "family", "Autre identité", left);
  }

  function alias(source, aliasName) {
    const sourceRelation = relations.get(normalizeRelationName(source));
    if (!sourceRelation) {
      return;
    }
    relations.set(normalizeRelationName(aliasName), {
      family: cloneRelationEntries(sourceRelation.family),
      friends: cloneRelationEntries(sourceRelation.friends),
      enemies: cloneRelationEntries(sourceRelation.enemies)
    });
  }

  const éliatropes = ["YUGO", "CHIBI", "QILBY", "NORA", "MINA", "GLIP", "BALTAZAR"];
  const eliatropeDragons = ["ADAMAÏ", "GROUGALORAGRAN", "SHINONOMÉ", "EFRIM", "PHAERIS LE PUISSANT"];
  const eliatropeChildren = éliatropes.concat(eliatropeDragons);
  parent("LA DÉESSE ÉLIATROPE", eliatropeChildren, "Mère");
  parent("GRAND DRAGON", eliatropeChildren, "Père");
  siblings(eliatropeChildren);

  const primordialDragons = ["AERAFAL", "AGUABRIAL", "DARDONDAKAL", "GROUGALORASALAR", "IGNEMIKHAL", "TERRAKOURIAL"];
  siblings(primordialDragons);
  friendship("AGUABRIAL", éliatropes);
  friendship("GROUGALORASALAR", ["JULITH ABIGOR", "JORIS JURGEN"]);
  enemy("GROUGALORASALAR", ["AMALIA SHERAN SHARM", "ADAMAI"]);
  friendship("DARDONDAKAL", ["JORIS JURGEN"]);
  friendship("IGNEMIKHAL", ["GOULTARD"]);

  const éliotropes = ["OROPO", "ATONE", "BOUILLON", "DESPERIA", "RIPULSE", "SIDAIRE"];
  siblings(éliotropes);

  const demons = ["RUSHU", "MÉDOROZIAM", "RASHA"];
  const shushu = ["DJAUL", "ANATHAR", "OMBRAGE", "RUBILAX", "GRUFON", "LUIS", "UK’NOT’ALLAG"];
  const gods = [
    "DIEU ÉCAFLIP",
    "DIEU ENUTROF",
    "DIEU IOP",
    "DIEU OSAMODAS",
    "DIEU OUGINAK",
    "DIEU SADIDA",
    "DIEU SRAM",
    "DIEU XÉLOR",
    "DÉESSE CRA",
    "DÉESSE ENIRIPSA",
    "DÉESSE FÉCA",
    "DÉESSE PANDA",
    "DÉESSE SACRIEUR"
  ];
  const godsExceptIop = gods.filter((god) => god !== "DIEU IOP");

  siblings(demons);
  enemiesEachOther(demons);
  add("RUSHU", "family", "Shushu", shushu);
  shushu.forEach((name) => add(name, "family", "Famille de", "RUSHU"));
  gods.forEach((god, index) => friendship(god, gods.slice(index + 1)));
  gods.forEach((god) => enemy(god, demons.concat(shushu)));
  gods.forEach((god) => enemy(god, ["CORNU MOLLU"]));

  enemy("ORGONAX", éliatropes.filter((name) => name !== "QILBY"));
  enemy("ORGONAX", ["SHINONOMÉ"]);
  friendship("QILBY", ["ORGONAX", "LOKUS"]);
  enemy("CHIBI", éliotropes);
  enemy("GROUGALORAGRAN", ["OROPO"].concat(éliotropes));
  enemy("NORA", ["TOROSS MORDAL", "ROTALSTROM"]);
  enemy("LA DÉESSE ÉLIATROPE", ["LOKUS"]);
  enemy("EFRIM", ["LA DÉESSE ÉLIATROPE", "NORA", "QILBY"]);
  friendship("EFRIM", ["TOROSS MORDAL", "ROTALSTROM"]);
  enemy("PHAERIS LE PUISSANT", ["JIVA", "RUSHU", "PRINCE ADALE", "FRIDA MOFETTE", "QILBY", "ANATHAR"]);
  enemy("QILBY", eliatropeChildren.filter((name) => name !== "QILBY" && name !== "SHINONOMÉ"));
  enemy("ARTY", ["CORNU MOLLU"]);
  enemy("GOULTARD", ["CORNU MOLLU"]);

  couple("LA DÉESSE ÉLIATROPE", "GRAND DRAGON");
  enemy("LA DÉESSE ÉLIATROPE", godsExceptIop.concat(["TOROSS MORDAL", "ROTALSTROM"]));
  enemy("GRAND DRAGON", godsExceptIop);

  parent("DIEU OSAMODAS", ["COQUELINE"], "Père");
  parent("DIEU ÉCAFLIP", ["ATCHAM CRÉPIN", "USH GALESH", "KÉRUBIM CRÉPIN"], "Père");
  parent("DIEU SADIDA", ["DATHURA", "CORNU MOLLU"], "Père");
  parent("DIEU SRAM", ["TOXINE"], "Père");
  parent("DÉESSE SACRIEUR", ["KALI"], "Mère");
  parent("DÉESSE PANDA", ["POO"], "Mère");
  parent("DÉESSE FÉCA", ["OTOMAÏ", "BUMP"], "Mère");
  parent("DIEU XÉLOR", ["COMTE HAREBOURG"], "Père");
  add("DIEU XÉLOR", "family", "A confié le mois de Javian", "JIVA");
  add("JIVA", "family", "Protectrice du mois de Javian", "DIEU XÉLOR");
  parent("DIEU IOP", ["CORNU MOLLU", "GOULTARD"], "Père");

  add("OTOMAÏ", "family", "Enfant créé", "OGREST");
  add("OGREST", "family", "Créateur et père adoptif", "OTOMAÏ");
  add("NOX", "family", "Serviteur", "IGOLE");
  add("IGOLE", "family", "Maître", "NOX");
  add("NOX", "family", "Création", "RAZORTEMPS");
  add("RAZORTEMPS", "family", "Créateur", "NOX");

  identity("TRISTEPIN DE PERCEDAL", "DIEU IOP");
  identity("DARK VLAD", "GOULTARD");

  couple("LOU", "KÉRUBIM CRÉPIN");
  couple("MIRANDA", "KABROK");
  identity("KABROK", "CORBEAU NOIR");
  couple("MAUDE", "KRISS LA KRASS");
  couple("TRISTEPIN DE PERCEDAL", "ÉVANGELYNE");
  add("TRISTEPIN DE PERCEDAL", "family", "Fils d'une autre union", "GOULTARD");
  add("GOULTARD", "family", "Père", "TRISTEPIN DE PERCEDAL");
  parent("TRISTEPIN DE PERCEDAL", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"], "Père");
  parent("ÉVANGELYNE", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"], "Mère");
  siblings(["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"]);
  parent("MADAGASKAN", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"], "Grand-père");
  add("CLÉOPHÉE", "family", "Neveux et nièce", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"]);
  ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"].forEach((name) => add(name, "family", "Tante", "CLÉOPHÉE"));
  familyRelation("YREHN", "Soeur", "NIMODA", "Soeur");

  parent("ROI SHERAN SHARM", ["AMALIA SHERAN SHARM", "ARMANT SHERAN SHARM"], "Père");
  siblings(["AMALIA SHERAN SHARM", "ARMANT SHERAN SHARM"]);
  couple("YUGO", "AMALIA SHERAN SHARM");
  add("YUGO", "family", "Belle-famille", ["ROI SHERAN SHARM", "ARMANT SHERAN SHARM"]);
  add("AMALIA SHERAN SHARM", "family", "Belle-famille", ["LA DÉESSE ÉLIATROPE", "GRAND DRAGON"].concat(eliatropeChildren.filter((name) => name !== "YUGO")));
  add("AMALIA SHERAN SHARM", "family", "Beaux-frères et belles-soeurs", eliatropeChildren.filter((name) => name !== "YUGO"));
  eliatropeChildren.filter((name) => name !== "YUGO").forEach((name) => add(name, "family", "Belle-sœur", "AMALIA SHERAN SHARM"));
  couple("ARMANT SHERAN SHARM", "AURORA");
  friendship("AMALIA SHERAN SHARM", ["MOON"]);
  familyRelation("JAHASH JURGEN", "Soeur", "BAKARA JURGEN", "Frère");
  couple("JAHASH JURGEN", "JULITH ABIGOR");
  familyRelation("JAHASH JURGEN", "Fils", "JORIS JURGEN", "Père");
  familyRelation("JULITH ABIGOR", "Fils", "JORIS JURGEN", "Mère");
  couple("BISTE", "MOUCHE");
  couple("POO", "KALI");
  const yugoFriends = [
    "TRISTEPIN DE PERCEDAL",
    "ÉVANGÉLYNE",
    "RUBILAX",
    "RUEL STROUD",
    "AMALIA SHERAN SHARM",
    "XAV LE BOULANGER",
    "GOULTARD",
    "FLOPIN DE PERCEDAL",
    "ELELY DE PERCEDAL",
    "PIN DE PERCEDAL",
    "KÉRUBIM CRÉPIN",
    "JORIS",
    "ATCHAM CRÉPIN",
    "GRUFON",
    "ROI SHERAN SHARM",
    "ARMANT SHERAN SHARM",
    "CLÉOPHÉE",
    "KRISS LA KRASS",
    "MAUDE",
    "CORBEAU NOIR",
    "MIRANDA"
  ];
  friendship("YUGO", yugoFriends);
  familyRelation("YUGO", "Père adoptif", "ALIBERT", "Fils adoptif");
  friendship("KÉRUBIM CRÉPIN", ["JORIS", "ATCHANTÉ"]);

  const yugoEnemies = [
    "NOX",
    "QILBY",
    "OROPO",
    "TOROSS MORDAL",
    "EFRIM",
    "ROTALSTROM",
    "REMINGTON SMISSE",
    "GRANY SMISSE",
    "ANATHAR",
    "ROI OSAMODAS",
    "AURORA",
    "RASHA",
    "RUSHU",
    "OMBRAGE",
    "VAMPYRO",
    "COMTE HAREBOURG",
    "AERAFAL",
    "TERRAKOURIAL",
    "IGNEMIKHAL",
    "DARDONDAKAL",
    "GROUGALORASALAR",
    "RAZORTEMPS",
    "PRINCE DE BRAKMAR",
    "IGOLE",
    "BELLAPHONE"
  ];
  enemy("YUGO", yugoEnemies);
  enemy("YUGO", éliotropes);
  const tofuBrotherhood = [
    "TRISTEPIN DE PERCEDAL",
    "ÉVANGÉLYNE",
    "RUBILAX",
    "RUEL STROUD",
    "AMALIA SHERAN SHARM",
    "ADAMAÏ",
    "GOULTARD",
    "KÉRUBIM CRÉPIN",
    "JORIS",
    "ATCHAM CRÉPIN",
    "GRUFON"
  ];
  const percedalChildren = ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"];
  const percedalFamily = ["TRISTEPIN DE PERCEDAL", "ÉVANGELYNE"].concat(percedalChildren);
  const extendedTofuFriends = [
    "AMALIA SHERAN SHARM",
    "ARMANT SHERAN SHARM",
    "ROI SHERAN SHARM",
    "KÉRUBIM CRÉPIN",
    "ATCHAM CRÉPIN",
    "JORIS",
    "GRUFON",
    "RUEL STROUD",
    "MOUMOUNE STROUD",
    "CORBEAU NOIR",
    "KRISS LA KRASS",
    "MAUDE",
    "DRAGON COCHON",
    "XAV LE BOULANGER",
    "ELAINE & ENCRE NOIR",
    "PRINCE ADALE",
    "FRIDA MOFETTE",
    "CHENE MOU",
    "BORDEGANN",
    "CHEVALIER JUSTICE"
  ];
  tofuBrotherhood.forEach((name) => friendshipMany(name, extendedTofuFriends.concat(["MOUMOUNE STROUD"])));
  friendshipMany("GOULTARD", tofuBrotherhood.concat(percedalFamily, ["NORA", "JORIS", "RUBILAX", "ARMANT SHERAN SHARM"]));
  percedalChildren.forEach((name) => friendshipMany(name, tofuBrotherhood.concat(["GOULTARD", "NORA", "RUBILAX", "JORIS", "KÉRUBIM CRÉPIN", "ATCHAM CRÉPIN"])));
  friendship("ELELY DE PERCEDAL", ["COQUELINE"]);
  friendshipMany("KÉRUBIM CRÉPIN", tofuBrotherhood.concat(percedalFamily, [
    "GOULTARD",
    "RUBILAX",
    "INDIE DELAGRANDAVENTURE",
    "KHAN KARKASS",
    "BAKARA JURGEN",
    "JAHASH JURGEN",
    "LUIS"
  ]));
  siblings(["KÉRUBIM CRÉPIN", "USH GALESH", "ATCHAM CRÉPIN"], "Frères");
  add("KÉRUBIM CRÉPIN", "family", "Fils adoptif", "JORIS");
  add("JORIS", "family", "Père adoptif", "KÉRUBIM CRÉPIN");
  friendshipMany("RUBILAX", tofuBrotherhood.concat(["GOULTARD"], percedalChildren));
  const forgottenBrotherhood = [
    "ATONE",
    "BOUILLON",
    "DESPERIA",
    "RIPULSE",
    "SIDAIRE",
    "DATHURA",
    "DARK VLAD",
    "COQUELINE",
    "BUMP",
    "ARPAGONE",
    "TOXINE",
    "KALI",
    "POO",
    "COMTE HAREBOURG",
    "SIPHO",
    "USH GALESH"
  ];
  tofuBrotherhood.concat(percedalChildren).forEach((name) => enemy(name, yugoEnemies));
  tofuBrotherhood.forEach((name) => enemy(name, ["MONSIEUR M"]));
  enemy("OROPO", forgottenBrotherhood);
  enemy("GOULTARD", ["KATAR"]);
  enemy("DARK VLAD", ["KATAR"]);
  removeEnemy("EFRIM", ["ATCHAM CRÉPIN", "KÉRUBIM CRÉPIN", "GRUFON"]);
  removeEnemy("NORA", ["QILBY"]);
  removeEnemy("KÉRUBIM CRÉPIN", ["NOX", "QILBY", "OROPO", "AURORA", "ROI OSAMODAS", "VAMPYRO", "OMBRAGE", "RASHA", "AERAFAL", "TERRAKOURIAL", "IGNEMIKHAL", "DARDONDAKAL", "GROUGALORASALAR", "RAZORTEMPS", "IGOLE", "BELLAPHONE", "PRINCE DE BRAKMAR"]);
  enemy("KÉRUBIM CRÉPIN", ["JULITH ABIGOR", "CIRE MOMORE"]);
  friendship("ADAMAÏ", yugoFriends.concat([
    "LANCEDUR",
    "ECHO",
    "DATHURA",
    "USH GALESH",
    "COQUELINE",
    "BUMP",
    "ARPAGONE",
    "KALI",
    "POO",
    "SIPHO"
  ]));
  enemy("ADAMAÏ", [
    "NOX",
    "OROPO",
    "QILBY",
    "RUSHU",
    "EFRIM",
    "ANATHAR",
    "TOXINE",
    "TOROSS MORDAL",
    "ROTALSTROM",
    "RAZORTEMPS",
    "PRINCE DE BRAKMAR",
    "IGOLE",
    "BELLAPHONE"
  ]);
  enemy("KARN", ["ÉLANTE", "YREHN"]);
  friendship("KARN", ["NIMODA"]);
  couple("LANCE DUR", "BELLADONE");
  parent("LANCE DUR", ["AGARD"], "Père");
  parent("BELLADONE", ["AGARD"], "Mère");
  friendship("LANCE DUR", ["ADAMAÏ"]);
  enemy("LANCE DUR", ["TOROSS MORDAL", "ROTALSTROM", "CIRE MOMORE"]);
  enemy("CIRE MOMORE", ["BISTE", "CADENCE", "CHAILLE", "MOUCHE"]);
  friendshipGroup(["BISTE", "CADENCE", "CHAILLE", "LANCE DUR", "MOUCHE"]);
  enemy("RUSHU", ["GOULTARD", "TRISTEPIN DE PERCEDAL", "QILBY"]);
  enemy("OGREST", ["YUGO", "TRISTEPIN DE PERCEDAL", "ÉVANGELYNE"]);
  enemy("REINES DE BONTA", ["YUGO", "PRINCE DE BRAKMAR"]);

  const percedalEnemiesToRemove = ["BELLAPHONE", "IGOLE", "NOX", "QILBY", "REMINGTON SMISSE", "GRANY SMISSE", "AURORA", "ROI OSAMODAS"];
  const percedalCloseFriendsToRemove = ["KÉRUBIM CRÉPIN", "JORIS JURGEN", "JORIS", "GRUFON", "ATCHAM CRÉPIN", "NORA"];
  const tofuExtendedFriendsToRemove = [
    "CHEVALIER JUSTICE",
    "FRIDA MOFETTE",
    "CHENE MOU",
    "BORDEGANN",
    "ELAINE & ENCRE NOIR",
    "MAUDE",
    "KRISS LA KRASS",
    "CORBEAU NOIR",
    "MOUMOUNE STROUD",
    "GRUFON",
    "ATCHAM CRÉPIN"
  ];
  const goultardFriendsToRemove = tofuExtendedFriendsToRemove.concat([
    "DRAGON COCHON",
    "XAV LE BOULANGER",
    "PRINCE ADALE",
    "ELELY DE PERCEDAL",
    "FLOPIN DE PERCEDAL",
    "PIN DE PERCEDAL",
    "TRISTEPIN DE PERCEDAL",
    "ÉVANGÉLYNE"
  ]);
  const primordialEnemyCleanup = [
    "ÉVANGÉLYNE",
    "AMALIA SHERAN SHARM",
    "GOULTARD",
    "JORIS JURGEN",
    "JORIS",
    "ATCHAM CRÉPIN",
    "GRUFON",
    "ELELY DE PERCEDAL",
    "FLOPIN DE PERCEDAL",
    "PIN DE PERCEDAL"
  ];
  const kerubimAtchamFriendCleanup = tofuExtendedFriendsToRemove.concat(["ATCHANTÉ"]);
  const ushFriends = forgottenBrotherhood.filter((name) => !["ATONE", "BOUILLON", "DESPERIA", "RIPULSE", "SIDAIRE", "BUMP", "USH GALESH"].includes(name));

  friendship("OTOMAÏ", ["GROUGALORAGRAN", "TRISTEPIN DE PERCEDAL", "RUEL STROUD", "ÉVANGÉLYNE", "AMALIA SHERAN SHARM"]);
  removeEnemy("QILBY", ["GRUFON", "ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL", "JORIS", "JORIS JURGEN"]);
  enemy("QILBY", ["TOROSS MORDAL", "ANATHAR", "ROTALSTROM"]);
  removeEnemy("RUBILAX", gods);

  primordialDragons.forEach((dragon) => removeEnemy(dragon, primordialEnemyCleanup));
  friendship("OGREST", primordialDragons);
  siblings(["ARTY"].concat(primordialDragons));
  friendship("ARTY", ["GOULTARD"]);
  familyRelation("LOKUS", "Frère", "ORGONAX", "Frère");
  gods.forEach((god) => enemy(god, ["LA DÉESSE ÉLIATROPE", "GRAND DRAGON"]));

  removeFriend("TRISTEPIN DE PERCEDAL", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL", "GOULTARD"]);
  removeFriend("ÉVANGÉLYNE", ["ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL", "GOULTARD"]);
  add("ÉVANGÉLYNE", "family", "Beau-fils", "GOULTARD");
  add("GOULTARD", "family", "Belle-famille", ["ÉVANGÉLYNE", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL", "ELELY DE PERCEDAL"]);
  percedalChildren.forEach((name) => add(name, "family", "Demi-frère", "GOULTARD"));
  add("GOULTARD", "family", "Demi-frères et sœur", percedalChildren);
  removeFriend("GOULTARD", goultardFriendsToRemove);
  removeEnemy("GOULTARD", primordialDragons.concat(["MONSIEUR M", "RAZORTEMPS", "COMTE HAREBOURG", "VAMPYRO", "AURORA", "ROI OSAMODAS", "REMINGTON SMISSE", "GRANY SMISSE", "NOX", "BELLAPHONE"]));
  enemy("GOULTARD", ["KARN"]);
  enemy("MÉDOROZIAM", ["DARK VLAD", "KATAR"]);

  percedalChildren.forEach((name) => removeEnemy(name, percedalEnemiesToRemove));
  enemy("ELELY DE PERCEDAL", ["TOXINE", "SIPHO", "POO", "USH GALESH"]);
  enemy("FLOPIN DE PERCEDAL", ["TOXINE", "SIPHO", "POO"]);
  replaceEnemies("PIN DE PERCEDAL", ["RASHA"]);
  removeFriend("PIN DE PERCEDAL", percedalCloseFriendsToRemove);

  ["KÉRUBIM CRÉPIN", "ATCHAM CRÉPIN"].forEach((name) => {
    removeFriend(name, kerubimAtchamFriendCleanup);
    friendship(name, ["LILOTTE"]);
  });
  ["KÉRUBIM CRÉPIN", "ATCHAM CRÉPIN", "JORIS JURGEN"].forEach((name) => removeEnemy(name, ["MONSIEUR M"]));
  enemy("KÉRUBIM CRÉPIN", ["MASKEMANE", "PERCIMOL"]);
  ["ATCHAM CRÉPIN", "JORIS JURGEN"].forEach((name) => enemy(name, ["MASKEMANE", "PERCIMOL", "REMINGTON SMISSE", "GRANY SMISSE"]));
  friendship("USH GALESH", ["MASKEMANE", "PERCIMOL", "REMINGTON SMISSE", "GRANY SMISSE"]);
  friendship("LOU", ["LILOTTE", "LUIS", "INDIE DELAGRANDAVENTURE"]);
  replaceEnemies("ATCHAM CRÉPIN", ["COMTE HAREBOURG", "JULITH ABIGOR", "MASKEMANE", "PERCIMOL"]);
  friendship("USH GALESH", ushFriends);

  removeEnemy("RASHA", ["JORIS", "JORIS JURGEN", "GRUFON", "ATCHAM CRÉPIN"]);
  removeEnemy("ANATHAR", ["PIN DE PERCEDAL", "FLOPIN DE PERCEDAL", "ELELY DE PERCEDAL", "JORIS", "JORIS JURGEN", "KÉRUBIM CRÉPIN", "GOULTARD"]);
  enemy("ANATHAR", ["REMINGTON SMISSE", "GRANY SMISSE"]);
  enemy("DJAUL", ["JIVA"]);

  éliotropes.forEach((name) => add(name, "family", "Père créateur", "YUGO"));
  add("YUGO", "family", "Créations", éliotropes);
  familyRelation("ADAMAÏ", "Frère de substitution", "OROPO", "Frère de substitution");
  couple("OROPO", "DAME ECHO");
  removeEnemy("OROPO", éliotropes);

  couple("BAKARA JURGEN", "KHAN KARKASS");
  enemy("JULITH ABIGOR", ["BAKARA JURGEN", "KHAN KARKASS", "ATCHAM CRÉPIN", "DARDONDAKAL"]);
  friendship("JORIS JURGEN", ["YUGO", "ADAMAÏ", "AMALIA SHERAN SHARM", "ROI SHERAN SHARM", "ARMANT SHERAN SHARM", "REINES DE BONTA", "PRINCE DE BRAKMAR", "TRISTEPIN DE PERCEDAL", "ÉVANGÉLYNE", "GOULTARD", "ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"]);
  familyRelation("JORIS JURGEN", "Père adoptif", "ATCHAM CRÉPIN", "Fils adoptif");
  familyRelation("JORIS JURGEN", "Père adoptif", "KÉRUBIM CRÉPIN", "Fils adoptif");
  familyRelation("KÉRUBIM CRÉPIN", "Père adoptif", "JORIS JURGEN", "Fils adoptif");
  replaceEnemies("JORIS JURGEN", ["RAZORTEMPS", "NOX", "OGREST", "COMTE HAREBOURG", "MASKEMANE", "PERCIMOL", "REMINGTON SMISSE", "GRANY SMISSE", "TOROSS MORDAL", "ROTALSTROM"]);
  enemy("ROI SHERAN SHARM", ["NOX", "RAZORTEMPS", "QILBY", "OGREST"]);
  clearBidirectional("IGOLE", "enemies", "Ennemis");
  clearBidirectional("IGOLE", "friends", "Amis");

  clearBidirectional("GRUFON", "enemies", "Ennemis");
  enemy("GRUFON", ["RUSHU"]);
  clearBidirectional("GRUFON", "friends", "Amis");
  friendship("GRUFON", ["YUGO", "ADAMAÏ", "RUEL STROUD", "TRISTEPIN DE PERCEDAL", "ÉVANGELYNE"]);

  clearBidirectional("DRAGON COCHON", "friends", "Amis");
  friendship("DRAGON COCHON", ["TRISTEPIN DE PERCEDAL"]);

  removeEnemy("OGREST", ["JORIS", "JORIS JURGEN", "ÉVANGELYNE", "ROI SHERAN SHARM"]);

  remove("JORIS JURGEN", "family", "Père adoptif", ["ATCHAM CRÉPIN"]);
  remove("ATCHAM CRÉPIN", "family", "Fils adoptif", ["JORIS JURGEN"]);
  remove("JORIS JURGEN", "family", "Fils adoptif", ["KÉRUBIM CRÉPIN"]);
  add("JORIS JURGEN", "family", "Fils adoptifs", ["ATCHAM CRÉPIN", "KÉRUBIM CRÉPIN"]);
  add("ATCHAM CRÉPIN", "family", "Père adoptif", "JORIS JURGEN");
  add("KÉRUBIM CRÉPIN", "family", "Père adoptif", "JORIS JURGEN");
  add("JORIS JURGEN", "family", "Père adoptif", "KÉRUBIM CRÉPIN");
  add("KÉRUBIM CRÉPIN", "family", "Fils adoptif", "JORIS JURGEN");

  clearBidirectional("DARK VLAD", "friends", "Amis");
  add("DARK VLAD", "family", "Pères", ["DIEU IOP", "TRISTEPIN DE PERCEDAL"]);
  add("DIEU IOP", "family", "Fils", "DARK VLAD");
  add("TRISTEPIN DE PERCEDAL", "family", "Fils", "DARK VLAD");

  friendship("OMBRAGE", ["VAMPYRO"]);
  removeEnemy("OMBRAGE", ["ADAMAÏ", "GOULTARD", "GRUFON", "ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL"]);

  const forgottenFamilyFriends = ["DAME ECHO", "DATHURA", "COQUELINE", "BUMP", "ARPAGONE", "KALI", "SIPHO", "POO", "COMTE HAREBOURG", "USH GALESH"];
  friendshipGroup(forgottenFamilyFriends);
  friendship("DAME ECHO", forgottenBrotherhood.filter((name) => name !== "TOXINE" && name !== "DAME ECHO"));
  clearBidirectional("TOXINE", "friends", "Amis");
  removeEnemy("TOXINE", ["ELELY DE PERCEDAL"]);
  enemy("TOXINE", ["DAME ECHO"]);
  replaceEnemies("DAME ECHO", gods);
  gods.forEach((god) => remove(god, "enemies", "Ennemis", "DAME ECHO"));
  enemy("DAME ECHO", ["TOXINE", "RIPULSE"]);
  removeFriend("DAME ECHO", ["RIPULSE"]);
  enemy("OROPO", ["RIPULSE"]);
  parent("DÉESSE ENIRIPSA", ["DAME ECHO"], "Mère");

  enemy("CIRE MOMORE", ["AGARD", "BISTE", "CADENCE", "CHAILLE", "MOUCHE", "ADAMAÏ"]);

  familyRelation("ROI OSAMODAS", "Fille", "AURORA", "Père");
  familyRelation("ROI OSAMODAS", "Beau-fils", "ARMANT SHERAN SHARM", "Beau-père");
  replaceEnemies("ROI OSAMODAS", ["TOROSS MORDAL", "ROTALSTROM", "YUGO", "AMALIA SHERAN SHARM"]);

  add("AURORA", "family", "Belle-sœur", "AMALIA SHERAN SHARM");
  add("AMALIA SHERAN SHARM", "family", "Belle-sœur", "AURORA");
  add("AURORA", "family", "Beau-père", "ROI SHERAN SHARM");
  add("ROI SHERAN SHARM", "family", "Belle-fille", "AURORA");
  friendship("AURORA", ["REINES DE BONTA"]);
  replaceEnemies("AURORA", ["YUGO", "AMALIA SHERAN SHARM", "TOROSS MORDAL", "ROTALSTROM"]);

  replaceEnemies("ARMANT SHERAN SHARM", ["NOX", "RAZORTEMPS", "OGREST", "QILBY", "TOROSS MORDAL", "ROTALSTROM"]);
  add("ARMANT SHERAN SHARM", "family", "Beau-père", "ROI OSAMODAS");
  add("ROI OSAMODAS", "family", "Beau-fils", "ARMANT SHERAN SHARM");
  removeFriend("ARMANT SHERAN SHARM", ["JORIS"]);
  friendship("ARMANT SHERAN SHARM", ["JORIS JURGEN"]);

  friendship("LUIS", ["JORIS JURGEN", "ATCHAM CRÉPIN"]);
  enemy("LUIS", ["JULITH ABIGOR"]);

  friendship("DÉESSE CRA", ["ÉVANGELYNE", "TRISTEPIN DE PERCEDAL", "PIN DE PERCEDAL"]);
  friendship("DIEU ENUTROF", ["RUEL STROUD", "ÉVANGELYNE", "TRISTEPIN DE PERCEDAL"]);
  familyRelation("ÉLANTE", "Lien fusionnel", "YREHN", "Lien fusionnel");
  friendship("MIRANDA", ["GRUFON", "ÉVANGELYNE", "AMALIA SHERAN SHARM", "RUEL STROUD"]);
  friendship("CORBEAU NOIR", ["GRUFON"]);
  friendship("KABROK", ["TRISTEPIN DE PERCEDAL", "ÉVANGELYNE", "AMALIA SHERAN SHARM", "RUEL STROUD", "ADAMAÏ", "YUGO"]);
  add("MADAGASKAN", "family", "Beau-fils", "TRISTEPIN DE PERCEDAL");
  add("TRISTEPIN DE PERCEDAL", "family", "Beau-père", "MADAGASKAN");

  add("ALIBERT", "family", "Fils adoptifs", ["CHIBI", "GROUGALORAGRAN"]);
  add("CHIBI", "family", "Père adoptif", "ALIBERT");
  add("GROUGALORAGRAN", "family", "Père adoptif", "ALIBERT");
  friendship("ALIBERT", ["RUEL STROUD", "TRISTEPIN DE PERCEDAL", "ADAMAÏ", "ÉVANGELYNE", "AMALIA SHERAN SHARM", "ROI SHERAN SHARM", "ELELY DE PERCEDAL", "FLOPIN DE PERCEDAL", "PIN DE PERCEDAL"]);
  enemy("ALIBERT", ["NOX"]);

  familyRelation("RUEL STROUD", "Famille", "MOUMOUNE STROUD", "Famille");
  enemy("LES MISS MOCHES", ["TRISTEPIN DE PERCEDAL", "RUEL STROUD", "ÉVANGELYNE", "AMALIA SHERAN SHARM", "YUGO"]);
  enemy("DRAGON COCHON", ["YUGO", "RUEL STROUD", "AMALIA SHERAN SHARM", "ÉVANGELYNE"]);
  friendship("PANDIEGO DE LA VEGA", ["AMALIA SHERAN SHARM", "RUEL STROUD", "ÉVANGELYNE", "TRISTEPIN DE PERCEDAL", "YUGO"]);
  add("DJAUL", "family", "Création", "BOLGROT");
  add("AGUABRIAL", "family", "Création", "BOLGROT");
  add("BOLGROT", "family", "Créateurs", ["DJAUL", "AGUABRIAL"]);
  removeFriend("XAV LE BOULANGER", ["ATCHAM CRÉPIN", "KÉRUBIM CRÉPIN", "JORIS", "JORIS JURGEN"]);
  removeEnemy("BELLAPHONE", ["JORIS", "JORIS JURGEN", "KÉRUBIM CRÉPIN", "ATCHAM CRÉPIN", "ADAMAÏ"]);
  friendshipGroup(["AGARD", "CHAILLE", "BISTE", "MOUCHE"]);

  alias("GRAND DRAGON", "LE GRAND DRAGON");
  alias("LA DÉESSE ÉLIATROPE", "DÉESSE ÉLIATROPE");
  alias("LA DÉESSE ÉLIATROPE", "GRANDE DÉESSE");
  alias("DÉESSE PANDA", "DÉESSE PANDAWA");
  alias("KÉRUBIM CRÉPIN", "KÉRUBIM");
  alias("LANCE DUR", "LANCEDUR");
  alias("TRISTEPIN DE PERCEDAL", "TRISTEPIN");

  return relations;
}

function addUnique(values, value) {
  if (value && !values.includes(value)) {
    values.push(value);
  }
}

function normalizeRelationName(value) {
  return cleanLabel(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function straightenAffinityLinks(svg) {
  Array.from(svg.querySelectorAll('path[fill="none"][stroke]')).forEach((path) => {
    const straightPath = makeRectilinearPath(path.getAttribute("d") || "");
    if (!straightPath) {
      return;
    }

    path.setAttribute("d", straightPath);
    path.setAttribute("stroke-linejoin", "round");
  });
}

function makeRectilinearPath(value) {
  const numbers = value.match(/-?\d+(?:\.\d+)?/g)?.map(Number);
  if (!numbers || numbers.length < 8 || !/\bC\b/i.test(value)) {
    return null;
  }

  const start = { x: numbers[0], y: numbers[1] };
  const firstControl = { x: numbers[2], y: numbers[3] };
  const secondControl = { x: numbers[4], y: numbers[5] };
  const end = { x: numbers[numbers.length - 2], y: numbers[numbers.length - 1] };
  const turnY = Math.abs(firstControl.y - secondControl.y) <= 2
    ? firstControl.y
    : (start.y + end.y) / 2;

  if (Math.abs(start.x - end.x) <= 2 || Math.abs(start.y - end.y) <= 2) {
    return `M ${formatPathNumber(start.x)} ${formatPathNumber(start.y)} L ${formatPathNumber(end.x)} ${formatPathNumber(end.y)}`;
  }

  return [
    `M ${formatPathNumber(start.x)} ${formatPathNumber(start.y)}`,
    `V ${formatPathNumber(turnY)}`,
    `H ${formatPathNumber(end.x)}`,
    `V ${formatPathNumber(end.y)}`
  ].join(" ");
}

function formatPathNumber(value) {
  return Number(value.toFixed(3)).toString();
}

function buildLinks(path, nodes) {
  const linkedNodes = new Map();
  getPathPoints(path.getAttribute("d") || "").forEach((point) => {
    const node = nearestNode(point, nodes);
    if (node) {
      linkedNodes.set(node.id, node);
    }
  });

  const linkedIds = Array.from(linkedNodes.keys());
  if (linkedIds.length < 2) {
    return [];
  }

  const links = [];
  linkedIds.forEach((from, fromIndex) => {
    linkedIds.slice(fromIndex + 1).forEach((to) => {
      links.push({ path, from, to });
    });
  });
  return links;
}

function getPathPoints(value) {
  const tokens = value.match(/[a-zA-Z]|-?\d*\.?\d+/g) || [];
  const points = [];
  let command = "";
  let current = { x: 0, y: 0 };
  let index = 0;

  function readNumber() {
    return Number(tokens[index++]);
  }

  while (index < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[index])) {
      command = tokens[index++];
    }

    if (command === "M" || command === "L") {
      current = { x: readNumber(), y: readNumber() };
      points.push({ ...current });
    } else if (command === "H") {
      current = { x: readNumber(), y: current.y };
      points.push({ ...current });
    } else if (command === "V") {
      current = { x: current.x, y: readNumber() };
      points.push({ ...current });
    } else {
      break;
    }
  }

  return points;
}

function nearestNode(point, nodes) {
  let best = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  nodes.forEach((node) => {
    const distance = Math.hypot(point.x - node.center.x, point.y - node.center.y);
    if (distance < bestDistance) {
      best = node;
      bestDistance = distance;
    }
  });

  return bestDistance <= 130 ? best : null;
}

function cleanLabel(value) {
  return value.replace(/[✦◆◇★☆?]/g, "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanDisplayLabel(value, size = 0) {
  if ((size === 11 || size === 9) && /(?:[ÉE]poux|[ÉE]pouse)/i.test(value)) {
    return "Couple";
  }

  return value;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

window.KrosmozAffinities = {
  getRelations(name) {
    return getAffinityRelations(name, []);
  },
  getIcon(name) {
    return getAffinityIconForName(name);
  },
  normalizeName(name) {
    return normalizeRelationName(name);
  }
};
