import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';

const RecentProduct = () => {
  const renderItem = () => {
    return (
      <View style={{paddingRight: 15, paddingTop: 10}}>
        <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
          <Image
            source={require('../../../../assets/chair.png')}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
        </View>
        <View style={{width: 120, padding: 5}}>
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
    );
  };

  return (
    <View style={styles.container}>
      <SectionHead name="Recently Added" />
      <View>
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

export default RecentProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
