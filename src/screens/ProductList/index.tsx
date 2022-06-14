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
  products: {};
  sub_categories: [];
  loading: boolean;
  error: string;
  activeCat: string;
  category: string;
}

class ProductList extends Component<ProductListProps, ProductListState> {
  state: ProductListState = {
    sub_categories: [],
    products: {},
    loading: false,
    error: '',
    activeCat: '',
    category: '',
  };

  componentDidMount() {
    const {cat, sub_cat} = this.props.route.params;
    if (sub_cat === undefined) {
      this.setState({
        activeCat: 'All Products',
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
        .get(`${API_URL}products/category/products`, {
          params: {
            cat: cat,
            sub_cat: sub_cat,
          },
        })
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
  }

  fetchBasedOnSubCat = (name: string, category_name: string) => {
    Vibration.vibrate(20);
    console.log(name, category_name);
    this.setState({
      loading: true,
      activeCat: name,
    });

    axios
      .get(`${API_URL}products/category/products`, {
        params: {
          cat: category_name,
          sub_cat: name,
        },
      })
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
  };

  render() {
    const {cat, sub_cat} = this.props.route.params;
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={this.state.products}
            renderItem={({item}) => <Product item={item} />}
            numColumns={2}
          />
        </ScrollView>
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
