import { horizontalScale } from '@app/theme/scaling';
import type { IChatThread } from '@entities/chat';
import type { IUser } from '@entities/user';
import HStack from '@components/h-stack/HStack';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import { getInitials } from '@features/users/utils/strings';
import { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { formatChatTimestamp } from '../../utils/messages';
import { styles } from './styles';

type ChatListItemProps = {
  thread: IChatThread;
  user?: IUser;
  currentUserId?: string;
  onPress: (chatId: string) => void;
};

const ChatListItem = ({ thread, user, currentUserId, onPress }: ChatListItemProps) => {
  const displayName = user?.fullname?.trim() || user?.username || thread.participantId;
  const handle = user?.username
    ? user.username.startsWith('@')
      ? user.username
      : `@${user.username}`
    : `@${thread.participantId}`;
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const timestamp = useMemo(
    () => formatChatTimestamp(thread.lastMessageAt),
    [thread.lastMessageAt],
  );

  const lastMessagePrefix = thread.lastMessage.from === currentUserId ? 'Voce: ' : '';
  const lastMessageText = `${lastMessagePrefix}${thread.lastMessage.body}`.trim();

  const handlePress = useCallback(() => {
    onPress(thread.participantId);
  }, [onPress, thread.participantId]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.containerPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Abrir conversa com ${displayName}`}
    >
      <HStack alignment="center" justify="space-between" full>
        <HStack alignment="center" spacing={horizontalScale(12)} full>
          <View style={styles.avatar} accessibilityRole="image">
            <Text type="bold" size="sm" color="primaryDark">
              {initials}
            </Text>
          </View>
          <VStack spacing={2} full>
            <Text type="medium" numberOfLines={1}>
              {displayName}
            </Text>
            <Text size="sm" color="gray5" numberOfLines={1}>
              {handle}
            </Text>
            <Text size="sm" color="gray4" numberOfLines={1}>
              {lastMessageText}
            </Text>
          </VStack>
        </HStack>
        {timestamp ? (
          <Text size="xs" color="gray4">
            {timestamp}
          </Text>
        ) : null}
      </HStack>
    </Pressable>
  );
};

export default memo(ChatListItem);
