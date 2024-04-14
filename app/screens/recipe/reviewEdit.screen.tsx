import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {DisplayListWithTitle} from './ListWithTitle.component';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text, Appbar, FAB} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';

type ReviewEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ReviewEditScreen = observer(
  ({navigation, route}: ReviewEditScreenProps) => {
    const {name, steps, ingredients, updateRecipe} = useEditRecipe();

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
            <>
              <Text variant="headlineSmall">{name}</Text>
              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Ingredients"
                  orderedList={false}
                  listSteps={ingredients}></DisplayListWithTitle>
              </View>

              <View style={styles.cardContainer}>
                <DisplayListWithTitle
                  title="Method"
                  orderedList={true}
                  listSteps={steps}></DisplayListWithTitle>
              </View>
            </>
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
