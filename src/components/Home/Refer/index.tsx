import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Refer = () => {
  return (
    <View style={{marginBottom: 150, marginTop: 15}}>
      <ImageBackground
        imageStyle={{borderRadius: 20, opacity: 0.5}}
        style={{
          width: '100%',
          height: 400,
          backgroundColor: '#5B8E7D',
          borderRadius: 20,
        }}
        source={require('../../../../assets/firendship.jpeg')}>
        <View
          style={{
            alignItems: 'center',
            margin: '20%',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'white',
              fontSize: 25,
            }}>
            Refer And Earn
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: 'white',
              textAlign: 'center',
              marginTop: 10,
            }}>
            You both of you get $10
          </Text>
          <TouchableOpacity>
            <View
              style={{
                marginTop: 25,
                backgroundColor: 'white',
                paddingLeft: 30,
                paddingRight: 30,
                padding: 10,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                }}>
                Learn More
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({});
