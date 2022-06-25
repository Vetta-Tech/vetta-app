import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';

interface IProps {
  name: string;
}

const TopNavCheckout = ({name}: IProps) => {
  return (
    <View
      style={{
        paddingTop: 15,
        backgroundColor: 'white',
        paddingLeft: 5,
        paddingRight: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <TouchableOpacity>
            <Icon name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'black',
            }}>
            {name}
          </Text>
        </View>
        <Text></Text>
      </View>
    </View>
  );
};

export default TopNavCheckout;

const styles = StyleSheet.create({});
