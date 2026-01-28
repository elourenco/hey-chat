import { Colors } from '@app/theme/colors';
import { horizontalScale, verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    flexShrink: 1,
    minHeight: verticalScale(44),
  },
  input: {
    minHeight: verticalScale(36),
    maxHeight: verticalScale(120),
  },
  sendButton: {
    minHeight: verticalScale(44),
    paddingHorizontal: horizontalScale(14),
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.gray3,
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
});
