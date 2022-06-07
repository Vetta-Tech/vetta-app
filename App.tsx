import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {configureStore} from '@reduxjs/toolkit';

import {Provider} from 'react-redux';

import rootReducer from './src/store/reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './src/screens';

const store = configureStore({reducer: rootReducer});

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
