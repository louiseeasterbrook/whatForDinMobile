import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {SettingsRow} from '../../components/settingsRow.component';
import {useEditRecipe} from './context/editRecipeProvider';
import {sharedStyles} from '../../index/theme';
import {PrimaryButton} from '../../components/PrimaryButton.component';

type EditMenuScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditMenuScreen = observer(({navigation}: EditMenuScreenProps) => {
  const {anyChanges} = useEditRecipe();

  const goBack = (): void => {
    navigation.goBack();
  };

  const navToName = (): void => navigation.navigate('EditName');
  const navToIngredients = (): void => navigation.navigate('EditIngredients');
  const navToSteps = (): void => navigation.navigate('EditSteps');
  const navToComment = (): void => navigation.navigate('EditComment');
  const navToImage = (): void => navigation.navigate('EditImage');

  return (
    <>
      <Appbar.Header style={sharedStyles.appBar} elevated={true}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Edit Recipe'} />
      </Appbar.Header>

      <BaseScreen>
        <View style={styles.mainContainer}>
          <ScrollView
            style={{
              overflow: 'visible',
              // padding: 10,
              // margin: 10,
            }}
            contentContainerStyle={{
              overflow: 'visible',
              // padding: 10,
              // margin: 10,
            }}>
            <SettingsRow
              title="Name"
              onPress={navToName}
              topRow
              icon="pencil"></SettingsRow>
            <SettingsRow
              title="Ingredients"
              onPress={navToIngredients}
              icon="pencil"></SettingsRow>
            <SettingsRow
              title="Steps"
              onPress={navToSteps}
              icon="pencil"></SettingsRow>
            <SettingsRow
              title="Comment"
              onPress={navToComment}
              icon="pencil"></SettingsRow>
            <SettingsRow
              title="Image"
              onPress={navToImage}
              bottomRow
              icon="pencil"></SettingsRow>
          </ScrollView>

          {anyChanges() && (
            <PrimaryButton
              text="Review Changes"
              onPress={() => navigation.navigate('ReviewEdit')}></PrimaryButton>
          )}
        </View>
      </BaseScreen>
    </>
  );
});
const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});
