import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeNameScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeNameScreen = observer(
  ({navigation}: AddRecipeNameScreenProps) => {
    const {name, setName} = useAddRecipe();
    const buttonDisabled = name?.length <= 0;

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
          <Appbar.Action icon="close" onPress={() => navigation.popToTop()} />
        </Appbar.Header>
        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Enter your Recipe Name</Text>
              </View>

              <TextInput
                label="Name"
                value={name}
                onChangeText={(text: string) => setName(text)}
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
