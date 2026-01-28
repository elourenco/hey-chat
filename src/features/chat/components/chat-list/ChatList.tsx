import type { IChatThread } from '@entities/chat';
import type { IUser } from '@entities/user';
import { memo, useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import ChatListEmpty from '../chat-list-empty/ChatListEmpty';
import ChatListItem from '../chat-list-item/ChatListItem';
import { styles } from './styles';

type ChatListItemData = IChatThread & { user?: IUser };

type ChatListProps = {
  data: ChatListItemData[];
  currentUserId?: string;
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onPressChat: (chatId: string) => void;
};

const ChatList = ({
  data,
  currentUserId,
  isLoading,
  refreshing,
  onRefresh,
  onPressChat,
}: ChatListProps) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ChatListItemData>) => (
      <ChatListItem
        thread={item}
        user={item.user}
        currentUserId={currentUserId}
        onPress={onPressChat}
      />
    ),
    [currentUserId, onPressChat],
  );

  const keyExtractor = useCallback((item: ChatListItemData) => item.id, []);

  const listEmptyComponent = useMemo(() => <ChatListEmpty isLoading={isLoading} />, [isLoading]);

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

export default memo(ChatList);
