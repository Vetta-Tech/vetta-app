import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import React, {Component} from 'react';
import {SharedElement} from 'react-navigation-shared-element';

export default class Test2 extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <SharedElement id={`item.${10}.photo`}>
          <Image
            source={{
              uri: 'http://192.168.0.204:8000/images/products/61d2f85b92b57c0004c64745_mqzZKAF.png',
            }}
            style={{
              height: Dimensions.get('window').height / 2,
              width: Dimensions.get('window').width,
            }}
          />
        </SharedElement>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
