import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

interface TopCartProps {}

const TopCart = (props: TopCartProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.cartop}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Montserrat-Bold',
            letterSpacing: 2,
            color: 'black',
          }}>
          Cart
        </Text>
        <TouchableOpacity>
          <Material name="trash-can-outline" size={30} color="black" />
        </TouchableOpacity>
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
    paddingBottom: 15,
  },
});
