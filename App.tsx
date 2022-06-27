import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import {Provider} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';

import Core from './src/Core';
import {store} from './src/state/store';

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
