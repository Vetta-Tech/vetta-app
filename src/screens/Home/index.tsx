import {Text, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React, {Component} from 'react';

import Appstyle from '../../constants/AppStyles';

import {TopBar, Search, TopImage} from '../../components';

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
        <SafeAreaView style={Appstyle.container}>
          <TopBar navigation={this.props.navigation!} />
          <Search />
          <TopImage />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
