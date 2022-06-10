import axios from 'axios';
import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import {API_URL} from '@env';

interface PhoneInputState {
  phone_number: string;
  pk: number;
  successfullySendOtp: boolean;
}

export class PhoneInputComp extends Component<any, PhoneInputState> {
  constructor(props: any) {
    super(props);
    this.state = {
      phone_number: '+8801784291144',
      pk: 0,
      successfullySendOtp: false,
    };
  }

  sendOtpAndRedirect = (props: any) => {
    axios
      .post(`${API_URL}auth/generate/`, {phone_number: this.state.phone_number})
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
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <TextInput
            style={{borderWidth: 2, width: '100%'}}
            value={this.state.phone_number}
            onChangeText={text => this.setState({phone_number: text})}
          />

          <TouchableOpacity
            onPress={this.sendOtpAndRedirect}
            style={styles.button}>
            <Text>Send OTP</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7CDB8A',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  redColor: {
    backgroundColor: '#F57777',
  },
  message: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default PhoneInputComp;
