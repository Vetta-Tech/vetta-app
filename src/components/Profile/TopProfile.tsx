import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';

import {styles} from './TopProfilestyle';

export default class TopProfileSection extends Component {
  render() {
    return (
      <View style={styles.profileTopContainer}>
        <View>
          <Text style={styles.profileName}>Shahriar</Text>
          <Text style={styles.profileEmail}>sohanmock@gmail.com</Text>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/a-/AOh14GgLZGrslvG-G8sMeDpNZYXjmuernU7DGR6TJG08=s288-p-rw-no',
            }}
            style={styles.profileImg}
          />
        </View>
      </View>
    );
  }
}
