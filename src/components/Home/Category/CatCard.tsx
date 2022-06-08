import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

type PRoPsType = {
  name: string;
};

const CatCard = ({name}: PRoPsType) => {
  return (
    <TouchableOpacity style={{paddingRight: 10, paddingTop: 10}}>
      <View
        style={{
          backgroundColor: '#f2f2f2',
          padding: 12,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 30,
            height: 40,
          }}
          source={require('../../../../assets/Bottle.png')}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: 'Montserrat-Medium',
          color: 'black',
          width: 50,
          margin: 'auto',
          justifyContent: 'center',
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CatCard;

const styles = StyleSheet.create({});
