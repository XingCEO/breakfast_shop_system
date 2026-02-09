import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../styles/theme';
import { styles } from './styles';

/**
 * 套餐選擇狀態指示器
 */
const ComboStatusBar = memo(({ selectedCombo, selectedDrink, selectedSides }) => {
    if (!selectedCombo) return null;

    const sidesComplete = selectedSides.length === selectedCombo.includes.side;

    return (
        <View style={styles.comboStatus}>
            <Text style={styles.comboStatusTitle}>
                <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.success} />
                {' '}已選: {selectedCombo.name}
            </Text>
            <View style={styles.comboChecklist}>
                <Text style={[
                    styles.comboCheckItem,
                    selectedDrink && styles.comboCheckDone,
                ]}>
                    {selectedDrink ? (
                        <MaterialCommunityIcons name="radiobox-marked" size={14} color={COLORS.success} />
                    ) : (
                        <MaterialCommunityIcons name="radiobox-blank" size={14} color={COLORS.textSecondary} />
                    )}
                    {' '}飲料{selectedDrink ? `: ${selectedDrink.name}` : ''}
                </Text>
                <Text style={[
                    styles.comboCheckItem,
                    sidesComplete && styles.comboCheckDone,
                ]}>
                    {sidesComplete ? (
                        <MaterialCommunityIcons name="radiobox-marked" size={14} color={COLORS.success} />
                    ) : (
                        <MaterialCommunityIcons name="radiobox-blank" size={14} color={COLORS.textSecondary} />
                    )}
                    {' '}配菜 ({selectedSides.length}/{selectedCombo.includes.side})
                </Text>
            </View>
        </View>
    );
});

export default ComboStatusBar;
