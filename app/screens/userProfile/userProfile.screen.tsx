import {ReactNode, useEffect, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Recipe, RecipeUser} from '../../models/searchResults';
import {GetUser, GetUserRecipeCollection} from '../../services/userDBservice';
import {HeaderCard} from '../../components/headerCard.component';
import {BaseScreen} from '../../components/BaseScreen.component';
import {NullState} from '../../components/nullState.component copy';
import {RecipeListWithSearch} from './recipeListWithSearch.component';
import moment from 'moment';
import {DATE_FORMAT_FOR_DISPLAY} from '../../constants';

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
  const [user, setUser] = useState<RecipeUser>();
  const [recipeList, setRecipeList] = useState<Recipe[]>();

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
    console.log(userResponse);
    if (userResponse) {
      setUser(userResponse._data);
    }
  };

  const getUserRecipes = async (): Promise<void> => {
    const recipeResponse = await GetUserRecipeCollection(userId);
    if (recipeResponse) {
      setRecipeList(recipeResponse);
    }
  };

  const goBack = (): void => {
    navigation.goBack();
  };

  const navToRecipeScreen = (selectedRecipe: Recipe): void => {
    navigation.navigate('ViewRecipe', {
      screen: 'View',
      params: {
        recipeId: selectedRecipe.Id,
      },
    });
  };

  const formatDate = (date: string): string => {
    if (!date) {
      return '';
    }
    return moment(date, DATE_FORMAT_FOR_DISPLAY).format(
      DATE_FORMAT_FOR_DISPLAY,
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Profile'} />
      </Appbar.Header>
      <BaseScreen>
        {loading && !user ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={styles.flex}>
            <View style={styles.sidePadding}>
              <HeaderCard
                title={user?.Name}
                subtitle={`User Since: ${user?.DateCreated}`}
                icon="account"></HeaderCard>
            </View>
            {loading && !recipeList ? (
              <ActivityIndicator animating={true} />
            ) : recipeList?.length > 0 ? (
              <View style={styles.contentPadding}>
                <RecipeListWithSearch
                  recipeList={recipeList}
                  onPress={item =>
                    navToRecipeScreen(item)
                  }></RecipeListWithSearch>
              </View>
            ) : (
              <View style={styles.nullState}>
                <NullState messageLine1="No Recipes"></NullState>
              </View>
            )}
          </View>
        )}
      </BaseScreen>
    </>
  );
};

const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  contentPadding: {
    paddingHorizontal: 18,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  searchBar: {
    marginVertical: 20,
  },
  nullState: {
    paddingTop: 40,
  },
});
