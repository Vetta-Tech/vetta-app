import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import React, {Component} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {API_URL, API_URL_IMAGE} from '@env';

import {Product, TopNav} from '../../components';
import {OverlaySpinner} from '../Login/PhoneInput';

interface ProductListProps {
  route: {
    params: {
      cat: string;
      sub_cat: string;
      isFeatured: boolean;
    };
  };
  navigation: any;
  fetchBasedOnSubCat: any;
  isFeatured: boolean;
}

interface ProductListState {
  products: [];
  loading: boolean;
  error: string;
  activeCat: string;
  category: string;
  categories: {};
  limit: number;
  offset: number;
  hasMore: boolean;
}

function filterDuplicates<T>(
  array: T[],
  areEqual: (a: T, b: T) => boolean,
): T[] {
  return array.filter((item: T, pos: number) => {
    return array.findIndex((other: T) => areEqual(item, other)) == pos;
  });
}

class ProductList extends Component<ProductListProps, ProductListState> {
  state: ProductListState = {
    categories: {},
    products: [],
    loading: false,
    error: '',
    activeCat: '',
    category: '',
    limit: 10,
    offset: 0,
    hasMore: false,
  };

  componentDidMount() {
    this.fetchFeaturedProducts();
  }

  fetchFeaturedProducts = () => {
    const {isFeatured} = this.props.route.params;

    if (!isFeatured) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        loading: true,
        activeCat: 'Featured',
      });
      axios
        .get(
          `${API_URL}products/featured-infinite?limit=${this.state.limit}&offset=${this.state.offset}`,
        )
        .then(res => {
          const data = res.data.cat_qs;
          const newProducts = res.data.featured;
          data.unshift({
            name: 'Featured',
          });
          this.setState({
            products: [...newProducts, ...this.state.products],
            categories: res.data.cat_qs,
            loading: false,
            offset: this.state.offset + this.state.limit,
          });
        })
        .catch(err => console.log(err));
    }
  };

  onSwipeLeft(gestureState: any) {
    console.log(gestureState);
    console.log('You swiped left!');
  }

  onSwipeRight(gestureState: any) {
    console.log('You swiped Right!');
  }

  fetchBasedOnCat = (category_name: string) => {
    this.setState(
      {
        loading: true,
        activeCat: category_name,
        limit: 10,
        offset: 0,
        products: [],
      },
      () => {
        axios
          .get(
            `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
            {
              params: {
                cat: category_name,
              },
            },
          )
          .then(res => {
            const data = _.uniqBy(res.data.products, 'id');
            console.log(data);
            this.setState({
              products: data,
              loading: false,
              offset: this.state.offset + this.state.limit,
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: err,
            });
          });
      },
    );
  };

  fetchBasedOnSubCat = (cat_name: string) => {
    Vibration.vibrate(20);
    this.setState(
      {
        products: [],
        activeCat: cat_name,
        loading: true,
      },
      () => {
        if (this.state.activeCat == 'Featured') {
          this.fetchFeaturedProducts();
        } else {
          this.fetchBasedOnCat(this.state.activeCat);
        }
      },
    );
  };

  fetchInfiniteProducts = () => {
    console.log('Fetching.............');
    this.setState({
      loading: true,
    });
    if (this.state.activeCat === 'Featured') {
      this.fetchFeaturedProducts();
    } else {
      axios
        .get(
          `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
          {
            params: {
              cat: this.state.activeCat,
            },
          },
        )
        .then(res => {
          const newProducts = res.data.products;
          const data = _.uniqBy(this.state.products, 'id');
          this.setState({
            products: [...data, ...newProducts],
            loading: false,
            offset: this.state.offset + this.state.limit,
          });

          console.log('offset', this.state.offset, this.state.limit);
        })
        .catch(err => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  render() {
    console.log('asd', this.state.categories);
    return (
      <View
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'white',
          padding: 5,
          width: '100%',
          height: '100%',
        }}>
        <TopNav
          navigation={this.props.navigation}
          icon="chevron-left"
          title="Featured"
          left={true}
          leftIcon="trash"
        />
        <View>
          <FlatList
            data={this.state.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}: any) => (
              <View style={{paddingRight: 8, paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() => this.fetchBasedOnSubCat(item.name)}>
                  <View
                    style={
                      item.name === this.state.activeCat
                        ? styles.catListActive
                        : styles.catList
                    }>
                    <Text
                      style={
                        item.name === this.state.activeCat
                          ? styles.catListTXTActive
                          : styles.catListTXT
                      }>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{paddingVertical: 15}}
          />
        </View>

        <GestureRecognizer
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onEndReached={() => this.fetchInfiniteProducts()}
            data={this.state.products}
            renderItem={({item}) => <Product item={item} />}
            numColumns={2}
          />
        </GestureRecognizer>

        {this.state.loading && <OverlaySpinner />}
      </View>
    );
  }
}

export default ProductList;

const styles = StyleSheet.create({
  catList: {
    backgroundColor: '#ededed',
    borderRadius: 13,
  },
  catListActive: {
    borderRadius: 13,
    backgroundColor: 'black',
  },

  catListTXTActive: {
    color: 'white',
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  catListTXT: {
    color: 'black',
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
});
// active={sub_cat ? sub_cat : cat}
