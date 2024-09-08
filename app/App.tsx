/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {Environment} from './models/environment';
import {MainStore, RootStoreProvider} from './store/mainStore';
import SplashScreen from 'react-native-splash-screen';

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {RootNavigator} from './navigaton/root.navigator';
import {Font} from './index/theme';

const fontConfig = {
  displaySmall: {
    fontFamily: Font.Regular,
  },
  displayMedium: {
    fontFamily: Font.Regular,
  },
  displayLarge: {
    fontFamily: Font.Regular,
  },
  headlineSmall: {
    fontFamily: Font.SemiBold,
  },
  headlineMedium: {
    fontFamily: Font.SemiBold,
  },
  headlineLarge: {
    fontFamily: Font.SemiBold,
  },
  titleSmall: {
    fontFamily: Font.SemiBold,
  },
  titleMedium: {
    fontFamily: Font.SemiBold,
  },
  titleLarge: {
    fontFamily: Font.SemiBold,
  },
  labelSmall: {
    fontFamily: Font.SemiBold,
  },
  labelMedium: {
    fontFamily: Font.SemiBold,
  },
  labelLarge: {
    fontFamily: Font.SemiBold,
  },
  bodySmall: {
    fontFamily: Font.Regular,
  },
  bodyMedium: {
    fontFamily: Font.Regular,
  },
  bodyLarge: {
    fontFamily: Font.Regular,
  },
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({config: fontConfig}),
};

function App(): React.JSX.Element {
  const rootStore = MainStore.create({});
  const environment = Environment.getInstance();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    (async () => {
      await environment.setup();
    })();
  }, []);

  return (
    <RootStoreProvider value={rootStore}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </RootStoreProvider>
  );
}

export default App;
