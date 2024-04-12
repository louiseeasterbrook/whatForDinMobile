import {ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, FlatList} from 'react-native';
import {Button, Text, TextInput, Divider, Chip} from 'react-native-paper';
import {Recipe} from '../../models/searchResults';
import {BaseScreen} from '../../components/BaseScreen.component';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const LoginScreen = ({navigation}): ReactNode => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.ANDROID_GOOGLE_LOGIN_TOKEN,
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <BaseScreen>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Whats for din</Text>
      </View>
      <Button mode="contained" onPress={onGoogleButtonPress}>
        Google Sign In
      </Button>
    </BaseScreen>
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
});
