import moment from 'moment';
import { ReactNode, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NullState } from '../../components/nullState.component copy';
import { DATE_FORMAT_FOR_DISPLAY } from '../../constants';
import { Recipe, RecipeUser } from '../../models/searchResults';
import { AddNewUser, GetUser } from '../../services/userDBservice';
import { useStores } from '../../store/mainStore';
import { SearchResultCard } from './searchResultCard';

import { Screen } from '../../components/Screen';
import { SearchBar } from '../../components/SearchBar.component';
import { SHADOW_BASE } from '../../index/theme';
import { getSortedRecipes } from '../../services/recipeDisplay.service';

export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const userStore = useStores();

  useEffect(() => {
    setLoading(true);
    (async function () {
      await getUsers();
      await getRecipesForDisplay();
      setLoading(false);
    })();
  }, []);

  const getUsers = async (): Promise<void> => {
    if (!userStore.uid) {
      return;
    }
    const res = await GetUser(userStore.uid);
    await processUserResult(res._data);
  };

  const getRecipesForDisplay = async (): Promise<void> => {
    const final = await getSortedRecipes(userStore.uid, userStore.favourites);
    setRecipeList(final);
  };

  const processUserResult = async (response: RecipeUser): Promise<void> => {
    if (!response) {
      await addNewUser();
      return;
    }
    userStore.setFavourites(response.Favourites);
    userStore.setRecipeTags(response?.RecipeTags);

  };

  const addNewUser = async (): Promise<void> => {
    const initUserData: RecipeUser = {
      Name: userStore.name,
      DateCreated: moment().format(DATE_FORMAT_FOR_DISPLAY),
      Favourites: [],
      RecipeTags: [],
      Id: null,
    };

    await AddNewUser(userStore.uid, initUserData);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async function () {
        await getRecipesForDisplay();

      })();
    });
    return unsubscribe;
  }, [navigation, searchInput]);

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    navigation.navigate('ViewRecipe', {
      screen: 'View',
      params: {
        recipeId: selectedRecipe.Id,
      },
    });
  };


  const navToAddRecipeScreen = (): void => {
    navigation.navigate('AddRecipe', {screen: 'AddName'});
  };

  const getNullStateMessageLine1 = (): string => {
    const searchMessage = `No search results`;
    const userRecipeMessage = 'No Recipes';

    return searchInput ? searchMessage : userRecipeMessage;
  };

  return (
    <LinearGradient
      colors={['#606c88', '#3f4c6b']} // Purple to Pink gradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{flex: 1}}
    >
      <Screen style={{backgroundColor: 'transparent'}}>
        {/* <Screen.Header title='hello'/> */}
        <Screen.Content>
          <View style={{paddingTop:16, paddingBottom:28}}>
      <SearchBar
  placeholder="Search recipes..."
  onSearch={(text) => console.log('Searching for:', text)}
  onChangeText={(text) => console.log('Text changed:', text)}
/>
</View>
      {/* <SearchBar
  theme="lavender"
  placeholder="Search users or recipes..."
  onSearch={()=>{}}
  autoFocus={true}
  showCancel={true}
/> */}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View style={styles.contentPadding}>
            {recipeList.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={recipeList}
                renderItem={({item}) => (
                  <SearchResultCard
                    userId={userStore.uid}
                    recipe={item}
                    onPress={item => navToRecipeScreen(item)}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NullState
                messageLine1={getNullStateMessageLine1()}
                icon={searchInput ? 'magnify' : 'noodles'}></NullState>
            )}
          </View>
        )}


    </Screen.Content>
    </Screen>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sidePadding: {
    backgroundColor: 'white',
    ...SHADOW_BASE,
  },
  contentPadding: {

    flex: 1,

  },
  flex: {
    flex: 1,
  },
  loading: {
    paddingTop: 12,
  },

});
