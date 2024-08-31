import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseScreen} from '../components/BaseScreen.component';
import {Text, Switch, Avatar, IconButton} from 'react-native-paper';
import {useStores} from '../store/mainStore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';

const ToggleButton = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export const SettingsScreen = (): ReactNode => {
  const userStore = useStores();

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        GoogleSignin.revokeAccess(); //stops auto sign in to first selected google account
        console.log('User signed out!');
      });
  };

  return (
    <BaseScreen useSafeArea={true}>
      <View style={styles.fullScreenContainer}>
        <View>
          <View style={styles.headerContainer}>
            <View style={styles.nameContainer}>
              <Avatar.Icon size={44} icon="account" />
              <Text style={styles.name}>{userStore.name}</Text>
            </View>
            <IconButton icon="logout" size={20} onPress={logout} />
          </View>

          {/* <List.Section>
            <List.Subheader>Settings</List.Subheader>
            <List.Item title="Dark mode" right={ToggleButton} />
          </List.Section> */}
        </View>
        <View>
          <Text style={styles.version}>Version {DeviceInfo.getVersion()}</Text>
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
});
