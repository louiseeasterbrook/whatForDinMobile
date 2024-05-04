import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Icon} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';

type EditIngredientsScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditIngredientsScreen = observer(
  ({navigation, route}: EditIngredientsScreenProps) => {
    const {setIngredients, ingredients} = useEditRecipe();
    const initInput = ingredients?.length ? ingredients : [];

    const [text, setText] = useState<string>('');
    const [numInputs, setNumInputs] = useState<number>(
      ingredients?.length || 1,
    );
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
    };

    const removeInput = (i: number) => {
      refInputs.current.splice(i, 1)[0];
      setNumInputs(value => value - 1);
    };

    const goBack = () => {
      navigation.goBack();
    };

    const navToEditScreen = async () => {
      setIngredients(refInputs.current);
      goBack();
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

            <Button
              mode="contained"
              onPress={navToEditScreen}
              disabled={buttonDisabled}>
              Done
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
  header: {
    paddingVertical: 12,
  },
  addButton: {
    marginTop: 12,
  },
});
