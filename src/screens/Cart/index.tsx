import * as React from 'react';
import {Text, View, StyleSheet, ScrollView, LogBox} from 'react-native';
import {CartBody, TopCart} from '../../components';
import CartSummary from '../../components/Cart/CartSummary';

interface CartProps {}

const Cart = (props: CartProps) => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <View style={styles.container}>
      <TopCart />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CartBody />
        <CartSummary />
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 25,
    backgroundColor: 'white',
  },
});
