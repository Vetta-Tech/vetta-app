import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {BrandCard, TopNav} from '../../components';
import axios from 'axios';
import {API_URL} from '@env';
import {CategoryInterface} from '../../utils/types/productTypes';
import GestureRecognizer from 'react-native-swipe-gestures';
import _ from 'lodash';

interface AllBrandsProps {
  navigation: {
    navigate: any;
  };
}

interface AllBrandsState {
  catData: Array<CategoryInterface>;
  brandsData: [];
  loading: boolean;
  error: string;
  limit: number;
  offset: number;
  activeCat: string;
  index: number;
}

class AllBrands extends Component<AllBrandsProps, AllBrandsState> {
  private flatList: any;

  constructor(props: any) {
    super(props);
    this.flatList = React.createRef();

    this.state = {
      catData: [],
      brandsData: [],
      loading: false,
      error: '',
      limit: 8,
      offset: 0,
      activeCat: '',
      index: 0,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    this.setState({
      loading: true,
      activeCat: 'All Brands',
    });

    axios.get(`${API_URL}category/list`).then(res => {
      const data = res.data;

      data.unshift({
        name: 'All Brands',
        id: 0,
      });

      this.setState(
        {
          loading: false,
          catData: data,
        },
        () => {
          this.fetchBasedOnBrand('All Brands');
        },
      );
    });
  };

  fetchBasedOnBrand = (category: string) => {
    var index = this.state.catData.indexOf(
      this.state.catData.filter(function (item: {name: string}) {
        return item.name == category;
      })[0],
    );

    this.setState(
      {
        loading: true,
        activeCat: category,
        limit: 8,
        offset: 0,
        index,
      },
      () => {
        axios
          .get(
            `${API_URL}supplier/brand-list?limit=${this.state.limit}&offset=${this.state.offset}`,
            {
              params: {
                cat: category,
              },
            },
          )
          .then(res => {
            this.setState({
              loading: false,
              brandsData: res.data.brands,
              offset: this.state.offset + this.state.limit,
            });
          })
          .catch(err => {
            this.setState({
              loading: false,
              error: 'Something went wrong',
            });
          });
      },
    );
  };

  fetchInfiniteBrand = () => {
    console.log('asdddddddddddd', this.state.limit, this.state.offset);
    this.setState({
      loading: true,
    });
    axios
      .get(
        `${API_URL}supplier/brand-list?limit=${this.state.limit}&offset=${this.state.offset}`,
        {
          params: {
            cat: this.state.activeCat,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        const newProducts = res.data.brands;

        const data = _.uniqBy(this.state.brandsData, 'id');
        this.setState({
          brandsData: [...this.state.brandsData, ...newProducts],
          loading: false,
          offset: this.state.offset + this.state.limit,
        });
      });
  };

  onSwipeLeft() {
    const {catData} = this.state;
    const length = catData.length;

    const category: CategoryInterface = catData[this.state.index + 1];

    if (this.state.index < length - 1) {
      this.flatList!.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
      this.setState(
        {
          index: this.state.index + 1,
          activeCat: category.name,
        },
        () => {
          this.fetchBasedOnBrand(category.name);
        },
      );
    }
  }

  onSwipeRight() {
    const {catData} = this.state;
    const length = catData.length;

    const category: CategoryInterface = catData[this.state.index - 1];

    if (this.state.index > 0) {
      this.flatList!.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
      this.setState(
        {
          index: this.state.index - 1,
          activeCat: category.name,
        },
        () => {
          this.fetchBasedOnBrand(category.name);
        },
      );
    }
  }

  render() {
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
          title="Brands"
          left={true}
          leftIcon="trash"
        />
        <View>
          <FlatList
            data={this.state.catData}
            horizontal
            ref={ref => {
              this.flatList = ref;
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}: any) => (
              <View style={{paddingRight: 8, paddingTop: 10}}>
                <TouchableOpacity
                  onPress={() => this.fetchBasedOnBrand(item.name)}>
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
          onSwipeLeft={state => this.onSwipeLeft()}
          onSwipeRight={state => this.onSwipeRight()}
          config={config}>
          <FlatList
            initialScrollIndex={0}
            showsVerticalScrollIndicator={false}
            onEndReached={() => this.fetchInfiniteBrand()}
            data={this.state.brandsData}
            renderItem={({item}) => (
              <BrandCard navigation={this.props.navigation} item={item} />
            )}
            numColumns={2}
          />
        </GestureRecognizer>
      </View>
    );
  }
}

export default AllBrands;

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
