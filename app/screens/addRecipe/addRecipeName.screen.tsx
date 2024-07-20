import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Text,
  Appbar,
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useEffect, useRef} from 'react';

type AddRecipeNameScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeNameScreen = observer(
  ({navigation}: AddRecipeNameScreenProps) => {
    const {
      name,
      setName,
      exitFlow,
      showExitDialog,
      closeExitDialog,
      openExitDialog,
    } = useAddRecipe();
    const buttonDisabled = name?.length <= 0;
    const name_input = useRef();

    useEffect(() => {
      name_input.current.focus();
    }, []);

    const goBack = () => {
      navigation.goBack();
    };

    const navToIngedientScreen = () => {
      if (!name) {
        return;
      }
      navigation.navigate('AddIngredients');
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
            <View>
              <View style={styles.header}>
                <Text>Enter your recipe name</Text>
              </View>

              <TextInput
                label="Name"
                value={name}
                onChangeText={(text: string) => setName(text)}
                ref={name_input}
              />
            </View>
            <Button
              mode="contained"
              onPress={navToIngedientScreen}
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
              <Button onPress={() => exitFlow()}>Yes, exit</Button>
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
  header: {
    paddingVertical: 12,
  },
});
