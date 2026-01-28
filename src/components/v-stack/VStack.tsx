import { AlignmentMap, JustifyMap } from '@utils/components';
import React, { type ComponentProps } from 'react';
import type { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { styles } from './styles';

type VStackAlignment = 'leading' | 'center' | 'trailing';
type VStackJustify =
  | 'leading'
  | 'center'
  | 'trailing'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface IVStackProps extends ComponentProps<typeof Animated.View> {
  children?: React.ReactNode | React.ReactNode[];
  spacing?: number;
  backgroundColor?: string;
  alignment?: VStackAlignment;
  justify?: VStackJustify;
  full?: boolean;
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
  padding?: ViewStyle['padding'];
  paddingHorizontal?: ViewStyle['paddingHorizontal'];
  paddingVertical?: ViewStyle['paddingVertical'];
  margin?: ViewStyle['margin'];
  marginHorizontal?: ViewStyle['marginHorizontal'];
  marginVertical?: ViewStyle['marginVertical'];
  borderWidth?: ViewStyle['borderWidth'];
  borderRadius?: ViewStyle['borderRadius'];
  borderColor?: ViewStyle['borderColor'];
  overflow?: ViewStyle['overflow'];
}

const VStack = ({
  children,
  style,
  spacing,
  alignment,
  justify,
  full,
  backgroundColor,
  height,
  width,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  borderColor,
  borderWidth,
  borderRadius,
  overflow,
  ...props
}: IVStackProps) => {
  const spacingValidated = React.useMemo(() => {
    if (spacing && spacing < 0) {
      return 0;
    }
    return spacing;
  }, [spacing]);

  const stylize = React.useMemo(
    () => [
      styles.container,
      backgroundColor !== undefined ? { backgroundColor } : undefined,
      alignment ? AlignmentMap.vstack?.[alignment] : undefined,
      justify ? JustifyMap.vstack?.[justify] : undefined,
      full ? { flex: 1 } : undefined,
      height ? { height } : undefined,
      width ? { width } : undefined,
      padding ? { padding } : undefined,
      paddingHorizontal ? { paddingHorizontal } : undefined,
      paddingVertical ? { paddingVertical } : undefined,
      margin ? { margin } : undefined,
      marginHorizontal ? { marginHorizontal } : undefined,
      marginVertical ? { marginVertical } : undefined,
      borderColor !== undefined ? { borderColor } : undefined,
      borderWidth !== undefined ? { borderWidth } : undefined,
      borderRadius !== undefined ? { borderRadius } : undefined,
      spacingValidated ? { gap: spacingValidated } : undefined,
      overflow ? { overflow } : undefined,
      style,
    ],
    [
      overflow,
      backgroundColor,
      alignment,
      justify,
      spacingValidated,
      full,
      style,
      height,
      width,
      padding,
      paddingHorizontal,
      paddingVertical,
      margin,
      marginHorizontal,
      marginVertical,
      borderColor,
      borderWidth,
      borderRadius,
    ],
  );

  return (
    <Animated.View style={stylize} {...props}>
      {children}
    </Animated.View>
  );
};

VStack.displayName = 'VStack';
export default VStack;
