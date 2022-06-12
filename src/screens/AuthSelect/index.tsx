import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {Component} from 'react';

import GestureRecognizer from 'react-native-swipe-gestures';

import {auth_gb, google, logo} from '../../constants/images';
import LottieView from 'lottie-react-native';

export default class AuthSelect extends Component<any, any> {
  state = {
    showModal: false,
  };

  handleShowModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={auth_gb}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View>
              <Image
                source={logo}
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 25,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
            <View style={{padding: 20, marginBottom: 15}}>
              <View>
                <Text style={styles.textStyleContainer}>
                  Get your essentials delivered in hours
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.setState({showModal: true})}>
                  <View style={[styles.btn, {backgroundColor: 'black'}]}>
                    <Text style={styles.btnText}>Get started</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
                <View>
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: 'white',
                      padding: 10,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    OR
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <View style={[styles.btn, {backgroundColor: '#f2f2f2'}]}>
                    <Text style={[styles.btnText, {color: 'black'}]}>
                      Continue as guest
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <GestureRecognizer onSwipeDown={() => this.handleShowModal()}>
            <Modal
              statusBarTranslucent={true}
              isVisible={this.state.showModal}
              hasBackdrop={true}
              backdropOpacity={0.5}
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
                        <LottieView
                          source={require('./lottie/lf20_5gtk2div.json')}
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
                  <TouchableOpacity>
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
                        <LottieView
                          source={require('./lottie/lf20_ory7dsug.json')}
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
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'black'}}
                  />
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
                  <View
                    style={{flex: 1, height: 1, backgroundColor: 'black'}}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <View
                    style={[
                      styles.btn,
                      {backgroundColor: '#f2f2f2', margin: 15},
                    ]}>
                    <Text style={[styles.btnText, {color: 'black'}]}>
                      Continue as guest
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </GestureRecognizer>
        </ImageBackground>
      </View>
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
