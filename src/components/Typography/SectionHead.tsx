import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  name: string;
};

const SectionHead = ({name}: Props) => {
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
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: 14,
        }}>
        View All
      </Text>
    </View>
  );
};

export default SectionHead;

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