import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {grey_background} from '../index/theme';

type BaseScreenProps = {
  children: any;
  statusBarColour?: string;
  useSafeArea?: boolean;
  noBottomPadding?: boolean;
  backgroundColor?: string;
};

export const BaseScreen = ({
  children,
  statusBarColour = '#FFFFFF',
  useSafeArea = false,
  noBottomPadding = false,
  backgroundColor = grey_background,
}: BaseScreenProps) => {
  return (
    <View style={styles(backgroundColor).screen}>
      <StatusBar
        backgroundColor={statusBarColour}
        translucent
        barStyle="dark-content"></StatusBar>
      {useSafeArea ? (
        <SafeAreaView
          style={styles(backgroundColor).screen}
          edges={
            noBottomPadding
              ? ['top', 'left', 'right']
              : ['top', 'left', 'right', 'bottom']
          }>
          {children}
        </SafeAreaView>
      ) : (
        <View style={styles(backgroundColor).screen}>{children}</View>
      )}
    </View>
  );
};

const styles = (backgroundColor: string) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: backgroundColor,
      paddingBottom: 0,
      marginBottom: 0,
    },
  });
