import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {configureStore} from '@reduxjs/toolkit';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import {rootReducer, Map, Search, BottomTab, VerifyOtp} from './src';
import {PhoneInputComp, AuthSelect} from './src/screens';
import Core from './src/Core';
import {toastConfig} from './src/components/CsutomToast';

export const store = configureStore({reducer: rootReducer});
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Core />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
