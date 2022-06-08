import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {categoryData} from '../../../constants/dummydata';

const renderItem = ({item}: any) => {
  return (
    <View style={{paddingRight: 10}}>
      <ImageBackground
        imageStyle={{borderRadius: 20}}
        style={[styles.ImageBackground, {padding: 10}]}
        source={require('../../../../assets/soccer.jpeg')}
        resizeMode="cover">
        <View style={{padding: 15}}>
          <View>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              25% Discount
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
              }}>
              For a cozy yellow set
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: 'black',
              width: 120,
              height: 45,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                margin: 'auto',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Learn more
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const TopImage = () => {
  return (
    <View style={{paddingTop: 10}}>
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{paddingVertical: 5}}
      />
    </View>
  );
};

export default TopImage;

const styles = StyleSheet.create({
  ImageBackground: {
    height: 180,
    width: 300,
    borderRadius: 15,
  },
});
