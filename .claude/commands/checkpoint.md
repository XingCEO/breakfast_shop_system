---
description: 建立、驗證或列出工作進度快照
---

# /checkpoint — 進度快照管理

## 操作

### 建立快照
```
/checkpoint create <名稱>
```
- 驗證目前狀態乾淨
- 建立 git stash 或 commit
- 記錄時間戳與 SHA 到 `.claude/checkpoints.log`

### 驗證快照
```
/checkpoint verify <名稱>
```
- 與先前的快照比較
- 報告變更檔案數量
- 顯示測試通過/失敗率與覆蓋率差異

### 列出快照
```
/checkpoint list
```
- 顯示所有快照：名稱、時間戳、SHA、狀態

### 清除快照
```
/checkpoint clear
```
- 移除舊快照（保留最近 5 個）

## 典型工作流程

1. `/checkpoint create feature-start` — 功能開始前
2. 開發...
3. `/checkpoint create core-done` — 核心完成
4. `/checkpoint verify feature-start` — 驗證進度
5. 開 PR

---

$ARGUMENTS
