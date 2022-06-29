import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {ThunkDispatch} from 'redux-thunk';

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

import {connect} from 'react-redux';
import {AppState} from '../../state/store';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import MapBottomSheet from '../../components/MapBottomSheet';
import {
  fetchBrands,
  fetchHomeProducts,
  fetchUserAddress,
  saveLocalAddressToDb,
  fetchReverseAddress,
} from '../../state/actionCreatores';
import {bindActionCreators} from 'redux';
import {AppActionType} from '../../state/actions/intex';
import {styles} from './styles';
import {HomeProductsType} from '../../state/interfaces/products';
import {BrandsTypes} from '../../utils/types/brandsType';

import {MapsTypes} from '../../state/interfaces/maps';

interface HomePageProps {
  navigation: {
    navigate: any;
    addListener: any;
  };
}

interface IState {
  showAddresSheet: boolean;
  showErrorModal: boolean;
}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const API_KEY = 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg';
class Home extends Component<Props, IState> {
  private bottomSheetRef: any;
  private adressRef: any;

  constructor(props: any) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.adressRef = React.createRef();
    this.state = {
      showAddresSheet: false,
      showErrorModal: false,
    };
  }

  async componentDidMount() {
    this.props.fetchHomeProducts();
    this.props.fetchBrands();
    Geocoder.init(API_KEY);

    this.props.fetchUserAddress();
    if (this.props.address.user_have_address) {
    } else {
      const userCoord: any = await AsyncStorage.getItem('USER_COORDINATES');
      const coords = JSON.parse(userCoord);
      this.props.fetchReverseAddress(coords);
    }

    const userCoord: any = await AsyncStorage.getItem('USER_COORDINATES');
    const coords = JSON.parse(userCoord);

    if (coords !== null || undefined || '') {
      this.props.saveLocalAddressToDb(coords);
    }
    this.props.navigation.addListener('blur', () => {
      this.bottomSheetRef?.close();
    });
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
          navigatePage: 'Home',
        });
      },
      error => {
        console.log(error);
      },
    );
  };

  render() {
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
            name="Vetta Store"
            address={this.props.address.userAddressText}
            onClick={this.showAddressInfo}
            navigation={this.props.navigation}
          />
          <Search navigation={this.props.navigation} />
        </View>

        <MapBottomSheet
          myRef={(ref: any) => (this.bottomSheetRef = ref)}
          adressRef={(ref: any) => (this.adressRef = ref)}
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
            featured={this.props.product.featured}
            name="Featured"
            supplier_name=""
            screen_name="FeaturedProducts"
            isFeatured={true}
          />
          <PopularProducts
            navigation={this.props.navigation}
            popular={this.props.product.popular}
            name="Popular"
            supplier_name=""
            screen_name="PopularProducts"
            isFeatured={false}
            isPopular={true}
          />
          <Collections />
          <RecentProduct recent_products={this.props.product.recent_products} />
          <RecentProduct recent_products={this.props.product.recent_products} />
          <Collections />
          <SubCatCard
            name="Electronics"
            data={this.props.product}
            navigation={this.props.navigation}
          />
          <SubCatCard
            name="Clothing"
            data={this.props.product}
            navigation={this.props.navigation}
          />
          <Brands
            brands={this.props.brands.brands}
            navigation={this.props.navigation}
          />

          <Refer />
        </ScrollView>
        {this.props.product.loading && <OverlaySpinner />}
      </>
    );
  }
}

interface LinkStateProps {
  product: HomeProductsType;
  brands: BrandsTypes[];
  address: MapsTypes;
  isAuthenticated: boolean;
}

interface LinkDispatchProps {
  fetchHomeProducts: () => void;
  fetchBrands: () => void;
  fetchReverseAddress: (data: {lat: number; lng: number}) => void;
  fetchUserAddress: () => void;
  saveLocalAddressToDb: (data: {lat: number; lng: number}) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: HomePageProps,
): LinkStateProps => {
  return {
    isAuthenticated: state.auth.token !== null,
    product: state.product,
    brands: state.supplier,
    address: state.address,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActionType>,
  ownProps: HomePageProps,
): LinkDispatchProps => ({
  fetchHomeProducts: bindActionCreators(fetchHomeProducts, dispatch),
  fetchBrands: bindActionCreators(fetchBrands, dispatch),
  fetchUserAddress: bindActionCreators(fetchUserAddress, dispatch),
  fetchReverseAddress: bindActionCreators(fetchReverseAddress, dispatch),
  saveLocalAddressToDb: bindActionCreators(saveLocalAddressToDb, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
