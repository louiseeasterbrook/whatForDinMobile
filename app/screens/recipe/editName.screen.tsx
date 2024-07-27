import {NavigationProp} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Appbar, TextInput} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {useEditRecipe} from './context/editRecipeProvider';
import {BaseScreen} from '../../components/BaseScreen.component';
import {useState} from 'react';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import {sharedStyles} from '../../index/constants';

type EditNameScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditNameScreen = observer(
  ({navigation, route}: EditNameScreenProps) => {
    const {name, setName} = useEditRecipe();
    const buttonDisabled = name?.length === 0;

    const [tempName, setTempName] = useState<string>(name);

    const goBack = (): void => {
      navigation.goBack();
    };

    const save = (): void => {
      setName(tempName);
      goBack();
    };

    return (
      <>
        <Appbar.Header style={sharedStyles.appBar}>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={'Edit Name'} />
        </Appbar.Header>

        <BaseScreen>
          <View style={styles.main}>
            <View>
              <View style={styles.header}>
                <Text>Edit your recipe name</Text>
              </View>

              <TextInput
                label="Name"
                value={tempName}
                onChangeText={(text: string) => setTempName(text)}
              />
            </View>

            <PrimaryButton
              text="Done"
              onPress={save}
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
  header: {
    paddingVertical: 12,
  },
});
