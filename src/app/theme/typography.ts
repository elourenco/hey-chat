import { fontScale } from './scaling';

export const fontSizes = {
  xs: fontScale(12),
  sm: fontScale(14),
  md: fontScale(16),
  lg: fontScale(18),
  xl: fontScale(24),
  '2xl': fontScale(32),
  '3xl': fontScale(40),
} satisfies Record<string, number>;
