import React, {ReactNode} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
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
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.fullScreenContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <IconButton
              icon="arrow-left"
              size={24}
              onPress={() => navigation.goBack()}
            />
            <View style={{flex: 1}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <PrimaryText addedStyles={styles.name} text={userStore.name} />
              <Avatar.Icon
                size={40}
                icon="account"
                style={{backgroundColor: '#f2f2f2', marginLeft: 8}}
              />
            </View>
          </View>
          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: '#ececec',
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          />
          {/* Settings Section */}
          <View style={styles.sidePadding}>
            <PrimaryText
              text="Settings"
              size={13}
              textColour="#888"
              addedStyles={{marginBottom: 8, marginLeft: 2}}
            />
            <SettingsRow title="Recipe tags" onPress={navToRecipeTag} topRow />
            <SettingsRow
              title="Search users"
              onPress={() => navigation.navigate('SearchUsers')}
              bottomRow
            />
          </View>
          {/* Spacer */}
          <View style={{flex: 1}} />
          {/* Logout Button */}
          <View style={{alignItems: 'center', marginBottom: 16}}>
            <IconButton
              icon="logout"
              size={24}
              onPress={logout}
              style={{backgroundColor: '#f8d7da', borderRadius: 24}}
            />
            <PrimaryText
              text="Logout"
              size={13}
              textColour="#c0392b"
              addedStyles={{marginTop: -8, marginBottom: 8}}
            />
          </View>
          {/* Version Info */}
          <PrimaryText
            addedStyles={styles.version}
            text={`Version ${DeviceInfo.getVersion()}`}
          />
        </View>
      </SafeAreaView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
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
    paddingBottom: 10,
    color: '#aaa',
    fontSize: 12,
  },
  sidePadding: {
    marginHorizontal: 20,
  },
});
