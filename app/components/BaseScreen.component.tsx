import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type BaseScreenProps = {
  children: any;
  statusBarColour?: string;
  useSafeArea?: boolean;
};

export const BaseScreen = ({
  children,
  statusBarColour = '#FFFFFF',
  useSafeArea = false,
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
      {useSafeArea ? (
        <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
      ) : (
        <View style={styles.screen}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
