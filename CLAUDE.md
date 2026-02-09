# 波波早餐店 (BoBo Breakfast Shop) - POS 系統

## 專案概覽
React Native 早餐店 POS 點餐系統，包含菜單瀏覽、購物車、套餐加購、訂單管理、銷售分析等功能。

## 技術棧
- **框架**: React Native (JSX)
- **狀態管理**: React Hooks (useState, useEffect)
- **語言**: JavaScript
- **平台**: iOS / Android

## 關鍵規則

### 程式碼組織
- 偏好多個小檔案，每檔 200-400 行，上限 800 行
- 按功能（feature）而非檔案類型組織目錄結構
- 函式不超過 50 行，巢狀不超過 4 層

### 不可變性（Immutability）
- 永遠建立新物件，**不要**直接修改既有物件或陣列
- 使用展開運算子（spread operator）進行更新

### 錯誤處理
- 所有非同步操作使用 try/catch
- 對使用者顯示友善訊息，對開發者記錄詳細日誌

### 輸入驗證
- 在系統邊界驗證所有使用者輸入
- 對訂單金額、數量進行型別與範圍檢查

### 安全性
- 不硬編碼敏感資訊（API key、密碼、token）
- 使用環境變數管理機密設定
- 防止 XSS、注入攻擊

### 測試
- TDD 流程：先寫測試 → 確認失敗 → 最小實作 → 重構
- 目標覆蓋率 80%+
- 金額計算、購物車邏輯為 100% 覆蓋

## 目錄結構（目標）
```
src/
├── components/        # UI 元件
│   ├── Menu/          # 菜單相關元件
│   ├── Cart/          # 購物車相關元件
│   ├── Analytics/     # 銷售分析元件
│   └── Common/        # 共用元件（按鈕、Modal 等）
├── hooks/             # 自定義 Hooks
├── contexts/          # React Context（全域狀態）
├── data/              # 菜單資料、常數定義
├── utils/             # 工具函式（金額計算等）
├── styles/            # 共用樣式
└── types/             # 型別定義（如未來遷移至 TS）
```

## 資料模型
```javascript
// 菜單品項
{ id, name, category, price, emoji, tags[] }

// 加購選項
{ id, name, price, type?, includes?, comboItem?, isDiscount? }

// 購物車品項
{ ...menuItem, quantity, addOns[] }

// 訂單
{ id, items[], total, date }

// 使用者偏好
{ favoriteItems[], savedOrders[], dietaryRestrictions[] }
```

## 業務邏輯
- **金額計算**: `itemTotal = (basePrice + addOnsTotal) × quantity`
- **套餐驗證**: 必須按順序選擇 套餐 → 飲品 → 副餐
- **分類**: 14 個菜單分類，7 種飲食標籤篩選
- **品項數**: 150+ 品項

## Git 工作流
- 使用 Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`
- 不直接推送到 main 分支
- 合併前所有測試必須通過

## 可用指令
- `/plan` — 規劃功能實作
- `/tdd` — 測試驅動開發
- `/code-review` — 程式碼審查
- `/build-fix` — 修復建置錯誤
- `/refactor-clean` — 清理無用程式碼
- `/checkpoint` — 建立/驗證工作進度快照
