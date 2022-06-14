import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HoriLine = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1.5, backgroundColor: '#ededed'}} />
    </View>
  );
};

export default HoriLine;

const styles = StyleSheet.create({});
