import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {arrow} from '../../constants/images';
import WebView from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

interface AboutListProps {
  txt: string;
  subTxt?: string;
}

const AboutList = ({txt, subTxt}: AboutListProps) => {
  const [showTermsWebview, setShowTermsWebview] = React.useState(false);

  const renderTerms = () => {
    return (
      <WebView
        source={{
          uri: 'google.com',
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{flex: 1}}
      />
    );
  };

  return (
    <View
      style={{
        paddingLeft: 10,
        paddingRight: 10,
        padding: 5,
      }}>
      {showTermsWebview && renderTerms()}
      <TouchableOpacity onPress={() => setShowTermsWebview(true)}>
        <View
          style={{
            height: 50,
            width: '100%',
            borderBottomColor: '#e3e3e3',
            borderBottomWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 12,
            paddingBottom: 12,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
                textTransform: 'capitalize',
              }}>
              {txt}
            </Text>
            {subTxt && (
              <Text
                style={{
                  fontFamily: 'Montserrat-Lighg',
                  fontSize: 12,
                  textTransform: 'capitalize',
                }}>
                {subTxt}
              </Text>
            )}
          </View>
          {subTxt ? null : <Image source={arrow} style={styles.img} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AboutList;

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20,
  },
});
