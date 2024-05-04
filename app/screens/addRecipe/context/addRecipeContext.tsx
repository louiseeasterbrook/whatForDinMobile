import {ReactNode, useState} from 'react';
import {AddRecipeContext, AddRecipeContextValue} from './addRecipeProvider';
import {Recipe} from '../../../models/searchResults';
import {useStores} from '../../../store/mainStore';
import {AddRecipeToCollection} from '../../../services/recipeDB.service';

export function AddRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();

  const userStore = useStores();

  const saveRecipe = async () => {
    const formattedRecipe: Recipe = {
      Name: name,
      Category: category,
      Ingredients: ingredients,
      Method: steps,
      UserId: userStore.uid,
      Id: '', //gets set up db
      UserName: userStore.name,
      Comment: comment,
    };
    await AddRecipeToCollection(formattedRecipe);
  };

  const addRecipeState: AddRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    category,
    setCategory,
    comment,
    setComment,
    saveRecipe,
  };

  return (
    <AddRecipeContext.Provider value={addRecipeState}>
      {children}
    </AddRecipeContext.Provider>
  );
}
