const COPY = {
  ru: {
    navAbout: "Обо мне",
    heroEyebrow: "Портфолио / 2019—2026",
    heroTitleAccent: "PHP / JavaScript / WordPress.",
    heroText: "Коммерческие сайты, WordPress-платформы, production и legacy. Сначала — актуальные проекты, ниже — ранние работы и развитие собственного стека.",
        snapshotCases: "кейсов",
        snapshotCommercial: "Коммерческий WEB-опыт",
        snapshotCore: "Основной стек",
        snapshotOrder: "Актуальные сначала",
    details: "Реализация",
    result: "Результат",
    learned: "Что здесь показательно",
    focus: "Технический фокус",
    c1Kicker: "2019 / учебный проект / solo",
    c1Lead: "Первый законченный WEB-проект: интерактивный песенник для гитары. PHP собирал контент из файлов, JavaScript отвечал за поиск, аккорды, темы и управление чтением.",
    c1Details: "PHP собирал исполнителей, песни и темы из файлов. Regex находил аккорды, JS рисовал аппликатуры, поиск и автопрокрутку.",
    c1Result: "В приложении было 132 песни, 19 исполнителей, 27 описаний аккордов и 10 тем. Добавление новой песни не требовало менять HTML или JavaScript: PHP сам находил контент в файловой структуре.",
    c1Learned: "Песни, исполнители и темы хранились в файлах, а PHP автоматически строил из этой структуры интерфейс — без отдельной БД и ручного добавления страниц. JavaScript поверх текста находил аккорды и показывал только нужные аппликатуры для выбранной песни.",
    c2Kicker: "2020—2022 / коммерческая разработка",
    c2Lead: "Первый коммерческий период: небольшие сайты и продукты на Kwork и напрямую. Здесь появились real-time, пользовательские данные, WordPress и регулярная работа по требованиям заказчика.",
    c2Details: "WebSocket-messenger с диалогами, файлами, read status и online-state; игровая платформа с инвентарём и обменом; WordPress-сайт целиком.",
    c2Result: "За этот период были сделаны разные типы коммерческих систем: браузерный messenger, социальная платформа для игроков с инвентарём и обменом, турнирные сетки и полный WordPress-сайт ювелирного магазина.",
    c2Learned: "Самостоятельно реализовал WebSocket-мессенджер без готовой realtime-библиотеки: постоянное соединение обслуживало диалоги, историю, файлы, read status и online-state. Это был первый проект, где backend должен был поддерживать общее состояние нескольких клиентов в реальном времени.",
    c3Kicker: "2021—2022 / свой проект + библиотеки",
    c3Lead: "Личный сайт с аккаунтами, чатом, отзывами и достижениями постепенно превратился в площадку, из которой выросли отдельные PHP- и JavaScript-инструменты.",
    c3Details: "Регистрация, профили, достижения, отзывы и real-time chat. Из проекта выросли AxDB/AxWebSocketServer и axNode/axRequest/axLoader.",
    c3Result: "AxNikita.com включал регистрацию, приглашения, профили, достижения, отзывы и real-time chat. Повторяющаяся логика постепенно выросла в отдельные PHP/JS toolkits: AxDB, AxWebSocketServer, axRequest, axLoader и другие модули.",
    c3Learned: "В AxNikita сделал собственный слой динамического интерфейса: атрибуты в HTML задавали, что и когда загружать, а общий JavaScript выполнял запрос, кешировал результат, обновлял history и переинициализировал вставленные модули. Позже этот подход вырос в reusable axLoader и связанные библиотеки.",
    c4Kicker: "2022—2024 / production / legacy",
        c4Subtitle: "Call center / web commerce",
    c4Lead: "Долгая работа внутри одной большой PHP 7.4 кодовой базы. Здесь основной навык был не в том, чтобы написать всё заново, а в том, чтобы быстро найти нужный контекст и безопасно встроить изменение.",
    legacy1Title: "Internal UI",
    legacy1Text: "Страницы call center, калькуляторы, таблицы и служебные инструменты.",
    legacy2Text: "Существующие классы, feature development, bugfix и расширение legacy-логики.",
    legacy3Title: "External API",
    legacy3Text: "Интеграции доставки, платежей и внешних сервисов.",
    legacy4Title: "Production",
    legacy4Text: "Изменения должны работать рядом с уже существующей функциональностью.",
    c4Details: "Internal tools для call center, калькуляторы, таблицы, платёжные страницы и API-модули доставки и оплаты.",
    c4Result: "За два года в одной PHP 7.4 production-системе я дорабатывал внутренние инструменты call center, платёжные страницы, модули доставки и оплаты, расширяя существующие классы вместо переписывания всей кодовой базы.",
    c4Learned: "Работал со сквозными сценариями внутри живой системы: действие оператора могло проходить через существующие PHP-классы к API доставки или оплаты и возвращаться в интерфейс. Это дало опыт безопасно менять production-логику, не изолируя задачу от соседних зависимостей.",
    c5Kicker: "2025 / коммерческий проект / с нуля",
    c5Lead: "Большой WordPress-портал о родительстве и беременности. Основная техническая задача — не плодить отдельный AJAX под каждый блок, а собрать универсальную динамическую загрузку поверх server-rendered WordPress.",
    c5Details: "Тема WordPress с нуля: domLoader заменяет main и переинициализирует модули; infinite scroll синхронизирует URL. CPT, search, import и SEO.",
    c5Result: "Кастомная WordPress-тема была собрана с нуля и запущена в production. Навигация, динамические блоки и бесконечная лента используют общий domLoader, а сервер продолжает отдавать обычные страницы и URL.",
    c5Learned: "Сделал SPA-подобную навигацию без отдельного frontend-приложения: WordPress рендерит обычную страницу, а JavaScript заменяет только main и заново запускает нужные компоненты. В бесконечной ленте URL меняется вместе с текущей статьёй, сохраняя нормальные ссылки и SEO.",
    c6Kicker: "2025—2026 / платформа для селлеров / full-stack",
        c6Subtitle: "Платформа для селлеров маркетплейсов",
    c6Lead: "Информационная и социальная платформа для селлеров маркетплейсов. Здесь знакомые механики из Momspace были переработаны в более строгую структуру: API, сервисы, обобщённые loaders и отдельные подсистемы.",
    c6Details: "Свой API dispatcher, nonce и weighted rate limiter. InfiniteLoader разделён на Loader / Controller / Service и работает с Post/User/Term/Comment.",
    c6Result: "Собрана рабочая основа портала: лента и новости, профили, рейтинги компаний и пользователей, реакции, закладки, подписки, уведомления и API. Эти функции используют общую инфраструктуру сервисов и загрузки.",
    c6Learned: "Сделал одну систему подгрузки для постов, пользователей, рубрик и комментариев вместо отдельных AJAX-решений. Она сохраняет фильтры, продолжает выдачу с нужного места и возвращает готовый серверный HTML — поэтому infinite scroll, фильтрация и SSR работают через один механизм.",
    c7Kicker: "2025—2026 / другие коммерческие проекты",
    c7Lead: "Два противоположных сценария: в Aurora Trans — развитие собственной базовой WordPress-темы через child theme; в «Сибирском Доме» — работа внутри уже существующей чужой кодовой базы.",
    auroraText: "Child theme поверх axnikitaEngine: 27 reusable Block Patterns, SPA-подобная навигация, калькулятор доставки, формы, новости и интеграция с внешней системой отслеживания грузов.",
    sibirskyText: "Подключился к существующей WordPress-теме: адаптив, JavaScript-сценарии, Rutube/Fancybox, дополнительные блоки и страницы, повторное использование существующих компонентов и SEO landing template.",
    c7Result: "Aurora Trans работает как child theme поверх axnikitaEngine: reusable-блоки, калькулятор доставки, формы и tracking. В «Сибирском Доме» я дорабатывал уже существующую тему: адаптив, JavaScript, видео и SEO-страницы.",
    c7Learned: "В Aurora Trans собственная базовая тема превратилась в инструмент для редактора: 27 Block Patterns позволяют собирать страницы из готовых секций. В «Сибирском Доме» я, наоборот, расширял чужую тему через её ACF-поля, шаблоны и существующие компоненты без переписывания проекта.",
    c7Focus: "Child themes, Block Patterns, ACF, reusable components, внешний tracking, Rutube/Fancybox и responsive frontend.",
    footerEyebrow: "Контакты / работа",
    footerTitle: "Проект или вакансия?<span>Обсудим.</span>",
    footerText: "Если нужен PHP/WordPress/JavaScript-разработчик — отправьте задачу, текущий стек или описание роли."
  },
  en: {
    navAbout: "About",
    heroEyebrow: "Portfolio / 2019—2026",
    heroTitleAccent: "PHP / JavaScript / WordPress.",
    heroText: "Commercial websites, WordPress platforms, production and legacy work. Current projects come first; earlier work below shows how the stack evolved.",
        snapshotCases: "cases",
        snapshotCommercial: "Commercial WEB experience",
        snapshotCore: "Core stack",
        snapshotOrder: "Current work first",
    details: "Implementation",
    result: "Result",
    learned: "What this demonstrates",
    focus: "Technical focus",
    c1Kicker: "2019 / course project / solo",
    c1Lead: "My first completed WEB project: an interactive guitar songbook. PHP discovered content from files; JavaScript handled search, chords, themes and reading controls.",
    c1Details: "PHP built performers, songs and themes from files. Regex detected chords; JS rendered fingering diagrams, search and auto-scroll.",
    c1Result: "The application contained 132 songs, 19 performers, 27 chord descriptions and 10 themes. Adding a song did not require HTML or JavaScript changes because PHP discovered the content from the file structure.",
    c1Learned: "Songs, performers and themes lived in files, and PHP generated the interface from that structure without a database or manually created pages. JavaScript then detected chords in the song text and displayed only the fingering diagrams actually needed.",
    c2Kicker: "2020—2022 / commercial development",
    c2Lead: "My first commercial period: small websites and products through Kwork and direct clients. This is where real-time features, user data, WordPress and regular client requirements entered the work.",
    c2Details: "A WebSocket messenger with dialogs, files, read status and online state; a game community with inventory/trading; a complete WordPress site.",
    c2Result: "This period covered several commercial systems: a browser messenger, a social platform for game players with inventory/trading, tournament brackets and a complete WordPress jewelry-store website.",
    c2Learned: "I implemented the WebSocket messenger myself without a ready-made realtime library: one persistent connection handled dialogs, history, files, read status and online state. It was my first project where the backend had to maintain shared state across several clients in real time.",
    c3Kicker: "2021—2022 / own project + libraries",
    c3Lead: "A personal site with accounts, chat, reviews and achievements gradually became the source of separate reusable PHP and JavaScript tools.",
    c3Details: "Registration, profiles, achievements, reviews and real-time chat. The project produced AxDB/AxWebSocketServer and axNode/axRequest/axLoader.",
    c3Result: "AxNikita.com included registration, invitations, profiles, achievements, reviews and real-time chat. Recurring logic gradually became separate PHP/JS toolkits including AxDB, AxWebSocketServer, axRequest and axLoader.",
    c3Learned: "AxNikita had my own dynamic UI layer: HTML attributes described what and when to load, while shared JavaScript performed requests, cached results, updated history and reinitialized inserted modules. This later became the reusable axLoader approach and related libraries.",
    c4Kicker: "2022—2024 / production / legacy",
        c4Subtitle: "Call center / web commerce",
    c4Lead: "Long-term work inside one large PHP 7.4 codebase. The key skill here was not rewriting everything, but finding the right context quickly and inserting changes safely.",
    legacy1Title: "Internal UI",
    legacy1Text: "Call-center pages, calculators, tables and internal tools.",
    legacy2Text: "Existing classes, feature development, bug fixing and extensions to legacy logic.",
    legacy3Title: "External API",
    legacy3Text: "Delivery, payment and external-service integrations.",
    legacy4Title: "Production",
    legacy4Text: "Changes had to coexist with the functionality already in use.",
    c4Details: "Call-center internal tools, calculators, tables, payment pages and delivery/payment API modules.",
    c4Result: "Over two years in one PHP 7.4 production system I extended call-center tools, payment pages and delivery/payment modules, working through existing classes instead of rewriting the surrounding codebase.",
    c4Learned: "I worked with end-to-end flows inside a live system: an operator action could pass through existing PHP classes to delivery or payment APIs and return to the UI. That gave me practical experience changing production logic without treating a task as isolated from neighboring dependencies.",
    c5Kicker: "2025 / commercial project / from scratch",
    c5Lead: "A large WordPress portal for parenting and pregnancy. The main technical goal was to avoid a separate AJAX handler for every block and build universal dynamic loading over server-rendered WordPress.",
    c5Details: "A WordPress theme from scratch: domLoader replaces main and reinitializes modules; infinite scroll syncs the URL. CPTs, search, imports and SEO.",
    c5Result: "The custom WordPress theme was built from scratch and launched to production. Navigation, dynamic blocks and infinite article loading share domLoader while the server still exposes normal pages and URLs.",
    c5Learned: "I built SPA-like navigation without a separate frontend application: WordPress renders a normal page, while JavaScript replaces only main and reinitializes the required components. During infinite reading the URL follows the current article, preserving normal links and SEO.",
    c6Kicker: "2025—2026 / marketplace sellers platform / full-stack",
        c6Subtitle: "Marketplace sellers platform",
    c6Lead: "An information and social platform for marketplace sellers. Familiar Momspace mechanisms were rebuilt into a stricter structure with APIs, services, generalized loaders and separate subsystems.",
    c6Details: "Custom API dispatcher, nonce checks and weighted rate limiting. InfiniteLoader is split into Loader / Controller / Service for Post/User/Term/Comment.",
    c6Result: "The portal base includes feeds and news, profiles, company/user ratings, reactions, bookmarks, subscriptions, notifications and API endpoints. These features share the same service and loading infrastructure instead of separate handlers.",
    c6Learned: "I built one loading system for posts, users, terms and comments instead of separate AJAX solutions. It preserves filters, continues from the correct position and returns server-rendered HTML, so infinite scroll, filtering and SSR share the same mechanism.",
    c7Kicker: "2025—2026 / other commercial projects",
    c7Lead: "Two opposite scenarios: Aurora Trans extends my own base WordPress theme through a child theme; Sibirsky Dom required working inside an existing third-party codebase.",
    auroraText: "A child theme over axnikitaEngine: 27 reusable Block Patterns, SPA-like navigation, a delivery calculator, forms, news and integration with an external shipment-tracking system.",
    sibirskyText: "I joined an existing WordPress theme: responsive fixes, JavaScript scenarios, Rutube/Fancybox, new blocks and pages, reuse of existing components and an SEO landing template.",
    c7Result: "Aurora Trans runs as a child theme over axnikitaEngine with reusable sections, a delivery calculator, forms and tracking. Sibirsky Dom required precise work inside an existing theme: responsive fixes, JavaScript, video and SEO pages.",
    c7Learned: "In Aurora Trans my base theme became an editor-facing tool: 27 Block Patterns let pages be assembled from ready-made sections. In Sibirsky Dom I did the opposite — extended an existing theme through its ACF fields, templates and components without rewriting the project.",
    c7Focus: "Child themes, Block Patterns, ACF, reusable components, external tracking, Rutube/Fancybox and responsive frontend.",
    footerEyebrow: "Contact / work",
    footerTitle: "Project or role?<span>Let’s talk.</span>",
    footerText: "If you need a PHP / WordPress / JavaScript developer, send the task, current stack or role description."
  }
};

