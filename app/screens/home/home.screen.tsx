import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Text, Searchbar, FAB, SegmentedButtons} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {SearchResultCard} from './searchResultCard';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {
  AddNewUser,
  GetUser,
  GetUserRecipeCollection,
  getUserSavedRecipes,
} from '../../services/database.service';
import {NullState} from '../../components/nullState.component copy';

enum SegmentType {
  Mine = 'Mine',
  Saved = 'Saved',
}

export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  // const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [segmentValue, setSegmentValue] = useState<string>(SegmentType.Mine);

  const userStore = useStores();

  useEffect(() => {
    setLoading(true);
    (async function () {
      await Promise.all([
        getUsers(),
        getRecipesForDisplay(),
        getCategories(),
        ,
      ]).then(() => setLoading(false));
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    (async function () {
      await getRecipesForDisplay();
      setLoading(false);
    })();
  }, [segmentValue]);

  const getCategories = async (): Promise<void> => {
    // const res = await GetDataBaseByRef('categories');
    // if (res) {
    //   const noNullRes = res.filter((x: string) => x !== null);
    //   setCategories(noNullRes);
    // }
  };

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
    const currentDate = new Date();

    const initUserData: RecipeUser = {
      Name: userStore.name,
      DateCreated: currentDate.toString(),
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

  // useEffect(() => {
  //   const newList = selectedCategories?.length
  //     ? getRecipesThatMatchSelectedCategories()
  //     : recipeList;

  //   setFilteredRecipeList(newList);
  // }, [selectedCategories]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      screenFocus();
    });
    return unsubscribe;
  }, [navigation, segmentValue]);

  const screenFocus = () => {
    getRecipesForDisplay();
  };

  // const getRecipesThatMatchSelectedCategories = () => {
  //   return recipeList.filter((recipe: Recipe) => {
  //     return selectedCategories.includes(categories[recipe.Category]);
  //   });
  // };

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

  const categorySelect = (category: string): void => {
    const newCategories: string[] = isSelectedCategory(category)
      ? removeSelectedCategory(category)
      : addSelectedCategory(category);

    setSelectedCategories(newCategories);
  };

  const removeSelectedCategory = (category: string): string[] => {
    return selectedCategories.filter(
      (selectedCatory: string) => selectedCatory != category,
    );
  };

  const addSelectedCategory = (category: string): string[] => {
    return [...selectedCategories, category];
  };

  const isSelectedCategory = (category: string): boolean => {
    return selectedCategories.includes(category);
  };

  const getNullStateMessageLine1 = (): string => {
    const userRecipeMessage = 'No Recipes';
    const noSavedRecipeMessage = 'No Saved recipes';

    return segmentValue === SegmentType.Mine
      ? userRecipeMessage
      : noSavedRecipeMessage;
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
            onValueChange={setSegmentValue}
            buttons={[
              {
                value: SegmentType.Mine,
                label: 'My Recipes',
              },
              {
                value: SegmentType.Saved,
                label: 'Saved Reciped',
              },
            ]}
          />
        </View>

        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={styles.contentPadding}>
            {filteredRecipeList.length > 0 ? (
              <FlatList
                style={styles.flex}
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
              <NullState messageLine1={getNullStateMessageLine1()}></NullState>
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
    paddingBottom: 18,
  },
  contentPadding: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flex: {
    flex: 1,
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
