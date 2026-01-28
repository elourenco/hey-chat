import type { IRouteProp } from '@app/navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import { loadMessagesByUser } from '@features/chat/core/loadMessagesByUser';
import { sendMessage } from '@features/chat/core/sendMessage';
import { clearActiveChatId, setActiveChatId } from '@features/chat/slices/chatUiSlice';
import { selectMessagesByChatId } from '@features/chat/slices/messagesSlices';
import type { IUser } from '@entities/user';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Loggers } from '@utils/loggers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

const FALLBACK_MESSAGES_ERROR = 'Falha ao carregar mensagens. Tente novamente.';
const FALLBACK_SEND_ERROR = 'Falha ao enviar mensagem. Tente novamente.';

export const useChatDetailsScreen = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const route = useRoute<IRouteProp<'ChatDetails'>>();
  const { chatId } = route.params;

  const currentUserId = useAppSelector((state) => state.authReducer.userId);
  const users = useAppSelector((state) => state.usersReducer);
  const messages = useAppSelector((state) =>
    selectMessagesByChatId(state.messagesReducer, currentUserId, chatId),
  );

  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const chatUser = useMemo<IUser | undefined>(
    () => users.find((user) => user.id === chatId),
    [users, chatId],
  );

  const displayName = useMemo(
    () => chatUser?.fullname?.trim() || chatUser?.username || chatId,
    [chatUser, chatId],
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
        toast.show(error.message || FALLBACK_MESSAGES_ERROR, { type: 'danger' });
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

  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveChatId(chatId));
      return () => {
        dispatch(clearActiveChatId());
      };
    }, [chatId, dispatch]),
  );

  const onRefresh = useCallback(() => {
    if (isRefreshing || isLoading) {
      return;
    }
    void fetchMessages('refresh');
  }, [fetchMessages, isRefreshing, isLoading]);

  const handleSend = useCallback(async () => {
    const trimmed = messageText.trim();
    if (!currentUserId || !trimmed || isSending) {
      return;
    }

    setIsSending(true);
    const { error } = await sendMessage({ from: currentUserId, to: chatId, body: trimmed });
    if (error) {
      Loggers.error(error);
      toast.show(error.message || FALLBACK_SEND_ERROR, { type: 'danger' });
    } else {
      setMessageText('');
    }
    setIsSending(false);
  }, [chatId, currentUserId, isSending, messageText, toast]);

  return {
    chatId,
    displayName,
    messages,
    currentUserId,
    messageText,
    isLoading,
    isRefreshing,
    isSending,
    onRefresh,
    setMessageText,
    handleSend,
  };
};
