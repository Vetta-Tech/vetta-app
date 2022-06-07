import {Text, StyleSheet, View, TextInput} from 'react-native';
import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar__unclicked}>
          <EvilIcons
            name="search"
            size={30}
            color="black"
            style={{marginLeft: 1}}
          />
          <TextInput
            style={styles.searchBar__unclicked}
            placeholder="Search"
            onChange={() => console.log('clicked')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    // width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  search_icon: {
    position: 'absolute',
    top: 10,
    width: '10%',
    padding: 1,
  },
});
