import {NavigationProp} from '@react-navigation/native';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  Button,
  Appbar,
  TextInput,
  Divider,
  Portal,
  Dialog,
} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {
  aqua,
  light_blue,
  light_green,
  light_greenYellow,
  light_orange,
  light_pink,
  light_purple,
  light_red,
  light_yellow,
  purple_blue,
  sharedStyles,
} from '../../index/theme';
import {useStores} from '../../store/mainStore';
import {RecipeTag} from '../../models/searchResults';
import {FlatList} from 'react-native-gesture-handler';
import {Option} from '../../components/Option.component';
import {PrimaryText} from '../../components/PrimaryText.component';
import {GetUser, UpdateUser} from '../../services/userDBservice';

type RecipeTagFormScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const RecipeTagFormScreen = observer(
  ({navigation, route}: RecipeTagFormScreenProps) => {
    const userStore = useStores();
    const tag: RecipeTag = route.params?.tag;
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>(tag?.Title || null);
    const [selectedColour, setSelectedColour] = useState<string>(
      tag?.Colour || null,
    );
    const [selectedIcon, setSelectedIcon] = useState<string>(tag?.Icon || null);
    const validForm: boolean =
      Boolean(selectedColour) && Boolean(selectedIcon) && Boolean(name);
    const showDialog: () => void = () => setShowDeleteDialog(true);
    const hideDialog: () => void = () => setShowDeleteDialog(false);
    const colours = [
      light_green,
      light_blue,
      // purple_blue,
      light_pink,
      light_purple,
      light_orange,
      light_yellow,
      // light_greenYellow,
      light_red,
      // aqua,
    ];
    const icons: string[] = [
      'pasta',
      'noodles',
      'hamburger',
      'cupcake',
      'food-drumstick',
      'food-apple',
      'coffee',
      'carrot',
      'rice',
      'ice-cream',
      'heart',
    ];

    const goBack = (): void => {
      Keyboard.dismiss();
      navigation.goBack();
    };

    const saveTag = (): void => {
      setLoading(true);
      const newTagArray = tag ? editTagArray() : getNewTagArray();
      sendNewTagArrayToDB(newTagArray);
      goBack();
    };

    const getNewTagArray = (): RecipeTag[] => {
      const newTag: RecipeTag = {
        Title: name,
        Icon: selectedIcon,
        Colour: selectedColour,
        Id: Math.random().toString(16).slice(2),
      };
      const originalTagList: RecipeTag[] = userStore.recipeTags?.length
        ? userStore.recipeTags
        : [];
      return [...originalTagList, newTag];
    };

    const editTagArray = (): RecipeTag[] => {
      const editTag = {
        Title: name,
        Icon: selectedIcon,
        Colour: selectedColour,
        Id: tag.Id,
      };

      const tagArray = removeTagFromArray(tag.Id);
      return [...tagArray, editTag];
    };

    const removeTagFromArray = (id: string): RecipeTag[] => {
      return [...userStore?.recipeTags].filter(t => t.Id !== id);
    };

    const sendNewTagArrayToDB = async (array: RecipeTag[]) => {
      await UpdateUser(userStore.uid, {RecipeTags: array});
      await updateTagsInState();
    };

    const deleteTag = (): void => {
      const newTagArray = removeTagFromArray(tag.Id);
      sendNewTagArrayToDB(newTagArray);
      hideDialog();
      goBack();
    };

    const updateTagsInState = async (): Promise<void> => {
      const user = await GetUser(userStore.uid);
      const newTags = user?._data?.RecipeTags;
      if (newTags) {
        userStore.setRecipeTags(newTags);
      }
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content
            title={tag ? 'Edit recipe tag' : 'Create recipe tag'}
          />
          {tag && <Appbar.Action icon="delete" onPress={showDialog} />}
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              <TextInput
                label="Tag name"
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
              <View style={styles.header}>
                <PrimaryText text="Select a colour"></PrimaryText>
              </View>
              <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={colours}
                contentContainerStyle={{paddingBottom: 12}}
                ItemSeparatorComponent={() => (
                  <View style={{marginRight: 10, paddingVertical: 4}} />
                )}
                renderItem={({item}) => (
                  <Option
                    title={item}
                    colour={item}
                    onPress={() => setSelectedColour(item)}
                    selected={selectedColour === item}
                  />
                )}
              />
              <View style={styles.header}>
                <PrimaryText text="Select an icon"></PrimaryText>
              </View>
              <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={icons}
                contentContainerStyle={{paddingBottom: 12}}
                ItemSeparatorComponent={() => (
                  <View style={{marginRight: 10, paddingVertical: 4}} />
                )}
                renderItem={({item}) => (
                  <Option
                    title={item}
                    icon={item}
                    onPress={() => setSelectedIcon(item)}
                    selected={selectedIcon === item}
                  />
                )}
              />
            </View>

            <PrimaryButton
              text="Save"
              disabled={!validForm}
              loading={loading}
              onPress={saveTag}></PrimaryButton>
          </View>
        </BaseScreen>
        <Portal>
          <Dialog visible={showDeleteDialog} onDismiss={hideDialog}>
            <Dialog.Content>
              <PrimaryText text="Are you sure you want to delete this recipe tag?"></PrimaryText>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={hideDialog}>No</Button>
              <Button onPress={deleteTag}>Yes, please delete</Button>
            </Dialog.Actions>
          </Dialog>
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
    paddingVertical: 26,
  },
  cardContainer: {
    paddingVertical: 10,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 12,
  },
});
