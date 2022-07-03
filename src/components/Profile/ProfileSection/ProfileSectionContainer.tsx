import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import {styles} from './styles';
import ItemList from './ItemList';
import {bag, address, help, heart} from '../../../constants/images';

interface Props {
  navigation: any;
}
export default class ProfileSectionContainer extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTxt}>Accounts</Text>
        <View style={styles.listcontainer}>
          <ItemList
            navigation={this.props.navigation}
            screen_name="OrdersList"
            img={bag}
            txt="Your Orders"
          />
          <ItemList
            navigation={this.props.navigation}
            screen_name="OrdersList"
            img={heart}
            txt="Favourite Orders"
          />
          <ItemList
            navigation={this.props.navigation}
            screen_name="ProfileAddress"
            img={address}
            txt="Your address"
          />
          <ItemList
            navigation={this.props.navigation}
            screen_name="OrdersList"
            img={help}
            txt="online ordering help"
          />
        </View>
      </View>
    );
  }
}
