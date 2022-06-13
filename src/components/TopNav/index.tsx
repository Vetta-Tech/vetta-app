import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

interface TopCartProps {
  icon: string;
  title: string;
  navigation: any;
}

const TopNav = ({icon, title}: TopCartProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon name={icon} size={30} color="black" />
      </View>
      <Text style={{textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>
        {title}
      </Text>
      <Text style={{textAlign: 'center'}}></Text>
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
  },
  cartop: {},
});
