from __future__ import annotations


def t(uz: str, ru: str, en: str) -> dict[str, str]:
    return {"uz": uz, "ru": ru, "en": en}


SITE_SETTINGS = {
    "locales": ["uz", "ru", "en"],
    "default_locale": "uz",
    "site": {
        "official_label": t(
            "Rasmiy axborot portali",
            "Официальный информационный портал",
            "Official information portal",
        ),
        "title": t(
            "O'zbekiston mustaqilligining 35 yilligi",
            "35-летие независимости Узбекистана",
            "35th anniversary of Uzbekistan's independence",
        ),
        "subtitle": t(
            "35 yillik erkinlik, birdamlik va milliy taraqqiyotning rasmiy portali",
            "Официальный портал 35 лет свободы, единства и национального развития",
            "The official portal of 35 years of freedom, unity and national development",
        ),
        "accent_label": t(
            "35 yillik dastur",
            "Программа к 35-летию",
            "35th anniversary program",
        ),
        "logo": "assets/images/festival-logo.jpg",
        "socials": [
            {"key": "tg", "label": "Telegram", "short": "TG", "href": "#"},
            {"key": "fb", "label": "Facebook", "short": "FB", "href": "#"},
            {"key": "ig", "label": "Instagram", "short": "IG", "href": "#"},
            {"key": "yt", "label": "YouTube", "short": "YT", "href": "#"},
            {"key": "x", "label": "X", "short": "X", "href": "#"},
        ],
        "utility_links": [
            {"href": "documents.html", "label": t("Rasmiy hujjatlar", "Официальные документы", "Official documents")},
            {"href": "contacts.html", "label": t("Murojaat yuborish", "Отправить обращение", "Submit an appeal")},
        ],
        "quick_stats": [
            {"value": "35", "label": t("mustaqillik yillari", "лет независимости", "years of independence")},
            {"value": "14", "label": t("hududiy dastur", "региональных программ", "regional programs")},
            {"value": "120+", "label": t("yirik tadbir", "крупных мероприятий", "major events")},
            {"value": "3", "label": t("faol til versiyasi", "рабочих языка", "active language versions")},
        ],
        "contact_cards": [
            {
                "title": t("Matbuot xizmati", "Пресс-служба", "Press office"),
                "lines": {
                    "uz": ["press@festival.uz", "+998 71 200 35 35", "Dushanba-Juma, 09:00-18:00"],
                    "ru": ["press@festival.uz", "+998 71 200 35 35", "Пн-Пт, 09:00-18:00"],
                    "en": ["press@festival.uz", "+998 71 200 35 35", "Mon-Fri, 09:00-18:00"],
                },
            },
            {
                "title": t("Fuqarolar murojaati", "Обращения граждан", "Citizen appeals"),
                "lines": {
                    "uz": ["appeal@festival.uz", "+998 71 205 10 10", "24/7 qabul ro'yxatga olinadi"],
                    "ru": ["appeal@festival.uz", "+998 71 205 10 10", "Регистрация обращений 24/7"],
                    "en": ["appeal@festival.uz", "+998 71 205 10 10", "Appeals are registered 24/7"],
                },
            },
            {
                "title": t("Manzil", "Адрес", "Address"),
                "lines": {
                    "uz": ["Toshkent shahri, Mustaqillik maydoni yaqinida", "Festival koordinatsiya markazi", "Xaritaga o'tish"],
                    "ru": ["г. Ташкент, район площади Независимости", "Координационный центр фестиваля", "Перейти к карте"],
                    "en": ["Tashkent, near Independence Square", "Festival coordination center", "Open map"],
                },
            },
        ],
    },
    "navigation": [
        {"key": "about", "href": "about.html", "label": t("Loyiha haqida", "О проекте", "About")},
        {"key": "events", "href": "events.html", "label": t("Voqealar", "События", "Events")},
        {"key": "documents", "href": "documents.html", "label": t("Hujjatlar", "Документы", "Documents")},
        {"key": "organization", "href": "organization.html", "label": t("Tashkiliy tuzilma", "Оргструктура", "Organization")},
        {"key": "media", "href": "media.html", "label": t("Mediatika", "Медиатека", "Media")},
        {"key": "contacts", "href": "contacts.html", "label": t("Kontaktlar", "Контакты", "Contacts")},
    ],
}

