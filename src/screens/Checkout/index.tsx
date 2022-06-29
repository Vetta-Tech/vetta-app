import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {CommonActions} from '@react-navigation/native';

import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IState} from './types';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axios';
import {styles} from './styles';
import {bd} from '../../constants/images';
import {OverlaySpinner} from '../Login/PhoneInput';
import {
  Address,
  DeliveryTime,
  LoginError,
  PriceCard,
  SubmitButton,
  TopNavCheckout,
} from '../../components';
import PaymentMethodSelect from './PaymentMethodSelect';

class Checkout extends Component<any, IState> {
  private bottomSheetRef: any;
  private maxLength: number;
  private webViewRef: any;

  constructor(props: any) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.webViewRef = React.createRef();
    this.maxLength = 250;

    this.state = {
      loading: false,
      error: '',
      is_phone_verified: null,
      phone_number: '',
      disableSubmit: true,
      sentOtpSuccess: false,
      pk: 0,
      otp: '',

      userAddress: '',
      showPlacholderTopText: false,
      textLength: 0,
      specialInstruction: '',
      payment_method: 'cash',
      order_create_success: false,
      order_create_error: '',
      GatewayPageURL: '',
      moadlShow: false,
    };
  }

  componentDidMount() {
    this.checkPhoneValidOrNot();
    this.createNewOrder();
    if (this.props.route.params.userAddress) {
      this.setState({
        userAddress: this.props.route.params.userAddress,
      });
    }
  }

  createNewOrder = () => {
    this.setState({
      loading: true,
    });

    axiosInstance
      .post('orders/create-order')
      .then(res => {
        this.setState({
          order_create_success: true,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          order_create_success: false,
          loading: false,
          order_create_error: err.response.msg,
        });
      });
  };

  handleSSLPayment = () => {
    axiosInstance
      .post('orders/ssl-payment')
      .then(res => {
        this.setState({
          loading: false,
          moadlShow: true,
          GatewayPageURL: res.data.GatewayPageURL,
        });
      })
      .catch(err => {
        if (err) {
          this.props.navigation.goBack();
        }
      });
  };

  goback = () => {
    this.webViewRef.current.goBack();
  };

  checkPhoneValidOrNot = async () => {
    this.setState({
      loading: true,
    });

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(`${API_URL}user/is-phone-number-valid`, config)

      .then(res => {
        if (res.status === 200) {
          this.setState(
            {
              loading: false,
              is_phone_verified: res.data.is_phone_verified,
            },
            () => {
              if (this.state.is_phone_verified === false) {
                this.bottomSheetRef.open();
              }
            },
          );
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          is_phone_verified: false,
          error: err.response.data.error,
        });
      });
  };

  handleChange = (text: any) => {
    this.setState({phone_number: text});
    if (this.state.phone_number.length >= 9) {
      this.setState({
        disableSubmit: false,
      });
    } else {
      this.setState({
        disableSubmit: true,
      });
    }
  };

  handleChangeSpecialIntructionText = (text: string) => {
    this.setState({
      specialInstruction: text,
      textLength: this.maxLength - text.length,
    });
  };

  handleChangeOtp = (text: any) => {
    this.setState({otp: text});

    if (this.state.otp.length >= 3) {
      this.setState({
        disableSubmit: false,
      });
    } else {
      this.setState({
        disableSubmit: true,
      });
    }
  };

  sendOtp = async () => {
    console.log('aaaaaaaaaaaaaa');

    this.setState({
      loading: true,
    });
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    const data = {
      phone_number: '+880' + this.state.phone_number,
    };
    axios
      .post(`${API_URL}user/generate-otp`, data, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          sentOtpSuccess: true,
          pk: res.data.pk,
          error: '',
        });
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          error: err.response.data.reason,
          loading: false,
        });
      });
  };

  confimrOrder = async () => {
    this.setState({
      loading: true,
    });

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    const data = {
      payment_method: 'cash',
    };

    axios
      .post(`${API_URL}orders/order-confirm`, data, config)

      .then(res => {
        console.log('res', res);
        if (res.status === 200) {
          this.props.navigation.replace('Payment', {
            success: true,
            payment_method: 'cash',
          });
        }
      })
      .catch(err => {
        console.log('assssssssssssssssss', err.response.data);
      });
  };

  validateOtp = async () => {
    console.log('ssssssssssssss');
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    console.log(API_URL);

    const data = {
      otp: this.state.otp,
      pk: this.state.pk,
      phone_number: this.state.phone_number,
    };
    this.setState({
      loading: true,
    });

    axios
      .post(`${API_URL}user/validate-otp`, data, config)
      .then(res => {
        this.setState(
          {
            loading: false,
          },
          () => this.bottomSheetRef.close(),
        );
      })
      .catch(err => {
        console.log('errrrrrr', err.response);
        this.setState({
          loading: false,
        });
      });
  };

  checkUserPhoneNumber = () => {};

  handleSubmit = () => {
    if (this.state.sentOtpSuccess) {
      this.validateOtp();
    } else {
      this.sendOtp();
    }
  };

  _onLoad(state: any) {
    console.log('state_urllllllll', state);
    if (state.url === 'https://www.youtube.com/') {
      this.props.navigation.replace('Payment', {
        success: true,
        payment_method: 'card',
      });
    }
    if (state.url === 'http://192.168.1.110:8000/api/v1/orders/test') {
      this.setState({
        moadlShow: false,
      });
      this.props.navigation.replace('Cart');
    }
    if (state.url === 'https://github.com/') {
      this.props.navigation.replace('Cart');
    }
  }

  render() {
    if (this.state.GatewayPageURL) {
      return (
        <Modal animationType={'slide'} visible={this.state.moadlShow}>
          <WebView
            ref={this.webViewRef}
            javaScriptEnabled={true}
            source={{uri: this.state.GatewayPageURL}}
            onError={err => this.props.navigation.navigate('Cart')}
            onNavigationStateChange={state => this._onLoad(state)}
          />
        </Modal>
      );
    }
    return (
      <ScrollView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <RBSheet
          ref={ref => {
            this.bottomSheetRef = ref;
          }}
          // closeOnDragDown={true}
          dragFromTopOnly={true}
          closeOnPressBack={false}
          height={Dimensions.get('window').height - 50}
          openDuration={250}
          customStyles={{
            container: {
              borderTopStartRadius: 12,
              borderTopEndRadius: 12,
            },
          }}>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: 'white',
              padding: 5,
              width: '100%',
              height: '100%',
            }}>
            <View style={styles.phoneTop}>
              <Text style={styles.headingText}>Enter Your Phone Number</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                padding: 10,
              }}>
              <View style={styles.searchBar__unclicked}>
                <Image
                  source={bd}
                  style={{
                    height: 30,
                    width: 30,
                    padding: 5,
                  }}
                />

                <Text
                  style={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 12,
                    padding: 5,
                  }}>
                  +880
                </Text>

                <TextInput
                  maxLength={10}
                  autoFocus={true}
                  keyboardType="numeric"
                  style={styles.searchBar__unclicked}
                  onChangeText={text => this.handleChange(text)}
                />
              </View>
              {this.state.sentOtpSuccess && (
                <View
                  style={[
                    styles.searchBar__unclicked,
                    {marginTop: 10, width: '60%'},
                  ]}>
                  <TextInput
                    maxLength={10}
                    autoFocus={true}
                    keyboardType="numeric"
                    style={styles.searchBar__unclicked}
                    onChangeText={text => this.handleChangeOtp(text)}
                    placeholder="      - - - -"
                  />
                </View>
              )}

              <View>
                {this.state.error !== '' ? (
                  <View
                    style={{
                      marginTop: 5,
                    }}>
                    <LoginError msg={this.state.error} />
                  </View>
                ) : null}
                <TouchableOpacity
                  // disabled={this.state.disableSubmit}
                  onPress={() => this.handleSubmit()}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      width: 90,
                      padding: 15,
                      alignSelf: 'flex-end',
                      borderRadius: 12,
                      marginTop: 15,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                      }}>
                      {this.state.sentOtpSuccess ? 'Verify' : 'Send Otp'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {this.props.loading && <OverlaySpinner />}
          </View>
        </RBSheet>

        <View
          style={{
            padding: 5,

            // height: '100%',
          }}>
          <TopNavCheckout name="Checkout" />
          <View
            style={{
              paddingTop: 15,
              padding: 10,
            }}>
            <Address address={this.state.userAddress} />
            <View
              style={{
                marginTop: 15,
                borderRadius: 12,
                backgroundColor: '#f2f2f2',
              }}>
              {this.state.showPlacholderTopText ? (
                <View style={styles.intructionTopTextContainer}>
                  <Text style={[styles.intructionTopText, {marginLeft: 15}]}>
                    Special Instruction
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={[styles.intructionTopText]}>
                        {this.state.textLength}/
                      </Text>
                      <Text
                        style={[styles.intructionTopText, {marginRight: 15}]}>
                        {this.maxLength}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}

              <TextInput
                onChangeText={(text: any) =>
                  this.handleChangeSpecialIntructionText(text)
                }
                maxLength={this.maxLength}
                multiline={true}
                numberOfLines={5}
                onPressIn={() => console.log('asasd')}
                onFocus={() => {
                  this.setState({
                    showPlacholderTopText: true,
                  });
                }}
                placeholderTextColor={'black'}
                underlineColorAndroid="transparent"
                style={{
                  height: 100,
                  textAlignVertical: 'top',
                  borderRadius: 12,
                  fontSize: 12,
                  padding: 15,
                  fontFamily: 'Montserrat-Bold',
                }}
                placeholder={`${
                  this.state.showPlacholderTopText ? '' : 'Special Instruction'
                }`}
              />
            </View>

            <View>
              <DeliveryTime />
            </View>
            <View
              style={{
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 16,
                  color: 'black',
                }}>
                Payment Method
              </Text>
              <View
                style={{
                  marginTop: 5,
                  // padding: 4,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      payment_method: 'cash',
                    });
                  }}>
                  <PaymentMethodSelect
                    title="Cash On Delivery"
                    logoSrc="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/cash-on-delivery+(1).png"
                    active={this.state.payment_method === 'cash' ? true : false}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      payment_method: 'bkash',
                    });
                  }}>
                  <PaymentMethodSelect
                    title="Pay With Bkash"
                    logoSrc="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/2022/bkash.png"
                    active={
                      this.state.payment_method === 'bkash' ? true : false
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      payment_method: 'card',
                    });
                  }}>
                  <PaymentMethodSelect
                    title="Pay With Card"
                    logoSrc="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/2022/card.png"
                    active={this.state.payment_method === 'card' ? true : false}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#f2f2f2',
            marginTop: 15,
            padding: 15,
          }}>
          <PriceCard title="Sub Total" amount={250} />
          <PriceCard title="Delivery Fee" amount={50} />
          <PriceCard title="Total" amount={300} active={true} />

          <View>
            {this.state.payment_method === 'cash' && (
              <TouchableOpacity onPress={() => this.confimrOrder()}>
                <SubmitButton
                  icon="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/cash-on-delivery+(1).png"
                  title="Confirm Order"
                  amount={300}
                />
              </TouchableOpacity>
            )}
            {this.state.payment_method === 'bkash' && (
              <TouchableOpacity>
                <SubmitButton
                  title="Pay and confirm order"
                  icon="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/2022/bkash.png"
                  amount={300}
                />
              </TouchableOpacity>
            )}
            {this.state.payment_method === 'card' && (
              <TouchableOpacity onPress={() => this.handleSSLPayment()}>
                <SubmitButton
                  title="Pay and confirm order"
                  icon="https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/2022/card.png"
                  amount={300}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Checkout;
