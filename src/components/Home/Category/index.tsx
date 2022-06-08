import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import CatCard from './CatCard';
import SectionHead from '../../Typography/SectionHead';

const Category = () => {
  return (
    <View style={styles.container}>
      <SectionHead name="Top Categories" />
      <View style={styles.categoryList}>
        <CatCard name="Shirt" />
        <CatCard name="Pants" />
        <CatCard name="Shoes" />
        <CatCard name="Electronics" />
        <CatCard name="Books" />
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  heading_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // padding: 15,
  },
});
