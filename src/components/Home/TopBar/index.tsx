import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type ProppType = {
  navigation: any;
  name: string;
  address: string;
};

const TopBar = ({navigation, name, address}: ProppType) => {
  return (
    <View style={styles.top}>
      <View>
        <View style={styles.store}>
          <Text style={styles.store_text}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <View style={styles.location}>
            <Text
              style={{
                fontFamily: 'Montserrat-Light',
                color: 'black',
              }}>
              {address}
            </Text>
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
    fontSize: 22,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
  },
  location: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});

export default TopBar;
