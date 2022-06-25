import {Text, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

interface PriceCardProps {
  title: string;
  amount: string | number;
  active?: boolean;
}

export default class PriceCard extends Component<PriceCardProps> {
  render() {
    const {title, amount, active} = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={
            active
              ? [
                  styles.text,
                  {fontFamily: 'Montserrat-Bold', fontSize: 16, color: 'black'},
                ]
              : styles.text
          }>
          {title}
        </Text>
        <Text
          style={
            active
              ? [
                  styles.priceStyle,
                  {
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                    fontSize: 16,
                  },
                ]
              : styles.priceStyle
          }>
          ৳{amount}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
  },
  priceStyle: {
    fontFamily: 'Montserrat-Medium',
  },
});

{
  /* <View
style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 3,
  marginTop: 10,
}}>
<Text
  style={{
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  }}>
  Total Amount
</Text>
<Text
  style={{
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  }}>
  ৳150
</Text>
</View> */
}
