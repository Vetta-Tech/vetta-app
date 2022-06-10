import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
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
} from '../../components';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Pdp: undefined;
};

interface IPdpPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
}

export default class Home extends Component<IPdpPageProps> {
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
          <Category />
          <RecentProduct />
          <PopularProducts />
          <Collections />
          <Brands />
          <SubCatCard name="Electronics" img={subcat} />
          <SubCatCard name="Footwear" img={shoescat} />
          <SubCatCard name="Baby Care" img={babycat} />

          <Refer />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
