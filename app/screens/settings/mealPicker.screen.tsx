import {NavigationProp} from '@react-navigation/native';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Divider} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {sharedStyles} from '../../index/theme';
import {getSortedRecipes} from '../../services/recipeDisplay.service';
import {useStores} from '../../store/mainStore';
import {Recipe} from '../../models/searchResults';

type MealPickerScreen = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const MealPickerScreen = observer(
  ({navigation, route}: MealPickerScreen) => {
    const userStore = useStores();
    const [meals, setMeals] = useState<Recipe[]>();

    const goBack = (): void => {
      Keyboard.dismiss();
      navigation.goBack();
    };

    useState(() => {
      (async () => {
        const res = await getSortedRecipes(userStore.uid, userStore.favourites);
        const meals = getMealsFromRecipeList(res);
        setMeals(meals);
      })();
    });

    const getMealsFromRecipeList = (recipeList: Recipe[]) => {
      return recipeList.filter(r => r);
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Meal Picker'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Select how many meal idea you would like:</Text>
              </View>
              <Divider />
            </View>

            <PrimaryButton
              text="Get meal idea"
              onPress={() => {}}></PrimaryButton>
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
  cardContainer: {
    paddingVertical: 10,
  },
  header: {
    paddingVertical: 12,
  },
});
