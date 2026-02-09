---
description: 對未提交的程式碼變更進行安全與品質審查
---

# /code-review — 程式碼審查

## 審查流程

1. 使用 `git diff --name-only HEAD` 找出變更檔案
2. 逐一檢查每個檔案
3. 依嚴重程度分類問題

## 審查類別

### 安全性（CRITICAL）
- 硬編碼的密鑰、API key、token
- SQL 注入風險
- XSS 漏洞
- 輸入驗證不足
- 路徑遍歷風險

### 程式碼品質（HIGH）
- 函式超過 50 行
- 檔案超過 800 行
- 巢狀深度超過 4 層
- 缺少錯誤處理
- 殘留的 console.log

### 最佳實踐（MEDIUM）
- 是否遵循不可變模式
- 新功能是否有測試覆蓋
- 無障礙（Accessibility）合規性
- 程式碼中是否有非常規字元

## 輸出格式

每個問題需包含：
- 嚴重程度：CRITICAL / HIGH / MEDIUM / LOW
- 檔案位置與行號
- 問題描述
- 修復建議

## 阻擋規則

如果發現 **CRITICAL** 或 **HIGH** 級別問題，不得提交 commit。
安全漏洞絕不核准通過。

---

請審查目前的程式碼變更：$ARGUMENTS
