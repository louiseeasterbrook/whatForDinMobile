import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeReviewScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeReviewScreen = observer(
  ({navigation}: AddRecipeReviewScreenProps) => {
    const {saveRecipe, steps, ingredients, name} = useAddRecipe();
    const userStore = useStores();

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
          <Appbar.Action
            icon="close"
            onPress={() => {
              navigation.popToTop();
              navigation.goBack();
            }}
          />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <ScrollView>
              <RecipeDisplay
                ingredients={ingredients}
                steps={steps}
                userName={userStore.name}
                recipeName={name}></RecipeDisplay>
            </ScrollView>
            <Button mode="contained" onPress={navToStepsScreen}>
              Save Recipe
            </Button>
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
