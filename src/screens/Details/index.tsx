import {API_URL_IMAGE} from '@env';
import React, {Component} from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Description,
  FeaturedPRoducts,
  HoriLine,
  NameSection,
  ReviewSummery,
  TopNavDetails,
} from '../../components';

import {fetchProductDetails, fetchProductByBrand} from '../../store/actions';
import {State} from '../../store/reducers';
import {OverlaySpinner} from '../Login/PhoneInput';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface DetailsProps {
  navigation: any;
  route: {
    params: {
      slug: string;
      brand: string;
    };
  };
  fetchProductDetails: any;
  fetchProductByBrand: any;
  product: any;
  loading: boolean;
  images: any;
  variants: any;
  error: string;
  brandProducts: any;
}

interface DetailsState {
  showDescription: boolean;
  activeSlide: number;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Details extends Component<DetailsProps, DetailsState> {
  state = {
    showDescription: false,
    activeSlide: 0,
  };

  componentDidMount() {
    const {slug, brand} = this.props.route.params;
    console.log('this.props.supplier_name', brand);
    if (!slug) {
      this.props.navigation.goBack();
    }
    if (brand) {
      const brands_name = brand;
      this.props.fetchProductByBrand(brands_name);
    }
    this.props.fetchProductDetails(slug);
  }

  _renderItem = ({item, index}: any) => {
    return (
      <View>
        <Image
          source={{
            uri: `${API_URL_IMAGE}${item.image}`,
          }}
          style={{
            height: windowHeight / 2.5,
            width: '100%',
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  get pagination() {
    const {images} = this.props;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={this.state.activeSlide}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    );
  }

  render() {
    const {product, brandProducts} = this.props;
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
              <Carousel
                data={this.props.images}
                renderItem={this._renderItem}
                sliderWidth={windowWidth / 1.1}
                itemWidth={windowWidth / 1.2}
                layout={'default'}
                onSnapToItem={(index: number) =>
                  this.setState({activeSlide: index})
                }
              />
              {this.pagination}
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
            style={{
              backgroundColor: '#ededed',
              padding: 5,
              borderRadius: 12,
              marginBottom: 10,
            }}>
            <Description />
            <Description />
            <Description />
          </View>

          <HoriLine />
          <View style={{padding: 5}}>
            <FeaturedPRoducts
              supplier_name={this.props.route.params.brand}
              navigation={this.props.navigation}
              featured={brandProducts}
              name={`More Form ${this.props.route.params.brand}`}
              screen_name="ProductListBrands"
            />
          </View>
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
    brandProducts: state.products.brandProducts,
  };
};

export default connect(mapStateToProps, {
  fetchProductDetails,
  fetchProductByBrand,
})(Details);

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
