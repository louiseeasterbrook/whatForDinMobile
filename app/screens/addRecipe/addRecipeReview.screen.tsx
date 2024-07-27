import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar, Portal, Dialog, Text} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';
import {ScreenDimmer} from '../../components/ScreenDimmer.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {sharedStyles} from '../../index/constants';

type AddRecipeReviewScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeReviewScreen = observer(
  ({navigation}: AddRecipeReviewScreenProps) => {
    const [saving, setSaving] = useState<boolean>();
    const {
      saveRecipe,
      steps,
      ingredients,
      name,
      comment,
      exitFlowFullBack,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
    } = useAddRecipe();
    const userStore = useStores();

    const goBack = () => {
      navigation.goBack();
    };

    const navToHomeScreen = async () => {
      if (saving) {
        return;
      }
      setSaving(true);
      // waiting a miminum of 1.5 seconds to return finsihing api response
      await Promise.all([saveRecipe(), delayPromise(1500)]);
      navigation.navigate('Tabs');
    };

    const delayPromise = async (milliseconds: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    return (
      <>
        {saving && <ScreenDimmer />}
        <Appbar.Header style={sharedStyles.appBar}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
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
              onPress={navToHomeScreen}
              loading={saving}></PrimaryButton>
          </View>
        </BaseScreen>
        <Portal>
          <Dialog visible={showExitDialog} onDismiss={() => closeExitDialog()}>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure you want to exit the create recipe flow?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => closeExitDialog()}>Cancel</Button>
              <Button onPress={() => exitFlowFullBack()}>Yes, exit</Button>
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
