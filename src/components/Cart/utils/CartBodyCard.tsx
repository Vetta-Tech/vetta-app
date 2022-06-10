import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {shoescat} from '../../../constants/images';

interface CartBodyCardProps {
  item: any;
}

const CartBodyCard = ({item}: CartBodyCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.cartInside}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              padding: 5,
              borderRadius: 15,
              // paddingRight: 10,
            }}>
            <Image
              style={{
                height: 90,
                width: 90,
              }}
              source={shoescat}
            />
          </View>

          <View
            style={{
              paddingLeft: 10,
              width: '50%',
              justifyContent: 'space-between',
              paddingTop: 7,
              paddingBottom: 7,
            }}>
            <View>
              <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
                Minimalist Chair
              </Text>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12}}>
                Regal Do Lodo
              </Text>
            </View>
            <View>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16}}>
                ₹999
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text>Quantity</Text>
        </View>
      </View>
    </View>
  );
};

export default CartBodyCard;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  cartInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
