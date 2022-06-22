import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface CartSummaryProps {}

const CartSummary = (props: CartSummaryProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
        }}>
        <View>
          <View>
            <Text>Subtotal</Text>
            <Text>৳12000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartSummary;

const styles = StyleSheet.create({
  container: {
    borderRadius: 120,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});
