import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Vibration,
  Dimensions,
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
  categories: [];
  limit: number;
  offset: number;
  hasMore: boolean;
  cat_id: number;
  index: number;
}

class PopularProducts extends Component<ProductListProps, ProductListState> {
  constructor(props: any) {
    super(props);
    this.flatListRef = null;
    this.state = {
      categories: [],
      products: [],
      loading: false,
      error: '',
      activeCat: '',
      category: '',
      limit: 10,
      offset: 0,
      hasMore: false,
      cat_id: 0,
      index: 3,
    };
  }

  componentDidMount() {
    this.fetchFeaturedProducts();
  }

  fetchFeaturedProducts = () => {
    const {isPopular} = this.props.route.params;

    if (!isPopular) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        loading: true,
        activeCat: 'Popular',
      });
      axios
        .get(
          `${API_URL}products/featured-infinite?limit=${this.state.limit}&offset=${this.state.offset}`,
        )
        .then(res => {
          const data = res.data.cat_qs;
          const newProducts = res.data.featured;
          data.unshift({
            name: 'Popular',
            id: 0,
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
    const map = this.state.categories.find(x => x.id === this.state.cat_id + 1);
    const length = this.state.categories.length;
    console.log('length', length);

    if (this.state.cat_id < length - 1) {
      this.flatList.scrollToIndex({
        animated: true,
        index: this.state.cat_id + 1,
      });
      this.setState(
        {
          cat_id: this.state.cat_id + 1,
          activeCat: map.name,
        },
        () => {
          console.log('You swiped left!', this.state.cat_id);
          this.fetchBasedOnSubCat(map.name);
        },
      );
    } else {
      console.log(length);
    }
  }

  onSwipeRight(gestureState: any) {
    const map = this.state.categories.find(x => x.id === this.state.cat_id - 1);
    if (this.state.cat_id > 0) {
      this.flatList.scrollToIndex({
        animated: true,
        index: this.state.cat_id - 1,
      });

      this.setState(
        {
          cat_id: this.state.cat_id - 1,
          activeCat: map.name,
        },
        () => {
          console.log('You swiped left!', this.state.cat_id);
          this.fetchBasedOnSubCat(map.name);
        },
      );
    }
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

  getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  fetchBasedOnSubCat = (cat_name: string) => {
    Vibration.vibrate(20);
    const cat_id = this.state.categories.find(x => x.name === cat_name);
    this.setState(
      {
        products: [],
        activeCat: cat_name,
        loading: true,
        cat_id: cat_id.id,
      },
      () => {
        if (this.state.activeCat == 'Popular') {
          this.setState(
            {
              limit: 10,
              offset: 0,
            },
            () => {
              this.fetchFeaturedProducts();
            },
          );
        } else {
          this.fetchBasedOnCat(this.state.activeCat);
        }
      },
    );
  };

  fetchInfiniteProducts = () => {
    console.log('Fetching.............', this.state.activeCat);
    this.setState({
      loading: true,
    });
    if (this.state.activeCat === 'Popular') {
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
        })
        .catch(err => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  render() {
    console.log('activeCat', this.state.activeCat);
    console.log('cat_id', this.state.cat_id);
    const config = {
      velocityThreshold: 0.6,
      directionalOffsetThreshold: 80,
    };
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
          title="Popular"
          left={true}
          leftIcon="trash"
        />
        <View>
          <FlatList
            data={this.state.categories}
            horizontal
            ref={ref => {
              this.flatList = ref;
            }}
            onScroll={() => console.log('heloooooooo')}
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
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}>
          <FlatList
            initialScrollIndex={0}
            showsVerticalScrollIndicator={false}
            // onEndReachedThreshold={1}
            onEndReached={() => this.fetchInfiniteProducts()}
            data={this.state.products}
            renderItem={({item}) => (
              <Product navigation={this.props.navigation} item={item} />
            )}
            numColumns={2}
          />
        </GestureRecognizer>

        {this.state.loading && <OverlaySpinner />}
      </View>
    );
  }
}

export default PopularProducts;

const styles = StyleSheet.create({
  catList: {
    backgroundColor: '#ededed',
    borderRadius: 13,
  },
  catListActive: {
    borderRadius: 13,
    backgroundColor: 'black',
    justifyContent: 'center',
  },

  catListTXTActive: {
    color: 'white',
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
    justifyContent: 'center',
  },
  catListTXT: {
    color: 'black',
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
    justifyContent: 'center',
  },
});
// active={sub_cat ? sub_cat : cat}
