import {firebase} from '@react-native-firebase/database';
import {Recipe, RecipeUser, UserFavourites} from '../models/searchResults';

import firestore from '@react-native-firebase/firestore';

const reference = firebase.app().database(process.env.DB_URL);

export async function GetDataBaseByRef(ref: string): Promise<any> {
  const res = await reference.ref(ref).once('value');
  return res.val();
}

export async function GetUser(userId: string): Promise<any> {
  if (!userId) {
    return;
  }
  return await firestore().collection('users').doc(userId).get();
}

export async function AddNewUser(
  userId: string,
  data: RecipeUser,
): Promise<void> {
  if (!userId) {
    return;
  }
  await firestore().collection('users').doc(userId).set(data);
}

export async function UpdateUser(userId: string, data: any): Promise<void> {
  if (!userId) {
    return;
  }
  await firestore().collection('users').doc(userId).set(data);
}

export async function AddNewRecipe(data: Recipe): Promise<void> {
  // if (!data) {
  //   return;
  // }
  const recipeRef = reference.ref('recipes');
  const newRecipeRef = recipeRef.push();
  await newRecipeRef.set(data);
}

export async function UpdateRecipe(
  data: Recipe,
  recipeId: string,
): Promise<void> {
  // if (!data) {
  //   return;
  // }
  console.log(data, ' ', recipeId);
  const recipeRef = reference.ref(`recipes/${recipeId}`);
  await recipeRef.set(data);
}

//////////////////

export async function getRecipeCollection(): Promise<any> {
  const recipeData = await firestore().collection('recipes').get();
  return filterRecipeResponse(recipeData);
}

const filterRecipeResponse = recipeData => {
  return recipeData._docs.map(x => ({
    ...x._data,
    Id: x.id,
  }));
};

export async function GetUserRecipeCollection(userId: string): Promise<any> {
  const recipeData = await firestore()
    .collection('recipes')
    .where('UserId', '==', userId)
    .get();

  return filterRecipeResponse(recipeData);
}

export async function AddRecipeToCollection(recipeData: Recipe): Promise<any> {
  await firestore().collection('recipes').add(recipeData);
}

export async function UpdateRecipeInCollection(
  recipeData: Recipe,
): Promise<any> {
  await firestore().collection('recipes').doc(recipeData.Id).set(recipeData);
}

export async function GetUsers(): Promise<any> {
  const recipeData = await firestore().collection('users').get();

  console.log(recipeData);
}
