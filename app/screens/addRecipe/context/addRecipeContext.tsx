import {ReactNode, useEffect, useState} from 'react';
import {AddRecipeContext, AddRecipeContextValue} from './addRecipeProvider';
import {ListWithTitle, Recipe} from '../../../models/searchResults';
import {AddNewRecipe} from '../../../services/database.service';

export function AddRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const formatElementWithList = (list: string[]): ListWithTitle => {
    return {
      Title: '',
      List: list,
    };
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

  const addRecipeState: AddRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    saveRecipe,
    formatElementWithList,
  };

  return (
    <AddRecipeContext.Provider value={addRecipeState}>
      {children}
    </AddRecipeContext.Provider>
  );
}
