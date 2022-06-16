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
      supplier_name: string;
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

class ProductListBrands extends Component<ProductListProps, ProductListState> {
  state: ProductListState = {
    sub_categories: [],
    products: {},
    loading: false,
    error: '',
    activeCat: '',
    category: '',
  };

  componentDidMount() {
    const {supplier_name} = this.props.route.params;

    console.log('supplier_name', supplier_name);

    if (!supplier_name) {
      //   this.props.navigation.navigate('Home');
    } else {
      this.setState({
        loading: true,
      });
      axios
        .get(`${API_URL}products/brands`, {
          params: {
            brands_name: supplier_name,
          },
        })
        .then(res => {
          const data = res.data.category_qs;
          console.log('data for brand', data);
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
          title={this.props.route.params.supplier_name}
          left={true}
          leftIcon="trash"
        />

        <ScrollView
          style={{marginTop: 10}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={this.state.products}
            renderItem={({item}) => (
              <Product navigation={this.props.navigation} item={item} />
            )}
            numColumns={2}
          />
        </ScrollView>
        {this.state.loading && <OverlaySpinner />}
      </View>
    );
  }
}

export default ProductListBrands;

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
