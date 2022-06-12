import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  Button,
  Text,
  Image,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {API_URL} from '@env';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      loaded: false,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '839900927386-giu1evpsfnet2e4a0ge92kl213f4mvd6.apps.googleusercontent.com',
    });
  }

  signIn = async () => {
    try {
      console.log('asdsad');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true,
      });
      console.log(this.state.userGoogleInfo);
    } catch (error) {
      if (error!.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1');
      } else if (error!.code === statusCodes.IN_PROGRESS) {
        console.log('e 2');
      } else if (error!.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3');
      } else {
        console.log('err', error);
      }
    }
  };

  handleSignIn = (accesstoken: string) => {
    console.log('response', accesstoken);

    axios
      .post('http://192.168.0.204:8000/rest-auth/google/', {
        access_token: accesstoken,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log('err', err));
  };

  render() {
    return (
      <Button
        title={'Sign in with Google'}
        onPress={() => {
          GoogleSignin.configure({
            webClientId:
              '839900927386-giu1evpsfnet2e4a0ge92kl213f4mvd6.apps.googleusercontent.com',
            offlineAccess: true,
          });
          GoogleSignin.hasPlayServices()
            .then(hasPlayService => {
              if (hasPlayService) {
                GoogleSignin.signIn()
                  .then(data => {
                    // console.log('TEST', JSON.stringify(data));
                    const user = GoogleSignin.getTokens().then(res =>
                      this.handleSignIn(res.accessToken),
                    );
                  })
                  .catch(er => console.log(er));
              }
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }}
      />
    );
  }
}

export default App;

// // '839900927386-mus78gu7pirp1p3snfdlj7llo5l4dgum.apps.googleusercontent.com',
