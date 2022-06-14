import {Text, StyleSheet, View, Pressable, Vibration} from 'react-native';
import React, {Component} from 'react';

interface NameSectionProps {
  brand_name: string;
  product_name: string;
  price: number;
}
export default class NameSection extends Component<NameSectionProps, any> {
  render() {
    const {brand_name, product_name, price} = this.props;

    return (
      <View style={styles.nameContainer}>
        <View style={{padding: 5}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
            }}>
            {brand_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'black',
              fontSize: 16,
            }}>
            {product_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
            }}>
            ₹{price}
          </Text>
        </View>
        <View>
          <Pressable onPress={() => Vibration.vibrate(30)}>
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
