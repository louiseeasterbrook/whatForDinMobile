import {Recipe} from '../models/searchResults';
import {getUserSavedRecipes} from './recipeDB.service';
import {GetUserRecipeCollection} from './userDBservice';

export const getSortedRecipes = async (
  userId: string,
  favourites: string[],
) => {
  const res = await Promise.all([
    getRecipes(userId),
    getSavedRecipes(favourites),
  ]);
  if (res) {
    const collection = [...res[0], ...res[1]];
    return sortIntoAlphabeticalOrder(collection);
  }
  return null;
};

const sortIntoAlphabeticalOrder = (array: Recipe[]) => {
  return array.sort((a, b) => {
    if (a.Name.toLocaleUpperCase() < b.Name.toLocaleUpperCase()) {
      return -1;
    }
    if (a.Name.toLocaleUpperCase() > b.Name.toLocaleUpperCase()) {
      return 1;
    }
    return 0;
  });
};

const getRecipes = async (userId: string): Promise<Recipe[]> => {
  return await GetUserRecipeCollection(userId);
};

const getSavedRecipes = async (favourites: string[]): Promise<Recipe[]> => {
  return await getUserSavedRecipes(favourites);
};
