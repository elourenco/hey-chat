import { horizontalScale } from '@app/theme/scaling';
import HStack from '@components/h-stack/HStack';
import Text from '@components/text/Text';
import VStack from '@components/v-stack/VStack';
import { getInitials } from '@features/users/utils/strings';
import type { IUser } from '@entities/user';
import { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './styles';

type UserListItemProps = {
  user: IUser;
  onPress: (userId: string) => void;
};

const UserListItem = ({ user, onPress }: UserListItemProps) => {
  const displayName = user.fullname?.trim() || user.username;
  const handle = user.username.startsWith('@') ? user.username : `@${user.username}`;
  const statusLabel = user.online ? 'Online' : 'Offline';

  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const handlePress = useCallback(() => onPress(user.id), [onPress, user.id]);

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
          </VStack>
        </HStack>
        <HStack alignment="center" spacing={horizontalScale(6)}>
          <View
            style={[
              styles.statusDot,
              user.online ? styles.statusDotOnline : styles.statusDotOffline,
            ]}
          />
          <Text size="sm" color={user.online ? 'textGreen' : 'gray4'}>
            {statusLabel}
          </Text>
        </HStack>
      </HStack>
    </Pressable>
  );
};

export default memo(UserListItem);
