import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { Alert } from 'react-native';
import { calculateItemTotal } from '../utils/helpers';

// ==================== Context ====================
const OrderContext = createContext(null);

/**
 * 產生可讀的訂單編號，如 #A001, #A002, ...
 * 使用遞增序號，前綴字母循環 A-Z
 */
const formatOrderId = (counter) => {
    const letter = String.fromCharCode(65 + ((counter - 1) % 26));
    const num = String(counter).padStart(3, '0');
    return `#${letter}${num}`;
};

// ==================== Provider ====================
export const OrderProvider = ({ children }) => {
    const [orderHistory, setOrderHistory] = useState([]);

    // 使用 useRef 管理訂單計數器（避免模組級可變狀態）
    const orderCounterRef = useRef(0);

    // 送出訂單（不再彈 Alert，由 CartPanel UI 控制流程）
    const submitOrder = useCallback((cart, totalPrice, onSuccess) => {
        if (cart.length === 0) return null;

        orderCounterRef.current += 1;
        const orderId = formatOrderId(orderCounterRef.current);
        const order = {
            id: Date.now(),
            orderId,
            items: [...cart],
            total: totalPrice,
            date: new Date().toLocaleString('zh-TW'),
            status: 'pending',
        };
        setOrderHistory((prev) => [...prev, order]);
        onSuccess?.(orderId);
        return orderId;
    }, []);

    // 更新訂單狀態（pending → preparing → completed）
    const updateOrderStatus = useCallback((orderId, newStatus) => {
        setOrderHistory((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    }, []);

    // 統計：總銷售額
    const totalRevenue = useMemo(
        () => orderHistory.reduce((sum, o) => sum + o.total, 0),
        [orderHistory]
    );

    // 統計：訂單數量
    const totalOrders = orderHistory.length;

    // 統計：平均客單價
    const averageOrderValue = useMemo(
        () => (totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0),
        [totalRevenue, totalOrders]
    );

    // 統計：熱賣商品 Top 10
    const topProducts = useMemo(() => {
        const salesMap = {};
        orderHistory.forEach((order) => {
            order.items.forEach((item) => {
                const key = `${item.id}|${(item.addOns || []).map((a) => a.id).sort().join(',')}`;
                if (salesMap[key]) {
                    salesMap[key].quantity += item.quantity;
                    salesMap[key].revenue += calculateItemTotal(item);
                } else {
                    salesMap[key] = {
                        ...item,
                        quantity: item.quantity,
                        revenue: calculateItemTotal(item),
                    };
                }
            });
        });
        return Object.values(salesMap)
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 10);
    }, [orderHistory]);

    // 統計：分類銷售
    const categorySales = useMemo(() => {
        const categoryMap = {};
        orderHistory.forEach((order) => {
            order.items.forEach((item) => {
                if (categoryMap[item.category]) {
                    categoryMap[item.category].revenue += calculateItemTotal(item);
                    categoryMap[item.category].quantity += item.quantity;
                } else {
                    categoryMap[item.category] = {
                        category: item.category,
                        revenue: calculateItemTotal(item),
                        quantity: item.quantity,
                    };
                }
            });
        });
        return Object.values(categoryMap).sort((a, b) => b.revenue - a.revenue);
    }, [orderHistory]);

    // 最近訂單（倒序前 5 筆）
    const recentOrders = useMemo(
        () => [...orderHistory].reverse().slice(0, 5),
        [orderHistory]
    );

    // 最近常點品項（去重 Top 8）
    const recentItems = useMemo(() => {
        const itemMap = {};
        [...orderHistory].reverse().forEach((order) => {
            order.items.forEach((item) => {
                if (!itemMap[item.id]) {
                    itemMap[item.id] = { ...item, orderCount: 1 };
                } else {
                    itemMap[item.id].orderCount += 1;
                }
            });
        });
        return Object.values(itemMap)
            .sort((a, b) => b.orderCount - a.orderCount)
            .slice(0, 8);
    }, [orderHistory]);

    // 各狀態訂單數量
    const orderStatusCounts = useMemo(() => {
        const counts = { pending: 0, preparing: 0, completed: 0 };
        orderHistory.forEach((o) => {
            if (counts[o.status] !== undefined) {
                counts[o.status] += 1;
            }
        });
        return counts;
    }, [orderHistory]);

    const value = useMemo(
        () => ({
            orderHistory,
            submitOrder,
            updateOrderStatus,
            totalRevenue,
            totalOrders,
            averageOrderValue,
            topProducts,
            categorySales,
            recentOrders,
            recentItems,
            orderStatusCounts,
        }),
        [
            orderHistory,
            submitOrder,
            updateOrderStatus,
            totalRevenue,
            totalOrders,
            averageOrderValue,
            topProducts,
            categorySales,
            recentOrders,
            recentItems,
            orderStatusCounts,
        ]
    );

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

// ==================== Hook ====================
export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

export default OrderContext;
