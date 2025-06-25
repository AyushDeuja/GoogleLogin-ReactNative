import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleSignIn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '677741468162-5hpfg3t8o84drd1gdu3fi333a5j7kq78.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      Alert.alert(
        'Success',
        // @ts-ignore
        `Welcome ${userInfo.user || userInfo.data?.user}`,
      );
    } catch (error: any) {
      console.log('Sign in error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('In Progress', 'Sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Google Play Services not available');
      } else {
        Alert.alert('Error', `Something went wrong ${error.message}`);
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Google Sign-In</Text>
      <Button title="Sign in with Google" onPress={signIn} />
    </View>
  );
};

export default GoogleSignIn;
