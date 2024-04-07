import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {BaseScreen} from '../components/BaseScreen.component';
import {
  Button,
  Text,
  TextInput,
  Divider,
  List,
  Switch,
  Avatar,
  Icon,
  IconButton,
} from 'react-native-paper';
import {useStores} from '../store/mainStore';
import auth from '@react-native-firebase/auth';

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
      .then(() => console.log('User signed out!'));
  };

  return (
    <BaseScreen>
      <View style={styles.fullScreenContainer}>
        <View>
          <View style={styles.nameContainer}>
            <View style={styles.nameContainer}>
              <Avatar.Icon size={44} icon="account" />
              <Text style={styles.name}>{userStore.name}</Text>
            </View>
            <IconButton icon="logout" size={20} onPress={logout} />
          </View>
          <Divider />

          <List.Section>
            <List.Subheader>Settings</List.Subheader>
            <List.Item title="Dark mode" right={ToggleButton} />
          </List.Section>
        </View>
        <View>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
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
