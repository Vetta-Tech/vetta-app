import React, {Component} from 'react';
import {connect} from 'react-redux';
import {API_URL, API_URL_IMAGE} from '@env';
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Vibration,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  Description,
  FeaturedPRoducts,
  HoriLine,
  NameSection,
  ReviewSummery,
  TopNavDetails,
} from '../../components';

import {fetchProductByBrand} from '../../store/actions';
import {State} from '../../store/reducers';
import {OverlaySpinner} from '../Login/PhoneInput';
import axios from 'axios';
import {
  ProductsInterface,
  VariantSerializer,
} from '../../utils/types/productTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  handleAddToCart: any;
}

interface DetailsState {
  showDescription: boolean;
  activeSlide: number;
  activeVariant: number;
  product_name_variant: string;
  images: [];
  productDetails: ProductsInterface[];
  variants: VariantSerializer[];
  price: number;
  loading: boolean;
  canAddToCart: boolean;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class Details extends Component<DetailsProps, DetailsState> {
  private bottomSheetRef: any;
  constructor(props: DetailsProps) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      showDescription: false,
      activeSlide: 0,
      activeVariant: 0,
      product_name_variant: '',
      productDetails: [],
      images: [],
      variants: [],
      price: 0,
      loading: false,
      canAddToCart: true,
    };
  }

  componentDidMount() {
    const {slug, brand} = this.props.route.params;
    if (!slug) {
      this.props.navigation.goBack();
    }
    if (brand) {
      const brands_name = brand;
      this.props.fetchProductByBrand(brands_name);
    }
    this.fetchProductDetails(slug);
  }

  fetchProductDetails = (slug: string) => {
    this.setState({
      loading: true,
    });
    axios.get(`${API_URL}products/details/${slug}`).then(res => {
      this.setState(
        {
          productDetails: res.data.products,
          images: res.data.images,
          variants: res.data.variants,
          loading: false,
        },
        () => {
          if (this.state.variants.length > 0) {
            for (let i = 0; i < this.state.variants.length; i++) {
              if (this.state.variants[i].quantity > 0) {
                this.setState(
                  {
                    product_name_variant: `${this.state.variants[i].title}`,
                    activeVariant: this.state.variants[i].id,
                    price: this.state.variants[i].price,
                  },
                  () => {
                    this.checkCanAddToCart();
                  },
                );
                break;
              }
            }
          } else {
            this.setState(
              {
                price: this.state.productDetails.price,
              },
              () => {
                this.checkCanAddToCart();
              },
            );
          }
        },
      );
    });
  };

  checkCanAddToCart = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: 'Token '.concat(token!),
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(
        `${API_URL}cart/check-add-to-cart`,
        {
          variant_id: this.state.activeVariant,
          product: this.state.productDetails?.slug,
        },
        config,
      )
      .then(res => {
        if (res.data.msg === 'True') {
          console.log('msggggggggggggggg', res.data.msg);
          this.setState({
            loading: false,
            canAddToCart: true,
          });
        } else if (res.data.msg === 'False') {
          console.log('msggggggggggggggg2', res.data.msg);

          this.setState({
            loading: false,
            canAddToCart: false,
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
          canAddToCart: false,
        });
      });
  };

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
    const {images} = this.state;
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
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    );
  }

  setVariant = (id: number, title: string, price: number) => {
    this.setState(
      {
        activeVariant: id,
        product_name_variant: title,
        price: price,
      },
      () => {
        this.bottomSheetRef.close();
        this.checkCanAddToCart();
      },
    );
  };

  onSubmitCart = (slug: string, variant_id: number) => {
    if (this.state.activeVariant > 0) {
      const data = {
        slug: slug,
        variant_id: variant_id,
      };
      this.handleAddToCart(data);
    } else {
      const data = {
        slug: slug,
      };
      this.handleAddToCart(data);
    }
  };

  handleAddToCart = async (data: {}) => {
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

    axios
      .post(`${API_URL}cart/add-to-cart`, data, config)
      .then(res => {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.checkCanAddToCart();
          },
        );
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const {productDetails, variants} = this.state;
    return (
      <View style={styles.container}>
        <RBSheet
          ref={ref => {
            this.bottomSheetRef = ref;
          }}
          closeOnDragDown={true}
          dragFromTopOnly={true}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              borderTopStartRadius: 12,
              borderTopEndRadius: 12,
            },
          }}>
          <FlatList
            data={this.state.variants}
            renderItem={item => {
              return (
                <View
                  style={{
                    padding: 8,
                  }}>
                  <TouchableOpacity
                    disabled={item.item.quantity === 0}
                    onPress={() =>
                      this.setVariant(
                        item.item.id,
                        item.item.title,
                        item.item.price,
                      )
                    }>
                    <View
                      style={
                        item.item.id === this.state.activeVariant
                          ? styles.variantSelectActive
                          : styles.variantSelect
                      }>
                      <Text style={styles.variantSelectText}>
                        {item.item.title}
                      </Text>
                      {item.item.quantity > 0 ? (
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 12,
                          }}>
                          In Stock
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: 'Montserrat-SemiBold',
                            fontSize: 12,
                          }}>
                          Out of Stock
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </RBSheet>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imgContainer}>
            <View style={styles.topNav}>
              <TopNavDetails
                navigation={this.props.navigation}
                icon="chevron-left"
                shareIcon="share-apple"
              />
            </View>
            <View
              style={{
                position: 'relative',
              }}>
              <Carousel
                data={this.state.images}
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

            <View>
              <TouchableOpacity onPress={() => this.bottomSheetRef.open()}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'white',
                    paddingLeft: 15,
                    paddingRight: 15,
                    padding: 5,
                    borderRadius: 30,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                      fontSize: 12,
                    }}>
                    Variants
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: -5,
                      backgroundColor: 'green',
                      padding: 4,
                      borderRadius: 100,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      {this.state.variants.length}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailsStyle}>
            <NameSection
              brand_name={productDetails.supplier_name}
              product_name={productDetails.name}
              variants={variants}
              slug={productDetails.slug}
              onSubmitCart={this.onSubmitCart}
              product_name_variant={this.state.product_name_variant}
              activeVariant={this.state.activeVariant}
              price={this.state.price}
              canAddToCart={this.state.canAddToCart}
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
              isFeatured={false}
              supplier_name={this.props.route.params.brand}
              navigation={this.props.navigation}
              featured={this.props.brandProducts}
              name={`More Form ${this.props.route.params.brand}`}
              screen_name="ProductListBrands"
            />
          </View>
        </ScrollView>

        {this.state.loading && <OverlaySpinner />}
      </View>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    brandProducts: state.products.brandProducts,
    cartLoading: state.products.loading,
  };
};

export default connect(mapStateToProps, {
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
  topNav: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
  },

  variantSelect: {
    padding: 18,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  variantSelectActive: {
    padding: 18,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#76BA99',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  variantSelectText: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 16,
  },
});
