import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type PRoPsType = {
  name: string;
};

const PopularSearchCard = ({name}: PRoPsType) => {
  return (
    <View style={{paddingRight: 15, paddingTop: 5, paddingBottom: 5}}>
      <Text
        style={{
          backgroundColor: 'white',
          padding: 12,
          paddingRight: 10,
          borderRadius: 30,
          borderWidth: 0.5,
          borderColor: '#c6b8ab',
          fontFamily: 'Montserrat-SemiBold',
        }}>
        {name}
      </Text>
    </View>
  );
};

export default PopularSearchCard;

const styles = StyleSheet.create({});
