import React, { memo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS, ANIMATION, getCategoryColor, TAG_COLORS } from '../../styles/theme';
import { usePreferences } from '../../contexts/PreferencesContext';

/**
 * 菜單卡片 V3 — 等高統一 + 毛玻璃 + 分類色帶 + 微動畫
 * 所有卡片固定高度，確保網格整齊一致
 */
const CARD_HEIGHT = 185;

const MenuCard = ({
    item,
    isFavorite = false,
    justAdded = false,
    onPress,
    onLongPress,
    width,
}) => {
    const { toggleFavorite } = usePreferences();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const heartAnim = useRef(new Animated.Value(1)).current;

    const categoryColor = getCategoryColor(item.category);

    useEffect(() => {
        if (justAdded) {
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [justAdded, pulseAnim]);

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: ANIMATION.press.toValue,
            duration: ANIMATION.press.duration,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: ANIMATION.pressRelease.toValue,
            duration: ANIMATION.pressRelease.duration,
            useNativeDriver: true,
        }).start();
    };

    const handleToggleFavorite = () => {
        Animated.sequence([
            Animated.timing(heartAnim, {
                toValue: 1.4,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(heartAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
        toggleFavorite(item);
    };

    return (
        <Animated.View style={[
            { width, transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] },
        ]}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onPress(item)}
                onLongPress={() => onLongPress?.(item)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
            >
                {/* 頂部分類色帶 */}
                <View style={[styles.colorStrip, { backgroundColor: categoryColor }]} />

                {/* 卡片內容 — 固定高度 flex 佈局 */}
                <View style={styles.content}>
                    {/* 第一行：Emoji + 收藏 */}
                    <View style={styles.topRow}>
                        <View style={[styles.emojiContainer, { backgroundColor: `${categoryColor}15` }]}>
                            <Text style={styles.emoji}>{item.emoji}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleToggleFavorite}
                            style={styles.favoriteBtn}
                            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                        >
                            <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                                <MaterialCommunityIcons
                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                    size={18}
                                    color={isFavorite ? COLORS.rose : COLORS.textMuted}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>

                    {/* 品名 — 固定兩行高度 */}
                    <Text style={styles.name} numberOfLines={2}>
                        {item.name}
                    </Text>

                    {/* 標籤 — 固定一行高度（無標籤時也佔位） */}
                    <View style={styles.tagsRow}>
                        {item.tags && item.tags.length > 0
                            ? item.tags.slice(0, 2).map((tag) => {
                                const tagStyle = TAG_COLORS[tag] || {};
                                return (
                                    <View
                                        key={tag}
                                        style={[styles.tag, { backgroundColor: tagStyle.bg, borderColor: tagStyle.border || 'transparent' }]}
                                    >
                                        <Text style={[styles.tagText, { color: tagStyle.text }]}>
                                            {tag}
                                        </Text>
                                    </View>
                                );
                            })
                            : null}
                    </View>

                    {/* 價格 — 底部對齊 */}
                    <View style={styles.priceRow}>
                        <Text style={styles.priceSign}>$</Text>
                        <Text style={[styles.price, { color: categoryColor }]}>
                            {item.price}
                        </Text>
                    </View>
                </View>

                {/* 已加入提示 */}
                {justAdded && (
                    <View style={[styles.addedBadge, { backgroundColor: categoryColor }]}>
                        <MaterialCommunityIcons name="check" size={12} color="#000" />
                    </View>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: CARD_HEIGHT,
        backgroundColor: COLORS.bgCard,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        margin: SPACING.xs,
        ...SHADOWS.sm,
    },
    colorStrip: {
        height: 3,
        width: '100%',
    },
    content: {
        flex: 1,
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    emojiContainer: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 20,
    },
    favoriteBtn: {
        padding: SPACING.xxs,
    },
    name: {
        ...TYPOGRAPHY.subheadBold,
        color: COLORS.textPrimary,
        height: 40,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: SPACING.xs,
        height: 22,
        alignItems: 'center',
    },
    tag: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xxs,
        borderRadius: RADIUS.sm,
        borderWidth: 1,
    },
    tagText: {
        ...TYPOGRAPHY.caption2,
        fontWeight: '500',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    priceSign: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textTertiary,
        marginRight: 2,
    },
    price: {
        ...TYPOGRAPHY.priceMD,
    },
    addedBadge: {
        position: 'absolute',
        top: SPACING.md + 3,
        right: SPACING.md,
        width: 22,
        height: 22,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const arePropsEqual = (prevProps, nextProps) => {
    const prevAddOns = prevProps.item?.addOns || [];
    const nextAddOns = nextProps.item?.addOns || [];
    const addOnsEqual = prevAddOns.length === nextAddOns.length &&
        prevAddOns.every((a, i) => a.id === nextAddOns[i]?.id);

    return (
        prevProps.item.id === nextProps.item.id &&
        prevProps.item.price === nextProps.item.price &&
        prevProps.isFavorite === nextProps.isFavorite &&
        prevProps.justAdded === nextProps.justAdded &&
        prevProps.width === nextProps.width &&
        addOnsEqual
    );
};

export default memo(MenuCard, arePropsEqual);
