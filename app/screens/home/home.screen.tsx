import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Searchbar, FAB, SegmentedButtons} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {SearchResultCard} from './searchResultCard';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {
  AddNewUser,
  GetUser,
  GetUserRecipeCollection,
} from '../../services/userDBservice';
import {NullState} from '../../components/nullState.component copy';
import moment from 'moment';
import {DATE_FORMAT_FOR_DISPLAY} from '../../constants';
import {getUserSavedRecipes} from '../../services/recipeDB.service copy';

enum SegmentType {
  Mine = 'Mine',
  Saved = 'Saved',
}

export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [segmentValue, setSegmentValue] = useState<string>(SegmentType.Mine);

  const userStore = useStores();

  useEffect(() => {
    setLoading(true);
    (async function () {
      await Promise.all([getUsers(), getRecipesForDisplay(), ,]).then(() =>
        setLoading(false),
      );
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async function () {
      await getRecipesForDisplay();
      setLoading(false);
    })();
  }, [segmentValue]);

  const getUsers = async (): Promise<void> => {
    if (!userStore.uid) {
      return;
    }
    const res = await GetUser(userStore.uid);
    await processUserResult(res._data);
  };

  const getRecipesForDisplay = async () => {
    const res =
      segmentValue === SegmentType.Mine
        ? await getRecipes()
        : await getSavedRecipes();
    if (res) {
      setRecipeList(res);
      setFilteredRecipeList(res);
    }
  };

  const getRecipes = async (): Promise<Recipe[]> => {
    return await GetUserRecipeCollection(userStore.uid);
  };

  const getSavedRecipes = async (): Promise<Recipe[]> => {
    return await getUserSavedRecipes(userStore.favourites);
  };

  const processUserResult = async (response: RecipeUser): Promise<void> => {
    if (!response) {
      await addNewUser();
      return;
    }
    userStore.setFavourites(response.Favourites);
    await getSavedRecipes();
  };

  const addNewUser = async (): Promise<void> => {
    const initUserData: RecipeUser = {
      Name: userStore.name,
      DateCreated: moment().format(DATE_FORMAT_FOR_DISPLAY),
      Favourites: [],
    };

    await AddNewUser(userStore.uid, initUserData);
  };

  useEffect(() => {
    filterRecipesBySearchInput();
  }, [searchInput]);

  const filterRecipesBySearchInput = (): void => {
    const inputNoSpace = searchInput.trim().toLowerCase();
    const newList = getRecipesThatMatchInput(inputNoSpace);
    setFilteredRecipeList(newList);
  };

  const getRecipesThatMatchInput = (input: string): Recipe[] => {
    return recipeList.filter((recipe: Recipe) => {
      const lowerCaseName = recipe.Name.toLowerCase();
      return lowerCaseName.includes(input);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenFocus();
    });
    return unsubscribe;
  }, [navigation, segmentValue]);

  const screenFocus = () => {
    getRecipesForDisplay();
  };

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    navigation.navigate('ViewRecipe', {
      screen: 'View',
      params: {
        recipe: selectedRecipe,
      },
    });
  };

  const navToAddRecipeScreen = (): void => {
    navigation.navigate('AddRecipe', {screen: 'AddName'});
  };

  const getNullStateMessageLine1 = (): string => {
    const searchMessage = `No search results`;
    const userRecipeMessage = 'No Recipes';
    const noSavedRecipeMessage = 'No Saved recipes';

    return searchInput
      ? searchMessage
      : segmentValue === SegmentType.Mine
      ? userRecipeMessage
      : noSavedRecipeMessage;
  };

  const changeSegmentValue = (val: SegmentType): void => {
    setSearchInput('');
    setSegmentValue(val);
  };

  return (
    <BaseScreen useSafeArea={true} noBottomPadding={true}>
      <View style={styles.flex}>
        <View style={styles.sidePadding}>
          <Searchbar
            placeholder="Search for a recipe..."
            onChangeText={setSearchInput}
            value={searchInput}
            style={styles.searchBar}
          />
          <SegmentedButtons
            value={segmentValue}
            onValueChange={changeSegmentValue}
            buttons={[
              {
                value: SegmentType.Mine,
                label: 'My Recipes ',
              },
              {
                value: SegmentType.Saved,
                label: 'Saved Recipes',
              },
            ]}
          />
        </View>

        {loading ? (
          <View style={styles.flatList}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View style={styles.contentPadding}>
            {filteredRecipeList.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.flatList}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => (
                  <View style={{marginBottom: 10}} />
                )}
                data={filteredRecipeList}
                renderItem={({item}) => (
                  <SearchResultCard
                    recipe={item}
                    onPress={item => navToRecipeScreen(item)}
                  />
                )}
              />
            ) : (
              <NullState
                messageLine1={getNullStateMessageLine1()}
                icon={searchInput ? 'magnify' : 'noodles'}></NullState>
            )}
          </View>
        )}
      </View>
      <FAB icon="plus" style={styles.fab} onPress={navToAddRecipeScreen} />
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: 18,
  },
  contentPadding: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  flatList: {
    paddingTop: 18,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    marginVertical: 20,
  },
  categoryContainer: {
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 4,
    bottom: 4,
  },
});
