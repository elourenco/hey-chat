import { defaultStackNavigationOptions } from '@app/navigation/options';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import SignInScreen from '../screens/sign-in/SignInScreen';
import SignUpScreen from '../screens/sign-up/SignUpScreen';

export type IOnboardingNativeStackNavigator = {
  SignIn: undefined;
  SignUp: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<IOnboardingNativeStackNavigator>();

export type IOnboardingRouteProp<T extends keyof IOnboardingNativeStackNavigator> = RouteProp<
  IOnboardingNativeStackNavigator,
  T
>;

const onboardingStackNavigationOptions: NativeStackNavigationOptions = {
  ...defaultStackNavigationOptions,
};

const OnboardingNavigator = () => {
  return (
    <Navigator screenOptions={onboardingStackNavigationOptions}>
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
    </Navigator>
  );
};

export default OnboardingNavigator;
