import {firebase} from '@react-native-firebase/database';
import {Recipe, RecipeUser, UserFavourites} from '../models/searchResults';

import firestore from '@react-native-firebase/firestore';

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

//////////////////

export async function getRecipeCollection(): Promise<any> {
  const recipeData = await firestore()
    .collection('recipes')
    // .doc('TSPZMnXuiKzWnCGv57qr')
    .get();

  console.log('...S..E..E.EEEEEEE ', recipeData);

  // const collectionRef = await firestore().collection('recipes');
  // const snapshot = await collectionRef.get();
  // const hello = snapshot.docs;
  // const docNames = snapshot.docs.map(doc =>
  //   console.log('DOC... ', doc.id, ' ', doc),
  // );
  // console.log('docnames ', hello);

  return filterRecipeResponse(recipeData);
}

const filterRecipeResponse = recipeData => {
  return recipeData._docs.map(x => ({
    ...x._data,
    Id: x.id,
  }));
};

export async function AddRecipeToCollection(recipeData: Recipe): Promise<any> {
  const req = await firestore()
    .collection('recipes')
    // .doc('TSPZMnXuiKzWnCGv57qr')
    .add(recipeData)
    .then(x => console.log('ADD RWPOMCE ', x));

  // return filterRecipeResponse(recipeData);
}

export async function UpdateRecipeInCollection(
  recipeData: Recipe,
): Promise<any> {
  const req = await firestore()
    .collection('recipes')
    .doc(recipeData.Id)
    .set(recipeData);

  // return filterRecipeResponse(recipeData);
}
