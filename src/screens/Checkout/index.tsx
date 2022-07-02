import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';

import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IState} from './types';
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
import {CheckouState} from '../../state/interfaces/checkout';
import {CheckoutProps} from './types';
import {
  createNewOrder,
  checkPhoneValidOrNot,
  checkoutPhoneVerificationOtpSent,
  checkoutPhoneVerificationValidateOtp,
  changeStateToDefault,
} from '../../state/actionCreatores';

import {AppState} from '../../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {CheckoutAction} from '../../state/actions/checkout';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

type Props = CheckoutProps & LinkStateProps & LinkDispatchProps;

class Checkout extends Component<Props, IState> {
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
    this.props.checkPhoneValidOrNot(this.bottomSheetRef);
    this.props.createNewOrder();
    if (this.props.route.params.userAddress) {
      this.setState({
        userAddress: this.props.route.params.userAddress,
      });
    }

    this.props.navigation.addListener('blur', () => {
      this.props.changeStateToDefault();
    });
  }

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

  confimrOrder = async () => {
    this.props.navigation.replace('Payment', {
      success: true,
      payment_method: 'cash',
    });
  };

  checkUserPhoneNumber = () => {};

  handleSubmit = () => {
    if (this.props.checkout.sentOtpSuccess) {
      this.props.checkoutPhoneVerificationValidateOtp(
        this.bottomSheetRef,
        this.state.otp,
        this.props.checkout.pk,
        this.state.phone_number,
      );
    } else {
      this.props.checkoutPhoneVerificationOtpSent(this.state.phone_number);
    }
  };

  _onLoad(state: any) {
    if (state.url === 'https://www.youtube.com/') {
      this.props.navigation.replace('Payment', {
        success: true,
        payment_method: 'card',
      });
    }
    if (state.url === 'http://192.168.0.204:8000/api/v1/orders/test') {
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
              {this.props.checkout.sentOtpSuccess && (
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
                {this.props.checkout.error !== '' ? (
                  <View
                    style={{
                      marginTop: 5,
                    }}>
                    <LoginError msg="Something went wrong" />
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
                        textAlign: 'center',
                      }}>
                      {this.props.checkout.sentOtpSuccess
                        ? 'Verify'
                        : 'Send Otp'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {this.props.checkout.loading && <OverlaySpinner />}
          </View>
        </RBSheet>

        <View
          style={{
            padding: 5,

            // height: '100%',
          }}>
          <TopNavCheckout naviagtion={this.props.navigation} name="Checkout" />
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

interface LinkStateProps {
  checkout: CheckouState;
}

interface LinkDispatchProps {
  createNewOrder: () => void;
  checkPhoneValidOrNot: (bottomSheetRef: any) => void;
  checkoutPhoneVerificationOtpSent: (phone_number: number | string) => void;
  checkoutPhoneVerificationValidateOtp: (
    bottomSheetRef: any,
    otp: number | string,
    pk: number,
    phone_number: number | string,
  ) => void;
  changeStateToDefault: () => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    checkout: state.checkout,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CheckoutAction>,
): LinkDispatchProps => {
  return {
    createNewOrder: bindActionCreators(createNewOrder, dispatch),
    checkPhoneValidOrNot: bindActionCreators(checkPhoneValidOrNot, dispatch),
    checkoutPhoneVerificationOtpSent: bindActionCreators(
      checkoutPhoneVerificationOtpSent,
      dispatch,
    ),
    checkoutPhoneVerificationValidateOtp: bindActionCreators(
      checkoutPhoneVerificationValidateOtp,
      dispatch,
    ),
    changeStateToDefault: bindActionCreators(changeStateToDefault, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
