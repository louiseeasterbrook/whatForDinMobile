import {firebase} from '@react-native-firebase/database';
import {Recipe, RecipeUser} from '../models/searchResults';

import firestore from '@react-native-firebase/firestore';
import {AddDocumentIdToEachDataSet} from './DBMethods';

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
  return await firestore().collection('users').doc(userId).update(data);
}

export async function UpdateRecipe(
  data: Recipe,
  recipeId: string,
): Promise<void> {
  const recipeRef = reference.ref(`recipes/${recipeId}`);
  await recipeRef.set(data);
}

export async function GetUserRecipeCollection(userId: string): Promise<any> {
  const recipeData = await firestore()
    .collection('recipes')
    .where('UserId', '==', userId)
    .get();

  return AddDocumentIdToEachDataSet(recipeData);
}

export async function GetAllUsers(): Promise<RecipeUser> {
  const res = await firestore().collection('users').get();
  return AddDocumentIdToEachDataSet(res);
}
