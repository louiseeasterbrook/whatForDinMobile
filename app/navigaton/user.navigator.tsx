import {createStackNavigator} from '@react-navigation/stack';
import {EditRecipeProvider} from '../screens/recipe/context/editRecipeContext';
import {SearchScreen} from '../screens/search/search.screen';
import {UserProfileScreen} from '../screens/userProfile/userProfile.screen';
import {HORIZONTAL_ANIMATION} from './navigation.animation';

const Stack = createStackNavigator();

export const UserStack = () => {
  return (
    <EditRecipeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchUsers"
          component={SearchScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={HORIZONTAL_ANIMATION}
        />
      </Stack.Navigator>
    </EditRecipeProvider>
  );
};
