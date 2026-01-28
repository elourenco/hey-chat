import ChatListScreen from '@features/chat/screens/chat-list/ChatListScreen';
import UsersListScreen from '@features/users/screens/users-list/UsersListScreen';
import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

export type IBottomTabNavigator = {
  Chat: undefined;
  Users: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<IBottomTabNavigator>();

const defaultBottomTabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  freezeOnBlur: true,
};

const MainBottomTabNavigator = () => {
  return (
    <Navigator screenOptions={defaultBottomTabOptions}>
      <Screen name="Chat" component={ChatListScreen} />
      <Screen name="Users" component={UsersListScreen} />
    </Navigator>
  );
};

export default MainBottomTabNavigator;
