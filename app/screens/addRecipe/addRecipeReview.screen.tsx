import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Appbar, Portal} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {RecipeDisplay} from '../../components/recipeDisplay.component';
import {useStores} from '../../store/mainStore';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';
import {ScreenDimmer} from '../../components/ScreenDimmer.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {sharedStyles} from '../../index/theme';
import {SharedDialog} from '../../components/sharedDialog.component';
import {RecipeTag} from '../../models/searchResults';

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
      tagIds,
      exitFlowFullBack,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
      imageData,
    } = useAddRecipe();
    const userStore = useStores();

    const getRecipeTagsFromIds = (): RecipeTag[] => {
      return (
        tagIds &&
        userStore.recipeTags &&
        userStore.recipeTags.filter(t => tagIds.includes(t.Id))
      );
    };

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
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <ScrollView>
              <RecipeDisplay
                tags={getRecipeTagsFromIds()}
                ingredients={ingredients}
                steps={steps}
                userName={userStore.name}
                recipeName={name}
                comments={comment}
                imageArray={imageData?.uri && [imageData.uri]}></RecipeDisplay>
            </ScrollView>

            <View style={styles.padding}>
              <PrimaryButton
                text="Save Recipe"
                onPress={navToHomeScreen}
                loading={saving}></PrimaryButton>
            </View>
          </View>
        </BaseScreen>
        <Portal>
          <SharedDialog
            showDialog={showExitDialog}
            exitDialog={() => closeExitDialog()}
            text={'Are you sure you want to exit the create recipe flow?'}
            leftButton="Cancel"
            rightButton="Yes, exit"
            leftButtonPress={() => closeExitDialog()}
            rightButtonPress={() => exitFlowFullBack()}></SharedDialog>
        </Portal>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 26,
  },
  padding: {
    paddingLeft: 15,
    paddingRight: 15,
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
