# 变更记录（CHANGELOG）

本文件记录 OC99TOP `licence` 仓库的重要变更。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 新增

- 补充仓库目录结构：`rules/`、`statements/`、`licenses/`、`oc99/`；
- 新增各目录的说明文件（`README.md`）与本变更记录。
- 新增 docsify 文档站点入口 `index.html` 与侧边栏定义 `_sidebar.md`；
- 新增 **Dosify 主题**：`assets/css/dosify.css` 与 `assets/js/dosify-sidebar.js`。

### 主题特性

- 手机 / 电脑双端适配：桌面端固定侧边栏（可一键收起 / 展开），移动端抽屉式 + 遮罩（点击遮罩或按 `Esc` 关闭）；
- 一级 / 二级 / 三级目录可展开、收起，未设置链接的条目渲染为纯文本；
- 长目录展开后各级标题吸顶，滚动不再上移，便于快速收起；
- 展开状态与当前路径记忆（`localStorage`），并支持系统深色模式。

### 修复

- 修复移动端展开菜单后「整屏变灰」：遮罩层原先挂在 `body` 下，而 `main` 是
  `z-index:0` 的层叠上下文，导致遮罩（z-index 15）反而盖住了侧边栏；现改为注入到
  `main` 内并置于 `.sidebar` 之前；
- 修复被 docsify 包在 `<p>` 中的链接（如 `- [首页](/)`）被误判为纯文本的问题；
- 提升选择器权重，覆盖 docsify 搜索插件注入的 `.sidebar{padding-top:0}` 与 vue 主题的
  `body.close .sidebar-toggle{width:284px}`，修正移动端抽屉顶部留白与菜单按钮宽度；
- 移动端抽屉改用 `translateX(-100%)` 保证完全滑入 / 滑出；
- 修正活动项高亮（docsify 将 `active` 加在 `<li>` 上），确保当前页面路径自动展开；
- 新增 `alias` 配置，避免子目录页面请求 `子目录/_sidebar.md` 产生 404。

### 变更

- 电脑端支持收起侧边栏：菜单按钮常驻于侧边栏右侧，收起后正文占满整宽，收起状态记忆到
  `localStorage`；新增 `$dosifySidebar.togglePanel()` 接口；
- 移除右上角 GitHub 角标（删除配置中的 `repo`）；
- `README.md` 补充文档站点与主题说明章节。

### 移除

- 无

---

## 说明

- 涉及正式授权条款的修改，需经 OC99TOP 官方确认后方可合并；
- 引用本仓库内容时，建议锁定具体版本（Tag 或 Commit Hash）。

---

[← 返回仓库首页](./README.md)
