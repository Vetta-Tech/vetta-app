import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SectionHead from '../../../Typography/SectionHead';
import {API_URL_IMAGE} from '@env';

const SubCat = ({item, navigation}: any) => {
  console.log(item.name);
  return (
    <View style={{paddingRight: 15, paddingTop: 10, paddingBottom: 15}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductList', {
            cat: item.category.name,
            sub_cat: item.name,
          })
        }>
        <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
          <Image
            source={{uri: `${API_URL_IMAGE}${item.image}`}}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            fontSize: 12,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SubCatCard = ({data, name, navigation}: any) => {
  return (
    <View style={{paddingTop: 15}}>
      <SectionHead navigation={navigation} name={name} />
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <SubCat item={item} navigation={navigation} />}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{paddingVertical: 5}}
      />
    </View>
  );
};

export default SubCatCard;

const styles = StyleSheet.create({});
