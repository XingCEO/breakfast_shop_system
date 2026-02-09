# 波波早餐店 POS 系統 (Breakfast Shop POS)

一個基於 React Native 與 Expo 開發的早餐店點餐系統 (POS)。

## 功能特色 (Features)

- **菜單管理**：網格狀菜單展示，支援分類篩選與關鍵字搜尋。
- **購物車系統**：即時計算總金額，支援加購選項（如加蛋、起司）與備註。
- **完整結帳流程**：
  1. 購物車確認
  2. 訂單明細與收款計算（支援快速金額按鈕與找零計算）
  3. 訂單完成確認頁面
- **訂單管理**：本地訂單歷史記錄。
- **客製化選項**：支援深色模式與玻璃擬態 (Glassmorphism) 設計風格。

## 安裝與執行 (Installation)

1. Clone 專案：
   ```bash
   git clone https://github.com/XingCEO/breakfast_shop_system.git
   ```
2. 安裝依賴：
   ```bash
   npm install
   ```
3. 啟動 Expo 开发服务器：
   ```bash
   npm start
   ```

## 技術棧 (Tech Stack)

- **React Native** / **Expo**
- **Context API** (Cart, Order, Preferences)
- **Vector Icons**
