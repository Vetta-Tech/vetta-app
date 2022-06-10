import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';

const Brands = () => {
  const renderItem = () => {
    return (
      <View style={{paddingRight: 15, paddingTop: 10}}>
        <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
          <Image
            source={require('../../../../assets/pngegg.png')}
            style={{
              width: 120,
              height: 120,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 15}}>
      <SectionHead name="Brands" />
      <View>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({});
