import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS, getCategoryColor } from '../../styles/theme';
import { useOrders } from '../../contexts/OrderContext';
import { formatCurrency, ORDER_STATUS } from '../../utils/helpers';

/**
 * 銷售分析儀表板 V2 — 漸層卡片 + 進度條 + 訂單狀態
 */
const AnalyticsDashboard = () => {
    const {
        totalRevenue,
        totalOrders,
        averageOrderValue,
        topProducts,
        categorySales,
        recentOrders,
        orderStatusCounts,
        updateOrderStatus,
    } = useOrders();

    // 最大營收（用於進度條比例）
    const maxProductRevenue = useMemo(() => {
        if (topProducts.length === 0) return 1;
        return topProducts[0]?.revenue || 1;
    }, [topProducts]);

    const maxCategorySales = useMemo(() => {
        if (categorySales.length === 0) return 1;
        return categorySales[0]?.revenue || 1;
    }, [categorySales]);

    // 空狀態
    if (totalOrders === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.emptyIconWrapper}>
                    <MaterialCommunityIcons name="chart-line" size={48} color={COLORS.textMuted} />
                </View>
                <Text style={styles.emptyTitle}>還沒有訂單</Text>
                <Text style={styles.emptyText}>開始接單後即可看到銷售分析！</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* ======= 統計卡片 ======= */}
            <View style={styles.statsRow}>
                <StatCard
                    icon="cash-multiple"
                    label="總營收"
                    value={`$${formatCurrency(totalRevenue)}`}
                    color={COLORS.primary}
                />
                <StatCard
                    icon="receipt"
                    label="訂單數"
                    value={totalOrders}
                    color={COLORS.secondary}
                />
                <StatCard
                    icon="calculator-variant"
                    label="平均客單"
                    value={`$${formatCurrency(averageOrderValue)}`}
                    color={COLORS.teal}
                />
            </View>

            {/* ======= 訂單狀態 ======= */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>訂單狀態</Text>
                <View style={styles.statusRow}>
                    {Object.entries(ORDER_STATUS).map(([key, status]) => (
                        <View key={key} style={styles.statusCard}>
                            <MaterialCommunityIcons name={status.icon} size={20} color={status.color} />
                            <Text style={[styles.statusCount, { color: status.color }]}>
                                {orderStatusCounts[key] || 0}
                            </Text>
                            <Text style={styles.statusLabel}>{status.label}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* ======= 熱賣排行 ======= */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>熱賣排行 TOP 10</Text>
                {topProducts.map((product, index) => {
                    const percentage = Math.round((product.revenue / maxProductRevenue) * 100);
                    const categoryColor = getCategoryColor(product.category);
                    return (
                        <View key={`product-${index}`} style={styles.rankItem}>
                            <View style={styles.rankLeft}>
                                <View style={[styles.rankNumber, index < 3 && { backgroundColor: COLORS.primarySoft }]}>
                                    <Text style={[styles.rankNumberText, index < 3 && { color: COLORS.primary }]}>
                                        {index + 1}
                                    </Text>
                                </View>
                                <View style={styles.rankInfo}>
                                    <Text style={styles.rankName} numberOfLines={1}>
                                        {product.emoji} {product.name}
                                    </Text>
                                    <Text style={styles.rankMeta}>
                                        {product.quantity}份 · ${formatCurrency(product.revenue)}
                                    </Text>
                                </View>
                            </View>
                            {/* 進度條 */}
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        {
                                            width: `${percentage}%`,
                                            backgroundColor: categoryColor,
                                            opacity: 0.7,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* ======= 分類銷售 ======= */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>分類銷售</Text>
                {categorySales.map((cat, index) => {
                    const percentage = Math.round((cat.revenue / maxCategorySales) * 100);
                    const categoryColor = getCategoryColor(cat.category);
                    return (
                        <View key={`cat-${index}`} style={styles.categoryItem}>
                            <View style={styles.categoryLeft}>
                                <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
                                <Text style={styles.categoryName}>{cat.category}</Text>
                            </View>
                            <View style={styles.categoryRight}>
                                <View style={styles.categoryBarBg}>
                                    <View
                                        style={[
                                            styles.categoryBarFill,
                                            { width: `${percentage}%`, backgroundColor: categoryColor },
                                        ]}
                                    />
                                </View>
                                <Text style={styles.categoryValue}>${formatCurrency(cat.revenue)}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* ======= 最近訂單 ======= */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>最近訂單</Text>
                {recentOrders.map((order) => {
                    const statusInfo = ORDER_STATUS[order.status] || ORDER_STATUS.pending;
                    return (
                        <View key={order.id} style={styles.orderCard}>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderId}>{order.orderId}</Text>
                                <TouchableOpacity
                                    style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}18` }]}
                                    onPress={() => {
                                        const nextStatus = order.status === 'pending' ? 'preparing'
                                            : order.status === 'preparing' ? 'completed' : null;
                                        if (nextStatus) updateOrderStatus(order.id, nextStatus);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                                    <Text style={[styles.statusText, { color: statusInfo.color }]}>
                                        {statusInfo.label}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.orderBody}>
                                <Text style={styles.orderItems} numberOfLines={2}>
                                    {order.items.map(i => `${i.emoji} ${i.name}×${i.quantity}`).join('、')}
                                </Text>
                            </View>
                            <View style={styles.orderFooter}>
                                <Text style={styles.orderDate}>{order.date}</Text>
                                <Text style={styles.orderTotal}>${formatCurrency(order.total)}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

// ==================== 統計卡片子元件 ====================
const StatCard = ({ icon, label, value, color }) => (
    <View style={[styles.statCard, { borderColor: `${color}25` }]}>
        <View style={[styles.statIconWrapper, { backgroundColor: `${color}15` }]}>
            <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
);

// ==================== Styles ====================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgDark,
    },
    content: {
        padding: SPACING.xl,
        paddingBottom: SPACING.huge,
    },

    // 空狀態
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bgDark,
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
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textMuted,
        marginTop: SPACING.sm,
    },

    // 統計卡片
    statsRow: {
        flexDirection: 'row',
        gap: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        ...SHADOWS.sm,
    },
    statIconWrapper: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
    },
    statLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textTertiary,
        marginBottom: SPACING.xs,
    },
    statValue: {
        ...TYPOGRAPHY.priceLG,
    },

    // 段落
    section: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
        marginBottom: SPACING.lg,
    },

    // 訂單狀態
    statusRow: {
        flexDirection: 'row',
        gap: SPACING.lg,
    },
    statusCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statusCount: {
        ...TYPOGRAPHY.title2,
        marginTop: SPACING.sm,
    },
    statusLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textTertiary,
        marginTop: SPACING.xs,
    },

    // 排行
    rankItem: {
        marginBottom: SPACING.md,
    },
    rankLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    rankNumber: {
        width: 28,
        height: 28,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bgHover,
        marginRight: SPACING.md,
    },
    rankNumberText: {
        ...TYPOGRAPHY.captionBold,
        color: COLORS.textMuted,
    },
    rankInfo: {
        flex: 1,
    },
    rankName: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.textPrimary,
    },
    rankMeta: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textTertiary,
        marginTop: SPACING.xxs,
    },
    progressBar: {
        height: 6,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.full,
        marginLeft: 28 + SPACING.md,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: RADIUS.full,
    },

    // 分類銷售
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        paddingVertical: SPACING.xs,
    },
    categoryLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
    },
    categoryDot: {
        width: 8,
        height: 8,
        borderRadius: RADIUS.full,
        marginRight: SPACING.sm,
    },
    categoryName: {
        ...TYPOGRAPHY.subhead,
        color: COLORS.textSecondary,
    },
    categoryRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    categoryBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
    },
    categoryBarFill: {
        height: '100%',
        borderRadius: RADIUS.full,
        opacity: 0.6,
    },
    categoryValue: {
        ...TYPOGRAPHY.priceSmall,
        color: COLORS.textSecondary,
        width: 70,
        textAlign: 'right',
    },

    // 最近訂單
    orderCard: {
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    orderId: {
        ...TYPOGRAPHY.orderNumber,
        color: COLORS.textPrimary,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        gap: SPACING.xs,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: RADIUS.full,
    },
    statusText: {
        ...TYPOGRAPHY.captionBold,
    },
    orderBody: {
        marginBottom: SPACING.sm,
    },
    orderItems: {
        ...TYPOGRAPHY.subhead,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    orderDate: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
    },
    orderTotal: {
        ...TYPOGRAPHY.priceMD,
        color: COLORS.primary,
    },
});

export default AnalyticsDashboard;
