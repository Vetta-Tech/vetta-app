import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type ProppType = {
  navigation: any;
};

const TopBar = ({navigation}: ProppType) => {
  return (
    <View style={styles.top}>
      <View>
        <View style={styles.store}>
          <Text style={styles.store_text}>VETTA store</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push('Map')}>
          <View style={styles.location}>
            <Text>Rd 11 Uttara Dhaka</Text>
            <Icon name="arrow-down-outline" size={15} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{margin: 'auto'}}>
        <Icon name="notifications-outline" size={30} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  store: {},
  store_text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default TopBar;
