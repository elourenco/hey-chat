import { verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: verticalScale(12),
  },
  contentContainerEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
