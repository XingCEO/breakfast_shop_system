import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

// ==================== Context ====================
const PreferencesContext = createContext(null);

// ==================== Provider ====================
export const PreferencesProvider = ({ children }) => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [savedOrders, setSavedOrders] = useState([]);

    // 使用 Set 快取收藏 ID，查詢複雜度從 O(n) 降為 O(1)
    const favoriteIds = useMemo(
        () => new Set(favoriteItems.map(fav => fav.id)),
        [favoriteItems]
    );

    // 切換收藏
    const toggleFavorite = useCallback((item) => {
        setFavoriteItems((prev) => {
            const isFav = prev.some((fav) => fav.id === item.id);
            if (isFav) {
                return prev.filter((fav) => fav.id !== item.id);
            }
            return [...prev, item];
        });
    }, []);

    // 檢查是否為收藏（O(1) 查詢）
    const isFavorite = useCallback(
        (itemId) => favoriteIds.has(itemId),
        [favoriteIds]
    );

    // 儲存當前訂單
    const saveOrder = useCallback((orderName, items) => {
        const newOrder = {
            id: Date.now(),
            name: orderName,
            items: [...items],
        };
        setSavedOrders((prev) => [...prev, newOrder]);
        Alert.alert('儲存成功', `訂單「${orderName}」已儲存！`);
    }, []);

    // 刪除已儲存訂單
    const deleteSavedOrder = useCallback((orderId) => {
        Alert.alert('確認刪除', '確定要刪除此常用訂單嗎？', [
            { text: '取消', style: 'cancel' },
            {
                text: '刪除',
                style: 'destructive',
                onPress: () => {
                    setSavedOrders((prev) => prev.filter((o) => o.id !== orderId));
                },
            },
        ]);
    }, []);

    const value = useMemo(
        () => ({
            favoriteItems,
            savedOrders,
            toggleFavorite,
            isFavorite,
            saveOrder,
            deleteSavedOrder,
        }),
        [favoriteItems, savedOrders, toggleFavorite, isFavorite, saveOrder, deleteSavedOrder]
    );

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
};

// ==================== Hook ====================
export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferencesProvider');
    }
    return context;
};

export default PreferencesContext;