SITE_SETTINGS["page_meta"] = {
    "home": {
        "title": t("Bosh sahifa", "Главная", "Home"),
        "lead": t(
            "Portalning asosiy dasturi, yangiliklari va murojaat kanallari bir sahifada.",
            "Ключевая программа, новости и каналы обратной связи в одной точке.",
            "The main program, updates and public feedback channels in one place.",
        ),
    },
    "about": {
        "title": t("Loyiha haqida", "О проекте", "About the project"),
        "lead": t(
            "35 yillik mustaqillik tantanalarining maqsadi, ma'nosi va boshqaruv modeli.",
            "Смысл, цели и модель управления празднованием 35-летия независимости.",
            "The meaning, objectives and governance model of the 35th anniversary celebrations.",
        ),
    },
    "events": {
        "title": t("Voqealar va yangiliklar", "События и новости", "Events and news"),
        "lead": t(
            "Hududiy, xalqaro va rasmiy tadbirlar yagona axborot oqimida.",
            "Региональные, международные и официальные мероприятия в едином потоке.",
            "Regional, international and official activities in a unified editorial stream.",
        ),
    },
    "documents": {
        "title": t("Rasmiy hujjatlar", "Официальные документы", "Official documents"),
        "lead": t(
            "Festivalni boshqarish, tashkil etish va axborot siyosati bo'yicha normativ baza.",
            "Нормативная база по управлению, организации и информационной политике проекта.",
            "The regulatory basis for governance, organization and information policy.",
        ),
    },
    "organization": {
        "title": t("Tashkiliy tuzilma", "Оргструктура", "Organizational structure"),
        "lead": t(
            "Orqomita, media markaz va mas'ul tashkilotlarning vazifalari.",
            "Задачи оргкомитета, медиаштаба и ответственных организаций.",
            "Responsibilities of the organizing committee, media center and partner institutions.",
        ),
    },
    "media": {
        "title": t("Mediatika", "Медиатека", "Media library"),
        "lead": t(
            "Fotoalbomlar, videomateriallar va rasmiy vizual materiallar markazi.",
            "Фотоальбомы, видеоматериалы и официальный визуальный архив.",
            "A hub for photo albums, video materials and official visual assets.",
        ),
    },
    "contacts": {
        "title": t("Kontaktlar va murojaatlar", "Контакты и обращения", "Contacts and appeals"),
        "lead": t(
            "Matbuot, fuqarolar va hamkorlar uchun yagona aloqa nuqtasi.",
            "Единая точка связи для прессы, граждан и партнёров.",
            "A unified contact point for the press, citizens and partner institutions.",
        ),
    },
    "search": {
        "title": t("Qidiruv natijalari", "Результаты поиска", "Search results"),
        "lead": t(
            "Yangiliklar, hujjatlar, media va sahifalar bo'yicha qidiruv.",
            "Поиск по новостям, документам, медиа и ключевым страницам.",
            "Search across stories, documents, media and key pages.",
        ),
    },
}

SITE_SETTINGS["home_sections"] = {
    "social_lead": {
        "title": t("Rasmiy axborot kanallari", "Официальные информационные каналы", "Official information channels"),
        "text": t(
            "Portal bilan bir qatorda yangiliklar tasdiqlangan ijtimoiy platformalarda ham yagona uslubda tarqatiladi.",
            "Помимо портала новости распространяются в утверждённых социальных каналах в едином стиле.",
            "Alongside the portal, updates are distributed through approved social channels with a unified editorial style.",
        ),
    },
    "appeal_block": {
        "title": t("Rasmiy murojaat va tezkor aloqa", "Официальное обращение и оперативная связь", "Official appeal and fast communication"),
        "text": t(
            "Fuqarolar, OAV va hamkorlar uchun yagona murojaat oynasi savollarni qabul qiladi va mas'ul bo'linmalarga yuboradi.",
            "Единое окно обращений принимает вопросы граждан, СМИ и партнёров и направляет их ответственным подразделениям.",
            "A single appeal window receives requests from citizens, media and partners and routes them to responsible teams.",
        ),
        "points": {
            "uz": ["24/7 ro'yxatga olish", "Mavzu bo'yicha yo'naltirish", "Media so'rovlari uchun alohida navbat"],
            "ru": ["Регистрация 24/7", "Маршрутизация по теме", "Отдельная очередь для медиазапросов"],
            "en": ["24/7 registration", "Topic-based routing", "Dedicated media queue"],
        },
    },
    "roadmap": {
        "title": t("Bosh dastur arxitekturasi", "Архитектура основной программы", "Architecture of the main program"),
        "stages": [
            {"title": t("1-bosqich: tayyorgarlik", "Этап 1: подготовка", "Phase 1: preparation"), "text": t("Hujjatlar, tahririy kalendar, hududiy reja va media briflar.", "Документы, редакционный календарь, региональные планы и медиабрифы.", "Documents, editorial calendar, regional plans and media briefings.")},
            {"title": t("2-bosqich: hududiy faollik", "Этап 2: региональная активация", "Phase 2: regional activation"), "text": t("Ko'rgazmalar, yoshlar laboratoriyalari, xizmat ko'rsatish va sahna bloklari.", "Выставки, молодёжные лаборатории, сервисные и сценические блоки.", "Exhibitions, youth labs, service tracks and stage blocks.")},
            {"title": t("3-bosqich: final hafta", "Этап 3: финальная неделя", "Phase 3: final week"), "text": t("Markaziy marosim, xalqaro forum va media hisobotlar.", "Центральная церемония, международный форум и медиарепортажи.", "The main ceremony, international forum and media coverage.")},
        ],
    },
}

