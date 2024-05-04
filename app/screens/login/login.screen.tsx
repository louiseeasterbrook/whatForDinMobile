import {ReactNode, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  HelperText,
} from 'react-native-paper';
import {BaseScreen} from '../../components/BaseScreen.component';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';
import {main_colour} from '../../index/theme';
import {isValidEmailFormat} from '../../models/validation';

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
      <BaseScreen useSafeArea={true}>
        <View style={styles.mainContainer}>
          <View style={{flex: 1}}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>what's for din?</Text>
            </View>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <ScrollView
                style={{flex: 1}}
                contentContainerStyle={{paddingHorizontal: 20}}>
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
                <Button
                  mode="contained"
                  onPress={loginPress}
                  loading={loading}
                  style={styles.paddingBottom}>
                  Sign In
                </Button>

                <Text style={styles.loginDivider}>or</Text>
                <Button
                  mode="contained"
                  onPress={onGoogleButtonPress}
                  loading={googleLoading}
                  style={styles.paddingBottom}>
                  Sign in with Google
                </Button>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <Text style={styles.bottomText} onPress={navToSignUp}>
            Don't have an account?
            <Text style={styles.colouredText}> Sign up here</Text>
          </Text>
        </View>
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
    height: '50%',
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
});
