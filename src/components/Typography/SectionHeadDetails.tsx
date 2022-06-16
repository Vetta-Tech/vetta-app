import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  name: string;
  navigation: any;
  supplier_name: string;
  screen_name: string;
  isFeatured?: boolean;
};

const SectionHeadDetails = ({
  name,
  navigation,
  supplier_name,
  screen_name,
  isFeatured,
}: Props) => {
  console.log(isFeatured);
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(`${screen_name}`, {
            supplier_name: supplier_name,
            isFeatured: isFeatured,
          })
        }>
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

export default SectionHeadDetails;

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
