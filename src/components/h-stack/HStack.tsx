import { AlignmentMap, JustifyMap } from '@utils/components';
import React, { type ComponentProps } from 'react';
import type { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { styles } from './styles';

type HStackAlignment = 'center' | 'trailing' | 'leading';
type HStackJustify =
  | 'leading'
  | 'center'
  | 'trailing'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface IHStackProps extends ComponentProps<typeof Animated.View> {
  children: React.ReactNode | React.ReactNode[];
  spacing?: number;
  backgroundColor?: string;
  alignment?: HStackAlignment;
  justify?: HStackJustify;
  full?: boolean;
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
  padding?: ViewStyle['padding'];
  margin?: ViewStyle['margin'];
  borderRadius?: ViewStyle['borderRadius'];
  paddingHorizontal?: ViewStyle['paddingHorizontal'];
  paddingVertical?: ViewStyle['paddingVertical'];
  marginHorizontal?: ViewStyle['marginHorizontal'];
  marginVertical?: ViewStyle['marginVertical'];
  borderWidth?: ViewStyle['borderWidth'];
  borderColor?: ViewStyle['borderColor'];
  overflow?: ViewStyle['overflow'];
}

const HStack = ({
  children,
  backgroundColor,
  alignment,
  justify,
  spacing,
  full,
  style,
  height,
  width,
  margin,
  padding,
  borderRadius,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginVertical,
  borderColor,
  borderWidth,
  overflow,
  ...props
}: IHStackProps) => {
  const spacingValidated = React.useMemo(() => {
    if (spacing && spacing < 0) {
      return 0;
    }
    return spacing;
  }, [spacing]);

  const getContainerStyle = React.useMemo(
    () => [
      styles.container,
      backgroundColor !== undefined ? { backgroundColor } : undefined,
      alignment ? AlignmentMap.hstack?.[alignment] : undefined,
      justify ? JustifyMap.hstack?.[justify] : undefined,
      full ? { flex: 1 } : undefined,
      height ? { height } : undefined,
      width ? { width } : undefined,
      padding ? { padding } : undefined,
      margin ? { margin } : undefined,
      { gap: spacingValidated },
      paddingHorizontal ? { paddingHorizontal } : undefined,
      paddingVertical ? { paddingVertical } : undefined,
      marginHorizontal ? { marginHorizontal } : undefined,
      marginVertical ? { marginVertical } : undefined,
      borderColor !== undefined ? { borderColor } : undefined,
      borderWidth !== undefined ? { borderWidth } : undefined,
      borderRadius !== undefined ? { borderRadius } : undefined,
      overflow ? { overflow } : undefined,
      style,
    ],
    [
      style,
      backgroundColor,
      alignment,
      spacingValidated,
      full,
      justify,
      height,
      width,
      padding,
      margin,
      borderRadius,
      paddingHorizontal,
      paddingVertical,
      marginHorizontal,
      marginVertical,
      borderColor,
      borderWidth,
      overflow,
    ],
  );

  return (
    <Animated.View style={getContainerStyle} {...props}>
      {children}
    </Animated.View>
  );
};

HStack.displayName = 'HStack';
export default HStack;
