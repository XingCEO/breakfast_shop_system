// 菜單靜態資料 — 移出元件外避免每次渲染重建
// CATEGORY_ICONS 已集中定義於 theme.js，請從 theme.js import

export const MENU_ITEMS = [
  // 虎皮蛋餅
  { id: '1197701', name: '蛋餅-虎皮(蛋素)', category: '虎皮蛋餅', price: 50, emoji: '🥚', tags: ['蛋素'] },
  { id: '1197999', name: '蛋餅-玉米(蛋奶素)', category: '虎皮蛋餅', price: 60, emoji: '🥚', tags: ['蛋奶素'] },
  { id: '1254713', name: '薯餅蛋餅', category: '虎皮蛋餅', price: 70, emoji: '🥚', tags: [] },
  { id: '1198000', name: '蛋餅-草原菇菇(蛋素)', category: '虎皮蛋餅', price: 75, emoji: '🥚', tags: ['蛋素'] },
  { id: '1198001', name: '蛋餅-草原鮪魚玉米', category: '虎皮蛋餅', price: 75, emoji: '🥚', tags: [] },
  { id: '1198002', name: '蛋餅-黑胡椒里肌', category: '虎皮蛋餅', price: 80, emoji: '🥚', tags: [] },
  { id: '1219635', name: '卡拉雞腿蛋餅', category: '虎皮蛋餅', price: 85, emoji: '🥚', tags: ['人氣'] },
  { id: '1198003', name: '蛋餅-舒肥雞胸', category: '虎皮蛋餅', price: 110, emoji: '🥚', tags: ['健康'] },

  // 草原烤吐司
  { id: '1198004', name: '吐司-草原蔬菜(有機藜麥、玉米)', category: '草原烤吐司', price: 60, emoji: '🍞', tags: ['蛋奶素', '健康'] },
  { id: '1198006', name: '吐司-原塊地瓜', category: '草原烤吐司', price: 60, emoji: '🍞', tags: ['蛋奶素'] },
  { id: '1198012X', name: '肉鬆蛋', category: '草原烤吐司', price: 60, emoji: '🍞', tags: [] },
  { id: '1198005', name: '吐司-薯餅蛋沙拉', category: '草原烤吐司', price: 65, emoji: '🍞', tags: ['蛋奶素'] },
  { id: '1198008', name: '吐司-鮪魚玉米洋蔥蛋', category: '草原烤吐司', price: 65, emoji: '🍞', tags: [] },
  { id: '1198009', name: '吐司-草原菇菇', category: '草原烤吐司', price: 75, emoji: '🍞', tags: ['蛋奶素'] },
  { id: '1198010', name: '吐司-蔥蛋里肌花生醬', category: '草原烤吐司', price: 80, emoji: '🍞', tags: [] },
  { id: '1198011', name: '吐司-蔥爆黑豬肉醬', category: '草原烤吐司', price: 85, emoji: '🍞', tags: [] },
  { id: '1198012', name: '吐司-卡拉雞腿', category: '草原烤吐司', price: 85, emoji: '🍞', tags: ['人氣'] },
  { id: '1198013', name: '吐司-舒肥原塊雞胸', category: '草原烤吐司', price: 100, emoji: '🍞', tags: ['健康'] },

  // 漢堡
  { id: 'H001', name: '漢堡-有機黎麥玉米蛋', category: '漢堡', price: 60, emoji: '🍔', tags: ['健康'] },
  { id: 'H002', name: '漢堡-地瓜蛋', category: '漢堡', price: 60, emoji: '🍔', tags: [] },
  { id: 'H003', name: '漢堡-薯餅蛋沙拉', category: '漢堡', price: 65, emoji: '🍔', tags: ['蛋奶素'] },
  { id: 'H004', name: '漢堡-鮪魚玉米', category: '漢堡', price: 65, emoji: '🍔', tags: [] },
  { id: 'H005', name: '漢堡-菇菇蛋', category: '漢堡', price: 75, emoji: '🍔', tags: [] },
  { id: 'H006', name: '漢堡-蔥蛋里肌花生', category: '漢堡', price: 80, emoji: '🍔', tags: [] },
  { id: 'H007', name: '漢堡-蔥爆黑豬蛋', category: '漢堡', price: 85, emoji: '🍔', tags: [] },
  { id: 'H008', name: '漢堡-卡拉雞腿蛋', category: '漢堡', price: 85, emoji: '🍔', tags: ['人氣'] },
  { id: 'H009', name: '漢堡-舒肥雞胸蛋', category: '漢堡', price: 100, emoji: '🍔', tags: ['健康'] },

  // 厚片吐司
  { id: 'T001', name: '厚片吐司-草莓', category: '厚片吐司', price: 45, emoji: '🍞', tags: [] },
  { id: 'T002', name: '厚片吐司-吉比顆粒花生醬', category: '厚片吐司', price: 45, emoji: '🍞', tags: [] },
  { id: 'T003', name: '厚片吐司-綜合堅果醬', category: '厚片吐司', price: 50, emoji: '🍞', tags: [] },
  { id: 'T004', name: '厚片吐司-鮪魚玉米', category: '厚片吐司', price: 55, emoji: '🍞', tags: [] },

  // 蘿蔔糕套餐
  { id: 'R001', name: '蘿蔔糕含蛋', category: '蘿蔔糕套餐', price: 50, emoji: '🥘', tags: [] },
  { id: 'R002', name: '蘿蔔糕蛋里肌', category: '蘿蔔糕套餐', price: 85, emoji: '🥘', tags: [] },

  // 鍋炒麵
  { id: 'N001', name: '黑胡椒醬', category: '鍋炒麵', price: 70, emoji: '🍜', tags: [] },
  { id: 'N002', name: '炒有機藜麥茄汁醬', category: '鍋炒麵', price: 70, emoji: '🍜', tags: ['健康'] },
  { id: 'N003', name: '草原菇菇醬(全素)', category: '鍋炒麵', price: 80, emoji: '🍜', tags: ['全素'] },
  { id: 'N004', name: '蔥爆黑豬肉醬', category: '鍋炒麵', price: 80, emoji: '🍜', tags: [] },

  // 義大利麵
  { id: 'P001', name: '松子粒_青醬義麵', category: '義大利麵', price: 145, emoji: '🍝', tags: [] },
  { id: 'P002', name: '歐姆蛋 青醬麵', category: '義大利麵', price: 135, emoji: '🍝', tags: ['蛋素'] },
  { id: 'P003', name: '歐母蛋 紅醬麵', category: '義大利麵', price: 135, emoji: '🍝', tags: [] },
  { id: 'P004', name: '歐母蛋 白醬麵(奶素)', category: '義大利麵', price: 135, emoji: '🍝', tags: ['奶素'] },
  { id: 'P005', name: '歐姆蛋 蒜香黑胡椒麵', category: '義大利麵', price: 135, emoji: '🍝', tags: [] },
  { id: 'P006', name: '海瓜子_青醬_義大利麵', category: '義大利麵', price: 160, emoji: '🍝', tags: [] },
  { id: 'P007', name: '海瓜子_紅醬_義大利麵', category: '義大利麵', price: 160, emoji: '🍝', tags: [] },
  { id: 'P008', name: '海瓜子_白醬_義大利麵', category: '義大利麵', price: 160, emoji: '🍝', tags: [] },
  { id: 'P009', name: '菇菇蔬菜_青醬麵', category: '義大利麵', price: 165, emoji: '🍝', tags: ['蔬食'] },
  { id: 'P010', name: '菇菇蔬菜_紅醬麵', category: '義大利麵', price: 165, emoji: '🍝', tags: ['蔬食'] },
  { id: 'P011', name: '菇菇蔬菜_白醬麵', category: '義大利麵', price: 165, emoji: '🍝', tags: ['蔬食'] },
  { id: 'P012', name: '菇菇蔬菜 黑胡椒麵', category: '義大利麵', price: 165, emoji: '🍝', tags: ['蔬食'] },
  { id: 'P013', name: '卡啦雞腿青醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P014', name: '卡拉雞腿紅醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P015', name: '卡啦雞腿白醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P016', name: '卡啦雞腿黑胡椒醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P017', name: '豬肉_紅醬義麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P018', name: '豬肉_黑胡椒義麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P019', name: '雞肉_青醬麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P020', name: '雞肉_紅醬義麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P021', name: '雞肉_白醬_義大利麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P022', name: '雞肉_黑胡椒_義大利麵', category: '義大利麵', price: 180, emoji: '🍝', tags: [] },
  { id: 'P023', name: '四兩雞腿排_青醬_義大利麵', category: '義大利麵', price: 185, emoji: '🍝', tags: [] },
  { id: 'P024', name: '四兩雞腿排_紅醬_義大利麵', category: '義大利麵', price: 185, emoji: '🍝', tags: [] },
  { id: 'P025', name: '四兩雞腿排_白醬_義大利麵', category: '義大利麵', price: 185, emoji: '🍝', tags: [] },
  { id: 'P026', name: '四兩雞腿排_黑胡椒_義大利麵', category: '義大利麵', price: 185, emoji: '🍝', tags: [] },

  // 義大利燉飯
  { id: 'R101', name: '松子粒_青醬飯', category: '義大利燉飯', price: 145, emoji: '🍚', tags: [] },
  { id: 'R102', name: '歐姆蛋 青醬飯', category: '義大利燉飯', price: 135, emoji: '🍚', tags: ['蛋素'] },
  { id: 'R103', name: '歐母蛋 紅醬飯', category: '義大利燉飯', price: 135, emoji: '🍚', tags: [] },
  { id: 'R104', name: '歐母蛋 白醬飯 奶素', category: '義大利燉飯', price: 135, emoji: '🍚', tags: ['奶素'] },
  { id: 'R105', name: '歐母蛋 蒜香黑胡椒飯', category: '義大利燉飯', price: 135, emoji: '🍚', tags: [] },
  { id: 'R106', name: '海瓜子_青醬飯', category: '義大利燉飯', price: 160, emoji: '🍚', tags: [] },
  { id: 'R107', name: '海瓜子_紅醬飯', category: '義大利燉飯', price: 160, emoji: '🍚', tags: [] },
  { id: 'R108', name: '海瓜子_白醬飯', category: '義大利燉飯', price: 160, emoji: '🍚', tags: [] },
  { id: 'R109', name: '菇菇蔬菜_青醬飯', category: '義大利燉飯', price: 165, emoji: '🍚', tags: ['蔬食'] },
  { id: 'R110', name: '菇菇蔬菜_紅醬飯', category: '義大利燉飯', price: 165, emoji: '🍚', tags: ['蔬食'] },
  { id: 'R111', name: '菇菇蔬菜_白醬飯', category: '義大利燉飯', price: 165, emoji: '🍚', tags: ['蔬食'] },
  { id: 'R112', name: '菇菇蔬菜 黑胡椒', category: '義大利燉飯', price: 165, emoji: '🍚', tags: ['蔬食'] },
  { id: 'R113', name: '卡啦雞腿青醬飯', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },
  { id: 'R114', name: '卡啦雞腿紅醬飯', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },
  { id: 'R115', name: '卡啦雞腿白醬飯', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },
  { id: 'R116', name: '卡啦雞腿黑胡椒飯', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },
  { id: 'R117', name: '黑豬肉_紅醬飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R118', name: '黑豬肉_黑胡椒燉飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R119', name: '雞肉_青醬飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R120', name: '雞肉_紅醬飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R121', name: '雞肉_白醬飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R122', name: '雞肉_黑胡椒飯', category: '義大利燉飯', price: 180, emoji: '🍚', tags: [] },
  { id: 'R123', name: '雞腿排_青醬飯', category: '義大利燉飯', price: 185, emoji: '🍚', tags: [] },
  { id: 'R124', name: '雞腿排_紅醬飯', category: '義大利燉飯', price: 185, emoji: '🍚', tags: [] },
  { id: 'R125', name: '雞腿排_白醬飯', category: '義大利燉飯', price: 185, emoji: '🍚', tags: [] },
  { id: 'R126', name: '雞腿黒糊椒飯', category: '義大利燉飯', price: 185, emoji: '🍚', tags: [] },

  // 早午餐(低GI)
  { id: 'LG001', name: '低GI-草原蔬菜(全素)', category: '早午餐(低GI)', price: 135, emoji: '🥗', tags: ['全素', '健康'] },
  { id: 'LG002', name: '低GI-菇菇(全素)', category: '早午餐(低GI)', price: 160, emoji: '🥗', tags: ['全素', '健康'] },
  { id: 'LG003', name: '低GI-瓜瓜雞', category: '早午餐(低GI)', price: 180, emoji: '🥗', tags: ['健康'] },
  { id: 'LG004', name: '低GI-鮪魚玉米', category: '早午餐(低GI)', price: 180, emoji: '🥗', tags: ['健康'] },
  { id: 'LG005', name: '低GI-轟炸雞', category: '早午餐(低GI)', price: 185, emoji: '🥗', tags: ['健康'] },

  // 點心
  { id: 'S001', name: '荷包蛋', category: '點心', price: 15, emoji: '🍳', tags: [] },
  { id: 'S002', name: '水煮蛋切片', category: '點心', price: 15, emoji: '🥚', tags: [] },
  { id: 'S003', name: '薯餅(素)', category: '點心', price: 25, emoji: '🥔', tags: ['素食'] },
  { id: 'S004', name: '原塊地瓜', category: '點心', price: 40, emoji: '🍠', tags: ['素食'] },
  { id: 'S005', name: '港式蘿蔔糕2片', category: '點心', price: 45, emoji: '🥘', tags: [] },
  { id: 'S006', name: '黑胡椒里肌豬排', category: '點心', price: 45, emoji: '🥩', tags: [] },
  { id: 'S007', name: '法式玉米濃湯', category: '點心', price: 45, emoji: '🍲', tags: [] },
  { id: 'S008', name: '蔬菜沙拉', category: '點心', price: 45, emoji: '🥗', tags: ['蔬食'] },
  { id: 'S009', name: '水煮蛋蔬菜沙拉', category: '點心', price: 50, emoji: '🥗', tags: ['蔬食'] },
  { id: 'S010', name: '雞塊(6塊)', category: '點心', price: 50, emoji: '🍗', tags: [] },
  { id: 'S011', name: '脆薯', category: '點心', price: 50, emoji: '🍟', tags: [] },
  { id: 'S012', name: '舒肥雞胸', category: '點心', price: 90, emoji: '🍗', tags: ['健康'] },
  { id: 'S013', name: '會縮水的四兩雞腿排', category: '點心', price: 100, emoji: '🍗', tags: [] },
  { id: 'S014', name: '小熊拼盤', category: '點心', price: 120, emoji: '🍽️', tags: [] },

  // 飲品
  { id: 'D001', name: '溫紅茶(無糖)', category: '飲品', price: 30, emoji: '🧋', tags: [] },
  { id: 'D002', name: '溫紅茶(糖)', category: '飲品', price: 30, emoji: '🧋', tags: [] },
  { id: 'D003', name: '涼紅茶(無糖)', category: '飲品', price: 35, emoji: '🧋', tags: [] },
  { id: 'D004', name: '涼紅茶(糖)', category: '飲品', price: 35, emoji: '🧋', tags: [] },
  { id: 'D005', name: '海燕窩冰茶(糖)', category: '飲品', price: 35, emoji: '🧋', tags: [] },
  { id: 'D006', name: '檸檬溫茶', category: '飲品', price: 50, emoji: '🍋', tags: [] },
  { id: 'D007', name: '鳳梨溫茶', category: '飲品', price: 50, emoji: '🍍', tags: [] },
  { id: 'D008', name: '百香溫茶', category: '飲品', price: 50, emoji: '🧋', tags: [] },
  { id: 'D009', name: '金桔溫茶', category: '飲品', price: 50, emoji: '🍊', tags: [] },
  { id: 'D010', name: '溫牛奶', category: '飲品', price: 50, emoji: '🥛', tags: [] },
  { id: 'D011', name: '可可牛奶', category: '飲品', price: 50, emoji: '🍫', tags: [] },
  { id: 'D012', name: '溫奶茶(糖)', category: '飲品', price: 50, emoji: '🧋', tags: [] },
  { id: 'D013', name: '檸檬冰茶(糖)', category: '飲品', price: 60, emoji: '🍋', tags: [] },
  { id: 'D014', name: '鳳梨冰茶(糖)', category: '飲品', price: 60, emoji: '🍍', tags: [] },
  { id: 'D015', name: '百香果冰茶(糖)', category: '飲品', price: 60, emoji: '🧋', tags: [] },
  { id: 'D016', name: '金桔冰茶(糖)', category: '飲品', price: 60, emoji: '🍊', tags: [] },
  { id: 'D017', name: '涼奶茶(糖)', category: '飲品', price: 60, emoji: '🧋', tags: [] },

  // 豆漿飲品
  { id: 'SD001', name: '溫 豆漿(無糖)', category: '豆漿飲品', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD002', name: '溫豆漿(含糖)', category: '豆漿飲品', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD003', name: '涼豆漿(無糖)', category: '豆漿飲品', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD004', name: '涼豆漿(含糖)', category: '豆漿飲品', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD005', name: '涼 豆漿紅茶(含糖)', category: '豆漿飲品', price: 35, emoji: '🥛', tags: [] },

  // 咖啡
  { id: 'C001', name: '溫 美式咖啡', category: '咖啡', price: 55, emoji: '☕', tags: [] },
  { id: 'C002', name: '溫 手沖咖啡', category: '咖啡', price: 60, emoji: '☕', tags: [] },
  { id: 'C003', name: '溫 手沖拿鐵', category: '咖啡', price: 70, emoji: '☕', tags: [] },
  { id: 'C004', name: '涼 美式咖啡', category: '咖啡', price: 70, emoji: '☕', tags: [] },
  { id: 'C005', name: '涼 手沖咖啡', category: '咖啡', price: 75, emoji: '☕', tags: [] },
  { id: 'C006', name: '涼 手沖拿鐵', category: '咖啡', price: 85, emoji: '☕', tags: [] },
];

