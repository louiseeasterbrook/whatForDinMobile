import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  FAB,
  TextInput,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './addRecipeProvider';

type AddRecipeIngredientsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeIngredientsScreen = observer(
  ({navigation}: AddRecipeIngredientsScreenProps) => {
    const {ingredients, setIngredients} = useAddRecipe();

    const goBack = () => {
      navigation.goBack();
    };

    const navToStepsScreen = () => {
      navigation.navigate('AddSteps');
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <TextInput
            label="Ingredients"
            value={ingredients}
            onChangeText={(text: string) => setIngredients(text)}
          />
          <Button mode="contained" onPress={navToStepsScreen}>
            Next
          </Button>
        </ScrollView>
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
