import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {API_URL_IMAGE} from '@env';

interface BrandCardProps {
  navigation: {
    navigate: any;
    push: any;
  };
  item: {
    logo: string;
    name: string;
  };
}

export default class BrandCard extends Component<BrandCardProps> {
  render() {
    const {navigation, item} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.push('Details')}>
        <View
          style={{
            paddingTop: 5,
            padding: 14,
            paddingBottom: 5,
            paddingLeft: 2,
          }}>
          <View
            style={{
              backgroundColor: '#ededed',
              borderRadius: 12,
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').width / 2.7,
                width: Dimensions.get('window').width / 2.4,
              }}
              source={{uri: `${API_URL_IMAGE}${item.logo}`}}
            />
            <View
              style={{
                padding: 5,
                backgroundColor: '#F7F5F2',
                borderBottomEndRadius: 12,
                borderBottomStartRadius: 12,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 18,
                  padding: 5,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
