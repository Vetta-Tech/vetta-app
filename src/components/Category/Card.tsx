import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {API_URL_IMAGE} from '@env';

interface CategoryCardProps {
  item: {
    name: string;
    image: string;
  };
  navigation: any;
}

export default class CategoryCard extends Component<CategoryCardProps> {
  render() {
    const {item, navigation} = this.props;
    console.log(item.name);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('ProductList', {
            cat: item.name,
          })
        }>
        <View
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 2,
            padding: 5,
          }}>
          <View
            style={{
              backgroundColor: '#ededed',
              borderRadius: 12,
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: Dimensions.get('window').width / 2.3,
                width: Dimensions.get('window').width / 2.3,
              }}
              source={{
                uri: `${API_URL_IMAGE}${item.image}`,
              }}
            />
            <View style={{padding: 5}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  textAlign: 'center',
                  color: 'black',
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
