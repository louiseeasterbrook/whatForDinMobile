import {firebase} from '@react-native-firebase/database';
import {Recipe, RecipeUser, UserFavourites} from '../models/searchResults';

const reference = firebase.app().database(process.env.DB_URL);

export async function GetDataBaseByRef(ref: string): Promise<any> {
  const res = await reference.ref(ref).once('value');
  return res.val();
}

export async function AddNewUser(
  userId: string,
  data: RecipeUser,
): Promise<void> {
  if (!userId) {
    return;
  }
  await reference.ref(`/users/${userId}`).set(data);
}

export async function UpdateUserFavourites(
  userId: string,
  data: UserFavourites,
): Promise<void> {
  if (!userId) {
    return;
  }
  await reference.ref(`/users/${userId}`).set(data);
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
