import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Text, Searchbar, FAB} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {SearchResultCard} from './searchResultCard';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {
  AddNewUser,
  GetDataBaseByRef,
  getRecipeCollection,
} from '../../services/database.service';

export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const userStore = useStores();

  const getRecipes = async (): Promise<void> => {
    const res = await getRecipeCollection();

    if (res) {
      setRecipeList(res);
      setFilteredRecipeList(res);
    }
  };

  const getCategories = async (): Promise<void> => {
    const res = await GetDataBaseByRef('categories');
    if (res) {
      const noNullRes = res.filter((x: string) => x !== null);
      setCategories(noNullRes);
    }
  };

  const getUsers = async (): Promise<void> => {
    if (!userStore.uid) {
      return;
    }

    const ref = `users/${userStore.uid}`;
    const res = await GetDataBaseByRef(ref);
    if (res) {
      await processUserResult(res);
    }
  };

  const processUserResult = async (response: RecipeUser): Promise<void> => {
    if (!response) {
      await addNewUser();
      return;
    }
    userStore.setFavourites(response.Favourites);
  };

  const addNewUser = async (): Promise<void> => {
    const currentDate = new Date();

    const initUserData: RecipeUser = {
      DateCreated: currentDate.toString(),
      Favourites: [],
    };

    await AddNewUser(userStore.uid, initUserData);
  };

  useEffect(() => {
    setLoading(true);
    (async function () {
      getRecipeCollection();
      await Promise.all([getRecipes(), getCategories(), getUsers()]).then(() =>
        setLoading(false),
      );
    })();
  }, []);

  useEffect(() => {
    const inputNoSpace = searchInput.trim().toLowerCase();
    const newList = getRecipesThatMatchInput(inputNoSpace);

    setFilteredRecipeList(newList);
  }, [searchInput]);

  const getRecipesThatMatchInput = (input: string): Recipe[] => {
    return recipeList.filter((recipe: Recipe) => {
      const lowerCaseName = recipe.Name.toLowerCase();
      return lowerCaseName.includes(input);
    });
  };

  useEffect(() => {
    const newList = selectedCategories?.length
      ? getRecipesThatMatchSelectedCategories()
      : recipeList;

    setFilteredRecipeList(newList);
  }, [selectedCategories]);

  const getRecipesThatMatchSelectedCategories = () => {
    return recipeList.filter((recipe: Recipe) => {
      return selectedCategories.includes(categories[recipe.Category]);
    });
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

  return (
    <BaseScreen>
      <View style={styles.flex}>
        <View style={styles.sidePadding}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchInput}
            value={searchInput}
            style={styles.searchBar}
          />
        </View>

        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={styles.flex}>
            {/* <View style={styles.categoryContainer}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                data={categories}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => categorySelect(item)}>
                    <Chip
                      style={{marginLeft: 8, marginRight: 4}}
                      selected={isSelectedCategory(item)}>
                      {item}
                    </Chip>
                  </TouchableOpacity>
                )}
              />
            </View> */}
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
                      category={categories[item.Category]}
                      onPress={item => navToRecipeScreen(item)}
                    />
                  )}
                />
              ) : (
                <Text>no result</Text>
              )}
            </View>
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
