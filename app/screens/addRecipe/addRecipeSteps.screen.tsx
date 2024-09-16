import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Text,
  Appbar,
  TextInput,
  Icon,
  Portal,
  Dialog,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {light_red, main_colour, sharedStyles} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';

type AddRecipeStepsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeStepsScreen = observer(
  ({navigation}: AddRecipeStepsScreenProps) => {
    const scrollViewRef = useRef();
    const {
      steps,
      setSteps,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
      exitFlowFullBack,
    } = useAddRecipe();

    const [text, setText] = useState<string>('');
    const [latestButtonPress, setLatestButtonPress] =
      useState<string>('remove');
    const [numInputs, setNumInputs] = useState<number>(steps?.length || 1);
    const refInputs = useRef<string[]>(steps);
    const everyRowIsPopulated = (): boolean => {
      return refInputs.current.every(x => x.length > 0);
    };
    const buttonDisabled = Boolean(
      refInputs.current?.length && !everyRowIsPopulated(),
    );

    const setInputValue = (index: number, value: string) => {
      const inputs = refInputs.current;
      inputs[index] = value;
      setText(value);
    };

    const addInput = () => {
      refInputs.current.push('');
      setNumInputs(value => value + 1);
      setLatestButtonPress('add');
    };

    const removeInput = (i: number) => {
      const currentInputArray = refInputs.current;
      if (currentInputArray.length === 1) {
        return;
      }
      refInputs.current.splice(i, 1)[0];
      setNumInputs(value => value - 1);
      setLatestButtonPress('remove');
    };

    const goBack = (): void => {
      setSteps(refInputs.current);
      navigation.goBack();
    };

    const getIngredientsWithNoBlankRows = () => {
      const stepsArray = refInputs.current;
      return stepsArray.filter((step: string) => step !== null || step !== '');
    };

    const saveSteps = () => {
      const ingredientsNoNull = getIngredientsWithNoBlankRows();
      if (ingredientsNoNull.length > 0) {
        setSteps(ingredientsNoNull);
      }
    };

    const navToStepsScreen = async () => {
      saveSteps();
      navigation.navigate('AddComment');
    };

    const scrollViewControl = (
      scrollViewRef: React.MutableRefObject<undefined>,
    ): void => {
      if (latestButtonPress === 'add') {
        scrollViewRef.current.scrollToEnd({animated: true});
      }
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View style={styles.header}>
              <PrimaryText text="Add your recipe steps" />
            </View>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewControl(scrollViewRef)}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flexGrow: 1, paddingBottom: 26}}>
              <>
                {[...Array(numInputs)].map((e, i) => (
                  <View key={i} style={styles.inputButtonContainer}>
                    <TextInput
                      placeholder="Add step..."
                      style={styles.input}
                      value={refInputs.current[i]}
                      onChangeText={(currentValue: string) =>
                        setInputValue(i, currentValue)
                      }
                      autoFocus
                    />
                    {numInputs > 1 ? (
                      <TouchableOpacity
                        style={styles.inputRemoveButton}
                        onPress={() => removeInput(i)}>
                        <Icon source="minus-circle-outline" size={20} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.inputAddButton}
                        onPress={addInput}>
                        <Icon
                          source="plus-circle-outline"
                          size={20}
                          color="white"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </>
              {numInputs > 1 && (
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    style={styles.inputAddButton}
                    onPress={addInput}>
                    <Icon
                      source="plus-circle-outline"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

            <PrimaryButton
              text="Next"
              onPress={navToStepsScreen}
              disabled={buttonDisabled}></PrimaryButton>
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
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  input: {
    width: '83%',
  },
  inputRemoveButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light_red,
    borderRadius: 12,
  },
  addButtonContainer: {
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  inputAddButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: main_colour,
  },
  header: {
    paddingVertical: 12,
  },
  addButton: {
    marginTop: 12,
  },
});
