/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/

(function () {
  const monthGrid = document.querySelector('[data-month-grid]');
  const monthPanels = document.querySelector('[data-month-panels]');
  const todayCard = document.querySelector('[data-almanax-today]');

  if (!monthGrid || !monthPanels) {
    return;
  }

  const months = [
    { name: 'Javian', protector: 'Jiva', slug: 'jiva', image: 'JIVA.webp' },
    { name: 'Flovor', protector: 'Silvosse', slug: 'silvosse', image: 'SILVOSSE.webp' },
    { name: 'Martalo', protector: 'Ulgrude', slug: 'ulgrude', image: 'ULGRUDE.webp' },
    { name: 'Aperirel', protector: 'Silouate', slug: 'silouate', image: 'SILOUATE.webp' },
    { name: 'Maisial', protector: 'Rosal', slug: 'rosal', image: 'ROSAL.webp' },
    { name: 'Juinssidor', protector: 'Sumens', slug: 'sumens', image: 'SUMENS.webp' },
    { name: 'Joullier', protector: 'Hécate', slug: 'hecate', image: 'HECATE.webp' },
    { name: 'Fraouctor', protector: 'Pouchecot', slug: 'pouchecot', image: 'POUCHECOT.webp' },
    { name: 'Septange', protector: 'Raval', slug: 'raval', image: 'RAVAL.webp' },
    { name: 'Octolliard', protector: 'Maïmane', slug: 'maimane', image: 'MAIMANE.webp' },
    { name: 'Novamaire', protector: 'Brumaire', slug: 'brumaire', image: 'BRUMAIRE.webp' },
    { name: 'Descendre', protector: 'Djaul', slug: 'djaul', image: 'DJAUL-2026.webp' }
  ];

  const monthByProtector = Object.fromEntries(months.map((month) => [month.protector, month.name]));
  const monthOrder = Object.fromEntries(months.map((month, index) => [month.name, index]));

  const normalizeEntry = (entry) => {
    const month = entry.month || monthByProtector[entry.protector] || '';
    return { ...entry, month };
  };

  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));

  const cleanEnding = (value) => String(value || '').trim().replace(/(?:\.{3}|…)$/, '.');

  const getTodayKeys = () => {
    const parts = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

    return {
      exact: `${values.year}-${values.month}-${values.day}`,
      monthDay: `${values.month}-${values.day}`
    };
  };

  const getDayNumber = (entry) => {
    const direct = Number(entry.dayNumber);
    if (Number.isFinite(direct) && direct > 0) {
      return direct;
    }

    const match = String(entry.date || '').match(/(?:^|-)(0?[1-9]|[12]\d|3[01])$/);
    return match ? Number(match[1]) : 0;
  };

  const renderMonthCard = (month, count) => `
    <button class="almanax-month-card" type="button" data-open-month="${escapeHtml(month.name)}" aria-controls="month-${escapeHtml(month.name.toLowerCase())}">
      <span class="almanax-month-portrait" aria-hidden="true">
        <img src="../../assets/personnages/${escapeHtml(month.image)}" alt="" loading="lazy" decoding="async">
      </span>
      <span class="almanax-month-copy">
        <strong>${escapeHtml(month.name)}</strong>
        <span>${escapeHtml(month.protector)}</span>
        <small>${count} Mérydes</small>
      </span>
    </button>`;

  const renderMeryde = (entry) => {
    const day = getDayNumber(entry);
    const dateLabel = day ? `${day} ${entry.month}` : entry.month;
    const image = String(entry.image || '');

    return `
      <article class="meryde-card">
        <img src="${escapeHtml(image)}" alt="" loading="lazy" decoding="async">
        <div>
          <p class="meryde-date">${escapeHtml(dateLabel)}</p>
          <h3>${escapeHtml(entry.meryde)}</h3>
          <p>${escapeHtml(entry.description)}</p>
        </div>
      </article>`;
  };

  const renderMonthPanel = (month, entries) => `
    <details class="almanax-month-panel" id="month-${escapeHtml(month.name.toLowerCase())}" data-month-panel="${escapeHtml(month.name)}">
      <summary>
        <span>
          <strong>${escapeHtml(month.name)}</strong>
          <small>Gardien : <a href="../personnages/${escapeHtml(month.slug)}">${escapeHtml(month.protector)}</a></small>
        </span>
        <em>${entries.length} Mérydes</em>
      </summary>
      <div class="meryde-grid">
        ${entries.map(renderMeryde).join('')}
      </div>
    </details>`;

  const findTodayMeryde = (entries) => {
    const { exact, monthDay } = getTodayKeys();
    return entries.find((entry) => entry.date === exact)
      || entries.find((entry) => entry.date && entry.date.slice(5) === monthDay)
      || entries.find((entry) => entry.date === monthDay);
  };

  const renderTodayMeryde = (entry) => {
    if (!todayCard || !entry || !entry.meryde) {
      return;
    }

    const day = getDayNumber(entry);
    const dateLabel = day && entry.month ? `${day} ${entry.month}` : entry.month || 'Aujourd’hui';
    const image = String(entry.image || '');
    const protector = entry.protector ? `<span>Gardien : ${escapeHtml(entry.protector)}</span>` : '';
    const zodiac = entry.zodiac ? `<span>Signe : ${escapeHtml(entry.zodiac)}</span>` : '';
    const description = cleanEnding(entry.description);
    const effect = entry.effect ? `<p class="almanax-today-effect">${escapeHtml(cleanEnding(entry.effect))}</p>` : '';

    todayCard.hidden = false;
    todayCard.innerHTML = `
      <div class="almanax-today-sigil" aria-hidden="true"></div>
      <div class="almanax-today-image">
        ${image ? `<img src="${escapeHtml(image)}" alt="" loading="eager" decoding="async">` : ''}
      </div>
      <div class="almanax-today-copy">
        <p class="almanax-today-kicker">Aujourd'hui dans le calendrier du Krosmoz</p>
        <div class="almanax-today-heading">
          <span>${escapeHtml(dateLabel)}</span>
          <strong>${escapeHtml(entry.meryde)}</strong>
        </div>
        <p>${escapeHtml(description)}</p>
        ${effect}
        <div class="almanax-today-meta">
          ${protector}
          ${zodiac}
        </div>
      </div>`;
  };

  fetch('../../data/almanax/merydes.json')
    .then((response) => response.json())
    .then((entries) => {
      const byDay = new Map();
      entries
        .map(normalizeEntry)
        .filter((entry) => monthOrder[entry.month] !== undefined)
        .forEach((entry) => {
          const key = `${entry.month}-${getDayNumber(entry)}`;
          if (!byDay.has(key)) {
            byDay.set(key, entry);
          }
        });

      const normalized = [...byDay.values()].sort((a, b) => {
          const monthDelta = monthOrder[a.month] - monthOrder[b.month];
          return monthDelta || getDayNumber(a) - getDayNumber(b) || String(a.meryde).localeCompare(String(b.meryde), 'fr');
        });

      const grouped = new Map(months.map((month) => [month.name, []]));
      normalized.forEach((entry) => grouped.get(entry.month)?.push(entry));

      renderTodayMeryde(findTodayMeryde(entries.map(normalizeEntry)));
      monthGrid.innerHTML = months.map((month) => renderMonthCard(month, grouped.get(month.name).length)).join('');
      monthPanels.innerHTML = months.map((month) => renderMonthPanel(month, grouped.get(month.name))).join('');

      monthGrid.addEventListener('click', (event) => {
        const button = event.target.closest('[data-open-month]');
        if (!button) {
          return;
        }

        const panel = [...monthPanels.querySelectorAll('[data-month-panel]')]
          .find((item) => item.dataset.monthPanel === button.dataset.openMonth);
        if (!panel) {
          return;
        }

        panel.open = true;
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    })
    .catch(() => {
      monthPanels.innerHTML = '<p class="almanax-error">Impossible de charger les Mérydes pour le moment.</p>';
    });
})();
