# OC99TOP 规则模板与证书仓库

> OC99TOP 官方制定的规则模板、二创声明、授权证书等文件的统一存储仓库。

[![License](https://img.shields.io/badge/license-OC99TOP--CLA-blue.svg)](#许可证)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#贡献指南)

---

## 简介

本仓库用于集中存放 **OC99TOP** 官方制定并发布的各类规范性文件，包括但不限于：

- 组织简介
- 规则模板（Rule Templates）
- 二次创作声明（Fan-work）
- 授权证书与许可文本（Licenses & Certificates）
- 相关附录、变更记录与版本快照

所有文件均以纯文本（Markdown / TXT / JSON）形式保存，便于引用、复用与版本追溯。

---

## 目录结构

```
.
├── rules/              # 规则模板
│   ├── README.md
│   └── *.md
├── statements/         # 二创声明
│   ├── README.md
│   └── *.md
├── licenses/           # 授权证书 / 许可文本
│   ├── README.md
│   └── *.md
├── oc99/               # 组织简介与正式授权文本
│   └── README.md
├── assets/             # Dosify 主题资源
│   ├── css/dosify.css
│   └── js/dosify-sidebar.js
├── index.html          # 文档站点入口（docsify + Dosify 主题）
├── _sidebar.md         # 侧边栏目录（支持多级折叠）
├── CHANGELOG.md        # 版本变更记录
└── README.md
```

> 实际目录以仓库当前内容为准。

---

## 文件清单

| 类型 | 路径 | 说明 |
| --- | --- | --- |
| 关于组织 | `oc99/` | 正式授权文本、证书模板及许可说明 |
| 规则模板 | `rules/` | 供项目、社区或活动直接套用的规则框架 |
| 二创声明 | `statements/` | 二次创作授权范围、署名要求与限制条款 |
| 授权证书 | `licenses/` | 正式授权文本、证书模板及许可说明 |

---
<!--
## 在线文档（Dosify 主题）

本仓库内置一套自研文档主题 **Dosify**，基于 [docsify](https://docsify.js.org/) 驱动，可直接使用 GitHub Pages 或任意静态服务器托管。

### 特性

- **双端适配**：桌面端固定左侧目录（300px），左上角菜单按钮可一键收起 / 展开侧边栏，收起后正文占满整宽（状态会记忆）；移动端折叠为抽屉式侧边栏，配半透明遮罩，点击遮罩或按 `Esc` 关闭；
- **多级折叠**：一级 / 二级 / 三级目录均可展开与收起（超出三级的层级始终展开），子级缩进并以虚线引导；
- **文本与链接**：目录项未设置链接时渲染为纯文本（仅作分组标题）；设置链接时可点击跳转，箭头与文字各自响应；
- **吸顶快速收起**：展开状态下目录过长时，一级 / 二级 / 三级标题会在滚动中依次吸附在侧边栏顶部、不再上移，随时可一键收起；
- **状态记忆**：展开状态保存在 `localStorage`，刷新或切换页面后保持不变，并自动展开当前页面所在路径；
- **深色模式**：跟随系统 `prefers-color-scheme` 自动切换配色。

### 本地预览

站点需通过 HTTP 访问（docsify 以 XHR 加载 Markdown，直接双击 `index.html` 会被浏览器拦截）：

```bash
npx serve .
# 或
python -m http.server 3000
```

然后访问 `http://localhost:3000`。

### 自定义

| 配置项 | 位置 |
| --- | --- |
| 配色、宽度、圆角、行高、断点等变量 | `assets/css/dosify.css` 顶部的 `:root` |
| 目录结构 | `_sidebar.md`（同级缩进即层级；`- 标题` 不带链接即为纯文本分组） |
| 折叠层级、吸顶、状态记忆等行为 | `index.html` 中的 `window.$docsify.dosifySidebar` |

> 目录层级超过 3 级时，第 4 级及以下将始终展开，不再折叠。

常用控制台 API：

```js
$dosifySidebar.expandAll()      // 展开所有目录分组
$dosifySidebar.collapseAll()    // 收起所有目录分组
$dosifySidebar.togglePanel()    // 收起 / 展开整个侧边栏面板
$dosifySidebar.refresh()        // 目录被动态修改后重新解析
```

---
--!>
## 使用方法

### 1. 引用官方模板

1. 在对应目录中找到所需文件；
2. 复制模板内容至你的项目；
3. 按照模板中的占位符（如 `{{PROJECT_NAME}}`、`{{DATE}}`）填入实际信息；
4. 保留原始出处与版本号。

### 2. 署名格式

使用本仓库内容时，建议采用以下署名方式：

```
本文件基于 OC99TOP 官方模板（<文件名>，版本 <版本号>）制定。
来源：https://github.com/oc99top/licence
```
<!-- 
### 3. 二次创作

- 允许在遵守对应声明条款的前提下进行修改与再分发；
- 修改后的版本须显著标注「非官方版本」；
- 不得删除或篡改原作者署名与许可信息。
 -->
---

## 版本管理

- 所有重要变更记录于 [`CHANGELOG.md`](./CHANGELOG.md)；
- 建议引用时锁定具体版本（Tag 或 Commit Hash），避免因上游更新导致条款漂移；
- 历史版本可通过仓库的 Tag / Release 页面获取。

---

## 贡献指南

欢迎提交 Issue 或 Pull Request 参与完善：

1. Fork 本仓库并创建分支：`git checkout -b feat/your-change`；
2. 保持文件命名规范与既有格式一致；
3. 若为新增条款或修改实质内容，请在 PR 描述中说明理由与影响范围；
4. 提交 PR 并等待维护者审核。

> 涉及正式授权条款的修改，需经 OC99TOP 官方确认后方可合并。

---

## 免责声明

- 本仓库内容按「现状」提供，不构成法律意见；
- 使用者应自行评估条款在具体场景下的适用性与合规性；
- 因使用或无法使用本仓库内容而产生的任何后果，由使用者自行承担。

---

<!-- ## 许可证

除文件内另有说明外，本仓库内容遵循 OC99TOP 官方许可条款。转载、二次创作前请仔细阅读对应文件中的授权范围。 -->

---
