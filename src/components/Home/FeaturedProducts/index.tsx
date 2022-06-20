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
}

class FeaturedPRoducts extends Component<FeaturedProductsProps, any> {
  render() {
    return (
      <View style={styles.container}>
        <SectionHeadDetails
          navigation={this.props.navigation}
          name={this.props.name}
          supplier_name={this.props.supplier_name}
          screen_name={this.props.screen_name}
          isFeatured={this.props.isFeatured}
        />
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
