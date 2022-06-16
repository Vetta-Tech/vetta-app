import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import React, {Component} from 'react';
import {CategoryCard, Product, TopNav} from '../../components';
import {API_URL_IMAGE} from '@env';
import {getchAllCategories} from '../../store/actions/category';
import {State} from '../../store/reducers';

interface CategoryProps {
  navigation: any;
  getchAllCategories: any;
  loading: boolean;
  cats: [];
  err: string;
}

class Category extends Component<CategoryProps> {
  componentDidMount() {
    this.props.getchAllCategories();
  }

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
          title="Category"
          left={true}
          leftIcon="trash"
        />
        <FlatList
          style={{
            marginTop: 15,
          }}
          data={this.props.cats}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <CategoryCard item={item} navigation={this.props.navigation} />
          )}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingVertical: 5}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    loading: state.categories.loading,
    cats: state.categories.categories,
    err: state.categories.error,
  };
};

export default connect(mapStateToProps, {getchAllCategories})(Category);

const styles = StyleSheet.create({});
