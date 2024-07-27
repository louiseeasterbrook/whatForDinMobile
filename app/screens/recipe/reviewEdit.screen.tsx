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
import {ScreenDimmer} from '../../components/ScreenDimmer.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';

type ReviewEditScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const ReviewEditScreen = observer(
  ({navigation}: ReviewEditScreenProps) => {
    const {name, steps, ingredients, updateRecipe, comment} = useEditRecipe();
    const [saving, setSaving] = useState<boolean>(false);
    const userStore = useStores();

    const goBack = (): void => {
      navigation.goBack();
    };

    const save = async (): Promise<void> => {
      if (saving) {
        return;
      }
      setSaving(true);
      // waiting a miminum of 1.5 seconds to return finsihing api response
      await Promise.all([updateRecipe(), delayPromise(1500)]);
      navigation.popToTop();
    };

    const delayPromise = async (milliseconds: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    return (
      <>
        {saving && <ScreenDimmer />}
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
                recipeName={name}
                comments={comment}></RecipeDisplay>
            </ScrollView>

            <PrimaryButton
              text="Save Recipe"
              onPress={save}
              loading={saving}></PrimaryButton>
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
