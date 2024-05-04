import {NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Button, Appbar} from 'react-native-paper';

import {observer} from 'mobx-react-lite';
import {BaseScreen} from '../../components/BaseScreen.component';
import {SettingsRow} from '../../components/settingsRow.component';

type EditMenuScreenProps = {
  navigation: NavigationProp<any, any>;
  route: any;
};

export const EditMenuScreen = observer(({navigation}: EditMenuScreenProps) => {
  const goBack = () => {
    navigation.goBack();
  };

  const navToName = () => navigation.navigate('EditName');
  const navToIngredients = () => navigation.navigate('EditIngredients');
  const navToSteps = () => navigation.navigate('EditSteps');
  const navToComment = () => navigation.navigate('EditComment');

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Edit Recipe'} />
      </Appbar.Header>

      <BaseScreen>
        <View style={styles.mainContainer}>
          <ScrollView>
            <>
              <SettingsRow title="Name" onPress={navToName}></SettingsRow>
              <SettingsRow
                title="Ingredients"
                onPress={navToIngredients}></SettingsRow>
              <SettingsRow title="Steps" onPress={navToSteps}></SettingsRow>
              <SettingsRow title="Comment" onPress={navToComment}></SettingsRow>
            </>
          </ScrollView>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('ReviewEdit')}>
            Review Changes
          </Button>
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
  cardContainer: {
    // paddingTop: 10,
  },
});
