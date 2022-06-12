import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';

import {API_URL} from '@env';
import axios from 'axios';
import {TopNav} from '../../components';
import {OverlaySpinner} from '../Login/PhoneInput';

interface VerifyOtPState {}

class VerifyOtp extends Component<any, VerifyOtPState> {
  state = {
    otp: '',
    error: '',
    success: null,
    loading: false,
  };

  componentDidMount() {
    console.log(this.props.route.params.pk);
    if (!this.props.route.params.pk) {
      this.props.navigation.goBack();
      this.setState({
        error: 'Submite went wrong',
      });
    }
  }

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    axios
      .post(`${API_URL}auth/validate/`, {
        otp: this.state.otp,
        pk: this.props.route?.params?.pk,
      })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({
            pk: res.data.pk,
            successfullySendOtp: true,
          });
          this.props.navigation.push('Home');
        }
        this.setState({
          success: true,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          success: false,
          error: err.message,
          loading: false,
        });
      });
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
        <TopNav icon="chevron-left" title="Verify" />

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
              onChangeText={text => this.setState({otp: text})}
            />
          </View>

          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <View
              style={{
                backgroundColor: 'black',
                width: 80,
                padding: 15,
                alignSelf: 'flex-end',
                borderRadius: 12,
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
        {this.state.loading && <OverlaySpinner />}
      </View>
    );
  }
}

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

export default VerifyOtp;
