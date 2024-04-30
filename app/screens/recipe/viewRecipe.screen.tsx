import {NavigationProp} from '@react-navigation/native';
import {UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {
  Text,
  Appbar,
  Portal,
  Dialog,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {UpdateUser} from '../../services/userDBservice';
import {useEditRecipe} from './context/editRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import _ from 'lodash';
import {useState} from 'react';
import {DeleteRecipe} from '../../services/recipeDB.service copy';

type ViewRecipeScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ViewRecipeScreen = observer(
  ({navigation, route}: ViewRecipeScreenProps) => {
    const userStore = useStores();
    const {recipe} = route.params;
    const hasRecipe = recipe?.Ingredients && recipe?.Method;
    const isOwnRecipe = recipe.UserId === userStore.uid;
    const isFav = userStore.favourites.includes(recipe.Id);
    const [loadingDialogVisible, setLoadingDialogVisible] =
      useState<string>('');
    const [deleteDialogVisible, setDeleteDialogVisible] =
      useState<boolean>(false);

    const {initRecipe} = useEditRecipe();

    const goBack = () => {
      navigation.goBack();
    };

    const favToggle = async (): Promise<void> => {
      const newFavList = isFav ? removeFav() : addFav();
      updateFav(newFavList);
    };

    const addFav = (): string[] => {
      return [...userStore.favourites, recipe.Id];
    };

    const removeFav = (): string[] => {
      return userStore.favourites.filter(
        (favId: string) => favId !== recipe.Id,
      );
    };

    const updateFav = async (newFavList: string[]): Promise<void> => {
      const initUserData: UserFavourites = {
        Favourites: newFavList,
      };
      const loadingMessage = isFav
        ? 'Removing this recipe from your favourites'
        : 'Adding this recipe to your favourites';
      showLoadingDialog(loadingMessage);

      // waiting a miminum of 1.5 seconds to return finsihing api response
      await Promise.all([
        updateUserFavouritesInDataBase(initUserData),
        delayPromise(1500),
      ]);

      userStore.setFavourites(initUserData.Favourites);
      hideLoadingDialog();
    };

    const updateUserFavouritesInDataBase = async (
      data: UserFavourites,
    ): Promise<void> => {
      return await UpdateUser(userStore.uid, data).then(() => {});
    };

    const delayPromise = async (milliseconds: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    const goToEditMenu = () => {
      const newRec = _.cloneDeep(recipe);
      initRecipe(newRec);
      navigation.navigate('EditMenu');
    };

    const deleteRecipe = async () => {
      await DeleteRecipe(recipe.Id);
      hideDeleteDialog();
      goBack();
    };
    const showDeleteDialog = () => setDeleteDialogVisible(true);
    const hideDeleteDialog = () => setDeleteDialogVisible(false);

    const showLoadingDialog = (text: string) => setLoadingDialogVisible(text);
    const hideLoadingDialog = () => setLoadingDialogVisible('');

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Recipe" />
          {isOwnRecipe && (
            <>
              <Appbar.Action icon="pencil" onPress={goToEditMenu} />
              <Appbar.Action icon={'delete'} onPress={showDeleteDialog} />
            </>
          )}
          {!isOwnRecipe && (
            <Appbar.Action
              icon={isFav ? 'bookmark' : 'bookmark-outline'}
              onPress={favToggle}
            />
          )}
        </Appbar.Header>
        <BaseScreen>
          <ScrollView style={styles.main}>
            {hasRecipe ? (
              <RecipeDisplay
                ingredients={recipe.Ingredients}
                steps={recipe.Method}
                userName={recipe.UserName}
                recipeName={recipe.Name}></RecipeDisplay>
            ) : (
              <>
                <Text>Recipe coming soon</Text>
              </>
            )}
          </ScrollView>
          <Portal>
            <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure you want to delete this recipe?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDeleteDialog}>Cancel</Button>
                <Button onPress={deleteRecipe}>Yes, delete</Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog
              visible={loadingDialogVisible !== ''}
              onDismiss={hideLoadingDialog}>
              <Dialog.Content>
                <ActivityIndicator animating={true} />
                <Text variant="bodyMedium" style={styles.dialogText}>
                  {loadingDialogVisible}
                </Text>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </BaseScreen>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  dialogText: {
    textAlign: 'center',
    paddingTop: 22,
  },
});
