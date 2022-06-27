import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../state/store';

const SplashScreen = (props: any) => {
  const [timePassed, setTimePassed] = React.useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 2000);

  if (!timePassed) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 32,
            fontFamily: 'Montserrat-Black',
          }}>
          Vetta
        </Text>
      </View>
    );
  }

  if (props.isAuthenticated) {
    props.navigation.replace('Home');
  } else {
    props.navigation.replace('AuthSelect');
  }
  return null;
};

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {})(SplashScreen);

const styles = StyleSheet.create({});
