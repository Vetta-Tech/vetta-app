import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import ProductHorozontalCard from '../../ProductHorizontalCard';
import PopularCards from '../../PopularCards';

const PopularProducts = ({popular}: any) => {
  return (
    <View style={{paddingTop: 10}}>
      <SectionHead name="Popular" />
      <View style={{}}>
        <FlatList
          data={popular}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <PopularCards
              supplier_name={item.supplier_name}
              img_url={item.thumbnail}
              price={item.price}
              product_name={item.name}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PopularProducts;

const styles = StyleSheet.create({});
