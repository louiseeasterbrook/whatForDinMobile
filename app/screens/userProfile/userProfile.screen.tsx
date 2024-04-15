import {ReactNode, useEffect, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Text,
  Searchbar,
  FAB,
  Appbar,
  Card,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {useStores} from '../../store/mainStore';
import {
  GetUser,
  GetUserRecipeCollection,
} from '../../services/database.service';
import {SearchResultCard} from '../home/searchResultCard';

type UserProfileScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const UserProfileScreen = ({
  navigation,
  route,
}: UserProfileScreenProps): ReactNode => {
  const {userId} = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState([]);
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const userStore = useStores();

  useEffect(() => {
    setLoading(true);
    (async function () {
      await Promise.all([getUserData(), getUserRecipes()]).then(() =>
        setLoading(false),
      );
    })();
  }, []);

  const getUserData = async (): Promise<void> => {
    const userResponse = await GetUser(userId);
    if (userResponse) {
      setUser(userResponse._data);
    }
  };

  const getUserRecipes = async (): Promise<void> => {
    const recipeResponse = await GetUserRecipeCollection(userId);
    if (recipeResponse) {
      setRecipes(recipeResponse);
      setFilteredRecipeList(recipeResponse);
    }
  };

  const goBack = (): void => {
    navigation.goBack();
  };

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    navigation.navigate('ViewRecipe', {
      screen: 'View',
      params: {
        recipe: selectedRecipe,
      },
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Profile'} />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={styles.flex}>
          <View style={styles.sidePadding}>
            <Card.Title
              title={user.Name}
              subtitle="Card Subtitle"
              left={props => <Avatar.Icon icon="account" />}
              right={props => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {}}
                />
              )}
            />
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
                        category={'hello'}
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
      )}
    </>
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
