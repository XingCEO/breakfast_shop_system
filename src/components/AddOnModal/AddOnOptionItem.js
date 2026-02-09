import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/theme';
import { styles } from './styles';

/**
 * 單一加購選項
 */
const AddOnOptionItem = memo(({ addon, isSelected, isDisabled, onToggle }) => {
    return (
        <TouchableOpacity
            style={[
                styles.optionItem,
                isSelected && styles.optionItemSelected,
                isDisabled && styles.optionItemDisabled,
            ]}
            onPress={() => onToggle(addon)}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            <View style={styles.optionLeft}>
                <View style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                ]}>
                    {isSelected && (
                        <MaterialCommunityIcons name="check" size={14} color={COLORS.bgDark} />
                    )}
                </View>
                <View style={styles.optionTextWrap}>
                    <Text style={[
                        styles.optionName,
                        isDisabled && styles.optionNameDisabled,
                    ]}>
                        {addon.name}
                    </Text>
                    {addon.includes && (
                        <Text style={styles.optionIncludes}>
                            含 {addon.includes.drink} 飲品 + {addon.includes.side} 配菜
                        </Text>
                    )}
                </View>
            </View>
            <Text style={[
                styles.optionPrice,
                addon.price < 0 && styles.optionPriceDiscount,
            ]}>
                {addon.price >= 0 ? `+$${addon.price}` : `-$${Math.abs(addon.price)}`}
            </Text>
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.addon.id === nextProps.addon.id &&
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.isDisabled === nextProps.isDisabled
    );
});

export default AddOnOptionItem;
