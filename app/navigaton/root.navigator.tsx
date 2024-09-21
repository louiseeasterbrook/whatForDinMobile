import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './Tab.navigator';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import LoginNavigator from './login.navigator';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useStores} from '../store/mainStore';
import {AddRecipeStack} from './addRecipe.navigator';
import {EditRecipeStack} from './editRecipe.navigator';
import {HORIZONTAL_ANIMATION} from './navigation.animation';
import {UserProfileScreen} from '../screens/userProfile/userProfile.screen';
import {BackHandler} from 'react-native';
import {MealPickerScreen} from '../screens/settings/mealPicker.screen';
import {RecipeTagViewScreen} from '../screens/settings/recipeTagView.screen';
import {RecipeTagFormScreen} from '../screens/settings/recipeTagForm.screen';

export const NO_GO_BACK_SCREENS = ['Recipe book', 'Review', 'ReviewEdit'];

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const userStore = useStores();
  const [user, setUser] = useState(null);
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('------- USER CHANGED ', user);
    if (user) {
      const name = getUserName(user);
      userStore.setUserInfo(name, user.uid);
    }
    setUser(user);
  }

  const getUserName = (firebaseUser): string => {
    const googleLoginName: string = firebaseUser?.displayName
      ? firebaseUser.displayName
      : null;
    const nameToDisplay = googleLoginName ? googleLoginName : userStore.name;
    return nameToDisplay ? nameToDisplay : '';
  };

  const getCurrentRouteName = (state): string => {
    const route = state.routes[state.index];
    if (route.state) {
      return getCurrentRouteName(route.state);
    }
    return route.name;
  };

  useEffect(() => {
    const onBackPressed = (): boolean => {
      const state = navigationRef.current.getRootState();
      const currentRouteName = getCurrentRouteName(state);
      const noGoingBack = NO_GO_BACK_SCREENS.includes(currentRouteName);

      console.log(currentRouteName, ' ', noGoingBack);

      if (noGoingBack) {
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
      }
      return true;
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    return () => {
      subscriber;
      BackHandler.removeEventListener('hardwareBackPress', onBackPressed);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
        options={{gestureEnabled: false, ...HORIZONTAL_ANIMATION}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={HORIZONTAL_ANIMATION}
      />
      <Stack.Screen
        name="MealPicker"
        component={MealPickerScreen}
        options={HORIZONTAL_ANIMATION}
      />
      <Stack.Screen
        name="RecipeTagView"
        component={RecipeTagViewScreen}
        options={HORIZONTAL_ANIMATION}
      />
      <Stack.Screen
        name="RecipeTagForm"
        component={RecipeTagFormScreen}
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
