---
description: Git 工作流程規範
globs: "*"
---

# Git 工作流程

## Commit 訊息格式
`<type>: <description>`

允許的 type：
- `feat` — 新功能
- `fix` — 修復 bug
- `refactor` — 重構
- `docs` — 文件
- `test` — 測試
- `chore` — 維護
- `perf` — 效能優化
- `ci` — CI/CD

## PR 流程
- 使用 `git diff [base-branch]...HEAD` 檢視所有修改
- PR 摘要包含測試計畫
- 新分支使用 `-u` flag 推送

## 功能開發流程
1. **規劃** — 用 `/plan` 先制定方案
2. **TDD** — 用 `/tdd` 測試驅動開發
3. **審查** — 用 `/code-review` 審查程式碼
4. **提交** — 使用 Conventional Commits
