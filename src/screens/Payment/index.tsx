import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import axios from '../../api/axios';
import {TopNavCheckout} from '../../components';

class PaymentDone extends Component {
  componentDidMount() {
    axios
      .post('orders/order-confirm')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data.msg);
      });
  }

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
