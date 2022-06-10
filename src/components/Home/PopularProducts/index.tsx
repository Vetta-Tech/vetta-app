import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';

const PopularProducts = () => {
  const renderItem = () => {
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
              source={require('../../../../assets/apple.png')}
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
              Brand name
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
              }}>
              Product name
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
              }}>
              ₹999
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 10}}>
      <SectionHead name="Popular" />
      <View style={{}}>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default PopularProducts;

const styles = StyleSheet.create({});
