import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Icon} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {PrimaryButton} from '../../components/PrimaryButton.component';

type EditIngredientsScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditIngredientsScreen = observer(
  ({navigation, route}: EditIngredientsScreenProps) => {
    const {setIngredients, ingredients} = useEditRecipe();
    const tempIng = [...ingredients];
    const initInput = tempIng?.length ? tempIng : [];
    const scrollViewRef = useRef();

    const [text, setText] = useState<string>('');
    const [latestButtonPress, setLatestButtonPress] =
      useState<string>('remove');
    const [numInputs, setNumInputs] = useState<number>(tempIng?.length || 1);
    const refInputs = useRef<string[]>(initInput);
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
      refInputs.current.splice(i, 1)[0];
      setNumInputs(value => value - 1);
      setLatestButtonPress('remove');
    };

    const goBack = () => {
      navigation.goBack();
    };

    const navToEditScreen = async () => {
      setIngredients(refInputs.current);
      goBack();
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
          <Appbar.Content title={'Edit Ingredients'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text>Edit your ingredients</Text>
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
                      placeholder="Add ingredient.."
                      style={styles.input}
                      value={refInputs.current[i]}
                      onChangeText={(currentValue: string) =>
                        setInputValue(i, currentValue)
                      }
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
                Add ingredient
              </Button>
            </ScrollView>

            <PrimaryButton
              text="Done"
              onPress={navToEditScreen}
              disabled={buttonDisabled}></PrimaryButton>
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
  header: {
    paddingVertical: 12,
  },
  addButton: {
    marginTop: 12,
  },
});
