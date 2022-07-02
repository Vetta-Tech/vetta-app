import {Text, View} from 'react-native';
import React, {Component} from 'react';
import ActionCard from './ActionCard';
import {styles} from './styles';
import {
  heart,
  notification,
  payment,
  settings,
} from '../../../constants/images';

interface ActionContainerProps {
  navigation: any;
}

class ActionContainer extends Component<ActionContainerProps> {
  render() {
    return (
      <View style={styles.actionContainer}>
        <ActionCard icon={heart} title="Likes" />
        <ActionCard icon={notification} title="notification" />
        <ActionCard icon={settings} title="settings" />
        <ActionCard icon={payment} title="payment" />
      </View>
    );
  }
}

export default ActionContainer;
