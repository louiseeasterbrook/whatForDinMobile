import {ReactNode, useEffect, useState} from 'react';
import {EditRecipeContext, EditRecipeContextValue} from './editRecipeProvider';
import {ListWithTitle, Recipe} from '../../../models/searchResults';
import {
  UpdateRecipe,
  UpdateRecipeInCollection,
} from '../../../services/database.service';

export function EditRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    if (!recipe) {
      return;
    }
    setName(recipe.Name);
    setIngredients(recipe.Ingredients);
    setSteps(recipe.Method);
  }, [recipe]);

  const updateRecipe = async () => {
    recipe.Name = name;
    recipe.Ingredients = ingredients;
    recipe.Method = steps;

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
    setRecipe,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
