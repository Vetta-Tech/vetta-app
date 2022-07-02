import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';

interface ActionCardProps {
  icon: any;
  title: string;
  navigation?: any;
}

const ActionCard = ({icon, title, navigation}: ActionCardProps) => {
  return (
    <TouchableOpacity>
      <View style={styles.actionCard}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.actionCardText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionCard;