export const ADD_ON_OPTIONS = {
  '套餐優惠': [
    { id: 'combo_60', name: '60元套餐 (35元以下飲品 + 點心選1)', price: 60, type: 'combo', includes: { drink: 1, side: 1 } },
    { id: 'combo_95', name: '95元套餐 (35元以下飲品 + 點心選2)', price: 95, type: 'combo', includes: { drink: 1, side: 2 } },
  ],
  '35元以下飲品 (選1)': [
    { id: 'drink_none', name: '不要飲料 (折抵30元)', price: -30, comboItem: true, isDiscount: true },
    { id: 'drink_1', name: '溫紅茶(無糖)', price: 0, comboItem: true },
    { id: 'drink_2', name: '溫紅茶(含糖)', price: 0, comboItem: true },
    { id: 'drink_3', name: '涼紅茶(無糖)', price: 0, comboItem: true },
    { id: 'drink_4', name: '涼紅茶(含糖)', price: 0, comboItem: true },
    { id: 'drink_5', name: '溫豆漿(無糖)', price: 0, comboItem: true },
    { id: 'drink_6', name: '溫豆漿(含糖)', price: 0, comboItem: true },
    { id: 'drink_7', name: '涼豆漿(無糖)', price: 0, comboItem: true },
    { id: 'drink_8', name: '涼豆漿(含糖)', price: 0, comboItem: true },
    { id: 'drink_9', name: '豆漿紅茶(含糖)', price: 0, comboItem: true },
  ],
  '套餐配菜 (A-G選項)': [
    { id: 'side_a', name: '(A) 100%炸雞條', price: 0, comboItem: true },
    { id: 'side_b', name: '(B) 脆薯', price: 0, comboItem: true },
    { id: 'side_c', name: '(C) 有機蔬菜番茄沙拉', price: 0, comboItem: true },
    { id: 'side_d', name: '(D) 有機蔬菜青檸沙拉', price: 0, comboItem: true },
    { id: 'side_e', name: '(E) 地瓜', price: 0, comboItem: true },
    { id: 'side_f', name: '(F) 花蛤湯', price: 0, comboItem: true },
    { id: 'side_g', name: '(G) 薯餅*2片', price: 0, comboItem: true },
  ],
  '加料': [
    { id: 'extra_1', name: '加起司', price: 10 },
  ],
  '鍋炒麵升級': [
    { id: 'noodle_1', name: '里肌豬排', price: 40 },
    { id: 'noodle_2', name: '卡啦雞腿排', price: 50 },
    { id: 'noodle_3', name: '舒肥原塊雞胸', price: 75 },
    { id: 'noodle_4', name: '香煎雞腿排', price: 80 },
  ],
};

