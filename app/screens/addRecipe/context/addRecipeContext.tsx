import {ReactNode, useState} from 'react';
import {AddRecipeContext, AddRecipeContextValue} from './addRecipeProvider';
import {Recipe} from '../../../models/searchResults';
import {AddRecipeToCollection} from '../../../services/database.service';
import {useStores} from '../../../store/mainStore';

export function AddRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const userStore = useStores();

  const saveRecipe = async () => {
    console.log('SAVING ', steps);

    const formattedRecipe: Recipe = {
      Name: name,
      Category: 0,
      Ingredients: ingredients,
      Method: steps,
      UserId: userStore.uid,
      Id: '', //gets set up db
    };
    console.log('===== REAYD FOR AVE ', formattedRecipe);
    await AddRecipeToCollection(formattedRecipe);
  };

  const addRecipeState: AddRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    saveRecipe,
  };

  return (
    <AddRecipeContext.Provider value={addRecipeState}>
      {children}
    </AddRecipeContext.Provider>
  );
}
