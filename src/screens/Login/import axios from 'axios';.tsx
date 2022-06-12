import axios from 'axios';
import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from 'react-native';

import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {API_URL} from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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

  handleLoginFacebook = (data: any) => {
    console.log(data.accessToken.toString());

    axios
      .post(`http://192.168.152.87:8000/api/login/social/token/`, {
        provider: 'facebook',
        code: data.accessToken.toString(),
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

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
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error', error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                // console.log(data.accessToken.toString());
                this.handleLoginFacebook(data);
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
        <Button
          title={'Sign in with Google'}
          onPress={() => {
            GoogleSignin.configure({
              ClientId:
                '916014120808-hf5qu9j8t0tdfeccu9nnqveuu8md92h3.apps.googleusercontent.com',
            });
            GoogleSignin.hasPlayServices()
              .then(hasPlayService => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then(userInfo => {
                      console.log(JSON.stringify(userInfo));
                    })
                    .catch(e => {
                      console.log('ERROR IS: ' + JSON.stringify(e));
                    });
                }
              })
              .catch(e => {
                console.log('ERROR IS: ' + JSON.stringify(e));
              });
          }}
        />
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
