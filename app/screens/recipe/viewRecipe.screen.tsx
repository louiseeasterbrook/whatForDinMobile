import {NavigationProp} from '@react-navigation/native';
import {UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {Text, Appbar, Portal, Dialog, Button} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {DeleteRecipe, UpdateUser} from '../../services/database.service';
import {useEditRecipe} from './context/editRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import _ from 'lodash';
import {useState} from 'react';

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
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [favLoading, setFavLoading] = useState<boolean>(false);

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
      setFavLoading(true);
      await UpdateUser(userStore.uid, initUserData).then(() => {
        console.log('goooooo');
        userStore.setFavourites(newFavList);
      });
      setFavLoading(false);
      console.log('after');
    };

    const goToEditMenu = () => {
      const newRec = _.cloneDeep(recipe);
      initRecipe(newRec);
      navigation.navigate('EditMenu');
    };

    const deleteRecipe = async () => {
      await DeleteRecipe(recipe.Id);
      hideDialog();
      goBack();
    };
    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title="Recipe" />
          {isOwnRecipe && (
            <>
              <Appbar.Action icon="pencil" onPress={goToEditMenu} />
              <Appbar.Action icon={'delete'} onPress={showDialog} />
            </>
          )}
          {!isOwnRecipe && (
            <Appbar.Action
              icon={
                favLoading ? 'account' : isFav ? 'bookmark' : 'bookmark-outline'
              }
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
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure you want to delete this recipe?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={deleteRecipe}>Yes, delete</Button>
              </Dialog.Actions>
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
});
