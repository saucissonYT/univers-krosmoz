/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const hall = document.querySelector('[data-artifact-hall]');
  if (!hall) return;

  const artifacts = Array.from(hall.querySelectorAll('.museum-artifact'));
  const previousButton = hall.querySelector('[data-artifact-prev]');
  const nextButton = hall.querySelector('[data-artifact-next]');
  const track = hall.querySelector('.artifact-track');
  const pedestal = hall.querySelector('.artifact-pedestal-fixed');

  if (artifacts.length < 2 || !previousButton || !nextButton || !track) return;

  const getArtifactTitle = (artifact) => {
    return artifact.querySelector('.artifact-description h1, .artifact-description h2')?.textContent?.trim() || 'Artefact';
  };

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

    hall.prepend(carousel);
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

  const createSidePreviews = () => {
    const stage = document.createElement('div');
    stage.className = 'artifact-side-stage';
    stage.setAttribute('aria-hidden', 'true');

    const createPreview = (side) => {
      const preview = document.createElement('div');
      const imageWrap = document.createElement('span');
      const pedestal = document.createElement('span');

      preview.className = 'artifact-side-preview artifact-side-' + side;
      imageWrap.className = 'artifact-side-image';
      pedestal.className = 'artifact-side-pedestal';
      preview.append(imageWrap, pedestal);
      stage.append(preview);

      return { preview, imageWrap };
    };

    const previews = {
      left: createPreview('left'),
      right: createPreview('right')
    };

    track.prepend(stage);
    return previews;
  };

  const getDirection = (nextIndex) => {
    const normalizedIndex = (nextIndex + artifacts.length) % artifacts.length;
    const forwardDistance = (normalizedIndex - activeIndex + artifacts.length) % artifacts.length;
    const backwardDistance = (activeIndex - normalizedIndex + artifacts.length) % artifacts.length;
    return forwardDistance <= backwardDistance ? 'next' : 'previous';
  };

  let activeIndex = Math.max(0, artifacts.findIndex((artifact) => artifact.classList.contains('is-active')));
  let carouselItems = [];
  let sidePreviews = null;
  let turnAnimationTimer = 0;
  let carouselWheelTimer = 0;
  let pageWheelTimer = 0;

  const updateSidePreview = (side, artifact) => {
    const slot = sidePreviews?.[side];
    const image = artifact?.querySelector('.artifact-display img');
    if (!slot || !image) return;

    slot.imageWrap.replaceChildren();
    const clone = image.cloneNode(false);
    clone.alt = '';
    clone.loading = 'lazy';
    clone.decoding = 'async';
    slot.imageWrap.append(clone);

    const accent = getComputedStyle(artifact).getPropertyValue('--artifact-accent-rgb').trim();
    slot.preview.style.setProperty('--artifact-accent-rgb', accent || '46, 207, 176');
  };

  const updateSidePreviews = () => {
    const previousArtifact = artifacts[(activeIndex - 1 + artifacts.length) % artifacts.length];
    const nextArtifact = artifacts[(activeIndex + 1) % artifacts.length];

    updateSidePreview('left', previousArtifact);
    updateSidePreview('right', nextArtifact);
  };

  const updatePedestalPosition = () => {
    const referenceArtifact = artifacts.find((artifact) => artifact.id === 'eliacube') || artifacts[0];
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
    const pedestalTop = referenceImageBottom - 64;
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

  const setupPageWheel = () => {
    document.addEventListener('wheel', (event) => {
      if (event.target.closest('[data-site-header], .site-topbar, header')) return;

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
    updateSidePreviews();
    schedulePedestalUpdate();

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

  previousButton.addEventListener('click', () => {
    showArtifact(activeIndex - 1, true);
  });

  nextButton.addEventListener('click', () => {
    showArtifact(activeIndex + 1, true);
  });

  window.addEventListener('resize', schedulePedestalUpdate);
  window.addEventListener('load', schedulePedestalUpdate);

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
  sidePreviews = createSidePreviews();
  const hashIndex = artifacts.findIndex((artifact) => artifact.id && '#' + artifact.id === window.location.hash);
  showArtifact(hashIndex >= 0 ? hashIndex : activeIndex, false);
})();
