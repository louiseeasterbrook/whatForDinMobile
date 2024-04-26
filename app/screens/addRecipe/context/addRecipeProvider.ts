import {createContext, useContext} from 'react';

export interface AddRecipeContextValue {
  name: string;
  setName: Function;
  ingredients: string[];
  setIngredients: Function;
  steps: string[];
  setSteps: Function;
  category: string[];
  setCategory: Function;
  saveRecipe: Function;
}

export const AddRecipeContext = createContext<AddRecipeContextValue>(null);

export function useAddRecipe() {
  return useContext(AddRecipeContext);
}
