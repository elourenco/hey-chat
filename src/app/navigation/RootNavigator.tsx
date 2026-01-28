import OnboardingNavigator from '@features/onboarding/navigation/OnboardingNavigator';
import { NavigationContainer, type RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import { defaultStackNavigationOptions } from './options';

export type IRootNativeStackNavigator = {
  Onboarding: undefined;
  Main: undefined;
};

export type IRouteProp<T extends keyof IRootNativeStackNavigator> = RouteProp<
  IRootNativeStackNavigator,
  T
>;

const { Navigator, Screen } = createNativeStackNavigator<IRootNativeStackNavigator>();

const RootNavigator = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Navigator screenOptions={defaultStackNavigationOptions}>
        {isAuthenticated ? (
          <Screen name="Main" component={MainBottomTabNavigator} />
        ) : (
          <Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
