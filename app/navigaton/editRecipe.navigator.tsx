import {createStackNavigator} from '@react-navigation/stack';
import {ViewRecipeScreen} from '../screens/recipe/viewRecipe.screen';
import {EditNameScreen} from '../screens/recipe/editName.screen';
import {EditIngredientsScreen} from '../screens/recipe/editIngredients.screen';
import {EditStepsScreen} from '../screens/recipe/editSteps.screen.';
import {ReviewEditScreen} from '../screens/recipe/reviewEdit.screen';
import {EditMenuScreen} from '../screens/recipe/editMenu.screen';
import {EditRecipeProvider} from '../screens/recipe/context/editRecipeContext';

const Stack = createStackNavigator();

export const EditRecipeStack = () => {
  return (
    <EditRecipeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="View"
          component={ViewRecipeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditMenu"
          component={EditMenuScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditName"
          component={EditNameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditIngredients"
          component={EditIngredientsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditSteps"
          component={EditStepsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReviewEdit"
          component={ReviewEditScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </EditRecipeProvider>
  );
};
