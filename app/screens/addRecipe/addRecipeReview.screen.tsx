import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  TextInput,
  Icon,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useRef, useState} from 'react';
import {DisplayListWithTitle} from '../recipe/ListWithTitle.component';

type AddRecipeReviewScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeReviewScreen = observer(
  ({navigation}: AddRecipeReviewScreenProps) => {
    const {saveRecipe, formatElementWithList, steps, ingredients} =
      useAddRecipe();

    const goBack = () => {
      navigation.goBack();
    };

    const navToStepsScreen = async () => {
      await saveRecipe();
      navigation.navigate('Tabs');
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => navigation.popToTop()} />
        </Appbar.Header>

        <View style={styles.main}>
          <ScrollView>
            <>
              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Ingredients"
                  orderedList={false}
                  listArray={[
                    formatElementWithList(ingredients),
                  ]}></DisplayListWithTitle>
              </View>

              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Method"
                  orderedList={true}
                  listArray={[
                    formatElementWithList(steps),
                  ]}></DisplayListWithTitle>
              </View>
            </>
          </ScrollView>
          <Button mode="contained" onPress={navToStepsScreen}>
            Save Recipe
          </Button>
        </View>
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
  cardContainer: {
    paddingVertical: 10,
  },
  inputButtonContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  input: {
    width: '90%',
  },
  inputRemoveButton: {
    width: '10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
