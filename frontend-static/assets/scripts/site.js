(function () {
  const data = window.portalData;
  const app = document.getElementById("app");

  if (!data || !app) {
    return;
  }

  const page = document.body.dataset.page || "home";
  const routeParent = {
    home: "home",
    about: "about",
    events: "events",
    story: "events",
    documents: "documents",
    "document-detail": "documents",
    organization: "organization",
    media: "media",
    gallery: "media",
    contacts: "contacts",
    search: "search",
    "404": ""
  };

  const localeMap = {
    oz: "uz",
    ru: "ru",
    en: "en"
  };

  const state = {
    locale: getStoredValue("festival-locale", "ru"),
    fontScale: getStoredValue("festival-font-scale", "md"),
    contrast: getStoredValue("festival-contrast", "off"),
    sliderTimer: null
  };

  function getStoredValue(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setStoredValue(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  function t(value) {
    if (value == null) {
      return "";
    }

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    return value[state.locale] || value.ru || value.en || value.oz || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(input) {
    const date = new Date(input);
    return new Intl.DateTimeFormat(localeMap[state.locale], {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  }

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function pageMeta(key) {
    return data.pageMeta[key] || data.pageMeta.home;
  }

  function sectionHeading(title, text, linkHref, linkLabel) {
    return `
      <div class="section-head">
        <div>
          <h2>${title}</h2>
          ${text ? `<p class="section-copy">${text}</p>` : ""}
        </div>
        ${linkHref ? `<a class="ghost-link" href="${linkHref}">${linkLabel}</a>` : ""}
      </div>
    `;
  }

  function breadcrumbTrail(currentTitle) {
    return `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="index.html">${t(data.pageMeta.home.title)}</a>
        <span>/</span>
        <span>${currentTitle}</span>
      </nav>
    `;
  }

  function visual(theme, label) {
    return `
      <div class="card-visual theme-${theme || "azure"}">
        <span>${label}</span>
      </div>
    `;
  }

  function activeNavKey() {
    return routeParent[page] || "";
  }

  function categoryLabel(key) {
    const labels = {
      all: { oz: "Barchasi", ru: "Все", en: "All" },
      news: { oz: "Yangiliklar", ru: "Новости", en: "News" },
      meetings: { oz: "Yig'ilishlar", ru: "Совещания", en: "Meetings" },
      regions: { oz: "Hududlar", ru: "Регионы", en: "Regions" },
      international: { oz: "Xalqaro", ru: "Международные", en: "International" },
      speeches: { oz: "Murojaatlar", ru: "Выступления", en: "Speeches" },
      appeals: { oz: "Murojaatlar", ru: "Обращения", en: "Appeals" }
    };

    return t(labels[key] || { oz: key, ru: key, en: key });
  }

  function documentTypeLabel(key) {
    const labels = {
      all: { oz: "Barchasi", ru: "Все", en: "All" },
      decree: { oz: "Konsepsiya", ru: "Концепция", en: "Concept" },
      order: { oz: "Reglament", ru: "Регламент", en: "Regulation" },
      program: { oz: "Standart", ru: "Стандарт", en: "Standard" },
      initiative: { oz: "Media siyosati", ru: "Медиа-политика", en: "Media policy" },
      archive: { oz: "Arxiv", ru: "Архив", en: "Archive" }
    };

    return t(labels[key] || { oz: key, ru: key, en: key });
  }

  function mediaTypeLabel(key) {
    const labels = {
      all: { oz: "Barchasi", ru: "Все", en: "All" },
      photo: { oz: "Foto", ru: "Фото", en: "Photo" },
      video: { oz: "Video", ru: "Видео", en: "Video" }
    };

    return t(labels[key] || { oz: key, ru: key, en: key });
  }

  function renderSearchOverlay() {
    return `
      <div class="search-overlay" id="search-overlay" hidden>
        <div class="search-overlay__backdrop" data-search-close="true"></div>
        <div class="search-overlay__panel">
          <button class="search-overlay__close" type="button" data-search-close="true" aria-label="Close">×</button>
          <p class="eyebrow">${t(data.pageMeta.search.title)}</p>
          <h2>${t(data.site.title)}</h2>
          <form class="search-form" action="search.html">
            <label class="sr-only" for="portal-search-input">${t(data.ui.searchPlaceholder)}</label>
            <input id="portal-search-input" name="q" type="search" placeholder="${t(data.ui.searchPlaceholder)}" />
            <button class="button button-primary" type="submit">${t(data.ui.searchButton)}</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderHeader() {
    return `
      <header class="site-header">
        <div class="topbar">
          <div class="container topbar__inner">
            <div class="topbar__title">
              <span>${t(data.site.officialLabel)}</span>
              <strong>${t(data.site.subtitle)}</strong>
            </div>
            <div class="topbar__controls">
              <div class="social-mini">
                ${data.site.socials
                  .map(
                    (item) => `
                    <a href="${item.href}" aria-label="${item.label}" class="social-mini__link">${item.short}</a>
                  `
                  )
                  .join("")}
              </div>
              <div class="lang-switcher" aria-label="Language switcher">
                ${data.locales
                  .map(
                    (locale) => `
                    <button class="lang-switcher__button ${state.locale === locale ? "is-active" : ""}" type="button" data-locale="${locale}">
                      ${data.localeLabels[locale]}
                    </button>
                  `
                  )
                  .join("")}
              </div>
              <div class="access-controls">
                <button type="button" class="utility-button" data-scale="sm">A-</button>
                <button type="button" class="utility-button" data-scale="md">A</button>
                <button type="button" class="utility-button" data-scale="lg">A+</button>
                <button type="button" class="utility-button ${state.contrast === "on" ? "is-active" : ""}" data-contrast="toggle">
                  ${t(data.ui.contrast || { oz: "Kontrast", ru: "Контраст", en: "Contrast" })}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mainbar">
          <div class="container mainbar__inner">
            <a class="brand" href="index.html" aria-label="${t(data.site.title)}">
              <img src="${data.site.logo}" alt="${t(data.site.title)}" />
              <div class="brand__text">
                <span>${t(data.site.accentLabel)}</span>
                <strong>${t(data.site.title)}</strong>
              </div>
            </a>
            <button class="mobile-toggle" type="button" aria-expanded="false" data-mobile-toggle="true">Menu</button>
            <nav class="nav-panel" id="site-nav">
              ${data.navigation
                .map(
                  (item) => `
                  <a class="nav-link ${activeNavKey() === item.key ? "is-active" : ""}" href="${item.href}">${t(item.label)}</a>
                `
                )
                .join("")}
              <div class="nav-panel__actions">
                ${data.site.utilityLinks
                  .map(
                    (item) => `
                    <a class="button button-secondary" href="${item.href}">${t(item.label)}</a>
                  `
                  )
                  .join("")}
                <button class="button button-primary" type="button" data-search-open="true">${t(data.ui.searchButton)}</button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <p class="eyebrow">${t(data.site.officialLabel)}</p>
            <h2>${t(data.site.title)}</h2>
            <p>${t(data.site.subtitle)}</p>
          </div>
          <div class="footer-column">
            <h3>${t(data.ui.sitemap || { oz: "Sayt xaritasi", ru: "Карта сайта", en: "Sitemap" })}</h3>
            ${data.navigation
              .map((item) => `<a href="${item.href}">${t(item.label)}</a>`)
              .join("")}
          </div>
          <div class="footer-column">
            <h3>${t(data.pageMeta.contacts.title)}</h3>
            ${data.site.contactCards
              .map(
                (card) => `
                <div class="footer-contact">
                  <strong>${t(card.title)}</strong>
                  ${card.lines[state.locale].map((line) => `<span>${line}</span>`).join("")}
                </div>
              `
              )
              .join("")}
          </div>
          <div class="footer-column">
            <h3>${t(data.pageMeta.documents.title)}</h3>
            ${data.serviceLinks.map((item) => `<a href="${item.href}">${t(item.label)}</a>`).join("")}
          </div>
        </div>
      </footer>
    `;
  }

  function renderPageBanner(key, titleOverride, leadOverride) {
    const meta = pageMeta(key);
    const title = titleOverride || t(meta.title);
    const lead = leadOverride || t(meta.lead);

    return `
      <section class="page-banner">
        <div class="container">
          ${breadcrumbTrail(title)}
          <p class="eyebrow">${t(data.site.officialLabel)}</p>
          <h1>${title}</h1>
          <p class="page-banner__lead">${lead}</p>
        </div>
      </section>
    `;
  }

  function renderPage() {
    switch (page) {
      case "home":
        return renderHomePage();
      case "about":
        return renderAboutPage();
      case "events":
        return renderEventsPage();
      case "story":
        return renderStoryPage();
      case "documents":
        return renderDocumentsPage();
      case "document-detail":
        return renderDocumentDetailPage();
      case "organization":
        return renderOrganizationPage();
      case "media":
        return renderMediaPage();
      case "gallery":
        return renderGalleryPage();
      case "contacts":
        return renderContactsPage();
      case "search":
        return renderSearchPage();
      default:
        return render404Page();
    }
  }

  function renderStoryCard(item, options = {}) {
    const compact = options.compact ? "story-card--compact" : "";
    return `
      <article class="story-card ${compact}" data-card data-category="${item.category}" data-search="${`${t(item.title)} ${t(item.summary)}`.toLowerCase()}">
        ${visual(item.theme, formatDate(item.date))}
        <div class="story-card__body">
          <div class="meta-row">
            <span class="pill">${categoryLabel(item.category)}</span>
            <time datetime="${item.date}">${formatDate(item.date)}</time>
          </div>
          <h3>${t(item.title)}</h3>
          <p>${t(item.summary)}</p>
          <a class="text-link" href="story.html?slug=${item.slug}">${t(data.ui.details)}</a>
        </div>
      </article>
    `;
  }

  function renderDocumentRow(item) {
    return `
      <article class="document-row" data-card data-category="${item.type}" data-search="${`${t(item.title)} ${t(item.summary)} ${item.number}`.toLowerCase()}">
        <div class="document-row__visual theme-${item.type}">
          <span>${item.number}</span>
        </div>
        <div class="document-row__body">
          <div class="meta-row">
            <span class="pill">${documentTypeLabel(item.type)}</span>
            <time datetime="${item.date}">${formatDate(item.date)}</time>
          </div>
          <h3>${t(item.title)}</h3>
          <p>${t(item.summary)}</p>
        </div>
        <div class="document-row__actions">
          <a class="button button-secondary" href="document-detail.html?slug=${item.slug}">${t(data.ui.details)}</a>
        </div>
      </article>
    `;
  }

  function renderMediaCard(item) {
    return `
      <article class="media-card" data-card data-category="${item.type}" data-search="${`${t(item.title)} ${t(item.summary)}`.toLowerCase()}">
        ${visual(item.theme, item.type === "video" ? item.duration : `${item.count}`)}
        <div class="media-card__body">
          <div class="meta-row">
            <span class="pill">${mediaTypeLabel(item.type)}</span>
            <time datetime="${item.date}">${formatDate(item.date)}</time>
          </div>
          <h3>${t(item.title)}</h3>
          <p>${t(item.summary)}</p>
          <a class="text-link" href="gallery.html?slug=${item.slug}">${t(data.ui.details)}</a>
        </div>
      </article>
    `;
  }

  function renderHomePage() {
    return `
      <section class="hero">
        <div class="container hero__inner">
          <div class="hero-copy">
            <p class="eyebrow">${t(data.site.officialLabel)}</p>
            <h1>${t(data.site.title)}</h1>
            <p>${t(data.pageMeta.home.lead)}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="about.html">${t(data.pageMeta.about.title)}</a>
              <button class="button button-secondary" type="button" data-search-open="true">${t(data.ui.searchButton)}</button>
            </div>
            <div class="stats-grid">
              ${data.site.quickStats
                .map(
                  (item) => `
                  <div class="stat-card">
                    <strong>${item.value}</strong>
                    <span>${t(item.label)}</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
          <div class="hero-stage">
            <img class="hero-stage__logo" src="${data.site.logo}" alt="${t(data.site.title)}" />
            ${data.heroSlides
              .map(
                (item, index) => `
                <article class="hero-slide ${index === 0 ? "is-active" : ""}" data-slide="${index}">
                  ${visual(item.theme, t(item.kicker))}
                  <div class="hero-slide__body">
                    <time datetime="${item.date}">${formatDate(item.date)}</time>
                    <h2>${t(item.title)}</h2>
                    <p>${t(item.summary)}</p>
                    <a class="text-link" href="story.html?slug=${item.slug}">${t(data.ui.details)}</a>
                  </div>
                </article>
              `
              )
              .join("")}
            <div class="hero-nav">
              <button type="button" class="hero-control" data-slide-dir="-1">‹</button>
              <div class="hero-dots">
                ${data.heroSlides
                  .map(
                    (_item, index) => `
                    <button type="button" class="hero-dot ${index === 0 ? "is-active" : ""}" data-slide-to="${index}"></button>
                  `
                  )
                  .join("")}
              </div>
              <button type="button" class="hero-control" data-slide-dir="1">›</button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHeading(t(data.pageMeta.events.title), t(data.pageMeta.events.lead), "events.html", t(data.ui.allNews))}
          <div class="story-grid">
            ${data.news.slice(0, 6).map((item) => renderStoryCard(item, { compact: true })).join("")}
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container social-layout">
          <div>
            <p class="eyebrow">${t(data.homeSections.socialLead.title)}</p>
            <h2>${t(data.homeSections.socialLead.title)}</h2>
            <p class="section-copy">${t(data.homeSections.socialLead.text)}</p>
          </div>
          <div class="social-grid">
            ${data.site.socials
              .map(
                (item) => `
                <a class="social-card" href="${item.href}">
                  <span>${item.short}</span>
                  <strong>${item.label}</strong>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHeading(t(data.site.accentLabel), t(data.pageMeta.about.lead))}
          <div class="collection-grid">
            ${data.collections
              .map(
                (item) => `
                <a class="collection-card" href="${item.href}">
                  ${visual(item.theme, `${item.count}`)}
                  <h3>${t(item.title)}</h3>
                  <p>${t(item.summary)}</p>
                </a>
              `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-appeal">
        <div class="container appeal-grid">
          <div>
            <p class="eyebrow">${t(data.pageMeta.contacts.title)}</p>
            <h2>${t(data.homeSections.appealBlock.title)}</h2>
            <p>${t(data.homeSections.appealBlock.text)}</p>
            <ul class="plain-list">
              ${data.homeSections.appealBlock.points[state.locale].map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="notice-card">
            <strong>${t(data.ui.sendAppeal)}</strong>
            <p>${t(data.contacts.address)}</p>
            <a class="button button-primary" href="contacts.html">${t(data.ui.sendAppeal)}</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHeading(t(data.pageMeta.media.title), t(data.pageMeta.media.lead), "media.html", t(data.ui.allMedia))}
          <div class="media-grid">
            ${data.albums.map((item) => renderMediaCard(item)).join("")}
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container">
          ${sectionHeading(t(data.homeSections.roadmap.title), t(data.pageMeta.home.lead))}
          <div class="roadmap-grid">
            ${data.homeSections.roadmap.stages
              .map(
                (item) => `
                <article class="roadmap-card">
                  <h3>${t(item.title)}</h3>
                  <p>${t(item.text)}</p>
                </article>
              `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderAboutPage() {
    return `
      ${renderPageBanner("about")}
      <section class="section">
        <div class="container page-grid">
          <aside class="side-nav">
            <p class="eyebrow">${t(data.about.intro.eyebrow)}</p>
            ${data.about.sideNav.map((item) => `<a href="#${item.id}">${t(item.label)}</a>`).join("")}
          </aside>
          <div class="content-stack">
            <div class="feature-panel">
              <p class="eyebrow">${t(data.about.intro.eyebrow)}</p>
              <h2>${t(data.about.intro.title)}</h2>
              <p>${t(data.about.intro.text)}</p>
            </div>
            ${data.about.sections
              .map(
                (item) => `
                <section class="content-section" id="${item.id}">
                  <h3>${t(item.title)}</h3>
                  ${item.paragraphs[state.locale].map((paragraph) => `<p>${paragraph}</p>`).join("")}
                </section>
              `
              )
              .join("")}
            <section class="content-section">
              <h3>${t({ oz: "Asosiy bosqichlar", ru: "Ключевые этапы", en: "Key milestones" })}</h3>
              <div class="timeline">
                ${data.about.milestones
                  .map(
                    (item) => `
                    <article class="timeline-item">
                      <span>${item.year}</span>
                      <div>
                        <h4>${t(item.title)}</h4>
                        <p>${t(item.text)}</p>
                      </div>
                    </article>
                  `
                  )
                  .join("")}
              </div>
            </section>
            <section class="content-section">
              <h3>${t({ oz: "Natijalar va ko'rsatkichlar", ru: "Результаты и показатели", en: "Results and indicators" })}</h3>
              <div class="stats-grid">
                ${data.about.achievements
                  .map(
                    (item) => `
                    <div class="stat-card">
                      <strong>${item.value}</strong>
                      <span>${t(item.label)}</span>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </section>
          </div>
        </div>
      </section>
    `;
  }

  function renderEventsPage() {
    return `
      ${renderPageBanner("events")}
      <section class="section">
        <div class="container">
          <div class="filter-shell">
            <div class="filter-head">
              <h2>${t({ oz: "Tadbirlar lentasi", ru: "Лента мероприятий", en: "Event stream" })}</h2>
              <input class="search-inline" type="search" placeholder="${t(data.ui.searchPlaceholder)}" data-inline-search="#events-list" />
            </div>
            <div class="chip-row" data-filter-group data-target="#events-list" data-empty="#events-empty">
              ${["all", "news", "meetings", "regions", "international", "speeches", "appeals"]
                .map(
                  (item, index) => `
                  <button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-filter="${item}">
                    ${categoryLabel(item)}
                  </button>
                `
                )
                .join("")}
            </div>
          </div>
          <div class="feature-grid">
            <article class="feature-story">
              ${visual(data.news[0].theme, formatDate(data.news[0].date))}
              <div>
                <p class="eyebrow">${t({ oz: "Markaziy yangilik", ru: "Ключевая новость", en: "Featured story" })}</p>
                <h2>${t(data.news[0].title)}</h2>
                <p>${t(data.news[0].summary)}</p>
                <a class="button button-primary" href="story.html?slug=${data.news[0].slug}">${t(data.ui.readMore || { oz: "Davomini o'qish", ru: "Читать далее", en: "Read more" })}</a>
              </div>
            </article>
            <div class="calendar-card">
              <p class="eyebrow">${t({ oz: "Tezkor ko'rinish", ru: "Быстрый обзор", en: "Quick overview" })}</p>
              <ul class="plain-list">
                ${data.news.slice(0, 4).map((item) => `<li><strong>${formatDate(item.date)}</strong> ${t(item.title)}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="story-grid" id="events-list">
            ${data.news.map((item) => renderStoryCard(item)).join("")}
          </div>
          <p class="empty-state" id="events-empty" hidden>${t(data.ui.noResults || { oz: "So'rov bo'yicha hech narsa topilmadi.", ru: "По запросу ничего не найдено.", en: "Nothing was found for your query." })}</p>
        </div>
      </section>
    `;
  }

  function renderStoryPage() {
    const slug = params().get("slug");
    const story = data.news.find((item) => item.slug === slug) || data.news[0];

    return `
      ${renderPageBanner("events", t(story.title), t(story.summary))}
      <section class="section">
        <div class="container detail-layout">
          <article class="detail-article">
            <div class="detail-header">
              <span class="pill">${categoryLabel(story.category)}</span>
              <time datetime="${story.date}">${formatDate(story.date)}</time>
            </div>
            ${visual(story.theme, t(story.title))}
            ${story.content[state.locale].map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <blockquote>${t(story.quote)}</blockquote>
            <div class="facts-row">
              ${story.facts.map((fact) => `<span>${fact}</span>`).join("")}
            </div>
          </article>
          <aside class="detail-sidebar">
            <div class="share-card">
              <h3>${t(data.ui.share || { oz: "Ulashish", ru: "Поделиться", en: "Share" })}</h3>
              <a href="mailto:?subject=${encodeURIComponent(t(story.title))}" class="text-link">Email</a>
              <a href="search.html?q=${encodeURIComponent(t(story.title))}" class="text-link">${t(data.ui.searchButton)}</a>
            </div>
            <div class="related-card">
              <h3>${t(data.ui.related || { oz: "Bog'liq materiallar", ru: "Похожие материалы", en: "Related materials" })}</h3>
              ${data.news
                .filter((item) => item.slug !== story.slug)
                .slice(0, 3)
                .map((item) => `<a href="story.html?slug=${item.slug}">${t(item.title)}</a>`)
                .join("")}
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderDocumentsPage() {
    return `
      ${renderPageBanner("documents")}
      <section class="section">
        <div class="container">
          <div class="filter-shell">
            <div class="filter-head">
              <h2>${t({ oz: "Hujjatlar arxivi", ru: "Архив документов", en: "Document archive" })}</h2>
              <input class="search-inline" type="search" placeholder="${t(data.ui.searchPlaceholder)}" data-inline-search="#documents-list" />
            </div>
            <div class="chip-row" data-filter-group data-target="#documents-list" data-empty="#documents-empty">
              ${["all", "decree", "order", "program", "initiative", "archive"]
                .map(
                  (item, index) => `
                  <button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-filter="${item}">
                    ${documentTypeLabel(item)}
                  </button>
                `
                )
                .join("")}
            </div>
          </div>
          <div class="document-list" id="documents-list">
            ${data.documents.map((item) => renderDocumentRow(item)).join("")}
          </div>
          <p class="empty-state" id="documents-empty" hidden>${t(data.ui.noResults || { oz: "So'rov bo'yicha hech narsa topilmadi.", ru: "По запросу ничего не найдено.", en: "Nothing was found for your query." })}</p>
        </div>
      </section>
    `;
  }

  function renderDocumentDetailPage() {
    const slug = params().get("slug");
    const documentItem = data.documents.find((item) => item.slug === slug) || data.documents[0];

    return `
      ${renderPageBanner("documents", t(documentItem.title), t(documentItem.summary))}
      <section class="section">
        <div class="container detail-layout">
          <article class="detail-article">
            <div class="detail-header">
              <span class="pill">${documentTypeLabel(documentItem.type)}</span>
              <span>${documentItem.number}</span>
              <time datetime="${documentItem.date}">${formatDate(documentItem.date)}</time>
            </div>
            ${documentItem.body[state.locale].map((paragraph) => `<p>${paragraph}</p>`).join("")}
            <div class="document-download">
              <a class="button button-primary" href="documents.html">${t(data.ui.allDocuments)}</a>
            </div>
          </article>
          <aside class="detail-sidebar">
            <div class="related-card">
              <h3>${t(data.ui.related || { oz: "Bog'liq materiallar", ru: "Похожие материалы", en: "Related materials" })}</h3>
              ${data.documents
                .filter((item) => item.slug !== documentItem.slug)
                .slice(0, 3)
                .map((item) => `<a href="document-detail.html?slug=${item.slug}">${t(item.title)}</a>`)
                .join("")}
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderOrganizationPage() {
    return `
      ${renderPageBanner("organization")}
      <section class="section">
        <div class="container content-stack">
          <div class="feature-panel">
            <p class="eyebrow">${t({ oz: "Boshqaruv modeli", ru: "Модель управления", en: "Governance model" })}</p>
            <h2>${t({ oz: "Qo'mita, kotibiyat va hududiy koordinatsiya yagona konturda", ru: "Комитет, секретариат и региональная координация в едином контуре", en: "Committee, secretariat and regional coordination in one operating loop" })}</h2>
            <p>${t({ oz: "Portal kelajakdagi CMS rollari uchun ham aynan shu boshqaruv mantiqini aks ettiradi.", ru: "Портал отражает ту же логику управления, которая затем может быть перенесена в роли будущей CMS.", en: "The portal mirrors the same governance logic that can later be transferred into future CMS roles." })}</p>
          </div>
          <div class="leader-grid">
            ${data.leaders
              .map(
                (item) => `
                <article class="person-card">
                  ${visual(item.theme, item.name)}
                  <h3>${item.name}</h3>
                  <p class="person-card__role">${t(item.role)}</p>
                  <p>${t(item.bio)}</p>
                </article>
              `
              )
              .join("")}
          </div>
          <div class="org-grid">
            ${data.organizations
              .map(
                (item) => `
                <article class="org-card">
                  ${visual(item.theme, t(item.name))}
                  <h3>${t(item.name)}</h3>
                  <p>${t(item.scope)}</p>
                </article>
              `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderMediaPage() {
    return `
      ${renderPageBanner("media")}
      <section class="section">
        <div class="container">
          <div class="filter-shell">
            <div class="filter-head">
              <h2>${t({ oz: "Foto va video arxivi", ru: "Фото- и видеоархив", en: "Photo and video archive" })}</h2>
              <input class="search-inline" type="search" placeholder="${t(data.ui.searchPlaceholder)}" data-inline-search="#media-list" />
            </div>
            <div class="chip-row" data-filter-group data-target="#media-list" data-empty="#media-empty">
              ${["all", "photo", "video"]
                .map(
                  (item, index) => `
                  <button class="chip ${index === 0 ? "is-active" : ""}" type="button" data-filter="${item}">
                    ${mediaTypeLabel(item)}
                  </button>
                `
                )
                .join("")}
            </div>
          </div>
          <div class="media-grid" id="media-list">
            ${data.albums.map((item) => renderMediaCard(item)).join("")}
          </div>
          <p class="empty-state" id="media-empty" hidden>${t(data.ui.noResults || { oz: "So'rov bo'yicha hech narsa topilmadi.", ru: "По запросу ничего не найдено.", en: "Nothing was found for your query." })}</p>
        </div>
      </section>
    `;
  }

  function renderGalleryPage() {
    const slug = params().get("slug");
    const album = data.albums.find((item) => item.slug === slug) || data.albums[0];

    return `
      ${renderPageBanner("media", t(album.title), t(album.summary))}
      <section class="section">
        <div class="container detail-layout">
          <article class="detail-article">
            <div class="detail-header">
              <span class="pill">${mediaTypeLabel(album.type)}</span>
              <time datetime="${album.date}">${formatDate(album.date)}</time>
              <span>${album.type === "photo" ? `${album.count} items` : album.duration}</span>
            </div>
            <div class="gallery-grid">
              ${album.frames
                .map(
                  (item) => `
                  <div class="gallery-frame theme-${album.theme}">
                    <span>${item}</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </article>
          <aside class="detail-sidebar">
            <div class="related-card">
              <h3>${t(data.ui.related || { oz: "Bog'liq materiallar", ru: "Похожие материалы", en: "Related materials" })}</h3>
              ${data.albums
                .filter((item) => item.slug !== album.slug)
                .map((item) => `<a href="gallery.html?slug=${item.slug}">${t(item.title)}</a>`)
                .join("")}
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderContactsPage() {
    return `
      ${renderPageBanner("contacts")}
      <section class="section">
        <div class="container contacts-layout">
          <div class="contact-info-grid">
            ${data.site.contactCards
              .map(
                (card) => `
                <article class="contact-card">
                  <h3>${t(card.title)}</h3>
                  ${card.lines[state.locale].map((line) => `<p>${line}</p>`).join("")}
                </article>
              `
              )
              .join("")}
          </div>
          <div class="map-card">
            <p class="eyebrow">${t({ oz: "Joylashuv", ru: "Местоположение", en: "Location" })}</p>
            <h2>${t(data.contacts.address)}</h2>
            <p>${t(data.contacts.reception)}</p>
            <a class="button button-secondary" href="${data.contacts.mapHref}" target="_blank" rel="noreferrer">${t({ oz: "Xaritani ochish", ru: "Открыть карту", en: "Open map" })}</a>
          </div>
        </div>
      </section>

      <section class="section section-soft">
        <div class="container form-layout">
          <div>
            <p class="eyebrow">${t(data.ui.sendAppeal)}</p>
            <h2>${t({ oz: "Portal orqali murojaat yuborish", ru: "Отправить обращение по порталу", en: "Submit a portal feedback request" })}</h2>
            <p>${t({ oz: "Ushbu prototipda forma orqali yuborilgan xabar brauzerda mahalliy tarzda saqlanadi. Production versiyada ma'lumotlar CMS va email kanaliga yuboriladi.", ru: "В этом прототипе сообщение формы сохраняется локально в браузере. В production-версии данные будут уходить в CMS и на e-mail.", en: "In this prototype, the form message is stored locally in the browser. In production, it will be sent to the CMS and email workflow." })}</p>
            <div class="saved-counter" id="saved-counter"></div>
          </div>
          <form class="feedback-form" id="feedback-form">
            <div class="form-grid">
              <label>
                <span>${t({ oz: "Ism", ru: "Имя", en: "First name" })}</span>
                <input name="firstName" type="text" required />
              </label>
              <label>
                <span>${t({ oz: "Familiya", ru: "Фамилия", en: "Last name" })}</span>
                <input name="lastName" type="text" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" required />
              </label>
              <label>
                <span>${t({ oz: "Hudud", ru: "Город / регион", en: "City / region" })}</span>
                <input name="region" type="text" required />
              </label>
              <label>
                <span>${t({ oz: "Mavzu", ru: "Тема", en: "Topic" })}</span>
                <select name="topic">
                  ${data.contacts.formTopics.map((item) => `<option value="${item.value}">${t(item.label)}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>${t({ oz: "Fayl", ru: "Файл", en: "Attachment" })}</span>
                <input name="attachment" type="file" accept=".jpg,.png,.pdf" />
              </label>
            </div>
            <label>
              <span>${t({ oz: "Xabar matni", ru: "Текст сообщения", en: "Message" })}</span>
              <textarea name="message" rows="6" required></textarea>
            </label>
            <label class="consent">
              <input type="checkbox" name="consent" required />
              <span>${t({ oz: "Shaxsiy ma'lumotlarni qayta ishlashga roziman", ru: "Согласен на обработку персональных данных", en: "I agree to the processing of personal data" })}</span>
            </label>
            <div class="form-actions">
              <button class="button button-primary" type="submit">${t(data.ui.sendAppeal)}</button>
              <button class="button button-secondary" type="reset">${t(data.ui.reset)}</button>
            </div>
            <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>
      </section>
    `;
  }

  function buildSearchRecords() {
    const aboutText = data.about.sections.flatMap((section) => section.paragraphs[state.locale]).join(" ");
    const pageRecords = [
      {
        type: t(data.pageMeta.about.title),
        href: "about.html",
        title: t(data.about.intro.title),
        summary: aboutText
      },
      {
        type: t(data.pageMeta.organization.title),
        href: "organization.html",
        title: t(data.pageMeta.organization.title),
        summary: data.leaders.map((item) => `${item.name} ${t(item.role)}`).join(" ")
      },
      {
        type: t(data.pageMeta.contacts.title),
        href: "contacts.html",
        title: t(data.pageMeta.contacts.title),
        summary: t(data.contacts.address)
      }
    ];

    return [
      ...pageRecords,
      ...data.news.map((item) => ({
        type: t(data.pageMeta.events.title),
        href: `story.html?slug=${item.slug}`,
        title: t(item.title),
        summary: `${t(item.summary)} ${item.content[state.locale].join(" ")}`
      })),
      ...data.documents.map((item) => ({
        type: t(data.pageMeta.documents.title),
        href: `document-detail.html?slug=${item.slug}`,
        title: t(item.title),
        summary: `${t(item.summary)} ${item.body[state.locale].join(" ")} ${item.number}`
      })),
      ...data.albums.map((item) => ({
        type: t(data.pageMeta.media.title),
        href: `gallery.html?slug=${item.slug}`,
        title: t(item.title),
        summary: `${t(item.summary)} ${item.frames.join(" ")}`
      }))
    ];
  }

  function renderSearchPage() {
    const query = (params().get("q") || "").trim().toLowerCase();
    const safeQuery = escapeHtml(query);
    const results = query
      ? buildSearchRecords().filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(query))
      : [];

    return `
      ${renderPageBanner("search", t(data.pageMeta.search.title), query ? `"${safeQuery}"` : t(data.pageMeta.search.lead))}
      <section class="section">
        <div class="container">
          <form class="search-form search-form--inline" action="search.html">
            <input name="q" type="search" value="${safeQuery}" placeholder="${t(data.ui.searchPlaceholder)}" />
            <button class="button button-primary" type="submit">${t(data.ui.searchButton)}</button>
          </form>
          <div class="search-summary">${query ? `${results.length}` : "0"} ${t({ oz: "natija", ru: "результатов", en: "results" })}</div>
          <div class="search-results">
            ${results.length
              ? results
                  .map(
                    (item) => `
                    <article class="search-result">
                      <span class="pill">${item.type}</span>
                      <h3><a href="${item.href}">${item.title}</a></h3>
                      <p>${item.summary}</p>
                    </article>
                  `
                  )
                  .join("")
              : `<p class="empty-state">${t(data.ui.noResults || { oz: "So'rov bo'yicha hech narsa topilmadi.", ru: "По запросу ничего не найдено.", en: "Nothing was found for your query." })}</p>`}
          </div>
        </div>
      </section>
    `;
  }

  function render404Page() {
    return `
      <section class="page-banner">
        <div class="container error-state">
          <p class="eyebrow">404</p>
          <h1>${t({ oz: "Sahifa topilmadi", ru: "Страница не найдена", en: "Page not found" })}</h1>
          <p>${t({ oz: "So'ralgan sahifa ko'chirilgan yoki hali tayyor emas.", ru: "Запрошенная страница была перемещена или ещё не подготовлена.", en: "The requested page has been moved or is not ready yet." })}</p>
          <a class="button button-primary" href="index.html">${t(data.pageMeta.home.title)}</a>
        </div>
      </section>
    `;
  }

  function applyPreferences() {
    document.documentElement.lang = localeMap[state.locale] || "ru";
    document.body.classList.remove("scale-sm", "scale-md", "scale-lg");
    document.body.classList.add(`scale-${state.fontScale}`);
    document.body.classList.toggle("accessibility-mode", state.contrast === "on");
    const title = page === "home" ? t(data.site.title) : `${t(pageMeta(routeParent[page] || "home").title)} | ${t(data.site.title)}`;
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t(pageMeta(routeParent[page] || "home").lead));
    }
  }

  function setupHeroSlider() {
    const slides = Array.from(document.querySelectorAll("[data-slide]"));
    const dots = Array.from(document.querySelectorAll("[data-slide-to]"));
    const controls = Array.from(document.querySelectorAll("[data-slide-dir]"));
    if (!slides.length) {
      return;
    }

    let current = 0;

    function setSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === current));
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === current));
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => setSlide(Number(dot.dataset.slideTo)));
    });

    controls.forEach((control) => {
      control.addEventListener("click", () => setSlide(current + Number(control.dataset.slideDir)));
    });

    if (state.sliderTimer) {
      clearInterval(state.sliderTimer);
    }

    state.sliderTimer = setInterval(() => setSlide(current + 1), 6500);
  }

  function setupFilterGroups() {
    document.querySelectorAll("[data-filter-group]").forEach((group) => {
      const target = document.querySelector(group.dataset.target);
      const empty = document.querySelector(group.dataset.empty);
      const buttons = Array.from(group.querySelectorAll("[data-filter]"));
      const searchInput = group.parentElement.querySelector("[data-inline-search]");

      if (!target) {
        return;
      }

      const cards = Array.from(target.querySelectorAll("[data-card]"));

      function applyFilters() {
        const active = group.querySelector(".is-active")?.dataset.filter || "all";
        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
        let visibleCount = 0;

        cards.forEach((card) => {
          const category = card.dataset.category || "";
          const searchable = card.dataset.search || "";
          const matchesCategory = active === "all" || category === active;
          const matchesQuery = !query || searchable.includes(query);
          const visible = matchesCategory && matchesQuery;
          card.hidden = !visible;
          if (visible) {
            visibleCount += 1;
          }
        });

        if (empty) {
          empty.hidden = visibleCount > 0;
        }
      }

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((item) => item.classList.remove("is-active"));
          button.classList.add("is-active");
          applyFilters();
        });
      });

      if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
      }

      applyFilters();
    });
  }

  function setupSearchOverlay() {
    const overlay = document.getElementById("search-overlay");
    if (!overlay) {
      return;
    }

    document.querySelectorAll("[data-search-open]").forEach((button) => {
      button.addEventListener("click", () => {
        overlay.hidden = false;
        const input = overlay.querySelector("input");
        if (input) {
          input.focus();
        }
      });
    });

    overlay.querySelectorAll("[data-search-close]").forEach((button) => {
      button.addEventListener("click", () => {
        overlay.hidden = true;
      });
    });
  }

  function setupControls() {
    document.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", () => {
        state.locale = button.dataset.locale;
        setStoredValue("festival-locale", state.locale);
        render();
      });
    });

    document.querySelectorAll("[data-scale]").forEach((button) => {
      button.addEventListener("click", () => {
        state.fontScale = button.dataset.scale;
        setStoredValue("festival-font-scale", state.fontScale);
        render();
      });
    });

    document.querySelectorAll("[data-contrast]").forEach((button) => {
      button.addEventListener("click", () => {
        state.contrast = state.contrast === "on" ? "off" : "on";
        setStoredValue("festival-contrast", state.contrast);
        render();
      });
    });

    const mobileToggle = document.querySelector("[data-mobile-toggle]");
    const nav = document.getElementById("site-nav");
    if (mobileToggle && nav) {
      mobileToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function setupFeedbackForm() {
    const form = document.getElementById("feedback-form");
    if (!form) {
      return;
    }

    const status = document.getElementById("form-status");
    const counter = document.getElementById("saved-counter");
    const storageKey = "festival-feedback";

    function readEntries() {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || "[]");
      } catch (error) {
        return [];
      }
    }

    function updateCounter() {
      const entries = readEntries();
      if (counter) {
        counter.textContent = `${entries.length} ${t({ oz: "ta xabar saqlandi", ru: "сообщений сохранено", en: "messages saved locally" })}`;
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const fileInput = form.querySelector('input[name="attachment"]');
      const entry = {
        createdAt: new Date().toISOString(),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        region: formData.get("region"),
        topic: formData.get("topic"),
        message: formData.get("message"),
        attachment: fileInput && fileInput.files[0] ? fileInput.files[0].name : ""
      };

      const entries = readEntries();
      entries.unshift(entry);
      localStorage.setItem(storageKey, JSON.stringify(entries));
      form.reset();
      if (status) {
        status.textContent = t(data.ui.savedNotice || {
          oz: "Arizangiz prototipda mahalliy saqlandi.",
          ru: "Ваше сообщение сохранено локально в прототипе.",
          en: "Your message has been saved locally in this prototype."
        });
      }
      updateCounter();
    });

    updateCounter();
  }

  function render() {
    applyPreferences();
    app.innerHTML = `
      ${renderSearchOverlay()}
      ${renderHeader()}
      <main id="main-content" class="site-main">${renderPage()}</main>
      ${renderFooter()}
    `;
    setupControls();
    setupHeroSlider();
    setupFilterGroups();
    setupSearchOverlay();
    setupFeedbackForm();
  }

  render();
})();
