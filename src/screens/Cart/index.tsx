import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
  Vibration,
} from 'react-native';
import {API_URL, API_URL_IMAGE} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as React from 'react';
import Toast from 'react-native-toast-message';

import {TopCart} from '../../components';
import Icon from 'react-native-vector-icons/EvilIcons';
import PriceCard from './utils/PriceCard';
import {OverlaySpinner} from '../Login/PhoneInput';
import {toastConfig} from '../../components/CsutomToast';
import MapBottomSheet from '../../components/MapBottomSheet';
import Geolocation from '@react-native-community/geolocation';
import AnimatedLottieView from 'lottie-react-native';
import {styles} from './style';
import {CartState} from '../../state/interfaces/cart';
import {
  fetchUserCart,
  fetchUserAddress,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleCouponAdded,
} from '../../state/actionCreatores';
import {AppState} from '../../state/store';
import {ThunkDispatch} from 'redux-thunk';
import {CartActions} from '../../state/actions/cart';
import {bindActionCreators} from 'redux';
import {MapsTypes} from '../../state/interfaces/maps';
import {connect} from 'react-redux';

interface CartProps {
  navigation: {
    navigate: any;
    addListener: any;
  };
}

interface ItemTypes {
  item: {
    product: {
      id: number;

      thumbnail: string;
      name: string;
      short_descrition: string;
      price: number;
    };
    variant: {
      id: number;
      price: number;
    };
    quantity: number;
    id: number;
  };
}

type Props = CartProps & LinkStateProps & LinkDispatchProps;

