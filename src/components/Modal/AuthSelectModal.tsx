//@ts-nocheck
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import axios from 'axios';
import Modal from 'react-native-modal';
import LottiView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {API_URL} from '@env';

interface AuthSelectModalProps {
  navigation: any;
  isVisible: boolean;
  handleShowModal: any;
}

interface ErrorObj {
  code: number;
}

export default class AuthSelectModal extends Component<
  AuthSelectModalProps,
  any
> {
  state = {
    showModal: false,
    success: false,
    error: null,
  };

  handleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  componentDidMount() {
    // const token = AsyncStorage.getItem('token');
    // console.log('token', token);
    // if (token) {
    //   this.props.navigation.navigate('Home');
    // }
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
              console.log('1');

              if (res.status === 200) {
                await AsyncStorage.setItem('token', res.data.token);

                const token = await AsyncStorage.getItem('token');
                console.log('token', token);
                this.props.navigation.navigate('Home');
              }
            })
            .catch(err => {
              this.setState({
                error: 'Something went wrong',
              });
            });
        });
      })
      .then(async res => {
        console.log('2');
        console.log(res.data);
      })
      .catch(error => {
        this.setState({
          error: 'Something went wrong',
        });
      });
  };

  render() {
    return (
      <GestureRecognizer onSwipeDown={this.props.handleShowModal}>
        <Modal
          onBackButtonPress={() => console.log('asddddd')}
          statusBarTranslucent={true}
          isVisible={this.props.isVisible}
          hasBackdrop={true}
          backdropOpacity={0.7}
          style={{flex: 1, margin: 0}}>
          <View
            style={{
              height: '40%',
              marginTop: 'auto',
              backgroundColor: 'white',
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PhoneInputComp')
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
                  style={[
                    styles.btn,
                    {backgroundColor: '#f2f2f2', margin: 15},
                  ]}>
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
        </Modal>
      </GestureRecognizer>
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
