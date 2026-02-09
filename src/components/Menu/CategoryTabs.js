import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../../styles/theme';
import { CATEGORIES, CATEGORY_EMOJIS } from '../../data/menuData';

/**
 * 分類選擇標籤列
 */
const CategoryTabs = ({
    selectedCategory,
    onSelectCategory,
    categoryCounts = {},
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                    <TouchableOpacity
                        key={category}
                        style={[styles.tab, isActive && styles.tabActive]}
                        onPress={() => onSelectCategory(category)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.emoji}>{CATEGORY_EMOJIS[category]}</Text>
                        <Text style={[styles.text, isActive && styles.textActive]}>
                            {category}
                        </Text>
                        {categoryCounts[category] !== undefined && (
                            <View style={[styles.countBadge, isActive && styles.countBadgeActive]}>
                                <Text style={[styles.countText, isActive && styles.countTextActive]}>
                                    {categoryCounts[category]}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 60,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    content: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
        flexDirection: 'row',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        gap: SPACING.xs,
    },
    tabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        ...SHADOWS.md,
    },
    emoji: {
        fontSize: 16,
    },
    text: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    textActive: {
        color: '#fff',
    },
    countBadge: {
        backgroundColor: 'rgba(0,0,0,0.08)',
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        marginLeft: 2,
    },
    countBadgeActive: {
        backgroundColor: 'rgba(255,255,255,0.25)',
    },
    countText: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.textSecondary,
    },
    countTextActive: {
        color: '#fff',
    },
});

export default CategoryTabs;
