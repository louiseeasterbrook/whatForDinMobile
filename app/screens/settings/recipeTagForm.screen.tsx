import {NavigationProp} from '@react-navigation/native';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Divider} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useEffect, useState} from 'react';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {
  light_blue,
  light_green,
  light_orange,
  light_pink,
  light_purple,
  light_yellow,
  sharedStyles,
} from '../../index/theme';
import {useStores} from '../../store/mainStore';
import {RecipeTag} from '../../models/searchResults';
import {FlatList} from 'react-native-gesture-handler';
import {Option} from '../../components/Option.component';
import {PrimaryText} from '../../components/PrimaryText.component';
import {UpdateUser} from '../../services/userDBservice';

type RecipeTagFormScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const RecipeTagFormScreen = observer(
  ({navigation, route}: RecipeTagFormScreenProps) => {
    const userStore = useStores();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [selectedColour, setSelectedColour] = useState<string>();
    const [selectedIcon, setSelectedIcon] = useState<string>();
    const validForm = selectedColour && selectedIcon && name;
    const colours = [
      light_green,
      light_blue,
      light_pink,
      light_purple,
      light_orange,
      light_yellow,
    ];
    const icons = [
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

    useEffect(() => {
      console.log(selectedColour);
    }, [selectedColour]);

    const saveNewRecipeTag = () => {
      if (!validForm) {
        return;
      }
      setLoading(true);
      console.log(selectedColour);
      const newTagList = getNewTagArray();
      console.log('SAVE ', newTagList);

      UpdateUser(userStore.uid, {RecipeTags: newTagList});
      goBack();
    };

    const getNewTagArray = (): RecipeTag[] => {
      const newTag: RecipeTag = {
        Title: name,
        Icon: selectedIcon,
        Colour: selectedColour,
      };
      const originalTagList: RecipeTag[] = userStore.recipeTags?.length
        ? userStore.recipeTags
        : [];
      return [...originalTagList, newTag];
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Create recipe tag'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              {/*
              <Tag title="dinner" colour="red" onPress={() => {}} /> */}
              <TextInput
                label="Tag name"
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
              <View style={styles.header}>
                <PrimaryText text="Select a colour"></PrimaryText>
              </View>
              <Divider />
              <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={colours}
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
              <Divider />
              <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={icons}
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
              onPress={saveNewRecipeTag}></PrimaryButton>
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
