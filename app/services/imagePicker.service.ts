import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PhotoData} from '../screens/addRecipe/addRecipeImage.screen';

export const openImagePicker = async (): Promise<PhotoData> => {
  const options: ImageLibraryOptions = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  };
  const result: ImagePickerResponse = await launchImageLibrary(options);
  if (result?.assets) {
    return {
      uri: result.assets[0].uri,
      fileName: result.assets[0].fileName,
    };
  }
  return null;
};
