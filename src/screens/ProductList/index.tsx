import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import React, {Component} from 'react';
import {API_URL} from '@env';
import axios from 'axios';
import {Product, TopNav} from '../../components';
import {OverlaySpinner} from '../Login/PhoneInput';
import _ from 'lodash';

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
}

class ProductList extends Component<ProductListProps, ProductListState> {
  state: ProductListState = {
    sub_categories: [],
    products: [],
    loading: false,
    error: '',
    activeCat: '',
    category: '',
    limit: 10,
    offset: 0,
    sub_cat: '',
  };

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
          });
          this.setState({
            loading: false,
            products: res.data.products,
            sub_categories: data,
          });
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: err,
          });
        });
    }
  };

  fetchBasedOnCat = (name: string, category_name: string) => {
    console.log(name, category_name);
    this.setState(
      {
        loading: true,
        category: name,
        limit: 10,
        offset: 0,
        sub_cat: category_name,
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

  fetchBasedOnSubCat = (name: string, category_name: string) => {
    console.log(name, category_name);
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
          this.fetchBasedOnCat(this.state.category, this.state.sub_cat);
        }
      },
    );
  };

  fetchInfiniteProducts = () => {
    console.log('onEndReached={() => this.fetchInfiniteProducts()}');
    this.setState({
      loading: true,
    });

    if (this.state.activeCat === 'All Products') {
      this.fetchProducts();
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
          console.log(err);

          this.setState({
            loading: false,
          });
        });
    }
  };

  render() {
    const {cat, sub_cat} = this.props.route.params;
    console.log(this.state.products);
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

        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReached={() => this.fetchInfiniteProducts()}
          data={this.state.products}
          renderItem={({item}) => <Product item={item} />}
          numColumns={2}
        />

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
