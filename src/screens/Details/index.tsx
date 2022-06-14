import {API_URL_IMAGE} from '@env';
import React, {Component} from 'react';
import {Image, Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  Description,
  HoriLine,
  NameSection,
  ReviewSummery,
  TopNavDetails,
} from '../../components';

import {detailsImg} from '../../constants/images';
import {fetchProductDetails} from '../../store/actions';
import {State} from '../../store/reducers';
import {OverlaySpinner} from '../Login/PhoneInput';

interface DetailsProps {
  navigation: any;
  route: {
    params: {
      slug: string;
    };
  };
  fetchProductDetails: any;
  product: any;
  loading: boolean;
  images: any;
  variants: any;
  error: string;
}

interface DetailsState {
  showDescription: boolean;
}

const windowHeight = Dimensions.get('window').height;

class Details extends Component<DetailsProps, DetailsState> {
  state = {
    showDescription: false,
  };

  componentDidMount() {
    const {slug} = this.props.route.params;
    if (!slug) {
      this.props.navigation.goBack();
    }
    this.props.fetchProductDetails(slug);
  }

  render() {
    const {product} = this.props;

    console.log('adsads', product.supplier_name);
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            <View style={styles.topNav}>
              <TopNavDetails
                navigation={this.props.navigation}
                icon="chevron-left"
                shareIcon="share-apple"
              />
            </View>
            <View>
              <Image
                source={{
                  uri: `${API_URL_IMAGE}${product.thumbnail}`,
                }}
                resizeMode="cover"
                style={{
                  height: windowHeight / 2.5,
                  width: '100%',
                  padding: 0,
                  marginBottom: 0,
                }}
              />
            </View>
          </View>
          <View style={styles.detailsStyle}>
            <NameSection
              brand_name={product.supplier_name}
              product_name={product.name}
              price={product.price}
            />
          </View>
          <HoriLine />
          <View style={styles.detailsStyle}>
            <ReviewSummery />
          </View>

          <View
            style={{backgroundColor: '#ededed', padding: 5, borderRadius: 12}}>
            <Description />
            <Description />
            <Description />
          </View>
          <HoriLine />
        </ScrollView>
        {this.props.loading && <OverlaySpinner />}
      </View>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    product: state.products.product,
    loading: state.products.loading,
    images: state.products.images,
    variants: state.products.variants,
    error: state.products.error,
  };
};

export default connect(mapStateToProps, {fetchProductDetails})(Details);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  imgContainer: {
    backgroundColor: '#ededed',
    padding: 10,
    borderRadius: 12,
  },
  detailsStyle: {
    padding: 10,
  },
  topNav: {},
});
