---
description: React / React Native 開發模式
globs: "*.jsx,*.js"
---

# React / React Native 模式

## 元件設計
- 使用函式元件 + Hooks
- 單一職責原則：每個元件只做一件事
- 抽取自訂 Hook 管理複雜狀態邏輯
- 使用 React.memo 避免不必要的重新渲染

## 狀態管理
- 局部狀態：useState
- 跨元件狀態：Context + useReducer
- 避免 prop drilling，超過 2 層就用 Context

## 效能優化
- 大列表使用 FlatList / VirtualizedList
- 昂貴計算使用 useMemo
- 回呼函式使用 useCallback
- 圖片使用適當尺寸與快取

## 樣式
- 使用 StyleSheet.create（效能優於行內物件）
- 共用樣式抽取到獨立檔案
- 使用一致的色彩常數

## 表單與驗證
- 受控元件模式
- 即時驗證 + 提交驗證
- 清楚的錯誤訊息
