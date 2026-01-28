import type { IRootNativeStackNavigator } from './RootNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IRootNativeStackNavigator {}
  }
}
