import type { IRootNativeStackNavigator } from '@app/navigation/RootNavigator';
import { useAppSelector } from '@app/redux/store';
import { loadMessagesByUser } from '@features/chat/core/loadMessagesByUser';
import { buildChatThreads } from '@features/chat/utils/threads';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Loggers } from '@utils/loggers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

const FALLBACK_ERROR_MESSAGE = 'Falha ao carregar conversas. Tente novamente.';

export const useChatListScreen = () => {
  const toast = useToast();
  const { navigate } = useNavigation<NativeStackNavigationProp<IRootNativeStackNavigator>>();

  const currentUserId = useAppSelector((state) => state.authReducer.userId);
  const messages = useAppSelector((state) => state.messagesReducer);
  const users = useAppSelector((state) => state.usersReducer);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const chatThreads = useMemo(
    () => buildChatThreads(messages, currentUserId),
    [messages, currentUserId],
  );

  const usersById = useMemo(() => {
    return new Map(users.map((user) => [user.id, user]));
  }, [users]);

  const chats = useMemo(
    () =>
      chatThreads.map((thread) => ({
        ...thread,
        user: usersById.get(thread.participantId),
      })),
    [chatThreads, usersById],
  );

  const fetchMessages = useCallback(
    async (mode: 'initial' | 'refresh' = 'initial') => {
      if (!currentUserId) {
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      if (mode === 'refresh') {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const { error } = await loadMessagesByUser({ userId: currentUserId });
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
    [currentUserId, toast],
  );

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  const onRefresh = useCallback(() => {
    if (isRefreshing || isLoading) {
      return;
    }
    void fetchMessages('refresh');
  }, [fetchMessages, isRefreshing, isLoading]);

  const handleOpenChat = useCallback(
    (chatId: string) => {
      navigate('ChatDetails', { chatId });
    },
    [navigate],
  );

  return {
    chats,
    currentUserId,
    isLoading,
    isRefreshing,
    onRefresh,
    handleOpenChat,
  };
};
