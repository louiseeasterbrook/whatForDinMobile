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
  TextInput,
} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './addRecipeProvider';

type AddRecipeStepsScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeStepsScreen = observer(
  ({navigation}: AddRecipeStepsScreenProps) => {
    const {steps, setSteps} = useAddRecipe();

    const goBack = () => {
      navigation.goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
        </Appbar.Header>

        <ScrollView style={styles.main}>
          <TextInput
            label="Steps"
            value={steps}
            onChangeText={(text: string) => setSteps(text)}
          />
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('Tabs');
              console.log('save');
            }}>
            Save Recipe
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
