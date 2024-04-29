import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Icon} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {ScrollView} from 'react-native-gesture-handler';

type AddRecipeIngredientsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeIngredientsScreen = observer(
  ({navigation}: AddRecipeIngredientsScreenProps) => {
    const {setIngredients} = useAddRecipe();

    const [text, setText] = useState<string>('');
    const [numInputs, setNumInputs] = useState<number>(1);
    const refInputs = useRef<string[]>([text]);
    const buttonDisabled = Boolean(
      refInputs.current?.length && refInputs.current[0].length <= 0,
    );

    const setInputValue = (index: number, value: string) => {
      const inputs = refInputs.current;
      inputs[index] = value;
      setText(value);
    };

    const addInput = (): void => {
      refInputs.current.push('');
      setNumInputs(value => value + 1);
    };

    const removeInput = (i: number): void => {
      const currentInputArray = refInputs.current;
      if (currentInputArray.length === 1) {
        return;
      }
      refInputs.current.splice(i, 1)[0];
      setNumInputs(value => value - 1);
    };

    const goBack = (): void => {
      navigation.goBack();
    };

    const navToStepsScreen = () => {
      const ingredientArray = refInputs.current;
      const ingredientsNoNull = ingredientArray.filter(
        (ingredient: string) => ingredient !== null || ingredient !== '',
      );
      if (ingredientsNoNull.length > 0) {
        setIngredients(ingredientsNoNull);
        navigation.navigate('AddSteps');
      }
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
          <Appbar.Action
            icon="close"
            onPress={() => {
              navigation.popToTop();
              navigation.goBack();
            }}
          />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Add your Ingredients</Text>
              </View>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, paddingBottom: 26}}>
                <>
                  {[...Array(numInputs)].map((e, i) => (
                    <View key={i} style={styles.inputButtonContainer}>
                      <TextInput
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
            </View>
            <Button
              mode="contained"
              onPress={navToStepsScreen}
              disabled={buttonDisabled}>
              Next
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
