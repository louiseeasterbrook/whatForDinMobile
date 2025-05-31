import {NavigationProp} from '@react-navigation/native';
import {Keyboard, StyleSheet, View, SafeAreaView} from 'react-native';
import {FAB} from 'react-native-paper';
import React from 'react';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {sharedStyles} from '../../index/theme';
import {useStores} from '../../store/mainStore';
import {Tag} from '../../components/Tag.component';
import {FlatList} from 'react-native-gesture-handler';
import {NullState} from '../../components/nullState.component copy';
import {RecipeTag} from '../../models/searchResults';
import {PrimaryText} from '../../components/PrimaryText.component';
import {IconButton} from 'react-native-paper';

type RecipeTagViewScreen = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const RecipeTagViewScreen = observer(
  ({navigation, route}: RecipeTagViewScreen) => {
    const userStore = useStores();

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
        <SafeAreaView style={{backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 8,
              paddingLeft: 4,
              backgroundColor: 'white',
              marginBottom: 8,
            }}>
            <IconButton icon="arrow-left" size={24} onPress={goBack} />
            <PrimaryText
              text="Recipe Tags"
              size={18}
              bold
              addedStyles={{marginLeft: 4}}
            />
          </View>
        </SafeAreaView>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              {userStore?.recipeTags?.length ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={userStore.recipeTags}
                  contentContainerStyle={{padding: 5}}
                  ItemSeparatorComponent={() => (
                    <View style={{marginBottom: 12}} />
                  )}
                  renderItem={item => {
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