SITE_SETTINGS["contacts"] = {
    "address": t(
        "Toshkent shahri, Mustaqillik maydoni yaqinidagi Festival koordinatsiya markazi",
        "г. Ташкент, Координационный центр фестиваля у площади Независимости",
        "Festival Coordination Center near Independence Square, Tashkent",
    ),
    "reception": t("Dushanba-Juma, 09:00-18:00", "Пн-Пт, 09:00-18:00", "Mon-Fri, 09:00-18:00"),
    "map_href": "https://maps.google.com/?q=Independence+Square+Tashkent",
    "form_topics": [
        {"value": "general", "label": t("Umumiy savol", "Общий вопрос", "General question")},
        {"value": "press", "label": t("Media so'rovi", "Медиазапрос", "Media request")},
        {"value": "volunteer", "label": t("Volontyorlik", "Волонтёрство", "Volunteering")},
        {"value": "technical", "label": t("Texnik muammo", "Техническая проблема", "Technical issue")},
    ],
}

SITE_SETTINGS["service_links"] = [
    {"href": "privacy.html", "label": t("Maxfiylik siyosati", "Политика конфиденциальности", "Privacy policy")},
    {"href": "terms.html", "label": t("Foydalanish qoidalari", "Правила использования материалов", "Terms of use")},
    {"href": "accessibility.html", "label": t("Foydalanish qulayligi", "Доступность", "Accessibility")},
    {"href": "sitemap.html", "label": t("Sayt xaritasi", "Карта сайта", "Sitemap")},
]

ABOUT_PAGE = {
    "intro": {
        "eyebrow": t("Festival konsepsiyasi", "Концепция фестиваля", "Festival concept"),
        "title": t(
            "Mustaqillikning 35 yilligini zamonaviy davlat portali ruhida taqdim etish",
            "Представить 35-летие независимости в современной логике государственного портала",
            "Present the 35th anniversary of independence through a modern state portal experience",
        ),
        "text": t(
            "Portal rasmiy axborot, hujjatlar, tadbirlar taqvimi va ommaviy murojaatlar uchun yagona muhit yaratadi.",
            "Портал объединяет официальную информацию, документы, календарь событий и каналы публичных обращений.",
            "The portal unifies official information, documents, the event calendar and public feedback channels.",
        ),
    },
    "sections": [
        {
            "id": "vision",
            "title": t("Missiya va asosiy vazifa", "Миссия и основная задача", "Mission and core task"),
            "paragraphs": {
                "uz": [
                    "Festival platformasi mustaqillik g'oyasini zamonaviy davlat boshqaruvi, fuqarolik birdamligi va madaniy meros bilan bog'laydi.",
                    "Portal fuqarolar, OAV, hamkorlar va xalqaro mehmonlar uchun yagona axborot standarti yaratadi.",
                ],
                "ru": [
                    "Платформа фестиваля связывает идею независимости с современным государственным управлением, гражданской солидарностью и культурным наследием.",
                    "Портал формирует единый информационный стандарт для граждан, СМИ, партнёров и международных гостей.",
                ],
                "en": [
                    "The festival platform links the idea of independence with modern governance, civic solidarity and cultural heritage.",
                    "The portal creates a single information standard for citizens, media, partners and international guests.",
                ],
            },
        },
        {
            "id": "history",
            "title": t("Tarixiy kontekst va mazmun", "Исторический контекст и содержание", "Historical context and narrative"),
            "paragraphs": {
                "uz": [
                    "1991 yildan boshlab mustaqillik davlat suvereniteti, iqtisodiy modernizatsiya va ochiq muloqot tamoyillarini shakllantirdi.",
                    "35 yillik dastur shu tajribani yangi avlodga zamonaviy formatlar va raqamli servislar orqali yetkazadi.",
                ],
                "ru": [
                    "С 1991 года независимость сформировала основы суверенитета, модернизации и открытого общественного диалога.",
                    "Программа к 35-летию переводит этот опыт в современные форматы и цифровые сервисы.",
                ],
                "en": [
                    "Since 1991, independence has shaped the foundations of sovereignty, modernization and open public dialogue.",
                    "The 35th anniversary program translates this legacy into contemporary formats and digital services.",
                ],
            },
        },
        {
            "id": "symbolism",
            "title": t("Festival ramziyligi", "Символика фестиваля", "Festival symbolism"),
            "paragraphs": {
                "uz": [
                    "Asosiy vizual belgi erkinlik, yangilanish va yurt taraqqiyotini ifodalaydi.",
                    "Ko'k, oq, yashil va oltin ranglar davlat miqyosi, poklik, barqaror rivojlanish va tarixiy merosni uyg'unlashtiradi.",
                ],
                "ru": [
                    "Главный визуальный знак передаёт свободу, обновление и поступательное развитие страны.",
                    "Синий, белый, зелёный и золотой объединяют государственный масштаб, открытость, устойчивое развитие и историческую память.",
                ],
                "en": [
                    "The main visual sign expresses freedom, renewal and the country’s forward movement.",
                    "Blue, white, green and gold combine institutional scale, openness, sustainable growth and historical memory.",
                ],
            },
        },
    ],
    "milestones": [
        {"year": "1991", "title": t("Mustaqillik e'lon qilindi", "Провозглашение независимости", "Independence proclaimed"), "text": t("Yangi davlatchilik modeli shakllanishining boshlanishi.", "Старт формирования современной государственности.", "The beginning of a modern statehood model.")},
        {"year": "2001", "title": t("Yangi ijtimoiy dasturlar bosqichi", "Этап новых социальных программ", "A new phase of social programs"), "text": t("Hududlar va ijtimoiy sohalarda keng ko'lamli yangilanishlar.", "Масштабные обновления в регионах и социальной сфере.", "Large-scale regional and social modernization.")},
        {"year": "2016", "title": t("Ochiq muloqot va modernizatsiya", "Открытый диалог и модернизация", "Open dialogue and modernization"), "text": t("Davlat boshqaruvida shaffoflik va servisga yo'nalish kuchaydi.", "Усилились прозрачность и сервисная ориентация государственного управления.", "Transparency and service orientation gained stronger importance.")},
        {"year": "2026", "title": t("35 yillik festival platformasi", "Платформа к 35-летию", "Festival platform for the 35th anniversary"), "text": t("Raqamli portal, hududiy dasturlar va xalqaro media kampaniya birlashtirildi.", "Объединены цифровой портал, региональные программы и международная медиакампания.", "A digital portal, regional programs and an international media campaign are unified.")},
    ],
    "achievements": [
        {"value": "500 000+", "label": t("kutilyotgan tashrif buyuruvchilar", "ожидаемых посетителей", "expected visitors")},
        {"value": "70+", "label": t("hamkor tashkilot", "организаций-партнёров", "partner organizations")},
        {"value": "24/7", "label": t("axborot va murojaat markazi", "центр информирования и обращений", "information and appeal center")},
    ],
}

