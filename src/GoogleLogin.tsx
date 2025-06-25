'use client';

import { useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '677741468162-5hpfg3t8o84drd1gdu3fi333a5j7kq78.apps.googleusercontent.com',
      // Add these additional configurations for better reliability
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: 'YOUR_IOS_CLIENT_ID', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info.plist you'll need to add this line.
    });
  }, []);

  const signIn = async () => {
    try {
      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get user info
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      // Access user data properly
      //@ts-ignore
      const user = userInfo.data?.user || userInfo.user;
      Alert.alert('Success', `Welcome ${user?.name || 'User'}`);

      // You can now use the user info for your app logic
      // For example, send to your backend or store in state management
    } catch (error: any) {
      console.log('Sign in error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available');
      } else {
        Alert.alert('Error', `Something went wrong: ${error.message}`);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      Alert.alert('Success', 'Signed out successfully');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      if (currentUser) {
        console.log('Current user:', currentUser);
        Alert.alert('Current User', `Logged in as: ${currentUser.user.name}`);
      } else {
        Alert.alert('No User', 'No user is currently signed in');
      }
    } catch (error) {
      console.error('Get current user error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In</Text>

      {/* Use the official Google Sign-In button */}
      <GoogleSigninButton onPress={signIn} disabled={false} />

      <View style={styles.buttonContainer}>
        <Button title="Sign Out" onPress={signOut} />
        <Button title="Get Current User" onPress={getCurrentUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
    width: '100%',
  },
});

export default GoogleLogin;
