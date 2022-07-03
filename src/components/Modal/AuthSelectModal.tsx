//@ts-nocheck
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import axios from 'axios';
import Modal from 'react-native-modal';
import LottiView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {API_URL} from '@env';

interface AuthSelectModalProps {
  navigation: any;
  isVisible: boolean;
  myRef: any;
  redirectScreen?: string;
}

export default class AuthSelectModal extends Component<
  AuthSelectModalProps,
  any
> {
  state = {
    error: 'Something went wrong',
  };

  componentDidMount() {
    GoogleSignin.configure({
      ClientId:
        '916014120808-hf5qu9j8t0tdfeccu9nnqveuu8md92h3.apps.googleusercontent.com',
    });
  }

  googleLogin = async () => {
    GoogleSignin.signIn()
      .then(data => {
        GoogleSignin.getTokens().then(res => {
          axios
            .post(`${API_URL}rest-auth/google/`, {
              access_token: res.accessToken,
            })
            .then(async res => {
              if (res.status === 200) {
                await AsyncStorage.setItem('token', res.data.token);
                this.props.navigation.navigate(
                  this.props.redirectScreen
                    ? this.props.redirectScreen
                    : 'Home',
                );
              }
            })
            .catch(err => {
              this.setState({
                error: 'Something went wrong',
              });
            });
        });
      })
      .then(async res => {})
      .catch(error => {
        this.setState({
          error: 'Something went wrong',
        });
      });
  };

  render() {
    return (
      <RBSheet
        ref={this.props.myRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={Dimensions.get('window').height / 2}
        openDuration={250}
        customStyles={{
          container: {
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
          },
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
          }}>
          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('PhoneInputComp', {
                  redirectScreen: this.props.redirectScreen
                    ? this.props.redirectScreen
                    : 'Home',
                })
              }>
              <View
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#f2f2f2',
                    margin: 15,
                    marginBottom: 0,
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <LottiView
                    source={require('../../../assets/lottie/lf20_5gtk2div.json')}
                    autoPlay
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    loop
                  />
                  <Text
                    style={[
                      styles.btnText,
                      {color: 'black', fontSize: 16, paddingLeft: 10},
                    ]}>
                    Continue with Phone
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.googleLogin()}>
              <View
                style={[styles.btn, {backgroundColor: '#f2f2f2', margin: 15}]}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <LottiView
                    source={require('../../../assets/lottie/lf20_ory7dsug.json')}
                    autoPlay
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    loop={true}
                  />
                  <Text
                    style={[
                      styles.btnText,
                      {color: 'black', fontSize: 16, paddingLeft: 10},
                    ]}>
                    Continue with Google
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: 'black',
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                }}>
                OR
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <View
              style={[styles.btn, {backgroundColor: '#f2f2f2', margin: 15}]}>
              <Text style={[styles.btnText, {color: 'black'}]}>
                Continue as guest
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({
  textStyleContainer: {
    width: '60%',
    fontSize: 36,
    color: 'white',
    paddingBottom: 20,
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  btn: {
    padding: 18,
    borderRadius: 15,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalInner: {
    height: 200,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
