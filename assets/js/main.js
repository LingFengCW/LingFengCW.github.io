// 泠沨 · LingFengCW 作品集 —— 站点交互（20 语种 / 水主题）
// 依赖：i18n.js（LF_LANGS / LF_LANG_META / LF_STATUS / LF_UI）
//       i18n.projects.js（LF_TEXT）
(function () {
  "use strict";

  const LANGS = window.LF_LANGS;
  const META = window.LF_LANG_META;
  const UI = window.LF_UI;
  const STATUS = window.LF_STATUS;
  const TEXT = window.LF_TEXT;

  // ---------- 数据：项目骨架（文案全部在 i18n.projects.js，按 id 索引） ----------
  const projects = [
    {
      id: "bbs", glyph: "瀑", name: "泠瀑", en: "Blockbuster Studio Next", cat: "mod", status: "active",
      tags: ["Java", "Fabric", "Gradle", "MCEF"],
      url: "https://github.com/LingFengCW/Blockbuster-Studio-Next",
      release: "https://github.com/LingFengCW/Blockbuster-Studio-Next/releases/latest"
    },
    {
      id: "sandbox", glyph: "浅", name: "泠浅", en: "文明沙盘 · Civilization Sandbox", cat: "game", status: "exp",
      tags: ["C#", "Python", "PyGame", "WinForms"], url: null
    },
    {
      id: "lingmin", glyph: "㴓", name: "泠㴓-N", en: "lingmi-n", cat: "app", status: "dev",
      tags: ["Electron", "Node.js", "JavaScript"], url: null
    },
    {
      id: "lipsync", glyph: "𬇖", name: "泠𬇖", en: "Lip-sync Animation Editor", cat: "app", status: "stop",
      tags: ["Electron", "FFmpeg", "JavaScript"], url: null
    },
    {
      id: "lingsheng", glyph: "泩", name: "泠泩", en: "LingSheng", cat: "mod", status: "exp",
      tags: ["Java", "Fabric", "Gradle"], url: null
    },
    {
      id: "lingzhi", glyph: "瀄", name: "泠瀄", en: "灵芝 · LingzhiPlugin", cat: "mod", status: "exp",
      tags: ["Java", "PaperMC", "Fabric", "Maven"], url: null
    },
    {
      id: "litf", glyph: "汶", name: "泠汶", en: "LightType Font (LITF)", cat: "app", status: "active",
      tags: ["SVG", "Font", "Python", "Spec"],
      url: "https://github.com/LingFengCW/LightTypeFont"
    },
    {
      id: "litfeditor", glyph: "泐", name: "泠泐", en: "LITF Editor", cat: "app", status: "dev",
      tags: ["C#", "WPF", "Avalonia", ".NET"], url: null
    },
    {
      id: "keyframe", glyph: "演", name: "泠演", en: "KeyframeStudio", cat: "app", status: "dev",
      tags: ["C#", ".NET 10", "WPF", "MEF"], url: null
    },
    {
      id: "qqbot", glyph: "汧", name: "泠汧", en: "LingQian · QQ AI Bot", cat: "app", status: "active",
      tags: ["TypeScript", "Node.js", "NapCat", "LLM"], url: null
    },
    {
      id: "hud", glyph: "浮", name: "泠浮", en: "ElemonHud", cat: "app", status: "dev",
      tags: ["Electron", "JavaScript"], url: null
    },
    {
      id: "guichu", glyph: "活", name: "泠活", en: "Guichu Tool · 鬼畜活字乱刷", cat: "app", status: "active",
      tags: ["Electron", "Whisper", "FFmpeg", "JavaScript"], url: null
    },
    {
      id: "aioffice", glyph: "润", name: "泠润", en: "AI Office Suite", cat: "app", status: "dev",
      tags: ["Node.js", "AI", "Document"], url: null
    },
    {
      id: "firailwayops", glyph: "沿", name: "泠沿", en: "FiRailwayOps · 宁风铁路局车务插件", cat: "mod", status: "dev",
      tags: ["Java", "Gradle", "Minecraft"], url: null
    },
    {
      id: "firailwaytool", glyph: "泊", name: "泠泊", en: "FiRailwayTool", cat: "tool", status: "dev",
      tags: ["Web", "JavaScript", "Server"], url: null
    },
    {
      id: "plugincharmgr", glyph: "汇", name: "泠汇", en: "Character Manager", cat: "tool", status: "done",
      tags: ["JavaScript", "Plugin"], url: null
    },
    {
      id: "pluginpitch", glyph: "波", name: "泠波", en: "Pitch Shifter", cat: "tool", status: "done",
      tags: ["JavaScript", "Plugin", "Audio"], url: null
    },
    {
      id: "pluginsettings", glyph: "涵", name: "泠涵", en: "More Settings", cat: "tool", status: "done",
      tags: ["JavaScript", "Plugin"], url: null
    },
    {
      id: "regionmap", glyph: "涂", name: "泠涂", en: "Region Map Studio", cat: "exp", status: "exp",
      tags: ["WebCodecs", "GeoJSON", "Canvas", "JavaScript"], url: null
    },
    {
      id: "macohub", glyph: "治", name: "泠治", en: "MACO Hub · Multi-Agent Collaboration Hub", cat: "exp", status: "exp",
      tags: ["Python", "Multi-Agent", "LLM"], url: null
    }
  ];

  // ---------- 当前语种 ----------
  function readStoredLang() {
    let v = null;
    try { v = localStorage.getItem("lingfeng-lang"); } catch (e) {}
    return (v && LANGS.indexOf(v) !== -1) ? v : "zh";
  }
  let lang = readStoredLang();
  let currentFilter = "all";

  function li() { const i = LANGS.indexOf(lang); return i === -1 ? 0 : i; }
  function t(keys) { const v = UI[lang] || UI.zh; const k = keys; return v[k] != null ? v[k] : (UI.zh[k] != null ? UI.zh[k] : ""); }
  // 取项目文案：优先当前语种，缺失时退回简体中文（数组顺序与 LF_LANGS 一致）
  function pt(id, field) {
    const entry = TEXT[id];
    if (!entry || !entry[field]) return "";
    const arr = entry[field];
    return arr[li()] || arr[0] || "";
  }
  function st(status) {
    const s = STATUS[status] || {};
    return s[lang] || s.zh || status;
  }

  // ---------- 界面文案应用 ----------
  function applyStaticLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      const v = t(k);
      if (v) el.innerHTML = v;
    });
    const m = META[lang] || META.zh;
    document.documentElement.lang = m.html;
    document.documentElement.dir = m.dir;
    const sel = document.getElementById("langSwitch");
    if (sel && sel.value !== lang) sel.value = lang;
  }

  // ---------- 语言下拉构建 ----------
  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) {
    LANGS.forEach(code => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = (META[code] || {}).label || code;
      opt.lang = (META[code] || {}).html || code;
      langSwitch.appendChild(opt);
    });
    langSwitch.value = lang;
    langSwitch.addEventListener("change", () => {
      const next = langSwitch.value;
      if (next === lang || LANGS.indexOf(next) === -1) return;
      lang = next;
      try { localStorage.setItem("lingfeng-lang", lang); } catch (err) {}
      applyStaticLang();
      renderCards(currentFilter);
    });
  }

  // ---------- 渲染：项目卡片 ----------
  const cardsEl = document.getElementById("cards");
  function renderCards(filter) {
    currentFilter = filter;
    cardsEl.innerHTML = "";
    const list = projects.filter(p => filter === "all" || p.cat === filter);
    if (!list.length) {
      cardsEl.innerHTML = '<p style="color:var(--ink-faint)">' + t("empty") + "</p>";
      return;
    }
    list.forEach((p, i) => {
      const link = p.url
        ? `<a class="card-link" href="${p.url}" target="_blank" rel="noopener">${t("card.view")}</a>`
        : `<span class="card-link disabled">${t("card.local")}</span>`;
      const dl = p.release
        ? `<a class="card-link dl" href="${p.release}" target="_blank" rel="noopener">${t("card.dl")}</a>`
        : "";
      const card = document.createElement("article");
      card.className = "card enter";
      card.style.animationDelay = (i * 0.06) + "s";
      card.innerHTML = `
        <div class="card-head">
          <div class="card-name"><span class="card-glyph">${p.glyph}</span>${p.name}</div>
          <span class="badge ${p.status}">${st(p.status)}</span>
        </div>
        <div class="card-en">${p.en}</div>
        <div class="card-type">${pt(p.id, "type")}</div>
        <p class="card-desc">${pt(p.id, "desc")}</p>
        <div class="tags">${p.tags.map(x => `<span class="tag">${x}</span>`).join("")}</div>
        <div class="card-actions">${link}${dl}</div>
      `;
      card.addEventListener("animationend", function handler(e) {
        if (e.animationName === "cardRise") { card.classList.remove("enter"); card.removeEventListener("animationend", handler); }
      });
      cardsEl.appendChild(card);
    });
  }

  // ---------- 筛选交互 ----------
  const filterBar = document.getElementById("filterBar");
  filterBar.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filterBar.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  });

  // ---------- 导航滚动态 ----------
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- 气泡生成 ----------
  const bubbles = document.getElementById("bubbles");
  const BUBBLE_COUNT = 22;
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const b = document.createElement("span");
    b.className = "bubble";
    const size = 5 + Math.random() * 28;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = (Math.random() * 100) + "%";
    b.style.animationDuration = (8 + Math.random() * 14) + "s";
    b.style.animationDelay = (-Math.random() * 18) + "s";
    // 每颗气泡随机横向漂移，避免整片气泡垂直并行上浮
    b.style.setProperty("--sx", (Math.random() * 56 - 28).toFixed(1) + "px");
    bubbles.appendChild(b);
  }

  // ---------- 滚动揭示：.reveal 与章节标题下划线 ----------
  const revealEls = document.querySelectorAll(".reveal, .section-head h2");
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.25 });
  revealEls.forEach(el => revealIO.observe(el));

  // ---------- 上善若水：滚动逐字动画（始终中文）+ 涟漪 ----------
  const inkChars = document.querySelectorAll(".ink-char");
  const inkCaption = document.querySelector(".ink-caption");
  const inkRipple = document.querySelector(".ink-ripple");
  const inkIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        if (en.target.classList.contains("ink-char") || en.target.classList.contains("ink-caption")) {
          en.target.classList.add("show");
        }
        inkIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.4 });
  inkChars.forEach(c => inkIO.observe(c));
  if (inkCaption) inkIO.observe(inkCaption);
  const inkVerse = document.querySelector(".ink-verse");
  if (inkVerse) inkIO.observe(inkVerse);

  // ---------- 水文长卷：每行逐字浮现（始终中文） ----------
  const flowLines = document.querySelectorAll(".flow-line");
  const flowIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); flowIO.unobserve(en.target); }
    });
  }, { threshold: 0.35 });
  flowLines.forEach(l => flowIO.observe(l));
  if (inkRipple) {
    const ripIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          // 重复触发：先清后加，使动画重播
          inkRipple.classList.remove("go");
          void inkRipple.offsetWidth;
          inkRipple.classList.add("go");
          ripIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.35 });
    ripIO.observe(inkRipple);
  }

  // ---------- 数字递增 ----------
  const stats = document.querySelectorAll(".stat-num");
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = Math.max(1, Math.round(target / 30));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
  }
  const statIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { animateCount(en.target); statIO.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  stats.forEach(s => statIO.observe(s));

  // ---------- 初始化 ----------
  applyStaticLang();
  renderCards("all");
  document.getElementById("year").textContent = new Date().getFullYear();

  // 兜底：防止 IntersectionObserver 未触发导致首屏/关于等内容整块空白
  function revealFallback(){
    document.querySelectorAll(".reveal:not(.in)").forEach(el=>{
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) el.classList.add("in");
    });
  }
  window.addEventListener("load", revealFallback);
  setTimeout(()=>{ document.querySelectorAll(".reveal:not(.in)").forEach(el=>el.classList.add("in")); }, 2600);
})();
