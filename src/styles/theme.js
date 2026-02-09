/**
 * 專業級 POS 設計系統 V2 — 波波早餐店
 * Premium Dark Glassmorphism Design System
 *
 * 設計原則：
 * 1. 深色毛玻璃 — 多層透明度構建空間感
 * 2. 琥珀金品牌色 — 溫暖、食慾感、高辨識度
 * 3. SF Pro 中文最佳化排版 — 精準的視覺層級
 * 4. 微動畫 — 流暢的互動回饋與狀態變化
 */

// ==================== 色彩系統 ====================
export const COLORS = {
  // 品牌主色 — 琥珀金系列
  primary: '#F5A623',
  primaryLight: '#FFCA6B',
  primaryDark: '#D4891B',
  primaryGlow: 'rgba(245, 166, 35, 0.25)',
  primarySoft: 'rgba(245, 166, 35, 0.10)',

  // 輔助色 — 冷暖對比
  secondary: '#6366F1',      // 靛藍紫
  secondaryLight: '#818CF8',
  secondaryGlow: 'rgba(99, 102, 241, 0.20)',

  teal: '#14B8A6',           // 湖水綠
  tealGlow: 'rgba(20, 184, 166, 0.20)',

  rose: '#F43F5E',           // 玫瑰紅
  roseGlow: 'rgba(244, 63, 94, 0.20)',

  sky: '#38BDF8',            // 天空藍
  skyGlow: 'rgba(56, 189, 248, 0.20)',

  // 強調色 — 用於 CTA
  accent: '#F5A623',
  accentGlow: 'rgba(245, 166, 35, 0.30)',

  // 深色背景層次（5 層灰階）
  bgDeep: '#000000',         // 最深 — 狀態列
  bgDark: '#0A0A0C',         // 深 — 主內容區背景
  bgCard: '#141416',         // 卡片背景
  bgElevated: '#1C1C1E',     // 提升層（sidebar, header）
  bgHover: '#2C2C2E',        // 懸停/選中
  bgActive: '#3A3A3C',       // 按壓狀態

  // 毛玻璃語義
  glassBg: 'rgba(28, 28, 30, 0.72)',
  glassLight: 'rgba(255, 255, 255, 0.06)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.12)',

  // 邊框
  border: 'rgba(255, 255, 255, 0.06)',
  borderLight: 'rgba(255, 255, 255, 0.10)',
  borderFocus: 'rgba(245, 166, 35, 0.40)',

  // 文字
  textPrimary: '#F5F5F7',
  textSecondary: 'rgba(255, 255, 255, 0.70)',
  textTertiary: 'rgba(255, 255, 255, 0.45)',
  textMuted: 'rgba(255, 255, 255, 0.25)',

  // 功能色
  success: '#34D399',
  successBg: 'rgba(52, 211, 153, 0.12)',
  successBorder: 'rgba(52, 211, 153, 0.25)',

  warning: '#FBBF24',
  warningBg: 'rgba(251, 191, 36, 0.12)',
  warningBorder: 'rgba(251, 191, 36, 0.25)',

  danger: '#F43F5E',
  dangerBg: 'rgba(244, 63, 94, 0.12)',
  dangerBorder: 'rgba(244, 63, 94, 0.25)',

  info: '#38BDF8',
  infoBg: 'rgba(56, 189, 248, 0.12)',

  // 分類專屬色
  categoryColors: {
    '虎皮蛋餅': '#FBBF24',
    '草原烤吐司': '#F59E0B',
    '漢堡': '#F97316',
    '厚片吐司': '#FB923C',
    '蘿蔔糕套餐': '#E879F9',
    '鍋炒麵': '#F43F5E',
    '鍋燒麵': '#F43F5E',
    '義大利麵': '#A78BFA',
    '義大利燉飯': '#818CF8',
    '早午餐(低GI)': '#34D399',
    '點心': '#FBBF24',
    '飲品': '#38BDF8',
    '豆漿飲品': '#E7D5C0',
    '咖啡': '#D4A574',
  },

  // 購物車
  cartBg: '#0A0A0C',
  cartHeader: '#141416',

  // 標籤（相容舊元件）
  tagBg: 'rgba(251, 191, 36, 0.12)',
  tagText: '#FBBF24',

  // 遮罩
  overlay: 'rgba(0, 0, 0, 0.65)',
  overlayDark: 'rgba(0, 0, 0, 0.85)',
};

// 漸層色組
export const GRADIENTS = {
  primary: ['#F5A623', '#D4891B'],
  accent: ['#FFCA6B', '#F5A623'],
  cart: ['#1C1C1E', '#141416'],
  header: ['#1C1C1E', '#141416'],
  success: ['#34D399', '#059669'],
  danger: ['#F43F5E', '#E11D48'],
  purple: ['#A78BFA', '#6366F1'],
  sky: ['#38BDF8', '#0284C7'],
};

// ==================== 間距系統（8pt Grid）====================
export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  huge: 64,
};

// ==================== 圓角系統 ====================
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

// ==================== 陰影系統 ====================
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.40,
    shadowRadius: 24,
    elevation: 12,
  },
  innerGlow: {
    shadowColor: '#F5A623',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
};

