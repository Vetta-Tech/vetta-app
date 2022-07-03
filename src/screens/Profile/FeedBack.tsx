import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {createFeedBack} from '../../state/actionCreatores/';

import {LogoLoading, TopNavCheckout} from '../../components';

import {styles} from '../Checkout/styles';
import {connect} from 'react-redux';
import {ProfileState} from '../../state/interfaces/profile';
import {AppState} from '../../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {ProfileAction} from '../../state/actions/profile';
import {bindActionCreators} from 'redux';
import {toastConfig} from '../../components/CsutomToast';

interface State {
  showPlacholderTopText: boolean;
  textLength: number;
  feedback: string;
}

interface FeedBackProps {
  naviagtion: any;
}

type Props = LinkStateProps & LinkDispatchProps & FeedBackProps;
class FeedBack extends Component<Props, State> {
  private maxLength: number;
  constructor(props: any) {
    super(props);
    this.maxLength = 250;

    this.state = {
      showPlacholderTopText: false,
      textLength: 0,
      feedback: '',
    };
  }

  handleChangeSpecialIntructionText = (text: string) => {
    this.setState({
      feedback: text,
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

          <TouchableOpacity
            onPress={() => this.props.createFeedBack(this.state.feedback)}
            disabled={this.state.textLength === 0}>
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
        {this.props.profile.loading && <LogoLoading />}
        <Toast config={toastConfig} ref={(ref: any) => Toast.setRef(ref)} />
      </View>
    );
  }
}

interface LinkStateProps {
  profile: ProfileState;
}

interface LinkDispatchProps {
  createFeedBack: (feedback: string) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, ProfileAction>,
): LinkDispatchProps => {
  return {
    createFeedBack: bindActionCreators(createFeedBack, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
