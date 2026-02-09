import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/theme';
import { styles } from './styles';

/**
 * 加購 Modal Header
 */
const AddOnHeader = memo(({ item, onClose }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>加購選項</Text>
                <Text style={styles.subtitle}>{item.name} — ${item.price}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.textMuted} />
            </TouchableOpacity>
        </View>
    );
});

export default AddOnHeader;