class Cart extends React.Component<Props> {
  private bottomSheetRef: any;
  private adressRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      coupon_code: '',
      location_error: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.props.fetchUserCart();
      this.props.fetchUserAddress();
    });
    this.props.navigation.addListener('blur', () => {
      this.bottomSheetRef.close();
    });
    this.props.fetchUserCart();
    this.props.fetchUserAddress();
  }

  openBottomSheet = () => {
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
            navigatePage: 'Cart',
          },
          () => {
            this.bottomSheetRef.close();
          },
        );
      },
      error => {
        this.setState(
          {
            location_error: error.message,
          },
          () => {
            this.bottomSheetRef.close();
          },
        );
      },
    );
  };

  render() {
    const {cart, address} = this.props;
    return (
      <>
        {cart.couponAddedSuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Coupon Added Successfully',

            position: 'bottom',
          })}
        {cart.decreaseQuantitySuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Cart quantity updated',

            position: 'bottom',
          })}
        {cart.increaseQuantitySuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Cart quantity updated',

            position: 'bottom',
          })}

        {cart.error
          ? Toast.show({
              type: 'error',
              text1: `asdasd`,

              position: 'bottom',
            })
          : null}

        <MapBottomSheet
          myRef={(ref: any) => (this.bottomSheetRef = ref)}
          adressRef={(ref: any) => (this.adressRef = ref)}
          onPressClear={() => this.adressRef.clear()}
          handleUserLocation={() => this.handleUserLocation()}
          navigation={this.props.navigation}
          navigatePage="Cart"
        />

        <>
          <TopCart
            onclick={this.openBottomSheet}
            address={address.userAddressText}
            navigation={this.props.navigation}
          />
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
              }}>
              <View style={styles.container}>
                <FlatList
                  data={cart.cartData}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}: ItemTypes) => (
                    <View style={styles.containerBody}>
                      <View style={styles.cartInside}>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              backgroundColor: '#f2f2f2',
                              padding: 5,
                              borderRadius: 15,
                              // paddingRight: 10,
                            }}>
                            <Image
                              style={{
                                height: 70,
                                width: 70,
                              }}
                              source={{
                                uri: `${API_URL_IMAGE}${item.product.thumbnail}`,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              paddingLeft: 10,
                              // width: '50%',
                              justifyContent: 'space-between',
                              paddingTop: 7,
                              paddingBottom: 7,
                            }}>
                            <View>
                              <Text style={{fontFamily: 'Montserrat-SemiBold'}}>
                                {item.product.name}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Medium',
                                  fontSize: 12,
                                }}>
                                {item.product.short_descrition}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontFamily: 'Montserrat-Medium',
                                  fontSize: 16,
                                }}>
                                {item.variant.price > 0
                                  ? `৳ ${item.variant.price}`
                                  : `৳ ${item.product.price}`}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.handleDecreaseQuantity(
                                item.id,
                                item.variant.id,
                              )
                            }>
                            <Icon name="minus" size={30} />
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontFamily: 'Montserrat-Bold',
                              padding: 4,
                            }}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              this.props.handleIncreaseQuantity(
                                item.id,
                                item.variant.id,
                              )
                            }>
                            <Icon name="plus" size={30} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item: {id: number}) => `${item.id}`}
                  contentContainerStyle={{paddingVertical: 5}}
                />
              </View>
            </View>
          </View>
          <View style={styles.containerSummary}>
            <View
              style={{
                padding: 10,
              }}>
              <View>
                <View>
                  <TextInput
                    onChangeText={text =>
                      this.setState({
                        coupon_code: text,
                      })
                    }
                    autoCapitalize="characters"
                    style={{
                      position: 'relative',
                      padding: 10,
                      backgroundColor: 'white',
                      borderRadius: 12,
                    }}
                    placeholder="Promo Code"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: 10,
                    }}>
                    <Pressable
                      onPress={() =>
                        this.props.handleCouponAdded(this.state.coupon_code)
                      }>
                      <View
                        style={{
                          backgroundColor: 'black',
                          padding: 5,
                          paddingLeft: 10,
                          paddingRight: 10,
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          Apply
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}>
                  <PriceCard
                    title="Sub Total"
                    sub_total={cart.final_cart.sub_total}
                  />
                  {cart.final_cart.total_saved > 0 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 3,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Promo
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Light',
                        }}>
                        -৳{cart.final_cart.total_saved}
                      </Text>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 3,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'black',
                      }}>
                      Total Amount
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                      }}>
                      ৳{cart.final_cart.total}
                    </Text>
                  </View>
                  {!address.user_have_address && (
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,
                        textAlign: 'center',
                        paddingTop: 5,
                        color: 'red',
                      }}>
                      Please Update Your Address
                    </Text>
                  )}

                  <TouchableOpacity
                    disabled={!address.user_have_address}
                    onPress={() =>
                      this.props.navigation.navigate('Checkout', {
                        userAddress: address.userAddressText,
                      })
                    }>
                    <View
                      style={{
                        backgroundColor: 'black',
                        padding: 15,
                        marginTop: 15,
                        borderRadius: 12,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="credit-card" size={35} color="white" />
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontFamily: 'Montserrat-Bold',
                              fontSize: 16,
                              marginLeft: 5,
                            }}>
                            Checkout
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontFamily: 'Montserrat-SemiBold',
                              fontSize: 14,
                              marginLeft: 5,
                            }}>
                            ৳ {cart.final_cart.total}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Toast config={toastConfig} ref={(ref: any) => Toast.setRef(ref)} />
        </>

        {cart.loading && <OverlaySpinner />}
      </>
    );
  }
}

interface LinkStateProps {
  cart: CartState;
  address: MapsTypes;
}

interface LinkDispatchProps {
  fetchUserCart: () => void;
  fetchUserAddress: () => void;
  handleIncreaseQuantity: (id: number, variant_id: number) => void;
  handleDecreaseQuantity: (id: number, variant_id: number) => void;
  handleCouponAdded: (data: {
    coupon_code: string;
    final_cart_id: number;
  }) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    cart: state.cart,
    address: state.address,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CartActions>,
): LinkDispatchProps => {
  return {
    fetchUserCart: bindActionCreators(fetchUserCart, dispatch),
    fetchUserAddress: bindActionCreators(fetchUserAddress, dispatch),
    handleIncreaseQuantity: bindActionCreators(
      handleIncreaseQuantity,
      dispatch,
    ),
    handleDecreaseQuantity: bindActionCreators(
      handleDecreaseQuantity,
      dispatch,
    ),
    handleCouponAdded: bindActionCreators(handleCouponAdded, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
