/*!
 * Dosify Theme — 多级可折叠侧边栏插件
 * ------------------------------------------------------------------
 * 能力：
 *  1. 一级 / 二级 / 三级目录均可展开、收起；
 *  2. 目录项未设置链接时渲染为纯文本（仅作分组标题）；
 *  3. 目录项设置了链接时可点击跳转，箭头单独负责折叠；
 *  4. 展开状态下若条目过长，各级标题吸附在侧边栏顶部，便于快速收起；
 *  5. 展开状态持久化到 localStorage，路由切换后自动展开当前页面所在路径；
 *  6. 移动端抽屉：自动注入遮罩层（置于 main 内，避免遮挡侧边栏），
 *     点击遮罩或按 Esc 关闭；
 *  7. 桌面端：菜单按钮常驻，可收起 / 展开侧边栏，收起状态同样记忆。
 * 配置见 index.html 中的 window.$docsify.dosifySidebar
 */
(function () {
  'use strict';

  var cfg = (window.$docsify && window.$docsify.dosifySidebar) || {};
  var MAX_LEVEL = cfg.maxLevel == null ? 3 : cfg.maxLevel;
  var DEFAULT_OPEN_LEVEL = cfg.defaultOpenLevel == null ? 1 : cfg.defaultOpenLevel;
  var STICKY = cfg.sticky !== false;
  var PERSIST = cfg.persist !== false;
  var ROW_HEIGHT = cfg.rowHeight || 34;
  var STORAGE_KEY = 'dosify:sidebar:open:v1';

  var observer = null;
  var rafId = null;
  var saveTimer = null;
  var running = false;
  var state = { loaded: false, open: Object.create(null) };

  /* ---------------------------------------------------------------- utils */

  function closestLi(el) {
    var p = el && el.parentElement;
    while (p) {
      if (p.tagName === 'LI') return p;
      p = p.parentElement;
    }
    return null;
  }

  function directChild(el, selector) {
    if (!el) return null;
    var kids = el.children;
    for (var i = 0; i < kids.length; i++) {
      if (kids[i].matches(selector)) return kids[i];
    }
    return null;
  }

  function normalize(text) {
    return String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
  }

  function hasContent(node) {
    if (!node) return false;
    if (node.nodeType === 1) return true;
    return node.nodeType === 3 && /\S/.test(node.nodeValue || '');
  }

  function unwrapParagraphs(el) {
    var p = directChild(el, 'P');
    while (p) {
      while (p.firstChild) el.insertBefore(p.firstChild, p);
      el.removeChild(p);
      p = directChild(el, 'P');
    }
  }

  function safe(fn) {
    try { return fn(); } catch (e) { return null; }
  }

  /* ------------------------------------------------------------ 状态存取 */

  function loadState() {
    if (state.loaded) return;
    state.loaded = true;
    if (!PERSIST) return;
    var raw = safe(function () { return window.localStorage.getItem(STORAGE_KEY); });
    if (!raw) return;
    var parsed = safe(function () { return JSON.parse(raw); });
    if (parsed && typeof parsed === 'object') state.open = parsed;
  }

  function persist() {
    if (!PERSIST) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      safe(function () { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.open)); });
    }, 120);
  }

  /* --------------------------------------------------------- 目录结构处理 */

  // 生成稳定的层级键：由各级标题文本串联而成
  function makeKey(li) {
    var parts = [];
    var node = li;
    while (node) {
      if (node.classList && node.classList.contains('dosify-folder')) {
        var lbl = directChild(node, '.dosify-label');
        if (lbl) parts.unshift(normalize(lbl.textContent));
      }
      node = closestLi(node);
    }
    return parts.join(' / ');
  }

  function buildLabels(ul, depth) {
    var lis = [];
    for (var i = 0; i < ul.children.length; i++) {
      if (ul.children[i].tagName === 'LI') lis.push(ul.children[i]);
    }

    lis.forEach(function (li) {
      if (li.getAttribute('data-depth') == null) li.setAttribute('data-depth', String(depth));
      // 清除 docsify 默认折叠可能留下的内联样式，避免冲突
      li.style.display = '';
      li.classList.remove('collapse');

      var sub = directChild(li, 'UL');

      /* ---- 叶子项：无子列表 ---- */
      if (!sub) {
        // docsify 可能把内容包在 <p> 中，先拆掉再判断是否为链接
        unwrapParagraphs(li);
        var isLink = !!directChild(li, 'A');
        if (!isLink && !directChild(li, '.dosify-text')) {
          var meaningful = false;
          for (var j = 0; j < li.childNodes.length; j++) {
            if (hasContent(li.childNodes[j])) { meaningful = true; break; }
          }
          if (meaningful) {
            // 未设置链接 → 渲染为纯文本
            var span = document.createElement('span');
            span.className = 'dosify-text';
            while (li.firstChild) span.appendChild(li.firstChild);
            li.appendChild(span);
          }
        }
        return;
      }

      /* ---- 分组项：含子列表 ---- */
      li.classList.add('dosify-folder');

      var label = directChild(li, '.dosify-label');
      if (!label) {
        label = document.createElement('div');
        label.className = 'dosify-label';
        var moved = [];
        var n = li.firstChild;
        while (n && n !== sub) { moved.push(n); n = n.nextSibling; }
        moved.forEach(function (node) { label.appendChild(node); });
        li.insertBefore(label, sub);
      }
      unwrapParagraphs(label);
      label.classList.add('dosify-header');
      label.style.setProperty('--dosify-depth', String(depth));
      if (STICKY) {
        // 第 1/2/3 级依次错开吸顶高度，滚动时三层标题同时可见
        label.style.setProperty('--dosify-sticky-top', ((depth - 1) * ROW_HEIGHT) + 'px');
      }

      if (depth <= MAX_LEVEL) {
        if (!directChild(label, '.dosify-toggle')) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'dosify-toggle';
          btn.setAttribute('aria-expanded', 'false');
          btn.setAttribute('aria-label', '展开或收起：' + normalize(label.textContent));
          label.appendChild(btn);
        }
      } else {
        // 超出可折叠层级：始终展开
        li.classList.add('dosify-static');
      }

      buildLabels(sub, depth + 1);
    });
  }

  /* -------------------------------------------------------------- 展开控制 */

  function setOpen(li, open, record) {
    li.classList.toggle('open', !!open);
    var label = directChild(li, '.dosify-label');
    var btn = label && directChild(label, '.dosify-toggle');
    if (btn) btn.setAttribute('aria-expanded', String(!!open));
    if (record && li.dataset.dosifyKey) {
      state.open[li.dataset.dosifyKey] = !!open;
      persist();
    }
  }

  function eachFolder(fn) {
    Array.prototype.forEach.call(
      document.querySelectorAll('.sidebar-nav li.dosify-folder'),
      fn
    );
  }

  function applyState() {
    loadState();
    eachFolder(function (li) {
      if (!li.dataset.dosifyKey) {
        li.dataset.dosifyKey = makeKey(li) || ('dosify-' + Math.random().toString(36).slice(2, 7));
      }
      var depth = parseInt(li.getAttribute('data-depth'), 10) || 1;
      var key = li.dataset.dosifyKey;
      var open;
      if (depth > MAX_LEVEL) {
        open = true;
      } else if (Object.prototype.hasOwnProperty.call(state.open, key)) {
        open = !!state.open[key];
      } else {
        open = depth <= DEFAULT_OPEN_LEVEL;
      }
      setOpen(li, open, false);
    });
    openActivePath();
  }

  // 自动展开当前页面所在的完整路径
  // docsify 会把 active 加在 <li> 上，这里同时兼容 <li class="active"> 与 <a class="active">
  function openActivePath() {
    var li = document.querySelector('.sidebar-nav li.active') ||
      closestLi(document.querySelector('.sidebar-nav a.active'));
    while (li) {
      if (li.classList.contains('dosify-folder')) setOpen(li, true, true);
      li = closestLi(li);
    }
  }

  /* ------------------------------------------------------------------ 交互 */

  function bind(nav) {
    if (nav.dataset.dosifyBound === '1') return;
    nav.dataset.dosifyBound = '1';

    nav.addEventListener('click', function (ev) {
      var label = ev.target.closest ? ev.target.closest('.dosify-label') : null;
      if (!label) return;
      var li = closestLi(label);
      if (!li || !li.classList.contains('dosify-folder')) return;

      var depth = parseInt(li.getAttribute('data-depth'), 10) || 1;
      if (depth > MAX_LEVEL) return;

      var isToggle = !!(ev.target.closest && ev.target.closest('.dosify-toggle'));
      var link = ev.target.closest && ev.target.closest('a');
      // 有链接且点的是文字 → 正常跳转；点箭头 → 折叠
      if (link && !isToggle) return;

      ev.preventDefault();
      ev.stopPropagation();
      setOpen(li, !li.classList.contains('open'), true);
    });

    bindDrawerGuard(nav);

    nav.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      var btn = ev.target.closest && ev.target.closest('.dosify-toggle');
      if (!btn) return;
      ev.preventDefault();
      btn.click();
    });
  }

  /**
   * 移动端：docsify 会在 body 上监听 click，只要抽屉处于展开态（body.close），
   * 任何一次点击都会把抽屉收起。这会导致「展开 / 收起目录」时菜单栏自己收起。
   * 这里只放行「点击可跳转链接」的冒泡（跳转后收起抽屉是期望行为），
   * 其余交互（折叠箭头、纯文本分组、搜索框等）一律阻止冒泡。
   */
  function bindDrawerGuard(nav) {
    var sidebar = nav.closest ? nav.closest('.sidebar') : null;
    if (!sidebar || sidebar.dataset.dosifyGuard === '1') return;
    sidebar.dataset.dosifyGuard = '1';

    sidebar.addEventListener('click', function (ev) {
      if (!isMobile()) return;
      var link = ev.target.closest ? ev.target.closest('a[href]') : null;
      if (link) return;
      ev.stopPropagation();
    });
  }

  /* ------------------------------------------------- 移动端遮罩 / 折叠状态 */

  var overlay = null;
  var bodyObserver = null;
  var lastCollapsed = null;
  var OVERLAY_PARENT = 'main';
  var COLLAPSED_KEY = 'dosify:sidebar:collapsed:v1';

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  // 注意：docsify 中 body.close 的含义随断点反转
  //   移动端 → 抽屉展开；桌面端 → 侧边栏收起
  function isDrawerOpen() {
    return isMobile() && document.body.classList.contains('close');
  }

  function syncOverlay() {
    if (!overlay) return;
    var open = isDrawerOpen();
    overlay.classList.toggle('is-active', open);
    overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function closeDrawer() {
    document.body.classList.remove('close');
    syncOverlay();
  }

  function ensureOverlay() {
    // 遮罩必须与 .sidebar 同处 main 的层叠上下文（main 为 z-index:0），
    // 否则会盖住侧边栏，表现为「展开菜单后整屏变灰」。
    var host = document.querySelector(OVERLAY_PARENT) || document.body;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'dosify-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.addEventListener('click', closeDrawer);
    }
    if (overlay.parentNode !== host) {
      host.insertBefore(overlay, host.querySelector('.sidebar'));
    }
    if (!bodyObserver) {
      if (typeof MutationObserver !== 'undefined') {
        bodyObserver = new MutationObserver(onBodyClassChange);
        bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      }
      window.addEventListener('resize', onBodyClassChange);
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && isDrawerOpen()) closeDrawer();
      });
      restoreCollapsed();
    }
    syncOverlay();
  }

  // 桌面端的收起状态记忆（移动端不复用，语义相反）
  function onBodyClassChange() {
    syncOverlay();
    if (isMobile()) return;
    var collapsed = document.body.classList.contains('close');
    if (collapsed === lastCollapsed) return;
    lastCollapsed = collapsed;
    safe(function () {
      window.localStorage.setItem(COLLAPSED_KEY, collapsed ? '1' : '0');
    });
  }

  function restoreCollapsed() {
    if (isMobile()) return;
    var stored = safe(function () { return window.localStorage.getItem(COLLAPSED_KEY); });
    if (stored === '1') {
      lastCollapsed = true;
      document.body.classList.add('close');
    } else {
      lastCollapsed = document.body.classList.contains('close');
    }
  }

  /* -------------------------------------------------------------- 调度入口 */

  function run() {
    if (running) return;
    running = true;
    try {
      ensureOverlay();
      var nav = document.querySelector('.sidebar-nav');
      if (!nav) return;
      var rootUl = directChild(nav, 'UL');
      if (!rootUl) return;
      buildLabels(rootUl, 1);
      bind(nav);
      applyState();
    } finally {
      running = false;
    }
  }

  function schedule() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () { rafId = null; run(); });
  }

  function observe() {
    if (observer || typeof MutationObserver === 'undefined') return;
    observer = new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].type === 'childList') { schedule(); return; }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* -------------------------------------------------------------- 对外 API */

  window.$dosifySidebar = {
    expandAll: function () { eachFolder(function (li) { setOpen(li, true, true); }); },
    collapseAll: function () { eachFolder(function (li) { setOpen(li, false, true); }); },
    // 收起 / 展开整个侧边栏面板（桌面端为主；移动端等价于开关抽屉）
    togglePanel: function (force) {
      var collapsed = typeof force === 'boolean' ? !!force : !document.body.classList.contains('close');
      document.body.classList.toggle('close', collapsed);
      syncOverlay();
    },
    refresh: schedule
  };

  /* ------------------------------------------------------------ 注册插件 */

  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat([
    function (hook) {
      hook.mounted(function () { observe(); schedule(); });
      hook.ready(function () { observe(); schedule(); });
      hook.doneEach(function () {
        schedule();
        setTimeout(schedule, 80);
      });
    }
  ]);
})();
