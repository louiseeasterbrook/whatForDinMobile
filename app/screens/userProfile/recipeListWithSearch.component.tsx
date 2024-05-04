import {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {SearchResultCard} from '../home/searchResultCard';
import {NullState} from '../../components/nullState.component copy';

type RecipeListWithSearchProps = {
  recipeList: Recipe[];
  onPress: (item: Recipe) => void;
};

export const RecipeListWithSearch = ({
  recipeList = [],
  onPress,
}: RecipeListWithSearchProps): ReactNode => {
  const [filteredRecipeList, setFilteredRecipeList] =
    useState<Recipe[]>(recipeList);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    filterRecipesBySearchInput();
  }, [searchInput]);

  const filterRecipesBySearchInput = (): void => {
    const inputNoSpace = searchInput.trim().toLowerCase();
    const newList = getRecipesThatMatchInput(inputNoSpace);
    setFilteredRecipeList(newList);
  };

  const getRecipesThatMatchInput = (input: string): Recipe[] => {
    return recipeList?.filter((recipe: Recipe) => {
      const lowerCaseName = recipe.Name.toLowerCase();
      return lowerCaseName.includes(input);
    });
  };

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    onPress(selectedRecipe);
  };

  return (
    <View style={styles.flex}>
      <Searchbar
        placeholder="Search for a recipe..."
        onChangeText={setSearchInput}
        value={searchInput}
        style={styles.searchBar}
      />
      {filteredRecipeList.length > 0 ? (
        <FlatList
          style={styles.flex}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
          data={filteredRecipeList}
          renderItem={({item}) => (
            <SearchResultCard
              recipe={item}
              onPress={item => navToRecipeScreen(item)}
            />
          )}
        />
      ) : (
        <NullState messageLine1="No search results" icon="magnify"></NullState>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentPadding: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flex: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    marginVertical: 20,
  },
});
