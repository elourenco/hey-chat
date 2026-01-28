import Screen from '@components/screen/Screen';
import VStack from '@components/v-stack/VStack';
import ChatList from '../../components/chat-list/ChatList';
import { useChatListScreen } from './useChatListScreen';

const ChatListScreen = () => {
  const { chats, currentUserId, isLoading, isRefreshing, onRefresh, handleOpenChat } =
    useChatListScreen();

  return (
    <Screen>
      <VStack full>
        <ChatList
          data={chats}
          currentUserId={currentUserId}
          isLoading={isLoading}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          onPressChat={handleOpenChat}
        />
      </VStack>
    </Screen>
  );
};

export default ChatListScreen;
