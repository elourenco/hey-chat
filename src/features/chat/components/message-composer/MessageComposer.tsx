import { horizontalScale } from '@app/theme/scaling';
import HStack from '@components/h-stack/HStack';
import Text from '@components/text/Text';
import TextInput from '@components/text-input/TextInput';
import { memo, useCallback, useMemo } from 'react';
import { Pressable } from 'react-native';
import { styles } from './styles';

type MessageComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  isSending?: boolean;
};

const MessageComposer = ({
  value,
  onChangeText,
  onSend,
  disabled = false,
  isSending = false,
}: MessageComposerProps) => {
  const isDisabled = useMemo(
    () => disabled || isSending || value.trim().length === 0,
    [disabled, isSending, value],
  );

  const handleSend = useCallback(() => {
    if (isDisabled) {
      return;
    }
    onSend();
  }, [isDisabled, onSend]);

  return (
    <HStack alignment="center" spacing={horizontalScale(12)} style={styles.container}>
      <TextInput
        value={value}
        placeholder="Digite uma mensagem"
        onChangeText={onChangeText}
        multiline
        customContainerStyle={styles.inputWrapper}
        customInputContainerStyle={styles.inputContainer}
        customInputStyle={styles.input}
      />
      <Pressable
        onPress={handleSend}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel="Enviar mensagem"
        accessibilityState={{ disabled: isDisabled, busy: isSending }}
        style={({ pressed }) => [
          styles.sendButton,
          isDisabled && styles.sendButtonDisabled,
          pressed && !isDisabled && styles.sendButtonPressed,
        ]}
      >
        <Text color="white" type="medium" size="sm">
          {isSending ? 'Enviando' : 'Enviar'}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default memo(MessageComposer);