function setLanguage(lang){
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll("[data-copy]").forEach(el=>{
    const value=COPY[lang][el.dataset.copy];
    if(value!==undefined) el.innerHTML=value;
  });
  document.querySelectorAll("[data-lang-button]").forEach(btn=>{
    btn.setAttribute("aria-pressed",String(btn.dataset.langButton===lang));
  });
  localStorage.setItem("portfolio-lang",lang);
}

document.querySelectorAll("[data-lang-button]").forEach(btn=>{
  btn.addEventListener("click",()=>setLanguage(btn.dataset.langButton));
});
setLanguage(localStorage.getItem("portfolio-lang")==="en"?"en":"ru");

/* Case index active state + continuous mobile progress */
const caseLinks=[...document.querySelectorAll(".case-index a")];
const cases=[...document.querySelectorAll(".case")];
const caseIndex=document.querySelector(".case-index");

let caseMetrics=[];
let scrollTicking=false;
let currentCase=-1;

function clamp(value,min,max){
  return Math.min(max,Math.max(min,value));
}

function measureCases(){
  caseMetrics=cases.map(section=>({
    id:section.id,
    top:section.getBoundingClientRect().top+window.scrollY
  }));
  updateCaseProgress();
}

function syncRailCaptionContrast(){
  if(!caseIndex || window.innerWidth>820)return;

  const captions=[
    caseIndex.querySelector(".case-rail-fixed-label"),
    caseIndex.querySelector(".case-rail-fixed-count")
  ].filter(Boolean);

  captions.forEach(caption=>{
    const rect=caption.getBoundingClientRect();
    const x=clamp(rect.left+rect.width/2,0,window.innerWidth-1);
    const y=clamp(rect.top+rect.height/2,0,window.innerHeight-1);

    const behind=document.elementsFromPoint(x,y).find(node=>!caseIndex.contains(node));
    const darkContext=Boolean(
      behind?.closest?.(".case--dark,.case--featured,.site-footer")
    );

    caption.style.color=darkContext ? "var(--bg)" : "var(--dark)";
  });
}

