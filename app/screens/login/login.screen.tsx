import {ReactNode, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {BaseScreen} from '../../components/BaseScreen.component';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const LoginScreen = ({navigation}): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.ANDROID_GOOGLE_LOGIN_TOKEN,
    });
  }, []);

  async function onGoogleButtonPress(): Promise<void> {
    if (loading) {
      return;
    }
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      setLoading(true);
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .then(res => setLoading(false));
    } catch (err) {
      showDialog();
      setLoading(false);
    }
  }

  return (
    <>
      <BaseScreen useSafeArea={true}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>what's for din?</Text>
          </View>
          <Button
            mode="contained"
            onPress={onGoogleButtonPress}
            loading={loading}>
            Sign In
          </Button>
        </View>
      </BaseScreen>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Opps, Somethings gone wrong</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              We were unable to sign you in, please try again.
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
  titleContainer: {
    height: '40%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  mainContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
