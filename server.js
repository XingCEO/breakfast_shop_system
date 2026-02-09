import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// JSON body parser
app.use(express.json())

// 訂單儲存路徑
const DATA_DIR = join(__dirname, 'data')
const ORDERS_FILE = join(DATA_DIR, 'orders.json')

// 確保 data 目錄存在
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true })
}

// 初始化訂單檔案
if (!existsSync(ORDERS_FILE)) {
  writeFileSync(ORDERS_FILE, JSON.stringify({ orders: [] }, null, 2))
}

// 管理員密碼 (只存在於伺服器端)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'bobo-admin-2024'

// Session 儲存 (簡易版，正式環境應使用 Redis 等)
const sessions = new Map()

// 生成隨機 Session Token
const generateSessionToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// 驗證管理員權限中間件 (檢查 session cookie)
const validateAdminAuth = (req, res, next) => {
  const sessionToken = req.headers['x-session-token']
  if (!sessionToken || !sessions.has(sessionToken)) {
    return res.status(401).json({ error: '需要管理員權限，請先登入' })
  }
  // 檢查 session 是否過期 (24小時)
  const session = sessions.get(sessionToken)
  if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
    sessions.delete(sessionToken)
    return res.status(401).json({ error: 'Session 已過期，請重新登入' })
  }
  next()
}

// 載入菜單資料用於伺服器端價格驗證
const MENU_ITEMS = [
  { id: '1197701', name: '蛋餅-虎皮(蛋素)', price: 50 },
  { id: '1197999', name: '蛋餅-玉米(蛋奶素)', price: 60 },
  { id: '1254713', name: '薯餅蛋餅', price: 70 },
  { id: '1198000', name: '蛋餅-草原菇菇(蛋素)', price: 75 },
  { id: '1198001', name: '蛋餅-草原鮪魚玉米', price: 75 },
  { id: '1198002', name: '蛋餅-黑胡椒里肌', price: 80 },
  { id: '1219635', name: '卡拉雞腿蛋餅', price: 85 },
  { id: '1198003', name: '蛋餅-舒肥雞胸', price: 110 },
  { id: '1198004', name: '吐司-草原蔬菜', price: 60 },
  { id: '1198006', name: '吐司-原塊地瓜', price: 60 },
  { id: '1198012X', name: '肉鬆蛋吐司', price: 60 },
  { id: '1198005', name: '吐司-薯餅蛋沙拉', price: 65 },
  { id: '1198008', name: '吐司-鮪魚玉米洋蔥蛋', price: 65 },
  { id: '1198009', name: '吐司-草原菇菇', price: 75 },
  { id: '1198010', name: '吐司-蔥蛋里肌花生醬', price: 80 },
  { id: '1198011', name: '吐司-蔥爆黑豬肉醬', price: 85 },
  { id: '1198012', name: '吐司-卡拉雞腿', price: 85 },
  { id: '1198013', name: '吐司-舒肥原塊雞胸', price: 100 },
  { id: 'H001', name: '漢堡-有機黎麥玉米蛋', price: 60 },
  { id: 'H002', name: '漢堡-地瓜蛋', price: 60 },
  { id: 'H003', name: '漢堡-薯餅蛋沙拉', price: 65 },
  { id: 'H004', name: '漢堡-鮪魚玉米', price: 65 },
  { id: 'H005', name: '漢堡-菇菇蛋', price: 75 },
  { id: 'H006', name: '漢堡-蔥蛋里肌花生', price: 80 },
  { id: 'H007', name: '漢堡-蔥爆黑豬蛋', price: 85 },
  { id: 'H008', name: '漢堡-卡拉雞腿蛋', price: 85 },
  { id: 'H009', name: '漢堡-舒肥雞胸蛋', price: 100 },
  { id: 'T001', name: '厚片吐司-草莓', price: 45 },
  { id: 'T002', name: '厚片吐司-花生醬', price: 45 },
  { id: 'T003', name: '厚片吐司-綜合堅果醬', price: 50 },
  { id: 'T004', name: '厚片吐司-鮪魚玉米', price: 55 },
  { id: 'R001', name: '蘿蔔糕含蛋', price: 50 },
  { id: 'R002', name: '蘿蔔糕蛋里肌', price: 85 },
  { id: 'N001', name: '炒麵-黑胡椒醬', price: 70 },
  { id: 'N002', name: '炒麵-有機藜麥茄汁', price: 70 },
  { id: 'N003', name: '炒麵-草原菇菇(全素)', price: 80 },
  { id: 'N004', name: '炒麵-蔥爆黑豬肉', price: 80 },
  { id: 'P001', name: '義麵-松子青醬', price: 145 },
  { id: 'P002', name: '義麵-歐姆蛋青醬', price: 135 },
  { id: 'P003', name: '義麵-歐姆蛋紅醬', price: 135 },
  { id: 'P004', name: '義麵-歐姆蛋白醬', price: 135 },
  { id: 'P013', name: '義麵-卡啦雞腿青醬', price: 170 },
  { id: 'P014', name: '義麵-卡拉雞腿紅醬', price: 170 },
  { id: 'P015', name: '義麵-卡啦雞腿白醬', price: 170 },
  { id: 'R101', name: '燉飯-松子青醬', price: 145 },
  { id: 'R102', name: '燉飯-歐姆蛋青醬', price: 135 },
  { id: 'R113', name: '燉飯-卡啦雞腿青醬', price: 170 },
  { id: 'R114', name: '燉飯-卡啦雞腿紅醬', price: 170 },
  { id: 'LG001', name: '低GI-草原蔬菜(全素)', price: 135 },
  { id: 'LG002', name: '低GI-菇菇(全素)', price: 160 },
  { id: 'LG003', name: '低GI-瓜瓜雞', price: 180 },
  { id: 'LG005', name: '低GI-轟炸雞', price: 185 },
  { id: 'S001', name: '荷包蛋', price: 15 },
  { id: 'S002', name: '水煮蛋切片', price: 15 },
  { id: 'S003', name: '薯餅(素)', price: 25 },
  { id: 'S004', name: '原塊地瓜', price: 40 },
  { id: 'S005', name: '港式蘿蔔糕2片', price: 45 },
  { id: 'S010', name: '雞塊(6塊)', price: 50 },
  { id: 'S011', name: '脆薯', price: 50 },
  { id: 'S012', name: '舒肥雞胸', price: 90 },
  { id: 'D001', name: '紅茶(溫/無糖)', price: 30 },
  { id: 'D002', name: '紅茶(溫/含糖)', price: 30 },
  { id: 'D003', name: '紅茶(涼/無糖)', price: 35 },
  { id: 'D004', name: '紅茶(涼/含糖)', price: 35 },
  { id: 'D012', name: '奶茶(溫/含糖)', price: 50 },
  { id: 'D017', name: '奶茶(涼/含糖)', price: 60 },
  { id: 'D010', name: '溫牛奶', price: 50 },
  { id: 'D011', name: '可可牛奶', price: 50 },
  { id: 'SD001', name: '豆漿(溫/無糖)', price: 30 },
  { id: 'SD002', name: '豆漿(溫/含糖)', price: 30 },
  { id: 'SD003', name: '豆漿(涼/無糖)', price: 30 },
  { id: 'SD004', name: '豆漿(涼/含糖)', price: 30 },
  { id: 'SD005', name: '豆漿紅茶(涼)', price: 35 },
  { id: 'C001', name: '美式咖啡(溫)', price: 55 },
  { id: 'C004', name: '美式咖啡(涼)', price: 70 },
  { id: 'C002', name: '手沖咖啡(溫)', price: 60 },
  { id: 'C005', name: '手沖咖啡(涼)', price: 75 },
  { id: 'C003', name: '手沖拿鐵(溫)', price: 70 },
  { id: 'C006', name: '手沖拿鐵(涼)', price: 85 },
]

