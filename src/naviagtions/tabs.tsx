import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

import {Home, Search, Cart, Profile} from '../screens';

import {home, explore, cat} from '../constants/images';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={home}
              resizeMode="contain"
              style={{
                padding: 10,
                width: 25,
                height: 25,
                tintColor: focused ? '#a2a8a3' : 'black',
              }}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={cat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#a2a8a3' : 'black',
              }}
            />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={explore}
              resizeMode="contain"
              style={{
                width: 30,
                height: 25,
                tintColor: focused ? '#a2a8a3' : 'black',
              }}
            />
          ),
        }}
        name="Cart"
        component={Cart}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={cat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#a2a8a3' : 'black',
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
