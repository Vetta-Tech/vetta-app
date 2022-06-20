import {Text, StyleSheet, View, Pressable, Vibration} from 'react-native';
import React, {Component} from 'react';
import {VariantSerializer} from '../../utils/types/productTypes';

interface NameSectionProps {
  brand_name: string;
  product_name: string;
  variants: VariantSerializer[];
  product_name_variant: string;
  slug: string;
  onSubmitCart: any;
  activeVariant?: number | null;
  price: number;
  canAddToCart: boolean;
}
export default class NameSection extends Component<NameSectionProps, any> {
  render() {
    const {
      brand_name,
      product_name,
      price,
      variants,
      product_name_variant,
      onSubmitCart,
      slug,
      activeVariant,
      canAddToCart,
    } = this.props;
    return (
      <View style={styles.nameContainer}>
        <View style={{padding: 5}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
            }}>
            {brand_name}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'black',
              fontSize: 16,
            }}>
            {variants.length !== 0
              ? `${product_name} ${product_name_variant}`
              : `${product_name}`}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
            }}>
            ₹{price}
          </Text>
        </View>
        <View>
          {canAddToCart ? (
            <Pressable onPress={() => onSubmitCart(slug, activeVariant)}>
              <View style={styles.addToCartBtn}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    color: 'white',
                  }}>
                  Add to cart
                </Text>
              </View>
            </Pressable>
          ) : (
            <View>
              <Text>quantity</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartBtn: {
    padding: 14,
    backgroundColor: 'black',
    borderRadius: 12,
  },
});
