import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import WebView from 'react-native-webview';
import {AboutList, TopNavCheckout} from '../../components';
import {arrow} from '../../constants/images';

interface AboutUsProps {
  navigation: any;
}

const AboutUs = (props: AboutUsProps) => {
  const [showTermsWebview, setShowTermsWebview] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      setShowTermsWebview(false);
    });

    return unsubscribe;
  }, [props.navigation]);

  if (showTermsWebview) {
    return (
      <WebView
        source={{
          uri: 'https://demo.vetta.app/partnership',
        }}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{flex: 1}}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        padding: 10,
      }}>
      <TopNavCheckout name="About" />
      <View
        style={{
          marginTop: 10,
        }}>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            padding: 5,
          }}>
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
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                    textTransform: 'capitalize',
                  }}>
                  Terms and condition
                </Text>
              </View>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            padding: 5,
          }}>
          <TouchableOpacity>
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
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                    textTransform: 'capitalize',
                  }}>
                  app version
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Lighg',
                    fontSize: 12,
                    textTransform: 'capitalize',
                  }}>
                  v16.54 Live
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            padding: 5,
          }}>
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
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                    textTransform: 'capitalize',
                  }}>
                  Licenses and registrations
                </Text>
              </View>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {},
});
