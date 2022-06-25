import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';

interface PaymentMethodSelectProps {
  title: string;
  logoSrc: any;
  active: boolean;
}

export default class PaymentMethodSelect extends Component<PaymentMethodSelectProps> {
  render() {
    const {title, logoSrc, active} = this.props;
    return (
      <View
        style={
          active
            ? [styles.constainer, {borderWidth: 1, borderColor: 'gray'}]
            : styles.constainer
        }>
        <View style={styles.imgContainer}>
          <View>
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={{
                uri: logoSrc,
              }}
            />
          </View>
          <View>
            <Text
              style={
                active
                  ? [
                      styles.titletext,
                      {color: 'black', fontFamily: 'Montserrat-Bold'},
                    ]
                  : styles.titletext
              }>
              {title}
            </Text>
          </View>
        </View>
        <View>
          {active && (
            <Image
              source={{
                uri: 'https://cosmetica-prod.s3.ap-south-1.amazonaws.com/media/products/2022/radio-on-button.png',
              }}
              style={{
                height: 20,
                width: 20,
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,

    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  titletext: {
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
    fontSize: 14,
  },
});
