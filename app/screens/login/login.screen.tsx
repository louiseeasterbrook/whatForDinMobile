import {ReactNode, useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import {BaseScreen} from '../../components/BaseScreen.component';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {main_colour} from '../../index/theme';
import {isValidEmailFormat} from '../../models/validation';
import {PrimaryButton} from '../../components/PrimaryButton.component';
import LottieView from 'lottie-react-native';

GoogleSignin.configure({
  webClientId: process.env.ANDROID_GOOGLE_LOGIN_TOKEN,
});

export const LoginScreen = ({navigation}): ReactNode => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const loadingInProgress = loading || googleLoading;
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const emailError = isValidEmailFormat(email);
  const [password, setPassword] = useState<string>();

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  const emailHasError = (): boolean => {
    console.log('---- ', isValidEmailFormat(email));
    return !isValidEmailFormat(email);
  };
  useEffect(() => {}, [emailError]);

  async function onGoogleButtonPress(): Promise<void> {
    if (loadingInProgress) {
      return;
    }
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      setGoogleLoading(true);
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log('==============');
      console.log(err);
      console.log('==============');
      showDialog();
      setGoogleLoading(false);
    }
  }

  async function loginPress(): Promise<void> {
    if (loadingInProgress || !email || !password) {
      return;
    }
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in!');
      })
      .catch(error => {
        showDialog();
        setLoading(false);
        console.error(error);
      });
  }

  const navToSignUp = (): void => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <>
      <BaseScreen useSafeArea={true} backgroundColor="white">
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled={true}>
          <View style={styles.mainContainer}>
            <View style={{flex: 1}}>
              <View style={styles.titleContainer}>
                <LottieView
                  style={{height: 300, width: 300}}
                  source={require('./kitchen_lottie.json')}
                  autoPlay
                  loop
                />
                <Text style={styles.title}>What's for din?</Text>
              </View>

              <View style={{paddingHorizontal: 20}}>
                <PrimaryButton
                  text="Sign in with Google"
                  onPress={onGoogleButtonPress}
                  loading={googleLoading}></PrimaryButton>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BaseScreen>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Opps, Something's gone wrong</Dialog.Title>
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
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: '70%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  bottomText: {
    width: '100%',
    textAlign: 'center',
    bottom: 18,
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
  logo: {
    width: 210 * 0.7,
    height: 210,
  },
});
