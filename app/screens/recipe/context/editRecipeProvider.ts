import {createContext, useContext} from 'react';

export interface EditRecipeContextValue {
  name: string;
  setName: Function;
  ingredients: string[];
  setIngredients: Function;
  steps: string[];
  setSteps: Function;
  saveRecipe: Function;
  formatElementWithList: Function;
  initRecipe: Function;
}

export const EditRecipeContext = createContext<EditRecipeContextValue>(null);

export function useEditRecipe() {
  return useContext(EditRecipeContext);
}
