import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type BaseScreenProps = {
  children: any;
  statusBarColour?: string;
  useSafeArea?: boolean;
  noBottomPadding?: boolean;
};

export const BaseScreen = ({
  children,
  statusBarColour = '#FFFFFF',
  useSafeArea = false,
  noBottomPadding = false,
}: BaseScreenProps) => {
  return (
    <View style={styles.screen}>
      <StatusBar
        backgroundColor={statusBarColour}
        translucent
        barStyle="dark-content"></StatusBar>
      {useSafeArea ? (
        <SafeAreaView
          style={styles.screen}
          edges={
            noBottomPadding
              ? ['top', 'left', 'right']
              : ['top', 'left', 'right', 'bottom']
          }>
          {children}
        </SafeAreaView>
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
    paddingBottom: 0,
    marginBottom: 0,
  },
});
