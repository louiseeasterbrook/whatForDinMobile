import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useAddRecipe} from './context/addRecipeProvider';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';

type AddRecipeCommentScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const AddRecipeCommentScreen = observer(
  ({navigation}: AddRecipeCommentScreenProps) => {
    const [input, setInput] = useState<string>();
    const {setComment} = useAddRecipe();

    const goBack = (): void => {
      navigation.goBack();
    };

    const navToStepsScreen = (): void => {
      setComment(input);
      navigation.navigate('Review');
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
                <Text>Add a comment to your recipe</Text>
              </View>
              <TextInput
                multiline
                numberOfLines={2}
                placeholder="Add comment..."
                value={input}
                onChangeText={setInput}
              />
            </View>
            <Button mode="contained" onPress={navToStepsScreen}>
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
  header: {
    paddingVertical: 12,
  },
});
