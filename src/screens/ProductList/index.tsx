import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';

import {API_URL} from '@env';
import axios from 'axios';
import {Product, TopNav} from '../../components';
import {OverlaySpinner} from '../Login/PhoneInput';

interface ProductListProps {
  route: {
    params: {
      cat: string;
      sub_cat: string;
    };
  };
  navigation: any;
}

interface ProductListState {
  products: [];
  sub_categories: [];
  loading: boolean;
  error: string;
  activeCat: string;
  category: string;
  limit: number;
  offset: number;
  sub_cat: string;
  sub_cat_id: number;
  index: number;
}

class ProductList extends Component<ProductListProps, ProductListState> {
  constructor(props) {
    super(props);
    this.flatListRef = null;

    this.state = {
      sub_categories: [],
      products: [],
      loading: false,
      error: '',
      activeCat: '',
      category: '',
      limit: 10,
      offset: 0,
      sub_cat: '',
      sub_cat_id: 0,
      index: 0,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    const {cat, sub_cat} = this.props.route.params;
    if (sub_cat === undefined) {
      this.setState({
        activeCat: 'All Products',
      });
    } else {
      this.setState({
        category: cat,
        sub_cat: sub_cat,
        activeCat: sub_cat,
      });
    }
    if (!cat) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        loading: true,
        category: cat,
      });
      axios
        .get(
          `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
          {
            params: {
              cat: cat,
              sub_cat: sub_cat,
            },
          },
        )
        .then(res => {
          const data = res.data.category_qs;

          data.unshift({
            name: 'All Products',
            category: {name: 'All Products'},
            id: 0,
          });
          this.setState(
            {
              loading: false,
              products: res.data.products,
              sub_categories: data,
              offset: this.state.offset + this.state.limit,
            },
            () => {
              if (sub_cat) {
                var index = this.state.sub_categories.indexOf(
                  this.state.sub_categories.filter(function (item) {
                    return item.name == sub_cat;
                  })[0],
                );

                this.setState({
                  index,
                });
              }
            },
          );
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: err,
          });
        });
    }
  };

  fetchSwipeProducts = () => {
    this.setState({
      activeCat: 'All Products',
      loading: true,
    });

    axios
      .get(
        `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
        {
          params: {
            cat: this.state.category,
            sub_cat: this.state.activeCat,
          },
        },
      )
      .then(res => {
        const data = res.data.category_qs;
        const newProducts = res.data.products;
        const uniquedata = _.uniqBy(this.state.products, 'id');
        data.unshift({
          name: 'All Products',
          category: {name: 'All Products'},
          id: 0,
        });
        this.setState({
          loading: false,
          products: [...uniquedata, ...newProducts],
          sub_categories: data,
          offset: this.state.offset + this.state.limit,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err,
        });
      });
  };

  onSwipeLeft() {
    const {sub_categories} = this.state;
    const length = sub_categories.length;

    const sub_cat_data = sub_categories[this.state.index + 1];

    if (this.state.index < length - 1) {
      this.flatList.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
      this.setState(
        {
          index: this.state.index + 1,
          activeCat: sub_cat_data.name,
        },
        () => {
          console.log('You swiped left!', this.state.index);
          this.fetchBasedOnSubCat(
            sub_cat_data.name,
            sub_cat_data.category.name,
          );
        },
      );
    } else {
      console.log(length);
    }
  }

  onSwipeRight() {
    const {sub_categories} = this.state;
    const length = sub_categories.length;

    const sub_cat_data = sub_categories[this.state.index - 1];

    if (this.state.index > 0) {
      this.flatList.scrollToIndex({
        animated: true,
        index: this.state.index - 1,
      });
      this.setState(
        {
          index: this.state.index - 1,
          activeCat: sub_cat_data.name,
        },
        () => {
          console.log('You swiped left!', sub_cat_data.category.name);
          this.RightSwipeFetch(sub_cat_data.name, sub_cat_data.category.name);
        },
      );
    } else {
      console.log('length', length);
    }
  }

  fetchBasedOnCat = (sub_cat: string, category_name: string) => {
    var index = this.state.sub_categories.indexOf(
      this.state.sub_categories.filter(function (item) {
        return item.name == sub_cat;
      })[0],
    );

    this.setState(
      {
        loading: true,
        category: category_name,
        limit: 10,
        offset: 0,
        sub_cat: sub_cat,
        index,
      },
      () => {
        axios
          .get(
            `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
            {
              params: {
                cat: this.state.category,
                sub_cat: this.state.sub_cat,
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

  RightSwipeFetch = (name: string, category_name: string) => {
    Vibration.vibrate(20);
    this.setState(
      {
        activeCat: name,
        limit: 10,
        offset: 0,
        products: [],
        sub_cat: name,
      },
      () => {
        if (this.state.activeCat === 'All Products') {
          this.fetchSwipeProducts();
        } else {
          this.fetchBasedOnCat(this.state.sub_cat, this.state.category);
        }
      },
    );
  };

  fetchBasedOnSubCat = (name: string, category_name: string) => {
    Vibration.vibrate(20);
    this.setState(
      {
        activeCat: name,
        limit: 10,
        offset: 0,
        products: [],
        sub_cat: name,
      },
      () => {
        if (this.state.activeCat === 'All Products') {
          this.fetchProducts();
        } else {
          this.fetchBasedOnCat(this.state.sub_cat, this.state.category);
        }
      },
    );
  };

  fetchInfiniteProducts = () => {
    this.setState({
      loading: true,
    });

    if (this.state.activeCat === 'All Products') {
      this.fetchSwipeProducts();
    } else {
      axios
        .get(
          `${API_URL}products/category/products?limit=${this.state.limit}&offset=${this.state.offset}`,
          {
            params: {
              cat: this.state.category,
              sub_cat: this.state.sub_cat,
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
    const {cat, sub_cat} = this.props.route.params;
    console.log('index', this.state.activeCat);
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
          title={sub_cat ? sub_cat : cat}
          left={true}
          leftIcon="trash"
        />
        <View>
          <FlatList
            data={this.state.sub_categories}
            horizontal
            ref={ref => {
              this.flatList = ref;
            }}
            // initialScrollIndex={1}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}: any) => (
              <View style={{paddingRight: 8, paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    this.fetchBasedOnSubCat(item.name, this.state.category)
                  }>
                  <View
                    style={
                      this.state.activeCat === item.name
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
