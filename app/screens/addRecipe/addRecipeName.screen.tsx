import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  FAB,
  TextInput,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './addRecipeProvider';

type AddRecipeNameScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeNameScreen = observer(
  ({navigation}: AddRecipeNameScreenProps) => {
    const {name, setName} = useAddRecipe();

    const goBack = () => {
      navigation.goBack();
    };

    const navToIngedientScreen = () => {
      navigation.navigate('AddIngredients');
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
          <Button mode="contained" onPress={navToIngedientScreen}>
            Next
          </Button>
        </ScrollView>
      </>
    );
  },
);

const styles = StyleSheet.create({
  main: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  cardContainer: {
    paddingVertical: 10,
  },
});
