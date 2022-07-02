import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import axios from '../../api/axios';
import {TopNavCheckout} from '../../components';

interface PaymentDoneProps {
  route: {
    params: {
      success: boolean;
      payment_method: 'cash' | 'card' | 'bkash';
    };
  };
  navigation: {
    replace: any;
  };
}

class PaymentDone extends Component<PaymentDoneProps> {
  componentDidMount() {
    const {success, payment_method} = this.props.route.params;
    console.log('ceasdf', success);
    if (!success) {
      this.props.navigation.replace('Home');
    } else {
      this.confirmOrder(payment_method);
    }
  }

  confirmOrder = (payment_method: 'cash' | 'card' | 'bkash') => {
    axios
      .post('orders/order-confirm', {
        payment_method,
      })
      .then(res => {})
      .catch(err => {});
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <TopNavCheckout name="Success" />
      </View>
    );
  }
}

export default PaymentDone;

const styles = StyleSheet.create({});
