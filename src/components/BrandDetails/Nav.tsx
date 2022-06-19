import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';

export default class TopNavBrands extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Icon name="chevron-left" size={30} color="black" />
        </View>
        <View>
          <Icon name="heart" size={30} color="black" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
