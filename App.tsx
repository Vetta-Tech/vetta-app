import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {configureStore} from '@reduxjs/toolkit';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {rootReducer, Home, Map, Search} from './src';

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
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
