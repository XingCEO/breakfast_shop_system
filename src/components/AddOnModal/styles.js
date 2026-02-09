import { StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS } from '../../styles/theme';

export const styles = StyleSheet.create({
    // Overlay & Container
    overlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        maxWidth: 540,
        maxHeight: '85%',
        backgroundColor: COLORS.bgCard,
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.glassBorder,
        ...SHADOWS.xl,
    },

    // 頂部把手
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.textMuted,
        borderRadius: RADIUS.full,
        alignSelf: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: SPACING.xl,
        paddingBottom: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.bgElevated,
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textPrimary,
    },
    subtitle: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.bgHover,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // 套餐狀態
    comboStatus: {
        backgroundColor: COLORS.successBg,
        padding: SPACING.lg,
        marginHorizontal: SPACING.xl,
        marginTop: SPACING.lg,
        borderRadius: RADIUS.lg,
        borderWidth: 1,
        borderColor: COLORS.successBorder,
    },
    comboStatusTitle: {
        ...TYPOGRAPHY.bodySemibold,
        color: COLORS.success,
        marginBottom: SPACING.sm,
    },
    comboChecklist: {
        gap: SPACING.xs,
        marginLeft: SPACING.xs,
    },
    comboCheckItem: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },
    comboCheckDone: {
        color: COLORS.success,
    },

    // 選項列表
    optionsList: {
        maxHeight: 380,
        paddingHorizontal: SPACING.xl,
    },
    categoryTitle: {
        ...TYPOGRAPHY.label,
        color: COLORS.textMuted,
        marginTop: SPACING.xl,
        marginBottom: SPACING.md,
    },

    // 選項項目
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.lg,
        backgroundColor: COLORS.bgElevated,
        borderRadius: RADIUS.lg,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    optionItemSelected: {
        backgroundColor: COLORS.primarySoft,
        borderColor: COLORS.borderFocus,
    },
    optionItemDisabled: {
        opacity: 0.4,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: RADIUS.sm,
        borderWidth: 2,
        borderColor: COLORS.borderLight,
        marginRight: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    optionTextWrap: {
        flex: 1,
    },
    optionName: {
        ...TYPOGRAPHY.bodySemibold,
        color: COLORS.textPrimary,
    },
    optionNameDisabled: {
        color: COLORS.textMuted,
    },
    optionIncludes: {
        ...TYPOGRAPHY.captionSmall,
        color: COLORS.textMuted,
        marginTop: SPACING.xxs,
    },
    optionPrice: {
        ...TYPOGRAPHY.priceMD,
        color: COLORS.primary,
        marginLeft: SPACING.md,
    },
    optionPriceDiscount: {
        color: COLORS.success,
    },

    // Footer
    footer: {
        padding: SPACING.xl,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.bgElevated,
    },
    totalExtra: {
        ...TYPOGRAPHY.bodySemibold,
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        padding: SPACING.md,
        backgroundColor: COLORS.primarySoft,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.borderFocus,
    },
    buttons: {
        flexDirection: 'row',
        gap: SPACING.md,
    },
    skipBtn: {
        flex: 1,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.bgHover,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    skipBtnText: {
        ...TYPOGRAPHY.button,
        color: COLORS.textSecondary,
    },
    confirmBtn: {
        flex: 1,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        ...SHADOWS.md,
    },
    confirmBtnText: {
        ...TYPOGRAPHY.button,
        color: '#000',
        fontWeight: '700',
    },
});
