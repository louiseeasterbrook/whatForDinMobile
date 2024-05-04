import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';

type ReviewEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ReviewEditScreen = observer(
  ({navigation}: ReviewEditScreenProps) => {
    const {name, steps, ingredients, updateRecipe} = useEditRecipe();
    const [saving, setSaving] = useState<boolean>(false);
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    const save = () => {
      if (saving) {
        return;
      }
      setSaving(true);
      updateRecipe();
      navigation.popToTop();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Review Recipe'} />
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
            <Button mode="contained" onPress={save} loading={saving}>
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
});
