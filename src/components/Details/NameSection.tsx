import {Text, StyleSheet, View, Pressable} from 'react-native';
import React, {Component} from 'react';

export default class NameSection extends Component {
  render() {
    return (
      <View style={styles.nameContainer}>
        <View style={{padding: 5}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
            }}>
            Brand name
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'black',
              fontSize: 16,
            }}>
            Product name
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
            }}>
            ₹999
          </Text>
        </View>
        <View>
          <Pressable onPress={() => console.log('clicked')}>
            <View style={styles.addToCartBtn}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: 'white',
                }}>
                Add to cart
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartBtn: {
    padding: 14,
    backgroundColor: 'black',
    borderRadius: 12,
  },
});