function updateCaseProgress(){
  if(!caseMetrics.length)return;

  /*
   * A fixed "reading line" in the upper third of the viewport decides
   * which case is active. This is deterministic: no competing observer
   * callbacks when two large sections intersect at once.
   */
  const readingLine=window.scrollY+window.innerHeight*.34;

  let activeIndex=0;
  for(let i=0;i<caseMetrics.length;i++){
    if(readingLine>=caseMetrics[i].top) activeIndex=i;
    else break;
  }

  if(activeIndex!==currentCase){
    currentCase=activeIndex;

    caseLinks.forEach((link,index)=>{
      const active=index===activeIndex;
      link.classList.toggle("is-active",active);

      if(active) link.setAttribute("aria-current","step");
      else link.removeAttribute("aria-current");
    });

    const activeLink=caseLinks[activeIndex];
    const number=activeLink?.querySelector("span:first-child")?.textContent?.trim()||"";
    const label=activeLink?.querySelector("span:last-child")?.textContent?.trim()||"";

    caseIndex?.style.setProperty("--active-case-number",`"${number}"`);
    caseIndex?.style.setProperty("--active-case-label",`"${label}"`);

    const fixedRailLabel=caseIndex?.querySelector(".case-rail-fixed-label");
    if(fixedRailLabel) fixedRailLabel.textContent=label;

    const fixedRailCount=caseIndex?.querySelector(".case-rail-fixed-count");
    if(fixedRailCount) fixedRailCount.textContent=`${number}/${String(cases.length).padStart(2,"0")}`;

    const activeCase=cases[activeIndex];
    const activeCaseIsDark=Boolean(
      activeCase?.classList.contains("case--dark") ||
      activeCase?.classList.contains("case--featured")
    );

    caseIndex?.classList.toggle("case-rail--dark",activeCaseIsDark);
    caseIndex?.classList.toggle("case-rail--light",!activeCaseIsDark);
  }

  /*
   * The line fills continuously between the first and last project,
   * instead of jumping 1/6 at a time when activeCase changes.
   */
  const first=caseMetrics[0].top;
  const last=caseMetrics[caseMetrics.length-1].top;
  const progress=last>first ? clamp((readingLine-first)/(last-first),0,1) : 0;

  caseIndex?.style.setProperty("--case-progress",progress.toFixed(4));
  syncRailCaptionContrast();
}

function requestCaseProgress(){
  if(scrollTicking)return;
  scrollTicking=true;

  requestAnimationFrame(()=>{
    updateCaseProgress();
    scrollTicking=false;
  });
}

window.addEventListener("scroll",requestCaseProgress,{passive:true});
window.addEventListener("resize",()=>{
  window.clearTimeout(window.__caseResizeTimer);
  window.__caseResizeTimer=window.setTimeout(measureCases,120);
});
window.addEventListener("load",measureCases);
measureCases();

/* Lightbox */
const lightbox=document.getElementById("lightbox");
const lightboxImg=lightbox.querySelector("img");
document.querySelectorAll("[data-lightbox]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    lightboxImg.src=btn.dataset.lightbox;
    lightboxImg.alt=btn.querySelector("img")?.alt||"";
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox-close").addEventListener("click",()=>lightbox.close());
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.close()});
