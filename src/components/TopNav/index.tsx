import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

interface TopCartProps {
  icon: string;
  title: string;
  navigation: any;
  left: boolean;
  leftIcon: string;
}

const TopNav = ({icon, title, left, leftIcon, navigation}: TopCartProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Icon name={icon} size={30} color="black" />
        </View>
      </TouchableOpacity>
      <Text style={{textAlign: 'center', fontFamily: 'Montserrat-Medium'}}>
        {title}
      </Text>
      {left === true ? (
        <View>
          <Icon name={leftIcon} size={30} color="black" />
        </View>
      ) : null}
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
