import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {API_URL_IMAGE} from '@env';

interface PopularCardsProps {
  supplier_name: string;
  img_url: string;
  product_name: string;
  price: string;
}

const PopularCards = ({
  supplier_name,
  img_url,
  price,
  product_name,
}: PopularCardsProps) => {
  return (
    <View
      style={{
        paddingRight: 15,
        paddingTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 10,
        }}>
        <View
          style={{
            backgroundColor: '#f2f2f2',
            padding: 5,
            borderRadius: 15,
          }}>
          <Image
            source={{uri: `${API_URL_IMAGE}${img_url}`}}
            style={{
              width: 60,
              height: 60,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: 15,
            width: 130,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 10,
            }}>
            {supplier_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'black',
            }}>
            {product_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
            }}>
            ₹{price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PopularCards;

const styles = StyleSheet.create({});
