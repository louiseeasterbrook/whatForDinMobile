import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Text, Searchbar, FAB} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {GetAllUsers} from '../../services/database.service';
import {UserResultCard} from './userResultCard';

export const SearchScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const userStore = useStores();

  useEffect(() => {
    (async function () {
      await getUserData();
    })();
  }, []);

  const getUserData = async (): Promise<void> => {
    const users = await GetAllUsers();
    if (users) {
      setUsers(RemoveLoggedInUser(users));
    }
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
    return users.filter(user => user.Name.toLowerCase().includes(searchInput));
  };

  return (
    <BaseScreen>
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
              {users.length > 0 ? (
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
                <Text>no result</Text>
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
