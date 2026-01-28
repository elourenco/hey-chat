import { Colors } from '@app/theme/colors';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import { memo } from 'react';
import { ActivityIndicator } from 'react-native';

type UsersListEmptyProps = {
  isLoading: boolean;
};

const UsersListEmpty = ({ isLoading }: UsersListEmptyProps) => {
  if (isLoading) {
    return (
      <VStack full alignment="center" justify="center" spacing={8}>
        <ActivityIndicator color={Colors.primary} />
        <Text size="sm" color="gray5">
          Carregando usuarios...
        </Text>
      </VStack>
    );
  }

  return (
    <VStack full alignment="center" justify="center" spacing={8}>
      <Text type="medium" color="gray5">
        Nenhum usuário encontrado
      </Text>
      <Text size="sm" color="gray4">
        Puxe para atualizar
      </Text>
    </VStack>
  );
};

export default memo(UsersListEmpty);
