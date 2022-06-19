import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';
import {BrandsTypes} from '../../../utils/types/brandsType';
import {API_URL_IMAGE} from '@env';

interface BrandsProps {
  brands: BrandsTypes[];

  navigation: any;
}

interface Item {
  item: {
    logo: string;
  };
}

const Brands = ({brands, navigation}: BrandsProps) => {
  const renderItem = ({item}: Item) => {
    return (
      <View style={{paddingRight: 15, paddingTop: 10}}>
        <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BrandDeatils');
            }}>
            <Image
              source={{uri: `${item.logo}`}}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 15}}>
      <SectionHead navigation={navigation} name="Brands" />
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

const styles = StyleSheet.create({});
