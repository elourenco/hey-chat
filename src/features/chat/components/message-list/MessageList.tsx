import type { IMessage } from '@entities/message';
import { memo, useCallback, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import MessageBubble from '../message-bubble/MessageBubble';
import MessageListEmpty from '../message-list-empty/MessageListEmpty';
import { styles } from './styles';

type MessageListProps = {
  data: IMessage[];
  currentUserId?: string;
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
};

const MessageList = ({
  data,
  currentUserId,
  isLoading,
  refreshing,
  onRefresh,
}: MessageListProps) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<IMessage>) => (
      <MessageBubble message={item} isOwn={item.from === currentUserId} />
    ),
    [currentUserId],
  );

  const keyExtractor = useCallback((item: IMessage) => item.id, []);

  const listEmptyComponent = useMemo(() => <MessageListEmpty isLoading={isLoading} />, [isLoading]);

  const contentContainerStyle = useMemo(
    () => [styles.contentContainer, data.length === 0 ? styles.contentContainerEmpty : undefined],
    [data.length],
  );

  return (
    <FlatList
      style={styles.list}
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

export default memo(MessageList);
