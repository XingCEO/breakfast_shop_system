import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS } from '../../styles/theme';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';
import { calculateItemTotal, cartItemKey, formatCurrency, calculateChange } from '../../utils/helpers';
import CartItem from './CartItem';

/**
 * 購物車面板 V3 — 三步驟結帳流程
 * Step 1: cart     — 品項清單（增減、刪除、備註）
 * Step 2: checkout — 訂單確認 + 收款計算器
 * Step 3: success  — 完成畫面（訂單編號 + 金額）
 */
const CartPanel = ({ onSaveOrder }) => {
    const {
        cart,
        totalQuantity,
        totalPrice,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        resetCart,
        updateItemNote,
    } = useCart();
    const { submitOrder } = useOrders();

    // 三步驟狀態：'cart' | 'checkout' | 'success'
    const [step, setStep] = useState('cart');
    const [paidAmount, setPaidAmount] = useState('');
    const [completedOrderId, setCompletedOrderId] = useState('');
    const [completedTotal, setCompletedTotal] = useState(0);

    // 成功畫面動畫
    const successScale = useRef(new Animated.Value(0)).current;
    const successOpacity = useRef(new Animated.Value(0)).current;

    // 收款計算
    const changeResult = calculateChange(totalPrice, parseInt(paidAmount) || 0);

    // 快速收款金額
    const quickAmounts = [50, 100, 200, 500, 1000];

    // 購物車清空時回到 cart 步驟
    useEffect(() => {
        if (cart.length === 0 && step === 'checkout') {
            setStep('cart');
        }
    }, [cart.length, step]);

    // 進入結帳
    const handleGoToCheckout = useCallback(() => {
        if (cart.length === 0) return;
        setPaidAmount('');
        setStep('checkout');
    }, [cart.length]);

    // 返回購物車
    const handleBackToCart = useCallback(() => {
        setStep('cart');
        setPaidAmount('');
    }, []);

    // 確認送出訂單
    const handleConfirmOrder = useCallback(() => {
        const orderId = submitOrder(cart, totalPrice);
        if (orderId) {
            setCompletedOrderId(orderId);
            setCompletedTotal(totalPrice);
            resetCart();
            setStep('success');
            setPaidAmount('');

            // 播放成功動畫
            successScale.setValue(0);
            successOpacity.setValue(0);
            Animated.parallel([
                Animated.spring(successScale, {
                    toValue: 1,
                    tension: 80,
                    friction: 6,
                    useNativeDriver: true,
                }),
                Animated.timing(successOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // 5 秒後自動回到購物車
            setTimeout(() => {
                setStep('cart');
            }, 5000);
        }
    }, [submitOrder, cart, totalPrice, resetCart, successScale, successOpacity]);

    // 新一單
    const handleNewOrder = useCallback(() => {
        setStep('cart');
        setCompletedOrderId('');
        setCompletedTotal(0);
    }, []);

    // ========== Step 3: 成功畫面 ==========
    if (step === 'success') {
        return (
            <View style={styles.container}>
                <View style={styles.topAccent} />
                <View style={styles.successContainer}>
                    <Animated.View style={[
                        styles.successContent,
                        { transform: [{ scale: successScale }], opacity: successOpacity },
                    ]}>
                        {/* 打勾圖示 */}
                        <View style={styles.successIconOuter}>
                            <View style={styles.successIconInner}>
                                <MaterialCommunityIcons name="check-bold" size={40} color="#000" />
                            </View>
                        </View>

                        <Text style={styles.successTitle}>訂單已送出！</Text>
                        <Text style={styles.successSubtitle}>感謝您的訂購</Text>

                        {/* 訂單資訊 */}
                        <View style={styles.successInfoCard}>
                            <View style={styles.successInfoRow}>
                                <Text style={styles.successInfoLabel}>訂單編號</Text>
                                <Text style={styles.successOrderId}>{completedOrderId}</Text>
                            </View>
                            <View style={styles.successDivider} />
                            <View style={styles.successInfoRow}>
                                <Text style={styles.successInfoLabel}>訂單金額</Text>
                                <View style={styles.successPriceRow}>
                                    <Text style={styles.successPriceSign}>$</Text>
                                    <Text style={styles.successPrice}>{formatCurrency(completedTotal)}</Text>
                                </View>
                            </View>
                            {paidAmount.length > 0 && changeResult.isValid && (
                                <>
                                    <View style={styles.successDivider} />
                                    <View style={styles.successInfoRow}>
                                        <Text style={styles.successInfoLabel}>找零</Text>
                                        <Text style={styles.successChangeText}>
                                            ${formatCurrency(changeResult.change)}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>

                        {/* 倒數提示 */}
                        <Text style={styles.autoBackHint}>將自動返回點餐畫面...</Text>

                        {/* 按鈕 */}
                        <TouchableOpacity
                            style={styles.newOrderBtn}
                            onPress={handleNewOrder}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons name="plus" size={18} color="#000" />
                            <Text style={styles.newOrderBtnText}>開始下一單</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }

    // ========== Step 2: 結帳確認 ==========
    if (step === 'checkout') {
        return (
            <View style={styles.container}>
                <View style={styles.topAccent} />

                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={handleBackToCart} style={styles.backBtn}>
                            <MaterialCommunityIcons name="arrow-left" size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                        <MaterialCommunityIcons name="clipboard-check-outline" size={20} color={COLORS.primary} />
                        <Text style={styles.headerTitle}>確認訂單</Text>
                    </View>
                </View>

                {/* 訂單明細 */}
                <ScrollView
                    style={styles.checkoutList}
                    contentContainerStyle={styles.checkoutListContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 品項明細表 */}
                    <View style={styles.checkoutSection}>
                        <Text style={styles.checkoutSectionTitle}>訂單明細</Text>
                        {cart.map((item) => {
                            const itemTotal = calculateItemTotal(item);
                            return (
                                <View key={cartItemKey(item)} style={styles.checkoutItem}>
                                    <View style={styles.checkoutItemLeft}>
                                        <Text style={styles.checkoutItemEmoji}>{item.emoji}</Text>
                                        <View style={styles.checkoutItemInfo}>
                                            <Text style={styles.checkoutItemName}>{item.name}</Text>
                                            {item.addOns && item.addOns.length > 0 && (
                                                <Text style={styles.checkoutItemAddOns}>
                                                    + {item.addOns.map(a => a.name).join('、')}
                                                </Text>
                                            )}
                                            {item.note ? (
                                                <Text style={styles.checkoutItemNote}>
                                                    📝 {item.note}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </View>
                                    <View style={styles.checkoutItemRight}>
                                        <Text style={styles.checkoutItemQty}>×{item.quantity}</Text>
                                        <Text style={styles.checkoutItemPrice}>${formatCurrency(itemTotal)}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* 金額彙總 */}
                    <View style={styles.checkoutSummary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>小計（{totalQuantity} 項）</Text>
                            <Text style={styles.summaryValue}>${formatCurrency(totalPrice)}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryTotalRow}>
                            <Text style={styles.summaryTotalLabel}>應付金額</Text>
                            <View style={styles.summaryTotalValueRow}>
                                <Text style={styles.summaryTotalSign}>$</Text>
                                <Text style={styles.summaryTotalValue}>{formatCurrency(totalPrice)}</Text>
                            </View>
                        </View>
                    </View>

                    {/* 收款計算器 */}
                    <View style={styles.paymentSection}>
                        <Text style={styles.checkoutSectionTitle}>收款計算</Text>
                        <View style={styles.paymentInputRow}>
                            <Text style={styles.paymentLabel}>收款</Text>
                            <View style={styles.paymentInputWrapper}>
                                <Text style={styles.paymentCurrency}>$</Text>
                                <TextInput
                                    style={styles.paymentInput}
                                    value={paidAmount}
                                    onChangeText={setPaidAmount}
                                    keyboardType="numeric"
                                    placeholder="輸入收款金額"
                                    placeholderTextColor={COLORS.textMuted}
                                />
                            </View>
                        </View>

                        {/* 快速金額按鈕 */}
                        <View style={styles.quickAmounts}>
                            {quickAmounts.map((amount) => (
                                <TouchableOpacity
                                    key={amount}
                                    style={[
                                        styles.quickBtn,
                                        paidAmount === String(amount) && styles.quickBtnActive,
                                    ]}
                                    onPress={() => setPaidAmount(String(amount))}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.quickBtnText,
                                        paidAmount === String(amount) && styles.quickBtnTextActive,
                                    ]}>${amount}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* 找零結果 */}
                        {paidAmount.length > 0 && (
                            <View style={[
                                styles.changeResult,
                                changeResult.isValid ? styles.changeSuccess : styles.changeError,
                            ]}>
                                <MaterialCommunityIcons
                                    name={changeResult.isValid ? 'check-circle' : 'alert-circle'}
                                    size={18}
                                    color={changeResult.isValid ? COLORS.success : COLORS.danger}
                                />
                                <Text style={[
                                    styles.changeText,
                                    { color: changeResult.isValid ? COLORS.success : COLORS.danger },
                                ]}>
                                    {changeResult.message}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* 底部操作 */}
                <View style={styles.checkoutFooter}>
                    <TouchableOpacity
                        style={styles.backCartBtn}
                        onPress={handleBackToCart}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="cart-outline" size={18} color={COLORS.textSecondary} />
                        <Text style={styles.backCartBtnText}>返回修改</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={handleConfirmOrder}
                        activeOpacity={0.8}
                    >
                        <MaterialCommunityIcons name="check-circle" size={18} color="#000" />
                        <Text style={styles.confirmBtnText}>確認送出 ${formatCurrency(totalPrice)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ========== Step 1: 購物車清單（原有功能） ==========
    return (
        <View style={styles.container}>
            {/* 頂部裝飾條 */}
            <View style={styles.topAccent} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <MaterialCommunityIcons name="cart" size={20} color={COLORS.primary} />
                    <Text style={styles.headerTitle}>購物車</Text>
                    {totalQuantity > 0 && (
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{totalQuantity}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.headerActions}>
                    {cart.length > 0 && (
                        <>
                            <TouchableOpacity
                                style={styles.headerBtn}
                                onPress={onSaveOrder}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons name="content-save-outline" size={16} color={COLORS.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.headerBtn}
                                onPress={clearCart}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons name="trash-can-outline" size={16} color={COLORS.danger} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            {/* 購物車內容 */}
            {cart.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconWrapper}>
                        <MaterialCommunityIcons name="cart-outline" size={40} color={COLORS.textMuted} />
                    </View>
                    <Text style={styles.emptyTitle}>購物車是空的</Text>
                    <Text style={styles.emptyText}>點擊左側菜單品項開始點餐</Text>
                </View>
            ) : (
                <>
                    {/* 品項列表 */}
                    <ScrollView
                        style={styles.cartList}
                        contentContainerStyle={styles.cartListContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {cart.map((item) => (
                            <CartItem
                                key={cartItemKey(item)}
                                item={item}
                                itemTotal={calculateItemTotal(item)}
                                onIncrease={() => increaseQuantity(item)}
                                onDecrease={() => decreaseQuantity(item)}
                                onRemove={() => removeFromCart(item)}
                                onUpdateNote={updateItemNote}
                            />
                        ))}
                    </ScrollView>

                    {/* 底部結帳區 */}
                    <View style={styles.footer}>
                        {/* 小計 */}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>
                                合計（{totalQuantity} 項）
                            </Text>
                            <View style={styles.totalValueRow}>
                                <Text style={styles.totalSign}>$</Text>
                                <Text style={styles.totalValue}>{formatCurrency(totalPrice)}</Text>
                            </View>
                        </View>

                        {/* 結帳按鈕 */}
                        <TouchableOpacity
                            style={styles.checkoutBtn}
                            onPress={handleGoToCheckout}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons name="arrow-right-circle" size={20} color="#000" />
                            <Text style={styles.checkoutBtnText}>前往結帳</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cartBg,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.border,
    },
    topAccent: {
        height: 3,
        backgroundColor: COLORS.primary,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.cartHeader,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    headerTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
    },
    countBadge: {
        backgroundColor: COLORS.primary,
        minWidth: 22,
        height: 22,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.sm,
    },
    countText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
    },
    headerActions: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    headerBtn: {
        width: 34,
        height: 34,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    backBtn: {
        width: 34,
        height: 34,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.bgElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },

    // 空狀態
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
    },
    emptyIconWrapper: {
        width: 80,
        height: 80,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgElevated,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    emptyTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textMuted,
        textAlign: 'center',
    },

    // 品項列表
    cartList: {
        flex: 1,
    },
    cartListContent: {
        padding: SPACING.lg,
        paddingBottom: SPACING.sm,
    },

    // 底部 (Step 1)
    footer: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.cartHeader,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: SPACING.lg,
    },
    totalLabel: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
    },
    totalValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    totalSign: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textTertiary,
        marginRight: SPACING.xxs,
    },
    totalValue: {
        ...TYPOGRAPHY.priceXL,
        color: COLORS.primary,
    },
    checkoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md + 2,
        borderRadius: RADIUS.lg,
        gap: SPACING.sm,
        ...SHADOWS.md,
    },
    checkoutBtnText: {
        ...TYPOGRAPHY.button,
        color: '#000',
        fontWeight: '700',
    },

    // ========== Step 2: 結帳確認 ==========
    checkoutList: {
        flex: 1,
    },
    checkoutListContent: {
        padding: SPACING.lg,
    },
    checkoutSection: {
        marginBottom: SPACING.xl,
    },
    checkoutSectionTitle: {
        ...TYPOGRAPHY.label,
        color: COLORS.textMuted,
        marginBottom: SPACING.md,
    },
    checkoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    checkoutItemLeft: {
        flex: 1,
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    checkoutItemEmoji: {
        fontSize: 18,
        marginTop: 2,
    },
    checkoutItemInfo: {
        flex: 1,
    },
    checkoutItemName: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.textPrimary,
    },
    checkoutItemAddOns: {
        ...TYPOGRAPHY.caption,
        color: COLORS.secondary,
        marginTop: SPACING.xxs,
    },
    checkoutItemNote: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
        marginTop: SPACING.xxs,
    },
    checkoutItemRight: {
        alignItems: 'flex-end',
        marginLeft: SPACING.md,
    },
    checkoutItemQty: {
        ...TYPOGRAPHY.captionBold,
        color: COLORS.textTertiary,
        marginBottom: SPACING.xxs,
    },
    checkoutItemPrice: {
        ...TYPOGRAPHY.priceSmall,
        color: COLORS.primary,
    },

    // 金額彙總
    checkoutSummary: {
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
    },
    summaryValue: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textPrimary,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.md,
    },
    summaryTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    summaryTotalLabel: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
    },
    summaryTotalValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    summaryTotalSign: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textTertiary,
        marginRight: SPACING.xxs,
    },
    summaryTotalValue: {
        ...TYPOGRAPHY.priceLG,
        color: COLORS.primary,
    },

    // 收款計算器
    paymentSection: {
        marginBottom: SPACING.xl,
    },
    paymentInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    paymentLabel: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
        marginRight: SPACING.md,
    },
    paymentInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgDark,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    paymentCurrency: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textMuted,
        marginRight: SPACING.xs,
    },
    paymentInput: {
        flex: 1,
        ...TYPOGRAPHY.priceLG,
        color: COLORS.textPrimary,
        paddingVertical: SPACING.sm,
    },
    quickAmounts: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    quickBtn: {
        flex: 1,
        backgroundColor: COLORS.bgHover,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    quickBtnActive: {
        backgroundColor: COLORS.primarySoft,
        borderColor: COLORS.primaryGlow,
    },
    quickBtnText: {
        ...TYPOGRAPHY.captionBold,
        color: COLORS.textSecondary,
    },
    quickBtnTextActive: {
        color: COLORS.primary,
    },
    changeResult: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
    },
    changeSuccess: {
        backgroundColor: COLORS.successBg,
    },
    changeError: {
        backgroundColor: COLORS.dangerBg,
    },
    changeText: {
        ...TYPOGRAPHY.bodySemibold,
    },

    // 結帳底部操作
    checkoutFooter: {
        flexDirection: 'row',
        gap: SPACING.md,
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.cartHeader,
    },
    backCartBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: SPACING.xs,
    },
    backCartBtnText: {
        ...TYPOGRAPHY.captionBold,
        color: COLORS.textSecondary,
    },
    confirmBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md + 2,
        borderRadius: RADIUS.lg,
        gap: SPACING.sm,
        ...SHADOWS.md,
    },
    confirmBtnText: {
        ...TYPOGRAPHY.button,
        color: '#000',
        fontWeight: '700',
    },

    // ========== Step 3: 成功畫面 ==========
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xl,
    },
    successContent: {
        alignItems: 'center',
        width: '100%',
    },
    successIconOuter: {
        width: 88,
        height: 88,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 2,
        borderColor: COLORS.primaryGlow,
    },
    successIconInner: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successTitle: {
        ...TYPOGRAPHY.title2,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    successSubtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.textMuted,
        marginBottom: SPACING.xxl,
    },
    successInfoCard: {
        width: '100%',
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.xl,
        padding: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: SPACING.xl,
    },
    successInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    successInfoLabel: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
    },
    successOrderId: {
        ...TYPOGRAPHY.orderNumber,
        color: COLORS.primary,
    },
    successDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: SPACING.lg,
    },
    successPriceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    successPriceSign: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textTertiary,
        marginRight: SPACING.xxs,
    },
    successPrice: {
        ...TYPOGRAPHY.priceLG,
        color: COLORS.primary,
    },
    successChangeText: {
        ...TYPOGRAPHY.priceMD,
        color: COLORS.success,
    },
    autoBackHint: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
        marginBottom: SPACING.xl,
    },
    newOrderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md + 2,
        paddingHorizontal: SPACING.xxxl,
        borderRadius: RADIUS.lg,
        gap: SPACING.sm,
        ...SHADOWS.md,
    },
    newOrderBtnText: {
        ...TYPOGRAPHY.button,
        color: '#000',
        fontWeight: '700',
    },
});

export default CartPanel;
