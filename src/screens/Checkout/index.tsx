import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IState} from './types';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
import {bd} from '../../constants/images';
import {OverlaySpinner} from '../Login/PhoneInput';
import {LoginError} from '../../components';

class Checkout extends Component<any, IState> {
  private bottomSheetRef: any;
  constructor(props: any) {
    super(props);
    this.bottomSheetRef = React.createRef();

    this.state = {
      loading: false,
      error: '',
      is_phone_verified: null,
      phone_number: '',
      disableSubmit: true,
      sentOtpSuccess: false,
      pk: 0,
      otp: '',
    };
  }

  componentDidMount() {
    this.checkPhoneValidOrNot();
  }

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

  render() {
    console.log('is_phone_verified', this.state.pk);
    return (
      <View>
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
      </View>
    );
  }
}

export default Checkout;
