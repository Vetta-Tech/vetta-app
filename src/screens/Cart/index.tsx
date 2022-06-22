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

export interface CartData {
  expires: string;
  id: number;
  product: {
    name: string;
    price: number;
    slug: string;
    thumbnail: string;
  };
}

interface CartProps {}

interface CartState {
  loading: boolean;
  error: string;
  cartData: CartData[];
  final_cart: {
    id: number;
    total: number;
    sub_total: number;
    total_saved: number;
  };
  couponAddedSuccess: boolean;
  coupon_code: string;
  increaseQuantitySuccess: boolean;
  decreaseQuantitySuccess: boolean;
  coupon_add_error: string;
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

class Cart extends React.Component<CartProps, CartState> {
  state = {
    loading: false,
    cartData: [],
    error: '',
    price: 0,
    final_cart: {
      id: 0,
      total: 0,
      sub_total: 0,
      total_saved: 0,
    },
    couponAddedSuccess: false,
    increaseQuantitySuccess: false,
    decreaseQuantitySuccess: false,
    coupon_code: '',
    coupon_add_error: '',
  };

  componentDidMount() {
    this.fetchUserCart();
  }

  fetchUserCart = async () => {
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
      .get(`${API_URL}cart/cart-list`, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false,
          cartData: res.data.cart_qs,
          final_cart: res.data.final_cart,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: 'Something went wrong',
        });
      });
  };

  handleCouponAdded = async () => {
    Vibration.vibrate(20);
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

    const data = {
      coupon_code: this.state.coupon_code,
      final_cart_id: this.state.final_cart.id,
    };

    axios
      .post(`${API_URL}cart/coupon-add`, data, config)
      .then(res => {
        console.log(res.data.msg);
        if (res.data.success === 'OK') {
          this.setState(
            {
              loading: false,
              couponAddedSuccess: true,
            },
            () => {
              this.fetchUserCart();
            },
          );
        } else {
          this.setState({
            loading: false,
            couponAddedSuccess: false,
          });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          loading: false,
          couponAddedSuccess: false,
          error: err.response.data.msg,
        });
      });
  };

  handleIncreaseQuantity = async (id: number, variant_id: number) => {
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

    const data = {
      id,
      variant_id,
    };

    axios
      .post(`${API_URL}cart/plus-quantity`, data, config)
      .then(res => {
        this.setState(
          {
            loading: false,
            increaseQuantitySuccess: true,
          },
          () => {
            this.fetchUserCart();
          },
        );
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: 'Something went wrong',
        });
      });
  };

  handleDecreaseQuantity = async (id: number, variant_id: number) => {
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

    const data = {
      id,
      variant_id,
    };

    axios
      .post(`${API_URL}cart/minus-quantity`, data, config)
      .then(res => {
        this.setState(
          {
            loading: false,
            decreaseQuantitySuccess: true,
          },
          () => {
            this.fetchUserCart();
          },
        );
      })
      .catch(err => {
        console.log(err.data.msg);
      });
  };

  render() {
    console.log('total_saved', this.state.final_cart.total_saved);
    return (
      <>
        {this.state.couponAddedSuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Coupon Added Successfully',

            position: 'bottom',
          })}
        {this.state.decreaseQuantitySuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Cart quantity updated',

            position: 'bottom',
          })}
        {this.state.increaseQuantitySuccess &&
          Toast.show({
            type: 'customSuccess',
            text1: 'Cart quantity updated',

            position: 'bottom',
          })}

        {this.state.error
          ? Toast.show({
              type: 'error',
              text1: `${this.state.error}`,

              position: 'bottom',
            })
          : null}

        <View style={styles.container}>
          <TopCart />
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.container}>
              <FlatList
                data={this.state.cartData}
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
                            this.handleDecreaseQuantity(
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
                            this.handleIncreaseQuantity(
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
                  <Pressable onPress={() => this.handleCouponAdded()}>
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
                  sub_total={this.state.final_cart.sub_total}
                />
                {this.state.final_cart.total_saved > 0 ? (
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
                      -৳{this.state.final_cart.total_saved}
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
                    ৳{this.state.final_cart.total}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Checkout')}>
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
                          ৳ {this.state.final_cart.total}
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
        {this.state.loading && <OverlaySpinner />}
      </>
    );
  }
}
export default Cart;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 25,
    backgroundColor: 'white',
    flex: 1,
  },

  containerBody: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  cartInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerSummary: {
    borderRadius: 120,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});
