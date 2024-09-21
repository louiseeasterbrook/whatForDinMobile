import {createContext, useContext} from 'react';
import {PhotoData} from '../../addRecipe/addRecipeImage.screen';

export interface EditRecipeContextValue {
  name: string;
  setName: Function;
  ingredients: string[];
  setIngredients: Function;
  steps: string[];
  setSteps: Function;
  updateRecipe: Function;
  comment: string;
  setComment: Function;
  imageData: PhotoData;
  setImageData: Function;
  initRecipe: Function;
  anyChanges: Function;
  tagIds: string[];
  setTagIds: Function;
}

export const EditRecipeContext = createContext<EditRecipeContextValue>(null);

export function useEditRecipe() {
  return useContext(EditRecipeContext);
}
