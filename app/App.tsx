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

import {PaperProvider} from 'react-native-paper';
import {RootNavigator} from './navigaton/root.navigator';

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
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </RootStoreProvider>
  );
}

export default App;
