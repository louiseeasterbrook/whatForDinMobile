import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {SettingsRow} from '../../components/settingsRow.component';
import {useEditRecipe} from './context/editRecipeProvider';
import {sharedStyles} from '../../index/theme';

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

  return (
    <>
      <Appbar.Header style={sharedStyles.appBar}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Edit Recipe'} />
      </Appbar.Header>

      <BaseScreen>
        <View style={styles.mainContainer}>
          <ScrollView>
            <>
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
                bottomRow
                icon="pencil"></SettingsRow>
            </>
          </ScrollView>

          {anyChanges() && (
            <Button
              mode="contained"
              onPress={() => navigation.navigate('ReviewEdit')}>
              Review Changes
            </Button>
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
    paddingBottom: 26,
  },
});
