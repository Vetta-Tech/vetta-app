import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SectionHead from '../../Typography/SectionHead';
import {categoryData} from '../../../constants/dummydata';

import Icon from 'react-native-vector-icons/EvilIcons';

const Collections = (props: any) => {
  const renderItem = () => {
    return (
      <View style={{paddingRight: 10}}>
        <ImageBackground
          style={[styles.ImageBackground, {padding: 10}]}
          imageStyle={{borderRadius: 20}}
          source={require('../../../../assets/collection.jpeg')}>
          <View style={{padding: 15}}>
            <View
              style={{
                backgroundColor: 'white',
                opacity: 0.7,
                height: 30,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-SemiBold',
                  padding: 5,
                }}>
                Exclusive
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'white',
                marginTop: 5,
              }}>
              Your Skin Matters
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'white',
                // marginTop: 5,
                fontSize: 16,
              }}>
              The Ideal diet to your skin
            </Text>
            <Icon name="arrow-right" size={40} color="white" />
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{paddingTop: 15}}>
      <SectionHead navigation={props.navigation} name="Collections" />
      <View>
        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    </View>
  );
};

export default Collections;

const styles = StyleSheet.create({
  ImageBackground: {
    height: 180,
    width: 300,
    borderRadius: 15,
  },
});
