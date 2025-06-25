import { View, Text } from 'react-native';
import React from 'react';
import GoogleSignIn from './src/GoogleSignIn';

const App = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GoogleSignIn />
    </View>
  );
};

export default App;
