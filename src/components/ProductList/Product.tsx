import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';

import {API_URL_IMAGE} from '@env';

interface ProductProps {
  navigation: any;
  item: {
    thumbnail: string;
    supplier_name: string;
    name: string;
    price: number;
    slug: string;
  };
}

export default class Product extends Component<ProductProps> {
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('Details', {
            slug: item.slug,
            brand: item.supplier_name,
          })
        }>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 2,
          }}>
          <View
            style={{
              backgroundColor: '#ededed',
              borderRadius: 12,
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').width / 2.3,
                width: Dimensions.get('window').width / 2.3,
              }}
              source={{uri: `${API_URL_IMAGE}${item.thumbnail}`}}
            />
          </View>
          <View style={{padding: 5}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 10,
              }}>
              {item.supplier_name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
              }}>
              ৳ {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
