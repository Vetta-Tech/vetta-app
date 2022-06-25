import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import Appstyle from '../../constants/AppStyles';
import {
  TopBar,
  Search,
  TopImage,
  Category,
  RecentProduct,
  PopularProducts,
  Collections,
  Brands,
  Refer,
  SubCatCard,
  FeaturedPRoducts,
} from '../../components';

import {fetchHomeProducts, fetchBrands} from '../../store/actions';
import {connect} from 'react-redux';
import {State} from '../../store/reducers';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/EvilIcons';
import Geolocation from '@react-native-community/geolocation';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import MapBottomSheet from '../../components/MapBottomSheet';

interface IPdpPageProps {
  navigation: {
    navigate: any;
  };
  fetchHomeProducts: any;
  featured: any;
  recent_products: any;
  popular: any;
  electronics: any;
  footwear: any;
  baby_care: any;
  loading: any;
  error: any;
  fetchBrands: any;
  brands: any;
}

interface IState {
  showAddresSheet: boolean;
  error: string;
  showErrorModal: boolean;
  userAddress: string;
  isAuthenticated: boolean;
  compLoading: boolean;
}

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';
const BARIKOI_API = 'MzQ3MjpKM0JHWkI4WDc1';
class Home extends Component<IPdpPageProps, IState> {
  private bottomSheetRef: any;
  private adressRef: any;

  constructor(props: any) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.adressRef = React.createRef();
    this.state = {
      showAddresSheet: false,
      error: '',
      showErrorModal: false,
      userAddress: '',
      isAuthenticated: false,
      compLoading: false,
    };
  }

  async UNSAFE_componentWillMount() {
    this.fetchUserAddress();
    const token = await AsyncStorage.getItem('token');
    console.log('dassss', null);
    if (token !== null) {
      this.setState(
        {
          isAuthenticated: true,
        },
        () => console.log('isAuth', this.state.isAuthenticated),
      );
    }
    console.log('d');
  }

  componentDidMount() {
    this.props.fetchHomeProducts();
    this.props.fetchBrands();
    Geocoder.init(API_KEY);

    this.saveLocalAddressToDb();
  }

  saveLocalAddressToDb = async () => {
    const userCoord: any = await AsyncStorage.getItem('USER_COORDINATES');
    const coords = JSON.parse(userCoord);
    if (coords !== null || undefined || '') {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Token '.concat(token!),
          'Content-Type': 'application/json',
        },
      };

      console.log(config);

      const data = {
        lat: coords.lat,
        lng: coords.lng,
      };

      axios
        .post(`${API_URL}address/save-local-address`, data, config)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        compLoading: true,
      });
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Token '.concat(token!),
          'Content-Type': 'application/json',
        },
      };
      axios
        .get(`${API_URL}address/user-address`, config)
        .then(res => {
          this.setState({
            compLoading: false,
            userAddress: res.data.user_address.address,
          });
        })
        .catch(err => {
          this.setState({
            compLoading: false,
          });
        });
    }
  };

  fetchUserAddress = async () => {
    this.setState({
      compLoading: true,
    });
    if (this.state.isAuthenticated) {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Token '.concat(token!),
          'Content-Type': 'application/json',
        },
      };

      axios
        .get(`${API_KEY}address/user-address`, config)
        .then(res => {
          this.setState({
            userAddress: res.data.user_address.address,
            compLoading: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            compLoading: false,
          });
        });
    } else {
      this.fetchReverseAddress();
    }
  };

  fetchReverseAddress = async () => {
    this.setState({
      compLoading: true,
    });

    const userCoord: any = await AsyncStorage.getItem('USER_COORDINATES');
    const coords = JSON.parse(userCoord);

    if (coords !== null || undefined || '') {
      fetch(
        `https://barikoi.xyz/v1/api/search/reverse/${BARIKOI_API}/geocode?longitude=${coords.lng}&latitude=${coords.lat}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true`,
      )
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(response => {
          this.setState({
            userAddress: response.place.address,
            compLoading: false,
          });
        });
    } else {
      this.setState({
        userAddress: 'Enter User Location',
        compLoading: false,
      });
    }
  };

  showAddressInfo = () => {
    this.bottomSheetRef.open();
  };

  handleUserLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        this.props.navigation.navigate(
          'Map',
          {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            navigatePage: 'Home',
          },
          () => {
            this.bottomSheetRef.close();
          },
        );
      },
      error => {
        this.setState(
          {
            error: error.message,
          },
          () => {
            this.bottomSheetRef.close();
            this.setState({
              showErrorModal: true,
            });
          },
        );
      },
    );
  };

  render() {
    console.log('address', this.state.userAddress);
    return (
      <>
        {this.state.compLoading ? <OverlaySpinner /> : null}
        <Modal
          onBackdropPress={() =>
            this.setState({
              showErrorModal: false,
            })
          }
          backdropOpacity={0.4}
          isVisible={this.state.showErrorModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 12,
                  color: 'black',
                }}>
                It looks like you have turned off permissions required for this
                feature.It can be enabled under Phone Setting {'>'} Apps {'>'}{' '}
                Vetta {'>'} Permissions
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: '100%',
                  padding: 5,
                }}>
                <TouchableOpacity onPress={() => Linking.openSettings()}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 16,
                      color: 'black',
                      width: 100,
                      textAlign: 'center',
                    }}
                    numberOfLines={2}>
                    Go To Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'white',
            padding: 5,
          }}>
          <TopBar
            name="Vetta Store"
            address={this.state.userAddress}
            onClick={this.showAddressInfo}
            navigation={this.props.navigation}
          />
          <Search navigation={this.props.navigation} />
        </View>

        <MapBottomSheet
          myRef={ref => (this.bottomSheetRef = ref)}
          adressRef={ref => (this.adressRef = ref)}
          onPressClear={() => this.adressRef.clear()}
          handleUserLocation={() => this.handleUserLocation()}
          navigation={this.props.navigation}
          navigatePage="Home"
        />
        <ScrollView style={[Appstyle.container]}>
          <TopImage />
          <Category navigation={this.props.navigation} />
          <FeaturedPRoducts
            navigation={this.props.navigation}
            featured={this.props.featured}
            name="Featured"
            supplier_name=""
            screen_name="FeaturedProducts"
            isFeatured={true}
          />
          <PopularProducts
            navigation={this.props.navigation}
            popular={this.props.popular}
            name="Popular"
            supplier_name=""
            screen_name="PopularProducts"
            isFeatured={false}
            isPopular={true}
          />
          <Collections />
          <RecentProduct recent_products={this.props.recent_products} />
          <RecentProduct recent_products={this.props.recent_products} />
          <Collections />
          <SubCatCard
            name="Electronics"
            data={this.props.electronics}
            navigation={this.props.navigation}
          />
          <SubCatCard
            name="Clothing"
            data={this.props.footwear}
            navigation={this.props.navigation}
          />
          <Brands
            brands={this.props.brands}
            navigation={this.props.navigation}
          />

          <Refer />
        </ScrollView>
        {this.props.loading && <OverlaySpinner />}
      </>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    featured: state.products.featured,
    brands: state.brands.brands,
    recent_products: state.products.recent_products,
    popular: state.products.popular,
    electronics: state.products.electronics,
    footwear: state.products.footwear,
    baby_care: state.products.baby_care,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, {fetchHomeProducts, fetchBrands})(Home);

const styles = StyleSheet.create({
  spinnerView: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 10,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    height: 120,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
