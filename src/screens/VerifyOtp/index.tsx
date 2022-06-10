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

interface VerifyOtPState {}

class VerifyOtp extends Component<any, VerifyOtPState> {
  state = {
    otp: '',
    error: '',
    success: null,
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
    axios
      .post(`${API_URL}auth/validate/`, {
        otp: this.state.otp,
        pk: this.props.route?.params?.pk,
      })
      .then(res => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          success: false,
          error: err.message,
        });
      });
  };

  render() {
    console.log(this.state.success);
    return (
      <View
        style={{
          marginTop: 25,
          padding: 15,
        }}>
        <TextInput
          maxLength={4}
          onChangeText={text => this.setState({otp: text})}
          style={{
            borderWidth: 1,
          }}
        />
        {this.state.success === true ? (
          <Text style={{padding: 5, textAlign: 'center', color: 'green'}}>
            Successfully Verified
          </Text>
        ) : null}
        {this.state.success === false ? (
          <Text style={{padding: 5, textAlign: 'center', color: 'red'}}>
            {this.state.error}
          </Text>
        ) : null}
        <TouchableOpacity onPress={this.handleSubmit}>
          <View style={{padding: 15, marginTop: 5, backgroundColor: 'black'}}>
            <Text style={{color: 'white'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default VerifyOtp;
