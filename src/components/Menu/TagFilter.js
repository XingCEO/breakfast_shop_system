import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../styles/theme';
import { ALL_TAGS } from '../../data/menuData';

/**
 * 飲食標籤篩選列
 */
const TagFilter = ({ selectedTags, onToggleTag }) => {
    if (ALL_TAGS.length === 0) return null;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            {ALL_TAGS.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                    <TouchableOpacity
                        key={tag}
                        style={[styles.tag, isActive && styles.tagActive]}
                        onPress={() => onToggleTag(tag)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.text, isActive && styles.textActive]}>
                            {tag}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 48,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    content: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
        flexDirection: 'row',
    },
    tag: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgElevated,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    tagActive: {
        backgroundColor: COLORS.tagBg,
        borderColor: COLORS.tagText,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    textActive: {
        color: COLORS.tagText,
    },
});

export default TagFilter;
