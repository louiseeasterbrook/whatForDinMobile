import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  FAB,
  TextInput,
  Icon,
} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {useRef, useState} from 'react';

type EditStepsScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditStepsScreen = observer(
  ({navigation, route}: EditStepsScreenProps) => {
    const {setSteps, steps} = useEditRecipe();

    const initInput = steps?.length ? steps : [];

    const [text, setText] = useState<string>('');
    const [numInputs, setNumInputs] = useState<number>(steps?.length || 1);
    const refInputs = useRef<string[]>(initInput);
    const buttonDisabled = !(
      refInputs.current?.length > 0 && refInputs.current[0]?.length > 0
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

    const navToStepsScreen = async () => {
      setSteps(refInputs.current);
      goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Steps'} />
        </Appbar.Header>

        <View style={styles.main}>
          <ScrollView>
            <>
              <View style={styles.header}>
                <Text variant="headlineSmall">What are your Steps?</Text>
              </View>
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
            <Button mode="contained" onPress={addInput}>
              Add Step
            </Button>
          </ScrollView>
          <Button
            mode="contained"
            onPress={navToStepsScreen}
            disabled={buttonDisabled}>
            Done
          </Button>
        </View>
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
    alignItems: 'center',
    fontWeight: '700',
  },
});
