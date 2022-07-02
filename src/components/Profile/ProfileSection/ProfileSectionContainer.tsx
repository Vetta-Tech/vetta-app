import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import {styles} from './styles';
import ItemList from './ItemList';
import {bag, address, help, heart} from '../../../constants/images';

export default class ProfileSectionContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTxt}>Accounts</Text>
        <View style={styles.listcontainer}>
          <ItemList img={bag} txt="Your Orders" />
          <ItemList img={heart} txt="Favourite Orders" />
          <ItemList img={address} txt="Your address" />
          <ItemList img={help} txt="online ordering help" />
        </View>
      </View>
    );
  }
}
