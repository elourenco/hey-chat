import HStack from '@components/h-stack/HStack';
import Text from '@components/text/Text';
import type { IMessage } from '@entities/message';
import { memo, useMemo } from 'react';
import { View } from 'react-native';
import { formatMessageTimestamp } from '../../utils/messages';
import { styles } from './styles';

type MessageBubbleProps = {
  message: IMessage;
  isOwn: boolean;
};

const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  const timestamp = useMemo(
    () => formatMessageTimestamp(message.updatedAt ?? message.createdAt),
    [message.createdAt, message.updatedAt],
  );

  return (
    <HStack justify={isOwn ? 'trailing' : 'leading'} full>
      <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
        <Text size="sm" color={isOwn ? 'white' : 'gray9'}>
          {message.body}
        </Text>
        {timestamp ? (
          <Text size="xs" color={isOwn ? 'whiteOpacity80' : 'gray4'} style={styles.timestamp}>
            {timestamp}
          </Text>
        ) : null}
      </View>
    </HStack>
  );
};

export default memo(MessageBubble);
