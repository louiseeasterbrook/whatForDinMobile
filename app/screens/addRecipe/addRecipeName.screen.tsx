import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  Appbar,
  FAB,
  TextInput,
  ProgressBar,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';

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

        <View style={styles.main}>
          <View>
            <View style={styles.header}>
              <Text variant="headlineSmall">What's your Recipe Name?</Text>
            </View>

            <TextInput
              label="Name"
              value={name}
              onChangeText={(text: string) => setName(text)}
            />
          </View>
          <Button mode="contained" onPress={navToIngedientScreen}>
            Next
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
  header: {
    alignItems: 'center',
    fontWeight: '700',
  },
});
