import {
  Text,
  StyleSheet,
  View,
  Image,
  Share,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {TopNavCheckout} from '../../components';
import {homeaddress, share} from '../../constants/images';

import {fetchUserAddress} from '../../state/actionCreatores/';
import {MapsTypes} from '../../state/interfaces/maps';
import {AppState} from '../../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {UserAddressActionType} from '../../state/actions/address';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface CompProps {
  navigation: any;
}

type Props = CompProps & LinkStateToProps & LinkDispatchProps;

class Address extends Component<Props> {
  componentDidMount() {
    this.props.fetchUserAddress();
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      console.warn(error);
    }
  };

  onPress = () => {
    console.log(this.props.address.userAddress.longtitude);

    this.props.navigation.navigate('Map', {
      lat: this.props.address.userAddress.lattitude,
      lng: this.props.address.userAddress.longtitude,
      navigatePage: 'ProfileAddress',
    });
  };

  render() {
    const {address} = this.props;
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <TopNavCheckout naviagtion={this.props.navigation} name="Address" />
        </View>

        <TouchableOpacity onPress={this.onPress}>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              padding: 18,
              marginTop: 10,
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 120,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={homeaddress}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
              <View
                style={{
                  marginLeft: 15,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    color: 'black',
                    maxWidth: '90%',
                  }}>
                  {address.userAddressText}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Light',
                    color: 'black',
                    fontSize: 12,
                  }}>
                  Add Delivery Instruction
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={this.onShare}>
                <Image
                  source={share}
                  style={{
                    height: 25,
                    width: 25,
                    padding: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

interface LinkStateToProps {
  address: MapsTypes;
}

interface LinkDispatchProps {
  fetchUserAddress: () => void;
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
  return {
    address: state.address,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, UserAddressActionType>,
): LinkDispatchProps => {
  return {
    fetchUserAddress: bindActionCreators(fetchUserAddress, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    padding: 10,
  },
});
