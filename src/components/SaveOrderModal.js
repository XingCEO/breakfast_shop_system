import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from '../styles/theme';

/**
 * 儲存訂單 Modal V2 — 底部彈出 + 毛玻璃風格
 */
const SaveOrderModal = ({ visible, onSave, onClose }) => {
  const [orderName, setOrderName] = useState('');

  const handleSave = () => {
    if (orderName.trim()) {
      onSave(orderName.trim());
      setOrderName('');
    }
  };

  const handleClose = () => {
    setOrderName('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* 把手 */}
          <View style={styles.handleBar} />

          {/* 圖標 */}
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="content-save-outline" size={24} color={COLORS.secondary} />
          </View>

          <Text style={styles.title}>儲存訂單</Text>
          <Text style={styles.subtitle}>
            為此訂單命名，方便下次快速載入
          </Text>

          <TextInput
            style={styles.input}
            placeholder="輸入訂單名稱（例如：我的最愛）"
            placeholderTextColor={COLORS.textMuted}
            value={orderName}
            onChangeText={setOrderName}
            autoFocus
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <Text style={styles.cancelBtnText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, !orderName.trim() && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!orderName.trim()}
            >
              <MaterialCommunityIcons name="check" size={18} color="#000" />
              <Text style={styles.saveBtnText}>儲存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    padding: SPACING.xxl,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    ...SHADOWS.xl,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.textMuted,
    borderRadius: RADIUS.full,
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondaryGlow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.bgElevated,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bgHover,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelBtnText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    ...TYPOGRAPHY.button,
    color: '#000',
    fontWeight: '700',
  },
});

export default SaveOrderModal;
