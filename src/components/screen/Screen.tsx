import { Colors } from '@app/theme/colors';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface ScreenProps {
  children: React.ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={[]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} translucent />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
