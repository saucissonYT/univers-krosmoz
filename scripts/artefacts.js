/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const hall = document.querySelector('[data-artifact-hall]');
  if (!hall) return;

  let artifacts = Array.from(hall.querySelectorAll('.museum-artifact'));
  const previousButton = hall.querySelector('[data-artifact-prev]');
  const nextButton = hall.querySelector('[data-artifact-next]');
  const searchInput = hall.querySelector('[data-artifact-search]');
  const searchCount = hall.querySelector('[data-artifact-search-count]');
  const sortButton = hall.querySelector("[data-artifact-sort='az']");
  const track = hall.querySelector('.artifact-track');
  const pedestal = hall.querySelector('.artifact-pedestal-fixed');

  if (artifacts.length < 2 || !previousButton || !nextButton || !track) return;

  const getArtifactTitle = (artifact) => {
    return artifact.querySelector('.artifact-description h1, .artifact-description h2')?.textContent?.trim() || 'Artefact';
  };

  const normalizeSearchText = (value) => {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  };

  const buildArtifactSearchEntries = () => artifacts.map((artifact) => {
    const title = getArtifactTitle(artifact);
    const searchableText = [
      title,
      artifact.id,
      artifact.querySelector('.artifact-display-caption span')?.textContent,
      artifact.querySelector('.artifact-display-caption strong')?.textContent,
      artifact.querySelector('.artifact-description')?.textContent,
      artifact.querySelector('.artifact-display img')?.alt
    ].join(' ');

    return {
      artifact,
      title,
      searchText: normalizeSearchText(searchableText)
    };
  });

  let artifactSearchEntries = buildArtifactSearchEntries();

  let suppressCarouselClick = false;
  let carouselElement = null;

  const createCarousel = () => {
    const carousel = document.createElement('nav');
    carousel.className = 'artifact-carousel';
    carousel.setAttribute('aria-label', 'Choisir un artefact');
    carouselElement = carousel;

    const items = artifacts.map((artifact, index) => {
      const title = getArtifactTitle(artifact);
      const image = artifact.querySelector('.artifact-display img');
      const button = document.createElement('button');
      const thumb = document.createElement('span');

      button.type = 'button';
      button.className = 'artifact-carousel-item';
      button.dataset.artifactIndex = String(index);
      button.setAttribute('aria-label', 'Afficher ' + title);

      thumb.className = 'artifact-carousel-thumb';
      if (image) {
        const clone = image.cloneNode(false);
        clone.alt = '';
        clone.draggable = false;
        clone.loading = 'lazy';
        thumb.append(clone);
      }

      button.append(thumb);
      button.addEventListener('click', (event) => {
        event.preventDefault();
      });
      carousel.append(button);

      return button;
    });

    const searchBand = hall.querySelector('.artifact-search-band');
    if (searchBand) {
      searchBand.after(carousel);
    } else {
      hall.prepend(carousel);
    }
    return items;
  };

  const setupCarouselDrag = () => {
    if (!carouselElement) return;

    const dragStep = 72;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let accumulatedX = 0;
    let pressedItem = null;
    let hasDragged = false;

    const stopDragging = () => {
      if (!isDragging) return;

      const targetIndex = pressedItem ? Number.parseInt(pressedItem.dataset.artifactIndex || '', 10) : NaN;
      const shouldSelectPressedItem = !hasDragged && Number.isInteger(targetIndex);

      isDragging = false;
      accumulatedX = 0;
      pressedItem = null;
      hasDragged = false;
      carouselElement.classList.remove('is-dragging');

      if (shouldSelectPressedItem) {
        showArtifact(targetIndex, true);
      }

      window.setTimeout(() => {
        suppressCarouselClick = false;
      }, 80);
    };

    const startDragging = (clientX, target) => {
      isDragging = true;
      suppressCarouselClick = false;
      pressedItem = target.closest('.artifact-carousel-item');
      hasDragged = false;
      startX = clientX;
      lastX = clientX;
      accumulatedX = 0;
      carouselElement.classList.add('is-dragging');
    };

    const moveDragging = (clientX, event) => {
      if (!isDragging) return;

      const totalDistance = clientX - startX;
      const deltaX = clientX - lastX;
      lastX = clientX;

      if (Math.abs(totalDistance) > 12) {
        suppressCarouselClick = true;
        hasDragged = true;
        event.preventDefault();
      }

      accumulatedX += deltaX;

      while (accumulatedX <= -dragStep) {
        showArtifact(activeIndex + 1, true);
        accumulatedX += dragStep;
      }

      while (accumulatedX >= dragStep) {
        showArtifact(activeIndex - 1, true);
        accumulatedX -= dragStep;
      }
    };

    if (window.PointerEvent) {
      carouselElement.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;

        startDragging(event.clientX, event.target);
        carouselElement.setPointerCapture?.(event.pointerId);
      });

      carouselElement.addEventListener('pointermove', (event) => {
        moveDragging(event.clientX, event);
      });

      carouselElement.addEventListener('pointerup', stopDragging);
      carouselElement.addEventListener('pointercancel', stopDragging);
      carouselElement.addEventListener('lostpointercapture', stopDragging);
      return;
    }

    carouselElement.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;

      startDragging(event.clientX, event.target);
    });

    window.addEventListener('mousemove', (event) => {
      moveDragging(event.clientX, event);
    });

    window.addEventListener('mouseup', stopDragging);
  };

  const setupCarouselWheel = () => {
    if (!carouselElement) return;

    carouselElement.addEventListener('wheel', (event) => {
      const mainDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(mainDelta) < 8) return;

      event.preventDefault();

      if (carouselWheelTimer) return;

      showArtifact(activeIndex + (mainDelta > 0 ? 1 : -1), true);
      carouselWheelTimer = window.setTimeout(() => {
        carouselWheelTimer = 0;
      }, 340);
    }, { passive: false });
  };

  const createTurntable = () => {
    const stage = document.createElement('div');
    stage.className = 'artifact-turntable-stage';
    stage.setAttribute('role', 'group');
    stage.setAttribute('aria-label', 'Plateau des artefacts');

    const items = artifacts.map((artifact, index) => {
      const image = artifact.querySelector('.artifact-display img');
      const item = document.createElement('button');
      const imageWrap = document.createElement('span');
      const title = getArtifactTitle(artifact);

      item.type = 'button';
      item.className = 'artifact-turntable-item';
      item.dataset.artifactIndex = String(index);
      item.setAttribute('aria-label', 'Afficher ' + title);

      imageWrap.className = 'artifact-turntable-image';

      if (image) {
        const clone = image.cloneNode(false);
        clone.alt = '';
        clone.draggable = false;
        clone.loading = 'lazy';
        clone.decoding = 'async';
        imageWrap.append(clone);
      }

      const accent = getComputedStyle(artifact).getPropertyValue('--artifact-accent-rgb').trim();
      item.style.setProperty('--artifact-accent-rgb', accent || '46, 207, 176');
      item.append(imageWrap);
      item.addEventListener('click', () => showArtifact(index, true));
      stage.append(item);

      return item;
    });

    track.prepend(stage);
    track.classList.add('has-turntable');
    hall.classList.add('has-turntable');
    return items;
  };

  const getDirection = (nextIndex) => {
    const normalizedIndex = (nextIndex + artifacts.length) % artifacts.length;
    const forwardDistance = (normalizedIndex - activeIndex + artifacts.length) % artifacts.length;
    const backwardDistance = (activeIndex - normalizedIndex + artifacts.length) % artifacts.length;
    return forwardDistance <= backwardDistance ? 'next' : 'previous';
  };

  let activeIndex = Math.max(0, artifacts.findIndex((artifact) => artifact.classList.contains('is-active')));
  let carouselItems = [];
  let turntableItems = [];
  let turnAnimationTimer = 0;
  let carouselWheelTimer = 0;
  let pageWheelTimer = 0;
  let searchMatches = [];
  let activeSearchMatch = 0;
  let isSortedAz = false;

  const updateSearchCount = (query) => {
    if (!searchCount) return;

    if (!query) {
      searchCount.textContent = '';
      return;
    }

    if (!searchMatches.length) {
      searchCount.textContent = 'Aucun résultat';
      return;
    }

    searchCount.textContent = `${activeSearchMatch + 1} / ${searchMatches.length}`;
  };

  const goToSearchMatch = (offset) => {
    if (!searchMatches.length) return;

    activeSearchMatch = (activeSearchMatch + offset + searchMatches.length) % searchMatches.length;
    showArtifact(searchMatches[activeSearchMatch], true);
    updateSearchCount(normalizeSearchText(searchInput?.value));
  };

  const updateArtifactSearch = () => {
    const query = normalizeSearchText(searchInput?.value);
    searchMatches = query
      ? artifactSearchEntries
        .map((entry, index) => entry.searchText.includes(query) ? index : -1)
        .filter((index) => index !== -1)
      : [];

    hall.classList.toggle('has-artifact-search', Boolean(query));
    hall.classList.toggle('has-artifact-search-results', Boolean(query && searchMatches.length));
    hall.classList.toggle('has-artifact-search-empty', Boolean(query && !searchMatches.length));

    if (query && searchMatches.length) {
      const currentMatchIndex = searchMatches.indexOf(activeIndex);
      activeSearchMatch = currentMatchIndex >= 0 ? currentMatchIndex : 0;

      if (currentMatchIndex === -1) {
        showArtifact(searchMatches[0], true);
      }
    } else {
      activeSearchMatch = 0;
    }

    updateSearchCount(query);
  };

  const updateTurntable = () => {
    turntableItems.forEach((item, itemIndex) => {
      const isCurrent = itemIndex === activeIndex;
      let relativeIndex = (itemIndex - activeIndex + artifacts.length) % artifacts.length;

      if (relativeIndex > artifacts.length / 2) {
        relativeIndex -= artifacts.length;
      }

      const clampedOffset = Math.max(-2, Math.min(2, relativeIndex));
      const isVisible = Math.abs(relativeIndex) <= 1;

      item.classList.toggle('is-active', isCurrent);
      item.classList.toggle('is-turntable-hidden', !isVisible);
      item.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      item.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      item.tabIndex = isVisible ? 0 : -1;
      item.style.setProperty('--turntable-offset', String(clampedOffset));
      item.setAttribute('data-turntable-offset', String(clampedOffset));
    });
  };

  const updatePedestalPosition = () => {
    const isMobileLayout = window.matchMedia('(max-width: 840px)').matches;
    if (!isMobileLayout) {
      pedestal?.style.removeProperty('--artifact-pedestal-top');
      return;
    }

    const referenceArtifact = isMobileLayout
      ? artifacts[activeIndex]
      : artifacts.find((artifact) => artifact.id === 'eliacube') || artifacts[0];
    const referenceImage = referenceArtifact?.querySelector('.artifact-display img');
    const referenceDisplay = referenceArtifact?.querySelector('.artifact-display');
    if (!pedestal || !referenceImage || !referenceDisplay) return;

    const displayRect = referenceDisplay.getBoundingClientRect();
    const imageStyle = window.getComputedStyle(referenceImage);
    const imageWidth = Number.parseFloat(imageStyle.width) || referenceImage.getBoundingClientRect().width;
    const imageRatio = referenceImage.naturalWidth > 0
      ? referenceImage.naturalHeight / referenceImage.naturalWidth
      : 1;
    const referenceImageHeight = imageWidth * imageRatio;
    const referenceImageBottom = displayRect.top + (displayRect.height * 0.51) + (referenceImageHeight / 2);
    const pedestalTop = referenceImageBottom + (isMobileLayout ? 4 : -64);
    pedestal.style.setProperty('--artifact-pedestal-top', Math.round(pedestalTop) + 'px');
  };

  const schedulePedestalUpdate = () => {
    const runFrame = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 0));

    runFrame(() => {
      updatePedestalPosition();
      runFrame(updatePedestalPosition);
    });
  };

  const updateControls = () => {
    const previousArtifact = artifacts[(activeIndex - 1 + artifacts.length) % artifacts.length];
    const nextArtifact = artifacts[(activeIndex + 1) % artifacts.length];

    previousButton.setAttribute('aria-label', 'Artefact precedent : ' + getArtifactTitle(previousArtifact));
    previousButton.title = getArtifactTitle(previousArtifact);
    nextButton.setAttribute('aria-label', 'Artefact suivant : ' + getArtifactTitle(nextArtifact));
    nextButton.title = getArtifactTitle(nextArtifact);
  };

  const updateDescriptionScrollHint = () => {
    artifacts.forEach((artifact) => {
      const description = artifact.querySelector('.artifact-description');
      if (!description) return;

      const hasOverflow = description.scrollHeight > description.clientHeight + 2;
      const isNearBottom = description.scrollTop + description.clientHeight >= description.scrollHeight - 6;
      description.classList.toggle('has-scroll-more', hasOverflow && !isNearBottom);
    });
  };

  const setupPageWheel = () => {
    document.addEventListener('wheel', (event) => {
      if (event.target.closest('[data-site-header], .site-topbar, header')) return;
      if (event.target.closest('.artifact-search-band')) return;

      const mainDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(mainDelta) < 8) return;

      event.preventDefault();

      if (pageWheelTimer) return;

      showArtifact(activeIndex + (mainDelta > 0 ? 1 : -1), true);
      pageWheelTimer = window.setTimeout(() => {
        pageWheelTimer = 0;
      }, 340);
    }, { passive: false });
  };

  const showArtifact = (index, shouldFocus) => {
    const nextIndex = (index + artifacts.length) % artifacts.length;
    const direction = nextIndex === activeIndex ? '' : getDirection(nextIndex);

    if (direction && shouldFocus) {
      window.clearTimeout(turnAnimationTimer);
      hall.classList.remove('is-turning-next', 'is-turning-previous');
      void hall.offsetWidth;
      hall.classList.add('is-turning-' + direction);
      turnAnimationTimer = window.setTimeout(() => {
        hall.classList.remove('is-turning-next', 'is-turning-previous');
      }, 620);
    }

    activeIndex = nextIndex;
    if (searchMatches.length) {
      const matchIndex = searchMatches.indexOf(activeIndex);
      if (matchIndex >= 0) {
        activeSearchMatch = matchIndex;
        updateSearchCount(normalizeSearchText(searchInput?.value));
      }
    }

    artifacts.forEach((artifact, artifactIndex) => {
      const isActive = artifactIndex === activeIndex;
      artifact.classList.toggle('is-active', isActive);
      artifact.classList.toggle('is-revealed', isActive && shouldFocus);
      artifact.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      artifact.tabIndex = isActive ? 0 : -1;
    });

    carouselItems.forEach((item, itemIndex) => {
      const isCurrent = itemIndex === activeIndex;
      const visibleItems = Math.min(7, artifacts.length);
      const sideCount = Math.floor(visibleItems / 2);
      let relativeIndex = (itemIndex - activeIndex + artifacts.length) % artifacts.length;

      if (relativeIndex > artifacts.length / 2) {
        relativeIndex -= artifacts.length;
      }

      const isVisible = Math.abs(relativeIndex) <= sideCount;

      item.classList.toggle('is-active', isCurrent);
      item.classList.toggle('is-carousel-hidden', !isVisible);
      item.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      item.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      item.tabIndex = isVisible ? 0 : -1;
      item.style.setProperty('--carousel-offset', String(relativeIndex));
      item.setAttribute('data-carousel-offset', String(relativeIndex));
    });

    updateControls();
    updateTurntable();
    schedulePedestalUpdate();
    updateDescriptionScrollHint();

    if (artifacts[activeIndex].id && shouldFocus) {
      try {
        window.history.replaceState(null, '', '#' + artifacts[activeIndex].id);
      } catch (error) {
        // The carousel remains usable even if the browser blocks history updates.
      }
    }

    if (shouldFocus) {
      window.setTimeout(() => {
        try {
          artifacts[activeIndex].focus({ preventScroll: true });
        } catch (error) {
          artifacts[activeIndex].focus();
        }
      }, 180);
    }
  };

  const sortArtifactsAz = () => {
    if (isSortedAz) return;

    const currentArtifact = artifacts[activeIndex];
    artifacts = [...artifacts].sort((first, second) => {
      return getArtifactTitle(first).localeCompare(getArtifactTitle(second), 'fr', {
        sensitivity: 'base',
        ignorePunctuation: true
      });
    });
    activeIndex = Math.max(0, artifacts.indexOf(currentArtifact));
    artifactSearchEntries = buildArtifactSearchEntries();
    isSortedAz = true;

    carouselElement?.remove();
    carouselElement = null;
    track.querySelector('.artifact-turntable-stage')?.remove();
    track.classList.remove('has-turntable');
    hall.classList.remove('has-turntable');

    carouselItems = createCarousel();
    setupCarouselDrag();
    setupCarouselWheel();
    turntableItems = createTurntable();

    sortButton?.classList.add('is-active');
    sortButton?.setAttribute('aria-pressed', 'true');
    updateArtifactSearch();
    showArtifact(activeIndex, false);
  };

  previousButton.addEventListener('click', () => {
    showArtifact(activeIndex - 1, true);
  });

  nextButton.addEventListener('click', () => {
    showArtifact(activeIndex + 1, true);
  });

  if (searchInput) {
    searchInput.addEventListener('input', updateArtifactSearch);
    searchInput.addEventListener('keydown', (event) => {
      if (!searchMatches.length) return;

      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault();
        goToSearchMatch(1);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToSearchMatch(-1);
      }
    });
  }

  if (sortButton) {
    sortButton.setAttribute('aria-pressed', 'false');
    sortButton.addEventListener('click', sortArtifactsAz);
  }

  window.addEventListener('resize', schedulePedestalUpdate);
  window.addEventListener('load', schedulePedestalUpdate);
  window.addEventListener('resize', updateDescriptionScrollHint);
  window.addEventListener('load', updateDescriptionScrollHint);
  artifacts.forEach((artifact) => {
    artifact.querySelector('.artifact-description')?.addEventListener('scroll', updateDescriptionScrollHint, { passive: true });
  });

  hall.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showArtifact(activeIndex - 1, true);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showArtifact(activeIndex + 1, true);
    }
  });

  carouselItems = createCarousel();
  setupCarouselDrag();
  setupCarouselWheel();
  setupPageWheel();
  turntableItems = createTurntable();
  const hashIndex = artifacts.findIndex((artifact) => artifact.id && '#' + artifact.id === window.location.hash);
  showArtifact(hashIndex >= 0 ? hashIndex : activeIndex, false);
})();
