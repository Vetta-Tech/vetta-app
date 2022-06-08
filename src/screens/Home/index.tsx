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

import {
  TopBar,
  Search,
  TopImage,
  Category,
  RecentProduct,
  PopularProducts,
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
        <ScrollView style={[Appstyle.container, {flex: 1}]}>
          <TopBar
            name="VETTA store"
            address="Rd.111 , Uttara"
            navigation={this.props.navigation}
          />
          <Search navigation={this.props.navigation} />
          <TopImage />
          <Category />
          <RecentProduct />
          <PopularProducts />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