// 加購選項價格表
const ADDON_PRICES = {
  combo_60: 60,
  combo_95: 95,
  drink_none: -30,
  drink_1: 0, drink_2: 0, drink_3: 0, drink_4: 0,
  drink_5: 0, drink_6: 0, drink_7: 0, drink_8: 0, drink_9: 0,
  side_a: 0, side_b: 0, side_c: 0, side_d: 0, side_e: 0, side_f: 0, side_g: 0,
  extra_cheese: 10,
  noodle_1: 40,
  noodle_2: 50,
  noodle_3: 75,
  noodle_4: 80,
}

// 讀取訂單
const loadOrders = () => {
  try {
    const data = readFileSync(ORDERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('讀取訂單失敗:', error.message)
    return { orders: [] }
  }
}

// 儲存訂單
const saveOrders = (data) => {
  try {
    writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('儲存訂單失敗:', error.message)
    return false
  }
}

// 伺服器端價格驗證
const validateAndCalculateTotal = (items) => {
  let total = 0

  for (const item of items) {
    // 驗證品項 ID 和價格
    const menuItem = MENU_ITEMS.find(m => m.id === item.id)
    if (!menuItem) {
      throw new Error(`無效的品項 ID: ${item.id}`)
    }

    // 驗證數量
    const quantity = parseInt(item.quantity, 10)
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      throw new Error(`無效的數量: ${item.quantity}`)
    }

    // 計算加購總價
    let addonTotal = 0
    if (item.addons && Array.isArray(item.addons)) {
      for (const addon of item.addons) {
        const addonPrice = ADDON_PRICES[addon.id]
        if (addonPrice === undefined) {
          throw new Error(`無效的加購選項: ${addon.id}`)
        }
        addonTotal += addonPrice
      }
    }

    // 計算品項總價
    const itemTotal = (menuItem.price + addonTotal) * quantity
    total += itemTotal
  }

  return total
}

