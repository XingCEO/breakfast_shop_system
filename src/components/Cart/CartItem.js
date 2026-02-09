import React, { useRef, useEffect, memo, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, ANIMATION, getCategoryColor } from '../../styles/theme';

/**
 * 購物車品項 V2 — 膠囊數量 + 備註 + 微動畫
 */
const CartItem = ({
    item,
    itemTotal,
    onIncrease,
    onDecrease,
    onRemove,
    onUpdateNote,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const prevQuantity = useRef(item.quantity);
    const categoryColor = getCategoryColor(item.category);
    const [showNote, setShowNote] = useState(false);

    useEffect(() => {
        if (prevQuantity.current !== item.quantity) {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.15,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 120,
                    useNativeDriver: true,
                }),
            ]).start();
            prevQuantity.current = item.quantity;
        }
    }, [item.quantity, scaleAnim]);

    return (
        <View style={styles.container}>
            {/* 左側色條 */}
            <View style={[styles.colorIndicator, { backgroundColor: categoryColor }]} />

            <View style={styles.body}>
                {/* 第一行：品名 + 價格 + 刪除 */}
                <View style={styles.topRow}>
                    <View style={styles.info}>
                        <Text style={styles.name} numberOfLines={1}>{item.emoji} {item.name}</Text>
                        {item.addOns && item.addOns.length > 0 && (
                            <Text style={styles.addOns} numberOfLines={1}>
                                + {item.addOns.map(a => a.name).join(', ')}
                            </Text>
                        )}
                    </View>

                    <Text style={[styles.price, { color: categoryColor }]}>
                        ${itemTotal}
                    </Text>

                    <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={onRemove}
                        activeOpacity={0.6}
                    >
                        <MaterialCommunityIcons name="close" size={14} color={COLORS.danger} />
                    </TouchableOpacity>
                </View>

                {/* 第二行：數量控制 + 備註 */}
                <View style={styles.bottomRow}>
                    {/* 膠囊數量控制 */}
                    <View style={styles.quantityPill}>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={onDecrease}
                            activeOpacity={0.6}
                        >
                            <MaterialCommunityIcons
                                name={item.quantity === 1 ? 'trash-can-outline' : 'minus'}
                                size={14}
                                color={item.quantity === 1 ? COLORS.danger : COLORS.textSecondary}
                            />
                        </TouchableOpacity>

                        <Animated.View style={[styles.qtyValue, { transform: [{ scale: scaleAnim }] }]}>
                            <Text style={styles.qtyText}>{item.quantity}</Text>
                        </Animated.View>

                        <TouchableOpacity
                            style={[styles.qtyBtn, styles.qtyBtnPlus, { backgroundColor: `${categoryColor}20` }]}
                            onPress={onIncrease}
                            activeOpacity={0.6}
                        >
                            <MaterialCommunityIcons name="plus" size={14} color={categoryColor} />
                        </TouchableOpacity>
                    </View>

                    {/* 備註按鈕 */}
                    <TouchableOpacity
                        style={[styles.noteBtn, item.note ? styles.noteBtnActive : null]}
                        onPress={() => setShowNote(!showNote)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name={item.note ? 'note-text' : 'note-plus-outline'}
                            size={14}
                            color={item.note ? COLORS.primary : COLORS.textMuted}
                        />
                        <Text style={[styles.noteBtnText, item.note ? { color: COLORS.primary } : null]}>
                            {item.note ? '備註' : '加備註'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* 備註輸入 */}
                {showNote && (
                    <View style={styles.noteContainer}>
                        <TextInput
                            style={styles.noteInput}
                            placeholder="例：不要蔥、少冰..."
                            placeholderTextColor={COLORS.textMuted}
                            value={item.note || ''}
                            onChangeText={(text) => onUpdateNote?.(item, text)}
                            maxLength={50}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.xl,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    colorIndicator: {
        width: 4,
        alignSelf: 'stretch',
    },
    body: {
        flex: 1,
        padding: SPACING.md,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginRight: SPACING.sm,
    },
    name: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.textPrimary,
    },
    addOns: {
        ...TYPOGRAPHY.caption2,
        color: COLORS.textTertiary,
        marginTop: SPACING.xxs,
    },
    price: {
        ...TYPOGRAPHY.priceMD,
        marginRight: SPACING.sm,
    },
    removeBtn: {
        width: 26,
        height: 26,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.dangerBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.dangerBorder,
    },

    // 第二行
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SPACING.sm,
        gap: SPACING.md,
    },
    quantityPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.full,
        padding: SPACING.xxs,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyBtnPlus: {
        // backgroundColor set dynamically
    },
    qtyValue: {
        minWidth: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyText: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.textPrimary,
    },

    // 備註
    noteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs + 1,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    noteBtnActive: {
        backgroundColor: COLORS.primarySoft,
        borderColor: COLORS.primaryGlow,
    },
    noteBtnText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
    },
    noteContainer: {
        marginTop: SPACING.sm,
    },
    noteInput: {
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        fontSize: 13,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
});

// 自訂比較函式
const arePropsEqual = (prevProps, nextProps) => {
    const prevAddOns = prevProps.item.addOns || [];
    const nextAddOns = nextProps.item.addOns || [];
    const addOnsEqual = prevAddOns.length === nextAddOns.length &&
        prevAddOns.every((a, i) => a.id === nextAddOns[i]?.id);

    return (
        prevProps.item.id === nextProps.item.id &&
        prevProps.item.quantity === nextProps.item.quantity &&
        prevProps.item.note === nextProps.item.note &&
        prevProps.itemTotal === nextProps.itemTotal &&
        addOnsEqual
    );
};

export default memo(CartItem, arePropsEqual);
