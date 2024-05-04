import {ReactNode, useState} from 'react';
import {EditRecipeContext, EditRecipeContextValue} from './editRecipeProvider';
import {Recipe} from '../../../models/searchResults';
import {UpdateRecipeInCollection} from '../../../services/recipeDB.service';

export function EditRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();
  const [recipe, setRecipe] = useState<Recipe>();

  const initRecipe = (recipe: Recipe) => {
    if (!recipe) {
      return;
    }
    setName(recipe.Name);
    setIngredients(recipe.Ingredients);
    setSteps(recipe.Method);
    setRecipe(recipe);
    setComment(recipe?.Comment || '');
  };

  const updateRecipe = async () => {
    recipe.Name = name;
    recipe.Ingredients = ingredients;
    recipe.Method = steps;
    recipe.Comment = comment;

    await UpdateRecipeInCollection(recipe);
  };

  const addRecipeState: EditRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    updateRecipe,
    comment,
    setComment,
    initRecipe,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
