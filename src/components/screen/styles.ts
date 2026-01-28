import { Colors } from '@app/theme/colors';
import { horizontalScale, verticalScale } from '@app/theme/scaling';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeAreaView: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
});
