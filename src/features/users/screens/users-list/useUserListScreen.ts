import { useAppSelector } from '@app/redux/store';
import { loadUserList } from '@features/users/core/loadUserList';
import { useNavigation } from '@react-navigation/core';
import { Loggers } from '@utils/loggers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

const FALLBACK_ERROR_MESSAGE = 'Falha ao carregar usuarios. Tente novamente.';

export const useUserListScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const currentUserId = useAppSelector((state) => state.authReducer.userId);
  const users = useAppSelector((state) => state.usersReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsers = useCallback(
    async (mode: 'initial' | 'refresh' = 'initial') => {
      if (mode === 'refresh') {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const { error } = await loadUserList();
      if (error) {
        Loggers.error(error);
        toast.show(error.message || FALLBACK_ERROR_MESSAGE, { type: 'danger' });
      }

      if (mode === 'refresh') {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const onRefresh = useCallback(() => {
    if (isRefreshing || isLoading) {
      return;
    }
    void fetchUsers('refresh');
  }, [fetchUsers, isRefreshing, isLoading]);

  const handleOpenChat = useCallback(
    (userId: string) => {
      navigation.navigate('ChatDetails', { chatId: userId });
    },
    [navigation],
  );

  const visibleUsers = useMemo(() => {
    if (!currentUserId) {
      return users;
    }
    return users.filter((user) => user.id !== currentUserId);
  }, [currentUserId, users]);

  return {
    users: visibleUsers,
    isLoading,
    isRefreshing,
    onRefresh,
    handleOpenChat,
  };
};
