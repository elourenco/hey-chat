import ErrorBoundary from 'react-native-error-boundary';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import RootNavigator from './navigation/RootNavigator';
import { store } from './redux/store';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary>
        <Provider store={store}>
          <KeyboardProvider>
            <RootNavigator />
          </KeyboardProvider>
        </Provider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;
