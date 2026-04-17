/**
 * enhance.js — Independence Day Portal UI Enhancements
 * Scroll progress, animated counters, particle stars
 */
(function () {
  'use strict';

  /* ── 1. SCROLL PROGRESS BAR ── */
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.appendChild(bar);

    function updateBar() {
      var scrolled  = document.documentElement.scrollTop || document.body.scrollTop;
      var maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
      bar.style.width = pct + '%';
    }

    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* ── 2. ANIMATED COUNTER ── */
  function animateCounter(el) {
    var raw  = el.textContent.trim();
    var plus = raw.endsWith('+');
    var num  = parseInt(raw.replace(/[^\d]/g, ''), 10);
    if (isNaN(num) || num === 0) return;

    var duration = 1200;
    var start    = null;
    var from     = Math.max(0, num - Math.round(num * 0.65));

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // ease-out-cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (num - from) * eased);
      el.textContent = current + (plus ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw; // restore exact original
    }

    requestAnimationFrame(step);
    el.classList.add('count-anim');
  }

  function initCounters() {
    if (!('IntersectionObserver' in window)) return;

    var selectors = '.stat-card strong, .minimal-card__value';
    var observer  = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll(selectors).forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 3. PARTICLE STARS on presentation strip ── */
  function initParticles() {
    var strip = document.querySelector('.presentation-strip__media');
    if (!strip) return;

    var COUNT = 6;
    for (var i = 0; i < COUNT; i++) {
      var s = document.createElement('span');
      s.className = 'star-particle';
      // random position within bottom 30% of strip
      s.style.bottom = (Math.random() * 30 + 5) + '%';
      s.style.left   = (Math.random() * 90 + 5) + '%';
      strip.appendChild(s);
    }
  }

  /* ── 4. CARD TILT (subtle 3-D on hover) ── */
  function initCardTilt() {
    var cards = document.querySelectorAll('.minimal-card, .card, .panel');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect    = card.getBoundingClientRect();
        var cx      = rect.left + rect.width  / 2;
        var cy      = rect.top  + rect.height / 2;
        var dx      = (e.clientX - cx) / (rect.width  / 2);
        var dy      = (e.clientY - cy) / (rect.height / 2);
        var tiltX   = dy * -5;   // max 5deg
        var tiltY   = dx *  5;
        card.style.transform = 'translateY(-5px) perspective(600px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── 5. SMOOTH HEADER ON SCROLL ── */
  function initStickyHeaderGlow() {
    var header = document.querySelector('.header-nav-bar');
    if (!header) return;

    function onScroll() {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > 60) {
        header.style.boxShadow = '0 4px 32px rgba(8,32,58,0.72)';
      } else {
        header.style.boxShadow = '';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── 6. SECTION ENTRANCE with stagger ── */
  function initSectionEntrance() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // stagger children
          var items = entry.target.querySelectorAll(':scope > .card, :scope > .panel, :scope > .minimal-card, :scope > .timeline-card');
          items.forEach(function (item, idx) {
            item.style.transitionDelay = (idx * 60) + 'ms';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.card-grid, .stats-grid, .mini-grid, .minimal-highlights').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── INIT: wait for DOM + app.js render ── */
  function init() {
    initScrollProgress();
    initCounters();
    initParticles();
    initStickyHeaderGlow();
    initSectionEntrance();
    // Light tilt only on desktop
    if (window.innerWidth > 920) {
      initCardTilt();
    }
  }

  // app.js calls render() synchronously, so DOM is populated at DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run counters and particles after locale switch (app re-renders)
  var _observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.type === 'childList' && m.addedNodes.length) {
        initCounters();
        initParticles();
        if (window.innerWidth > 920) initCardTilt();
      }
    });
  });

  var appRoot = document.getElementById('app');
  if (appRoot) {
    _observer.observe(appRoot, { childList: true, subtree: false });
  }
})();
