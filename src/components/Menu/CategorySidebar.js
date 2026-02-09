import React, { memo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, CATEGORY_ICONS, getCategoryColor } from '../../styles/theme';
import { CATEGORIES } from '../../data/menuData';

/**
 * 分類側邊欄 V2 — 毛玻璃 + 漸層指示器
 */
const CategorySidebar = ({
    selectedCategory,
    onSelectCategory,
    categoryCounts = {},
}) => {
    return (
        <View style={styles.container}>
            {/* 標題區 */}
            <View style={styles.header}>
                <Text style={styles.title}>菜單</Text>
                <Text style={styles.subtitle}>MENU</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category;
                    const count = categoryCounts[category] || 0;
                    const iconName = CATEGORY_ICONS[category] || 'food';
                    const categoryColor = category === '全部' ? COLORS.primary : getCategoryColor(category);

                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.item, isActive && styles.itemActive]}
                            onPress={() => onSelectCategory(category)}
                            activeOpacity={0.7}
                        >
                            {/* 選中指示器 — 圓點 */}
                            {isActive && (
                                <View style={[styles.activeIndicator, { backgroundColor: categoryColor }]} />
                            )}

                            {/* 圖示容器 */}
                            <View style={[
                                styles.iconWrapper,
                                isActive && { backgroundColor: `${categoryColor}18` },
                            ]}>
                                <MaterialCommunityIcons
                                    name={iconName}
                                    size={20}
                                    color={isActive ? categoryColor : COLORS.textTertiary}
                                />
                            </View>

                            {/* 文字 */}
                            <View style={styles.textWrapper}>
                                <Text
                                    style={[styles.name, isActive && { color: COLORS.textPrimary, fontWeight: '600' }]}
                                    numberOfLines={1}
                                >
                                    {category}
                                </Text>
                            </View>

                            {/* 計數 Badge */}
                            <View style={[
                                styles.countBadge,
                                isActive && { backgroundColor: `${categoryColor}25`, borderColor: `${categoryColor}40` },
                            ]}>
                                <Text style={[
                                    styles.countText,
                                    isActive && { color: categoryColor },
                                ]}>
                                    {count}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 220,
        backgroundColor: COLORS.bgElevated,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
    header: {
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    title: {
        ...TYPOGRAPHY.title2,
        color: COLORS.textPrimary,
    },
    subtitle: {
        ...TYPOGRAPHY.captionSmall,
        color: COLORS.textMuted,
        marginTop: SPACING.xxs,
        letterSpacing: 2,
    },
    list: {
        paddingVertical: SPACING.md,
        paddingBottom: SPACING.xxxl,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm + 2,
        paddingHorizontal: SPACING.lg,
        marginHorizontal: SPACING.sm,
        marginBottom: SPACING.xxs,
        borderRadius: RADIUS.lg,
        position: 'relative',
    },
    itemActive: {
        backgroundColor: COLORS.glassBg,
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
    },
    activeIndicator: {
        position: 'absolute',
        left: -SPACING.sm,
        width: 6,
        height: 6,
        borderRadius: RADIUS.full,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
    },
    textWrapper: {
        flex: 1,
    },
    name: {
        ...TYPOGRAPHY.subhead,
        color: COLORS.textSecondary,
    },
    countBadge: {
        minWidth: 28,
        height: 22,
        backgroundColor: COLORS.bgHover,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.sm,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    countText: {
        ...TYPOGRAPHY.caption2,
        color: COLORS.textTertiary,
        fontWeight: '600',
    },
});

export default memo(CategorySidebar);
