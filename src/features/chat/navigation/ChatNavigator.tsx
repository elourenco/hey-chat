import { defaultStackNavigationOptions } from '@app/navigation/options';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import ChatListScreen from '../screens/chat-list/ChatListScreen';

export type IChatNativeStackNavigator = {
  ChatList: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<IChatNativeStackNavigator>();

export type IChatRouteProp<T extends keyof IChatNativeStackNavigator> = RouteProp<
  IChatNativeStackNavigator,
  T
>;

const chatStackNavigationOptions: NativeStackNavigationOptions = {
  ...defaultStackNavigationOptions,
};

const ChatNavigator = () => {
  return (
    <Navigator screenOptions={chatStackNavigationOptions}>
      <Screen name="ChatList" component={ChatListScreen} />
    </Navigator>
  );
};

export default ChatNavigator;
