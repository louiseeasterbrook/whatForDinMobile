import {ReactNode, useState} from 'react';
import {AddRecipeContext, AddRecipeContextValue} from './addRecipeProvider';
import {Recipe} from '../../../models/searchResults';
import {useStores} from '../../../store/mainStore';
import {AddRecipeToCollection} from '../../../services/recipeDB.service';
import {useNavigation} from '@react-navigation/native';

export function AddRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);

  const userStore = useStores();
  const nav = useNavigation();

  const saveRecipe = async () => {
    const formattedRecipe: Recipe = {
      Name: name,
      Category: category,
      Ingredients: ingredients,
      Method: steps,
      UserId: userStore.uid,
      Id: '', //gets set up db
      UserName: userStore.name,
      Comment: comment ? comment : null,
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
    showExitDialog,
    closeExitDialog,
    exitFlow,
    openExitDialog,
    exitFlowFullBack,
  };

  function openExitDialog() {
    setShowExitDialog(true);
  }

  function closeExitDialog() {
    setShowExitDialog(false);
  }

  function exitFlow() {
    setShowExitDialog(false);
    nav.popToTop();
  }

  function exitFlowFullBack() {
    setShowExitDialog(false);
    nav.popToTop();
    nav.canGoBack();
  }

  return (
    <AddRecipeContext.Provider value={addRecipeState}>
      {children}
    </AddRecipeContext.Provider>
  );
}
