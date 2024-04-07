/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {Environment} from './models/environment';
import {MainStore, RootStoreProvider} from './store/mainStore';
import {useColorScheme} from 'react-native';

import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import {RootNavigator} from './navigaton/root.navigator';

function App(): React.JSX.Element {
  const rootStore = MainStore.create({});
  const environment = Environment.getInstance();

  //TODO: move to own setup function in diff file
  useEffect(() => {
    (async () => {
      await environment.setup();
    })();
  }, []);

  return (
    <RootStoreProvider value={rootStore}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </RootStoreProvider>
  );
}

export default App;
