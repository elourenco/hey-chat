import Screen from '@components/screen/Screen';
import VStack from '@components/v-stack/VStack';
import UsersList from '../../components/users-list/UsersList';
import { useUserListScreen } from './useUserListScreen';

const UsersListScreen = () => {
  const { users, isLoading, isRefreshing, onRefresh, handleOpenChat } = useUserListScreen();

  return (
    <Screen>
      <VStack full>
        <UsersList
          data={users}
          isLoading={isLoading}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onPressUser={handleOpenChat}
        />
      </VStack>
    </Screen>
  );
};

export default UsersListScreen;
