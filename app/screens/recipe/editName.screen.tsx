import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput} from 'react-native-paper';
import {useStores} from '../../store/mainStore';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';

type EditNameScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditNameScreen = observer(
  ({navigation, route}: EditNameScreenProps) => {
    const userStore = useStores();
    const {name, setName} = useEditRecipe();
    const buttonDisabled = name?.length === 0;

    const goBack = () => {
      navigation.goBack();
    };

    const save = () => {
      setName(name);
      goBack();
    };

    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Name'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Edit your Recipe Name</Text>
              </View>

              <TextInput
                label="Name"
                value={name}
                onChangeText={(text: string) => setName(text)}
              />
            </View>
            <Button mode="contained" onPress={save} disabled={buttonDisabled}>
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
  cardContainer: {
    paddingVertical: 10,
  },
  header: {
    paddingVertical: 12,
  },
});
