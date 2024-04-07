import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type BaseScreenProps = {
  children: any;
  statusBarColour?: string;
};

//TODO: status bar colour
export const BaseScreen = ({
  children,
  statusBarColour = '#FFFFFF',
}: BaseScreenProps) => {
  const insets = useSafeAreaInsets();
  const statusBarHeightAndroid = StatusBar.currentHeight + 14;

  const STATUSBAR_HEIGHT =
    Platform.OS === 'ios' ? insets.top : statusBarHeightAndroid;
  return (
    <View style={styles.screen}>
      <View style={{height: STATUSBAR_HEIGHT}}>
        <StatusBar
          backgroundColor={statusBarColour}
          translucent
          barStyle="dark-content"></StatusBar>
      </View>
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
