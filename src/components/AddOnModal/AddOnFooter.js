import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

/**
 * 加購 Modal 底部按鈕區
 */
const AddOnFooter = memo(({ showTotal, totalPrice, onSkip, onConfirm }) => {
    return (
        <View style={styles.footer}>
            {showTotal && (
                <Text style={styles.totalExtra}>
                    加購合計: +${totalPrice}
                </Text>
            )}
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.skipBtn}
                    onPress={onSkip}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipBtnText}>不加購</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.confirmBtn}
                    onPress={onConfirm}
                    activeOpacity={0.8}
                >
                    <Text style={styles.confirmBtnText}>確認</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default AddOnFooter;
