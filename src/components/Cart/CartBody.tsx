import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {cartData} from '../../constants/dummydata';
import CartBodyCard from './utils/CartBodyCard';

export interface CartData {
  expires: string;
  id: number;
  quantity: number;
  variant_id: number;
  product: {
    name: string;
    price: number;
    slug: string;
    thumbnail: string;
    short_descrition: string;
  };
  variant: {
    id: number;
  };
}
interface CartBodyProps {
  data: CartData[];
}

class CartBody extends React.Component<CartBodyProps> {
  handleIncreaseQuantity = async (id: number, variant_id: number) => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    const data = {
      id,
      variant_id,
    };

    axios
      .post(`${API_URL}cart/plus-quantity`, data, config)
      .then(res => {
        console.log(res.data.msg);
      })
      .catch(err => {
        console.log(err.data.msg);
      });
  };

  render() {
    const {data} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CartBodyCard
              quantity={item.quantity}
              short_descrition={item.product.short_descrition}
              name={item.product.name}
              image={item.product.thumbnail}
              price={item.product.price}
              handleIncreaseQuantity={this.handleIncreaseQuantity}
              id={item.id}
              variant={item.variant.id}
            />
          )}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    );
  }
}

export default CartBody;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
});
