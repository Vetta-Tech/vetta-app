import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  name: string;
  navigation: any;
};

const SectionHeadBrands = ({name, navigation}: Props) => {
  return (
    <View style={styles.heading_container}>
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 18,
          color: 'black',
        }}>
        {name}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('AllBrands')}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: 14,
          }}>
          View All
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeadBrands;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  heading_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // padding: 15,
  },
});
