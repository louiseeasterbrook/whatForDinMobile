import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar, Portal, Dialog} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {light_red, sharedStyles} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';
import {FlatList} from 'react-native-gesture-handler';
import {useStores} from '../../store/mainStore';
import {Tag} from '../../components/Tag.component';
import {NullState} from '../../components/nullState.component copy';
import {RecipeTag} from '../../models/searchResults';
import {SharedDialog} from '../../components/sharedDialog.component';

type AddRecipeTagScreenProps = {
  navigation: NavigationProp<any, any>;
};

export interface PhotoData {
  uri: string;
  fileName: string;
}

export const AddRecipeTagScreen = observer(
  ({navigation}: AddRecipeTagScreenProps) => {
    const {
      tagIds,
      setTagIds,
      exitFlowFullBack,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
    } = useAddRecipe();
    const userStore = useStores();

    const getTagsFromIds = (): RecipeTag[] => {
      if (userStore?.recipeTags?.length && tagIds?.length) {
        return userStore?.recipeTags.filter(t => tagIds?.includes(t.Id));
      }
      return [];
    };

    const [selectedTags, setSelectedTags] = useState<RecipeTag[]>(
      getTagsFromIds(),
    );

    const goBack = (): void => {
      const ids = getIdsFromTags;
      setTagIds(ids);
      navigation.goBack();
    };

    const getIdsFromTags = (): string[] => {
      return selectedTags?.map(t => t.Id);
    };

    const navToStepsScreen = (): void => {
      const ids = getIdsFromTags;
      setTagIds(ids);
      navigation.navigate('Review');
    };

    const selectTag = async (newTag: RecipeTag) => {
      const result = getNewTagArray(newTag);
      setSelectedTags(result);
    };

    const getNewTagArray = (newTag: RecipeTag) => {
      const existingIndex = selectedTags.findIndex(t => t.Id === newTag.Id);
      if (existingIndex >= 0) {
        return selectedTags.filter(t => t.Id !== newTag.Id);
      }
      return [...selectedTags, newTag];
    };

    const isTagSelected = (id: string): boolean => {
      return selectedTags.findIndex(t => t.Id === id) >= 0;
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <PrimaryText text="Select any tags you want to add to this recipe" />
              </View>
              {userStore?.recipeTags?.length ? (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={userStore.recipeTags}
                  ItemSeparatorComponent={() => (
                    <View style={{marginBottom: 6}} />
                  )}
                  renderItem={item => {
                    return (
                      <Tag
                        title={item.item.Title}
                        colour={item.item.Colour}
                        icon={item.item.Icon}
                        onPress={() => selectTag(item.item)}
                        selected={isTagSelected(item.item.Id)}
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

            <PrimaryButton
              text="Next"
              onPress={navToStepsScreen}></PrimaryButton>
          </View>
        </BaseScreen>
        <Portal>
          <SharedDialog
            showDialog={showExitDialog}
            exitDialog={() => closeExitDialog()}
            text={'Are you sure you want to exit the create recipe flow?'}
            leftButton="Cancel"
            rightButton="Yes, exit"
            leftButtonPress={() => closeExitDialog()}
            rightButtonPress={() => exitFlowFullBack()}></SharedDialog>
        </Portal>
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
  },
  header: {
    paddingVertical: 12,
  },
  image: {
    marginTop: 20,
    width: '80%',
    aspectRatio: 3 / 2,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeButton: {
    zIndex: 1,
    backgroundColor: light_red,
    padding: 16,
    borderRadius: 8,
  },
});
