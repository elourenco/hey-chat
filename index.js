import { Appearance, AppRegistry, Platform, UIManager } from 'react-native';
import { enableFreeze, enableScreens } from 'react-native-screens';
import { name as appName } from './app.json';

const configureAppearance = () => {
  Appearance.setColorScheme('light');
};

const configureScreens = () => {
  enableScreens(true);
  enableFreeze(true);
};

const configureAndroidLayoutAnimations = () => {
  if (Platform.OS !== 'android') {
    return;
  }

  UIManager.setLayoutAnimationEnabledExperimental?.(true);
};

configureAppearance();
configureScreens();
configureAndroidLayoutAnimations();

const App = require('./src/app/App').default;

AppRegistry.registerComponent(appName, () => App);
