import MapView, {
  AnimatedRegion,
  Marker,
  MarkerAnimated,
} from 'react-native-maps'; //

import {StyleSheet, View, TouchableOpacity, Platform, Text} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';
const BARIKOI_API = 'MzQ3MjpKM0JHWkI4WDc1';

var options = {
  provider: 'google',
  httpAdapter: 'http', // Default
  apiKey: API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: 'json', // 'gpx', 'string', ...
};

type RootStackParamList = {
  Pdp: undefined;
};

interface IPdpPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
}

const mapStyle = [
  {
    featureType: 'all',
    stylers: [
      {
        saturation: 0,
      },
      {
        hue: '#e7ecf0',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        saturation: -70,
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        saturation: -60,
      },
    ],
  },
];

type ProxyType = {
  markup: any;
};

export default class App extends Component<ProxyType, IPdpPageProps> {
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
    this.marker = null;

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: 23.8099334,
        longitude: 90.3685891,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      }),
      latitude: 23.8099334,
      longitude: 90.3685891,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
      formated_address: '',
    };
  }

  async componentDidMount() {
    this.handleUserLocation();
    Geocoder.init(API_KEY);
    this.fetchReverseAddress();

    const res = await AsyncStorage.getItem('USER_COORDINATES');

    if (res !== null) {
      const a = JSON.parse(res);
      console.log('aa', a.lat);
      this.setState({
        latitude: a.lat,
        longitude: a.lng,
      });
    } else {
      this.setState({
        latitude: 23.8099334,
        longitude: 90.3685891,
      });
    }
    console.log(res);
  }

  saveUserCoorsToStorage = async (lat: number, lng: number) => {
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
    this.props.navigation.navigate('Home');
  };

  handleUserLocation = () => {
    // try {
    //   Geolocation.getCurrentPosition(info =>
    //     this.setState(
    //       {
    //         latitude: info.coords.latitude,
    //         longitude: info.coords.longitude,
    //       },
    //       () => {
    //         this.animateMarker();
    //       },
    //     ),
    //   );
    // } catch (e) {
    //   console.log('e', e);
    // }

    Geolocation.getCurrentPosition(
      pos => {
        this.setState(
          {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          () => {
            this.animateMarker();
          },
        );
      },
      error => {
        this.setState({
          latitude: 23.8099334,
          longitude: 90.3685891,
        });
      },
    );
  };

  fetchReverseAddress = () => {
    // fetch(
    //   `https://barikoi.xyz/v1/api/search/reverse/${BARIKOI_API}/geocode?longitude=${this.state.longitude}&latitude=${this.state.latitude}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true`,
    // )
    //   .then(response => response.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response =>
    //     this.setState({formated_address: response.place.address}),
    //   );
    console.log('error');
  };

  animateMarker = () => {
    this.ref.animateCamera({
      center: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta,
      },
      zoom: 16,
      heading: 80,
      pitch: 50,
      useNativeDriver: true,
    });
    this.fetchReverseAddress();
    console.log(this.state.latitude, this.state.longitude);
  };

  render() {
    console.log('formated_address', this.state.formated_address);

    return (
      <>
        <View style={styles.container}>
          <MapView
            ref={ref => {
              this.ref = ref;
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              height: '90%',
            }}
            onPress={e =>
              this.setState(
                {
                  latitude: e.nativeEvent.coordinate.latitude,
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
            // showsCompass={true}
            // zoomControlEnabled={true}
            minZoomLevel={10}
            maxZoomLevel={20}
            rotateEnabled={true}
            // showsScale={true}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}>
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{
                latitude: this.state.latitude,
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
                  padding: 10,
                  borderRadius: 10,
                  height: 55,
                  borderColor: '#345B63',
                  borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <Icon name="arrow-back-outline" size={30} color="black" />
              </View>
            </TouchableOpacity>

            <GooglePlacesAutocomplete
              styles={{
                container: {
                  flex: 1,
                },
                textInput: {
                  flexDirection: 'row',
                  marginLeft: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  color: '#5d5d5d',
                  borderColor: '#345B63',
                  height: 55,
                  // borderBottomColor: 'red',
                  // borderColor: 'black',
                  borderWidth: 1,
                },
                predefinedPlacesDescription: {
                  color: 'black',
                },
                poweredContainer: {
                  padding: 40,
                },
              }}
              enablePoweredByContainer={false}
              onPress={(data: any, details: any = null) => {
                console.log(JSON.stringify(details?.geometry?.location));

                this.setState(
                  {
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                  },
                  () => this.animateMarker(),
                );
              }}
              placeholder="Search address"
              onFail={error => console.error(error)}
              query={{
                key: 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg',
                language: 'en', // language of the results
                components: 'country:bd',
              }}
              fetchDetails={true}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '10%',
            backgroundColor: 'white',
            padding: 10,
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.saveUserCoorsToStorage(
                  this.state.latitude,
                  this.state.longitude,
                );
              }}
              style={styles.buttonAddress}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Select Address
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  padding: 10,
                  marginTop: 15,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Skip
              </Text>
            </TouchableOpacity>
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
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 10,
  },

  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#D3DEDC',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonAddress: {
    padding: 15,
    width: '65%',
    backgroundColor: '#92A9BD',
    position: 'absolute',
    top: '-60%',
    margin: 'auto',
    borderRadius: 15,
  },
});
