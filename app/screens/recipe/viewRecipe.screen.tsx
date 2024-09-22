import {NavigationProp} from '@react-navigation/native';
import {Recipe, UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  Appbar,
  Portal,
  Dialog,
  Button,
  ActivityIndicator,
  FAB,
} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import storage from '@react-native-firebase/storage';

import {observer} from 'mobx-react-lite';
import {UpdateUser} from '../../services/userDBservice';
import {useEditRecipe} from './context/editRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import {DeleteRecipe, GetRecipe} from '../../services/recipeDB.service';
import KeepAwake from '@sayem314/react-native-keep-awake';
import {sharedStyles} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';

type ViewRecipeScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ViewRecipeScreen = observer(
  ({navigation, route}: ViewRecipeScreenProps) => {
    const userStore = useStores();
    const {recipeId} = route.params;
    const DEFAULT_TEXT_SIZE = 14;
    const MAX_TEXT_SIZE = 26;

    const [recipe, setRecipe] = useState<Recipe>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingDialogVisible, setLoadingDialogVisible] =
      useState<string>('');
    const [deleteDialogVisible, setDeleteDialogVisible] =
      useState<boolean>(false);

    const [AlwaysOnDialogVisible, setAlwaysOnDialogVisible] =
      useState<boolean>(false);
    const [keepAwake, setKeepAwake] = useState<boolean>(false);
    const [chefMode, setChefMode] = useState<boolean>(false);

    const [photoArray, setPhotoArray] = useState([]);

    const isOwnRecipe = recipe?.UserId === userStore.uid;
    const isFav = userStore.favourites.includes(recipe?.Id);

    const {initRecipe} = useEditRecipe();

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getRecipeFromDB();
      });
      return unsubscribe;
    }, [navigation]);

    const getRecipeFromDB = async (): Promise<void> => {
      const res = await GetRecipe(recipeId);
      setRecipe(res);

      if (res.PhotoName) {
        const recipePhoto = await storage().ref(res.PhotoName).getDownloadURL();
        const savedPhoto = recipePhoto ? [recipePhoto] : [];
        setPhotoArray(savedPhoto);
      } else {
        setPhotoArray([]);
      }

      setLoading(false);
    };

    const goBack = (): void => {
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

    const goToEditMenu = (): void => {
      const newRec = _.cloneDeep(recipe);
      const firstPhotoUri = photoArray[0];
      initRecipe(newRec, firstPhotoUri);
      navigation.navigate('EditMenu');
    };

    const deleteRecipe = async (): Promise<void> => {
      await DeleteRecipe(recipe.Id);
      hideDeleteDialog();
      goBack();
    };

    const showDeleteDialog = (): void => setDeleteDialogVisible(true);
    const hideDeleteDialog = (): void => setDeleteDialogVisible(false);

    const keepAwakePress = (): void => {
      if (keepAwake) {
        setKeepAwake(false);
        return;
      }
      showAlwaysOnDialog();
    };
    const showAlwaysOnDialog = (): void => setAlwaysOnDialogVisible(true);
    const hideAlwaysOnDialog = (): void => setAlwaysOnDialogVisible(false);
    const turnOnKeepAwake = (): void => {
      setKeepAwake(true);
      hideAlwaysOnDialog();
    };

    const pressChefMode = (): void => {
      setChefMode(!chefMode);
    };

    const showLoadingDialog = (text: string): void =>
      setLoadingDialogVisible(text);
    const hideLoadingDialog = (): void => setLoadingDialogVisible('');

    const [openFab, setOpenFab] = useState(false);
    const [textSize, setTextSize] = useState(14);
    const onStateChange = ({open}) => setOpenFab(open);

    const changeFontSize = (): void => {
      const newSize =
        textSize < MAX_TEXT_SIZE ? textSize + 4 : DEFAULT_TEXT_SIZE;

      setTextSize(newSize);
    };

    return (
      <>
        {keepAwake && <KeepAwake />}
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          {/* <Appbar.Content title="Recipe" /> */}
          {!loading && (
            <>
              <Appbar.Action
                icon={'format-letter-case'}
                onPress={changeFontSize}
              />
              <Appbar.Action icon={'chef-hat'} onPress={pressChefMode} />
              <Appbar.Action
                icon={keepAwake ? 'lightbulb-on' : 'lightbulb'}
                onPress={keepAwakePress}
              />
              {!isOwnRecipe && (
                <Appbar.Action
                  icon={isFav ? 'bookmark' : 'bookmark-outline'}
                  onPress={favToggle}
                />
              )}
            </>
          )}
        </Appbar.Header>

        <BaseScreen>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={true}></ActivityIndicator>
            </View>
          ) : (
            <ScrollView>
              <RecipeDisplay
                tags={[]}
                fontSize={textSize}
                ingredients={recipe.Ingredients}
                steps={recipe.Method}
                userName={recipe.UserName}
                recipeName={recipe.Name}
                comments={recipe.Comment}
                chefMode={chefMode}
                imageArray={photoArray}></RecipeDisplay>
              <View style={styles.screen}></View>
            </ScrollView>
          )}
          <Portal>
            <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
              <Dialog.Content>
                <PrimaryText text="Are you sure you want to delete this recipe?" />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDeleteDialog}>Cancel</Button>
                <Button onPress={deleteRecipe}>Yes, delete</Button>
              </Dialog.Actions>
            </Dialog>

            <Dialog
              visible={AlwaysOnDialogVisible}
              onDismiss={hideDeleteDialog}>
              <Dialog.Content>
                <PrimaryText text="Would you like to activate 'always on' display?" />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideAlwaysOnDialog}>Cancel</Button>
                <Button onPress={turnOnKeepAwake}>Yes</Button>
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
          {isOwnRecipe && (
            <FAB.Group
              open={openFab}
              visible
              icon={openFab ? 'chef-hat' : 'pencil'}
              actions={[
                {
                  icon: 'delete',
                  label: 'Delete',
                  onPress: () => showDeleteDialog(),
                },
                {
                  icon: 'pencil',
                  label: 'Edit',
                  onPress: () => goToEditMenu(),
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {}}
            />
          )}
        </BaseScreen>
      </>
    );
  },
);

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 50,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  dialogText: {
    textAlign: 'center',
    paddingTop: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
