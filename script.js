/* =============================================================
   bhaveshjain.com — script.js
   Lean handler for the cartographer's-notebook site.
   Only the essentials remain at the top.
   ============================================================= */

/* ----- UI wiring on DOMContentLoaded ----- */
document.addEventListener('DOMContentLoaded', () => {

  /* Year stamp(s) */
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const menuToggle = document.querySelector('.menu-toggle, .nav-toggle');
  const menuLinks = document.querySelector('.masthead-nav, .nav-links');
  const setMenu = (open, restoreFocus = false) => {
    if (!menuToggle || !menuLinks) return;
    menuLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    if (restoreFocus) menuToggle.focus();
  };
  menuToggle?.addEventListener('click', () => {
    const open = !menuLinks?.classList.contains('open');
    setMenu(open);
    if (open) menuLinks?.querySelector('a')?.focus();
  });
  menuLinks?.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuLinks?.classList.contains('open')) {
      setMenu(false, true);
    }
  });
  document.addEventListener('click', event => {
    if (!menuLinks?.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
  });
  window.matchMedia('(min-width: 641px)').addEventListener('change', () => setMenu(false));
  setMenu(false);
  if (menuToggle && menuLinks) document.documentElement.classList.add('nav-ready');

  /* Scroll-reveal — fades elements with .reveal in once on viewport entry */
  (function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { els.forEach(el => el.classList.add('is-in')); return; }
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  })();

  /* Counter animation for .record-num[data-target] */
  (function () {
    const nums = document.querySelectorAll('.record-num[data-target]');
    if (!nums.length || !('IntersectionObserver' in window)) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      if (reduce) { el.textContent = target + suffix; return; }
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
  })();

  /* Card mouse-glow — track cursor for radial highlight */
  (function () {
    const cards = document.querySelectorAll('.bento-card, .svc-card, .quote-card, .record-card, .post-card');
    if (!cards.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const handle = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    };
    cards.forEach(c => c.addEventListener('mousemove', handle, { passive: true }));
  })();

  /* Tech strip — duplicate items for seamless marquee loop on desktop */
  (function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    if (window.matchMedia('(max-width: 920px)').matches) return;
    const wrap = document.querySelector('.tech-strip-items');
    if (!wrap) return;
    wrap.innerHTML += wrap.innerHTML;
  })();

  /* Constellation map — load SVG inline, extract pin coords, overlay glowing dots */
  (function () {
    const host = document.getElementById('atlas-constellation');
    if (!host) return;
    const url = host.dataset.map;
    if (!url) return;

    fetch(url)
      .then(r => r.text())
      .then(svgText => {
        host.insertAdjacentHTML('afterbegin', svgText);
        const svg = host.querySelector('svg');
        if (!svg) return;

        /* Force SVG content to fill the container so pin % overlays line up
           with continents regardless of container aspect ratio. */
        svg.setAttribute('preserveAspectRatio', 'none');

        const vb = (svg.getAttribute('viewBox') || '0 0 1200 500').split(' ').map(Number);
        const vbW = vb[2] || 1200;
        const vbH = vb[3] || 500;

        const pins = svg.querySelectorAll('.pin');
        const label = document.createElement('div');
        label.className = 'cpin-label';
        host.appendChild(label);

        pins.forEach(pin => {
          const t = pin.getAttribute('transform') || '';
          const m = t.match(/translate\(\s*([\-0-9.]+)[ ,]+([\-0-9.]+)/);
          if (!m) return;
          const x = parseFloat(m[1]);
          const y = parseFloat(m[2]);
          const country = pin.dataset.country || '';
          const flag = pin.dataset.flag || '';
          const href = pin.dataset.href || '';
          const isHome = pin.classList.contains('is-home');

          const cpin = document.createElement(href ? 'a' : 'div');
          cpin.className = 'cpin' + (isHome ? ' is-home' : '');
          cpin.style.left = (x / vbW * 100) + '%';
          cpin.style.top = (y / vbH * 100) + '%';
          if (href) cpin.href = href;
          cpin.setAttribute('aria-label', `${country}${href ? ' — view trip notes' : ' — home base'}`);
          cpin.dataset.country = country;
          cpin.dataset.flag = flag;

          /* Stagger pulse so they don't all blink in unison */
          cpin.style.animationDelay = (Math.random() * 2.6) + 's';

          const showLabel = () => {
            label.textContent = '';
            const f = document.createElement('span');
            f.textContent = flag;
            const n = document.createElement('span');
            n.textContent = country;
            label.append(f, n);
            label.style.left = cpin.style.left;
            label.style.top = cpin.style.top;
            label.classList.add('show');
          };
          cpin.addEventListener('mouseenter', showLabel);
          cpin.addEventListener('focus', showLabel);
          cpin.addEventListener('blur', () => label.classList.remove('show'));
          cpin.addEventListener('mouseleave', () => label.classList.remove('show'));

          host.appendChild(cpin);
        });
      })
      .catch(() => {});
  })();

  // ----- Travel map: lazy-load SVG, then wire interactions -----
  const mapWrap = document.getElementById('travel-map');

  function initTravelMap() {
    if (!mapWrap) return;
    const tooltip = mapWrap.querySelector('.map-tooltip');
    const pins = mapWrap.querySelectorAll('.pin');
    const arcsGroup = mapWrap.querySelector('.map-arcs');
    if (!pins.length) return;
    bindMapInteractions(mapWrap, tooltip, pins, arcsGroup);
  }

  // Lazy-load: fetch the world map SVG when its slot scrolls into view.
  const mapSlot = mapWrap && mapWrap.querySelector('.travel-map-slot');
  if (mapSlot && mapSlot.dataset.src) {
    const loadMap = () => {
      fetch(mapSlot.dataset.src)
        .then(r => r.ok ? r.text() : '')
        .then(svg => {
          if (!svg) return;
          mapSlot.outerHTML = svg;
          initTravelMap();
        })
        .catch(() => {});
    };
    if ('IntersectionObserver' in window) {
      const mapIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { loadMap(); mapIO.disconnect(); }
        });
      }, { rootMargin: '200px' });
      mapIO.observe(mapSlot);
    } else {
      loadMap();
    }
  } else {
    initTravelMap();
  }

  function bindMapInteractions(mapWrap, tooltip, pins, arcsGroup) {

    // Set per-arc stroke-dasharray = actual path length for clean animation
    if (arcsGroup) {
      arcsGroup.querySelectorAll('.travel-arc').forEach(p => {
        try {
          const len = p.getTotalLength();
          p.style.strokeDasharray = len;
          p.style.strokeDashoffset = len;
          p.style.transition = `stroke-dashoffset ${(1 + len/350).toFixed(2)}s ease-out`;
        } catch (e) { /* getTotalLength unavailable in some envs */ }
      });
      const arcsIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            arcsGroup.classList.add('visible');
            arcsGroup.querySelectorAll('.travel-arc').forEach(p => { p.style.strokeDashoffset = 0; });
            arcsIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      arcsIO.observe(mapWrap);
    }

    // Promote the tooltip element to an <a> so it's clickable
    let tooltipLink = tooltip;
    if (tooltip && tooltip.tagName !== 'A') {
      tooltipLink = document.createElement('a');
      tooltipLink.className = tooltip.className;
      tooltipLink.setAttribute('role', 'status');
      tooltipLink.setAttribute('aria-live', 'polite');
      tooltip.replaceWith(tooltipLink);
    }
    const coverCache = new Map();

    pins.forEach(pin => {
      const country = pin.dataset.country;
      const flag = pin.dataset.flag || '';
      const href = pin.dataset.href || '';
      const cover = pin.dataset.cover || '';

      const renderTooltipContent = () => {
        const coverHtml = cover
          ? `<span class="tt-cover" data-cover-slot></span>`
          : `<span class="tt-cover is-empty">${flag}</span>`;
        const linkHtml = href
          ? `<span class="tt-link">Read trip notes →</span>`
          : `<span class="tt-link" style="color: var(--text-faint);">Visited — write-up to come</span>`;
        const noteHtml = `<p class="tt-note">${pin.dataset.note || (href ? 'A short trip note.' : 'Visited.')}</p>`;
        tooltipLink.innerHTML =
          coverHtml +
          `<span class="tt-body">` +
            `<span class="tt-name"><span class="tt-flag">${flag}</span> ${country}</span>` +
            linkHtml +
          `</span>`;
        if (href) {
          tooltipLink.setAttribute('href', href);
        } else {
          tooltipLink.removeAttribute('href');
        }
        // Lazy-load the cover SVG (inline so it inherits theme tokens)
        if (cover) {
          const slot = tooltipLink.querySelector('[data-cover-slot]');
          if (coverCache.has(cover)) {
            slot.innerHTML = coverCache.get(cover);
          } else {
            fetch(cover).then(r => r.ok ? r.text() : '').then(text => {
              if (!text) return;
              coverCache.set(cover, text);
              if (slot) slot.innerHTML = text;
            }).catch(() => {});
          }
        }
      };

      const showTooltip = (e) => {
        const rect = mapWrap.getBoundingClientRect();
        let clientX, clientY;
        if (e && e.touches && e.touches[0]) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          const p = pin.getBoundingClientRect();
          clientX = p.left + p.width / 2;
          clientY = p.top;
        }
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        renderTooltipContent();
        tooltipLink.style.left = x + 'px';
        tooltipLink.style.top  = y + 'px';
        tooltipLink.classList.add('visible');
      };

      const hideTooltip = () => {
        tooltipLink.classList.remove('visible');
        pins.forEach(p => p.classList.remove('active'));
      };

      pin.addEventListener('mouseenter', showTooltip);
      pin.addEventListener('mouseleave', hideTooltip);
      pin.addEventListener('focus', showTooltip);
      pin.addEventListener('blur', hideTooltip);
      pin.setAttribute('tabindex', '0');
      pin.setAttribute('role', 'button');
      pin.setAttribute('aria-label', `${country}${href ? ' — view trip notes' : ' — visited'}`);

      const activate = () => {
        if (href) {
          window.location.href = href;
        } else {
          pins.forEach(p => p.classList.remove('active'));
          pin.classList.add('active');
          showTooltip({});
          setTimeout(hideTooltip, 2200);
        }
      };

      pin.addEventListener('click', activate);
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });

    // Hide tooltip if user clicks empty map space
    mapWrap.addEventListener('click', (e) => {
      if (e.target === mapWrap) tooltipLink.classList.remove('visible');
    });
    // Keep tooltip open while hovering it (so user can click the link)
    if (tooltipLink) {
      tooltipLink.addEventListener('mouseenter', () => tooltipLink.classList.add('visible'));
      tooltipLink.addEventListener('mouseleave', () => tooltipLink.classList.remove('visible'));
    }
  }
});
