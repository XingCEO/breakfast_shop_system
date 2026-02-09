import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from './styles/theme';
import { CartProvider, useCart } from './contexts/CartContext';
import { OrderProvider, useOrders } from './contexts/OrderContext';
import { PreferencesProvider, usePreferences } from './contexts/PreferencesContext';
import { MenuGrid } from './components/Menu';
import { CartPanel } from './components/Cart';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import AddOnModal from './components/AddOnModal';
import SaveOrderModal from './components/SaveOrderModal';

/**
 * 主應用程式 V2 — Premium POS Design
 * 琥珀金品牌色 + 毛玻璃深色主題
 */
const AppContent = () => {
  const { cart, addItemToCart } = useCart();
  const { savedOrders, saveOrder, deleteSavedOrder } = usePreferences();
  const { orderStatusCounts } = useOrders();

  const [currentView, setCurrentView] = useState('menu');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Modal 狀態
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [currentAddOnItem, setCurrentAddOnItem] = useState(null);
  const [showSaveOrderModal, setShowSaveOrderModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // 即時時鐘與日期
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric', weekday: 'short' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  // 待處理訂單數
  const pendingCount = (orderStatusCounts?.pending || 0) + (orderStatusCounts?.preparing || 0);

  // AddOn Modal handlers
  const handleOpenAddOnModal = useCallback((item) => {
    setCurrentAddOnItem(item);
    setShowAddOnModal(true);
  }, []);

  const handleAddOnConfirm = useCallback((item, addOns) => {
    addItemToCart(item, addOns);
    setShowAddOnModal(false);
    setCurrentAddOnItem(null);
  }, [addItemToCart]);

  const handleAddOnSkip = useCallback((item) => {
    addItemToCart(item, []);
    setShowAddOnModal(false);
    setCurrentAddOnItem(null);
  }, [addItemToCart]);

  // Save Order handlers
  const handleSaveOrder = useCallback((orderName) => {
    saveOrder(orderName, cart);
    setShowSaveOrderModal(false);
  }, [saveOrder, cart]);

  // Load saved order
  const handleLoadSavedOrder = useCallback((savedOrder) => {
    savedOrder.items.forEach((item) => {
      addItemToCart(item, item.addOns || []);
    });
    setShowPreferencesModal(false);
  }, [addItemToCart]);

  // 導航項目定義
  const navItems = [
    { key: 'menu', icon: 'silverware-fork-knife', label: '菜單' },
    { key: 'analytics', icon: 'chart-bar', label: '統計', badge: pendingCount > 0 ? pendingCount : null },
    { key: 'settings', icon: 'cog-outline', label: '設定', isAction: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bgDeep} />

      <View style={styles.mainContainer}>
        {/* ===== 左側面板 ===== */}
        <View style={styles.leftPanel}>
          {/* Header — Premium Design */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {/* 品牌 Logo */}
              <View style={styles.logoWrapper}>
                <Text style={styles.logoEmoji}>🍳</Text>
              </View>
              <View style={styles.brandInfo}>
                <Text style={styles.headerTitle}>波波早餐店</Text>
                <Text style={styles.headerSubtitle}>BOBO BREAKFAST</Text>
              </View>
            </View>

            {/* 時間與導航 */}
            <View style={styles.headerRight}>
              <View style={styles.timeBlock}>
                <Text style={styles.headerTime}>{currentTime}</Text>
                <Text style={styles.headerDate}>{currentDate}</Text>
              </View>

              {/* Pill-Tab 導航 */}
              <View style={styles.headerNav}>
                {navItems.map((item) => {
                  const isActive = currentView === item.key;
                  return (
                    <TouchableOpacity
                      key={item.key}
                      style={[styles.navTab, isActive && styles.navTabActive]}
                      onPress={() => {
                        if (item.isAction) {
                          setShowPreferencesModal(true);
                        } else {
                          setCurrentView(item.key);
                        }
                      }}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={16}
                        color={isActive ? COLORS.primary : COLORS.textSecondary}
                      />
                      <Text style={[styles.navText, isActive && styles.navTextActive]}>
                        {item.label}
                      </Text>
                      {item.badge && (
                        <View style={styles.navBadge}>
                          <Text style={styles.navBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 分隔裝飾線 */}
          <View style={styles.headerAccent} />

          {/* 主內容區 */}
          <View style={styles.contentArea}>
            {currentView === 'menu' ? (
              <MenuGrid onOpenAddOnModal={handleOpenAddOnModal} />
            ) : (
              <AnalyticsDashboard />
            )}
          </View>
        </View>

        {/* ===== 右側購物車 ===== */}
        <View style={styles.rightPanel}>
          <CartPanel onSaveOrder={() => setShowSaveOrderModal(true)} />
        </View>
      </View>

      {/* Modals */}
      <AddOnModal
        visible={showAddOnModal}
        item={currentAddOnItem}
        onConfirm={handleAddOnConfirm}
        onSkip={handleAddOnSkip}
        onClose={() => {
          setShowAddOnModal(false);
          setCurrentAddOnItem(null);
        }}
      />

      <SaveOrderModal
        visible={showSaveOrderModal}
        onSave={handleSaveOrder}
        onClose={() => setShowSaveOrderModal(false)}
      />

      {/* 設定 Modal — Premium Design */}
      <Modal
        visible={showPreferencesModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowPreferencesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* 把手 */}
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <View style={styles.modalIconWrapper}>
                  <MaterialCommunityIcons name="cog" size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.modalTitle}>設定</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setShowPreferencesModal(false)}
              >
                <MaterialCommunityIcons name="close" size={20} color={COLORS.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.sectionTitle}>儲存的訂單</Text>
              {savedOrders.length === 0 ? (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIconWrapper}>
                    <MaterialCommunityIcons
                      name="bookmark-outline"
                      size={32}
                      color={COLORS.textMuted}
                    />
                  </View>
                  <Text style={styles.emptyText}>尚無儲存的訂單</Text>
                  <Text style={styles.emptyHint}>在購物車中點選儲存按鈕</Text>
                </View>
              ) : (
                savedOrders.map((order) => (
                  <View key={order.id} style={styles.savedOrderItem}>
                    <View style={styles.savedOrderIcon}>
                      <MaterialCommunityIcons name="bookmark" size={16} color={COLORS.secondary} />
                    </View>
                    <View style={styles.savedOrderInfo}>
                      <Text style={styles.savedOrderName}>{order.name}</Text>
                      <Text style={styles.savedOrderMeta}>
                        {order.items.length} 項 · ${order.total}
                      </Text>
                    </View>
                    <View style={styles.savedOrderActions}>
                      <TouchableOpacity
                        style={styles.loadBtn}
                        onPress={() => handleLoadSavedOrder(order)}
                      >
                        <MaterialCommunityIcons name="cart-plus" size={14} color="#000" />
                        <Text style={styles.loadBtnText}>載入</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deleteSavedOrder(order.id)}
                      >
                        <MaterialCommunityIcons name="trash-can-outline" size={14} color={COLORS.danger} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const RestaurantApp = () => {
  return (
    <PreferencesProvider>
      <OrderProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </OrderProvider>
    </PreferencesProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDeep,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 2.6,
    backgroundColor: COLORS.bgDark,
  },
  rightPanel: {
    flex: 1,
  },

  // Header — Premium V2
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.bgElevated,
  },
  headerAccent: {
    height: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryGlow,
  },
  logoEmoji: {
    fontSize: 22,
  },
  brandInfo: {
    justifyContent: 'center',
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textMuted,
    marginTop: SPACING.xxs,
    letterSpacing: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xl,
  },
  timeBlock: {
    alignItems: 'flex-end',
  },
  headerTime: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  headerDate: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textMuted,
    marginTop: SPACING.xxs,
  },

  // Pill-Tab 導航
  headerNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgDark,
    borderRadius: RADIUS.full,
    padding: SPACING.xs,
    gap: SPACING.xxs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  navTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    gap: SPACING.sm,
  },
  navTabActive: {
    backgroundColor: COLORS.glassBg,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  navText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textTertiary,
  },
  navTextActive: {
    color: COLORS.primary,
  },
  navBadge: {
    backgroundColor: COLORS.danger,
    minWidth: 16,
    height: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  navBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },

  // Content
  contentArea: {
    flex: 1,
  },

  // Settings Modal — Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '80%',
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    ...SHADOWS.xl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.textMuted,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgHover,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalContent: {
    padding: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.textMuted,
    marginBottom: SPACING.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  emptyIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  emptyHint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
  savedOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.bgElevated,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  savedOrderIcon: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.secondaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  savedOrderInfo: {
    flex: 1,
  },
  savedOrderName: {
    ...TYPOGRAPHY.subheadBold,
    color: COLORS.textPrimary,
  },
  savedOrderMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.xxs,
  },
  savedOrderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  loadBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  loadBtnText: {
    ...TYPOGRAPHY.captionBold,
    color: '#000',
  },
  deleteBtn: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
  },
});

export default RestaurantApp;
