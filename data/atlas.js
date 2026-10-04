/* =============================================================
   Atlas runtime — reads window.ATLAS and injects:
     · country pages → song/meal/moment card
     · index page    → status pill, by-the-numbers, contact-sheet,
                       timeline toggle
   ============================================================= */
(function () {
  if (!window.ATLAS) return;
  const { status, countries } = window.ATLAS;

  const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');
  const slugFromPath = () => {
    const p = location.pathname.replace(/\/$/, '').split('/').pop() || '';
    return p.replace(/\.html$/, '');
  };
  const totalTripDays = () => {
    return countries.reduce((sum, c) => {
      const m = (c.duration || '').match(/(\d+)\s*(day|week)/i);
      if (!m) return sum;
      const n = parseInt(m[1], 10);
      return sum + (m[2].toLowerCase().startsWith('week') ? n * 7 : n);
    }, 0);
  };

  function renderTripCard() {
    const slug = slugFromPath();
    const c = countries.find(x => x.slug === slug);
    if (!c) return;
    const article = document.querySelector('article.post');
    const backLink = article && article.querySelector('.post-back');
    if (!article) return;

    const card = document.createElement('section');
    card.className = 'trip-card';
    card.innerHTML = `
      <div class="trip-card-grid">
        <div class="trip-card-item">
          <div class="trip-card-eyebrow">One song</div>
          ${c.song
            ? `<a class="trip-card-song" href="${c.song.url}" target="_blank" rel="noopener">
                <span class="trip-card-song-title">${c.song.title}</span>
                <span class="trip-card-song-artist">${c.song.artist}</span>
                <svg class="trip-card-song-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
                </svg>
              </a>`
            : '<p class="trip-card-placeholder">Coming soon.</p>'}
        </div>
        <div class="trip-card-item">
          <div class="trip-card-eyebrow">One meal</div>
          <p class="trip-card-text">${c.meal || 'Coming soon.'}</p>
        </div>
        <div class="trip-card-item">
          <div class="trip-card-eyebrow">One moment</div>
          <p class="trip-card-text">${c.moment || 'Coming soon.'}</p>
        </div>
      </div>
    `;
    if (backLink) article.insertBefore(card, backLink);
    else article.appendChild(card);
  }

  function renderStatusPill() {
    const slot = document.getElementById('atlas-status-pill');
    if (!slot) return;
    if (status && status.traveling && status.place) {
      slot.innerHTML = `
        <span class="status-pill is-live">
          <span class="status-dot"></span>
          On the road · <strong>${status.place}</strong>
        </span>`;
    } else if (status && status.next) {
      slot.innerHTML = `
        <span class="status-pill">
          Next up · <strong>${status.next}</strong>
        </span>`;
    } else {
      slot.innerHTML = `
        <span class="status-pill is-quiet">
          <span class="status-dot quiet"></span>
          Back home · Neckarsulm, DE
        </span>`;
    }
  }

  function renderNumbers() {
    const slot = document.getElementById('atlas-numbers');
    if (!slot) return;
    const total = countries.length;
    const reports = countries.filter(c => c.kind === 'report').length;
    const sketches = countries.filter(c => c.kind === 'sketch').length;
    const continents = new Set(countries.map(c => c.region)).size;
    const days = totalTripDays();
    const mostRecent = [...countries].filter(c => c.kind !== 'home').sort(byDateDesc)[0];
    const stats = [
      { num: total,    label: 'Countries',         sub: `${continents} regions` },
      { num: days,     label: 'Days on the road',  sub: 'Cumulative since 2022' },
      { num: reports,  label: 'Full reports',      sub: `${sketches} sketches in progress` },
      { num: mostRecent ? mostRecent.dateLabel : '—', label: 'Most recent', sub: mostRecent ? mostRecent.country : '' }
    ];
    slot.innerHTML = stats.map(s => `
      <div class="atlas-num">
        <div class="atlas-num-value">${s.num}</div>
        <div class="atlas-num-label">${s.label}</div>
        <div class="atlas-num-sub">${s.sub}</div>
      </div>
    `).join('');
  }

  function renderContactSheet() {
    const slot = document.getElementById('atlas-contactsheet');
    if (!slot) return;
    const items = [...countries]
      .filter(c => c.kind !== 'home')
      .sort(byDateDesc);
    slot.innerHTML = items.map(c => {
      const photo = c.cover;
      return `
        <a class="cs-thumb" href="${c.slug}" data-slug="${c.slug}" data-region="${c.region}" data-date="${c.date}">
          <div class="cs-thumb-photo has-photo" style="--photo-bg:url('${photo}')">
            <span class="cs-thumb-placeholder" aria-hidden="true">${c.flag}</span>
          </div>
          <div class="cs-thumb-meta">
            <span class="cs-thumb-country">${c.country}</span>
            <span class="cs-thumb-date">${c.dateLabel}</span>
          </div>
        </a>`;
    }).join('');

  }

  function renderTimelineToggle() {
    const slot = document.getElementById('atlas-view-toggle');
    const sheet = document.getElementById('atlas-contactsheet');
    if (!slot || !sheet) return;
    slot.innerHTML = `
      <button class="view-btn is-active" type="button" aria-pressed="true" data-view="recent">Recent first</button>
      <button class="view-btn" type="button" aria-pressed="false" data-view="region">By region</button>
      <button class="view-btn" type="button" aria-pressed="false" data-view="timeline">Timeline</button>
    `;
    const sortBy = (mode) => {
      const items = Array.from(sheet.querySelectorAll('.cs-thumb'));
      if (mode === 'recent') {
        items.sort((a, b) => (b.dataset.date || '').localeCompare(a.dataset.date || ''));
      } else if (mode === 'timeline') {
        items.sort((a, b) => (a.dataset.date || '').localeCompare(b.dataset.date || ''));
      } else if (mode === 'region') {
        const order = { 'Europe': 1, 'Middle East': 2, 'Asia': 3 };
        items.sort((a, b) => {
          const ra = order[a.dataset.region] || 99;
          const rb = order[b.dataset.region] || 99;
          if (ra !== rb) return ra - rb;
          return (b.dataset.date || '').localeCompare(a.dataset.date || '');
        });
      }
      items.forEach(el => sheet.appendChild(el));
      sheet.classList.toggle('is-timeline', mode === 'timeline');
    };
    slot.addEventListener('click', e => {
      const btn = e.target.closest('.view-btn');
      if (!btn) return;
      slot.querySelectorAll('.view-btn').forEach(button => {
        button.classList.toggle('is-active', button === btn);
        button.setAttribute('aria-pressed', String(button === btn));
      });
      sortBy(btn.dataset.view);
    });
  }

  // ----- world map: chronological travel arcs between pins -----
  // Maps each ATLAS country (by slug) to one or more SVG country pin
  // names in world-map.svg. Multi-country trips (Alps loop) hit all three.
  const PIN_NAMES = {
    'alps-road-trip':         ['Germany', 'Austria'],
    'croatia-november':       ['Croatia'],
    'prague-winter':          ['Czech Republic'],
    'norway-fjords':          ['Norway'],
    'netherlands-amsterdam':  ['Netherlands'],
    'belgium-brussels':       ['Belgium'],
    'france-paris':           ['France'],
    'switzerland-alps':       ['Switzerland'],
    'uae-dubai':              ['UAE'],
    'india-hometown':         ['India'],
    'maldives-atolls':        ['Maldives'],
    'thailand-bangkok':       ['Thailand'],
    'singapore-stopover':     ['Singapore'],
    'germany-home':           ['Germany']
  };

  function renderMapArcs() {
    // Run after the constellation map has inlined the SVG (poll briefly).
    const host = document.getElementById('atlas-constellation');
    if (!host) return;
    let tries = 0;
    const poll = setInterval(() => {
      const svg = host.querySelector('svg');
      if (!svg && tries++ < 40) return;
      clearInterval(poll);
      if (!svg) return;

      // Skip if arcs already drawn
      if (svg.querySelector('.map-arcs')) return;

      // Build slug → {x, y} from pin transforms inside the inline SVG
      const pinPos = {};
      svg.querySelectorAll('[data-country]').forEach(el => {
        const t = el.getAttribute('transform') || '';
        const m = t.match(/translate\(\s*([0-9.\-]+)[\s,]+([0-9.\-]+)\s*\)/);
        if (m) pinPos[el.dataset.country] = { x: parseFloat(m[1]), y: parseFloat(m[2]) };
      });

      // Chronological order of trips, oldest → newest, exclude home
      const trips = [...countries]
        .filter(c => c.kind !== 'home')
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

      // Path = sequence of pins, one per trip (first pin of multi-country trip)
      const points = [];
      trips.forEach(c => {
        const names = PIN_NAMES[c.slug] || [];
        names.forEach(n => {
          const p = pinPos[n];
          if (p && (!points.length || points[points.length-1].x !== p.x || points[points.length-1].y !== p.y)) {
            points.push(p);
          }
        });
      });
      if (points.length < 2) return;

      // Build arcs as quadratic Bezier curves between successive points
      const NS = 'http://www.w3.org/2000/svg';
      const arcs = document.createElementNS(NS, 'g');
      arcs.setAttribute('class', 'map-arcs');
      // Place arcs above continents but below pin dots
      const pinsLayer = svg.querySelector('[data-country]');
      const pinsParent = pinsLayer ? pinsLayer.parentNode : svg;
      pinsParent.insertBefore(arcs, pinsLayer);

      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i], b = points[i+1];
        // Control point — perpendicular offset for arc curvature
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const curve = Math.min(40, len * 0.25);
        // Perpendicular unit vector (alternate side each step for variety)
        const sign = (i % 2 === 0) ? -1 : 1;
        const cx = mx + sign * (-dy / len) * curve;
        const cy = my + sign * ( dx / len) * curve;
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('class', 'travel-arc');
        path.setAttribute('d', `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
        arcs.appendChild(path);
      }
    }, 80);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderStatusPill();
    renderNumbers();
    renderContactSheet();
    renderTimelineToggle();
    renderTripCard();
    renderMapArcs();
  });
})();
