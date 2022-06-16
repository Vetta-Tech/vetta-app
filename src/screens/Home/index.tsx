import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Component} from 'react';

import Appstyle from '../../constants/AppStyles';

import {subcat, babycat, shoescat} from '../../constants/images';

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

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchHomeProducts} from '../../store/actions';
import {connect} from 'react-redux';
import {State} from '../../store/reducers';

type RootStackParamList = {
  Pdp: undefined;
};

interface IPdpPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
  fetchHomeProducts: any;
  featured: any;
  recent_products: any;
  popular: any;
  electronics: any;
  footwear: any;
  baby_care: any;
  loading: any;
  error: any;
}

export const OverlaySpinner = () => {
  return (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

class Home extends Component<IPdpPageProps> {
  async componentDidMount() {
    this.props.fetchHomeProducts();
  }

  render() {
    return (
      <>
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
            navigation={this.props.navigation}
          />
          <Search navigation={this.props.navigation} />
        </View>

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
          <Brands />

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
    recent_products: state.products.recent_products,
    popular: state.products.popular,
    electronics: state.products.electronics,
    footwear: state.products.footwear,
    baby_care: state.products.baby_care,
    loading: state.products.loading,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, {fetchHomeProducts})(Home);

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
});
