import { View, Text } from 'react-native';
import React from 'react';
import GoogleSignIn from './src/GoogleSignIn';
import GoogleLogin from './src/GoogleLogin';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GoogleSignIn />
      {/* <GoogleLogin /> */}
    </View>
  );
};

export default App;
