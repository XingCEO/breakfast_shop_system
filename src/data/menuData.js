// 菜單靜態資料 - 優化版

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
  { id: '1198004', name: '吐司-草原蔬菜', category: '草原烤吐司', price: 60, emoji: '🍞', tags: ['蛋奶素', '健康'] },
  { id: '1198006', name: '吐司-原塊地瓜', category: '草原烤吐司', price: 60, emoji: '🍞', tags: ['蛋奶素'] },
  { id: '1198012X', name: '肉鬆蛋吐司', category: '草原烤吐司', price: 60, emoji: '🍞', tags: [] },
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
  { id: 'T002', name: '厚片吐司-花生醬', category: '厚片吐司', price: 45, emoji: '🍞', tags: [] },
  { id: 'T003', name: '厚片吐司-綜合堅果醬', category: '厚片吐司', price: 50, emoji: '🍞', tags: [] },
  { id: 'T004', name: '厚片吐司-鮪魚玉米', category: '厚片吐司', price: 55, emoji: '🍞', tags: [] },

  // 蘿蔔糕套餐
  { id: 'R001', name: '蘿蔔糕含蛋', category: '蘿蔔糕套餐', price: 50, emoji: '🥘', tags: [] },
  { id: 'R002', name: '蘿蔔糕蛋里肌', category: '蘿蔔糕套餐', price: 85, emoji: '🥘', tags: [] },

  // 鍋炒麵
  { id: 'N001', name: '炒麵-黑胡椒醬', category: '鍋炒麵', price: 70, emoji: '🍜', tags: [] },
  { id: 'N002', name: '炒麵-有機藜麥茄汁', category: '鍋炒麵', price: 70, emoji: '🍜', tags: ['健康'] },
  { id: 'N003', name: '炒麵-草原菇菇(全素)', category: '鍋炒麵', price: 80, emoji: '🍜', tags: ['全素'] },
  { id: 'N004', name: '炒麵-蔥爆黑豬肉', category: '鍋炒麵', price: 80, emoji: '🍜', tags: [] },

  // 義大利麵
  { id: 'P001', name: '義麵-松子青醬', category: '義大利麵', price: 145, emoji: '🍝', tags: [] },
  { id: 'P002', name: '義麵-歐姆蛋青醬', category: '義大利麵', price: 135, emoji: '🍝', tags: ['蛋素'] },
  { id: 'P003', name: '義麵-歐姆蛋紅醬', category: '義大利麵', price: 135, emoji: '🍝', tags: [] },
  { id: 'P004', name: '義麵-歐姆蛋白醬', category: '義大利麵', price: 135, emoji: '🍝', tags: ['奶素'] },
  { id: 'P013', name: '義麵-卡啦雞腿青醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P014', name: '義麵-卡拉雞腿紅醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },
  { id: 'P015', name: '義麵-卡啦雞腿白醬', category: '義大利麵', price: 170, emoji: '🍝', tags: ['人氣'] },

  // 義大利燉飯
  { id: 'R101', name: '燉飯-松子青醬', category: '義大利燉飯', price: 145, emoji: '🍚', tags: [] },
  { id: 'R102', name: '燉飯-歐姆蛋青醬', category: '義大利燉飯', price: 135, emoji: '🍚', tags: ['蛋素'] },
  { id: 'R113', name: '燉飯-卡啦雞腿青醬', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },
  { id: 'R114', name: '燉飯-卡啦雞腿紅醬', category: '義大利燉飯', price: 170, emoji: '🍚', tags: ['人氣'] },

  // 早午餐(低GI)
  { id: 'LG001', name: '低GI-草原蔬菜(全素)', category: '早午餐(低GI)', price: 135, emoji: '🥗', tags: ['全素', '健康'] },
  { id: 'LG002', name: '低GI-菇菇(全素)', category: '早午餐(低GI)', price: 160, emoji: '🥗', tags: ['全素', '健康'] },
  { id: 'LG003', name: '低GI-瓜瓜雞', category: '早午餐(低GI)', price: 180, emoji: '🥗', tags: ['健康'] },
  { id: 'LG005', name: '低GI-轟炸雞', category: '早午餐(低GI)', price: 185, emoji: '🥗', tags: ['健康'] },

  // 點心
  { id: 'S001', name: '荷包蛋', category: '點心', price: 15, emoji: '🍳', tags: [] },
  { id: 'S002', name: '水煮蛋切片', category: '點心', price: 15, emoji: '🥚', tags: [] },
  { id: 'S003', name: '薯餅(素)', category: '點心', price: 25, emoji: '🥔', tags: ['素食'] },
  { id: 'S004', name: '原塊地瓜', category: '點心', price: 40, emoji: '🍠', tags: ['素食'] },
  { id: 'S005', name: '港式蘿蔔糕2片', category: '點心', price: 45, emoji: '🥘', tags: [] },
  { id: 'S010', name: '雞塊(6塊)', category: '點心', price: 50, emoji: '🍗', tags: [] },
  { id: 'S011', name: '脆薯', category: '點心', price: 50, emoji: '🍟', tags: [] },
  { id: 'S012', name: '舒肥雞胸', category: '點心', price: 90, emoji: '🍗', tags: ['健康'] },

  // 紅茶系列
  { id: 'D001', name: '紅茶(溫/無糖)', category: '紅茶', price: 30, emoji: '🧋', tags: [] },
  { id: 'D002', name: '紅茶(溫/含糖)', category: '紅茶', price: 30, emoji: '🧋', tags: [] },
  { id: 'D003', name: '紅茶(涼/無糖)', category: '紅茶', price: 35, emoji: '🧋', tags: [] },
  { id: 'D004', name: '紅茶(涼/含糖)', category: '紅茶', price: 35, emoji: '🧋', tags: [] },

  // 奶茶系列
  { id: 'D012', name: '奶茶(溫/含糖)', category: '奶茶', price: 50, emoji: '🧋', tags: [] },
  { id: 'D017', name: '奶茶(涼/含糖)', category: '奶茶', price: 60, emoji: '🧋', tags: [] },

  // 牛奶系列
  { id: 'D010', name: '溫牛奶', category: '牛奶', price: 50, emoji: '🥛', tags: [] },
  { id: 'D011', name: '可可牛奶', category: '牛奶', price: 50, emoji: '🍫', tags: [] },

  // 豆漿系列
  { id: 'SD001', name: '豆漿(溫/無糖)', category: '豆漿', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD002', name: '豆漿(溫/含糖)', category: '豆漿', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD003', name: '豆漿(涼/無糖)', category: '豆漿', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD004', name: '豆漿(涼/含糖)', category: '豆漿', price: 30, emoji: '🥛', tags: [] },
  { id: 'SD005', name: '豆漿紅茶(涼)', category: '豆漿', price: 35, emoji: '🥛', tags: [] },

  // 咖啡系列
  { id: 'C001', name: '美式咖啡(溫)', category: '咖啡', price: 55, emoji: '☕', tags: [] },
  { id: 'C004', name: '美式咖啡(涼)', category: '咖啡', price: 70, emoji: '☕', tags: [] },
  { id: 'C002', name: '手沖咖啡(溫)', category: '咖啡', price: 60, emoji: '☕', tags: [] },
  { id: 'C005', name: '手沖咖啡(涼)', category: '咖啡', price: 75, emoji: '☕', tags: [] },
  { id: 'C003', name: '手沖拿鐵(溫)', category: '咖啡', price: 70, emoji: '☕', tags: [] },
  { id: 'C006', name: '手沖拿鐵(涼)', category: '咖啡', price: 85, emoji: '☕', tags: [] },
]

export const CATEGORIES = [
  '全部', '虎皮蛋餅', '草原烤吐司', '漢堡', '厚片吐司', '蘿蔔糕套餐',
  '鍋炒麵', '義大利麵', '義大利燉飯', '早午餐(低GI)', '點心',
  '紅茶', '奶茶', '牛奶', '豆漿', '咖啡',
]

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
  '紅茶': '🧋',
  '奶茶': '🧋',
  '牛奶': '🥛',
  '豆漿': '🥛',
  '咖啡': '☕',
}
