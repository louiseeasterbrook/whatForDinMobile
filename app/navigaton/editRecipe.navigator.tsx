import {createStackNavigator} from '@react-navigation/stack';
import {ViewRecipeScreen} from '../screens/recipe/viewRecipe.screen';
import {EditNameScreen} from '../screens/recipe/editName.screen';
import {EditIngredientsScreen} from '../screens/recipe/editIngredients.screen';
import {EditStepsScreen} from '../screens/recipe/editSteps.screen.';
import {ReviewEditScreen} from '../screens/recipe/reviewEdit.screen';
import {EditMenuScreen} from '../screens/recipe/editMenu.screen';
import {EditRecipeProvider} from '../screens/recipe/context/editRecipeContext';
import {HORIZONTAL_ANIMATION} from './navigation.animation';

const Stack = createStackNavigator();

export const EditRecipeStack = () => {
  return (
    <EditRecipeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="View"
          component={ViewRecipeScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="EditMenu"
          component={EditMenuScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="EditName"
          component={EditNameScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="EditIngredients"
          component={EditIngredientsScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="EditSteps"
          component={EditStepsScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="ReviewEdit"
          component={ReviewEditScreen}
          options={HORIZONTAL_ANIMATION}
        />
      </Stack.Navigator>
    </EditRecipeProvider>
  );
};
