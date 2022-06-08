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

const categoryData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 30,
  },
  {
    id: 40,
  },
  {
    id: 5,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 9,
  },
];

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
            <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
              25% Discount
            </Text>
            <Text>For a cozy yellow set</Text>
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
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
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
