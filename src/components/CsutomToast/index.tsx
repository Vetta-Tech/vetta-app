import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Lottiview from 'lottie-react-native';

interface IProps {
  text1: string;
  props: any;
}

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      style={{
        borderColor: 'black',
        backgroundColor: '#f2f2f2',
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),

  customSuccess: ({text1, props}: IProps) => (
    <View style={styles.customSuccessContainer}>
      <View>
        <Lottiview
          source={require('./94091-tick.json')}
          autoPlay={true}
          loop={false}
          style={{
            height: 50,
          }}
        />
      </View>
      <Text numberOfLines={2} style={styles.successText}>
        {text1}
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  customSuccessContainer: {
    flex: 1,
    height: 60,
    width: '90%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 5,
    borderLeftColor: 'green',
    borderLeftWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  successText: {
    fontFamily: 'Montserrat-Medium',
  },
});
