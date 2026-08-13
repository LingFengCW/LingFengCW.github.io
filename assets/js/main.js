// 泠沨 · LingFengCW 作品集 —— 站点交互（中英双语 / 水主题）
(function () {
  "use strict";

  // ---------- 双语字典（UI 文案；文字动画区始终用中文） ----------
  const I18N = {
    zh: {
      "nav.about": "关于", "nav.works": "作品",
      "hero.kicker": "LingFengCW · 开发者",
      "hero.sub": "清冷流水，凝而成沨。这里收录我做过的游戏、Minecraft 模组与桌面应用。",
      "hero.btnWorks": "浏览作品", "hero.btnGithub": "访问 GitHub",
      "about.heading": "关于",
      "about.p1": "我是 <strong>泠沨（LingFengCW）</strong>，一名开发者，偏爱从零搭建完整的软件与游戏。",
      "about.p2": "我的项目有一个统一的命名规则：<strong>全部以「泠」字起头，搭配一个水部汉字</strong>——泠浅、泠泩、泠瀄、泠㴓、泠𬇖、泠瀑……取「清冷流水、绵延不绝」之意。本站点同样沿用这一约定，名为「泠沨」。",
      "stat.projects": "泠系主项目", "stat.tech": "技术栈方向", "stat.hand": "% 手写实现",
      "works.heading": "作品 · 泠系项目",
      "filter.all": "全部", "filter.game": "游戏", "filter.mod": "模组", "filter.app": "桌面应用",
      "empty": "该分类下暂无项目。",
      "card.view": "查看项目 →", "card.local": "源码托管于本地", "card.dl": "⬇ 下载最新版",
      "ink.caption": "上善若水 · 出自《道德经》",
      "footer.note": "LingFengCW 个人作品集 · 开发者",
      "footer.top": "回到顶部", "footer.by": "由 泠潮（AI 软件工程师）协助构建"
    },
    en: {
      "nav.about": "About", "nav.works": "Works",
      "hero.kicker": "LingFengCW · Developer",
      "hero.sub": "Cold, clear water condenses into ripples. This is where I keep the games, Minecraft mods, and desktop apps I've built.",
      "hero.btnWorks": "View Works", "hero.btnGithub": "GitHub",
      "about.heading": "About",
      "about.p1": "I'm <strong>LingFengCW (LingFeng)</strong>, a developer who prefers building complete software and games from scratch.",
      "about.p2": "My projects follow one naming rule: each begins with the character 泠 paired with a water-radical character — 泠浅, 泠泩, 泠瀄, 泠㴓, 泠𬇖, 泠瀑 — evoking 'clear, cold, ever-flowing water.' This site follows the same rule and is named 泠沨.",
      "stat.projects": "Ling-series Projects", "stat.tech": "Tech Stacks", "stat.hand": "% Handcrafted",
      "works.heading": "Works · Ling Series",
      "filter.all": "All", "filter.game": "Games", "filter.mod": "Mods", "filter.app": "Apps",
      "empty": "No projects in this category.",
      "card.view": "View Project →", "card.local": "Local Source", "card.dl": "⬇ Download Latest",
      "ink.caption": "The highest good is like water — Laozi",
      "footer.note": "LingFengCW Portfolio · Developer",
      "footer.top": "Back to Top", "footer.by": "Built with 泠潮 (AI Software Engineer)"
    }
  };

  // ---------- 数据：泠系主项目（名称/字形固定中文，描述双语） ----------
  const projects = [
    {
      glyph: "瀑", name: "泠瀑", en: "Blockbuster Studio Next", cat: "mod", status: "active",
      type: { zh: "Minecraft Fabric 模组", en: "Minecraft Fabric Mod" },
      statusText: { zh: "活跃维护", en: "Active" },
      desc: {
        zh: "在 Minecraft 26.2（Fabric）中制作动画与电影：关键帧动画、形态系统、电影级运镜、动作录制。继承自 McHorse 的 BBS mod，由 LingFengCW 维护。",
        en: "Create animations and cinematics inside Minecraft 26.2 (Fabric): keyframe animation, morph system, cinematic camera, action recording. Forked from McHorse's BBS mod, maintained by LingFengCW."
      },
      tags: ["Java", "Fabric", "Gradle", "MCEF"],
      url: "https://github.com/LingFengCW/Blockbuster-Studio-Next",
      release: "https://github.com/LingFengCW/Blockbuster-Studio-Next/releases/latest"
    },
    {
      glyph: "浅", name: "泠浅", en: "文明沙盘 · Civilization Sandbox", cat: "game", status: "exp",
      type: { zh: "沙盘模拟游戏", en: "Sandbox Simulation Game" },
      statusText: { zh: "实验性", en: "Experimental" },
      desc: {
        zh: "基于 Perlin 分形噪声的逼真地形生成，叠加多国家领土扩张与模拟战斗。提供 C#（WinForms 渲染）与 Python/PyGame 双实现。",
        en: "Procedural terrain from Perlin fractal noise with multi-nation territory expansion and simulated warfare. Dual implementation in C# (WinForms) and Python/PyGame."
      },
      tags: ["C#", "Python", "PyGame", "WinForms"], url: null
    },
    {
      glyph: "㴓", name: "泠㴓-N", en: "lingmi-n", cat: "app", status: "dev",
      type: { zh: "文件编辑器（桌面应用）", en: "File Editor (Desktop App)" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "第三方 KittenN（.kn / .bcmkn）文件编辑器，支持局域网协作编辑，附 bcmkn 格式规范文档。基于 Electron 构建。",
        en: "A third-party KittenN (.kn / .bcmkn) file editor with LAN collaboration, including a bcmkn format spec. Built on Electron."
      },
      tags: ["Electron", "Node.js", "JavaScript"], url: null
    },
    {
      glyph: "𬇖", name: "泠𬇖", en: "Lip-sync Animation Editor", cat: "app", status: "stop",
      type: { zh: "桌面应用", en: "Desktop App" },
      statusText: { zh: "已停更", en: "Discontinued" },
      desc: {
        zh: "基于时间轴的口型 / 顶点几何变形对口型动画编辑器，已衍生出音调调节、字符管理等插件生态。项目已停止维护。",
        en: "A timeline-based lip-sync animation editor using mouth-shape / vertex deformation, with a plugin ecosystem (pitch shift, character manager). Development discontinued."
      },
      tags: ["Electron", "FFmpeg", "JavaScript"], url: null
    },
    {
      glyph: "泩", name: "泠泩", en: "LingSheng", cat: "mod", status: "exp",
      type: { zh: "Minecraft 模组", en: "Minecraft Mod" },
      statusText: { zh: "实验性", en: "Experimental" },
      desc: {
        zh: "com.lingsheng 的 Fabric 模组（Java 17），产出 LingSheng-v1.0.0.jar，探索 Minecraft 模组开发。",
        en: "A Fabric mod by com.lingsheng (Java 17), producing LingSheng-v1.0.0.jar, exploring Minecraft modding."
      },
      tags: ["Java", "Fabric", "Gradle"], url: null
    },
    {
      glyph: "瀄", name: "泠瀄", en: "灵芝 · LingzhiPlugin", cat: "mod", status: "exp",
      type: { zh: "服务端插件 + 模组", en: "Server Plugin + Mod" },
      statusText: { zh: "实验性", en: "Experimental" },
      desc: {
        zh: "com.lingzhi 的 Paper 服务端插件（LingzhiPlugin），并提供对应的 Fabric 模组版本（lingzhi-mod.jar）。",
        en: "com.lingzhi's Paper server plugin (LingzhiPlugin), with a corresponding Fabric mod build (lingzhi-mod.jar)."
      },
      tags: ["Java", "PaperMC", "Fabric", "Maven"], url: null
    }
  ];

  let lang = (function () {
    try { return localStorage.getItem("lingfeng-lang") || "zh"; } catch (e) { return "zh"; }
  })();
  let currentFilter = "all";

  // ---------- 文本翻译 ----------
  function applyStaticLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n");
      if (I18N[lang][k] != null) el.innerHTML = I18N[lang][k];
    });
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    document.querySelectorAll("#langSwitch span[data-lang]").forEach(s => {
      s.classList.toggle("active", s.getAttribute("data-lang") === lang);
    });
  }

  // ---------- 渲染：项目卡片 ----------
  const cardsEl = document.getElementById("cards");
  function renderCards(filter) {
    currentFilter = filter;
    cardsEl.innerHTML = "";
    const list = projects.filter(p => filter === "all" || p.cat === filter);
    if (!list.length) {
      cardsEl.innerHTML = '<p style="color:var(--ink-faint)">' + I18N[lang].empty + "</p>";
      return;
    }
    list.forEach((p, i) => {
      const link = p.url
        ? `<a class="card-link" href="${p.url}" target="_blank" rel="noopener">${I18N[lang]["card.view"]}</a>`
        : `<span class="card-link disabled">${I18N[lang]["card.local"]}</span>`;
      const dl = p.release
        ? `<a class="card-link dl" href="${p.release}" target="_blank" rel="noopener">${I18N[lang]["card.dl"]}</a>`
        : "";
      const card = document.createElement("article");
      card.className = "card enter";
      card.style.animationDelay = (i * 0.06) + "s";
      card.innerHTML = `
        <div class="card-head">
          <div class="card-name"><span class="card-glyph">${p.glyph}</span>${p.name}</div>
          <span class="badge ${p.status}">${p.statusText[lang]}</span>
        </div>
        <div class="card-en">${p.en}</div>
        <div class="card-type">${p.type[lang]}</div>
        <p class="card-desc">${p.desc[lang]}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
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

  // ---------- 语言切换 ----------
  const langSwitch = document.getElementById("langSwitch");
  langSwitch.addEventListener("click", e => {
    const span = e.target.closest("span[data-lang]");
    if (!span) return;
    const next = span.getAttribute("data-lang");
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem("lingfeng-lang", lang); } catch (err) {}
    applyStaticLang();
    renderCards(currentFilter);
  });

  // ---------- 导航滚动态 ----------
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---------- 气泡生成 ----------
  const bubbles = document.getElementById("bubbles");
  const BUBBLE_COUNT = 14;
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const b = document.createElement("span");
    b.className = "bubble";
    const size = 6 + Math.random() * 26;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = (Math.random() * 100) + "%";
    b.style.animationDuration = (9 + Math.random() * 12) + "s";
    b.style.animationDelay = (-Math.random() * 16) + "s";
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
})();
