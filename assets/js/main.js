// 泠沨 · LingFengCW 作品集 —— 站点交互
(function () {
  "use strict";

  // ---------- 数据：泠系主项目 ----------
  const projects = [
    {
      glyph: "瀑", name: "泠瀑", en: "Blockbuster Studio Next",
      type: "Minecraft Fabric 模组", cat: "mod", status: "active",
      statusText: "活跃维护",
      desc: "在 Minecraft 26.2（Fabric）中制作动画与电影：关键帧动画、形态系统、电影级运镜、动作录制。继承自 McHorse 的 BBS mod，由 LingFengCW 维护。",
      tags: ["Java", "Fabric", "Gradle", "MCEF/Chromium"],
      url: "https://github.com/LingFengCW/Blockbuster-Studio-Next",
      release: "https://github.com/LingFengCW/Blockbuster-Studio-Next/releases/latest"
    },
    {
      glyph: "浅", name: "泠浅", en: "文明沙盘 · Civilization Sandbox",
      type: "沙盘模拟游戏", cat: "game", status: "exp",
      statusText: "实验性",
      desc: "基于 Perlin 分形噪声的逼真地形生成，叠加多国家领土扩张与模拟战斗。提供 C#（WinForms 渲染）与 Python/PyGame 双实现。",
      tags: ["C#", "Python", "PyGame", "WinForms"],
      url: null
    },
    {
      glyph: "㴓", name: "泠㴓-N", en: "lingmi-n",
      type: "文件编辑器（桌面应用）", cat: "app", status: "dev",
      statusText: "开发中",
      desc: "第三方 KittenN（.kn / .bcmkn）文件编辑器，支持局域网协作编辑，附 bcmkn 格式规范文档。基于 Electron 构建。",
      tags: ["Electron", "Node.js", "JavaScript"],
      url: null
    },
    {
      glyph: "𬇖", name: "泠𬇖", en: "对口型动画编辑器（曾名 泠潮）",
      type: "桌面应用", cat: "app", status: "stop",
      statusText: "已停更",
      desc: "基于时间轴的口型 / 顶点几何变形对口型动画编辑器，已衍生出音调调节、字符管理等插件生态。项目已停止维护。",
      tags: ["Electron", "FFmpeg", "JavaScript", "HTML/CSS"],
      url: null
    },
    {
      glyph: "泩", name: "泠泩", en: "LingSheng",
      type: "Minecraft 模组", cat: "mod", status: "exp",
      statusText: "实验性",
      desc: "com.lingsheng 的 Fabric 模组（Java 17），产出 LingSheng-v1.0.0.jar，探索 Minecraft 模组开发。",
      tags: ["Java", "Fabric", "Gradle"],
      url: null
    },
    {
      glyph: "瀄", name: "泠瀄", en: "灵芝 · LingzhiPlugin",
      type: "服务端插件 + 模组", cat: "mod", status: "exp",
      statusText: "实验性",
      desc: "com.lingzhi 的 Paper 服务端插件（LingzhiPlugin），并提供对应的 Fabric 模组版本（lingzhi-mod.jar）。",
      tags: ["Java", "PaperMC", "Fabric", "Maven"],
      url: null
    }
  ];

  // ---------- 数据：辅助工具 ----------
  const tools = [
    { name: "音调调节", desc: "基于 FFmpeg asetrate+atempo 的片段变调插件，保持时长仅改变音调。", tags: ["Electron", "FFmpeg"] },
    { name: "字符管理器", desc: "角色分组、字符编辑与自定义音频导入插件，配套对口型编辑器使用。", tags: ["Electron", "IPC"] },
    { name: "鬼畜工具", desc: "多媒体处理工具集（含 dll / pak 资源处理）。", tags: ["多媒体", "工具集"] },
    { name: "签名", desc: "代码签名工具链（pfx / cer / pvk 及相关脚本）。", tags: ["签名", "安全"] }
  ];

  // ---------- 渲染：项目卡片 ----------
  const cardsEl = document.getElementById("cards");
  function renderCards(filter) {
    cardsEl.innerHTML = "";
    const list = projects.filter(p => filter === "all" || p.cat === filter);
    if (!list.length) {
      cardsEl.innerHTML = '<p style="color:var(--ink-faint)">该分类下暂无项目。</p>';
      return;
    }
    list.forEach((p, i) => {
      const link = p.url
        ? `<a class="card-link" href="${p.url}" target="_blank" rel="noopener">查看项目 →</a>`
        : `<span class="card-link disabled">源码托管于本地</span>`;
      const dl = p.release
        ? `<a class="card-link dl" href="${p.release}" target="_blank" rel="noopener">⬇ 下载最新版</a>`
        : "";
      const card = document.createElement("article");
      card.className = "card";
      card.style.animationDelay = (i * 0.06) + "s";
      card.innerHTML = `
        <div class="card-head">
          <div class="card-name"><span class="card-glyph">${p.glyph}</span>${p.name}</div>
          <span class="badge ${p.status}">${p.statusText}</span>
        </div>
        <div class="card-en">${p.en}</div>
        <div class="card-type">${p.type}</div>
        <p class="card-desc">${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="card-actions">${link}${dl}</div>
      `;
      cardsEl.appendChild(card);
    });
  }

  // ---------- 渲染：工具 ----------
  const toolGrid = document.getElementById("toolGrid");
  tools.forEach(t => {
    const el = document.createElement("div");
    el.className = "tool";
    el.innerHTML = `
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <div class="tags">${t.tags.map(x => `<span class="tag">${x}</span>`).join("")}</div>
    `;
    toolGrid.appendChild(el);
  });

  // ---------- 筛选交互 ----------
  const filterBar = document.getElementById("filterBar");
  filterBar.addEventListener("click", e => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filterBar.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  });
  renderCards("all");

  // ---------- 导航滚动态 ----------
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  stats.forEach(s => io.observe(s));

  // ---------- 年份 ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
