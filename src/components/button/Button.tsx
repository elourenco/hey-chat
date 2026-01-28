import Text from '@components/text/Text';
import { memo, useCallback } from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';

type IButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'link';
};

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
}: IButtonProps) => {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const isLink = variant === 'link';

  return (
    <Pressable
      hitSlop={16}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityRole={isLink ? 'link' : 'button'}
      accessibilityLabel={title}
      accessibilityHint={disabled ? 'Button is disabled' : undefined}
      accessibilityState={{ disabled, busy: loading }}
      style={({ pressed }) => [
        styles.buttonBase,
        isLink ? styles.buttonLink : styles.buttonSolid,
        !isLink && disabled && styles.buttonSolidDisabled,
        pressed && (isLink ? styles.buttonLinkPressed : styles.buttonSolidPressed),
      ]}
    >
      <Text
        capitalize={!isLink}
        color={disabled ? 'gray4' : isLink ? 'primary' : 'white'}
        type="medium"
        size="md"
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default memo(Button);
