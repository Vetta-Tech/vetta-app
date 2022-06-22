import {API_URL_IMAGE} from '@env';
import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import {shoescat} from '../../../constants/images';
import {CartData} from '../../../screens/Cart/index';
interface CartBodyCardProps {
  name: string;
  short_descrition: string;
  price: number;
  image: string;
  quantity: number;
  handleIncreaseQuantity: any;
  variant: any;
  id: number;
}

interface CartBodyCardState {
  loading: boolean;
  error: string;
  success: boolean;
}

class CartBodyCard extends React.Component<
  CartBodyCardProps,
  CartBodyCardState
> {
  state: CartBodyCardState = {
    loading: false,
    error: '',
    success: false,
  };

  render() {
    const {
      name,
      short_descrition,
      price,
      image,
      quantity,
      handleIncreaseQuantity,
      id,
      variant,
    } = this.props;
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
                source={{
                  uri: `${API_URL_IMAGE}${image}`,
                }}
              />
            </View>

            <View
              style={{
                paddingLeft: 10,
                // width: '50%',
                justifyContent: 'space-between',
                paddingTop: 7,
                paddingBottom: 7,
              }}>
              <View>
                <Text style={{fontFamily: 'Montserrat-SemiBold'}}>{name}</Text>
                <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12}}>
                  {short_descrition}
                </Text>
              </View>
              <View>
                <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 16}}>
                  ৳{price}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Icon name="minus" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                padding: 4,
              }}>
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => handleIncreaseQuantity(id, variant)}>
              <Icon name="plus" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
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
