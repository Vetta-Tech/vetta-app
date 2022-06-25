import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';
import Lottie from 'lottie-react-native';

interface IProps {
  address: string;
}

export default class Address extends Component<any, IProps> {
  render() {
    return (
      <View style={{}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            color: 'black',
          }}>
          Ship To
        </Text>
        <View
          style={{
            marginTop: 10,
            backgroundColor: '#f2f2f2',
            padding: 15,
            borderRadius: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Lottie
              source={require('./71363-location-pin.json')}
              autoPlay={true}
              loop={true}
              style={{
                width: 40,
                height: 40,
                marginTop: 1,
              }}
            />
            <View
              style={{
                width: '88%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: 'black',
                }}
                numberOfLines={2}>
                {this.props.address}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
