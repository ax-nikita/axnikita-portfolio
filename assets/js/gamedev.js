const COPY = {
  ru: {
    navAbout: "Обо мне",
    navWeb: "WEB",
    navGame: "GameDev",

    heroEyebrow: "Портфолио / GameDev / 2018—2026",
    heroTitleAccent: "Systems / Balance / Tooling.",
    heroText: "Собственные игры и моды: от консольного C++ roguelike до системного моддинга, data-driven баланса и инструментов, которые генерируют контент и проверяют его численно.",
    snapshotCases: "кейса",
    snapshotPeriod: "GameDev / modding",
    snapshotCore: "Основной фокус",
    snapshotOrder: "Актуальные сначала",

    details: "Реализация",
    result: "Результат",
    learned: "Что здесь показательно",

    g1Kicker: "2024—2026 / 7 Days to Die / systems + tooling",
    g1Subtitle: "Weapon systems & build tooling",
    g1Lead: "Глобальная переработка оружия, боеприпасов, лута и прогрессии для 7 Days to Die. Главная часть кейса — собственная PHP-среда разработки, которая собирает мод из правил и данных: контент, баланс, локализацию и справочные материалы.",
    g1DiagramText: "Стоимость рецепта рекурсивно раскладывается до базовых ресурсов. Затем оружие и боеприпасы можно сравнивать не только по урону, но и по цене, износу, дальности, tier-уровню и месту в прогрессии.",
    g1Details: "Данные вынесены в JSON/XML-шаблоны. PHP-пайплайн собирает Items, Recipes, Traders, Loot, модификаторы, оружие, патроны, progression, localization, buffs и game events; отдельно генерирует balance XLSX, build report, иконки и reference-карточки. Названия, описания и подсказки поддерживаются сразу в 3 языках.",
    g1Result: "Один набор данных генерирует игровой контент и аналитику для десятков калибров и вариантов боеприпасов. Система также отдельно адаптирована под IZY-All in One Gun Pack. На выходе получаются готовые игровые XML, таблицы баланса, иконки и локализованный контент для 3 языков.",
    g1Learned: "Здесь хорошо видно, как modding переходит в инженерную систему: контент описывается данными, баланс считается формулами, локализация обновляется вместе с билдом, а визуальные материалы собираются из тех же исходных правил. Это уже не набор ручных правок, а полноценный production pipeline.",
    g1CapIcon: "Реальные иконки / 3 языка",
    g1CapInv: "Инвентарь / тиры и калибры",
    g1CapGuide: "Guide / ammo effects",

    g2Kicker: "2024—2026 / focused mods / Nexus + Steam",
    g2Subtitle: "Small systems / isolated ideas",
    g2Lead: "Небольшие моды использую как отдельные эксперименты над конкретной механикой: точность стрельбы, последствия смерти, инфекция, визуальная читаемость, совместимость со сторонним оружием и баланс другого типа игры.",
    modHeadshots: "Увеличивает ценность точных выстрелов: headshot и dismemberment усилены, body damage снижен.",
    modInfected: "Смерть уменьшает максимальное здоровье, инфекция влияет на голод, регенерацию и позже начинает наносить урон.",
    modCans: "Небольшой visual-mod: русские и более читаемые иконки консервов без изменения игровой логики.",
    modIzy: "Адаптация системы калибров и прогрессии под сторонний weapon pack с отдельной настройкой баланса и возврата гильз.",
    modAirships: "Ребаланс оружия и части конструктивных модулей в Airships: Conquer the Skies: damage, reload, cost, weight, durability, armor, engines и support modules. Цель — уменьшить доминирующие варианты и сделать технологическую прогрессию полезнее.",
    g2Details: "Каждый мод меняет ограниченный набор правил и выпускается отдельно. Это позволяет проверять одну идею без необходимости встраивать её в большой overhaul и проще отслеживать побочные эффекты после обновлений игры.",
    g2Result: "Получился набор небольших публичных модов с разным масштабом: от одного правила combat balance до адаптации глобальной системы под сторонний weapon pack и отдельного ребаланса другой игры.",
    g2Learned: "Не каждую идею нужно превращать в большую систему. Изолированный modlet удобен как проверяемая гипотеза: можно отдельно оценить влияние headshot-множителя, death penalty или economy-параметров и не смешивать результат с десятком других изменений.",

    g3Kicker: "2020—2022 / Mindustry / solo mod",
    g3Subtitle: "Global Survival Mod",
    g3Lead: "Крупный Mindustry-мод, где я самостоятельно делал программирование, game design и новые pixel-art ассеты. Основной объём — новые турели, боеприпасы, качество, уровни, производство и правила прогрессии.",
    g3Details: "Мод разбит на отдельные JS-модули для bullets, ammo, turret factories, multiCrafter и custom builds. Турели получили level/XP, здоровье, shield, regen, armor, reload, ammo quality и luck; часть состояния синхронизируется собственными network packets.",
    g3Result: "Получился большой systems-expansion для Mindustry: 3 калибра, десятки типов боеприпасов, quality 1–5, прокачиваемые турели, случайные характеристики и автоматические multi-crafter производства. Мод опубликован в Steam Workshop на русском и английском.",
    g3Learned: "Контент создаётся через общие factory-функции и правила, поэтому новая турель — это не копия большого класса. При этом игровые характеристики должны сохраняться и синхронизироваться между клиентами: здесь впервые сошлись content tooling, progression и multiplayer state.",

    g4Kicker: "2018 / первая собственная игра / solo",
    g4Subtitle: "Console roguelike",
    g4Lead: "Первая законченная игра: текстовый roguelike на C++ без движка и плагинов. Процедурные комнаты, события, бои, три персонажа, инвентарь, NPC и сохранение собраны в одном полном игровом цикле.",
    g4Details: "Комнаты и текстовые события выбираются процедурно. Есть пошаговые бои, характеристики, предметы, валюта, награды, NPC и save. У трёх персонажей разные правила: Soldier восстанавливается между ходами, Hunter получает дополнительные варианты торговли, Assassin — больше денег и отдельный humorous CIS mode.",
    g4Result: "Игра доведена до рабочего цикла: старт → комнаты и события → combat/loot → развитие персонажа → следующие этажи, с сохранением состояния. Графики не было — весь интерфейс работал в терминале.",
    g4Learned: "Даже без ООП проект уже требовал повторно использовать правила и генерировать контент из списков. Большие switch/case работали на небольшом объёме, но плохо масштабировались — тот же вопрос масштабирования позже я решал в Uranium через factories, а в KazAXLibers через data-driven pipeline.",

    footerEyebrow: "GameDev / systems / tooling",
    footerTitle: "Нужен systems-разработчик?<span>Обсудим задачу.</span>",
    footerText: "Интересны задачи на game systems, balance, modding и инструменты для работы с большим объёмом контента."
  },

  en: {
    navAbout: "About",
    navWeb: "WEB",
    navGame: "GameDev",

    heroEyebrow: "Portfolio / GameDev / 2018—2026",
    heroTitleAccent: "Systems / Balance / Tooling.",
    heroText: "Own games and mods: from a console C++ roguelike to systems modding, data-driven balance and tools that generate content and evaluate it numerically.",
    snapshotCases: "cases",
    snapshotPeriod: "GameDev / modding",
    snapshotCore: "Core focus",
    snapshotOrder: "Current work first",

    details: "Implementation",
    result: "Result",
    learned: "What this demonstrates",

    g1Kicker: "2024—2026 / 7 Days to Die / systems + tooling",
    g1Subtitle: "Weapon systems & build tooling",
    g1Lead: "A global weapon, ammunition, loot and progression overhaul for 7 Days to Die. The core of the case is a custom PHP development environment that builds the mod from rules and data: gameplay content, balance, localization and reference materials.",
    g1DiagramText: "Recipe cost is recursively reduced to base resources. Weapons and ammunition can then be compared not only by damage, but also by cost, wear, range, tier level and progression position.",
    g1Details: "Data lives in JSON/XML templates. The PHP pipeline assembles Items, Recipes, Traders, Loot, modifiers, guns, ammunition, progression, localization, buffs and game events; it also generates balance XLSX files, a build report, icons and reference cards. Names, descriptions and gameplay tips are maintained in 3 languages.",
    g1Result: "One data source generates game content and analytics for dozens of caliber and ammunition variants. The same system was also adapted for IZY-All in One Gun Pack. The outputs are ready-to-use game XML, balance sheets, icons and localized content in 3 languages.",
    g1Learned: "This case shows how modding turns into an engineering system: content is defined in data, balance is calculated through formulas, localization is updated as part of the build, and visual materials are assembled from the same source rules. It is no longer a set of manual edits but a real production pipeline.",
    g1CapIcon: "Real icons / 3 languages",
    g1CapInv: "Inventory / tiers & calibers",
    g1CapGuide: "Guide / ammo effects",

    g2Kicker: "2024—2026 / focused mods / Nexus + Steam",
    g2Subtitle: "Small systems / isolated ideas",
    g2Lead: "I use smaller mods as isolated experiments around one mechanic: aiming precision, consequences of death, infection, visual readability, third-party weapon compatibility and balance in a different type of game.",
    modHeadshots: "Makes precision matter more by increasing headshot/dismemberment value and reducing body damage.",
    modInfected: "Death reduces maximum health; infection affects hunger and regeneration and eventually starts damaging health.",
    modCans: "A small visual mod with Russian, more readable food-can icons and no gameplay changes.",
    modIzy: "Adapts the caliber/progression system to a third-party weapon pack with separate balance and cartridge-case return rules.",
    modAirships: "Rebalances weapons and selected structural modules in Airships: Conquer the Skies — damage, reload, cost, weight, durability, armor, engines and support modules — to reduce dominant options and make technology progression more meaningful.",
    g2Details: "Each mod changes a limited set of rules and ships separately. That makes it possible to test one idea without embedding it into a large overhaul and makes side effects easier to trace after game updates.",
    g2Result: "The result is a set of small public mods with different scales: from a single combat-balance rule to adapting a global system for a third-party weapon pack and rebalancing another game.",
    g2Learned: "Not every design idea needs to become a large system. An isolated modlet works as a testable hypothesis: headshot multipliers, death penalties or economy parameters can be evaluated without mixing the result with dozens of other changes.",

    g3Kicker: "2020—2022 / Mindustry / solo mod",
    g3Subtitle: "Global Survival Mod",
    g3Lead: "A large Mindustry mod where I handled programming, game design and new pixel-art assets myself. The main scope was new turrets, ammunition, quality, levels, production and progression rules.",
    g3Details: "The mod is split into JS modules for bullets, ammo, turret factories, multiCrafter and custom builds. Turrets gained level/XP, health, shield, regen, armor, reload, ammo quality and luck; part of this state is synchronized with custom network packets.",
    g3Result: "The result is a large Mindustry systems expansion: 3 calibers, dozens of ammunition types, quality 1–5, leveling turrets, random characteristics and automatic multi-crafter production. The mod was published in Steam Workshop in Russian and English.",
    g3Learned: "Content is created through shared factory functions and rules, so a new turret is not a copy of a large class. At the same time gameplay state must persist and synchronize between clients: this was where content tooling, progression and multiplayer state first met in one project.",

    g4Kicker: "2018 / first personal game / solo",
    g4Subtitle: "Console roguelike",
    g4Lead: "My first completed game: a text roguelike in C++ without an engine or plugins. Procedural rooms, events, combat, three characters, inventory, NPCs and saving form one complete gameplay loop.",
    g4Details: "Rooms and text events are selected procedurally. The game includes turn-based combat, stats, items, currency, rewards, NPCs and saves. The three characters use different rules: Soldier regenerates between turns, Hunter gets extra trade choices, and Assassin earns more money plus a separate humorous CIS mode.",
    g4Result: "The game reached a complete loop: start → rooms/events → combat/loot → character progression → later floors, with persisted state. There were no graphics; the entire interface ran in the terminal.",
    g4Learned: "Even before OOP, the project already needed reusable rules and content generated from lists. Large switch/case blocks worked at small scale but did not scale well — the same scaling problem was later handled with factories in Uranium and a data-driven pipeline in KazAXLibers.",

    footerEyebrow: "GameDev / systems / tooling",
    footerTitle: "Need a systems developer?<span>Let’s talk.</span>",
    footerText: "I am interested in game systems, balance, modding and tooling for working with large amounts of game content."
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
  try { localStorage.setItem("portfolio-lang",lang); } catch (_) {}
}

document.querySelectorAll("[data-lang-button]").forEach(btn=>{
  btn.addEventListener("click",()=>setLanguage(btn.dataset.langButton));
});

let storedLang=null;
try { storedLang=localStorage.getItem("portfolio-lang"); } catch (_) {}
setLanguage(storedLang==="en"?"en":"ru");

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
document.fonts?.ready?.then(measureCases).catch(()=>{});
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
