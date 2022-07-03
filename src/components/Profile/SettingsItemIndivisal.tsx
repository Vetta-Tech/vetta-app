import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styles} from './ProfileSection/styles';
import {arrow} from '../../constants/images';

interface Props {
  navigation: any;
  img: any;
  title: string;
  screen_name: string;
  onPress?: any;
  rate_url?: string;
}

const SettingsItemIndivisal = ({
  navigation,
  img,
  title,
  screen_name,
  onPress,
  rate_url,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={
        rate_url
          ? () => Linking.openURL(`${rate_url}`)
          : () => navigation.navigate(screen_name)
      }>
      <View
        style={[
          styles.itemListContainer,
          {backgroundColor: '#f2f2f2', borderRadius: 12, marginBottom: 10},
        ]}>
        <View style={styles.leftContainer}>
          <Image source={img} style={styles.img} />
          <Text style={styles.leftTxt}>{title}</Text>
        </View>
        <Image source={arrow} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItemIndivisal;
