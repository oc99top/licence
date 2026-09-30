# OC99TOP 规则模板与证书仓库

> OC99TOP 官方制定的规则模板、二创声明、授权证书等文件的统一存储仓库。

[![License](https://img.shields.io/badge/license-OC99TOP--CLA-blue.svg)](#许可证)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#贡献指南)

---

## 简介

本仓库用于集中存放 **OC99TOP** 官方制定并发布的各类规范性文件，包括但不限于：

- 规则模板（Rule Templates）
- 二次创作声明（Fan-work / Derivative Statements）
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
├── CHANGELOG.md        # 版本变更记录
└── README.md
```

> 实际目录以仓库当前内容为准。

---

## 文件清单

| 类型 | 路径 | 说明 |
| --- | --- | --- |
| 规则模板 | `rules/` | 供项目、社区或活动直接套用的规则框架 |
| 二创声明 | `statements/` | 二次创作授权范围、署名要求与限制条款 |
| 授权证书 | `licenses/` | 正式授权文本、证书模板及许可说明 |

---

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

### 3. 二次创作

- 允许在遵守对应声明条款的前提下进行修改与再分发；
- 修改后的版本须显著标注「非官方版本」；
- 不得删除或篡改原作者署名与许可信息。

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

## 许可证

除文件内另有说明外，本仓库内容遵循 OC99TOP 官方许可条款。转载、二次创作前请仔细阅读对应文件中的授权范围。

---