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
import {useEffect, useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeStepsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeStepsScreen = observer(
  ({navigation}: AddRecipeStepsScreenProps) => {
    const scrollViewRef = useRef();
    const {
      setSteps,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
      exitFlowFullBack,
    } = useAddRecipe();

    const [text, setText] = useState<string>('');
    const [latestButtonPress, setLatestButtonPress] =
      useState<string>('remove');
    const [numInputs, setNumInputs] = useState<number>(1);
    const refInputs = useRef<string[]>([text]);
    const everyRowIsPopulated = (): boolean => {
      return refInputs.current.every(x => x.length > 0);
    };
    const buttonDisabled = Boolean(
      refInputs.current?.length && !everyRowIsPopulated(),
    );
    const firstInput = useRef();

    useEffect(() => {
      firstInput.current.focus();
    }, []);

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

    const goBack = () => {
      navigation.goBack();
    };

    const navToStepsScreen = async () => {
      setSteps(refInputs.current);
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
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action icon="close" onPress={() => openExitDialog()} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text>Add your recipe steps</Text>
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
                      placeholder="Add step.."
                      style={styles.input}
                      value={refInputs.current[i]}
                      onChangeText={(currentValue: string) =>
                        setInputValue(i, currentValue)
                      }
                      ref={firstInput}
                    />
                    <TouchableOpacity
                      style={styles.inputRemoveButton}
                      onPress={() => removeInput(i)}>
                      <Icon source="minus-circle-outline" size={20} />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
              <Button
                mode="contained"
                onPress={addInput}
                style={styles.addButton}>
                Add step
              </Button>
            </ScrollView>

            <Button
              mode="contained"
              onPress={navToStepsScreen}
              disabled={buttonDisabled}>
              Next
            </Button>
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
  header: {
    paddingVertical: 12,
  },
  addButton: {
    marginTop: 12,
  },
});
