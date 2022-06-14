import {Text, View} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';

export class ReviewSummery extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 36,
            }}>
            4.9
          </Text>
          <View style={{paddingLeft: 8}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Light',
              }}>
              Based on
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Light',
                fontSize: 12,
              }}>
              6 rating and 0 reviews
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Icon name="star" size={20} color="black" />
          <Icon name="star" size={20} color="black" />
          <Icon name="star" size={20} color="black" />
          <Icon name="star" size={20} color="black" />
          <Icon name="star" size={20} color="black" />
        </View>
      </View>
    );
  }
}

export default ReviewSummery;