HERO_SLIDES = [
    {
        "slug": "national-opening",
        "theme": "azure",
        "category": "news",
        "date": "2026-09-01",
        "kicker": t("Asosiy marosim", "Главная церемония", "Main ceremony"),
        "title": t("Poytaxtda milliy ochilish marosimi va 35 yillik bosh dastur namoyishi o'tkaziladi", "В столице пройдёт центральная церемония открытия и презентация программы 35-летия", "The capital will host the main opening ceremony and presentation of the 35th anniversary program"),
        "summary": t("Birinchi kun davlat ramzlari, zamonaviy sahna va hududiy delegatsiyalar ishtirokida o'tadi.", "Первый день объединит государственную символику, современную сценографию и делегации регионов.", "The first day brings together state symbolism, contemporary stage design and regional delegations."),
    },
    {
        "slug": "international-dialogue",
        "theme": "emerald",
        "category": "international",
        "date": "2026-09-03",
        "kicker": t("Xalqaro muloqot", "Международный диалог", "International dialogue"),
        "title": t("Toshkentda madaniy diplomatiya va hamkorlik bo'yicha xalqaro forum o'tadi", "В Ташкенте состоится международный форум по культурной дипломатии и партнёрству", "Tashkent will host an international forum on cultural diplomacy and partnership"),
        "summary": t("Forumda xorijiy delegatsiyalar, ekspertlar va OAV uchun alohida sessiyalar rejalashtirilgan.", "Для иностранных делегаций, экспертов и СМИ предусмотрены специальные рабочие сессии.", "Dedicated sessions are planned for foreign delegations, experts and media representatives."),
    },
    {
        "slug": "digital-services",
        "theme": "indigo",
        "category": "appeals",
        "date": "2026-08-12",
        "kicker": t("Raqamli xizmatlar", "Цифровые сервисы", "Digital services"),
        "title": t("Portalda qidiruv, murojaat va hujjatlar uchun yagona raqamli xizmatlar ishga tushirildi", "На портале запущены единые цифровые сервисы для поиска, обращений и документов", "Unified digital services for search, appeals and documents are now available on the portal"),
        "summary": t("Foydalanuvchilar yangiliklar, hujjatlar va media bo'limlarini yagona boshqariladigan interfeys orqali ko'radi.", "Пользователи получают доступ к новостям, документам и медиатеке через единый управляемый интерфейс.", "Users can access news, documents and the media library through a single coordinated interface."),
    },
]

