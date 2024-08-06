import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text, Appbar, TextInput, Icon} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {useRef, useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {ScrollView} from 'react-native-gesture-handler';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {light_red, main_colour, sharedStyles} from '../../index/theme';

type EditStepsScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditStepsScreen = observer(
  ({navigation, route}: EditStepsScreenProps) => {
    const {setSteps, steps} = useEditRecipe();
    const tempSteps = [...steps];
    const initInput = tempSteps?.length ? tempSteps : [];
    const scrollViewRef = useRef();

    const [text, setText] = useState<string>('');
    const [latestButtonPress, setLatestButtonPress] =
      useState<string>('remove');
    const [numInputs, setNumInputs] = useState<number>(tempSteps?.length || 1);
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
      setSteps(refInputs.current);
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
        <Appbar.Header style={sharedStyles.appBar} elevated={true}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Steps'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View style={styles.header}>
              <Text>Edit your recipe steps</Text>
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
