import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

type ProppType = {
  navigation: any;
  name: string;
  address: string;
  onClick: any;
};

const TopBar = ({navigation, name, address, onClick}: ProppType) => {
  console.log(address);
  return (
    <View style={styles.top}>
      <View>
        <View style={styles.store}>
          <Text style={styles.store_text}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => onClick()}>
          <View style={styles.location}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                maxWidth: '80%',
                fontSize: 12,
              }}
              numberOfLines={1}>
              {address}
            </Text>
            <Icon style={{width: '10%'}} name="arrow-down-outline" size={12} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TopBar;
