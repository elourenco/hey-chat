import { Colors } from '@app/theme/colors';
import { fontScale, horizontalScale, verticalScale } from '@app/theme/scaling';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  labelContainer: {
    flexShrink: 1,
    maxWidth: horizontalScale(200),
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: verticalScale(4),
  },
  inputContainer: {
    minHeight: verticalScale(48),
    gap: horizontalScale(8),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 0,
    paddingHorizontal: horizontalScale(8),
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  inputWithoutFocused: {
    borderColor: Colors.gray3,
  },
  input: {
    fontWeight: '400',
    fontSize: fontScale(14),
    textAlignVertical: 'center',
    color: Colors.gray9,
    flex: 1,
    flexDirection: 'row',
    zIndex: 0,
    ...Platform.select({
      android: {
        // biome-ignore lint/suspicious/noExplicitAny: Android specific property not fully typed in RN
        includeFontPadding: false as any,
        paddingVertical: 0,
      },
      ios: {
        paddingVertical: verticalScale(1),
      },
    }),
  },
  textErrorContent: {
    flexGrow: 1,
    flexDirection: 'row',
    gap: horizontalScale(8),
    alignItems: 'center',
    paddingBottom: verticalScale(12),
  },
});
