import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { ANIMATION, SHADOWS, RADIUS, COLORS } from '../../styles/theme';

/**
 * 帶有按壓縮放動畫的通用按鈕組件 V2
 */
const AnimatedButton = ({
    children,
    onPress,
    onLongPress,
    style,
    activeOpacity = 0.9,
    pressScale = ANIMATION.press.toValue,
    disabled = false,
    variant = 'default', // 'default' | 'primary' | 'success' | 'danger' | 'ghost'
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleAnim, {
            toValue: pressScale,
            duration: ANIMATION.press.duration,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: ANIMATION.pressRelease.duration,
            useNativeDriver: true,
        }).start();
    };

    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return [styles.primary, SHADOWS.md];
            case 'success':
                return [styles.success, SHADOWS.md];
            case 'danger':
                return styles.danger;
            case 'ghost':
                return styles.ghost;
            default:
                return styles.default;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
        >
            <Animated.View
                style={[
                    styles.base,
                    getVariantStyle(),
                    { transform: [{ scale: scaleAnim }] },
                    disabled && styles.disabled,
                    style,
                ]}
            >
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RADIUS.md,
    },
    default: {
        backgroundColor: COLORS.bgElevated,
    },
    primary: {
        backgroundColor: COLORS.primary,
    },
    success: {
        backgroundColor: COLORS.success,
    },
    danger: {
        backgroundColor: COLORS.danger,
    },
    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    disabled: {
        opacity: 0.5,
    },
});

export default AnimatedButton;
