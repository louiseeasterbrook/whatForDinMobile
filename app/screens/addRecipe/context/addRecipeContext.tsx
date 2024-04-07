import {ReactNode, useEffect, useState} from 'react';
import {AddRecipeContext, AddRecipeContextValue} from './addRecipeProvider';
import {ListWithTitle, Recipe} from '../../../models/searchResults';

export function AddRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const addRecipeState: AddRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
  };

  const saveRecipe = () => {
    console.log('SAVING ');
    const ingredientData: ListWithTitle = {
      Title: '',
      List: ingredients,
    };
    const StepsData: ListWithTitle = {
      Title: '',
      List: steps,
    };
    const formattedRecipe: Recipe = {
      Name: name,
      Category: 0,
      Ingredients: [ingredientData],
      Method: [StepsData],
      Id: '',
      UserId: '',
    };
  };

  return (
    <AddRecipeContext.Provider value={addRecipeState}>
      {children}
    </AddRecipeContext.Provider>
  );
}
