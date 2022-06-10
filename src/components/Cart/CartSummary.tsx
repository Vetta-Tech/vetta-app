import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface CartSummaryProps {}

const CartSummary = (props: CartSummaryProps) => {
  return (
    <View style={styles.container}>
      <Text>CartSummary</Text>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {},
});
