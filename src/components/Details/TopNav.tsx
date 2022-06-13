import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

interface componentNameProps {
  icon: string;
  shareIcon: string;
  navigation: any;
}

const TopNavDetails = ({icon, shareIcon, navigation}: componentNameProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon name={icon} size={30} color="black" />
      </View>
      <View>
        <Icon name={shareIcon} size={30} color="black" />
      </View>
    </View>
  );
};

export default TopNavDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
