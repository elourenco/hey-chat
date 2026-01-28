import { Colors } from '@app/theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
  },
  buttonSolid: {
    height: 56,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  buttonSolidPressed: {
    opacity: 0.75,
  },
  buttonSolidDisabled: {
    backgroundColor: Colors.gray3,
  },
  buttonLink: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: Colors.transparent,
  },
  buttonLinkPressed: {
    opacity: 0.6,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
