import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Searchbar, FAB} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {SearchResultCard} from './searchResultCard';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {AddNewUser, GetUser} from '../../services/userDBservice';
import {NullState} from '../../components/nullState.component copy';
import moment from 'moment';
import {DATE_FORMAT_FOR_DISPLAY} from '../../constants';
import {sharedStyles} from '../../index/theme';
import {SHADOW_BASE} from '../../index/theme';
import {getSortedRecipes} from '../../services/recipeDisplay.service';
import {Tag} from '../../components/Tag.component';

export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    setFilteredRecipeList(final);
  };

  const processUserResult = async (response: RecipeUser): Promise<void> => {
    if (!response) {
      await addNewUser();
      return;
    }
    userStore.setFavourites(response.Favourites);
    userStore.setRecipeTags(response?.RecipeTags);
    // await getSavedRecipes();
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
    filterRecipesBySearchInput();
  }, [searchInput, selectedTags]);

  const filterRecipesBySearchInput = (): void => {
    const inputNoSpace = searchInput.trim().toLowerCase();
    const newList = getRecipesThatMatchInput(inputNoSpace);
    setFilteredRecipeList(newList);
  };

  const getRecipesThatMatchInput = (input: string): Recipe[] => {
    return recipeList.filter((recipe: Recipe) => {
      const lowerCaseName = recipe.Name.toLowerCase();
      return (
        (!input || lowerCaseName.includes(input)) &&
        selectedTagsMatchRecipeTags(recipe.TagIds || [])
      );
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async function () {
        await getRecipesForDisplay();
        if (searchInput || selectedTags?.length) {
          filterRecipesBySearchInput();
        }
      })();
    });
    return unsubscribe;
  }, [navigation, searchInput, selectedTags]);

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    navigation.navigate('ViewRecipe', {
      screen: 'View',
      params: {
        recipeId: selectedRecipe.Id,
      },
    });
  };

  const getNewTagArray = (tagId: string) => {
    const existingIndex = selectedTags?.findIndex(t => t === tagId);
    if (existingIndex >= 0) {
      return selectedTags.filter(t => t !== tagId);
    }
    return [...selectedTags, tagId];
  };

  const tagSelected = (tagId: string) => {
    const tags = getNewTagArray(tagId);
    setSelectedTags(tags);
  };

  const selectedTagsMatchRecipeTags = (arr1: string[]): boolean => {
    return (
      !selectedTags.length || arr1?.some(item => selectedTags?.includes(item))
    );
  };

  const isTagSelected = (id: string): boolean => {
    return selectedTags.findIndex(t => t === id) >= 0;
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
    <BaseScreen useSafeArea={true} noBottomPadding={true}>
      <View style={styles.flex}>
        <View style={styles.sidePadding}>
          <Searchbar
            placeholder="Search for a recipe..."
            onChangeText={setSearchInput}
            value={searchInput}
            style={[styles.searchBar, sharedStyles.searchBar]}
          />
          <FlatList
            style={styles.tags}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            data={userStore.recipeTags}
            ItemSeparatorComponent={() => <View style={{marginRight: 16}} />}
            contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 8}}
            renderItem={item => {
              return (
                <Tag
                  title={item.item.Title}
                  colour={item.item.Colour}
                  icon={item.item.Icon}
                  onPress={() => tagSelected(item.item.Id)}
                  selected={isTagSelected(item.item.Id)}
                />
              );
            }}
          />
        </View>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <View style={styles.contentPadding}>
            {filteredRecipeList.length > 0 ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={filteredRecipeList}
                renderItem={({item}) => (
                  <SearchResultCard
                    userId={userStore.uid}
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
    backgroundColor: 'white',
    ...SHADOW_BASE,
  },
  contentPadding: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loading: {
    paddingTop: 12,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  tags: {
    marginBottom: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 4,
    bottom: 4,
  },
});
