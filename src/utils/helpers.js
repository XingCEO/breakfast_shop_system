// 工具函式

/**
 * 計算購物車品項小計（含加購）
 * itemTotal = (basePrice + addOnsTotal) * quantity
 */
export const calculateItemTotal = (item) => {
  const addOnsTotal = (item.addOns || []).reduce((sum, addon) => sum + addon.price, 0);
  return (item.price + addOnsTotal) * item.quantity;
};

/**
 * 為購物車品項產生穩定的唯一 key（取代 JSON.stringify 比較）
 * 結合 item id 與 addOns 的 id 排列
 */
export const cartItemKey = (item) => {
  const addOnIds = (item.addOns || [])
    .map(a => a.id)
    .sort()
    .join(',');
  return `${item.id}|${addOnIds}`;
};

/**
 * 比較兩個購物車品項是否相同（同品項 + 同加購組合）
 */
export const matchCartItem = (a, b) => {
  return cartItemKey(a) === cartItemKey(b);
};

/**
 * 統一金額格式化（含千分位）
 * @param {number} amount - 金額
 * @returns {string} 格式化後字串，如 "1,280"
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '0';
  return amount.toLocaleString('zh-TW');
};

/**
 * 收款找零計算
 * @param {number} total - 應付金額
 * @param {number} paid - 收款金額
 * @returns {{ isValid: boolean, change: number, message: string }}
 */
export const calculateChange = (total, paid) => {
  if (typeof paid !== 'number' || isNaN(paid) || paid < 0) {
    return { isValid: false, change: 0, message: '請輸入有效金額' };
  }
  if (paid < total) {
    return { isValid: false, change: 0, message: `不足 $${formatCurrency(total - paid)}` };
  }
  const change = paid - total;
  return {
    isValid: true,
    change,
    message: change === 0 ? '剛好' : `找零 $${formatCurrency(change)}`,
  };
};

/**
 * 取得訂單狀態的顯示資訊
 */
export const ORDER_STATUS = {
  pending: { label: '待製作', color: '#FBBF24', icon: 'clock-outline' },
  preparing: { label: '製作中', color: '#38BDF8', icon: 'chef-hat' },
  completed: { label: '已完成', color: '#34D399', icon: 'check-circle-outline' },
};
