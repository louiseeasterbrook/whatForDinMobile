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
    setComment(recipe?.Comment || '');
    setRecipe({...recipe});
  };

  const anyChanges = (): boolean => {
    const nameChange = recipe.Name !== name;
    const ingredientChange = stringArrayChange(recipe.Ingredients, ingredients);
    const stepsChange = stringArrayChange(recipe.Method, steps);
    const commentChange = recipe?.Comment !== comment;

    return nameChange || ingredientChange || stepsChange || commentChange;
  };

  const stringArrayChange = (array1: string[], array2: string[]): boolean => {
    if (array1.length !== array2.length) return true;

    for (var i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return true;
      }
    }

    return false;
  };

  const updateRecipe = async (): Promise<void> => {
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
    anyChanges,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