// ==================== 字型系統（SF Pro + 中文最佳化）====================
export const TYPOGRAPHY = {
  // 大標題
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.37,
    lineHeight: 48,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.36,
    lineHeight: 40,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.35,
    lineHeight: 34,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.38,
    lineHeight: 30,
  },
  // Headline
  headline: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
    lineHeight: 26,
  },
  // Body
  body: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
    lineHeight: 26,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.24,
    lineHeight: 24,
  },
  bodySemibold: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.24,
    lineHeight: 24,
  },
  // Subhead
  subhead: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.24,
    lineHeight: 22,
  },
  subheadBold: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.24,
    lineHeight: 22,
  },
  // Footnote
  footnote: {
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: -0.08,
    lineHeight: 20,
  },
  footnoteBold: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
    lineHeight: 20,
  },
  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.07,
    lineHeight: 16,
  },
  captionSmall: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    lineHeight: 14,
  },

  // 語義化字型
  h1: { fontSize: 22, fontWeight: '700', letterSpacing: 0.35, lineHeight: 34 },
  h2: { fontSize: 18, fontWeight: '600', letterSpacing: -0.41, lineHeight: 28 },
  h3: { fontSize: 15, fontWeight: '600', letterSpacing: -0.24, lineHeight: 24 },

  // 功能性字型
  button: { fontSize: 17, fontWeight: '600', letterSpacing: -0.41, lineHeight: 22 },
  buttonSmall: { fontSize: 15, fontWeight: '600', letterSpacing: -0.24, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase' },

  // 金額顯示
  priceXL: { fontSize: 34, fontWeight: '700', letterSpacing: 0.37, fontVariant: ['tabular-nums'] },
  priceLG: { fontSize: 24, fontWeight: '700', fontVariant: ['tabular-nums'] },
  priceMD: { fontSize: 18, fontWeight: '700', fontVariant: ['tabular-nums'] },
  priceSmall: { fontSize: 15, fontWeight: '700', fontVariant: ['tabular-nums'] },

  // 訂單編號
  orderNumber: { fontSize: 20, fontWeight: '700', fontVariant: ['tabular-nums'], letterSpacing: 1 },

  // 等寬數字
  mono: { fontSize: 14, fontWeight: '500', fontVariant: ['tabular-nums'] },
};

// ==================== 動畫參數 ====================
export const ANIMATION = {
  // 時長
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 800,
  },
  // Spring 配置
  spring: {
    default: { tension: 100, friction: 8 },
    bouncy: { tension: 150, friction: 5 },
    gentle: { tension: 60, friction: 10 },
    stiff: { tension: 200, friction: 15 },
  },
  // 按壓回彈
  press: {
    toValue: 0.96,
    duration: 100,
    useNativeDriver: true,
  },
  pressRelease: {
    toValue: 1,
    duration: 150,
    useNativeDriver: true,
  },
  // 滑入
  slideIn: {
    from: 50,
    duration: 300,
    useNativeDriver: true,
  },
  // 淡入
  fadeIn: {
    duration: 250,
    useNativeDriver: true,
  },
};

// ==================== 分類圖示映射（集中定義）====================
export const CATEGORY_ICONS = {
  '全部': 'apps',
  '虎皮蛋餅': 'egg-fried',
  '草原烤吐司': 'bread-slice',
  '漢堡': 'hamburger',
  '厚片吐司': 'bread-slice-outline',
  '蘿蔔糕套餐': 'food-variant',
  '鍋炒麵': 'noodles',
  '鍋燒麵': 'noodles',
  '義大利麵': 'pasta',
  '義大利燉飯': 'rice',
  '早午餐(低GI)': 'leaf',
  '點心': 'food-drumstick',
  '飲品': 'cup',
  '豆漿飲品': 'cup-water',
  '咖啡': 'coffee',
};

// ==================== 標籤配色 ====================
export const TAG_COLORS = {
  '蛋素': { bg: 'rgba(52, 211, 153, 0.12)', text: '#34D399', border: 'rgba(52, 211, 153, 0.25)' },
  '蛋奶素': { bg: 'rgba(52, 211, 153, 0.12)', text: '#34D399', border: 'rgba(52, 211, 153, 0.25)' },
  '全素': { bg: 'rgba(20, 184, 166, 0.12)', text: '#14B8A6', border: 'rgba(20, 184, 166, 0.25)' },
  '奶素': { bg: 'rgba(52, 211, 153, 0.12)', text: '#34D399', border: 'rgba(52, 211, 153, 0.25)' },
  '素食': { bg: 'rgba(20, 184, 166, 0.12)', text: '#14B8A6', border: 'rgba(20, 184, 166, 0.25)' },
  '蔬食': { bg: 'rgba(20, 184, 166, 0.12)', text: '#14B8A6', border: 'rgba(20, 184, 166, 0.25)' },
  '人氣': { bg: 'rgba(244, 63, 94, 0.12)', text: '#F43F5E', border: 'rgba(244, 63, 94, 0.25)' },
  '健康': { bg: 'rgba(56, 189, 248, 0.12)', text: '#38BDF8', border: 'rgba(56, 189, 248, 0.25)' },
  '新品': { bg: 'rgba(99, 102, 241, 0.12)', text: '#6366F1', border: 'rgba(99, 102, 241, 0.25)' },
};

// 輔助函式：取得分類顏色
export const getCategoryColor = (category) => {
  return COLORS.categoryColors[category] || COLORS.primary;
};
