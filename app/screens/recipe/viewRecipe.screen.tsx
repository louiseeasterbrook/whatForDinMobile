import {ReactNode, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';
import {Recipe} from '../../models/searchResults';
import {ScrollView} from 'react-native-gesture-handler';
import {DisplayListWithTitle} from './ListWithTitle.component';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';
import {useStores} from '../../store/mainStore';
import {firebase} from '@react-native-firebase/database';

import {observer} from 'mobx-react-lite';

const DBURL = '';

type ViewRecipeScreenProps = {
  navigation: NavigationProp<any, any>;
  route: Recipe;
};

export const ViewRecipeScreen = observer(
  ({navigation, route}: ViewRecipeScreenProps) => {
    const userStore = useStores();
    const {recipe} = route.params;
    const hasRecipe = recipe?.Ingredients && recipe?.Method;
    const isFav = userStore.favourites.includes(recipe.Id);

    const goBack = () => {
      navigation.goBack();
    };

    const favToggle = (): void => {
      const newFavList = isFav ? removeFav() : addFav();
      updateFav(newFavList);
    };

    const addFav = (): number[] => {
      return [...userStore.favourites, recipe.Id];
    };

    const removeFav = (): number[] => {
      return userStore.favourites.filter(
        (favId: number) => favId !== recipe.Id,
      );
    };

    const updateFav = (newFavList: number[]) => {
      const initUserData = {
        Favourites: newFavList,
      };
      const reference = firebase.app().database(DBURL);
      reference.ref(`/users/${userStore.uid}`).set(initUserData);
      userStore.setFavourites(newFavList);
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={recipe.Name} />
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
              <Text>{userStore.favourites}</Text>
            </>
          ) : (
            <>
              <Icon name="home" size={20} color={'black'} />
              <Text>Recipe coming soon</Text>
            </>
          )}
        </ScrollView>
        {hasRecipe && (
          <FAB
            icon="pencil"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
          />
        )}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 4,
    bottom: 20,
  },
});
