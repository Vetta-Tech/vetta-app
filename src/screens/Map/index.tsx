import MapView, {
  AnimatedRegion,
  Marker,
  MarkerAnimated,
} from 'react-native-maps';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Text,
  Image,
} from 'react-native';
import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/EvilIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mapStyle} from './mapStyle';
import {OverlaySpinner} from '../Home';

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';
const BARIKOI_API = 'MzQ3MjpKM0JHWkI4WDc1';

interface IProps {
  navigation: any;
  route: {
    params: {
      lat: any;
      lng: any;
    };
  };
}

interface IState {
  lattitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  address: string;
  sub_district: string;
  loading: boolean;
  isLoad: boolean;
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
      address: '',
      sub_district: '',
      loading: false,
      isLoad: false,
    };
  }

  componentDidMount() {
    this.setState({isLoad: true});
    Geocoder.init(API_KEY);
    console.log('route', this.props.route.params);

    this.setState({isLoad: false});
  }

  UNSAFE_componentWillMount() {
    console.log('route12', this.props.route.params);
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
          lattitude: 23.8099334,
          longitude: 90.3685891,
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
  };

  fetchReverseAddress = () => {
    this.setState({loading: true});
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

  render() {
    return (
      <>
        <View style={styles.container}>
          <MapView
            ref={ref => {
              this.ref = ref;
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              height: '85%',
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
            />
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
                  //   height: 55,
                  //   borderWidth: 1,
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
              <TouchableOpacity>
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
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
