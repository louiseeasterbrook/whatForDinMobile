import {ReactNode, useState} from 'react';
import {EditRecipeContext, EditRecipeContextValue} from './editRecipeProvider';
import {Recipe} from '../../../models/searchResults';
import {UpdateRecipeInCollection} from '../../../services/recipeDB.service';
import {PhotoData} from '../../addRecipe/addRecipeImage.screen';
import storage from '@react-native-firebase/storage';

export const DEFAULT_IMAGE_NAME = 'NO_CHANGE_PHOTO';

export function EditRecipeProvider({children}: any): ReactNode {
  const [name, setName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [comment, setComment] = useState<string>();
  const [recipe, setRecipe] = useState<Recipe>();
  const [imageData, setImageData] = useState<PhotoData>();
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [originalPhotoURI, setOriginalPhotoURI] = useState<string>();

  const initRecipe = (recipe: Recipe, photoUri: string) => {
    if (!recipe) {
      return;
    }
    setOriginalPhotoURI(photoUri);
    setName(recipe.Name);
    setIngredients(recipe.Ingredients);
    setSteps(recipe.Method);
    setComment(recipe?.Comment || '');
    setImageData({uri: photoUri || null, fileName: DEFAULT_IMAGE_NAME});
    setTagIds(recipe.TagIds || []);
    setRecipe({...recipe});
  };

  const anyChanges = (): boolean => {
    const nameChange = recipe.Name !== name;
    const ingredientChange = stringArrayChange(recipe.Ingredients, ingredients);
    const stepsChange = stringArrayChange(recipe.Method, steps);
    const tagChange = stringArrayChange(recipe.TagIds, tagIds);
    const commentChange = Boolean(recipe?.Comment !== comment);
    const photoChange = Boolean(imageData?.uri != originalPhotoURI);

    console.log(
      '-- name: ',
      nameChange,
      '-- ing: ',
      ingredientChange,
      '-- ste: ',
      stepsChange,
      '-- cooment: ',
      commentChange,
      '-- photo: ',
      photoChange,
    );

    return (
      nameChange ||
      ingredientChange ||
      stepsChange ||
      commentChange ||
      photoChange ||
      tagChange
    );
  };

  const stringArrayChange = (array1: string[], array2: string[]): boolean => {
    if (array1?.length !== array2?.length) return true;

    for (var i = 0; i < array1?.length; i++) {
      if (array1[i] !== array2[i]) {
        return true;
      }
    }

    return false;
  };

  const updateRecipe = async (): Promise<void> => {
    const photoChange = imageData?.fileName !== DEFAULT_IMAGE_NAME;

    recipe.Name = name;
    recipe.Ingredients = ingredients;
    recipe.Method = steps;
    recipe.Comment = comment;
    recipe.TagIds = tagIds;
    recipe.PhotoName = photoChange ? getNewPhotoName() : recipe.PhotoName;

    await UpdateRecipeInCollection(recipe);
    await saveImage();
  };

  const getNewPhotoName = (): string => {
    return imageData?.fileName ? imageData.fileName : null;
  };

  const saveImage = async (): Promise<void> => {
    const photoChange = imageData?.fileName !== DEFAULT_IMAGE_NAME;
    if (photoChange && imageData?.fileName && imageData?.uri) {
      const reference = storage().ref(`${imageData.fileName}`);
      await reference.putFile(imageData?.uri).then();
    }
  };

  const addRecipeState: EditRecipeContextValue = {
    name,
    setName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    updateRecipe,
    comment,
    setComment,
    imageData,
    setImageData,
    initRecipe,
    anyChanges,
    tagIds,
    setTagIds,
  };

  return (
    <EditRecipeContext.Provider value={addRecipeState}>
      {children}
    </EditRecipeContext.Provider>
  );
}
