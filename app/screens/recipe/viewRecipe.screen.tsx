import {NavigationProp} from '@react-navigation/native';
import {Recipe, UserFavourites} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {DisplayListWithTitle} from './ListWithTitle.component';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {UpdateUserFavourites} from '../../services/database.service';
import {useEditRecipe} from './context/editRecipeProvider';

type ViewRecipeScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ViewRecipeScreen = observer(
  ({navigation, route}: ViewRecipeScreenProps) => {
    const userStore = useStores();
    const {recipe} = route.params;
    const hasRecipe = recipe?.Ingredients && recipe?.Method;
    const isFav = userStore.favourites.includes(recipe.Id);
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
      await UpdateUserFavourites(userStore.uid, initUserData);
      userStore.setFavourites(newFavList);
    };

    const goToEditMenu = () => {
      console.log('go');
      initRecipe(recipe);
      navigation.navigate('EditMenu');
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={recipe.Name} />
          <Appbar.Action icon="pencil" onPress={goToEditMenu} />
          <Appbar.Action
            icon={isFav ? 'heart' : 'heart-outline'}
            onPress={favToggle}
          />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          {hasRecipe ? (
            <>
              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Ingredients"
                  orderedList={false}
                  listArray={recipe.Ingredients}></DisplayListWithTitle>
              </View>

              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Method"
                  orderedList={true}
                  listArray={recipe.Method}></DisplayListWithTitle>
              </View>
            </>
          ) : (
            <>
              <Text>Recipe coming soon</Text>
            </>
          )}
        </ScrollView>
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
