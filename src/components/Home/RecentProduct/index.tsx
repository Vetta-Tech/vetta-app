import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';
import ProductHorozontalCard from '../../ProductHorizontalCard';

interface RecentProductProps {
  recent_products: any;
}

class RecentProduct extends Component<RecentProductProps> {
  render() {
    return (
      <View style={styles.container}>
        <SectionHead name="Gift Guides" />
        <View>
          <FlatList
            data={this.props.recent_products}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ProductHorozontalCard
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
  }
}

export default RecentProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
