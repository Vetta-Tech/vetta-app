import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {categoryData} from '../../../../constants/dummydata';
import SectionHead from '../../../Typography/SectionHead';

type PropTypesSubCat = {
  name: string;
  img: any;
  item: any;
};

type PropTypes = {
  name: string;
  img: any;
};

const SubCat = ({item, name, img}: PropTypesSubCat) => {
  return (
    <View style={{paddingRight: 15, paddingTop: 10, paddingBottom: 15}}>
      <View style={{backgroundColor: '#f2f2f2', borderRadius: 20}}>
        <Image
          source={img}
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
        Smartphone
      </Text>
    </View>
  );
};

const SubCatCard = ({name, img}: PropTypes) => {
  return (
    <View style={{paddingTop: 15}}>
      <SectionHead name={name} />
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <SubCat item={item} name="s" img={img} />}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{paddingVertical: 5}}
      />
    </View>
  );
};

export default SubCatCard;

const styles = StyleSheet.create({});
