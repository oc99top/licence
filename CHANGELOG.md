# 变更记录（CHANGELOG）

本文件记录 OC99TOP `licence` 仓库的重要变更。

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### 新增

#### 仓库结构

- 补充仓库目录结构：`rules/`、`statements/`、`licenses/`、`oc99/`；
- 新增各目录的说明文件（`README.md`）与本变更记录。

#### 规则模板

- 新增 `rules/group/normal.md`：**标准群规**模板，含总则、行为准则、禁止行为、广告
  规范、管理员职责、四级违规处理、举报申诉、知识产权与附则；
- 新增 `rules/group/normalx.md`：**大白话版群规**，以口语化表述覆盖同等内容，
  便于直接向群成员公示。

#### 二创声明

- 新增 6 份二创授权声明：
  - `statements/no2.md` —— 禁止二创（严禁一切形式二创）；
  - `statements/y2nb.md` —— 非商业二创（无需署名，禁止商用谋利）；
  - `statements/s2.md` —— 声明原创二创（允许商用，须声明来源）；
  - `statements/s2nb.md` —— 非商声明原创二创（须声明来源，禁止商用）；
  - `statements/p2.md` —— 授权二创（须作者专门授权）；
  - `statements/o2.md` —— 开放二创（允许任何形式二创）；
- 新增 `statements/ai/`：3 份 AI 使用声明 —— `nAI`（禁投 AI）、`pAI`（授权 AI）、
  `oAI`（开放 AI）；
- 新增 `statements/content/`：5 份可二创内容范围 —— `occ`（仅人设）、`ocp`（仅画像）、
  `oca`（人设 + 画像）、`och`（高尚二创，**默认档**）、`noooc`（保全原角色设定）；
- 新增 `statements/ai/README.md`、`statements/content/README.md` 索引，含速查表与
  组合示例；
- 重写 `statements/README.md`：补充目录树、三类声明速查表、组合用法与占位符说明。

#### 声明体系

- 二创声明采用**三类组合**使用：授权声明（根目录）+ AI 声明（`ai/`）+
  内容范围（`content/`），例如 `o2 + pAI + oca + och`；
- 声明冲突时以**更严格**者为准，AI 相关以 `nAI` 优先；
- 未指定内容范围时**默认适用 `och`（高尚二创）**；
- 全部声明统一采用「一句话摘要 → 声明信息 → 授权 / 禁止 → 署名 → 违约 → 附则 →
  如何引用」结构，并使用 `{{OC_NAME}}`、`{{OWNER}}`、`{{VERSION}}`、`{{DATE}}`
  等占位符。

#### 文档站点

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
- `README.md` 补充文档站点与主题说明章节；
- `_sidebar.md` 新增「群规」「二创授权声明」「AI 使用声明」「可二创内容范围」四组
  导航，共 16 条文档链接。

### 移除

- 无

---

## 说明

- 涉及正式授权条款的修改，需经 OC99TOP 官方确认后方可合并；
- 引用本仓库内容时，建议锁定具体版本（Tag 或 Commit Hash）。

---

[← 返回仓库首页](./README.md)
