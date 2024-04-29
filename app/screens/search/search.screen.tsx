import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Searchbar, Text} from 'react-native-paper';
import {Recipe, RecipeUser, SearchResultUser} from '../../models/searchResults';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {
  GetAllUsers,
  GetAllRecipeCollection,
} from '../../services/database.service';
import {UserResultCard} from './userResultCard';
import {NullState} from '../../components/nullState.component copy';

export const SearchScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<SearchResultUser[]>([]);
  const [users, setUsers] = useState<RecipeUser[]>([]);
  const [formattedUsers, setFormattedUsers] = useState<SearchResultUser[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const userStore = useStores();

  useEffect(() => {
    (async function () {
      await Promise.all([getUserData(), getRecipeData()]);
    })();
  }, []);

  const getUserData = async (): Promise<void> => {
    const users = await GetAllUsers();
    if (users) {
      setUsers(RemoveLoggedInUser(users));
    }
  };

  const getRecipeData = async (): Promise<void> => {
    const res = await GetAllRecipeCollection();
    if (res) {
      setRecipes(res);
    }
  };

  useEffect(() => {
    formatUserResult();
  }, [users, recipes]);

  const formatUserResult = (): void => {
    if (users?.length === 0 || recipes?.length === 0) {
      return;
    }

    const formattedUsers: SearchResultUser[] = users.map((user: RecipeUser) => {
      return {
        Name: user.Name,
        Id: user.Id,
        RecipeCount: getUserRecipeCount(user),
      };
    });

    setFormattedUsers(formattedUsers);
    setFilteredUsers(formattedUsers);
    setLoading(false);
  };

  const getUserRecipeCount = (user: RecipeUser): number => {
    return recipes.reduce(
      (acc: number, curr: Recipe) => (curr.UserId == user.Id ? acc + 1 : acc),
      0,
    );
  };

  const RemoveLoggedInUser = (userList: any[]): any[] => {
    return userList.filter(user => user.Id !== userStore.uid);
  };

  const userPressed = (userId: string): void => {
    navigation.navigate('UserProfile', {userId: userId});
  };

  const onSearch = (): void => {
    const inputNoSpace = searchInput.trim().toLowerCase();
    const newList = getUsersThatMatchSearchInput(inputNoSpace);
    setFilteredUsers(newList);
  };

  useEffect(() => {
    onSearch();
  }, [searchInput]);

  const getUsersThatMatchSearchInput = (searchInput: string) => {
    return formattedUsers.filter(user =>
      user.Name.toLowerCase().includes(searchInput),
    );
  };

  return (
    <BaseScreen useSafeArea={true}>
      <View style={styles.flex}>
        <View style={styles.sidePadding}>
          <Searchbar
            placeholder="Search for a user..."
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
              {filteredUsers.length > 0 ? (
                <FlatList
                  style={styles.flex}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={() => (
                    <View style={{marginBottom: 10}} />
                  )}
                  data={filteredUsers}
                  renderItem={({item}) => (
                    <UserResultCard
                      user={item}
                      onPress={id => userPressed(id)}
                    />
                  )}
                />
              ) : (
                <NullState
                  messageLine1={'No users'}
                  icon="account-group"></NullState>
              )}
            </View>
          </View>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 4,
    bottom: 4,
  },
});