// 生成訂單編號
const generateOrderId = () => {
  const now = new Date()
  const time = now.toTimeString().slice(0, 5).replace(':', '')
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  return `${time}-${random}`
}

// 取得今日日期字串
const getTodayString = () => {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// === API 路由 ===

// POST /api/orders - 建立訂單
app.post('/api/orders', (req, res) => {
  try {
    const { items } = req.body

    // 驗證輸入
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: '訂單必須包含至少一個品項' })
    }

    // 伺服器端價格驗證
    const validatedTotal = validateAndCalculateTotal(items)

    // 建立訂單
    const newOrder = {
      id: generateOrderId(),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        quantity: item.quantity,
        itemTotal: item.itemTotal,
        addons: item.addons || [],
        cartKey: item.cartKey,
      })),
      total: validatedTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
      date: getTodayString(),
    }

    // 儲存訂單
    const data = loadOrders()
    data.orders.unshift(newOrder)

    if (!saveOrders(data)) {
      return res.status(500).json({ error: '訂單儲存失敗' })
    }

    console.log(`訂單已建立: #${newOrder.id}, 總金額: $${newOrder.total}`)
    res.status(201).json(newOrder)
  } catch (error) {
    console.error('建立訂單失敗:', error.message)
    // 回傳通用錯誤訊息，不暴露詳細錯誤
    res.status(400).json({ error: '訂單建立失敗，請重試' })
  }
})

// POST /api/auth/login - 管理員登入
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body

  if (password !== ADMIN_SECRET) {
    return res.status(401).json({ error: '密碼錯誤' })
  }

  const sessionToken = generateSessionToken()
  sessions.set(sessionToken, { createdAt: Date.now() })

  console.log('管理員登入成功')
  res.json({ sessionToken, message: '登入成功' })
})

// GET /api/auth/check - 檢查登入狀態
app.get('/api/auth/check', (req, res) => {
  const sessionToken = req.headers['x-session-token']
  if (sessionToken && sessions.has(sessionToken)) {
    const session = sessions.get(sessionToken)
    if (Date.now() - session.createdAt <= 24 * 60 * 60 * 1000) {
      return res.json({ authenticated: true })
    }
  }
  res.json({ authenticated: false })
})

// POST /api/auth/logout - 登出
app.post('/api/auth/logout', (req, res) => {
  const sessionToken = req.headers['x-session-token']
  if (sessionToken) {
    sessions.delete(sessionToken)
  }
  res.json({ message: '已登出' })
})

// GET /api/orders - 取得今日訂單
app.get('/api/orders', (req, res) => {
  try {
    const data = loadOrders()
    const today = getTodayString()

    // 只回傳今日訂單
    const todayOrders = data.orders.filter(order => order.date === today)

    res.json(todayOrders)
  } catch (error) {
    console.error('取得訂單失敗:', error.message)
    res.status(500).json({ error: '取得訂單失敗' })
  }
})

// PATCH /api/orders/:id - 更新訂單狀態 (需要管理員權限)
app.patch('/api/orders/:id', validateAdminAuth, (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    // 驗證狀態值
    const validStatuses = ['pending', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: '無效的訂單狀態' })
    }

    const data = loadOrders()
    const orderIndex = data.orders.findIndex(order => order.id === id)

    if (orderIndex === -1) {
      return res.status(404).json({ error: '找不到訂單' })
    }

    // 更新狀態
    data.orders[orderIndex] = {
      ...data.orders[orderIndex],
      status,
      updatedAt: new Date().toISOString(),
    }

    if (!saveOrders(data)) {
      return res.status(500).json({ error: '更新訂單失敗' })
    }

    console.log(`訂單狀態更新: #${id} -> ${status}`)
    res.json(data.orders[orderIndex])
  } catch (error) {
    console.error('更新訂單失敗:', error.message)
    res.status(500).json({ error: '更新訂單失敗' })
  }
})

// 服務靜態檔案
app.use(express.static(join(__dirname, 'dist')))

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`訂單儲存位置: ${ORDERS_FILE}`)
})
