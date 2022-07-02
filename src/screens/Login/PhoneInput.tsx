import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {LoginError, TopNav} from '../../components';
import {bd} from '../../constants/images';
import {sendOtp} from '../../state/actionCreatores/auth';
import {RootState} from '../../state/store';
import {API_URL} from '@env';
import AnimatedLottieView from 'lottie-react-native';

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

class PhoneInput extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      phone_number: '',
      disableSubmit: true,
    };
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.status === 200) {
      this.props.navigation.navigate('VerifyOtp', {
        pk: this.props.pk,
      });
    }
  }

  handleSubmit = () => {
    this.props.sentOtpRequest('+880' + this.state.phone_number);

    if (this.props.status === 200) {
      this.props.navigation.navigate('VerifyOtp', {
        pk: this.state.pk,
        number: this.state.phone_number,
      });
    }
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

  render() {
    return (
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
        <TopNav
          navigation={this.props.navigation}
          icon="chevron-left"
          title="Sign In"
          left={false}
          leftIcon="trash"
        />

        <View style={styles.phoneTop}>
          <Text style={styles.headingText}>Enter Your Phone Number</Text>
        </View>
        <View
          style={{
            flex: 1,
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

          <View>
            {this.props.error !== '' ? (
              <LoginError msg="Something went wrong" />
            ) : null}
            <TouchableOpacity
              disabled={this.state.disableSubmit}
              onPress={() => this.handleSubmit()}>
              <View
                style={{
                  backgroundColor: 'black',
                  width: 80,
                  padding: 15,
                  alignSelf: 'flex-end',
                  borderRadius: 12,
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  Submit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {this.props.loading && (
          <AnimatedLottieView
            style={{
              flex: 1,
              backgroundColor: 'rgba(230, 228, 228, 0.5)',
            }}
            autoPlay={true}
            source={require('../../../assets/lottie/24663-loading-logo.json')}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  console.log(state);
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    status: state.auth.status,
    pk: state.auth.pk,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sentOtpRequest: (phone_number: any) => dispatch(sendOtp({phone_number})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneInput);

const styles = StyleSheet.create({
  phoneTop: {
    marginTop: 30,
  },
  headingText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 15,
    color: 'black',
  },
  searchBar__unclicked: {
    padding: 6,
    flexDirection: 'row',
    // width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
  spinnerView: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
});
