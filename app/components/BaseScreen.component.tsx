import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {grey_background} from '../index/theme';

type BaseScreenProps = {
  children: any;
  statusBarColour?: string;
  noBottomPadding?: boolean;
  backgroundColor?: string;
  noStatusBar: boolean;
};

export const BaseScreen = ({
  children,
  statusBarColour = '#FFFFFF',
  noBottomPadding = false,
  backgroundColor = grey_background,
  noStatusBar = true,
}: BaseScreenProps) => {
  const insets = useSafeAreaInsets();
  const statusBarHeightAndroid = StatusBar.currentHeight;

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? insets.top : statusBarHeightAndroid;
  return (
    <View style={{flex: 1, padding: 0, margin: 0}}>
      {!noStatusBar && (
        <View
          style={{height: STATUS_BAR_HEIGHT, backgroundColor: statusBarColour}}>
          <StatusBar
            backgroundColor={statusBarColour}
            translucent
            barStyle="dark-content"></StatusBar>
        </View>
      )}
      {/* {useSafeArea ? ( */}
      {/* <SafeAreaView
        style={styles(backgroundColor).screen}
        edges={
          noBottomPadding
            ? ['top', 'left', 'right']
            : ['top', 'left', 'right', 'bottom']
        }>
        {children}
      </SafeAreaView>
      ) : ( */}
      <View style={styles(backgroundColor).screen}>{children}</View>
      {/* )} */}
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
