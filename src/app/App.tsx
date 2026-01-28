import ErrorBoundary from 'react-native-error-boundary';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import { useLocalNotifications } from './notifications/useLocalNotifications';
import { store } from './redux/store';

const App = () => {
  useLocalNotifications();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary>
        <Provider store={store}>
          <KeyboardProvider>
            <ToastProvider>
              <RootNavigator />
            </ToastProvider>
          </KeyboardProvider>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
