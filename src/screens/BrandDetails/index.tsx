import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Vibration,
} from 'react-native';
import React, {Component} from 'react';
import {Product, TopNavBrands} from '../../components';
import {SupplierTypes} from '../../store/reducers/supplier';
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';
import {API_URL} from '@env';
import _ from 'lodash';
import {SharedElement} from 'react-navigation-shared-element';

interface BrandDeatilsProps {
  brand: SupplierTypes;
  fetchBrndsProducts: any;
  route: {
    params: {
      supplier: string;
      slug: string;
    };
  };
  navigation: any;
}

class BrandDeatils extends Component<BrandDeatilsProps> {
  private flatList: any;
  constructor(props: any) {
    super(props);
    this.flatList = React.createRef();
    this.state = {
      activeCat: '',
      limit: 10,
      offset: 0,
      brands: [],
      data: [],
      error: '',
      brandData: {},
      supplier: '',
      products: [],
      index: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchBrandsDetails();
  }

  fetchBrandsDetails = () => {
    const {supplier, slug} = this.props.route.params;
    if (!slug) {
      this.props.navigation.navigate('Home');
    } else {
      this.setState(
        {
          supplier,
          activeCat: 'All Products',
          offset: 0,
          limit: 10,
        },
        () => {
          axios
            .get(`${API_URL}supplier/${slug}`)
            .then(res => {
              const data = res.data.category;
              console.log(typeof data);
              data.unshift({
                name: 'All Products',
                id: 0,
              });
              this.setState(
                {
                  loading: false,
                  data: data,
                  brandData: res.data,
                },
                () => {
                  this.fetchProductsBasedOnCategory(
                    this.state.activeCat,
                    this.state.supplier,
                  );
                },
              );
            })
            .catch(err => {
              this.setState({
                loading: false,
                error: 'Something went wrong',
              });
            });
        },
      );
    }
  };

  onSwipeLeft = () => {
    const {data} = this.state;

    const length = data.length;

    const cat_data = data[this.state.index + 1];

    console.log(cat_data);

    if (this.state.index < length - 1) {
      this.setState(
        {
          index: this.state.index + 1,
          activeCat: cat_data.name,
        },
        () => {
          this.fetchProductsBasedOnCategory(cat_data.name, this.state.supplier);
        },
      );
    }
  };
  onSwipeRight = () => {
    const {data} = this.state;

    const length = data.length;

    const cat_data = data[this.state.index - 1];

    if (this.state.index > 0) {
      this.setState(
        {
          index: this.state.index - 1,
          activeCat: cat_data.name,
        },
        () => {
          this.fetchProductsBasedOnCategory(cat_data.name, this.state.supplier);
        },
      );
    }
  };

  fetchProductsBasedOnCategory = (category: string, supplier: string) => {
    var index = this.state.data.indexOf(
      this.state.data.filter(function (item: {name: string}) {
        return item.name == category;
      })[0],
    );

    this.setState(
      {
        loading: true,
        limit: 10,
        offset: 0,
        index,
      },
      () => {
        axios
          .get(
            `${API_URL}supplier/brand-details?limit=${this.state.limit}&offset=${this.state.offset}`,
            {
              params: {
                cat: category,
                supplier: supplier,
              },
            },
          )
          .then(res => {
            const data = _.uniqBy(res.data.products, 'id');
            this.setState({
              loading: false,
              products: data,
              index,
              offset: this.state.offset + this.state.limit,
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: 'Something went wrnog',
            });
          });
      },
    );
  };

  fetchProductsInCondition = (category: string) => {
    Vibration.vibrate(20);
    this.setState(
      {
        activeCat: category,
        limit: 10,
        offset: 0,
        products: [],
      },
      () => {
        this.fetchProductsBasedOnCategory(category, this.state.supplier);
      },
    );
  };

  fetchInfiniteProducts = () => {
    console.log('assssssssssss', this.state.limit, this.state.offset);
    this.setState({
      loading: true,
    });

    axios
      .get(
        `${API_URL}supplier/brand-details?limit=${this.state.limit}&offset=${this.state.offset}`,
        {
          params: {
            cat: this.state.activeCat,
            supplier: this.state.supplier,
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
  };

  render() {
    const config = {
      velocityThreshold: 0.6,
      directionalOffsetThreshold: 80,
    };

    const {brandData} = this.state;
    console.log('idddddddddddddddd', this.props.route);
    return (
      <View
        style={{
          paddingTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: 'white',
          padding: 5,
          flex: 1,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{
              uri: `${brandData.cover_image}`,
            }}
            style={{
              width: '100%',
              height: 160,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              padding: 5,
              left: 0,
              right: 0,
            }}>
            <TopNavBrands />
          </View>

          <View
            style={{
              position: 'absolute',
              padding: 10,
              top: 100,
              width: '100%',
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#f2f2f2',
                borderRadius: 60,
                padding: 10,
                width: '30%',
              }}>
              <SharedElement id={`item.${brandData.slug}.photo`}>
                <Image
                  source={{
                    uri: `${brandData.logo}`,
                  }}
                  resizeMode="contain"
                  style={{
                    height: 80,
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 15,
                  }}
                />
              </SharedElement>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 50,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              color: 'black',
              padding: 10,
            }}>
            Lorem ipsum dolor sit amet consectetur adipicing elit. Recusandae
            corrupti, laborum perferendis facilis odio aliquam minima non
            molestiae? Voluptas consequatur non libero qui! Laborum voluptatem
          </Text>
        </View>
        <GestureRecognizer
          onSwipeLeft={state => this.onSwipeLeft()}
          onSwipeRight={state => this.onSwipeRight()}
          config={config}>
          <FlatList
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            onEndReached={() => this.fetchInfiniteProducts()}
            data={this.state.products}
            renderItem={({item}) => (
              <Product navigation={this.props.navigation} item={item} />
            )}
            numColumns={2}
            ListHeaderComponent={() => {
              return (
                <>
                  <View>
                    <FlatList
                      data={this.state.data}
                      horizontal
                      ref={ref => {
                        this.flatList = ref;
                      }}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item}: any) => (
                        <View style={{paddingRight: 8, paddingTop: 10}}>
                          <TouchableOpacity
                            onPress={() =>
                              this.fetchProductsInCondition(item.name)
                            }>
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
                </>
              );
            }}
          />
        </GestureRecognizer>
      </View>
    );
  }
}

export default BrandDeatils;

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