COLLECTIONS = [
    {"slug": "international", "key": "international", "count": 18, "theme": "azure", "href": "events.html#international", "title": t("Xalqaro hamkorlik", "Международное сотрудничество", "International cooperation"), "summary": t("Forumlar, delegatsiyalar va madaniy diplomatiya sessiyalari.", "Форумы, делегации и сессии по культурной дипломатии.", "Forums, delegations and cultural diplomacy sessions.")},
    {"slug": "regions", "key": "regions", "count": 42, "theme": "emerald", "href": "events.html#regions", "title": t("Hududiy dasturlar", "Региональные программы", "Regional programs"), "summary": t("Viloyatlar, Qoraqalpog'iston va Toshkent bo'ylab sahna va ko'rgazmalar.", "Сцены и выставки по регионам, Каракалпакстану и Ташкенту.", "Stages and exhibitions across the regions, Karakalpakstan and Tashkent.")},
    {"slug": "documents", "key": "documents", "count": 27, "theme": "gold", "href": "documents.html", "title": t("Asosiy hujjatlar", "Ключевые документы", "Key documents"), "summary": t("Farmonlar, reglamentlar va ijro intizomi bo'yicha materiallar.", "Указы, регламенты и материалы по исполнению программы.", "Decrees, regulations and implementation materials.")},
    {"slug": "volunteers", "key": "volunteers", "count": 11, "theme": "indigo", "href": "events.html#volunteers", "title": t("Yoshlar va volontyorlar", "Молодёжь и волонтёры", "Youth and volunteers"), "summary": t("Qabul, tayyorgarlik va servis guruhlari uchun dasturlar.", "Набор, обучение и координация сервисных групп.", "Recruitment, training and coordination of service teams.")},
]

