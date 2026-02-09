import React, { useState, useMemo } from 'react'
import { Search, ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react'
import { MENU_ITEMS, CATEGORIES, CATEGORY_EMOJIS } from './data/menuData'

// 主應用
export default function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  // 篩選菜單
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchCategory = selectedCategory === '全部' || item.category === selectedCategory
      const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  // 購物車操作
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === item.id)
      if (existing) {
        return prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev.map(ci => {
        if (ci.id === id) {
          const newQty = ci.quantity + delta
          return newQty > 0 ? { ...ci, quantity: newQty } : null
        }
        return ci
      }).filter(Boolean)
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(ci => ci.id !== id))
  }

  const clearCart = () => {
    if (confirm('確定要清空購物車嗎？')) {
      setCart([])
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return
    alert(`訂單已送出！\n總計: $${totalPrice}`)
    setCart([])
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
          <div style={styles.searchBox}>
            <Search size={18} color="rgba(255,255,255,0.5)" />
            <input
              type="text"
              placeholder="搜尋菜單..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
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
            <div key={item.id} style={styles.menuCard} onClick={() => addToCart(item)}>
              <span style={styles.menuEmoji}>{item.emoji}</span>
              <p style={styles.menuName}>{item.name}</p>
              <p style={styles.menuPrice}>${item.price}</p>
              {item.tags?.length > 0 && (
                <div style={styles.tags}>
                  {item.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
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
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={styles.cartItem}>
                <div style={styles.cartItemInfo}>
                  <span style={styles.cartEmoji}>{item.emoji}</span>
                  <div>
                    <p style={styles.cartItemName}>{item.name}</p>
                    <p style={styles.cartItemPrice}>${item.price * item.quantity}</p>
                  </div>
                </div>
                <div style={styles.cartItemActions}>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={14} />
                  </button>
                  <span style={styles.qtyText}>{item.quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}>
                    <Plus size={14} />
                  </button>
                  <button style={styles.deleteBtn} onClick={() => removeFromCart(item.id)}>
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
            結帳
          </button>
        </div>
      </div>
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
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#2C2C2E',
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: '#F5F5F7',
    fontSize: '14px',
    outline: 'none',
    width: '200px',
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
    padding: '8px 16px',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.6)',
    fontSize: '13px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  categoryBtnActive: {
    background: 'rgba(245,166,35,0.15)',
    color: '#F5A623',
    border: '1px solid rgba(245,166,35,0.3)',
  },
  menuGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
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
  },
  menuEmoji: {
    fontSize: '32px',
    display: 'block',
    marginBottom: '8px',
  },
  menuName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#F5F5F7',
    marginBottom: '4px',
  },
  menuPrice: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#F5A623',
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
    height: '100%',
    color: 'rgba(255,255,255,0.4)',
    gap: '12px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    background: '#1C1C1E',
    borderRadius: '12px',
    marginBottom: '8px',
  },
  cartItemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
  cartItemPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#F5A623',
    margin: 0,
  },
  cartItemActions: {
    display: 'flex',
    alignItems: 'center',
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
    background: '#F5A623',
    color: '#000',
    fontSize: '16px',
    fontWeight: '700',
  },
}
