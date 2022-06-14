import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import SectionHead from '../../Typography/SectionHead';
import ProductHorozontalCard from '../../ProductHorizontalCard';

interface FeaturedProductsProps {
  featured: any;
  navigation: any;
}

class FeaturedPRoducts extends Component<FeaturedProductsProps, any> {
  render() {
    return (
      <View style={styles.container}>
        <SectionHead navigation={this.props.navigation} name="Featured" />
        <View>
          <FlatList
            data={this.props.featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ProductHorozontalCard
                supplier_name={item.supplier_name}
                img_url={item.thumbnail}
                price={item.price}
                product_name={item.name}
                slug={item.slug}
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

export default FeaturedPRoducts;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
