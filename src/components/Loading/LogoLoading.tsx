import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const LogoLoading = () => {
  return (
    <AnimatedLottieView
      style={{
        flex: 1,
        backgroundColor: 'rgba(230, 228, 228, 0.5)',
      }}
      autoPlay={true}
      source={require('../../../assets/lottie/24663-loading-logo.json')}
    />
  );
};

export default LogoLoading;

const styles = StyleSheet.create({});
