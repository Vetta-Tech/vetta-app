import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

type ProPsType = {
  navigation: any;
};
export default class Search extends Component<ProPsType> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Search')}>
          <View style={styles.searchBar__unclicked}>
            <EvilIcons
              name="search"
              size={30}
              color="black"
              style={{marginLeft: 1}}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}>
              <TextInput
                editable={false}
                pointerEvents="none"
                style={styles.searchBar__unclicked}
                placeholder="Search the VETTA store"
                onChange={() => console.log('clicked')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#f2f2f2',
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
