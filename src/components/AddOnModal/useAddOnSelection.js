import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';

/**
 * 加購選擇邏輯 Hook
 * 管理套餐、飲品、配菜、一般加購的選擇狀態
 */
export const useAddOnSelection = (visible) => {
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedSides, setSelectedSides] = useState([]);

    // 每次 Modal 開啟時重置所有狀態
    useEffect(() => {
        if (visible) {
            setSelectedAddOns([]);
            setSelectedCombo(null);
            setSelectedDrink(null);
            setSelectedSides([]);
        }
    }, [visible]);

    // 切換加購選項
    const toggleAddOn = useCallback((addon) => {
        // 套餐選擇
        if (addon.type === 'combo') {
            if (selectedCombo?.id === addon.id) {
                setSelectedCombo(null);
                setSelectedDrink(null);
                setSelectedSides([]);
            } else {
                setSelectedCombo(addon);
                setSelectedDrink(null);
                setSelectedSides([]);
            }
            return;
        }

        // 飲品選擇（需先選套餐）
        if (addon.comboItem && addon.id.startsWith('drink_')) {
            if (!selectedCombo) {
                Alert.alert('提示', '請先選擇套餐方案');
                return;
            }
            setSelectedDrink(addon);
            return;
        }

        // 配菜選擇（需先選套餐）
        if (addon.comboItem && addon.id.startsWith('side_')) {
            if (!selectedCombo) {
                Alert.alert('提示', '請先選擇套餐方案');
                return;
            }
            const maxSides = selectedCombo.includes.side;
            if (selectedSides.find(s => s.id === addon.id)) {
                setSelectedSides(selectedSides.filter(s => s.id !== addon.id));
            } else {
                if (selectedSides.length >= maxSides) {
                    Alert.alert('提示', `此套餐最多選擇 ${maxSides} 項配菜`);
                    return;
                }
                setSelectedSides([...selectedSides, addon]);
            }
            return;
        }

        // 一般加購
        if (selectedAddOns.find(a => a.id === addon.id)) {
            setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
        } else {
            setSelectedAddOns([...selectedAddOns, addon]);
        }
    }, [selectedCombo, selectedDrink, selectedSides, selectedAddOns]);

    // 計算加購合計金額
    const comboExtraPrice = useMemo(() => {
        if (!selectedCombo) return 0;
        let extra = selectedCombo.price;
        if (selectedDrink) extra += selectedDrink.price;
        selectedSides.forEach(s => { extra += s.price; });
        selectedAddOns.forEach(a => { extra += a.price; });
        return extra;
    }, [selectedCombo, selectedDrink, selectedSides, selectedAddOns]);

    // 驗證並取得最終加購列表
    const validateAndGetFinalAddOns = useCallback(() => {
        let finalAddOns = [...selectedAddOns];

        if (selectedCombo) {
            if (!selectedDrink) {
                Alert.alert('提示', '請選擇一項飲品');
                return null;
            }
            if (selectedSides.length !== selectedCombo.includes.side) {
                Alert.alert('提示', `請選擇 ${selectedCombo.includes.side} 項配菜`);
                return null;
            }
            finalAddOns = [
                selectedCombo,
                selectedDrink,
                ...selectedSides,
                ...selectedAddOns,
            ];
        }

        return finalAddOns;
    }, [selectedCombo, selectedDrink, selectedSides, selectedAddOns]);

    // 判斷選項狀態
    const getOptionState = useCallback((addon) => {
        let isSelected = false;
        let isDisabled = false;

        if (addon.type === 'combo') {
            isSelected = selectedCombo?.id === addon.id;
        } else if (addon.id.startsWith('drink_')) {
            isSelected = selectedDrink?.id === addon.id;
            isDisabled = !selectedCombo;
        } else if (addon.id.startsWith('side_')) {
            isSelected = !!selectedSides.find(s => s.id === addon.id);
            isDisabled = !selectedCombo;
        } else {
            isSelected = !!selectedAddOns.find(a => a.id === addon.id);
        }

        return { isSelected, isDisabled };
    }, [selectedCombo, selectedDrink, selectedSides, selectedAddOns]);

    return {
        selectedCombo,
        selectedDrink,
        selectedSides,
        selectedAddOns,
        toggleAddOn,
        comboExtraPrice,
        validateAndGetFinalAddOns,
        getOptionState,
    };
};
