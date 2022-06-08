import {Text, StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

export default class MapInput extends Component {
  render() {
    return (
      <View
        style={[
          styles.searchBar__unclicked,
          {padding: 10, borderWidth: 1, shadowColor: 'red'},
        ]}>
        {/* <Icon name="search" size={15} color="black" style={{marginLeft: 1}} /> */}
        <TextInput style={styles.searchBar__unclicked} placeholder="Search" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 10,
  },

  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    marginLeft: 10,
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
  },
});
