import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import {useStores} from '../../store/mainStore';

type ReviewEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ReviewEditScreen = observer(
  ({navigation, route}: ReviewEditScreenProps) => {
    const {name, steps, ingredients, updateRecipe} = useEditRecipe();
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    const save = () => {
      updateRecipe();
      navigation.popToTop();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Review Recipe'} />
        </Appbar.Header>

        <View style={styles.main}>
          <ScrollView>
            <RecipeDisplay
              ingredients={ingredients}
              steps={steps}
              userName={userStore.name}
              recipeName={name}></RecipeDisplay>
          </ScrollView>
          <Button mode="contained" onPress={save}>
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
  },
  cardContainer: {
    paddingVertical: 10,
  },
});
