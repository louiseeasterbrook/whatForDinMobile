import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseScreen} from '../../components/BaseScreen.component';
import {Avatar, IconButton} from 'react-native-paper';
import {useStores} from '../../store/mainStore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import {SHADOW_BASE} from '../../index/theme';
import {PrimaryText} from '../../components/PrimaryText.component';
import {SettingsRow} from '../../components/settingsRow.component';

export const SettingsScreen = ({navigation}): ReactNode => {
  const userStore = useStores();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess(); //stops auto sign in to first selected google account
        console.log('User signed out!');
      });
  };

  const navToMealPicker = (): void => navigation.navigate('MealPicker');
  const navToRecipeTag = (): void => navigation.navigate('RecipeTagView');

  return (
    <BaseScreen noStatusBar={false}>
      <View style={styles.fullScreenContainer}>
        <View>
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconButton
                icon="arrow-left"
                size={24}
                onPress={() => navigation.goBack()}
              />
              <Avatar.Icon size={44} icon="account" />
              <PrimaryText addedStyles={styles.name} text={userStore.name} />
            </View>
            <IconButton icon="logout" size={20} onPress={logout} />
          </View>

          <View style={styles.sidePadding}>
            <SettingsRow title="Recipe tags" onPress={navToRecipeTag} topRow />
            <SettingsRow
              title="Search users"
              onPress={() => navigation.navigate('SearchUsers')}
              bottomRow
            />
            {/* <SettingsRow
              title="Meal Picker"
              onPress={navToMealPicker}
              bottomRow></SettingsRow> */}
          </View>
        </View>
        <View>
          <PrimaryText
            addedStyles={styles.version}
            text={`Version ${DeviceInfo.getVersion()}`}
          />
        </View>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    ...SHADOW_BASE,
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  name: {
    paddingLeft: 10,
  },
  fullScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  version: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  sidePadding: {
    marginHorizontal: 20,
  },
});
