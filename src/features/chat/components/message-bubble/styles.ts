import { Colors } from '@app/theme/colors';
import { horizontalScale, verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    borderRadius: 16,
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
  },
  bubbleOwn: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 6,
  },
  bubbleOther: {
    backgroundColor: Colors.gray1,
    borderTopLeftRadius: 6,
  },
  timestamp: {
    marginTop: verticalScale(4),
    alignSelf: 'flex-end',
  },
});
