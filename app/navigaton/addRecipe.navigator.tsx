import {createStackNavigator} from '@react-navigation/stack';
import {AddRecipeNameScreen} from '../screens/addRecipe/addRecipeName.screen';
import {AddRecipeIngredientsScreen} from '../screens/addRecipe/addRecipeIngredients.screen';
import {AddRecipeStepsScreen} from '../screens/addRecipe/addRecipeSteps.screen';
import {AddRecipeProvider} from '../screens/addRecipe/context/addRecipeContext';
import {AddRecipeReviewScreen} from '../screens/addRecipe/addRecipeReview.screen';
import {HORIZONTAL_ANIMATION} from './navigation.animation';
import {AddRecipeCommentScreen} from '../screens/addRecipe/addRecipeComments.screen';
import {AddRecipeImageScreen} from '../screens/addRecipe/addRecipeImage.screen';
import {AddRecipeTagScreen} from '../screens/addRecipe/addRecipeTag.screen';

const Stack = createStackNavigator();

export const AddRecipeStack = () => {
  return (
    <AddRecipeProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="AddName"
          component={AddRecipeNameScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="AddIngredients"
          component={AddRecipeIngredientsScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="AddSteps"
          component={AddRecipeStepsScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="AddComment"
          component={AddRecipeCommentScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="AddImage"
          component={AddRecipeImageScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="AddTag"
          component={AddRecipeTagScreen}
          options={HORIZONTAL_ANIMATION}
        />
        <Stack.Screen
          name="Review"
          component={AddRecipeReviewScreen}
          options={{gestureEnabled: false, ...HORIZONTAL_ANIMATION}}
        />
      </Stack.Navigator>
    </AddRecipeProvider>
  );
};
