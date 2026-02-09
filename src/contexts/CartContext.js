import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { calculateItemTotal, cartItemKey, matchCartItem } from '../utils/helpers';

// ==================== Context ====================
const CartContext = createContext(null);

// ==================== Provider ====================
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // 加入購物車（帶加購選項）
    const addItemToCart = useCallback((item, addOns = []) => {
        const tempItem = { ...item, addOns };
        setCart((prev) => {
            const existing = prev.find((ci) => matchCartItem(ci, tempItem));
            if (existing) {
                return prev.map((ci) =>
                    matchCartItem(ci, tempItem)
                        ? { ...ci, quantity: ci.quantity + 1 }
                        : ci
                );
            }
            return [...prev, { ...item, quantity: 1, addOns, note: '' }];
        });
    }, []);

    // 增加數量
    const increaseQuantity = useCallback((cartItem) => {
        setCart((prev) =>
            prev.map((ci) =>
                matchCartItem(ci, cartItem)
                    ? { ...ci, quantity: ci.quantity + 1 }
                    : ci
            )
        );
    }, []);

    // 減少數量（數量為 1 時移除）
    const decreaseQuantity = useCallback((cartItem) => {
        setCart((prev) => {
            const target = prev.find((ci) => matchCartItem(ci, cartItem));
            if (!target) return prev;
            if (target.quantity === 1) {
                return prev.filter((ci) => !matchCartItem(ci, cartItem));
            }
            return prev.map((ci) =>
                matchCartItem(ci, cartItem)
                    ? { ...ci, quantity: ci.quantity - 1 }
                    : ci
            );
        });
    }, []);

    // 移除品項
    const removeFromCart = useCallback((cartItem) => {
        setCart((prev) => prev.filter((ci) => !matchCartItem(ci, cartItem)));
    }, []);

    // 更新品項備註
    const updateItemNote = useCallback((cartItem, note) => {
        setCart((prev) =>
            prev.map((ci) =>
                matchCartItem(ci, cartItem)
                    ? { ...ci, note }
                    : ci
            )
        );
    }, []);

    // 清空購物車（帶確認）
    const clearCart = useCallback(() => {
        Alert.alert('確認清空', '確定要清空購物車嗎？', [
            { text: '取消', style: 'cancel' },
            { text: '確定', style: 'destructive', onPress: () => setCart([]) },
        ]);
    }, []);

    // 強制清空（不帶確認，用於訂單送出後）
    const resetCart = useCallback(() => {
        setCart([]);
    }, []);

    // 總數量
    const totalQuantity = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    // 總價
    const totalPrice = useMemo(
        () => cart.reduce((sum, item) => sum + calculateItemTotal(item), 0),
        [cart]
    );

    const value = useMemo(
        () => ({
            cart,
            addItemToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            updateItemNote,
            clearCart,
            resetCart,
            totalQuantity,
            totalPrice,
        }),
        [
            cart,
            addItemToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            updateItemNote,
            clearCart,
            resetCart,
            totalQuantity,
            totalPrice,
        ]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ==================== Hook ====================
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
