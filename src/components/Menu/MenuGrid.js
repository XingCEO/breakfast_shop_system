import React, { useMemo, useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, CATEGORY_ICONS, getCategoryColor } from '../../styles/theme';
import { MENU_ITEMS, CATEGORIES, ADDON_ELIGIBLE_CATEGORIES } from '../../data/menuData';
import { useCart } from '../../contexts/CartContext';
import { usePreferences } from '../../contexts/PreferencesContext';
import CategorySidebar from './CategorySidebar';
import MenuCard from './MenuCard';
import SearchFilterBar from './SearchFilterBar';

/**
 * 專業級菜單區塊 V2 — 側邊分類 + FlatList 虛擬化網格
 */
const MenuGrid = ({ onOpenAddOnModal }) => {
    const { addItemToCart } = useCart();
    const { isFavorite } = usePreferences();
    const { width: screenWidth } = useWindowDimensions();

    const [selectedCategory, setSelectedCategory] = useState('全部');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [justAddedId, setJustAddedId] = useState(null);

    // 篩選邏輯
    const filteredItems = useMemo(() => {
        let items = MENU_ITEMS;
        if (selectedCategory !== '全部') {
            items = items.filter((item) => item.category === selectedCategory);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            items = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q)
            );
        }
        if (selectedTags.length > 0) {
            items = items.filter((item) =>
                selectedTags.some((tag) => item.tags?.includes(tag))
            );
        }
        return items;
    }, [selectedCategory, searchQuery, selectedTags]);

    // 分類計數
    const categoryCounts = useMemo(() => {
        const counts = {};
        let baseItems = MENU_ITEMS;
        // 套用搜尋和標籤篩選到計數
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            baseItems = baseItems.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q)
            );
        }
        if (selectedTags.length > 0) {
            baseItems = baseItems.filter((item) =>
                selectedTags.some((tag) => item.tags?.includes(tag))
            );
        }
        counts['全部'] = baseItems.length;
        CATEGORIES.slice(1).forEach((cat) => {
            counts[cat] = baseItems.filter((item) => item.category === cat).length;
        });
        return counts;
    }, [searchQuery, selectedTags]);

    // 列數計算 — 響應式（固定最小寬度 160px，所有卡片等寬）
    const sidebarWidth = 220;
    const gridPadding = SPACING.sm * 2; // grid contentContainerStyle padding
    const availableWidth = screenWidth * 0.72 - sidebarWidth - gridPadding;
    const numColumns = Math.max(2, Math.floor(availableWidth / 170));
    const cardWidth = Math.floor(availableWidth / numColumns);

    // 標籤切換
    const handleToggleTag = useCallback((tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    }, []);

    // 品項點擊
    const handleItemPress = useCallback((item) => {
        if (ADDON_ELIGIBLE_CATEGORIES.includes(item.category)) {
            onOpenAddOnModal(item);
        } else {
            addItemToCart(item, []);
            setJustAddedId(item.id);
            setTimeout(() => setJustAddedId(null), 800);
        }
    }, [onOpenAddOnModal, addItemToCart]);

    // 補滿最後一列的佔位資料
    const dataWithPlaceholders = useMemo(() => {
        const remainder = filteredItems.length % numColumns;
        if (remainder === 0) return filteredItems;
        const placeholders = Array.from(
            { length: numColumns - remainder },
            (_, i) => ({ id: `__placeholder_${i}`, _isPlaceholder: true })
        );
        return [...filteredItems, ...placeholders];
    }, [filteredItems, numColumns]);

    // 渲染品項卡片
    const renderItem = useCallback(({ item }) => {
        if (item._isPlaceholder) {
            return <View style={{ width: cardWidth, margin: SPACING.xs }} />;
        }
        return (
            <MenuCard
                item={item}
                isFavorite={isFavorite(item.id)}
                justAdded={justAddedId === item.id}
                onPress={handleItemPress}
                onLongPress={() => { }}
                width={cardWidth}
            />
        );
    }, [isFavorite, justAddedId, handleItemPress, cardWidth]);

    const keyExtractor = useCallback((item) => item.id, []);

    return (
        <View style={styles.container}>
            {/* 左側分類 */}
            <CategorySidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
            />

            {/* 右側品項 */}
            <View style={styles.menuContent}>
                {/* 搜尋 + 篩選列 */}
                <SearchFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedTags={selectedTags}
                    onToggleTag={handleToggleTag}
                    resultCount={filteredItems.length}
                />

                {/* 品項網格 */}
                {filteredItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons
                            name="magnify-close"
                            size={48}
                            color={COLORS.textMuted}
                        />
                        <Text style={styles.emptyTitle}>找不到品項</Text>
                        <Text style={styles.emptyText}>
                            試試其他關鍵字或篩選條件
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={dataWithPlaceholders}
                        numColumns={numColumns}
                        key={numColumns}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={12}
                        windowSize={5}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    menuContent: {
        flex: 1,
        backgroundColor: COLORS.bgDark,
    },
    grid: {
        padding: SPACING.sm,
        paddingBottom: SPACING.huge,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: SPACING.huge,
    },
    emptyTitle: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textSecondary,
        marginTop: SPACING.lg,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        color: COLORS.textMuted,
        marginTop: SPACING.sm,
    },
});

export default MenuGrid;