// 加購選項的 display emoji（用於 Modal 分類標題）
export const ADD_ON_CATEGORY_EMOJIS = {
  '套餐優惠': '💰',
  '35元以下飲品 (選1)': '🥤',
  '套餐配菜 (A-G選項)': '🍟',
  '加料': '➕',
  '鍋炒麵升級': '🍜',
};

export const CATEGORIES = [
  '全部', '虎皮蛋餅', '草原烤吐司', '漢堡', '厚片吐司', '蘿蔔糕套餐',
  '鍋炒麵', '義大利麵', '義大利燉飯', '早午餐(低GI)', '點心',
  '飲品', '豆漿飲品', '咖啡',
];

export const CATEGORY_EMOJIS = {
  '全部': '📋',
  '虎皮蛋餅': '🥚',
  '草原烤吐司': '🍞',
  '漢堡': '🍔',
  '厚片吐司': '🥪',
  '蘿蔔糕套餐': '🥘',
  '鍋炒麵': '🍜',
  '義大利麵': '🍝',
  '義大利燉飯': '🍚',
  '早午餐(低GI)': '🥗',
  '點心': '🍟',
  '飲品': '🧋',
  '豆漿飲品': '🥛',
  '咖啡': '☕',
};

// 可加購的分類清單
export const ADDON_ELIGIBLE_CATEGORIES = [
  '虎皮蛋餅', '草原烤吐司', '漢堡', '厚片吐司', '蘿蔔糕套餐', '鍋炒麵',
];

// 所有不重複的飲食標籤
export const ALL_TAGS = [...new Set(MENU_ITEMS.flatMap(item => item.tags))].filter(Boolean);
