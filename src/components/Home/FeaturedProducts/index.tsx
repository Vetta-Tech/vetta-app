import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import SectionHead from '../../Typography/SectionHead';
import ProductHorozontalCard from '../../ProductHorizontalCard';
import SectionHeadDetails from '../../Typography/SectionHeadDetails';

interface FeaturedProductsProps {
  featured: any;
  navigation: any;
  name: string;
  supplier_name: string;
  screen_name: string;
  isFeatured: boolean;
  supplier_slug?: string;
}

class FeaturedPRoducts extends Component<FeaturedProductsProps, any> {
  render() {
    console.log('supplier_slug', this.props.supplier_slug);
    return (
      <View style={styles.container}>
        <SectionHeadDetails
          navigation={this.props.navigation}
          name={this.props.name}
          supplier_name={this.props.supplier_name}
          screen_name={this.props.screen_name}
          isFeatured={this.props.isFeatured}
          isPopular={false}
          supplier_slug={this.props.supplier_slug}
        />
        <View>
          <FlatList
            data={this.props.featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.slug}
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
