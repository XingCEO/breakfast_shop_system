import React, { useState, useMemo } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, Clock, CheckCircle, X, ChevronRight } from 'lucide-react'
import {
  MENU_ITEMS, CATEGORIES, CATEGORY_EMOJIS,
  ADDON_ELIGIBLE_CATEGORIES, COMBO_OPTIONS, COMBO_DRINKS, COMBO_SIDES,
  EXTRA_OPTIONS, NOODLE_UPGRADES
} from './data/menuData'

// 生成訂單編號
const generateOrderId = () => {
  const now = new Date()
  const time = now.toTimeString().slice(0, 5).replace(':', '')
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
  return `${time}-${random}`
}

// 主應用
export default function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [orders, setOrders] = useState([])
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)

  // 加購 Modal 狀態
  const [showAddonModal, setShowAddonModal] = useState(false)
  const [addonItem, setAddonItem] = useState(null)
  const [selectedCombo, setSelectedCombo] = useState(null)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [selectedSides, setSelectedSides] = useState([])
  const [selectedExtras, setSelectedExtras] = useState([])
  const [selectedUpgrade, setSelectedUpgrade] = useState(null)

  // 篩選菜單
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      return selectedCategory === '全部' || item.category === selectedCategory
    })
  }, [selectedCategory])

  // 檢查是否可加購
  const canAddOn = (item) => ADDON_ELIGIBLE_CATEGORIES.includes(item.category)
  const isNoodle = (item) => item.category === '鍋炒麵'

  // 點擊菜單項目
  const handleItemClick = (item) => {
    if (canAddOn(item)) {
      setAddonItem(item)
      setSelectedCombo(null)
      setSelectedDrink(null)
      setSelectedSides([])
      setSelectedExtras([])
      setSelectedUpgrade(null)
      setShowAddonModal(true)
    } else {
      addToCart(item, [])
    }
  }

  // 計算加購總價
  const calculateAddonTotal = () => {
    if (!addonItem) return 0
    let total = addonItem.price

    if (selectedCombo) {
      total += selectedCombo.price
      if (selectedDrink) total += selectedDrink.price
    }

    selectedExtras.forEach(e => total += e.price)
    if (selectedUpgrade) total += selectedUpgrade.price

    return total
  }

  // 確認加購
  const confirmAddon = () => {
    const addons = []

    if (selectedCombo) {
      addons.push({ ...selectedCombo, type: 'combo' })
      if (selectedDrink) addons.push({ ...selectedDrink, type: 'drink' })
      selectedSides.forEach(s => addons.push({ ...s, type: 'side' }))
    }

    selectedExtras.forEach(e => addons.push({ ...e, type: 'extra' }))
    if (selectedUpgrade) addons.push({ ...selectedUpgrade, type: 'upgrade' })

    addToCart(addonItem, addons)
    setShowAddonModal(false)
  }

  // 跳過加購
  const skipAddon = () => {
    addToCart(addonItem, [])
    setShowAddonModal(false)
  }

  // 購物車操作
  const addToCart = (item, addons = []) => {
    const addonTotal = addons.reduce((sum, a) => sum + a.price, 0)
    const cartKey = `${item.id}-${addons.map(a => a.id).join(',')}`

    setCart(prev => {
      const existing = prev.find(ci => ci.cartKey === cartKey)
      if (existing) {
        return prev.map(ci => ci.cartKey === cartKey ? { ...ci, quantity: ci.quantity + 1 } : ci)
      }
      return [...prev, {
        ...item,
        cartKey,
        quantity: 1,
        addons,
        itemTotal: item.price + addonTotal
      }]
    })
  }

  const updateQuantity = (cartKey, delta) => {
    setCart(prev => {
      return prev.map(ci => {
        if (ci.cartKey === cartKey) {
          const newQty = ci.quantity + delta
          return newQty > 0 ? { ...ci, quantity: newQty } : null
        }
        return ci
      }).filter(Boolean)
    })
  }

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(ci => ci.cartKey !== cartKey))
  }

  const clearCart = () => {
    if (confirm('確定要清空購物車嗎？')) {
      setCart([])
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.itemTotal * item.quantity, 0)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  // 建立訂單
  const handleCheckout = () => {
    if (cart.length === 0) return

    const newOrder = {
      id: generateOrderId(),
      items: [...cart],
      total: totalPrice,
      status: 'pending',
      createdAt: new Date()
    }

    setOrders(prev => [newOrder, ...prev])
    setCurrentOrder(newOrder)
    setShowOrderModal(true)
    setCart([])
  }

  // 更新訂單狀態
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ))
  }

  // 時間格式化
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
  }

  // 選擇配菜
  const toggleSide = (side) => {
    const maxSides = selectedCombo?.id === 'combo_95' ? 2 : 1
    if (selectedSides.find(s => s.id === side.id)) {
      setSelectedSides(prev => prev.filter(s => s.id !== side.id))
    } else if (selectedSides.length < maxSides) {
      setSelectedSides(prev => [...prev, side])
    }
  }

  // 選擇加料
  const toggleExtra = (extra) => {
    if (selectedExtras.find(e => e.id === extra.id)) {
      setSelectedExtras(prev => prev.filter(e => e.id !== extra.id))
    } else {
      setSelectedExtras(prev => [...prev, extra])
    }
  }

  return (
    <div style={styles.container}>
      {/* 左側面板 */}
      <div style={styles.leftPanel}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.brand}>
            <span style={styles.logo}>🍳</span>
            <div>
              <h1 style={styles.title}>波波早餐店</h1>
              <p style={styles.subtitle}>BOBO BREAKFAST</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.clock}>
              <Clock size={16} color="#F5A623" />
              <span>{new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {orders.filter(o => o.status === 'pending').length > 0 && (
              <div style={styles.pendingBadge}>
                {orders.filter(o => o.status === 'pending').length} 待處理
              </div>
            )}
          </div>
        </header>

        {/* 分類標籤 */}
        <div style={styles.categories}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === cat ? styles.categoryBtnActive : {})
              }}
            >
              <span>{CATEGORY_EMOJIS[cat]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* 菜單網格 */}
        <div style={styles.menuGrid}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              style={styles.menuCard}
              onClick={() => handleItemClick(item)}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={styles.menuEmoji}>{item.emoji}</span>
              <p style={styles.menuName}>{item.name}</p>
              <p style={styles.menuPrice}>${item.price}</p>
              {canAddOn(item) && (
                <div style={styles.addonBadge}>可加購</div>
              )}
              {item.tags?.length > 0 && (
                <div style={styles.tags}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      ...styles.tag,
                      ...(tag === '人氣' ? styles.tagPopular : {}),
                      ...(tag === '健康' ? styles.tagHealthy : {}),
                    }}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 右側購物車 */}
      <div style={styles.rightPanel}>
        <div style={styles.cartHeader}>
          <ShoppingCart size={20} color="#F5A623" />
          <h2 style={styles.cartTitle}>購物車</h2>
          <span style={styles.cartBadge}>{totalQuantity}</span>
        </div>

        <div style={styles.cartItems}>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <ShoppingCart size={48} color="rgba(255,255,255,0.2)" />
              <p>購物車是空的</p>
              <p style={styles.emptyHint}>點擊菜單加入商品</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartKey} style={styles.cartItem}>
                <div style={styles.cartItemInfo}>
                  <span style={styles.cartEmoji}>{item.emoji}</span>
                  <div style={{flex: 1}}>
                    <p style={styles.cartItemName}>{item.name}</p>
                    {item.addons?.length > 0 && (
                      <p style={styles.cartAddons}>
                        {item.addons.map(a => a.name).join(', ')}
                      </p>
                    )}
                    <p style={styles.cartItemPrice}>${item.itemTotal} × {item.quantity} = ${item.itemTotal * item.quantity}</p>
                  </div>
                </div>
                <div style={styles.cartItemActions}>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.cartKey, -1)}>
                    <Minus size={14} />
                  </button>
                  <span style={styles.qtyText}>{item.quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.cartKey, 1)}>
                    <Plus size={14} />
                  </button>
                  <button style={styles.deleteBtn} onClick={() => removeFromCart(item.cartKey)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.cartFooter}>
          {cart.length > 0 && (
            <button style={styles.clearBtn} onClick={clearCart}>
              清空購物車
            </button>
          )}
          <div style={styles.totalRow}>
            <span>總計</span>
            <span style={styles.totalPrice}>${totalPrice}</span>
          </div>
          <button
            style={{...styles.checkoutBtn, opacity: cart.length === 0 ? 0.5 : 1}}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            建立訂單
          </button>
        </div>

        {/* 訂單列表 */}
        {orders.length > 0 && (
          <div style={styles.orderSection}>
            <h3 style={styles.orderSectionTitle}>今日訂單</h3>
            <div style={styles.orderList}>
              {orders.slice(0, 5).map(order => (
                <div
                  key={order.id}
                  style={{
                    ...styles.orderItem,
                    ...(order.status === 'completed' ? styles.orderCompleted : {})
                  }}
                  onClick={() => updateOrderStatus(order.id, order.status === 'pending' ? 'completed' : 'pending')}
                >
                  <div style={styles.orderInfo}>
                    <span style={styles.orderId}>#{order.id}</span>
                    <span style={styles.orderTime}>{formatTime(order.createdAt)}</span>
                  </div>
                  <div style={styles.orderMeta}>
                    <span style={styles.orderTotal}>${order.total}</span>
                    {order.status === 'completed' ? (
                      <CheckCircle size={16} color="#34D399" />
                    ) : (
                      <Clock size={16} color="#FBBF24" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 加購 Modal */}
      {showAddonModal && addonItem && (
        <div style={styles.modalOverlay} onClick={() => setShowAddonModal(false)}>
          <div style={styles.addonModal} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setShowAddonModal(false)}>
              <X size={20} />
            </button>

            <div style={styles.addonHeader}>
              <span style={{fontSize: '32px'}}>{addonItem.emoji}</span>
              <div>
                <h2 style={styles.addonTitle}>{addonItem.name}</h2>
                <p style={styles.addonPrice}>單價 ${addonItem.price}</p>
              </div>
            </div>

            <div style={styles.addonContent}>
              {/* 套餐選擇 */}
              <div style={styles.addonSection}>
                <h3 style={styles.sectionTitle}>💰 套餐優惠</h3>
                {COMBO_OPTIONS.map(combo => (
                  <div
                    key={combo.id}
                    style={{
                      ...styles.optionItem,
                      ...(selectedCombo?.id === combo.id ? styles.optionSelected : {})
                    }}
                    onClick={() => {
                      setSelectedCombo(selectedCombo?.id === combo.id ? null : combo)
                      setSelectedDrink(null)
                      setSelectedSides([])
                    }}
                  >
                    <div>
                      <p style={styles.optionName}>{combo.name}</p>
                      <p style={styles.optionDesc}>{combo.desc}</p>
                    </div>
                    <span style={styles.optionPrice}>+${combo.price}</span>
                  </div>
                ))}
              </div>

              {/* 飲品選擇 (選了套餐才顯示) */}
              {selectedCombo && (
                <div style={styles.addonSection}>
                  <h3 style={styles.sectionTitle}>🥤 選擇飲品</h3>
                  {COMBO_DRINKS.map(drink => (
                    <div
                      key={drink.id}
                      style={{
                        ...styles.optionItem,
                        ...(selectedDrink?.id === drink.id ? styles.optionSelected : {})
                      }}
                      onClick={() => setSelectedDrink(drink)}
                    >
                      <span style={styles.optionName}>{drink.name}</span>
                      <span style={styles.optionPrice}>
                        {drink.price < 0 ? drink.price : drink.price === 0 ? '含' : `+$${drink.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* 配菜選擇 (選了套餐才顯示) */}
              {selectedCombo && (
                <div style={styles.addonSection}>
                  <h3 style={styles.sectionTitle}>
                    🍟 選擇配菜 ({selectedSides.length}/{selectedCombo.id === 'combo_95' ? 2 : 1})
                  </h3>
                  {COMBO_SIDES.map(side => (
                    <div
                      key={side.id}
                      style={{
                        ...styles.optionItem,
                        ...(selectedSides.find(s => s.id === side.id) ? styles.optionSelected : {})
                      }}
                      onClick={() => toggleSide(side)}
                    >
                      <span style={styles.optionName}>{side.name}</span>
                      <span style={styles.optionPrice}>含</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 鍋炒麵升級 */}
              {isNoodle(addonItem) && (
                <div style={styles.addonSection}>
                  <h3 style={styles.sectionTitle}>🍜 加料升級</h3>
                  {NOODLE_UPGRADES.map(upgrade => (
                    <div
                      key={upgrade.id}
                      style={{
                        ...styles.optionItem,
                        ...(selectedUpgrade?.id === upgrade.id ? styles.optionSelected : {})
                      }}
                      onClick={() => setSelectedUpgrade(selectedUpgrade?.id === upgrade.id ? null : upgrade)}
                    >
                      <span style={styles.optionName}>{upgrade.name}</span>
                      <span style={styles.optionPrice}>+${upgrade.price}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 單點加料 */}
              <div style={styles.addonSection}>
                <h3 style={styles.sectionTitle}>➕ 加料</h3>
                {EXTRA_OPTIONS.map(extra => (
                  <div
                    key={extra.id}
                    style={{
                      ...styles.optionItem,
                      ...(selectedExtras.find(e => e.id === extra.id) ? styles.optionSelected : {})
                    }}
                    onClick={() => toggleExtra(extra)}
                  >
                    <span style={styles.optionName}>{extra.name}</span>
                    <span style={styles.optionPrice}>+${extra.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.addonFooter}>
              <div style={styles.addonTotalRow}>
                <span>小計</span>
                <span style={styles.addonTotalPrice}>${calculateAddonTotal()}</span>
              </div>
              <div style={styles.addonButtons}>
                <button style={styles.skipBtn} onClick={skipAddon}>
                  不加購
                </button>
                <button style={styles.confirmBtn} onClick={confirmAddon}>
                  加入購物車
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 訂單確認 Modal */}
      {showOrderModal && currentOrder && (
        <div style={styles.modalOverlay} onClick={() => setShowOrderModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setShowOrderModal(false)}>
              <X size={20} />
            </button>
            <div style={styles.modalIcon}>✅</div>
            <h2 style={styles.modalTitle}>訂單已建立</h2>
            <p style={styles.modalOrderId}>訂單編號: #{currentOrder.id}</p>
            <div style={styles.modalItems}>
              {currentOrder.items.map(item => (
                <div key={item.cartKey} style={styles.modalItem}>
                  <div>
                    <span>{item.emoji} {item.name} × {item.quantity}</span>
                    {item.addons?.length > 0 && (
                      <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0 0'}}>
                        {item.addons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span>${item.itemTotal * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={styles.modalTotal}>
              <span>總計</span>
              <span style={styles.modalTotalPrice}>${currentOrder.total}</span>
            </div>
            <button style={styles.modalBtn} onClick={() => setShowOrderModal(false)}>
              確認
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// 樣式
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: '#0A0A0C',
  },
  leftPanel: {
    flex: 2.5,
    display: 'flex',
    flexDirection: 'column',
    background: '#0A0A0C',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: '#141416',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    minWidth: '320px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    background: '#1C1C1E',
    borderBottom: '2px solid rgba(245,166,35,0.5)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    fontSize: '32px',
    background: 'rgba(245,166,35,0.1)',
    padding: '8px',
    borderRadius: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#F5F5F7',
    margin: 0,
  },
  subtitle: {
    fontSize: '10px',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '2px',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  clock: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#F5F5F7',
    fontSize: '16px',
    fontWeight: '600',
  },
  pendingBadge: {
    background: 'rgba(251,191,36,0.15)',
    color: '#FBBF24',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  categories: {
    display: 'flex',
    gap: '8px',
    padding: '16px 24px',
    overflowX: 'auto',
    background: '#141416',
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    border: '1px solid transparent',
  },
  categoryBtnActive: {
    background: 'rgba(245,166,35,0.15)',
    color: '#F5A623',
    border: '1px solid rgba(245,166,35,0.3)',
  },
  menuGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '12px',
    padding: '16px 24px',
    overflowY: 'auto',
    alignContent: 'start',
  },
  menuCard: {
    background: '#1C1C1E',
    borderRadius: '16px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid rgba(255,255,255,0.06)',
    position: 'relative',
  },
  menuEmoji: {
    fontSize: '28px',
    display: 'block',
    marginBottom: '8px',
  },
  menuName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#F5F5F7',
    marginBottom: '4px',
    lineHeight: '1.3',
  },
  menuPrice: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#F5A623',
    margin: 0,
  },
  addonBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    fontSize: '9px',
    padding: '2px 6px',
    borderRadius: '4px',
    background: 'rgba(99,102,241,0.15)',
    color: '#818CF8',
    fontWeight: '600',
  },
  tags: {
    display: 'flex',
    gap: '4px',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '4px',
    background: 'rgba(52,211,153,0.12)',
    color: '#34D399',
  },
  tagPopular: {
    background: 'rgba(244,63,94,0.12)',
    color: '#F43F5E',
  },
  tagHealthy: {
    background: 'rgba(56,189,248,0.12)',
    color: '#38BDF8',
  },
  cartHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  cartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#F5F5F7',
    margin: 0,
    flex: 1,
  },
  cartBadge: {
    background: '#F5A623',
    color: '#000',
    fontSize: '12px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '10px',
    minWidth: '24px',
    textAlign: 'center',
  },
  cartItems: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px',
  },
  emptyCart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
    color: 'rgba(255,255,255,0.4)',
    gap: '8px',
  },
  emptyHint: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.25)',
    margin: 0,
  },
  cartItem: {
    padding: '12px',
    background: '#1C1C1E',
    borderRadius: '12px',
    marginBottom: '8px',
  },
  cartItemInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '8px',
  },
  cartEmoji: {
    fontSize: '24px',
  },
  cartItemName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#F5F5F7',
    margin: 0,
  },
  cartAddons: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
    margin: '2px 0 0 0',
  },
  cartItemPrice: {
    fontSize: '12px',
    color: '#F5A623',
    margin: '4px 0 0 0',
    fontWeight: '600',
  },
  cartItemActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '6px',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: 'rgba(255,255,255,0.1)',
    color: '#F5F5F7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    width: '24px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
  },
  deleteBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: 'rgba(244,63,94,0.12)',
    color: '#F43F5E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '4px',
  },
  cartFooter: {
    padding: '16px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  clearBtn: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '10px',
    background: 'rgba(244,63,94,0.12)',
    color: '#F43F5E',
    fontSize: '14px',
    fontWeight: '600',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
  },
  totalPrice: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#F5A623',
  },
  checkoutBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #F5A623 0%, #D4891B 100%)',
    color: '#000',
    fontSize: '16px',
    fontWeight: '700',
    transition: 'all 0.2s',
  },
  orderSection: {
    padding: '16px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  orderSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.5)',
    margin: '0 0 12px 0',
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    background: 'rgba(251,191,36,0.08)',
    borderRadius: '10px',
    cursor: 'pointer',
    border: '1px solid rgba(251,191,36,0.2)',
  },
  orderCompleted: {
    background: 'rgba(52,211,153,0.08)',
    border: '1px solid rgba(52,211,153,0.2)',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  orderId: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#F5F5F7',
  },
  orderTime: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
  },
  orderMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  orderTotal: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#F5A623',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#1C1C1E',
    borderRadius: '24px',
    padding: '32px',
    width: '90%',
    maxWidth: '400px',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  addonModal: {
    background: '#1C1C1E',
    borderRadius: '24px',
    width: '90%',
    maxWidth: '480px',
    maxHeight: '85vh',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    flexDirection: 'column',
  },
  modalClose: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    zIndex: 10,
  },
  addonHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  addonTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#F5F5F7',
    margin: 0,
  },
  addonPrice: {
    fontSize: '14px',
    color: '#F5A623',
    margin: '4px 0 0 0',
  },
  addonContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
  },
  addonSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    margin: '0 0 10px 0',
  },
  optionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    marginBottom: '6px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
  },
  optionSelected: {
    background: 'rgba(245,166,35,0.1)',
    border: '1px solid rgba(245,166,35,0.3)',
  },
  optionName: {
    fontSize: '14px',
    color: '#F5F5F7',
    margin: 0,
  },
  optionDesc: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.4)',
    margin: '2px 0 0 0',
  },
  optionPrice: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#F5A623',
  },
  addonFooter: {
    padding: '16px 24px 24px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  addonTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
  },
  addonTotalPrice: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#F5A623',
  },
  addonButtons: {
    display: 'flex',
    gap: '12px',
  },
  skipBtn: {
    flex: 1,
    padding: '14px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '15px',
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 2,
    padding: '14px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #F5A623 0%, #D4891B 100%)',
    color: '#000',
    fontSize: '15px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  modalIcon: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#F5F5F7',
    textAlign: 'center',
    margin: '0 0 8px 0',
  },
  modalOrderId: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    margin: '0 0 24px 0',
  },
  modalItems: {
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
  },
  modalItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px',
    color: '#F5F5F7',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  modalTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    fontSize: '16px',
    color: '#F5F5F7',
  },
  modalTotalPrice: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#F5A623',
  },
  modalBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    background: '#F5A623',
    color: '#000',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '8px',
  },
}
