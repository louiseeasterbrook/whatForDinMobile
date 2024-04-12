import {ReactNode, useEffect, useState} from 'react';
import {EditRecipeContext, EditRecipeContextValue} from './editRecipeProvider';
import {ListWithTitle, Recipe} from '../../../models/searchResults';
import {UpdateRecipe} from '../../../services/database.service';

export function EditRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe>();

  const formatElementWithList = (list: string[]): ListWithTitle => {
    return {
      Title: '',
      List: list,
    };
  };

  useEffect(() => {
    if (!recipe) {
      return;
    }
    setName(recipe.Name);
    setIngredients(recipe.Ingredients[0].List);
    setSteps(recipe.Method[0].List);
  }, [recipe]);

  const updateRecipe = async () => {
    console.log('SAVING ', steps);
    const ingredientData: ListWithTitle = formatElementWithList(ingredients);
    const StepsData: ListWithTitle = formatElementWithList(steps);

    recipe.Name = name;
    recipe.Ingredients = [ingredientData];
    recipe.Method = [StepsData];

    console.log('READY FOR SAVE ', steps);

    await UpdateRecipe(recipe, recipe?.Id);
  };

  const addRecipeState: EditRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    updateRecipe,
    formatElementWithList,
    setRecipe,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
