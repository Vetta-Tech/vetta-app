import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {API_URL_IMAGE} from '@env';
import {SharedElement} from 'react-navigation-shared-element';

interface ProductHorozontalCardProps {
  supplier_name: string;
  img_url: string;
  product_name: string;
  price: string;
  slug: string;
  navigation: any;
}

export class ProductHorozontalCard extends Component<
  ProductHorozontalCardProps,
  any
> {
  render() {
    const {supplier_name, img_url, product_name, price, slug} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Details', {
            slug: slug,
            brand: supplier_name,
            img_url: img_url,
          })
        }>
        <View style={{paddingRight: 15, paddingTop: 10}}>
          <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
            <SharedElement id={`item.${slug}.photo`}>
              <Image
                source={{uri: `${API_URL_IMAGE}${img_url}`}}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'cover',
                  borderRadius: 15,
                }}
              />
            </SharedElement>
          </View>
          <View style={{width: 120, padding: 5}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 10,
              }}>
              {supplier_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
              }}>
              {product_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
              }}>
              ₹{price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductHorozontalCard;
