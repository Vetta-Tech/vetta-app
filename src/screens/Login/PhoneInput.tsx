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

import axios from 'axios';

import {TopNav} from '../../components';
import {bd} from '../../constants/images';
import {API_URL} from '@env';

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default class PhoneInput extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      phone_number: '',
      loading: false,
    };
  }

  handleSubmit = () => {
    console.log('+880' + this.state.phone_number);
    this.setState({
      loading: true,
    });
    axios
      .post(`http://192.168.0.204:8000/api/v1/auth/generate/`, {
        phone_number: '+880' + this.state.phone_number,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            pk: res.data.pk,
            successfullySendOtp: true,
          });
          this.props.navigation.push('VerifyOtp', {
            pk: this.state.pk,
            number: this.state.phone_number,
          });
        }
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    console.log(this.state.loading);
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
        <TopNav icon="chevron-left" title="Sign In" />

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
              onChangeText={text => this.setState({phone_number: text})}
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
