import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';

interface IProps {
  icon: string;
  title: string;
  amount: string | number;
}

export default class SubmitButton extends Component<IProps> {
  render() {
    const {icon, title, amount} = this.props;
    return (
      <View
        style={{
          backgroundColor: 'black',
          padding: 15,
          marginTop: 15,
          borderRadius: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={{
                uri: icon,
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Montserrat-Bold',
                fontSize: 16,
                marginLeft: 5,
              }}>
              {title}
            </Text>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 14,
                marginLeft: 5,
              }}>
              ৳ {amount}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
