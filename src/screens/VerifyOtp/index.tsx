import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';

import {connect} from 'react-redux';

import {LoginError, TopNav} from '../../components';
import {OverlaySpinner} from '../Login/PhoneInput';
import {validateOtp} from '../../state/actionCreatores/auth';
import {AppState, RootState} from '../../state/store';

interface VerifyOtPState {}

class VerifyOtp extends Component<any, VerifyOtPState> {
  state = {
    otp: '',
    error: '',
    success: null,
    loading: false,
    disableSubmit: true,
    pk: '',
  };

  componentDidUpdate() {
    if (this.props.validateStatus === 200) {
      this.props.navigation.replace('Home');
    }
  }

  componentDidMount() {
    if (!this.props.route.params.pk) {
      this.props.navigation.goBack();
      this.setState({
        error: 'Submite went wrong',
      });
    }
  }

  handleSubmit = () => {
    this.props.validateOtpReq(this.state.otp, this.props.route?.params?.pk);
  };

  handleChange = (text: any) => {
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

  render() {
    console.log(this.props.validateStatus);
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
          title="Verify"
          left={false}
          leftIcon="asd"
        />

        <View style={styles.phoneTop}>
          <Text style={styles.headingText}>Enter Your 4-digit code</Text>
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
            <TextInput
              maxLength={10}
              autoFocus={true}
              keyboardType="numeric"
              style={styles.searchBar__unclicked}
              placeholder="- - - -"
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
                  marginTop: 20,
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
        {this.props.loading && <OverlaySpinner />}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    status: state.auth.status,
    pk: state.auth.pk,
    error: state.auth.error,
    validateStatus: state.auth.validateStatus,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    validateOtpReq: (otp: any, pk: any) => dispatch(validateOtp({otp, pk})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);

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
