import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../styles/theme';

/**
 * 標籤/徽章組件
 * 用於顯示飲食標籤、分類標籤、購物車數量等
 */
const Badge = ({
    text,
    variant = 'default', // 'default' | 'primary' | 'success' | 'warning' | 'count'
    size = 'md', // 'sm' | 'md' | 'lg'
    style,
    textStyle,
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return { container: styles.primaryBg, text: styles.primaryText };
            case 'success':
                return { container: styles.successBg, text: styles.successText };
            case 'warning':
                return { container: styles.warningBg, text: styles.warningText };
            case 'count':
                return { container: styles.countBg, text: styles.countText };
            default:
                return { container: styles.defaultBg, text: styles.defaultText };
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case 'sm':
                return { container: styles.sizeSm, text: styles.textSm };
            case 'lg':
                return { container: styles.sizeLg, text: styles.textLg };
            default:
                return { container: styles.sizeMd, text: styles.textMd };
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();

    return (
        <View style={[styles.base, variantStyle.container, sizeStyle.container, style]}>
            <Text style={[styles.textBase, variantStyle.text, sizeStyle.text, textStyle]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    },
    textBase: {
        fontWeight: '600',
    },

    // 尺寸
    sizeSm: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
    },
    sizeMd: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
    },
    sizeLg: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
    },
    textSm: {
        fontSize: 10,
    },
    textMd: {
        fontSize: 12,
    },
    textLg: {
        fontSize: 14,
    },

    // 變體 - 預設（灰色）
    defaultBg: {
        backgroundColor: COLORS.bgElevated,
    },
    defaultText: {
        color: COLORS.textSecondary,
    },

    // 變體 - 主色（橙色）
    primaryBg: {
        backgroundColor: '#fff7ed',
    },
    primaryText: {
        color: COLORS.primary,
    },

    // 變體 - 成功（綠色）
    successBg: {
        backgroundColor: COLORS.successBg,
    },
    successText: {
        color: COLORS.success,
    },

    // 變體 - 警告（黃色）
    warningBg: {
        backgroundColor: COLORS.tagBg,
    },
    warningText: {
        color: COLORS.tagText,
    },

    // 變體 - 計數（用於購物車數量）
    countBg: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
        minWidth: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.sm,
    },
    countText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13,
    },
});

export default Badge;
