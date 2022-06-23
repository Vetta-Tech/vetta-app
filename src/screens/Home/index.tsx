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
}

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';

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
    };
  }

  async componentDidMount() {
    Geocoder.init(API_KEY);

    this.props.fetchHomeProducts();
    this.props.fetchBrands();
    this.bottomSheetRef.open();
  }

  showAddressInfo = () => {
    this.bottomSheetRef.open();
  };

  handleUserLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        this.props.navigation.navigate('Map', {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
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
    console.log(this.state.error);
    return (
      <>
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
            name="VETTA store"
            address="Rd.111 , Uttara"
            onClick={this.showAddressInfo}
            navigation={this.props.navigation}
          />
          <Search navigation={this.props.navigation} />
        </View>

        <RBSheet
          ref={ref => {
            this.bottomSheetRef = ref;
          }}
          closeOnDragDown={true}
          dragFromTopOnly={true}
          height={Dimensions.get('window').height - 100}
          openDuration={250}
          customStyles={{
            container: {
              borderTopStartRadius: 12,
              borderTopEndRadius: 12,
            },
          }}>
          <View
            style={{
              padding: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: 'black',
                marginBottom: 10,
                fontSize: 18,
              }}>
              Select Address
            </Text>

            <GooglePlacesAutocomplete
              ref={ref => {
                this.adressRef = ref;
              }}
              styles={{
                container: {
                  flex: 0,
                  borderRadius: 12,
                },

                textInputContainer: {
                  backgroundColor: '#f2f2f2',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 12,
                  paddingLeft: 5,
                  paddingRight: 5,
                },

                textInput: {
                  flexDirection: 'row',
                  borderColor: '#f2f2f2',
                  backgroundColor: '#f2f2f2',
                  borderRadius: 10,
                  color: '#5d5d5d',
                  borderWidth: 1,
                  width: 200,
                },
                row: {
                  backgroundColor: '#FFFFFF',
                  padding: 13,
                  height: 55,
                  flexDirection: 'row',
                  fontFamily: 'Montserrat-SemiBold',
                },
                listView: {
                  padding: 5,
                },
              }}
              renderRow={results => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="location" size={20} />
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                      }}>
                      {results.structured_formatting.secondary_text}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,
                      }}>
                      {results.description}
                    </Text>
                  </View>
                </View>
              )}
              renderLeftButton={() => (
                <View>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    source={require('../../../assets/search1.png')}
                  />
                </View>
              )}
              renderRightButton={() => (
                <TouchableOpacity onPress={() => this.adressRef.clear()}>
                  <View>
                    <Image
                      style={{
                        paddingRight: 5,
                        height: 20,
                        width: 30,
                        padding: 15,
                        alignSelf: 'center',
                      }}
                      source={require('../../../assets/icons8-cross-96.png')}
                    />
                  </View>
                </TouchableOpacity>
              )}
              enablePoweredByContainer={false}
              onPress={(data: any, details: any = null) => {
                this.props.navigation.navigate('Map', {
                  lat: details?.geometry?.location.lat,
                  lng: details?.geometry?.location.lng,
                });
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

            <TouchableOpacity onPress={() => this.handleUserLocation()}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/target.png')}
                    style={{
                      height: 25,
                      width: 25,
                    }}
                  />
                  <Text
                    style={{
                      paddingLeft: 5,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                    }}>
                    Use Current Location
                  </Text>
                </View>
                <View>
                  <Image
                    source={require('../../../assets/icon/arrow.png')}
                    style={{
                      height: 15,
                      width: 15,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </RBSheet>
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
