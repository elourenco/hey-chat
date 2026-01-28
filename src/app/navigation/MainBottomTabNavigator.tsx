import { Colors } from '@app/theme/colors';
import Icon from '@assets/Icon';
import Text from '@components/text/Text';
import type { IChatNativeStackNavigator } from '@features/chat/navigation/ChatNavigator';
import ChatNavigator from '@features/chat/navigation/ChatNavigator';
import { signOut } from '@features/onboarding/core/signOut';
import UsersListScreen from '@features/users/screens/users-list/UsersListScreen';
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { HeaderButton } from '@react-navigation/elements';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type IBottomTabNavigator = {
  Chat: NavigatorScreenParams<IChatNativeStackNavigator> | undefined;
  Users: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<IBottomTabNavigator>();

const defaultBottomTabOptions: BottomTabNavigationOptions = {
  headerShown: true,
  freezeOnBlur: true,
};

const TAB_ICONS = {
  Chat: 'MessageCircle',
  Users: 'Users',
} as const;

const MainBottomTabNavigator = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        ...defaultBottomTabOptions,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray4,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name={TAB_ICONS[route.name]} color={color} size={size} />
        ),
        headerRight() {
          return (
            <HeaderButton onPress={signOut}>
              <Text type="regular" size="sm">
                Sair
              </Text>
            </HeaderButton>
          );
        },
      })}
    >
      <Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          title: 'Chats',
        }}
      />
      <Screen
        name="Users"
        component={UsersListScreen}
        options={{
          title: 'Usuários',
        }}
      />
    </Navigator>
  );
};

export default MainBottomTabNavigator;
