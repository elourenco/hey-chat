import Screen from '@components/screen/Screen';
import VStack from '@components/v-stack/VStack';
import type { IChatNativeStackNavigator } from '@features/chat/navigation/ChatNavigator';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/core';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import MessageComposer from '../../components/message-composer/MessageComposer';
import MessageList from '../../components/message-list/MessageList';
import { useChatDetailsScreen } from './useChatDetailsScreen';

const ChatDetailsScreen = () => {
  const {
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
  } = useChatDetailsScreen();
  const navigation = useNavigation<NativeStackNavigationProp<IChatNativeStackNavigator>>();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({ title: displayName });
  }, [displayName, navigation]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
        style={{ flex: 1 }}
      >
        <VStack full>
          <MessageList
            data={messages}
            currentUserId={currentUserId}
            isLoading={isLoading}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
          <MessageComposer
            value={messageText}
            onChangeText={setMessageText}
            onSend={handleSend}
            disabled={!currentUserId}
            isSending={isSending}
          />
        </VStack>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ChatDetailsScreen;
