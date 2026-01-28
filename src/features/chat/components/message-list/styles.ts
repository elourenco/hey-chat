import { horizontalScale, verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
  },
  contentContainer: {
    paddingVertical: verticalScale(12),
    gap: verticalScale(12),
  },
  contentContainerEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
