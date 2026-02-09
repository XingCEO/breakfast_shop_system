import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, TAG_COLORS } from '../../styles/theme';
import { ALL_TAGS } from '../../data/menuData';

/**
 * 搜尋與標籤篩選列 V2 — 毛玻璃風格 + focus 狀態
 */
const SearchFilterBar = ({
    searchQuery,
    onSearchChange,
    selectedTags,
    onToggleTag,
    resultCount,
}) => {
    // 標籤配色
    const getTagStyle = (tag) => {
        return TAG_COLORS[tag] || { bg: COLORS.bgHover, text: COLORS.textSecondary, border: COLORS.border };
    };

    const activeTagCount = selectedTags.length;

    return (
        <View style={styles.container}>
            {/* 搜尋輸入區 */}
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={20}
                        color={COLORS.textMuted}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="搜尋品項名稱..."
                        placeholderTextColor={COLORS.textMuted}
                        value={searchQuery}
                        onChangeText={onSearchChange}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearBtn}
                            onPress={() => onSearchChange('')}
                        >
                            <MaterialCommunityIcons name="close-circle" size={18} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* 結果數量 */}
                <View style={styles.resultBadge}>
                    <Text style={styles.resultText}>{resultCount}</Text>
                    <Text style={styles.resultLabel}>項</Text>
                </View>
            </View>

            {/* 篩選標籤 */}
            <View style={styles.tagsRow}>
                <View style={styles.filterLabelWrapper}>
                    <MaterialCommunityIcons name="filter-variant" size={14} color={COLORS.textMuted} />
                    {activeTagCount > 0 && (
                        <View style={styles.activeCountBadge}>
                            <Text style={styles.activeCountText}>{activeTagCount}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.tagsList}>
                    {ALL_TAGS.map((tag) => {
                        const isActive = selectedTags.includes(tag);
                        const tagStyle = getTagStyle(tag);
                        return (
                            <TouchableOpacity
                                key={tag}
                                style={[
                                    styles.tagBtn,
                                    isActive && {
                                        backgroundColor: tagStyle.bg,
                                        borderColor: tagStyle.border || tagStyle.text,
                                    },
                                ]}
                                onPress={() => onToggleTag(tag)}
                                activeOpacity={0.7}
                            >
                                <Text style={[
                                    styles.tagBtnText,
                                    isActive && { color: tagStyle.text },
                                ]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* 清除篩選 */}
                {activeTagCount > 0 && (
                    <TouchableOpacity
                        style={styles.clearFilter}
                        onPress={() => selectedTags.forEach(t => onToggleTag(t))}
                    >
                        <Text style={styles.clearFilterText}>清除</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgElevated,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgDark,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 40,
    },
    searchIcon: {
        marginRight: SPACING.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textPrimary,
        paddingVertical: 0,
    },
    clearBtn: {
        padding: SPACING.xs,
    },
    resultBadge: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginLeft: SPACING.md,
        backgroundColor: COLORS.bgCard,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    resultText: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.primary,
    },
    resultLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
        marginLeft: SPACING.xxs,
    },

    // 標籤列
    tagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterLabelWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.md,
    },
    activeCountBadge: {
        backgroundColor: COLORS.primary,
        width: 16,
        height: 16,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SPACING.xs,
    },
    activeCountText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#000',
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        flex: 1,
    },
    tagBtn: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs + 1,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgCard,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tagBtnText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textTertiary,
        fontWeight: '500',
    },
    clearFilter: {
        marginLeft: SPACING.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
    },
    clearFilterText: {
        ...TYPOGRAPHY.captionBold,
        color: COLORS.primary,
    },
});

export default SearchFilterBar;
