import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Icon} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeStepsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeStepsScreen = observer(
  ({navigation}: AddRecipeStepsScreenProps) => {
    const {setSteps, saveRecipe} = useAddRecipe();

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

    const addInput = () => {
      refInputs.current.push('');
      setNumInputs(value => value + 1);
    };

    const removeInput = (i: number) => {
      const currentInputArray = refInputs.current;
      if (currentInputArray.length === 1) {
        return;
      }
      refInputs.current.splice(i, 1)[0];
      setNumInputs(value => value - 1);
    };

    const goBack = () => {
      navigation.goBack();
    };

    const navToStepsScreen = async () => {
      setSteps(refInputs.current);
      navigation.navigate('AddCategory');
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
            <View style={styles.header}>
              <Text>Add your recipe steps</Text>
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
