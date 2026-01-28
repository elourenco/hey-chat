import { socketService } from '@app/network/socket/socketService';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import Icon from '@assets/Icon';
import Text from '@components/text/Text';
import ChatDetailsScreen from '@features/chat/screens/chat-details/ChatDetailsScreen';
import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';
import { setAuth } from '@features/onboarding/slices/authSlices';
import { HeaderButton } from '@react-navigation/elements';
import { NavigationContainer, type RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { decodeJwtPayload } from '@utils/jwt';
import { useEffect } from 'react';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import { defaultStackNavigationOptions } from './options';

export type IRootNativeStackNavigator = {
  Onboarding: undefined;
  Main: undefined;
  ChatDetails: { chatId: string };
};

export type IRouteProp<T extends keyof IRootNativeStackNavigator> = RouteProp<
  IRootNativeStackNavigator,
  T
>;

const { Navigator, Screen, Group } = createNativeStackNavigator<IRootNativeStackNavigator>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token, userId } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (isAuthenticated && token && !userId) {
      const resolvedUserId = decodeJwtPayload(token)?.sub;
      if (resolvedUserId) {
        dispatch(setAuth({ token, userId: resolvedUserId, isAuthenticated }));
      }
    }
  }, [dispatch, isAuthenticated, token, userId]);

  useEffect(() => {
    const resolvedUserId = userId ?? decodeJwtPayload(token)?.sub;
    if (isAuthenticated && token && resolvedUserId) {
      socketService.connect(resolvedUserId);
      return;
    }
    socketService.disconnect();
  }, [isAuthenticated, token, userId]);

  return (
    <NavigationContainer>
      <Navigator screenOptions={defaultStackNavigationOptions}>
        {isAuthenticated ? (
          <>
            <Screen name="Main" component={MainBottomTabNavigator} />
            <Group screenOptions={{ presentation: 'fullScreenModal' }}>
              <Screen
                name="ChatDetails"
                component={ChatDetailsScreen}
                options={({ navigation }) => ({
                  headerShown: true,
                  headerBackVisible: false,
                  headerRight() {
                    return (
                      <HeaderButton onPress={() => navigation.goBack()}>
                        <Icon name="X" size={24} />
                      </HeaderButton>
                    );
                  },
                })}
              />
            </Group>
          </>
        ) : (
          <Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
