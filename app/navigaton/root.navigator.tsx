import {createStackNavigator} from '@react-navigation/stack';
import {ViewRecipeScreen} from '../screens/recipe/viewRecipe.screen';
import TabNavigator from './Tab.navigator';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './login.navigator';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useStores} from '../store/mainStore';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const userStore = useStores();
  const [user, setUser] = useState(null);
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('------- USER CHANGED ', user);
    if (user) {
      userStore.setUserInfo(user.displayName, user.uid);
    }
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {user ? <LoggedInStack /> : <LoggedOutStack />}
    </NavigationContainer>
  );
};

export const LoggedInStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewRecipe"
        component={ViewRecipeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const LoggedOutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
