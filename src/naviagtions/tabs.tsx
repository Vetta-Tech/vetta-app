import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Vibration} from 'react-native';

import {Home, Search, Cart, Profile} from '../screens';

import {home, explore, cat, user} from '../constants/images';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
        },
        tabBarStyle: {
          //   height: 55,
        },
      }}>
      <Tab.Screen
        listeners={{
          tabPress: e => {
            Vibration.vibrate(20);
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={home}
              resizeMode="contain"
              style={{
                padding: 10,
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : '#a2a8a3',
              }}
            />
          ),
        }}
        name="HomeTab"
        component={Home}
      />
      <Tab.Screen
        listeners={{
          tabPress: e => {
            Vibration.vibrate(20);
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={cat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : '#a2a8a3',
              }}
            />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        listeners={{
          tabPress: e => {
            Vibration.vibrate(20);
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={explore}
              resizeMode="contain"
              style={{
                width: 30,
                height: 25,
                tintColor: focused ? 'black' : '#a2a8a3',
              }}
            />
          ),
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        listeners={{
          tabPress: e => {
            Vibration.vibrate(20);
          },
        }}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={cat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'black' : '#a2a8a3',
              }}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
