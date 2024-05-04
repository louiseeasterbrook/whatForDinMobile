import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput} from 'react-native-paper';
import {observer} from 'mobx-react-lite';
import {useState} from 'react';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useEditRecipe} from './context/editRecipeProvider';

type EditRecipeCommentScreenProps = {
  navigation: NavigationProp<any, any>;
};

export const EditRecipeCommentScreen = observer(
  ({navigation}: EditRecipeCommentScreenProps) => {
    const {setComment, comment} = useEditRecipe();
    const [input, setInput] = useState<string>(comment);

    const goBack = (): void => {
      setComment(input);
      navigation.goBack();
    };

    const navToEditScreen = async () => {
      setComment(input);
      goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Add Recipe'} />
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
            <Button mode="contained" onPress={navToEditScreen}>
              Done
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
