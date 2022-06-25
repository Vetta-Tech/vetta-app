import MapView, {Marker} from 'react-native-maps';

import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import React, {Component} from 'react';

import Lottie from 'lottie-react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {mapStyle} from './mapStyle';
import ErrorModal from './utils/ErrorModal';
import {OverlaySpinner} from '../Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../api/axios';
import {API_URL} from '@env';

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

interface IState {
  lattitude: number;
  longitude: number;
  latitudeDelta: number;
  isAuthenticated: boolean;
  longitudeDelta: number;
  address: string;
  sub_district: string;
  loading: boolean;
  isLoad: boolean;
  showErrorModal: boolean;
  create_address: boolean;
  userAddress: any;
  navigatePage: string;
}

export default class Map extends Component<IProps, IState> {
  private marker: any;
  private ref: any;
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
    this.marker = null;

    this.state = {
      lattitude: 0,
      longitude: 0,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
      isAuthenticated: false,
      address: '',
      sub_district: '',
      loading: true,
      isLoad: false,
      showErrorModal: false,
      create_address: false,
      userAddress: {},
      navigatePage: '',
    };
  }

  async componentDidMount() {
    const {navigatePage, lat, lng} = this.props.route.params;
    console.log('navigatePage', navigatePage);
    if (navigatePage) {
      this.setState({
        navigatePage: navigatePage,
      });
    }
    Geocoder.init(API_KEY);
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.setState(
        {
          isAuthenticated: true,
        },
        () => {
          this.checkUserCanCreateOrEdit();
        },
      );
    }
  }

  checkUserCanCreateOrEdit = async () => {
    this.setState({
      loading: true,
    });

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    axios
      .get(`address/user-address`, config)
      .then(res => {
        if (res.data.user_have_address) {
          this.setState({
            loading: false,
            create_address: false,
            userAddress: res.data.user_address,
          });
        }
        if (res.data.user_have_address === false) {
          this.setState({
            loading: false,
            create_address: true,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  UNSAFE_componentWillMount() {
    const {params} = this.props.route;

    if (params) {
      this.setState(
        {
          lattitude: params.lat,
          longitude: params.lng,
        },
        () => {
          this.fetchReverseAddress();
        },
      );
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
        this.setState({
          showErrorModal: true,
        });
      },
    );
  };

  animateMarker = () => {
    this.ref.animateCamera({
      center: {
        latitude: this.state.lattitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta,
      },
      zoom: 16,
      heading: 80,
      useNativeDriver: true,
    });
    this.fetchReverseAddress();
    console.log('ssss');
  };
  onDragEnd = (e: any) => {
    this.setState(
      {
        lattitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      () => {
        this.fetchReverseAddress();
      },
    );
    let point = {
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude,
    };
  };

  fetchReverseAddress = (coords?: any) => {
    this.setState({
      loading: true,
    }),
      fetch(
        `https://barikoi.xyz/v1/api/search/reverse/${BARIKOI_API}/geocode?longitude=${this.state.longitude}&latitude=${this.state.lattitude}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true`,
      )
        .then(response => response.json())
        .catch(error =>
          this.setState({
            loading: false,
          }),
        )
        .then(response =>
          this.setState({
            address: response.place.address,
            sub_district: `${response.place.district} ${response.place.postCode}`,
            loading: false,
          }),
        );
  };

  saveUserCoorsToStorage = async (lat: number, lng: number) => {
    try {
      await AsyncStorage.setItem(
        'USER_COORDINATES',
        JSON.stringify({
          lat,
          lng,
        }),
      );

      this.setState({
        navigatePage: '',
      });
      console.log('address saved to local storage ');
    } catch (e) {
      console.log('cant able to store in localStorage');
    }
    this.props.navigation.push(`${this.props.route.params.navigatePage}`);
  };

  createUserLocation = async () => {
    console.log('creating');

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    const data = {
      lattitude: this.state.lattitude,
      longtitude: this.state.longitude,
      address: this.state.address,
    };

    axios
      .post(`address/create-address`, data, config)
      .then(res =>
        this.setState(
          {
            loading: false,
            navigatePage: '',
          },
          () => {
            this.props.navigation.push(
              `${this.props.route.params.navigatePage}`,
            );
          },
        ),
      )
      .catch(err => {
        this.setState(
          {
            loading: false,
            navigatePage: '',
          },
          () => {
            this.props.navigation.push(
              `${this.props.route.params.navigatePage}`,
            );
          },
        );
      });
  };

  updateUserLocation = async () => {
    console.log('updating');
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };

    const data = {
      lattitude: this.state.lattitude,
      longtitude: this.state.longitude,
      address: this.state.address,
    };

    console.log('urllllllllll', API_URL);

    axios
      .put(`address/edit/${this.state.userAddress.id}`, data, config)
      .then(res => {
        console.log('ressssssssssssss', res.data);
        this.setState(
          {
            loading: false,
            navigatePage: '',
          },
          () => {
            this.props.navigation.push(
              `${this.props.route.params.navigatePage}`,
            );
          },
        );
      })
      .catch(err => {
        console.log('errrrrrrrrrrrrrrrrrr', err);

        this.setState(
          {
            loading: false,
            navigatePage: '',
          },
          () => {
            this.props.navigation.push(
              `${this.props.route.params.navigatePage}`,
            );
          },
        );
      });
  };

  confirmLocation = () => {
    if (this.state.isAuthenticated === true) {
      if (this.state.create_address) {
        this.createUserLocation();
      } else {
        this.updateUserLocation();
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

  render() {
    console.log('this.state.isAuthenticated', this.state.isAuthenticated);
    return (
      <>
        <View style={styles.container}>
          <MapView
            ref={ref => {
              this.ref = ref;
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              height: '82%',
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
            customMapStyle={mapStyle}
            userLocationPriority="high"
            userLocationAnnotationTitle="My home"
            followsUserLocation={true}
            showsMyLocationButton={true}
            minZoomLevel={10}
            maxZoomLevel={20}
            initialRegion={{
              latitude: this.state.lattitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
            <Marker
              ref={(marker: any) => {
                this.marker = marker;
              }}
              coordinate={{
                latitude: this.state.lattitude,
                longitude: this.state.longitude,
              }}
              draggable={true}
              onDragEnd={e => this.onDragEnd(e)}>
              <Image
                source={require('../../../assets/icon/location.png')}
                style={{
                  height: 40,
                  width: 40,
                }}
                resizeMode="contain"
              />
            </Marker>
          </MapView>
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
          isVisisble={this.state.showErrorModal}
        />
        {this.state.loading === false ? (
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
                      {this.state.sub_district}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        textTransform: 'capitalize',
                        fontSize: 14,
                        width: '80%',
                      }}
                      numberOfLines={1}>
                      {this.state.address}
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
