import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import React, {Component} from 'react';
import {SharedElement} from 'react-navigation-shared-element';

export default class Test1 extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => {
            this.props.navigation.navigate('Test2');
          }}>
          <SharedElement id={`item.${10}.photo`}>
            <Image
              source={{
                uri: 'http://192.168.0.204:8000/images/products/61d2f85b92b57c0004c64745_mqzZKAF.png',
              }}
              style={{
                height: 50,
                width: 50,
              }}
            />
          </SharedElement>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