NEWS = [
    {
        "slug": "committee-approved-roadmap",
        "category": "meetings",
        "theme": "azure",
        "date": "2026-04-12",
        "title": t("Orqomita festivalning uch bosqichli yo'l xaritasini tasdiqladi", "Оргкомитет утвердил трёхэтапную дорожную карту фестиваля", "The organizing committee approved the festival’s three-phase roadmap"),
        "summary": t("Bosh dastur tayyorgarlik, hududiy faollik va yakuniy tantanali haftani o'z ichiga oladi.", "Программа охватывает подготовительный этап, региональную активность и итоговую праздничную неделю.", "The program covers a preparation phase, regional activation and the final celebration week."),
        "body": {
            "uz": ["Navbatdagi yig'ilishda tashkiliy qo'mita festivalning bosh taqvimi, hududiy kvotalar va mediamarkaz rejimini tasdiqladi.", "Yangi yo'l xaritasi kontent ishlab chiqarish, xavfsizlik, logistika va xalqaro mehmonlar bilan ishlash bloklarini birlashtiradi.", "Portalning yangilangan bosh sahifasi barcha bosqichlar bo'yicha jamoatchilikni muntazam xabardor qilib boradi."],
            "ru": ["На очередном заседании оргкомитет утвердил основной календарь фестиваля, региональные квоты и режим работы медиаштаба.", "Новая дорожная карта объединяет блоки по производству контента, безопасности, логистике и работе с международными гостями.", "Обновлённая главная страница портала будет регулярно информировать общественность о ходе всех этапов."],
            "en": ["At its latest session, the organizing committee approved the core festival calendar, regional quotas and the operating mode of the media center.", "The roadmap combines content production, security, logistics and international guest management into one coordinated plan.", "The updated homepage will keep the public informed about each implementation phase."],
        },
        "quote": t("Barcha bloklar yagona standart bo'yicha boshqariladi va portal bosh axborot nuqtasi bo'ladi.", "Все блоки будут управляться по единому стандарту, а портал станет главной информационной точкой.", "All program blocks will be managed to a single standard, with the portal serving as the main information point."),
        "facts": ["3 phases", "14 regions", "1 media center"],
    },
    {
        "slug": "regional-launch-karakalpakstan",
        "category": "regions",
        "theme": "emerald",
        "date": "2026-04-10",
        "title": t("Hududiy festival dasturi Qoraqalpog'istonda sayyor ko'rgazmalar bilan start oldi", "Региональная программа фестиваля стартовала в Каракалпакстане с выездных выставок", "The regional festival program opened in Karakalpakstan with travelling exhibitions"),
        "summary": t("Mahalliy tarix, dizayn va yoshlar tashabbuslari bo'yicha ko'rgazmalar boshqa hududlarga ham yo'l oladi.", "Выставки о локальной истории, дизайне и молодёжных инициативах затем отправятся в другие регионы.", "Exhibitions on local history, design and youth initiatives will continue to other regions afterwards."),
        "body": {
            "uz": ["Birinchi sayyor ekspozitsiyalar aholiga festivalning hududiy qismini erta bosqichdan boshlab his qilish imkonini beradi.", "Har bir ko'rgazmada interaktiv stendlar, tarixiy arxivlar va yoshlar loyihalari uchun alohida maydon mavjud.", "Ko'chma format bir vaqtning o'zida madaniy dastur va axborot kampaniyasi vazifasini bajaradi."],
            "ru": ["Первые выездные экспозиции дают жителям возможность почувствовать региональную часть фестиваля уже на раннем этапе.", "Каждая выставка включает интерактивные стенды, исторические архивы и отдельное пространство для молодёжных проектов.", "Мобильный формат одновременно работает как культурная программа и информационная кампания."],
            "en": ["The first travelling exhibitions allow residents to experience the regional dimension of the festival at an early stage.", "Each exhibition includes interactive stands, archival materials and a dedicated space for youth projects.", "The mobile format functions as both a cultural program and an information campaign."],
        },
        "quote": t("Hududlar festivalning markaziy emas, teng huquqli sahnalaridir.", "Регионы выступают не периферией, а равноправными сценами фестиваля.", "The regions are not peripheral venues but equal stages of the festival."),
        "facts": ["14 routes", "80 exhibits", "2 months"],
    },
    {
        "slug": "international-cultural-forum",
        "category": "international",
        "theme": "gold",
        "date": "2026-04-08",
        "title": t("Xalqaro madaniy diplomatiya forumi uchun delegatsiyalar ro'yxati kengaytirildi", "Расширен список делегаций для международного форума по культурной дипломатии", "The delegation list for the cultural diplomacy forum has been expanded"),
        "summary": t("Forum biznes, ta'lim, kreativ sanoat va jamoat diplomatiyasi yo'nalishlarini qamrab oladi.", "Форум охватит направления бизнеса, образования, креативных индустрий и общественной дипломатии.", "The forum will cover business, education, creative industries and public diplomacy."),
        "body": {
            "uz": ["Tashkilotchilar xalqaro forumni nafaqat protokol uchrashuvi, balki amaliy hamkorlik platformasi sifatida tayyorlamoqda.", "Sessiyalarda qo'shma ko'rgazmalar, akademik almashinuv va yosh tadbirkorlar tarmog'i mavzulari ko'tariladi.", "Portal forum uchun alohida axborot markazi va media materiallar sahifasini taqdim etadi."],
            "ru": ["Организаторы готовят международный форум не только как протокольную встречу, но и как площадку для практического партнёрства.", "В сессиях будут обсуждаться совместные выставки, академический обмен и сеть молодых предпринимателей.", "Портал также предоставит отдельный информационный центр и медиастраницу форума."],
            "en": ["Organizers are positioning the international forum not merely as a protocol meeting but as a platform for practical cooperation.", "Sessions will address joint exhibitions, academic exchange and a network of young entrepreneurs.", "The portal will also host a dedicated information center and media page for the forum."],
        },
        "quote": t("Xalqaro blok festivalning ochiqligi va zamonaviy hamkorlik ruhini ko'rsatadi.", "Международный блок демонстрирует открытость фестиваля и его современную партнёрскую логику.", "The international track demonstrates the festival’s openness and partnership-driven spirit."),
        "facts": ["22 delegations", "4 thematic sessions", "3 working languages"],
    },
    {
        "slug": "appeal-center-opened",
        "category": "appeals",
        "theme": "indigo",
        "date": "2026-03-25",
        "title": t("Fuqarolar va OAV uchun yagona murojaatlar markazi ochildi", "Открыт единый центр обращений для граждан и СМИ", "A unified appeal center for citizens and media has been opened"),
        "summary": t("Yangi kanal savollar, media so'rovlari va texnik xabarlarni bitta registrda jamlaydi.", "Новый канал объединяет вопросы, медиазапросы и технические сообщения в едином реестре.", "The new channel consolidates inquiries, media requests and technical messages in one registry."),
        "body": {
            "uz": ["Markaz murojaatlarni mavzu, hudud va ustuvorlik bo'yicha tasniflaydi, keyin mas'ul bo'linmalarga yuboradi.", "Bu yechim festival davrida axborot oqimini boshqarish va javob berish muddatlarini qisqartirish uchun joriy etildi.", "Portal foydalanuvchilari murojaat shaklini to'g'ridan-to'g'ri kontaktlar bo'limida to'ldirishi mumkin."],
            "ru": ["Центр классифицирует обращения по теме, региону и приоритету, после чего направляет их ответственным подразделениям.", "Решение внедрено для управления информационным потоком в период фестиваля и сокращения сроков ответа.", "Пользователи портала могут заполнить форму обращения напрямую в разделе контактов."],
            "en": ["The center classifies appeals by topic, region and priority before routing them to responsible teams.", "The system was introduced to manage information flow during the festival and reduce response times.", "Portal users can submit their request directly through the contacts section."],
        },
        "quote": t("Tezkor va tushunarli aloqa rasmiy portalning ishonchliligini oshiradi.", "Быстрая и понятная коммуникация усиливает доверие к официальному порталу.", "Fast and clear communication increases trust in the official portal."),
        "facts": ["24/7 registration", "4 service queues", "single registry"],
    },
]

