import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

export default class DeliveryTime extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: 'black',
          }}>
          Delivery Time
        </Text>
        <View
          style={{
            marginTop: 5,
            backgroundColor: '#f2f2f2',
            padding: 15,
            borderRadius: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 18,
            }}>
            Within{' '}
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'black',
              }}>
              3 Hours
            </Text>
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              marginTop: 5,
              fontSize: 12,
            }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            inventore voluptatibus
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
