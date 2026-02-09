import React, { useCallback } from 'react';
import { View, Modal } from 'react-native';
import { styles } from './styles';
import { useAddOnSelection } from './useAddOnSelection';
import AddOnHeader from './AddOnHeader';
import ComboStatusBar from './ComboStatusBar';
import AddOnOptionsList from './AddOnOptionsList';
import AddOnFooter from './AddOnFooter';

/**
 * 加購選項 Modal V2 — 底部彈出式
 */
const AddOnModal = ({ visible, item, onConfirm, onSkip, onClose }) => {
    const {
        selectedCombo,
        selectedDrink,
        selectedSides,
        toggleAddOn,
        comboExtraPrice,
        validateAndGetFinalAddOns,
        getOptionState,
    } = useAddOnSelection(visible);

    // 確認加購
    const handleConfirm = useCallback(() => {
        const finalAddOns = validateAndGetFinalAddOns();
        if (finalAddOns !== null) {
            onConfirm(item, finalAddOns);
        }
    }, [validateAndGetFinalAddOns, onConfirm, item]);

    // 跳過加購
    const handleSkip = useCallback(() => {
        onSkip(item);
    }, [onSkip, item]);

    if (!item) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* 把手 */}
                    <View style={styles.handleBar} />

                    <AddOnHeader item={item} onClose={onClose} />

                    <ComboStatusBar
                        selectedCombo={selectedCombo}
                        selectedDrink={selectedDrink}
                        selectedSides={selectedSides}
                    />

                    <AddOnOptionsList
                        getOptionState={getOptionState}
                        onToggle={toggleAddOn}
                    />

                    <AddOnFooter
                        showTotal={!!selectedCombo}
                        totalPrice={comboExtraPrice}
                        onSkip={handleSkip}
                        onConfirm={handleConfirm}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default AddOnModal;
