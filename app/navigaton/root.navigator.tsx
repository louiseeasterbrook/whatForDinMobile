import {createStackNavigator} from '@react-navigation/stack';
import {ViewRecipeScreen} from '../screens/recipe/viewRecipe.screen';
import TabNavigator from './Tab.navigator';
import {NavigationContainer} from '@react-navigation/native';
import LoginNavigator from './login.navigator';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useStores} from '../store/mainStore';
import {AddRecipeStack} from './addRecipe.navigator';
import {EditRecipeStack} from './editRecipe.navigator';
import {HORIZONTAL_ANIMATION} from './navigation.animation';

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
        options={HORIZONTAL_ANIMATION}
      />
      <Stack.Screen
        name="ViewRecipe"
        component={EditRecipeStack}
        options={HORIZONTAL_ANIMATION}
      />
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipeStack}
        options={HORIZONTAL_ANIMATION}
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
        options={HORIZONTAL_ANIMATION}
      />
    </Stack.Navigator>
  );
};
