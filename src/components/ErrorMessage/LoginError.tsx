import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface LoginError {
  msg: string;
}

const LoginError = ({msg}: LoginError) => {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
};

export default LoginError;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    padding: 18,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 12,
  },
  msg: {
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#E83A14',
    fontSize: 12,
  },
});
