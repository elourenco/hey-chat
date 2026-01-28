import type { IUser } from '@entities/user';
import { memo, useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import UserListItem from '../user-list-item/UserListItem';
import UsersListEmpty from '../users-list-empty/UsersListEmpty';
import { styles } from './styles';

type UsersListProps = {
  data: IUser[];
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onPressUser: (userId: string) => void;
};

const UsersList = ({ data, isLoading, refreshing, onRefresh, onPressUser }: UsersListProps) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IUser>) => (
      <UserListItem user={item} onPress={onPressUser} />
    ),
    [onPressUser],
  );

  const keyExtractor = useCallback((item: IUser) => item.id, []);

  const listEmptyComponent = useMemo(() => <UsersListEmpty isLoading={isLoading} />, [isLoading]);

  const contentContainerStyle = useMemo(
    () => [styles.contentContainer, data.length === 0 ? styles.contentContainerEmpty : undefined],
    [data.length],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      refreshing={refreshing}
      onRefresh={onRefresh}
      updateCellsBatchingPeriod={50}
      showsVerticalScrollIndicator={false}
      accessibilityRole="list"
    />
  );
};

export default memo(UsersList);
