import { Colors } from '@app/theme/colors';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import { memo } from 'react';
import { ActivityIndicator } from 'react-native';

type ChatListEmptyProps = {
  isLoading: boolean;
};

const ChatListEmpty = ({ isLoading }: ChatListEmptyProps) => {
  if (isLoading) {
    return (
      <VStack full alignment="center" justify="center" spacing={8}>
        <ActivityIndicator color={Colors.primary} />
        <Text size="sm" color="gray5">
          Carregando conversas...
        </Text>
      </VStack>
    );
  }

  return (
    <VStack full alignment="center" justify="center" spacing={8}>
      <Text type="medium" color="gray5">
        Nenhuma conversa encontrada
      </Text>
      <Text size="sm" color="gray4">
        Puxe para atualizar
      </Text>
    </VStack>
  );
};

export default memo(ChatListEmpty);
