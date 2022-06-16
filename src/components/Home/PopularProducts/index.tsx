import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import ProductHorozontalCard from '../../ProductHorizontalCard';
import PopularCards from '../../PopularCards';

const PopularProducts = ({popular, navigation}: any) => {
  return (
    <View style={{paddingTop: 10}}>
      <SectionHead navigation={navigation} name="Popular" />
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
              slug={item.slug}
              navigation={navigation}
            />
          )}
        />
      </View>
    </View>
  );
};

export default PopularProducts;

const styles = StyleSheet.create({});
