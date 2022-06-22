import {View, Text} from 'react-native';
import React from 'react';

interface PriceCardTypes {
  sub_total: number;
  title: string;
  total_amount?: boolean;
}

const PriceCard = ({sub_total, title, total_amount}: PriceCardTypes) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat-Light',
        }}>
        ৳{sub_total}
      </Text>
    </View>
  );
};

export default PriceCard;
