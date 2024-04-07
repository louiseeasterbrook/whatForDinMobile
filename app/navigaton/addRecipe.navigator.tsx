import {createStackNavigator} from '@react-navigation/stack';
import {AddRecipeNameScreen} from '../screens/addRecipe/addRecipeName.screen';
import {AddRecipeIngredientsScreen} from '../screens/addRecipe/addRecipeIngredients.screen';
import {AddRecipeStepsScreen} from '../screens/addRecipe/addRecipeSteps.screen';
import {AddRecipeProvider} from '../screens/addRecipe/context/addRecipeContext';

const Stack = createStackNavigator();

export const AddRecipeStack = () => {
  return (
    <AddRecipeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="AddName"
          component={AddRecipeNameScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddIngredients"
          component={AddRecipeIngredientsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddSteps"
          component={AddRecipeStepsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </AddRecipeProvider>
  );
};
