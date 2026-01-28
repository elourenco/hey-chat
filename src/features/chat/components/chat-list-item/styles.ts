import { Colors } from '@app/theme/colors';
import { horizontalScale, verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  containerPressed: {
    backgroundColor: Colors.gray1Opacity90,
  },
  avatar: {
    width: horizontalScale(44),
    height: horizontalScale(44),
    borderRadius: horizontalScale(22),
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
