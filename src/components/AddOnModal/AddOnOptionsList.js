import React, { memo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ADD_ON_OPTIONS } from '../../data/menuData';
import { styles } from './styles';
import AddOnOptionItem from './AddOnOptionItem';

/**
 * 加購選項列表
 */
const AddOnOptionsList = memo(({ getOptionState, onToggle }) => {
    return (
        <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {Object.entries(ADD_ON_OPTIONS).map(([category, options]) => (
                <View key={category}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {options.map(addon => {
                        const { isSelected, isDisabled } = getOptionState(addon);
                        return (
                            <AddOnOptionItem
                                key={addon.id}
                                addon={addon}
                                isSelected={isSelected}
                                isDisabled={isDisabled}
                                onToggle={onToggle}
                            />
                        );
                    })}
                </View>
            ))}
        </ScrollView>
    );
});

export default AddOnOptionsList;
