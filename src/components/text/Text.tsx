import { Colors } from '@app/theme/colors';
import { fontSizes } from '@app/theme/typography';
import { useMemo } from 'react';
import type { TextProps, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

interface ITextProps extends TextProps {
  children: string;
  color?: keyof typeof Colors;
  size?: keyof typeof fontSizes;
  capitalize?: boolean;
  type?: 'regular' | 'medium' | 'bold';
}

const Text = ({
  children,
  size = 'md',
  color = 'gray9',
  capitalize = false,
  type = 'regular',
  style,
  ...props
}: ITextProps) => {
  const stylize = useMemo(() => {
    return [
      size ? { fontSize: fontSizes[size] } : undefined,
      color ? { color: Colors[color] } : undefined,
      capitalize ? { textTransform: 'capitalize' as TextStyle['textTransform'] } : undefined,
      type === 'regular'
        ? { fontWeight: '400' as TextStyle['fontWeight'] }
        : type === 'medium'
          ? { fontWeight: '500' as TextStyle['fontWeight'] }
          : { fontWeight: '700' as TextStyle['fontWeight'] },
      style,
    ];
  }, [size, color, capitalize, type, style]);
  return (
    <Animated.Text
      allowFontScaling={false}
      style={stylize}
      accessibilityRole="text"
      accessibilityLabel={children}
      {...props}
    >
      {children}
    </Animated.Text>
  );
};

export default Text;
