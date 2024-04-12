import {ReactNode, useEffect, useState} from 'react';
import {EditRecipeContext, EditRecipeContextValue} from './editRecipeProvider';
import {ListWithTitle, Recipe} from '../../../models/searchResults';
import {AddNewRecipe} from '../../../services/database.service';

export function EditRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const formatElementWithList = (list: string[]): ListWithTitle => {
    return {
      Title: '',
      List: list,
    };
  };

  const initRecipe = (recipe: Recipe) => {
    setName(recipe.Name);
    setIngredients(recipe.Ingredients[0].List);
    setSteps(recipe.Method[0].List);
  };

  const saveRecipe = async () => {
    console.log('SAVING ', steps);
    const ingredientData: ListWithTitle = formatElementWithList(ingredients);
    const StepsData: ListWithTitle = formatElementWithList(steps);

    const formattedRecipe: Recipe = {
      Name: name,
      Category: 0,
      Ingredients: [ingredientData],
      Method: [StepsData],
      Id: '',
      UserId: '',
    };

    console.log('READY FOR SAVE ', steps);
    await AddNewRecipe(formattedRecipe);
  };

  const addRecipeState: EditRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    saveRecipe,
    formatElementWithList,
    initRecipe,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
