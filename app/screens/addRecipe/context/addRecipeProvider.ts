import {createContext, useContext} from 'react';
import {PhotoData} from '../addRecipeImage.screen';

export interface AddRecipeContextValue {
  name: string;
  setName: Function;
  ingredients: string[];
  setIngredients: Function;
  steps: string[];
  setSteps: Function;
  category: string[];
  setCategory: Function;
  comment: string;
  setComment: Function;
  imageData: PhotoData;
  setImageData: Function;
  saveRecipe: Function;
  showExitDialog: boolean;
  openExitDialog: Function;
  closeExitDialog: Function;
  exitFlow: Function;
  exitFlowFullBack: Function;
}

export const AddRecipeContext = createContext<AddRecipeContextValue>(null);

export function useAddRecipe() {
  return useContext(AddRecipeContext);
}
