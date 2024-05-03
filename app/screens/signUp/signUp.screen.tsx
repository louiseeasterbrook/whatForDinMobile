import {ReactNode, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  Appbar,
} from 'react-native-paper';
import {BaseScreen} from '../../components/BaseScreen.component';
import {ScrollView} from 'react-native-gesture-handler';
import {main_colour} from '../../index/theme';
import auth from '@react-native-firebase/auth';

export const SignUpScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const buttonDisabled = !email || !password || !firstName || !lastName;

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  async function createUserPress(): Promise<void> {
    console.log(email, ' ', password);
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in!');
      })
      .catch(error => {
        showDialog();
        setLoading(false);
        console.error(error);
      });
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Sign up'} />
      </Appbar.Header>
      <BaseScreen>
        <View style={styles.mainContainer}>
          <ScrollView>
            <TextInput
              style={styles.paddingBottom}
              label="First Name"
              value={firstName}
              onChangeText={(text: string) => setFirstName(text)}
            />
            <TextInput
              style={styles.paddingBottom}
              label="Last Name"
              value={lastName}
              onChangeText={(text: string) => setLastName(text)}
            />
            <TextInput
              style={styles.paddingBottom}
              label="Email"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
            />
            <TextInput
              style={styles.paddingBottom}
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text: string) => setPassword(text)}
            />
          </ScrollView>

          <Button
            mode="contained"
            onPress={createUserPress}
            loading={loading}
            style={styles.button}
            disabled={buttonDisabled}>
            Sign up
          </Button>
        </View>
      </BaseScreen>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Opps, Something's gone wrong</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              We were unable to create a login for you, please try again.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  paddingBottom: {
    marginBottom: 8,
  },
  loginDivider: {
    textAlign: 'center',
    marginBottom: 8,
  },
  colouredText: {
    color: main_colour,
    fontWeight: '700',
  },
  button: {
    marginBottom: 26,
  },
});
