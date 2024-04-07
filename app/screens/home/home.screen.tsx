import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Text, Searchbar} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {SearchResultCard} from './searchResultCard';

import {firebase} from '@react-native-firebase/database';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
export const HomeScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const userStore = useStores();

  const DBURL = '';

  const getRecipes = (): void => {
    setLoading(true);
    const reference = firebase.app().database(DBURL);

    reference
      .ref('recipes')
      .once('value')
      .then(response => {
        setRecipeList(response.val());
        setFilteredRecipeList(response.val());
        setLoading(false);
      });
  };

  const getCategories = (): void => {
    const reference = firebase.app().database(DBURL);

    reference
      .ref('categories')
      .once('value')
      .then(Response => {
        const res = Response.val();
        const noNullRes = res.filter((x: string) => x !== null);
        setCategories(noNullRes);
      });
  };

  const getUsers = (): void => {
    if (!userStore.uid) {
      return;
    }
    const reference = firebase.app().database(DBURL);

    reference
      .ref(`users/${userStore.uid}`)
      .once('value')
      .then(response => {
        console.log(`users/${userStore.uid}`, response);
        processUserResult(response.val());
      });
  };

  const processUserResult = (response: RecipeUser) => {
    if (!response) {
      addNewUser();
      return;
    }
    userStore.setFavourites(response.Favourites);
  };

  const addNewUser = () => {
    const currentDate = new Date();

    const initUserData: RecipeUser = {
      DateCreated: currentDate.toString(),
      Favourites: [],
    };
    const reference = firebase.app().database(DBURL);
    reference.ref(`/users/${userStore.uid}`).set(initUserData);
  };

  useEffect(() => {
    getUsers();
    getRecipes();
    getCategories();
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
      recipe: selectedRecipe,
    });
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
          <></>
          // <View style={styles.flex}>
          //   {/* <View style={styles.categoryContainer}>
          //     <FlatList
          //       keyExtractor={(item, index) => index.toString()}
          //       horizontal={true}
          //       data={categories}
          //       renderItem={({item}) => (
          //         <TouchableOpacity onPress={() => categorySelect(item)}>
          //           <Chip
          //             style={{marginLeft: 8, marginRight: 4}}
          //             selected={isSelectedCategory(item)}>
          //             {item}
          //           </Chip>
          //         </TouchableOpacity>
          //       )}
          //     />
          //   </View> */}
          //   <View style={styles.contentPadding}>
          //     {filteredRecipeList.length > 0 ? (
          //       <FlatList
          //         style={styles.flex}
          //         keyExtractor={(item, index) => index.toString()}
          //         ItemSeparatorComponent={() => (
          //           <View style={{marginBottom: 10}} />
          //         )}
          //         data={filteredRecipeList}
          //         renderItem={({item}) => (
          //           <SearchResultCard
          //             recipe={item}
          //             category={categories[item.Category]}
          //             onPress={item => navToRecipeScreen(item)}
          //           />
          //         )}
          //       />
          //     ) : (
          //       <Text>no result</Text>
          //     )}
          //   </View>
          // </View>
        )}
      </View>
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
});
