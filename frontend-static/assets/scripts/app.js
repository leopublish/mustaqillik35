(() => {
  const data = window.portalData;
  const root = document.getElementById("app");
  const pageKey = document.body.dataset.page || "home";

  if (!data || !root) {
    return;
  }

  const PAGE_PATHS = {
    home: "index.html",
    about: "about.html",
    events: "events.html",
    documents: "documents.html",
    organization: "organization.html",
    media: "media.html",
    contacts: "contacts.html",
    search: "search.html",
    privacy: "privacy.html",
    terms: "terms.html",
    accessibility: "accessibility.html",
    sitemap: "sitemap.html",
    notfound: "404.html"
  };

  const LOCALE_MAP = {
    uz: "oz",
    oz: "oz",
    ru: "ru",
    en: "en"
  };

  const COPY = {
    uz: {
      skipToContent: "Asosiy tarkibga o'tish",
      menu: "Menyu",
      mainNavigation: "Asosiy navigatsiya",
      portalSearch: "Portal bo'yicha qidiruv",
      language: "Til",
      exploreProgram: "Dastur bilan tanishing",
      officialContacts: "Rasmiy kontaktlar",
      thematicCollections: "Asosiy yo'nalishlar",
      latestNews: "So'nggi yangiliklar",
      latestNewsLead: "Festivalning asosiy voqealari, qarorlar va tashkiliy yangilanishlari.",
      roadmapTitle: "Bosh dastur yo'l xaritasi",
      roadmapLead: "Portal kontenti, hududiy dasturlar va final hafta bir tizimda boshqariladi.",
      documentsLead: "Normativ baza, reglamentlar va metodik materiallar yagona arxivga jamlangan.",
      mediaLead: "Fotoalbomlar, videobriefinglar va rasmiy vizual materiallar bir markazda.",
      socialLead: "Tasdiqlangan kanallar",
      contactsLead: "Matbuot, fuqarolar va hamkorlar uchun yagona aloqa nuqtasi.",
      viewAllResults: "Barchasini ko'rish",
      backToList: "Ro'yxatga qaytish",
      relatedMaterials: "Tegishli materiallar",
      keyFacts: "Asosiy faktlar",
      filters: "Filtrlar",
      allCategories: "Barcha yo'nalishlar",
      allTypes: "Barcha turlar",
      resultsFound: "Natijalar topildi",
      noResults: "Hech narsa topilmadi",
      noResultsLead: "So'rov yoki filtrlarni o'zgartirib ko'ring.",
      leadership: "Rahbariyat",
      responsibleBodies: "Mas'ul tuzilmalar",
      governanceModel: "Boshqaruv modeli",
      historicalTimeline: "Tarixiy yo'nalish",
      expectedResults: "Kutilayotgan natijalar",
      address: "Manzil",
      receptionHours: "Qabul vaqti",
      formTitle: "Murojaat yuborish",
      formLead: "Umumiy savollar, media so'rovlari va texnik xabarlar shu forma orqali qabul qilinadi.",
      name: "Ism va familiya",
      phone: "Telefon",
      email: "Email",
      subject: "Mavzu",
      topic: "Mavzu turi",
      message: "Xabar",
      consent: "Shaxsiy ma'lumotlarni qayta ishlashga roziman",
      send: "Yuborish",
      formSuccess: "Murojaat demo rejimida qabul qilindi. Keyingi bosqichda forma CMS/API bilan ulanadi.",
      formError: "Majburiy maydonlarni to'ldiring va rozilikni tasdiqlang.",
      externalService: "Rasmiy tashqi xizmat",
      externalServiceLead: "Yuridik ahamiyatga ega murojaatlar uchun alohida davlat xizmati orqali foydalaniladi.",
      searchLead: "Yangiliklar, hujjatlar, media va tashkilotlar bo'yicha qidiruv.",
      searchTip: "Masalan: forum, media, regulation",
      nothingYet: "So'rov kiriting yoki asosiy bo'limlardan birini tanlang.",
      pageNotFound: "Sahifa topilmadi",
      pageNotFoundLead: "Manzil o'zgargan bo'lishi yoki sahifa olib tashlangan bo'lishi mumkin.",
      goHome: "Bosh sahifaga qaytish",
      sitemapLead: "Portal bo'limlari va xizmat sahifalarining to'liq xaritasi.",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish qoidalari",
      accessibility: "Foydalanish qulayligi",
      sitemap: "Sayt xaritasi",
      aboutPortal: "Portal haqida",
      servicePages: "Xizmat sahifalari",
      searchPlaceholderWide: "Yangilik, hujjat yoki tashkilot nomini kiriting",
      legalNote: "Mazkur sahifa MVP tarkibidagi servis sahifasidir va keyinchalik CMS orqali kengaytiriladi.",
      exploreSection: "Bo'limga o'tish",
      openMap: "Xaritani ochish",
      detailMode: "Batafsil material",
      searchResultsLead: "Natijalar sarlavha, qisqa tavsif va bog'liq mazmun bo'yicha shakllantiriladi."
    },
    ru: {
      skipToContent: "Перейти к основному содержимому",
      menu: "Меню",
      mainNavigation: "Основная навигация",
      portalSearch: "Поиск по порталу",
      language: "Язык",
      exploreProgram: "Смотреть программу",
      officialContacts: "Официальные контакты",
      thematicCollections: "Ключевые направления",
      latestNews: "Последние новости",
      latestNewsLead: "Главные события фестиваля, решения оргкомитета и редакционные обновления.",
      roadmapTitle: "Дорожная карта программы",
      roadmapLead: "Контент портала, региональные блоки и финальная неделя управляются как единая система.",
      documentsLead: "Нормативная база, регламенты и методические материалы собраны в едином архиве.",
      mediaLead: "Фотоальбомы, видеобрифинги и официальные визуальные материалы в одном разделе.",
      socialLead: "Утверждённые каналы",
      contactsLead: "Единая точка связи для прессы, граждан и партнёров.",
      viewAllResults: "Смотреть все",
      backToList: "Вернуться к списку",
      relatedMaterials: "Связанные материалы",
      keyFacts: "Ключевые факты",
      filters: "Фильтры",
      allCategories: "Все направления",
      allTypes: "Все типы",
      resultsFound: "Найдено результатов",
      noResults: "Ничего не найдено",
      noResultsLead: "Попробуйте изменить запрос или фильтры.",
      leadership: "Руководство",
      responsibleBodies: "Ответственные структуры",
      governanceModel: "Модель управления",
      historicalTimeline: "Историческая линия",
      expectedResults: "Ожидаемые результаты",
      address: "Адрес",
      receptionHours: "Часы приёма",
      formTitle: "Отправить обращение",
      formLead: "Общие вопросы, медиазапросы и технические сообщения принимаются через эту форму.",
      name: "Имя и фамилия",
      phone: "Телефон",
      email: "Email",
      subject: "Тема",
      topic: "Тип обращения",
      message: "Сообщение",
      consent: "Согласен на обработку персональных данных",
      send: "Отправить",
      formSuccess: "Обращение принято в демонстрационном режиме. На следующем этапе форма будет подключена к CMS/API.",
      formError: "Заполните обязательные поля и подтвердите согласие.",
      externalService: "Внешний государственный сервис",
      externalServiceLead: "Для юридически значимых обращений используется отдельный официальный сервис.",
      searchLead: "Поиск по новостям, документам, медиаматериалам и организациям.",
      searchTip: "Например: форум, документ, программа",
      nothingYet: "Введите запрос или выберите один из ключевых разделов.",
      pageNotFound: "Страница не найдена",
      pageNotFoundLead: "Адрес мог измениться или материал был перемещён.",
      goHome: "На главную",
      sitemapLead: "Полная карта разделов и служебных страниц портала.",
      privacy: "Политика конфиденциальности",
      terms: "Правила использования",
      accessibility: "Доступность",
      sitemap: "Карта сайта",
      aboutPortal: "О портале",
      servicePages: "Служебные страницы",
      searchPlaceholderWide: "Введите название новости, документа или организации",
      legalNote: "Эта служебная страница входит в MVP и позже может быть расширена через CMS.",
      exploreSection: "Перейти в раздел",
      openMap: "Открыть карту",
      detailMode: "Детальный материал",
      searchResultsLead: "Результаты формируются по заголовку, краткому описанию и связанному содержанию."
    },
    en: {
      skipToContent: "Skip to main content",
      menu: "Menu",
      mainNavigation: "Primary navigation",
      portalSearch: "Search the portal",
      language: "Language",
      exploreProgram: "Explore the program",
      officialContacts: "Official contacts",
      thematicCollections: "Key tracks",
      latestNews: "Latest updates",
      latestNewsLead: "The main festival milestones, committee decisions and editorial updates.",
      roadmapTitle: "Program roadmap",
      roadmapLead: "Portal content, regional tracks and the final week are managed as one coordinated system.",
      documentsLead: "Regulatory documents, regulations and guidance materials are gathered in a single archive.",
      mediaLead: "Photo albums, video briefings and official visuals live in one section.",
      socialLead: "Approved channels",
      contactsLead: "A single contact point for the press, citizens and partner institutions.",
      viewAllResults: "View all",
      backToList: "Back to list",
      relatedMaterials: "Related materials",
      keyFacts: "Key facts",
      filters: "Filters",
      allCategories: "All tracks",
      allTypes: "All types",
      resultsFound: "Results found",
      noResults: "Nothing found",
      noResultsLead: "Try adjusting the query or filters.",
      leadership: "Leadership",
      responsibleBodies: "Responsible bodies",
      governanceModel: "Governance model",
      historicalTimeline: "Historical timeline",
      expectedResults: "Expected results",
      address: "Address",
      receptionHours: "Reception hours",
      formTitle: "Submit a request",
      formLead: "General questions, media requests and technical messages are accepted through this form.",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      subject: "Subject",
      topic: "Topic",
      message: "Message",
      consent: "I agree to the processing of personal data",
      send: "Send",
      formSuccess: "Your request has been accepted in demo mode. The next phase will connect this form to CMS/API services.",
      formError: "Complete the required fields and confirm consent.",
      externalService: "Official external service",
      externalServiceLead: "A separate state service is used for legally significant appeals.",
      searchLead: "Search across news, documents, media materials and institutions.",
      searchTip: "For example: forum, media, regulation",
      nothingYet: "Enter a query or choose one of the key sections.",
      pageNotFound: "Page not found",
      pageNotFoundLead: "The address may have changed or the material may have been moved.",
      goHome: "Back to homepage",
      sitemapLead: "The full map of portal sections and service pages.",
      privacy: "Privacy policy",
      terms: "Terms of use",
      accessibility: "Accessibility",
      sitemap: "Sitemap",
      aboutPortal: "About the portal",
      servicePages: "Service pages",
      searchPlaceholderWide: "Enter the name of a story, document or institution",
      legalNote: "This service page is part of the MVP and can later be expanded through CMS-managed content.",
      exploreSection: "Open section",
      openMap: "Open map",
      detailMode: "Detailed material",
      searchResultsLead: "Results are built from titles, summaries and related body content."
    }
  };

  const EVENT_LABELS = {
    meetings: { uz: "Yig'ilishlar", ru: "Заседания", en: "Meetings" },
    regions: { uz: "Hududiy dasturlar", ru: "Региональные программы", en: "Regional programs" },
    international: { uz: "Xalqaro blok", ru: "Международный блок", en: "International track" },
    speeches: { uz: "Rasmiy murojaatlar", ru: "Официальные обращения", en: "Official addresses" },
    news: { uz: "Yangiliklar", ru: "Новости", en: "News" },
    appeals: { uz: "Murojaatlar", ru: "Обращения", en: "Appeals" }
  };

  const DOCUMENT_LABELS = {
    decree: { uz: "Farmon / konsepsiya", ru: "Концепция / указ", en: "Concept / decree" },
    order: { uz: "Reglament", ru: "Регламент", en: "Regulation" },
    program: { uz: "Dastur standarti", ru: "Программный стандарт", en: "Program standard" },
    initiative: { uz: "Media siyosati", ru: "Медиаполитика", en: "Media policy" },
    archive: { uz: "Arxiv", ru: "Архив", en: "Archive" }
  };

  const MEDIA_LABELS = {
    photo: { uz: "Fotoalbom", ru: "Фотоальбом", en: "Photo album" },
    video: { uz: "Video", ru: "Видео", en: "Video" }
  };

  const SEARCH_LABELS = {
    event: { uz: "Yangilik / voqea", ru: "Новость / событие", en: "Story / event" },
    document: { uz: "Hujjat", ru: "Документ", en: "Document" },
    media: { uz: "Media", ru: "Медиа", en: "Media" },
    page: { uz: "Sahifa", ru: "Страница", en: "Page" },
    organization: { uz: "Tuzilma", ru: "Структура", en: "Institution" }
  };

  const LEGAL_PAGES = {
    privacy: {
      title: { uz: "Maxfiylik siyosati", ru: "Политика конфиденциальности", en: "Privacy policy" },
      lead: {
        uz: "Portal foydalanuvchilari yuborgan aloqa ma'lumotlari va texnik axborotni qayta ishlashning bazaviy qoidalari.",
        ru: "Базовые правила обработки контактных данных и технической информации, которую пользователи передают через портал.",
        en: "Baseline rules for processing contact details and technical information submitted through the portal."
      },
      sections: [
        {
          heading: { uz: "Qanday ma'lumotlar yig'iladi", ru: "Какие данные собираются", en: "What data is collected" },
          paragraphs: {
            oz: [
              "Aloqa formasi orqali yuborilgan ism, email, telefon va xabar mavzusi qayd etiladi.",
              "Shuningdek, portal xavfsizligi va ishlash sifatini nazorat qilish uchun texnik loglar yuritiladi."
            ],
            ru: [
              "Через форму обратной связи фиксируются имя, email, телефон и тема обращения.",
              "Дополнительно ведутся технические логи для контроля безопасности и качества работы портала."
            ],
            en: [
              "Names, email addresses, phone numbers and message subjects submitted through the contact form are recorded.",
              "Technical logs are also maintained to support portal security and service quality."
            ]
          }
        },
        {
          heading: { uz: "Ma'lumotdan foydalanish", ru: "Как используются данные", en: "How the data is used" },
          paragraphs: {
            oz: [
              "Ma'lumotlar murojaatlarni yo'naltirish, javob berish va tahliliy hisobotlar tayyorlash uchun ishlatiladi.",
              "Shaxsiy ma'lumotlar uchinchi tomonga faqat qonunchilik va rasmiy tartiblar talab qilgan hollarda uzatiladi."
            ],
            ru: [
              "Данные используются для маршрутизации обращений, подготовки ответов и базовой аналитики.",
              "Передача персональных данных третьим лицам возможна только в случаях, предусмотренных законодательством и официальными процедурами."
            ],
            en: [
              "The data is used to route requests, prepare responses and support baseline analytics.",
              "Personal data is shared with third parties only when required by law or official procedures."
            ]
          }
        }
      ]
    },
    terms: {
      title: { uz: "Foydalanish qoidalari", ru: "Правила использования", en: "Terms of use" },
      lead: {
        uz: "Portal materiallari, havolalar va ochiq kontentdan foydalanish bo'yicha umumiy shartlar.",
        ru: "Общие условия использования материалов, ссылок и открытого контента портала.",
        en: "General conditions for using portal materials, links and public content."
      },
      sections: [
        {
          heading: { uz: "Materiallardan foydalanish", ru: "Использование материалов", en: "Use of materials" },
          paragraphs: {
            oz: [
              "Portal materiallari rasmiy axborot manbasi sifatida foydalanish uchun mo'ljallangan.",
              "Nashrlar va media resurslarini qayta chop etishda rasmiy manbaga havola berish tavsiya etiladi."
            ],
            ru: [
              "Материалы портала предназначены для использования как официальный информационный источник.",
              "При перепечатке публикаций и медиа рекомендуется указывать ссылку на официальный источник."
            ],
            en: [
              "Portal materials are intended for use as an official information source.",
              "When republishing stories or media assets, a reference to the official source is recommended."
            ]
          }
        }
      ]
    },
    accessibility: {
      title: { uz: "Foydalanish qulayligi", ru: "Доступность", en: "Accessibility" },
      lead: {
        uz: "Portalni turli qurilmalar va turli ehtiyojlarga ega foydalanuvchilar uchun qulay qilish bo'yicha asosiy tamoyillar.",
        ru: "Основные принципы, по которым портал делается удобным для разных устройств и аудиторий с разными потребностями.",
        en: "Core principles used to keep the portal usable across devices and for audiences with different accessibility needs."
      },
      sections: [
        {
          heading: { uz: "Interfeys tamoyillari", ru: "Принципы интерфейса", en: "Interface principles" },
          paragraphs: {
            oz: [
              "Sahifalarda semantik sarlavhalar, kontrastli ranglar va ko‘rinadigan fokus holatlari qo'llanadi.",
              "Mobil qurilmalar, klaviatura navigatsiyasi va ekran o'quvchilar bilan moslik doimiy tekshiruv zonasi hisoblanadi."
            ],
            ru: [
              "На страницах используются семантические заголовки, контрастные цвета и заметные состояния фокуса.",
              "Совместимость с мобильными устройствами, клавиатурной навигацией и экранными дикторами считается постоянной зоной контроля."
            ],
            en: [
              "Pages use semantic heading structures, contrast-aware colors and visible focus states.",
              "Compatibility with mobile devices, keyboard navigation and screen readers is treated as a standing requirement."
            ]
          }
        }
      ]
    }
  };

  const state = {
    locale: getInitialLocale(),
    mobileMenu: false
  };

  function getInitialLocale() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("lang");
    const fromStorage = window.localStorage.getItem("portal-locale");
    return normalizeLocale(fromUrl || fromStorage || "uz");
  }

  function normalizeLocale(locale) {
    if (locale === "oz") {
      return "uz";
    }

    return ["uz", "ru", "en"].includes(locale) ? locale : "uz";
  }

  function getDataLocale(locale = state.locale) {
    return LOCALE_MAP[locale] || "oz";
  }

  function translate(value, locale = state.locale) {
    if (value == null) {
      return "";
    }

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    const localeKey = getDataLocale(locale);
    return value[localeKey] || value.oz || value.ru || value.en || "";
  }

  function copy(key) {
    return COPY[state.locale][key] || key;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getPageMeta(key) {
    return data.pageMeta[key] || data.pageMeta.home;
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }

    const locale = state.locale === "uz" ? "uz-UZ" : state.locale === "ru" ? "ru-RU" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(value));
  }

  function formatCompactDate(value) {
    if (!value) {
      return "";
    }

    const locale = state.locale === "uz" ? "uz-UZ" : state.locale === "ru" ? "ru-RU" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  }

  function getCurrentParams() {
    const params = new URLSearchParams(window.location.search);
    const values = {};
    params.forEach((value, key) => {
      if (key !== "lang" && value) {
        values[key] = value;
      }
    });
    return values;
  }

  function withLang(href, extraParams = {}) {
    if (!href || href === "#" || /^(https?:|mailto:|tel:)/.test(href)) {
      return href || "#";
    }

    const [pathAndQuery, hash] = href.split("#");
    const [path, query] = pathAndQuery.split("?");
    const params = new URLSearchParams(query || "");
    params.set("lang", state.locale);

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value == null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const search = params.toString();
    return `${path}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
  }

  function buildUrl(page, extraParams = {}) {
    return withLang(PAGE_PATHS[page] || PAGE_PATHS.home, extraParams);
  }

  function getLocaleLabel(locale) {
    return data.localeLabels[getDataLocale(locale)] || locale.toUpperCase();
  }

  function themeClass(theme) {
    return `theme-${theme || "azure"}`;
  }

  function sortByDate(items) {
    return [...items].sort((left, right) => new Date(right.date) - new Date(left.date));
  }

  function getLabel(map, key) {
    const entry = map[key];
    return entry ? entry[state.locale] : key;
  }

  function truncate(text, limit = 180) {
    if (!text || text.length <= limit) {
      return text;
    }

    return `${text.slice(0, limit).trim()}...`;
  }

  function searchScore(record, query) {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) {
      return 0;
    }

    const title = record.title.toLowerCase();
    const summary = record.summary.toLowerCase();
    const body = record.body.toLowerCase();

    return words.reduce((score, word) => {
      let current = score;
      if (title.includes(word)) current += 5;
      if (summary.includes(word)) current += 3;
      if (body.includes(word)) current += 1;
      return current;
    }, 0);
  }

  function buildSearchRecords() {
    const aboutRecords = data.about.sections.map((section) => ({
      type: "page",
      title: translate(section.title),
      summary: section.paragraphs[getDataLocale()][0] || "",
      body: section.paragraphs[getDataLocale()].join(" "),
      date: "",
      url: `${buildUrl("about")}#${section.id}`,
      theme: "indigo"
    }));

    const governanceRecord = {
      type: "page",
      title: copy("governanceModel"),
      summary: translate(data.pageMeta.organization.lead),
      body: `${translate(data.pageMeta.organization.lead)} ${data.leaders.map((item) => item.name).join(" ")}`,
      date: "",
      url: `${buildUrl("about")}#governance`,
      theme: "gold"
    };

    const resultRecord = {
      type: "page",
      title: copy("expectedResults"),
      summary: data.about.achievements.map((item) => translate(item.label)).join(", "),
      body: data.about.achievements.map((item) => `${item.value} ${translate(item.label)}`).join(" "),
      date: "",
      url: `${buildUrl("about")}#results`,
      theme: "emerald"
    };

    const newsRecords = data.news.map((item) => ({
      type: "event",
      title: translate(item.title),
      summary: translate(item.summary),
      body: `${item.content[getDataLocale()].join(" ")} ${translate(item.quote)}`,
      date: item.date,
      url: buildUrl("events", { slug: item.slug }),
      theme: item.theme
    }));

    const documentRecords = data.documents.map((item) => ({
      type: "document",
      title: translate(item.title),
      summary: translate(item.summary),
      body: item.body[getDataLocale()].join(" "),
      date: item.date,
      url: buildUrl("documents", { slug: item.slug }),
      theme: "gold"
    }));

    const mediaRecords = data.albums.map((item) => ({
      type: "media",
      title: translate(item.title),
      summary: translate(item.summary),
      body: item.frames.join(" "),
      date: item.date,
      url: buildUrl("media", { slug: item.slug }),
      theme: item.theme
    }));

    const leaderRecords = data.leaders.map((item) => ({
      type: "organization",
      title: item.name,
      summary: translate(item.role),
      body: translate(item.bio),
      date: "",
      url: buildUrl("organization"),
      theme: item.theme
    }));

    const organizationRecords = data.organizations.map((item) => ({
      type: "organization",
      title: translate(item.name),
      summary: translate(item.scope),
      body: translate(item.scope),
      date: "",
      url: buildUrl("organization"),
      theme: item.theme
    }));

    return [
      ...aboutRecords,
      governanceRecord,
      resultRecord,
      ...newsRecords,
      ...documentRecords,
      ...mediaRecords,
      ...leaderRecords,
      ...organizationRecords
    ];
  }

  function getApiBase() {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      return window.location.origin;
    }

    return "http://127.0.0.1:8000";
  }

  function renderSectionHeader(options) {
    const linkMarkup = options.linkHref
      ? `<a class="section-link" href="${escapeHtml(options.linkHref)}">${escapeHtml(options.linkLabel || copy("viewAllResults"))}</a>`
      : "";

    return `
      <div class="section-heading">
        <div>
          <p class="section-kicker">${escapeHtml(options.kicker)}</p>
          <h2>${escapeHtml(options.title)}</h2>
          ${options.text ? `<p class="section-lead">${escapeHtml(options.text)}</p>` : ""}
        </div>
        ${linkMarkup}
      </div>
    `;
  }

  function renderQuickStats() {
    return `
      <div class="stats-grid">
        ${data.site.quickStats
          .map(
            (item) => `
              <div class="stat-card">
                <strong>${escapeHtml(item.value)}</strong>
                <span>${escapeHtml(translate(item.label))}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderFeatureCard(item) {
    return `
      <article class="feature-card ${themeClass(item.theme)}">
        <div class="card-meta">
          <span class="badge">${escapeHtml(translate(item.kicker))}</span>
          <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time>
        </div>
        <h3>${escapeHtml(translate(item.title))}</h3>
        <p>${escapeHtml(translate(item.summary))}</p>
        <a class="text-link" href="${escapeHtml(buildUrl("events", { slug: item.slug }))}">${escapeHtml(translate(data.ui.details))}</a>
      </article>
    `;
  }

  function renderCollectionCard(item) {
    return `
      <article class="card collection-card ${themeClass(item.theme)} surface">
        <div class="card-meta">
          <span class="count-pill">${escapeHtml(String(item.count))}</span>
          <span>${escapeHtml(copy("thematicCollections"))}</span>
        </div>
        <h3>${escapeHtml(translate(item.title))}</h3>
        <p>${escapeHtml(translate(item.summary))}</p>
        <a class="text-link" href="${escapeHtml(withLang(item.href))}">${escapeHtml(copy("exploreSection"))}</a>
      </article>
    `;
  }

  function renderNewsCard(item) {
    return `
      <article class="card news-card ${themeClass(item.theme)} surface">
        <div class="card-meta">
          <span class="badge">${escapeHtml(getLabel(EVENT_LABELS, item.category))}</span>
          <time datetime="${escapeHtml(item.date)}">${escapeHtml(formatCompactDate(item.date))}</time>
        </div>
        <h3>${escapeHtml(translate(item.title))}</h3>
        <p>${escapeHtml(translate(item.summary))}</p>
        <div class="fact-row">
          ${item.facts.map((fact) => `<span class="fact-pill">${escapeHtml(fact)}</span>`).join("")}
        </div>
        <a class="text-link" href="${escapeHtml(buildUrl("events", { slug: item.slug }))}">${escapeHtml(translate(data.ui.details))}</a>
      </article>
    `;
  }

  function renderDocumentCard(item) {
    return `
      <article class="card document-card surface">
        <div class="card-meta">
          <span class="badge badge-gold">${escapeHtml(getLabel(DOCUMENT_LABELS, item.type))}</span>
          <span>${escapeHtml(item.number)}</span>
        </div>
        <h3>${escapeHtml(translate(item.title))}</h3>
        <p>${escapeHtml(translate(item.summary))}</p>
        <div class="document-meta">
          <span>${escapeHtml(formatCompactDate(item.date))}</span>
          <span>${escapeHtml(item.number)}</span>
        </div>
        <a class="text-link" href="${escapeHtml(buildUrl("documents", { slug: item.slug }))}">${escapeHtml(translate(data.ui.details))}</a>
      </article>
    `;
  }

  function renderAlbumCard(item) {
    const metric = item.type === "video" ? item.duration : `${item.count} frames`;

    return `
      <article class="card media-card ${themeClass(item.theme)} surface">
        <div class="card-meta">
          <span class="badge">${escapeHtml(getLabel(MEDIA_LABELS, item.type))}</span>
          <span>${escapeHtml(metric)}</span>
        </div>
        <h3>${escapeHtml(translate(item.title))}</h3>
        <p>${escapeHtml(translate(item.summary))}</p>
        <div class="media-frame-line">
          ${item.frames.slice(0, 3).map((frame) => `<span>${escapeHtml(frame)}</span>`).join("")}
        </div>
        <a class="text-link" href="${escapeHtml(buildUrl("media", { slug: item.slug }))}">${escapeHtml(translate(data.ui.details))}</a>
      </article>
    `;
  }

  function renderLeaderCard(item) {
    return `
      <article class="card leader-card ${themeClass(item.theme)} surface">
        <p class="card-kicker">${escapeHtml(copy("leadership"))}</p>
        <h3>${escapeHtml(item.name)}</h3>
        <strong>${escapeHtml(translate(item.role))}</strong>
        <p>${escapeHtml(translate(item.bio))}</p>
      </article>
    `;
  }

  function renderOrganizationCard(item) {
    return `
      <article class="card organization-card ${themeClass(item.theme)} surface">
        <p class="card-kicker">${escapeHtml(copy("responsibleBodies"))}</p>
        <h3>${escapeHtml(translate(item.name))}</h3>
        <p>${escapeHtml(translate(item.scope))}</p>
      </article>
    `;
  }

  function renderContactCard(item) {
    return `
      <article class="card contact-card surface">
        <h3>${escapeHtml(translate(item.title))}</h3>
        <ul>
          ${item.lines[getDataLocale()].map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
      </article>
    `;
  }

  function renderBreadcrumbs(items) {
    return `
      <nav class="breadcrumbs container" aria-label="Breadcrumb">
        ${items
          .map((item) => (item.href ? `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>` : `<span>${escapeHtml(item.label)}</span>`))
          .join("<span>/</span>")}
      </nav>
    `;
  }

  // Page-level hero photos (Unsplash, free to use)
  const PAGE_HERO_PHOTOS = {
    about:        "https://uzreport.news/fotobank/image/d13cacae9cdadad5a85b44bc719699d8.jpeg",
    events:       "https://uzreport.news/fotobank/image/e0461a8e2987f1a088bcc677e24d52c9.jpeg",
    organization: "https://www.gazeta.uz/media/img/2022/03/R2CXQu16470053721441_l.jpg",
    media:        "https://president.uz/uploads/d959333b-b31c-f9fd-769c-1119c7d2b2a1_lists_slider_8441.jpg",
    contacts:     "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80",
    search:       "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80"
  };

  function renderPageHero(page, options = {}) {
    const meta = getPageMeta(page);
    const title = options.title || translate(meta.title);
    const lead = options.lead || translate(meta.lead);
    const kicker = options.kicker || translate(data.site.officialLabel);
    const actions = options.actions || "";
    const photoBg = PAGE_HERO_PHOTOS[page];
    const blueBg = page === "documents";

    if (photoBg || blueBg) {
      const styleAttr = photoBg
        ? `style="--hero-photo:url('${escapeHtml(photoBg)}')"` 
        : `style="background:linear-gradient(148deg,#0a2d52 0%,#0c5b84 55%,#0a3d5c 100%)"`;
      return `
        <section class="page-hero page-hero--photo surface" ${styleAttr}>
          <div class="page-hero__photo-layer" aria-hidden="true"></div>
          <div class="container page-hero-inner">
            <div class="page-hero-copy">
              <p class="section-kicker">${escapeHtml(kicker)}</p>
              <h1>${escapeHtml(title)}</h1>
              <p>${escapeHtml(lead)}</p>
            </div>
            ${actions ? `<div class="page-hero-actions">${actions}</div>` : ""}
          </div>
        </section>
      `;
    }

    return `
      <section class="page-hero surface">
        <div class="container page-hero-inner">
          <div class="page-hero-copy">
            <p class="section-kicker">${escapeHtml(kicker)}</p>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(lead)}</p>
          </div>
          ${actions ? `<div class="page-hero-actions">${actions}</div>` : ""}
        </div>
      </section>
    `;
  }

  function renderEmptyState(title, text) {
    return `
      <div class="empty-state surface">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
      </div>
    `;
  }

  function getStatIcon(stat) {
    const icons = {
      "35": `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>`,
      "14": `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>`,
      "120+": `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>`,
      "3": `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
      </svg>`
    };
    return icons[stat.value] || icons["35"];
  }

  // ── Category banners: one high-quality Unsplash photo per nav section ──
  const CAT_PHOTOS = {
    about: {
      src: "https://uzreport.news/fotobank/image/d13cacae9cdadad5a85b44bc719699d8.jpeg",
      alt: "Узбекистан — история и государственность"
    },
    events: {
      src: "https://uzreport.news/fotobank/image/e0461a8e2987f1a088bcc677e24d52c9.jpeg",
      alt: "Торжественные события независимости"
    },
    documents: {
      nophoto: true,
      alt: "Официальные документы"
    },
    organization: {
      src: "https://www.gazeta.uz/media/img/2022/03/R2CXQu16470053721441_l.jpg",
      alt: "Организационная структура"
    },
    media: {
      src: "https://president.uz/uploads/d959333b-b31c-f9fd-769c-1119c7d2b2a1_lists_slider_8441.jpg",
      alt: "Медиатека"
    }
  };

  const CAT_ICONS = {
    about: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>`,
    events: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    documents: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    organization: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    media: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`
  };

  const CAT_KICKER = {
    about:        { uz: "Loyiha haqida", ru: "О проекте", en: "About" },
    events:       { uz: "Voqealar",      ru: "События",   en: "Events" },
    documents:    { uz: "Hujjatlar",     ru: "Документы", en: "Documents" },
    organization: { uz: "Tashkiliy tuzilma", ru: "Оргструктура", en: "Organization" },
    media:        { uz: "Mediateka",     ru: "Медиатека", en: "Media" }
  };

  function renderCategoryBanners() {
    const cats = data.navigation.filter(n => CAT_PHOTOS[n.key]);
    const L = state.locale;

    return `
      <section class="cat-banner-section" aria-label="${L === "ru" ? "Разделы портала" : L === "en" ? "Portal sections" : "Portal bo'limlari"}">
        <div class="container">
          <div class="section-heading" style="margin-bottom:28px">
            <div>
              <p class="section-kicker">${L === "ru" ? "Разделы" : L === "en" ? "Sections" : "Bo'limlar"}</p>
              <h2>${L === "ru" ? "Разделы портала" : L === "en" ? "Portal Sections" : "Portal bo'limlari"}</h2>
            </div>
          </div>
          <div class="cat-banner-grid">
            ${cats.map((item, idx) => {
              const photo = CAT_PHOTOS[item.key];
              const icon  = CAT_ICONS[item.key] || "";
              const kicker= (CAT_KICKER[item.key] || {})[L] || "";
              const title = translate(item.label);
              const cta   = L === "ru" ? "Перейти →" : L === "en" ? "Explore →" : "O'tish →";
              const featured = idx === 0 ? "cat-card--featured" : "";
              const blueClass = photo.nophoto ? "cat-card--blue" : "";
              return `
                <a class="cat-card ${featured} ${blueClass} surface" href="${escapeHtml(withLang(item.href))}" aria-label="${escapeHtml(title)}">
                  <div class="cat-card__bar"></div>
                  ${photo.src ? `<img class="cat-card__img" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy">` : ""}
                  <div class="cat-card__overlay"></div>
                  <div class="cat-card__body">
                    <span class="cat-card__icon" aria-hidden="true">${icon}</span>
                    <span class="cat-card__kicker">${escapeHtml(kicker)}</span>
                    <span class="cat-card__title">${escapeHtml(title)}</span>
                    <span class="cat-card__cta">${escapeHtml(cta)}</span>
                  </div>
                </a>
              `;
            }).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderHomePage() {
    const featuredStats = data.site.quickStats.slice(0, 4);
    const primaryLink = data.site.utilityLinks[0];
    const secondaryLink = data.site.utilityLinks[1];

    return `
      <section class="minimal-highlights container" aria-label="Highlights">
        ${featuredStats
          .map(
            (stat, index) => `
              <article class="minimal-card ${index % 2 ? "is-emerald" : "is-azure"}">
                <span class="minimal-card__icon" aria-hidden="true">${getStatIcon(stat)}</span>
                <strong class="minimal-card__value">${escapeHtml(stat.value)}</strong>
                <p class="minimal-card__label">${escapeHtml(translate(stat.label))}</p>
              </article>
            `
          )
          .join("")}
      </section>

      ${renderCategoryBanners()}

      <section class="minimal-actions section container" aria-label="Quick actions">
        <a class="minimal-action" href="${escapeHtml(buildUrl("documents"))}">
          <span class="minimal-action__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </span>
          <span>
            <strong>${escapeHtml(translate(primaryLink.label))}</strong>
            <small>${escapeHtml(copy("documentsLead"))}</small>
          </span>
        </a>

        <a class="minimal-action" href="${escapeHtml(buildUrl("contacts"))}">
          <span class="minimal-action__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <span>
            <strong>${escapeHtml(translate(secondaryLink.label))}</strong>
            <small>${escapeHtml(copy("contactsLead"))}</small>
          </span>
        </a>
      </section>
    `;
  }

  function renderAboutPage() {
    return `
      ${renderPageHero("about")}
      <section class="section container">
        <article class="panel intro-panel surface">
          <p class="section-kicker">${escapeHtml(translate(data.about.intro.eyebrow))}</p>
          <h2>${escapeHtml(translate(data.about.intro.title))}</h2>
          <p>${escapeHtml(translate(data.about.intro.text))}</p>
        </article>
      </section>

      <section class="section container about-layout">
        <aside class="surface scroll-nav">
          <h3>${escapeHtml(copy("aboutPortal"))}</h3>
          <a href="#vision">${escapeHtml(translate(data.about.sideNav[0].label))}</a>
          <a href="#history">${escapeHtml(translate(data.about.sideNav[1].label))}</a>
          <a href="#symbolism">${escapeHtml(translate(data.about.sideNav[2].label))}</a>
          <a href="#governance">${escapeHtml(copy("governanceModel"))}</a>
          <a href="#results">${escapeHtml(copy("expectedResults"))}</a>
        </aside>
        <div class="stack">
          ${data.about.sections
            .map(
              (section) => `
                <article class="panel surface" id="${escapeHtml(section.id)}">
                  <h2>${escapeHtml(translate(section.title))}</h2>
                  ${section.paragraphs[getDataLocale()].map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                </article>
              `
            )
            .join("")}
          <article class="panel surface" id="governance">
            <h2>${escapeHtml(copy("governanceModel"))}</h2>
            <p>${escapeHtml(translate(getPageMeta("organization").lead))}</p>
            <div class="mini-grid">
              ${data.leaders
                .map(
                  (item) => `
                    <div class="mini-card ${themeClass(item.theme)}">
                      <strong>${escapeHtml(item.name)}</strong>
                      <span>${escapeHtml(translate(item.role))}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
          <article class="panel surface" id="results">
            <h2>${escapeHtml(copy("expectedResults"))}</h2>
            <div class="stats-grid">
              ${data.about.achievements
                .map(
                  (item) => `
                    <div class="stat-card">
                      <strong>${escapeHtml(item.value)}</strong>
                      <span>${escapeHtml(translate(item.label))}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="section container">
        ${renderSectionHeader({
          kicker: copy("historicalTimeline"),
          title: translate(data.site.title),
          text: translate(data.about.intro.text)
        })}
        <div class="timeline-grid">
          ${data.about.milestones
            .map(
              (item) => `
                <article class="timeline-card surface">
                  <span class="timeline-year">${escapeHtml(item.year)}</span>
                  <h3>${escapeHtml(translate(item.title))}</h3>
                  <p>${escapeHtml(translate(item.text))}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderDetailLayout(item, options) {
    return `
      ${renderBreadcrumbs(options.breadcrumbs)}
      <section class="section container">
        <article class="detail-hero surface ${themeClass(options.theme)}">
          <div class="card-meta">
            <span class="badge">${escapeHtml(options.badge)}</span>
            ${item.date ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(formatDate(item.date))}</time>` : ""}
          </div>
          <h1>${escapeHtml(options.title)}</h1>
          <p>${escapeHtml(options.summary)}</p>
          ${options.meta ? `<div class="detail-meta">${options.meta}</div>` : ""}
          ${options.facts && options.facts.length ? `<div class="fact-row">${options.facts.map((fact) => `<span class="fact-pill">${escapeHtml(fact)}</span>`).join("")}</div>` : ""}
        </article>
      </section>
      <section class="section container detail-grid">
        <article class="panel surface">
          ${options.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          ${options.quote ? `<blockquote>${escapeHtml(options.quote)}</blockquote>` : ""}
        </article>
        <aside class="panel surface">
          <h3>${escapeHtml(copy("relatedMaterials"))}</h3>
          ${options.related}
          <a class="button button-secondary full-width" href="${escapeHtml(options.backHref)}">${escapeHtml(copy("backToList"))}</a>
        </aside>
      </section>
    `;
  }

  function renderRelatedList(items, page) {
    return `
      <div class="related-list">
        ${items
          .map(
            (item) => `
              <a class="related-card" href="${escapeHtml(buildUrl(page, { slug: item.slug }))}">
                <strong>${escapeHtml(translate(item.title))}</strong>
                <span>${escapeHtml(formatCompactDate(item.date))}</span>
              </a>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderEventsPage() {
    const params = getCurrentParams();
    const slug = params.slug;
    const category = params.category || "";
    const query = (params.q || "").trim().toLowerCase();
    const items = sortByDate(data.news);

    if (slug) {
      const currentItem = items.find((item) => item.slug === slug);
      if (!currentItem) return renderNotFoundPage();

      const related = items.filter((item) => item.slug !== slug).slice(0, 3);
      return renderDetailLayout(currentItem, {
        theme: currentItem.theme,
        badge: getLabel(EVENT_LABELS, currentItem.category),
        title: translate(currentItem.title),
        summary: translate(currentItem.summary),
        paragraphs: currentItem.content[getDataLocale()],
        quote: translate(currentItem.quote),
        facts: currentItem.facts,
        breadcrumbs: [
          { label: translate(getPageMeta("home").title), href: buildUrl("home") },
          { label: translate(getPageMeta("events").title), href: buildUrl("events") },
          { label: translate(currentItem.title) }
        ],
        related: renderRelatedList(related, "events"),
        backHref: buildUrl("events")
      });
    }

    const categories = [...new Set(items.map((item) => item.category))];
    const filtered = items.filter((item) => {
      const matchesCategory = !category || item.category === category;
      const haystack = `${translate(item.title)} ${translate(item.summary)} ${item.content[getDataLocale()].join(" ")}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesCategory && matchesQuery;
    });

    return `
      ${renderPageHero("events")}
      <section class="section container">
        <article class="panel surface">
          <div class="filter-shell">
            <div>
              <p class="section-kicker">${escapeHtml(copy("filters"))}</p>
              <div class="chip-row">
                <a class="chip ${!category ? "is-active" : ""}" href="${escapeHtml(buildUrl("events"))}">${escapeHtml(copy("allCategories"))}</a>
                ${categories
                  .map((item) => `<a class="chip ${category === item ? "is-active" : ""}" href="${escapeHtml(buildUrl("events", { category: item }))}">${escapeHtml(getLabel(EVENT_LABELS, item))}</a>`)
                  .join("")}
              </div>
            </div>
            <form class="inline-search" action="events.html" method="get">
              <input type="hidden" name="lang" value="${escapeHtml(state.locale)}">
              <input type="search" name="q" value="${escapeHtml(params.q || "")}" placeholder="${escapeHtml(copy("searchPlaceholderWide"))}">
              <button class="button button-secondary" type="submit">${escapeHtml(translate(data.ui.searchButton))}</button>
            </form>
          </div>
        </article>
      </section>
      <section class="section container">
        <div class="card-grid card-grid-four">
          ${data.collections.map((item) => renderCollectionCard(item)).join("")}
        </div>
      </section>
      <section class="section container">
        ${filtered.length
          ? `${renderSectionHeader({
              kicker: copy("latestNews"),
              title: translate(getPageMeta("events").title),
              text: `${filtered.length} ${copy("resultsFound").toLowerCase()}.`
            })}
            <div class="card-grid">${filtered.map((item) => renderNewsCard(item)).join("")}</div>`
          : renderEmptyState(copy("noResults"), copy("noResultsLead"))}
      </section>
    `;
  }

  function renderDocumentsPage() {
    const params = getCurrentParams();
    const slug = params.slug;
    const type = params.type || "";
    const query = (params.q || "").trim().toLowerCase();
    const items = sortByDate(data.documents);

    if (slug) {
      const currentItem = items.find((item) => item.slug === slug);
      if (!currentItem) return renderNotFoundPage();

      const related = items.filter((item) => item.slug !== slug).slice(0, 3);
      return renderDetailLayout(currentItem, {
        theme: "gold",
        badge: getLabel(DOCUMENT_LABELS, currentItem.type),
        title: translate(currentItem.title),
        summary: translate(currentItem.summary),
        paragraphs: currentItem.body[getDataLocale()],
        quote: "",
        facts: [currentItem.number, formatDate(currentItem.date)],
        meta: `<span>${escapeHtml(currentItem.number)}</span><span>${escapeHtml(getLabel(DOCUMENT_LABELS, currentItem.type))}</span>`,
        breadcrumbs: [
          { label: translate(getPageMeta("home").title), href: buildUrl("home") },
          { label: translate(getPageMeta("documents").title), href: buildUrl("documents") },
          { label: translate(currentItem.title) }
        ],
        related: renderRelatedList(related, "documents"),
        backHref: buildUrl("documents")
      });
    }

    const types = [...new Set(items.map((item) => item.type))];
    const filtered = items.filter((item) => {
      const matchesType = !type || item.type === type;
      const haystack = `${translate(item.title)} ${translate(item.summary)} ${item.body[getDataLocale()].join(" ")}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query);
      return matchesType && matchesQuery;
    });

    return `
      ${renderPageHero("documents")}
      <section class="section container">
        <article class="panel surface">
          <div class="filter-shell">
            <div>
              <p class="section-kicker">${escapeHtml(copy("filters"))}</p>
              <div class="chip-row">
                <a class="chip ${!type ? "is-active" : ""}" href="${escapeHtml(buildUrl("documents"))}">${escapeHtml(copy("allTypes"))}</a>
                ${types
                  .map((item) => `<a class="chip ${type === item ? "is-active" : ""}" href="${escapeHtml(buildUrl("documents", { type: item }))}">${escapeHtml(getLabel(DOCUMENT_LABELS, item))}</a>`)
                  .join("")}
              </div>
            </div>
            <form class="inline-search" action="documents.html" method="get">
              <input type="hidden" name="lang" value="${escapeHtml(state.locale)}">
              <input type="search" name="q" value="${escapeHtml(params.q || "")}" placeholder="${escapeHtml(copy("searchPlaceholderWide"))}">
              <button class="button button-secondary" type="submit">${escapeHtml(translate(data.ui.searchButton))}</button>
            </form>
          </div>
        </article>
      </section>
      <section class="section container">
        ${filtered.length
          ? `${renderSectionHeader({
              kicker: translate(getPageMeta("documents").title),
              title: translate(data.site.title),
              text: copy("documentsLead")
            })}
            <div class="card-grid">${filtered.map((item) => renderDocumentCard(item)).join("")}</div>`
          : renderEmptyState(copy("noResults"), copy("noResultsLead"))}
      </section>
    `;
  }

  function renderOrganizationPage() {
    return `
      ${renderPageHero("organization")}
      <section class="section container">
        ${renderSectionHeader({
          kicker: copy("leadership"),
          title: translate(data.site.title),
          text: translate(getPageMeta("organization").lead)
        })}
        <div class="card-grid">
          ${data.leaders.map((item) => renderLeaderCard(item)).join("")}
        </div>
      </section>
      <section class="section container">
        ${renderSectionHeader({
          kicker: copy("responsibleBodies"),
          title: translate(data.site.title),
          text: translate(getPageMeta("organization").lead)
        })}
        <div class="card-grid">
          ${data.organizations.map((item) => renderOrganizationCard(item)).join("")}
        </div>
      </section>
      <section class="section container dual-panel">
        <article class="panel surface">
          <h2>${escapeHtml(copy("roadmapTitle"))}</h2>
          <p>${escapeHtml(copy("roadmapLead"))}</p>
          <div class="timeline-list">
            ${data.homeSections.roadmap.stages
              .map((stage) => `<div class="timeline-item"><h3>${escapeHtml(translate(stage.title))}</h3><p>${escapeHtml(translate(stage.text))}</p></div>`)
              .join("")}
          </div>
        </article>
        <article class="panel surface">
          <h2>${escapeHtml(copy("officialContacts"))}</h2>
          <p>${escapeHtml(copy("contactsLead"))}</p>
          <div class="contact-grid">
            ${data.site.contactCards.map((item) => renderContactCard(item)).join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderMediaPage() {
    const params = getCurrentParams();
    const slug = params.slug;
    const type = params.type || "";
    const items = sortByDate(data.albums);

    if (slug) {
      const currentItem = items.find((item) => item.slug === slug);
      if (!currentItem) return renderNotFoundPage();

      const related = items.filter((item) => item.slug !== slug).slice(0, 3);
      return `
        ${renderBreadcrumbs([
          { label: translate(getPageMeta("home").title), href: buildUrl("home") },
          { label: translate(getPageMeta("media").title), href: buildUrl("media") },
          { label: translate(currentItem.title) }
        ])}
        <section class="section container">
          <article class="detail-hero surface ${themeClass(currentItem.theme)}">
            <div class="card-meta">
              <span class="badge">${escapeHtml(getLabel(MEDIA_LABELS, currentItem.type))}</span>
              <time datetime="${escapeHtml(currentItem.date)}">${escapeHtml(formatDate(currentItem.date))}</time>
            </div>
            <h1>${escapeHtml(translate(currentItem.title))}</h1>
            <p>${escapeHtml(translate(currentItem.summary))}</p>
            <div class="detail-meta"><span>${escapeHtml(currentItem.type === "video" ? currentItem.duration : `${currentItem.count} frames`)}</span></div>
          </article>
        </section>
        <section class="section container detail-grid">
          <article class="panel surface">
            <h2>${escapeHtml(copy("detailMode"))}</h2>
            <p>${escapeHtml(translate(currentItem.summary))}</p>
            <div class="frame-grid">
              ${currentItem.frames
                .map((frame, index) => `<div class="frame-card ${themeClass(currentItem.theme)}"><span>${escapeHtml(String(index + 1).padStart(2, "0"))}</span><strong>${escapeHtml(frame)}</strong></div>`)
                .join("")}
            </div>
          </article>
          <aside class="panel surface">
            <h3>${escapeHtml(copy("relatedMaterials"))}</h3>
            ${renderRelatedList(related, "media")}
            <a class="button button-secondary full-width" href="${escapeHtml(buildUrl("media"))}">${escapeHtml(copy("backToList"))}</a>
          </aside>
        </section>
      `;
    }

    const filtered = items.filter((item) => !type || item.type === type);
    return `
      ${renderPageHero("media")}
      <section class="section container">
        <article class="panel surface">
          <div class="chip-row">
            <a class="chip ${!type ? "is-active" : ""}" href="${escapeHtml(buildUrl("media"))}">${escapeHtml(copy("allTypes"))}</a>
            <a class="chip ${type === "photo" ? "is-active" : ""}" href="${escapeHtml(buildUrl("media", { type: "photo" }))}">${escapeHtml(getLabel(MEDIA_LABELS, "photo"))}</a>
            <a class="chip ${type === "video" ? "is-active" : ""}" href="${escapeHtml(buildUrl("media", { type: "video" }))}">${escapeHtml(getLabel(MEDIA_LABELS, "video"))}</a>
          </div>
        </article>
      </section>
      <section class="section container">
        ${renderSectionHeader({
          kicker: translate(getPageMeta("media").title),
          title: translate(data.site.title),
          text: copy("mediaLead")
        })}
        <div class="card-grid">
          ${filtered.map((item) => renderAlbumCard(item)).join("")}
        </div>
      </section>
    `;
  }

  function renderContactsPage() {
    const topics = data.contacts.formTopics;

    return `
      ${renderPageHero("contacts")}
      <section class="section container dual-panel">
        <article class="panel surface">
          ${renderSectionHeader({
            kicker: copy("officialContacts"),
            title: translate(data.site.title),
            text: copy("contactsLead")
          })}
          <div class="contact-grid">
            ${data.site.contactCards.map((item) => renderContactCard(item)).join("")}
          </div>
          <div class="contact-summary">
            <div>
              <strong>${escapeHtml(copy("address"))}</strong>
              <p>${escapeHtml(translate(data.contacts.address))}</p>
            </div>
            <div>
              <strong>${escapeHtml(copy("receptionHours"))}</strong>
              <p>${escapeHtml(translate(data.contacts.reception))}</p>
            </div>
            <a class="button button-secondary" href="${escapeHtml(data.contacts.mapHref)}" target="_blank" rel="noreferrer">${escapeHtml(copy("openMap"))}</a>
          </div>
        </article>
        <article class="panel surface">
          <h2>${escapeHtml(copy("externalService"))}</h2>
          <p>${escapeHtml(copy("externalServiceLead"))}</p>
          <div class="appeal-box ${themeClass("gold")}">
            <h3>${escapeHtml(translate(data.homeSections.appealBlock.title))}</h3>
            <ul class="point-list">
              ${data.homeSections.appealBlock.points[getDataLocale()].map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
          </div>
        </article>
      </section>

      <section class="section container">
        <article class="panel surface">
          <h2>${escapeHtml(copy("formTitle"))}</h2>
          <p>${escapeHtml(copy("formLead"))}</p>
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-grid">
              <label class="field">
                <span>${escapeHtml(copy("name"))}</span>
                <input type="text" name="name" required>
              </label>
              <label class="field">
                <span>${escapeHtml(copy("email"))}</span>
                <input type="email" name="email" required>
              </label>
              <label class="field">
                <span>${escapeHtml(copy("phone"))}</span>
                <input type="tel" name="phone">
              </label>
              <label class="field">
                <span>${escapeHtml(copy("topic"))}</span>
                <select name="topic" required>
                  <option value="">${escapeHtml(copy("topic"))}</option>
                  ${topics.map((item) => `<option value="${escapeHtml(item.value)}">${escapeHtml(translate(item.label))}</option>`).join("")}
                </select>
              </label>
            </div>
            <label class="field">
              <span>${escapeHtml(copy("subject"))}</span>
              <input type="text" name="subject" required>
            </label>
            <label class="field">
              <span>${escapeHtml(copy("message"))}</span>
              <textarea name="message" rows="6" required></textarea>
            </label>
            <label class="consent-row">
              <input type="checkbox" name="consent" required>
              <span>${escapeHtml(copy("consent"))}</span>
            </label>
            <div class="form-actions">
              <button class="button" type="submit">${escapeHtml(copy("send"))}</button>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </div>
          </form>
        </article>
      </section>
    `;
  }

  function renderSearchPage() {
    const params = getCurrentParams();
    const query = (params.q || "").trim();
    const records = buildSearchRecords();
    const results = query
      ? records
          .map((record) => ({ ...record, score: searchScore(record, query) }))
          .filter((record) => record.score > 0)
          .sort((left, right) => {
            if (right.score !== left.score) return right.score - left.score;
            return new Date(right.date || 0) - new Date(left.date || 0);
          })
      : [];

    return `
      ${renderPageHero("search", { lead: copy("searchLead") })}
      <section class="section container">
        <article class="panel surface">
          <form class="search-hero-form" action="search.html" method="get">
            <input type="hidden" name="lang" value="${escapeHtml(state.locale)}">
            <input type="search" name="q" value="${escapeHtml(query)}" placeholder="${escapeHtml(copy("searchPlaceholderWide"))}">
            <button class="button" type="submit">${escapeHtml(translate(data.ui.searchButton))}</button>
          </form>
          <p class="search-note">${escapeHtml(copy("searchTip"))}</p>
        </article>
      </section>
      <section class="section container">
        ${query
          ? results.length
            ? `${renderSectionHeader({
                kicker: copy("searchLead"),
                title: query,
                text: `${results.length} ${copy("resultsFound").toLowerCase()}. ${copy("searchResultsLead")}`
              })}
              <div class="results-list">
                ${results
                  .map(
                    (item) => `
                      <a class="result-card surface ${themeClass(item.theme)}" href="${escapeHtml(item.url)}">
                        <div class="card-meta">
                          <span class="badge">${escapeHtml(getLabel(SEARCH_LABELS, item.type))}</span>
                          ${item.date ? `<span>${escapeHtml(formatCompactDate(item.date))}</span>` : ""}
                        </div>
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(truncate(item.summary || item.body, 180))}</p>
                      </a>
                    `
                  )
                  .join("")}
              </div>`
            : renderEmptyState(copy("noResults"), copy("noResultsLead"))
          : `${renderSectionHeader({
              kicker: copy("searchLead"),
              title: translate(getPageMeta("search").title),
              text: copy("nothingYet")
            })}
            <div class="card-grid">
              ${data.navigation
                .map(
                  (item) => `
                    <a class="card navigation-card surface" href="${escapeHtml(withLang(item.href))}">
                      <h3>${escapeHtml(translate(item.label))}</h3>
                      <p>${escapeHtml(copy("exploreSection"))}</p>
                    </a>
                  `
                )
                .join("")}
            </div>`}
      </section>
    `;
  }

  function renderLegalPage(page) {
    const pageData = LEGAL_PAGES[page];

    return `
      ${renderPageHero(page, { title: translate(pageData.title), lead: translate(pageData.lead) })}
      <section class="section container legal-stack">
        ${pageData.sections
          .map(
            (section) => `
              <article class="panel surface">
                <h2>${escapeHtml(translate(section.heading))}</h2>
                ${section.paragraphs[getDataLocale()].map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              </article>
            `
          )
          .join("")}
        <article class="panel surface legal-note">
          <p>${escapeHtml(copy("legalNote"))}</p>
        </article>
      </section>
    `;
  }

  function renderSitemapPage() {
    const mainLinks = [
      { label: translate(getPageMeta("home").title), href: buildUrl("home") },
      { label: translate(getPageMeta("about").title), href: buildUrl("about") },
      { label: translate(getPageMeta("events").title), href: buildUrl("events") },
      { label: translate(getPageMeta("documents").title), href: buildUrl("documents") },
      { label: translate(getPageMeta("organization").title), href: buildUrl("organization") },
      { label: translate(getPageMeta("media").title), href: buildUrl("media") },
      { label: translate(getPageMeta("contacts").title), href: buildUrl("contacts") },
      { label: translate(getPageMeta("search").title), href: buildUrl("search") }
    ];

    const serviceLinks = [
      { label: copy("privacy"), href: buildUrl("privacy") },
      { label: copy("terms"), href: buildUrl("terms") },
      { label: copy("accessibility"), href: buildUrl("accessibility") },
      { label: copy("sitemap"), href: buildUrl("sitemap") },
      { label: "404", href: buildUrl("notfound") }
    ];

    return `
      ${renderPageHero("sitemap", { title: copy("sitemap"), lead: copy("sitemapLead") })}
      <section class="section container dual-panel">
        <article class="panel surface">
          <h2>${escapeHtml(copy("mainNavigation"))}</h2>
          <div class="link-stack">
            ${mainLinks.map((item) => `<a class="simple-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("")}
          </div>
        </article>
        <article class="panel surface">
          <h2>${escapeHtml(copy("servicePages"))}</h2>
          <div class="link-stack">
            ${serviceLinks.map((item) => `<a class="simple-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`).join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderNotFoundPage() {
    return `
      <section class="page-hero surface">
        <div class="container page-hero-inner">
          <div class="page-hero-copy">
            <p class="section-kicker">404</p>
            <h1>${escapeHtml(copy("pageNotFound"))}</h1>
            <p>${escapeHtml(copy("pageNotFoundLead"))}</p>
          </div>
          <div class="page-hero-actions">
            <a class="button" href="${escapeHtml(buildUrl("home"))}">${escapeHtml(copy("goHome"))}</a>
          </div>
        </div>
      </section>
      <section class="section container">
        <div class="card-grid card-grid-four">
          ${data.navigation
            .map(
              (item) => `
                <a class="card navigation-card surface" href="${escapeHtml(withLang(item.href))}">
                  <h3>${escapeHtml(translate(item.label))}</h3>
                  <p>${escapeHtml(copy("exploreSection"))}</p>
                </a>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderHeader() {
    const activePage =
      pageKey === "story"
        ? "events"
        : pageKey === "document-detail"
          ? "documents"
          : pageKey === "gallery"
            ? "media"
            : pageKey;

    return `
      <header class="site-header">
        <div class="header-nav-bar">
          <div class="container header-nav-inner">
            <a class="brand" href="${escapeHtml(buildUrl("home"))}">
              <span class="brand-mark"><img src="${escapeHtml(data.site.logo)}" alt="${escapeHtml(translate(data.site.title))}"></span>
            </a>
            <div class="nav-panel ${state.mobileMenu ? "is-open" : ""}">
              <nav class="main-nav" aria-label="${escapeHtml(copy("mainNavigation"))}">
                ${data.navigation
                  .map((item) => `<a class="nav-link ${item.key === activePage ? "is-active" : ""}" href="${escapeHtml(withLang(item.href))}">${escapeHtml(translate(item.label))}</a>`)
                  .join("")}
              </nav>
            </div>
            <div class="header-tools">
              <form class="header-search" action="search.html" method="get">
                <input type="hidden" name="lang" value="${escapeHtml(state.locale)}">
                <input type="search" name="q" placeholder="${escapeHtml(translate(data.ui.searchPlaceholder))}" aria-label="${escapeHtml(copy("portalSearch"))}">
                <button class="button button-secondary" type="submit">${escapeHtml(translate(data.ui.searchButton))}</button>
              </form>
              <div class="locale-dropdown" id="locale-dropdown">
                <button class="locale-dropdown__trigger" type="button" id="locale-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
                  ${escapeHtml(getLocaleLabel(state.locale))}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="2,4 6,8 10,4"/></svg>
                </button>
                <div class="locale-dropdown__menu" role="listbox">
                  ${["uz", "ru", "en"]
                    .map((locale) => `<button class="locale-dropdown__item ${locale === state.locale ? "is-active" : ""}" type="button" data-action="switch-locale" data-locale="${locale}" role="option" aria-selected="${locale === state.locale}">${escapeHtml(getLocaleLabel(locale))}</button>`)
                    .join("")}
                </div>
              </div>
              <button class="nav-toggle" type="button" data-action="toggle-menu" aria-expanded="${state.mobileMenu}">
                <span></span><span></span><span></span><span class="sr-only">${escapeHtml(copy("menu"))}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderPresentationStrip() {
    if (pageKey !== "home") {
      return "";
    }

    const slides = [
      { src: "assets/images/news2.jpg", withText: true },
      { src: "assets/images/news1.jpg", withText: true },
      { src: "assets/images/news3.jpg", withText: true }
    ];

    return `
      <section class="presentation-strip" aria-label="Presentation">
        <div class="presentation-strip__media" id="pres-slider">
          ${slides.map((slide, i) => `
            <div class="pres-slide ${i === 0 ? "is-active" : ""}">
              <img src="${escapeHtml(slide.src)}" alt="Slide ${i + 1}" ${i > 0 ? 'loading="lazy"' : ''}>
              ${slide.withText ? `
                <div class="presentation-strip__overlay">
                  <div class="presentation-strip__frame">
                    <p class="presentation-strip__eyebrow">${escapeHtml(translate(data.site.officialLabel))}</p>
                    <h1 class="presentation-strip__title">${escapeHtml(translate(data.site.title))}</h1>
                    <p class="presentation-strip__lead">${escapeHtml(translate(data.site.subtitle))}</p>
                    <a class="minimal-hero__cta" href="${escapeHtml(buildUrl("events"))}">${escapeHtml(copy("exploreProgram"))}</a>
                  </div>
                </div>` : ""}
            </div>
          `).join("")}
          <button class="pres-arrow pres-arrow--prev" type="button" id="pres-prev" aria-label="Previous">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="pres-arrow pres-arrow--next" type="button" id="pres-next" aria-label="Next">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          </button>
          <div class="pres-dots">
            ${slides.map((_, i) => `<span class="pres-dot ${i === 0 ? "is-active" : ""}" data-index="${i}"></span>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <p class="section-kicker">${escapeHtml(translate(data.site.officialLabel))}</p>
            <h2>${escapeHtml(translate(data.site.title))}</h2>
            <p>${escapeHtml(translate(data.site.subtitle))}</p>
          </div>
          <div>
            <h3>${escapeHtml(copy("mainNavigation"))}</h3>
            <div class="link-stack">
              ${data.navigation.map((item) => `<a class="simple-link" href="${escapeHtml(withLang(item.href))}">${escapeHtml(translate(item.label))}</a>`).join("")}
            </div>
          </div>
          <div>
            <h3>${escapeHtml(copy("servicePages"))}</h3>
            <div class="link-stack">
              <a class="simple-link" href="${escapeHtml(buildUrl("privacy"))}">${escapeHtml(copy("privacy"))}</a>
              <a class="simple-link" href="${escapeHtml(buildUrl("terms"))}">${escapeHtml(copy("terms"))}</a>
              <a class="simple-link" href="${escapeHtml(buildUrl("accessibility"))}">${escapeHtml(copy("accessibility"))}</a>
              <a class="simple-link" href="${escapeHtml(buildUrl("sitemap"))}">${escapeHtml(copy("sitemap"))}</a>
              <a class="simple-link" href="${escapeHtml(buildUrl("notfound"))}">404</a>
            </div>
          </div>
          <div>
            <h3>${escapeHtml(copy("officialContacts"))}</h3>
            <p>${escapeHtml(translate(data.contacts.address))}</p>
            <p>${escapeHtml(translate(data.contacts.reception))}</p>
          </div>
        </div>
      </footer>
    `;
  }

  function renderPage() {
    switch (pageKey) {
      case "home": return renderHomePage();
      case "about": return renderAboutPage();
      case "events": return renderEventsPage();
      case "story": return renderEventsPage();
      case "documents": return renderDocumentsPage();
      case "document-detail": return renderDocumentsPage();
      case "organization": return renderOrganizationPage();
      case "media": return renderMediaPage();
      case "gallery": return renderMediaPage();
      case "contacts": return renderContactsPage();
      case "search": return renderSearchPage();
      case "privacy":
      case "terms":
      case "accessibility":
        return renderLegalPage(pageKey);
      case "sitemap": return renderSitemapPage();
      case "notfound":
      default:
        return renderNotFoundPage();
    }
  }

  function getDocumentTitle() {
    if (pageKey === "home") return `${translate(data.site.title)} | ${translate(getPageMeta("home").title)}`;
    if (pageKey === "search" && getCurrentParams().q) return `${getCurrentParams().q} | ${translate(data.site.title)}`;
    if (["events", "story"].includes(pageKey) && getCurrentParams().slug) {
      const item = data.news.find((entry) => entry.slug === getCurrentParams().slug);
      if (item) return `${translate(item.title)} | ${translate(data.site.title)}`;
    }
    if (["documents", "document-detail"].includes(pageKey) && getCurrentParams().slug) {
      const item = data.documents.find((entry) => entry.slug === getCurrentParams().slug);
      if (item) return `${translate(item.title)} | ${translate(data.site.title)}`;
    }
    if (["media", "gallery"].includes(pageKey) && getCurrentParams().slug) {
      const item = data.albums.find((entry) => entry.slug === getCurrentParams().slug);
      if (item) return `${translate(item.title)} | ${translate(data.site.title)}`;
    }
    if (["privacy", "terms", "accessibility"].includes(pageKey)) return `${translate(LEGAL_PAGES[pageKey].title)} | ${translate(data.site.title)}`;
    if (pageKey === "sitemap") return `${copy("sitemap")} | ${translate(data.site.title)}`;
    if (pageKey === "notfound") return `404 | ${translate(data.site.title)}`;
    return `${translate(getPageMeta(pageKey).title)} | ${translate(data.site.title)}`;
  }

  function getMetaDescription() {
    if (pageKey === "search") return copy("searchLead");
    if (pageKey === "notfound") return copy("pageNotFoundLead");
    if (pageKey === "story") return translate(getPageMeta("events").lead);
    if (pageKey === "document-detail") return translate(getPageMeta("documents").lead);
    if (pageKey === "gallery") return translate(getPageMeta("media").lead);
    if (["privacy", "terms", "accessibility"].includes(pageKey)) return translate(LEGAL_PAGES[pageKey].lead);
    return translate(getPageMeta(pageKey).lead || getPageMeta("home").lead);
  }

  function setMeta() {
    document.documentElement.lang = state.locale;
    document.title = getDocumentTitle();
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", getMetaDescription());
  }

  function bindInteractions() {
    document.querySelectorAll('[data-action="toggle-menu"]').forEach((button) => {
      button.addEventListener("click", () => {
        state.mobileMenu = !state.mobileMenu;
        render();
      });
    });

    // Presentation slider
    const slider = document.getElementById("pres-slider");
    if (slider) {
      const slides = slider.querySelectorAll(".pres-slide");
      const dots = slider.querySelectorAll(".pres-dot");
      let current = 0;

      function goTo(index) {
        slides[current].classList.remove("is-active");
        dots[current].classList.remove("is-active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("is-active");
        dots[current].classList.add("is-active");
      }

      document.getElementById("pres-prev").addEventListener("click", () => goTo(current - 1));
      document.getElementById("pres-next").addEventListener("click", () => goTo(current + 1));
      dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.index))));

      let autoplay = setInterval(() => goTo(current + 1), 5000);
      slider.addEventListener("mouseenter", () => clearInterval(autoplay));
      slider.addEventListener("mouseleave", () => { autoplay = setInterval(() => goTo(current + 1), 5000); });
    }

    const localeDropdown = document.getElementById("locale-dropdown");
    const localeDropdownTrigger = document.getElementById("locale-dropdown-trigger");
    if (localeDropdown && localeDropdownTrigger) {
      localeDropdownTrigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = localeDropdown.classList.toggle("is-open");
        localeDropdownTrigger.setAttribute("aria-expanded", String(isOpen));
      });
      document.addEventListener("click", () => {
        localeDropdown.classList.remove("is-open");
        localeDropdownTrigger.setAttribute("aria-expanded", "false");
      });
    }

    document.querySelectorAll('[data-action="switch-locale"]').forEach((button) => {
      button.addEventListener("click", () => {
        const locale = normalizeLocale(button.dataset.locale || "uz");
        const params = new URLSearchParams(window.location.search);
        params.set("lang", locale);
        window.localStorage.setItem("portal-locale", locale);
        window.location.search = params.toString();
      });
    });

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = new FormData(contactForm);
        const status = document.getElementById("form-status");
        const email = String(form.get("email") || "").trim();
        const valid =
          String(form.get("name") || "").trim() &&
          String(form.get("subject") || "").trim() &&
          String(form.get("message") || "").trim() &&
          String(form.get("topic") || "").trim() &&
          /.+@.+\..+/.test(email) &&
          form.get("consent");

        if (status) {
          status.textContent = valid ? "Sending..." : copy("formError");
          status.className = `form-status ${valid ? "" : "is-error"}`;
        }
        if (!valid) {
          return;
        }

        const payload = {
          name: String(form.get("name") || "").trim(),
          email,
          phone: String(form.get("phone") || "").trim(),
          topic: String(form.get("topic") || "").trim(),
          subject: String(form.get("subject") || "").trim(),
          message: String(form.get("message") || "").trim(),
          consent: true,
          locale: state.locale
        };

        try {
          const response = await fetch(`${getApiBase()}/api/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          if (status) {
            status.textContent = "Backend accepted the submission.";
            status.className = "form-status is-success";
          }
        } catch (error) {
          if (status) {
            status.textContent = copy("formSuccess");
            status.className = "form-status is-success";
          }
        }

        contactForm.reset();
      });
    }
  }

  function setupRevealAnimations() {
    const surfaces = document.querySelectorAll(".surface");
    if (!("IntersectionObserver" in window)) {
      surfaces.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    surfaces.forEach((element) => observer.observe(element));
  }

  function render() {
    window.localStorage.setItem("portal-locale", state.locale);
    root.innerHTML = `
      <a class="skip-link" href="#main-content">${escapeHtml(copy("skipToContent"))}</a>
      <div class="site-shell">
        ${renderHeader()}
        ${renderPresentationStrip()}
        <main class="site-main" id="main-content">${renderPage()}</main>
        ${renderFooter()}
      </div>
    `;
    setMeta();
    bindInteractions();
    setupRevealAnimations();
  }

  render();
})();
