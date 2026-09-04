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
      "about.p2": "我的项目有一个统一的命名规则：<strong>全部以「泠」字起头，搭配一个水部汉字</strong>——泠浅、泠泩、泠瀄、泠㴓、泠𬇖、泠瀑……取「清冷流水、绵延不绝」之意。",
      "about.p3": "我生于 <strong>2015 年 4 月 22 日</strong>，今年 11 岁。",
      "works.lead": "十个以「泠」为名的项目，另有工具与实验性作品——从游戏、模组到桌面应用，皆由我手写构建。",
      "stat.projects": "泠系主项目", "stat.tech": "技术栈方向", "stat.hand": "% 手写实现",
      "works.heading": "作品 · 泠系项目",
      "filter.all": "全部", "filter.game": "游戏", "filter.mod": "模组", "filter.app": "应用",
      "filter.tool": "工具", "filter.exp": "实验",
      "empty": "该分类下暂无项目。",
      "card.view": "查看项目 →", "card.local": "源码托管于本地", "card.dl": "⬇ 下载最新版",
      "ink.caption": "上善若水 · 出自《道德经》",
      "footer.note": "LingFengCW · 开发者",
      "footer.top": "回到顶部", "footer.by": "由 泠潮（AI 软件工程师）协助构建"
    },
    en: {
      "nav.about": "About", "nav.works": "Works",
      "hero.kicker": "LingFengCW · Developer",
      "hero.sub": "Cold, clear water condenses into ripples. This is where I keep the games, Minecraft mods, and desktop apps I've built.",
      "hero.btnWorks": "View Works", "hero.btnGithub": "GitHub",
      "about.heading": "About",
      "about.p1": "I'm <strong>LingFengCW (LingFeng)</strong>, a developer who prefers building complete software and games from scratch.",
      "about.p2": "My projects follow one naming rule: each begins with the character 泠 paired with a water-radical character — 泠浅, 泠泩, 泠瀄, 泠㴓, 泠𬇖, 泠瀑 — evoking 'clear, cold, ever-flowing water.'",
      "about.p3": "Born on <strong>April 22, 2015</strong> — 11 years old.",
      "works.lead": "Ten projects under the name 泠, plus tools and experiments — spanning games, mods, and desktop apps, all handcrafted by me.",
      "stat.projects": "Ling-series Projects", "stat.tech": "Tech Stacks", "stat.hand": "% Handcrafted",
      "works.heading": "Works · Ling Series",
      "filter.all": "All", "filter.game": "Games", "filter.mod": "Mods", "filter.app": "Apps",
      "filter.tool": "Tools", "filter.exp": "Experiments",
      "empty": "No projects in this category.",
      "card.view": "View Project →", "card.local": "Local Source", "card.dl": "⬇ Download Latest",
      "ink.caption": "The highest good is like water — Laozi",
      "footer.note": "LingFengCW · Developer",
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
    },
    {
      glyph: "汶", name: "泠汶", en: "LightType Font (LITF)", cat: "app", status: "active",
      type: { zh: "开源矢量字体格式", en: "Open Vector Font Format" },
      statusText: { zh: "活跃维护", en: "Active" },
      desc: {
        zh: "轻量开源矢量字体格式：字形轮廓直接存为 SVG path，扁平的「定长头 + 有序字形数组」结构，32 位码点原生支持超大字符集，不设 CMAP / HMTX / GSUB 表，第三方约半小时即可写出解析器。中文代号「泠汶」，公开名为 LightType Font。",
        en: "A lightweight open-source vector font format: glyph outlines stored directly as SVG path data in a flat fixed-header + sorted-glyph-array layout. 32-bit codepoints natively support huge character sets; there are no CMAP / HMTX / GSUB tables, so a third-party parser takes about half an hour. Chinese codename 泠汶; public name LightType Font."
      },
      tags: ["SVG", "Font", "Python", "Spec"],
      url: "https://github.com/LingFengCW/LightTypeFont"
    },
    {
      glyph: "泐", name: "泠泐", en: "LITF Editor", cat: "app", status: "dev",
      type: { zh: "字体编辑器（桌面应用）", en: "Font Editor (Desktop App)" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "适配 LITF 格式的字体编辑器，提供 C# WPF 与 Avalonia 双实现，附格式转换器（LITF.Converter）与字形预览、字体比对脚本。",
        en: "A font editor for the LITF format with both C# WPF and Avalonia implementations, bundled with a format converter (LITF.Converter), glyph preview, and font comparison scripts."
      },
      tags: ["C#", "WPF", "Avalonia", ".NET"], url: null
    },
    {
      glyph: "澋", name: "泠澋", en: "KeyframeStudio", cat: "app", status: "dev",
      type: { zh: "关键帧动画编辑器", en: "Keyframe Animation Editor" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "C# / .NET 10 + WPF 实现的轻量关键帧动画编辑器：分作品管理、父子节点世界变换叠加、编组、基于 MEF 与隔离 AssemblyLoadContext 的插件体系，属性关键帧支持线性与缓动插值。",
        en: "A lightweight keyframe animation editor in C# / .NET 10 + WPF: multi-work management, parent-child world transform stacking, grouping, a MEF plugin system on an isolated AssemblyLoadContext, and property keyframes with linear and easing interpolation."
      },
      tags: ["C#", ".NET 10", "WPF", "MEF"], url: null
    },
    {
      glyph: "汧", name: "泠汧", en: "LingQian · QQ AI Bot", cat: "app", status: "active",
      type: { zh: "QQ 群聊 AI 机器人", en: "QQ Group Chat AI Bot" },
      statusText: { zh: "活跃维护", en: "Active" },
      desc: {
        zh: "基于 NapCat 的 QQ 群聊机器人框架，接入本地 DeepSeek 模型（node-llama-cpp），使用 sql.js 做持久化，支持图片处理与 WebSocket 通信。",
        en: "A QQ group chat bot framework built on NapCat, wired to a local DeepSeek model (node-llama-cpp), with sql.js persistence, image processing, and WebSocket transport."
      },
      tags: ["TypeScript", "Node.js", "NapCat", "LLM"], url: null
    },
    {
      glyph: "屏", name: "ElemonHud", en: "ElemonHud", cat: "app", status: "dev",
      type: { zh: "桌面悬浮信息面板", en: "Desktop HUD Overlay" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "基于 Electron 的桌面悬浮信息面板（HUD），已打包 Windows 可执行版本，用于在游戏或桌面上叠加实时信息。",
        en: "An Electron-based floating desktop info panel (HUD), packaged as a Windows executable for overlaying live information on games or the desktop."
      },
      tags: ["Electron", "JavaScript"], url: null
    },
    {
      glyph: "字", name: "鬼畜工具", en: "Guichu Tool · 鬼畜活字乱刷", cat: "app", status: "active",
      type: { zh: "视频字库编排工具", en: "Video Glyph-library Tool" },
      statusText: { zh: "活跃维护", en: "Active" },
      desc: {
        zh: "「鬼畜活字乱刷」——视频字库编排工具：按时间轴编排字幕字库并生成鬼畜效果，内置 Whisper 语音识别，Electron 打包发布（v1.0.3）。",
        en: "A video glyph-library arrangement tool: compose subtitle glyph banks on a timeline to generate 'guichu' remix effects, with built-in Whisper speech recognition. Shipped as an Electron desktop app (v1.0.3)."
      },
      tags: ["Electron", "Whisper", "FFmpeg", "JavaScript"], url: null
    },
    {
      glyph: "文", name: "ai-office", en: "AI Office Suite", cat: "app", status: "dev",
      type: { zh: "AI 文档办公套件", en: "AI Office Suite" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "轻量 AI 办公软件：多格式文档查看、可自定义 AI 接口、带附件上下文的对话，以及可视化的差异编辑。",
        en: "A lightweight AI office app: multi-format document viewing, a customizable AI API backend, attachment-aware chat, and visualized diff editing."
      },
      tags: ["Node.js", "AI", "Document"], url: null
    },
    {
      glyph: "铁", name: "FiRailwayOps", en: "FiRailwayOps · 宁风铁路局车务插件", cat: "mod", status: "dev",
      type: { zh: "Minecraft 服务器插件", en: "Minecraft Server Plugin" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "为「宁风铁路局」服务器定制的车务插件：八类车次编号（G/T/C/P/H/L/Z/S）、线路编码与命名规则、到发站播报模板的集中管理。",
        en: "A railway operations plugin for the Ningfeng Railway Bureau server: eight train-number classes (G/T/C/P/H/L/Z/S), line coding and naming rules, and centralized arrival/departure announcement templates."
      },
      tags: ["Java", "Gradle", "Minecraft"], url: null
    },
    {
      glyph: "轨", name: "FiRailwayTool", en: "FiRailwayTool", cat: "tool", status: "dev",
      type: { zh: "铁路数据工具（Web + 服务）", en: "Railway Data Tool (Web + Server)" },
      statusText: { zh: "开发中", en: "In Development" },
      desc: {
        zh: "宁风铁路局的配套工具：前端页面加后端服务，用于线路与车次数据的查看与维护。",
        en: "A companion tool for the Ningfeng Railway Bureau: a web front end plus a backend service for viewing and maintaining line and train-number data."
      },
      tags: ["Web", "JavaScript", "Server"], url: null
    },
    {
      glyph: "符", name: "字符管理器", en: "Character Manager", cat: "tool", status: "done",
      type: { zh: "泠𬇖 插件", en: "Lingmian Plugin" },
      statusText: { zh: "已完成", en: "Complete" },
      desc: {
        zh: "泠𬇖 对口型编辑器的插件：字符分组、批量重命名与自定义音频导入。",
        en: "A Lingmian (lip-sync editor) plugin for character grouping, batch renaming, and custom audio import."
      },
      tags: ["JavaScript", "Plugin"], url: null
    },
    {
      glyph: "调", name: "音调调节", en: "Pitch Shifter", cat: "tool", status: "done",
      type: { zh: "泠𬇖 插件", en: "Lingmian Plugin" },
      statusText: { zh: "已完成", en: "Complete" },
      desc: {
        zh: "泠𬇖 对口型编辑器的插件：逐字 / 逐组调整音频音调（pitch）。",
        en: "A Lingmian (lip-sync editor) plugin for per-character and per-group audio pitch adjustment."
      },
      tags: ["JavaScript", "Plugin", "Audio"], url: null
    },
    {
      glyph: "设", name: "更多设置", en: "More Settings", cat: "tool", status: "done",
      type: { zh: "泠𬇖 插件", en: "Lingmian Plugin" },
      statusText: { zh: "已完成", en: "Complete" },
      desc: {
        zh: "泠𬇖 对口型编辑器的插件：扩展设置项，含批量并发、自动清理、导出质量与播放默认值。",
        en: "A Lingmian (lip-sync editor) plugin adding extended settings: batch concurrency, auto cleanup, export quality, and playback defaults."
      },
      tags: ["JavaScript", "Plugin"], url: null
    },
    {
      glyph: "图", name: "RegionMapStudio", en: "Region Map Studio", cat: "exp", status: "exp",
      type: { zh: "区域点亮视频生成器", en: "Region Lighting Video Generator" },
      statusText: { zh: "实验性", en: "Experimental" },
      desc: {
        zh: "GD 风格的中国区域点亮视频生成器：基于阿里 DataV.GeoAtlas 的省 / 市 / 县三级 GeoJSON，逐帧点亮并用 WebCodecs 直接导出视频。单 HTML 文件，无需后端。",
        en: "A Geometry-Dash-style China region-lighting video generator: province/city/county GeoJSON from Alibaba DataV.GeoAtlas, lit frame by frame and exported directly via WebCodecs. A single HTML file with no backend."
      },
      tags: ["WebCodecs", "GeoJSON", "Canvas", "JavaScript"], url: null
    },
    {
      glyph: "枢", name: "MACO Hub", en: "MACO Hub · Multi-Agent Collaboration Hub", cat: "exp", status: "exp",
      type: { zh: "多智能体协作中枢", en: "Multi-Agent Collaboration Hub" },
      statusText: { zh: "实验性", en: "Experimental" },
      desc: {
        zh: "多智能体协作中枢（Python）：访问平面、治理平面与上下文蒸馏等分层模块，探索多 AI 并发协作的调度与治理机制。",
        en: "A multi-agent collaboration hub in Python: layered modules for the access plane, governance plane, and context distillation, exploring scheduling and governance for concurrent multi-AI cooperation."
      },
      tags: ["Python", "Multi-Agent", "LLM"], url: null
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
