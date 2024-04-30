import {firebase} from '@react-native-firebase/database';
import {Recipe} from '../models/searchResults';

import firestore from '@react-native-firebase/firestore';
import {
  AddDocumentIdToEachDataSet,
  AddDocumentIdToSingleData,
} from './DBMethods';

const reference = firebase.app().database(process.env.DB_URL);

export async function GetDataBaseByRef(ref: string): Promise<any> {
  const res = await reference.ref(ref).once('value');
  return res.val();
}

export async function AddNewRecipe(data: Recipe): Promise<void> {
  const recipeRef = reference.ref('recipes');
  const newRecipeRef = recipeRef.push();
  await newRecipeRef.set(data);
}

export async function UpdateRecipe(
  data: Recipe,
  recipeId: string,
): Promise<void> {
  const recipeRef = reference.ref(`recipes/${recipeId}`);
  await recipeRef.set(data);
}

export async function GetAllRecipeCollection(): Promise<any> {
  const recipeData = await firestore().collection('recipes').get();
  return AddDocumentIdToEachDataSet(recipeData);
}

const getRecipesIncludedInIdArray = (
  recipes: Recipe[],
  favourites: string[],
) => {
  return recipes.filter(recipe => favourites.includes(recipe.Id));
};

export async function GetUserRecipeCollection(userId: string): Promise<any> {
  const recipeData = await firestore()
    .collection('recipes')
    .where('UserId', '==', userId)
    .get();

  return AddDocumentIdToEachDataSet(recipeData);
}

export async function getUserSavedRecipes(favourites: string[]): Promise<any> {
  const recipeData = await firestore().collection('recipes').get();
  const formattedData = AddDocumentIdToEachDataSet(recipeData);
  return getRecipesIncludedInIdArray(formattedData, favourites);
}

export async function AddRecipeToCollection(recipeData: Recipe): Promise<any> {
  return await firestore().collection('recipes').add(recipeData);
}

export async function UpdateRecipeInCollection(
  recipeData: Recipe,
): Promise<any> {
  return await firestore()
    .collection('recipes')
    .doc(recipeData.Id)
    .set(recipeData);
}

export async function DeleteRecipe(id: string): Promise<any> {
  return await firestore().collection('recipes').doc(id).delete();
}

export async function GetRecipe(id: string): Promise<any> {
  const res = await firestore().collection('recipes').doc(id).get();
  console.log(res.id);
  return AddDocumentIdToSingleData(res);
}
