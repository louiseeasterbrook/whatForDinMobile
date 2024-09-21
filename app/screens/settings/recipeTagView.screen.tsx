import {NavigationProp} from '@react-navigation/native';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useEffect} from 'react';
import {sharedStyles} from '../../index/theme';
import {useStores} from '../../store/mainStore';
import {Tag} from '../../components/Tag.component';
import {FlatList} from 'react-native-gesture-handler';
import {NullState} from '../../components/nullState.component copy';
import {GetUser} from '../../services/userDBservice';
import {RecipeTag} from '../../models/searchResults';

type RecipeTagViewScreen = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const RecipeTagViewScreen = observer(
  ({navigation, route}: RecipeTagViewScreen) => {
    const userStore = useStores();

    useEffect(() => {
      console.log('===== use   ', userStore.recipeTags[0]);
    });
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getUpdatedRecipeTags();
      });
      return unsubscribe;
    }, [navigation]);

    const getUpdatedRecipeTags = async (): Promise<void> => {
      const user = await GetUser(userStore.uid);
      const newTags = user?._data?.RecipeTags;
      if (newTags) {
        userStore.setRecipeTags(newTags);
      }
    };

    const goBack = (): void => {
      Keyboard.dismiss();
      navigation.goBack();
    };

    const navToRecipeTagForm = (): void => navigation.navigate('RecipeTagForm');
    const navToEditTagScreen = (tag: RecipeTag): void =>
      navigation.navigate('RecipeTagForm', {
        tag,
      });

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Recipe Tags'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              {userStore?.recipeTags?.length ? (
                <FlatList
                  // keyExtractor={(item, index) => index.toString()}
                  data={userStore.recipeTags}
                  ItemSeparatorComponent={() => (
                    <View style={{marginBottom: 6}} />
                  )}
                  renderItem={item => {
                    // console.log('gogogoog ', item);
                    return (
                      <Tag
                        title={item.item.Title}
                        colour={item.item.Colour}
                        icon={item.item.Icon}
                        onPress={() => navToEditTagScreen(item.item)}
                      />
                    );
                  }}
                />
              ) : (
                <NullState
                  messageLine1="You have no recipe tags"
                  icon={'tag-outline'}></NullState>
              )}
            </View>
          </View>
          <FAB icon="plus" style={styles.fab} onPress={navToRecipeTagForm} />
        </BaseScreen>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 26,
    paddingTop: 26,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  header: {
    paddingVertical: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 4,
    bottom: 26,
  },
});
