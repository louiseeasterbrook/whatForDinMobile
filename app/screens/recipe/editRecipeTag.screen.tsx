import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Divider, Icon} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {light_red, main_colour, sharedStyles} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';
import {FlatList} from 'react-native-gesture-handler';
import {useStores} from '../../store/mainStore';
import {Tag} from '../../components/Tag.component';
import {RecipeTag} from '../../models/searchResults';
import {useEditRecipe} from './context/editRecipeProvider';
type EditRecipeTagScreenProps = {
  navigation: NavigationProp<any, any>;
};

export interface PhotoData {
  uri: string;
  fileName: string;
}

export const EditRecipeTagScreen = observer(
  ({navigation}: EditRecipeTagScreenProps) => {
    const {tagIds, setTagIds} = useEditRecipe();
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
      navigation.goBack();
    };

    const getIdsFromTags = (): string[] => {
      return selectedTags?.map(t => t.Id);
    };

    const save = (): void => {
      const ids = getIdsFromTags;
      setTagIds(ids);
      goBack();
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

    const navToAddTagScreen = () => {
      navigation.navigate('RecipeTagForm');
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Tags'} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <PrimaryText text="Select any tags you want to add to this recipe" />
              </View>
              <Divider style={{marginBottom: 10}} />

              {userStore?.recipeTags?.length > 0 && (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={userStore.recipeTags}
                  ItemSeparatorComponent={() => (
                    <View style={{marginBottom: 6}} />
                  )}
                  contentContainerStyle={{marginBottom: 10}}
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
              )}
              <TouchableOpacity
                style={styles.inputAddButton}
                onPress={navToAddTagScreen}>
                <Icon source="plus-circle-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <PrimaryButton text="Next" onPress={save}></PrimaryButton>
          </View>
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
  inputAddButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: main_colour,
  },
});
