import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {BrandsTypes} from '../../../utils/types/brandsType';
import {API_URL_IMAGE} from '@env';
import SectionHeadBrands from '../../Typography/SectionHeadBrands';
import {SharedElement} from 'react-navigation-shared-element';

interface BrandsProps {
  brands: BrandsTypes[];

  navigation: any;
}

interface Item {
  item: {
    logo: string;
    name: string;
    slug: string;
  };
}

const Brands = ({brands, navigation}: BrandsProps) => {
  const renderItem = ({item}: Item) => {
    return (
      <View style={{paddingRight: 15, paddingTop: 10}}>
        <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BrandDeatils', {
                supplier: item.name,
                slug: item.slug,
              });
            }}>
            <SharedElement id={`item.${item.slug}.photo`}>
              <Image
                source={{uri: `${item.logo}`}}
                style={{
                  width: 120,
                  height: 120,
                }}
                resizeMode="contain"
              />
            </SharedElement>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 15}}>
      <SectionHeadBrands navigation={navigation} name="Brands" />
      <View>
        <FlatList
          data={brands}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={item => renderItem(item)}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    </View>
  );
};

export default Brands;
