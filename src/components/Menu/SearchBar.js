import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../styles/theme';

/**
 * 搜尋列組件
 */
const SearchBar = ({ value, onChangeText, placeholder = '搜尋品項名稱或分類...' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>🔍</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textMuted}
                value={value}
                onChangeText={onChangeText}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn}>
                    <Text style={styles.clearText}>✕</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgElevated,
        margin: SPACING.md,
        marginBottom: 0,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.lg,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    icon: {
        fontSize: 16,
        marginRight: SPACING.sm,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: 14,
        color: COLORS.text,
    },
    clearBtn: {
        padding: SPACING.sm,
    },
    clearText: {
        fontSize: 18,
        color: COLORS.textMuted,
    },
});

export default SearchBar;
