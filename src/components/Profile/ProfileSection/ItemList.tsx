import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {styles} from './styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {arrow} from '../../../constants/images';

interface Props {
  img: any;
  txt: string;
  screen_name: string;
  navigation: any;
}

const ItemList = ({img, txt, screen_name, navigation}: Props) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen_name)}>
      <View style={styles.itemListContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={img} />
          </View>
          <Text style={styles.leftTxt}>{txt}</Text>
        </View>
        <Image source={arrow} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;
