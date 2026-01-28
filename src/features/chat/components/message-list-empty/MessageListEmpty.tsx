import { Colors } from '@app/theme/colors';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import { memo } from 'react';
import { ActivityIndicator } from 'react-native';

type MessageListEmptyProps = {
  isLoading: boolean;
};

const MessageListEmpty = ({ isLoading }: MessageListEmptyProps) => {
  if (isLoading) {
    return (
      <VStack full alignment="center" justify="center" spacing={8}>
        <ActivityIndicator color={Colors.primary} />
        <Text size="sm" color="gray5">
          Carregando mensagens...
        </Text>
      </VStack>
    );
  }

  return (
    <VStack full alignment="center" justify="center" spacing={8}>
      <Text type="medium" color="gray5">
        Nenhuma mensagem ainda
      </Text>
      <Text size="sm" color="gray4">
        Envie sua primeira mensagem
      </Text>
    </VStack>
  );
};

export default memo(MessageListEmpty);