DOCUMENTS = [
    {
        "slug": "festival-concept-2026",
        "type": "decree",
        "date": "2026-03-20",
        "number": "PF-35/2026",
        "title": t("2026 yilgi Mustaqillik festivali konsepsiyasi", "Концепция фестиваля независимости 2026", "Concept of the 2026 Independence Festival"),
        "summary": t("Festivalning maqsadi, bloklari, auditoriyalari va boshqaruv tamoyillarini belgilovchi asosiy hujjat.", "Базовый документ, определяющий цели, блоки, аудитории и принципы управления проектом.", "The core document defining the festival’s goals, blocks, audiences and governance principles."),
        "body": {
            "uz": ["Mazkur konsepsiya festivalni davlat, fuqarolik jamiyati va xalqaro hamkorlik uchun ochiq maydon sifatida belgilaydi.", "Hujjat bosh sahifa bloklari, hududiy dasturlar va murojaatlar markazi uchun yagona mezonlarni o'rnatadi."],
            "ru": ["Настоящая концепция определяет фестиваль как открытую платформу для государства, гражданского общества и международного партнёрства.", "Документ устанавливает единые критерии для блоков главной страницы, региональных программ и центра обращений."],
            "en": ["This concept defines the festival as an open platform for the state, civil society and international partnership.", "It sets unified criteria for homepage blocks, regional programs and the appeal center."],
        },
    },
    {
        "slug": "committee-regulation",
        "type": "order",
        "date": "2026-03-22",
        "number": "RQ-12/2026",
        "title": t("Tashkiliy qo'mita faoliyati reglamenti", "Регламент деятельности организационного комитета", "Regulation on the work of the organizing committee"),
        "summary": t("Rollar, tasdiqlash zanjiri, yig'ilish tartibi va nazorat mexanizmlarini belgilaydi.", "Определяет роли, цепочку согласования, порядок заседаний и контрольные механизмы.", "Defines roles, approval chains, meeting procedures and control mechanisms."),
        "body": {
            "uz": ["Reglamentda rais, kotibiyat, hududiy koordinatorlar va media shtab vakolatlari ajratilgan.", "Hujjat kontent tasdiqlash va favqulodda kommunikatsiya protokollarini ham qamrab oladi."],
            "ru": ["Регламент разделяет полномочия председателя, секретариата, региональных координаторов и медиаштаба.", "Документ также охватывает согласование контента и протоколы экстренной коммуникации."],
            "en": ["The regulation separates the mandates of the chairperson, secretariat, regional coordinators and media headquarters.", "It also covers content approvals and emergency communication protocols."],
        },
    },
    {
        "slug": "regional-implementation-standard",
        "type": "program",
        "date": "2026-03-24",
        "number": "STD-REG/26",
        "title": t("Hududiy dasturlarni amalga oshirish standarti", "Стандарт реализации региональных программ", "Standard for implementing regional programs"),
        "summary": t("Sahna, logistika, axborot materiallari va xavfsizlik uchun yagona standartlar.", "Единые стандарты для сцены, логистики, информационных материалов и безопасности.", "Unified standards for staging, logistics, information materials and security."),
        "body": {
            "uz": ["Standart hududiy tadbirlarni kontent sifati va tashkiliy intizom bo'yicha bir darajada ushlab turadi.", "Voqea kartalari va foto hisobotlar uchun majburiy metadata ro'yxati berilgan."],
            "ru": ["Стандарт позволяет удерживать региональные мероприятия на одном уровне по качеству контента и организационной дисциплине.", "Также приведён обязательный перечень метаданных для карточек событий и фотоотчётов."],
            "en": ["The standard keeps regional activities aligned in terms of content quality and organizational discipline.", "It also includes a mandatory metadata list for event cards and photo reports."],
        },
    },
    {
        "slug": "media-accreditation-policy",
        "type": "initiative",
        "date": "2026-03-26",
        "number": "MEDIA-07",
        "title": t("OAV akkreditatsiyasi va media markaz ishlash tartibi", "Порядок аккредитации СМИ и работы медиацентра", "Media accreditation and media center operating policy"),
        "summary": t("Mahalliy va xorijiy OAV uchun kirish, material so'rash va tezkor aloqa qoidalari.", "Правила доступа, запроса материалов и оперативной связи для местных и зарубежных СМИ.", "Access, material request and communication rules for local and international media."),
        "body": {
            "uz": ["Siyosatda akkreditatsiya oynasi, tasdiqlash muddati va media paketlarni olish tartibi ko'rsatilgan.", "Portal orqali foto, video va matbuot ma'lumotlari uchun alohida so'rov yuborish imkoniyati nazarda tutiladi."],
            "ru": ["Политика описывает окно аккредитации, сроки подтверждения и порядок получения медиапакетов.", "Через портал предусматривается отдельный канал запроса фото, видео и пресс-материалов."],
            "en": ["The policy describes the accreditation window, confirmation timelines and the process for receiving media kits.", "A dedicated portal channel is provided for requesting photo, video and press materials."],
        },
    },
]

