import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {TopNavCheckout} from '../../components';

import {styles} from '../Checkout/styles';

interface State {
  showPlacholderTopText: boolean;
  textLength: number;
  specialInstruction: any;
}

export default class FeedBack extends Component<any, State> {
  private maxLength: number;
  constructor(props: any) {
    super(props);
    this.maxLength = 250;

    this.state = {
      showPlacholderTopText: false,
      textLength: 0,
      specialInstruction: '',
    };
  }

  handleChangeSpecialIntructionText = (text: string) => {
    this.setState({
      specialInstruction: text,
      textLength: this.maxLength - text.length,
    });
  };

  render() {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
        }}>
        <TopNavCheckout naviagtion={this.props.naviagtion} name="Feedback" />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              marginTop: 15,
              borderRadius: 12,
            }}>
            <View
              style={{
                padding: 4,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: 'black',
                  fontSize: 18,
                }}>
                Send Feedback
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Light',
                }}>
                Tell us what you love about the app, or what we could be doing
                better
              </Text>
            </View>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: '#f2f2f2',
                marginTop: 20,
              }}>
              {this.state.showPlacholderTopText ? (
                <View style={styles.intructionTopTextContainer}>
                  <Text style={[styles.intructionTopText, {marginLeft: 15}]}>
                    Enter Feedback
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
                  height: 120,
                  textAlignVertical: 'top',
                  borderRadius: 12,
                  fontSize: 12,
                  padding: 15,
                  fontFamily: 'Montserrat-Bold',
                }}
                placeholder={`${
                  this.state.showPlacholderTopText ? '' : 'Enter Feedback'
                }`}
              />
            </View>
          </View>

          <TouchableOpacity disabled={this.state.textLength === 0}>
            <View
              style={{
                backgroundColor: this.state.textLength === 0 ? 'gray' : 'black',
                padding: 18,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Send Feedback
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
