import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import axios from '../../api/axios';

import Icon from 'react-native-vector-icons/EvilIcons';
import Material from 'react-native-vector-icons/MaterialIcons';

interface TopCartProps {
  address: string;
  onclick: any;
  navigation: {
    navigate: any;
    goBack: any;
  };
}

const TopCart = (props: TopCartProps) => {
  return (
    <View
      style={{
        paddingTop: 15,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      <TouchableOpacity onPress={() => props.onclick()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              width: '50%',
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
              color: 'black',
            }}>
            {props.address ? props.address : 'Enter Address'}
          </Text>

          <Material name="arrow-drop-down" size={15} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.cartop}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="trash" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TopCart;

const styles = StyleSheet.create({
  container: {},
  cartop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