LEADERS = [
    {"slug": "saida-karimova", "name": "Saida Karimova", "theme": "gold", "role": t("Festival tashkiliy qo'mitasi raisi", "Председатель оргкомитета фестиваля", "Chair of the festival organizing committee"), "bio": t("Strategik boshqaruv, davlat hamkorligi va yakuniy tasdiqlash bloklari uchun mas'ul.", "Отвечает за стратегическое управление, взаимодействие с государственными структурами и финальное утверждение решений.", "Responsible for strategic governance, state coordination and final approvals.")},
    {"slug": "bekzod-raximov", "name": "Bekzod Raximov", "theme": "azure", "role": t("Ijrochi kotib va portal koordinatori", "Исполнительный секретарь и координатор портала", "Executive secretary and portal coordinator"), "bio": t("Tahririy kalendar, kontent oqimi va raqamli xizmatlar ishlashini boshqaradi.", "Курирует редакционный календарь, поток контента и работу цифровых сервисов.", "Leads the editorial calendar, content flow and digital services.")},
    {"slug": "dilnoza-mamatova", "name": "Dilnoza Mamatova", "theme": "emerald", "role": t("Madaniy dasturlar va hududiy sahnalar rahbari", "Руководитель культурных программ и региональных площадок", "Lead for cultural programs and regional venues"), "bio": t("Hududiy bloklar, ko'rgazmalar va yoshlar tashabbuslarini muvofiqlashtiradi.", "Координирует региональные блоки, выставки и молодёжные инициативы.", "Coordinates regional blocks, exhibitions and youth initiatives.")},
]

ORGANIZATIONS = [
    {"slug": "media-center", "theme": "azure", "href": "#", "name": t("Festival media markazi", "Медиаштаб фестиваля", "Festival media center"), "scope": t("Yangiliklar, press-relizlar, foto va video oqimi.", "Новости, пресс-релизы, фото- и видеопоток.", "News, press releases, photo and video flow.")},
    {"slug": "regional-group", "theme": "emerald", "href": "#", "name": t("Hududiy koordinatsiya guruhi", "Региональная координационная группа", "Regional coordination group"), "scope": t("Mahalliy dasturlar, logistika va sahna ishlab chiqarish.", "Локальные программы, логистика и сценическое производство.", "Local programs, logistics and stage production.")},
    {"slug": "appeal-center", "theme": "gold", "href": "#", "name": t("Jamoat murojaatlari markazi", "Центр общественных обращений", "Public appeal center"), "scope": t("So'rovlar, fuqarolar murojaatlari va antispam nazorati.", "Запросы, обращения граждан и антиспам-контроль.", "Requests, public appeals and anti-spam control.")},
]

ALBUMS = [
    {"slug": "symbols-exhibition", "type": "photo", "theme": "gold", "date": "2026-04-11", "count": 24, "duration": "", "title": t("Davlat ramzlari va zamonaviy dizayn ko'rgazmasi", "Выставка государственных символов и современного дизайна", "Exhibition of state symbols and contemporary design"), "summary": t("Ochilish haftaligiga mo'ljallangan rasmiy vizual ekspozitsiya.", "Официальная визуальная экспозиция к неделе открытия.", "An official visual exhibition for opening week."), "frames": ["Entry installation", "Archive wall", "Regional design zone", "Light composition"]},
    {"slug": "regional-scenes", "type": "photo", "theme": "emerald", "date": "2026-04-09", "count": 18, "duration": "", "title": t("Hududiy sahnalar va xalq amaliy san'ati albomi", "Альбом региональных сцен и народного декоративного искусства", "Album of regional stages and folk decorative art"), "summary": t("Viloyatlardagi sahna maketlari va hunarmandchilik maydonlari.", "Сценические макеты и ремесленные площадки в регионах.", "Stage models and craft spaces in the regions."), "frames": ["Craft avenue", "Youth pavilion", "Open-air stage", "Interactive archive"]},
    {"slug": "protocol-briefing", "type": "video", "theme": "azure", "date": "2026-04-07", "count": 1, "duration": "08:42", "title": t("Protokol va mehmonlarni kutib olish bo'yicha briefing", "Брифинг по протоколу и встрече официальных гостей", "Briefing on protocol and official guest reception"), "summary": t("Tashkiliy shtab uchun video ko'rsatmalar.", "Видеоинструктаж для организационного штаба.", "A video briefing for the organizing headquarters."), "frames": ["Intro", "Protocol flow", "Press route", "Q&A"]},
]

LEGAL_PAGES = {
    "privacy": {
        "title": t("Maxfiylik siyosati", "Политика конфиденциальности", "Privacy policy"),
        "lead": t("Portal foydalanuvchilari yuborgan aloqa ma'lumotlari va texnik axborotni qayta ishlash qoidalari.", "Правила обработки контактных данных и технической информации, передаваемой через портал.", "Rules for processing contact details and technical information submitted through the portal."),
    },
    "terms": {
        "title": t("Foydalanish qoidalari", "Правила использования", "Terms of use"),
        "lead": t("Portal materiallari va havolalaridan foydalanish bo'yicha umumiy shartlar.", "Общие условия использования материалов и ссылок портала.", "General terms for using portal materials and links."),
    },
    "accessibility": {
        "title": t("Foydalanish qulayligi", "Доступность", "Accessibility"),
        "lead": t("Portalni turli qurilmalar va ehtiyojlarga ega foydalanuvchilar uchun qulay qilish tamoyillari.", "Принципы, по которым портал делается удобным для разных устройств и аудиторий.", "Principles used to keep the portal usable across devices and audience needs."),
    },
}
