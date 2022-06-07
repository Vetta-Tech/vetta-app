import {Text, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React, {Component} from 'react';

import Appstyle from '../../constants/AppStyles';

import {TopBar, Search} from '../../components';

export default class Home extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={Appstyle.container}>
          <TopBar />
          <Search />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
