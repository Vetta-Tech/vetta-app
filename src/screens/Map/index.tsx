import MapView from 'react-native-maps';

import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import React, {Component} from 'react';

import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {mapStyle} from './mapStyle';
import ErrorModal from './utils/ErrorModal';
import {OverlaySpinner} from '../Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../api/axios';
import AnimatedLottieView from 'lottie-react-native';
import {
  updateUserLocation,
  createUserLocation,
  saveUserCoorsToStorage,
  saveLocalAddressToDb,
  checkUserCanCreateOrEdit,
  fetchReverseAddress,
} from '../../state/actionCreatores';
import {styles} from './style';
import {
  AddressInterface,
  CreateUserPostData,
  UpdateUserPostData,
} from '../../state/interfaces/address';
import {MapsTypes} from '../../state/interfaces/maps';
import {AppState} from '../../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {UserAddressActionType} from '../../state/actions/address';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';
const BARIKOI_API = 'MzQ3MjpKM0JHWkI4WDc1';

interface IProps {
  navigation: any;
  route: {
    params: {
      lat: any;
      lng: any;
      navigatePage: string;
    };
  };
}

interface State {
  lattitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  showErrorModal: boolean;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Map extends Component<Props, State> {
  private ref: any;
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      lattitude: 0,
      longitude: 0,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
      showErrorModal: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {params} = this.props.route;

    if (params) {
      this.setState(
        {
          lattitude: params.lat,
          longitude: params.lng,
        },
        () => {
          this.props.fetchReverseAddress(params);
        },
      );
    }
  }

  async componentDidMount() {
    Geocoder.init(API_KEY);
    if (this.props.isAuthenticated) {
      this.props.checkUserCanCreateOrEdit();
    }
  }

  handleUserLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        this.setState(
          {
            lattitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          () => {
            this.animateMarker();
          },
        );
      },
      error => {
        this.setState(
          {
            showErrorModal: true,
          },
          () => console.log(error),
        );
      },
    );
  };

  animateMarker = () => {
    this.ref.animateCamera({
      center: {
        lattitude: this.state.lattitude,
        longtitude: this.state.longitude,
        latitudeDelta: this.props.address.latitudeDelta,
        longitudeDelta: this.props.address.longitudeDelta,
      },
      zoom: 16,
      heading: 80,
      useNativeDriver: true,
    });
    const coords = {
      lat: this.state.lattitude,
      lng: this.state.longitude,
    };
    this.props.fetchReverseAddress(coords);
  };

  saveUserCoorsToStorage = async (lat: number, lng: number, push?: boolean) => {
    try {
      await AsyncStorage.setItem(
        'USER_COORDINATES',
        JSON.stringify({
          lat,
          lng,
        }),
      );

      console.log('address saved to local storage ');
    } catch (e) {
      console.log('cant able to store in localStorage');
    }
    if (push === false) {
    } else {
      this.props.navigation.replace(`${this.props.route.params.navigatePage}`);
    }
  };

  confirmLocation = () => {
    if (this.props.isAuthenticated === true) {
      const data = {
        lattitude: this.state.lattitude,
        longtitude: this.state.longitude,
        address: this.props.address.userAddressText,
        id: this.props.address.userAddress.id,
      };
      if (this.props.address.create_address) {
        this.props.createUserLocation(data);
      } else {
        this.props.updateUserLocation(data);
      }
    } else {
      this.saveUserCoorsToStorage(this.state.lattitude, this.state.longitude);
    }
  };

  closeErrorModal = () => {
    this.setState({
      showErrorModal: false,
    });
  };

  onRegionChange = (e: {latitude: number; longitude: number}) => {
    const coords = {
      lat: e.latitude,
      lng: e.longitude,
    };
    this.props.fetchReverseAddress(coords);
  };

  render() {
    const {address} = this.props;
    return (
      <>
        <View style={styles.map}>
          <MapView
            ref={ref => {
              this.ref = ref;
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              // height: '82%',
            }}
            onPress={e =>
              this.setState(
                {
                  lattitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
                () => {
                  this.animateMarker();
                },
              )
            }
            mapType="standard"
            userLocationCalloutEnabled={true}
            userInterfaceStyle="dark"
            // customMapStyle={mapStyle}
            userLocationPriority="high"
            userLocationAnnotationTitle="My home"
            followsUserLocation={true}
            showsMyLocationButton={true}
            minZoomLevel={10}
            maxZoomLevel={20}
            onRegionChangeComplete={(e: any) => this.onRegionChange(e)}
            initialRegion={{
              latitude: this.state.lattitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}
          />
          <View style={styles.markerFixed}>
            <AnimatedLottieView
              style={styles.marker}
              autoPlay={true}
              source={require('../../../assets/lottie/lf20_9jrydeyg.json')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              padding: 30,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 5,
                  borderRadius: 10,

                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../../assets/icon/back-arrow.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: '19%',
              left: '28%',
            }}>
            <TouchableOpacity onPress={() => this.handleUserLocation()}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  flexDirection: 'row',
                  padding: 8,
                  alignItems: 'center',
                  borderWidth: 1,
                }}>
                <Image
                  source={require('../../../assets/target.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  Use Current Location
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ErrorModal
          closeErrorModal={this.closeErrorModal}
          isVisisble={address.showErrorModal}
        />
        {address.loading === false ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '18%',
              backgroundColor: 'white',
              padding: 10,
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/icon/location.png')}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 10,
                      width: '95%',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        textTransform: 'capitalize',
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {this.props.address.sub_district}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        textTransform: 'capitalize',
                        fontSize: 14,
                        width: '80%',
                      }}
                      numberOfLines={1}>
                      {this.props.address.userAddressText}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.confirmLocation();
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'black',
                      marginTop: 10,
                      padding: 18,
                      borderRadius: 12,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 16,
                      }}>
                      Confirm Location
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: '18%',

              width: '100%',
            }}>
            <OverlaySpinner />
          </View>
        )}
      </>
    );
  }
}

interface LinkStateProps {
  address: MapsTypes;
  isAuthenticated: boolean;
}

interface LinkDispatchProps {
  saveLocalAddressToDb: (data: {lat: number; lng: number}) => void;
  checkUserCanCreateOrEdit: () => void;
  saveUserCoorsToStorage: (data: {lat: number; lng: number}) => void;
  createUserLocation: (data: CreateUserPostData) => void;
  updateUserLocation: (data: UpdateUserPostData) => void;
  fetchReverseAddress: (data: {lat: number; lng: number}) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  console.log(state.address.userAddressText);
  return {
    address: state.address,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, UserAddressActionType>,
): LinkDispatchProps => ({
  saveLocalAddressToDb: bindActionCreators(saveLocalAddressToDb, dispatch),
  checkUserCanCreateOrEdit: bindActionCreators(
    checkUserCanCreateOrEdit,
    dispatch,
  ),
  saveUserCoorsToStorage: bindActionCreators(saveUserCoorsToStorage, dispatch),
  createUserLocation: bindActionCreators(createUserLocation, dispatch),
  updateUserLocation: bindActionCreators(updateUserLocation, dispatch),
  fetchReverseAddress: bindActionCreators(fetchReverseAddress, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
