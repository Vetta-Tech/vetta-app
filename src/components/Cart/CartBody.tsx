import * as React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {cartData} from '../../constants/dummydata';
import CartBodyCard from './utils/CartBodyCard';

interface CartBodyProps {}

const CartBody = (props: CartBodyProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={cartData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CartBodyCard item={item} />}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{paddingVertical: 5}}
      />
    </View>
  );
};

export default CartBody;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
});
