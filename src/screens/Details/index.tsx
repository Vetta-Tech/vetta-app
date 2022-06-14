import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {Component} from 'react';
import {HoriLine, NameSection, TopNavDetails} from '../../components';
import {detailsImg} from '../../constants/images';

interface DetailsProps {
  navigation: any;
}

interface DetailsState {}

const windowHeight = Dimensions.get('window').height;

class Details extends Component<DetailsProps, DetailsState> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <TopNavDetails
            navigation={this.props.navigation}
            icon="chevron-left"
            shareIcon="share-apple"
          />
          <View>
            <Image
              source={detailsImg}
              resizeMode="cover"
              style={{
                height: windowHeight / 2.5,
                width: '100%',
                padding: 0,
                marginBottom: 0,
              }}
            />
          </View>
        </View>
        <View style={styles.detailsStyle}>
          <NameSection />
        </View>
        <HoriLine />
        <View></View>
      </View>
    );
  }
}

export default Details;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20,
    padding: 10,
    backgroundColor: 'white',
  },
  imgContainer: {
    backgroundColor: '#ededed',
    padding: 10,
    borderRadius: 12,
  },
  detailsStyle: {
    padding: 10,
  },
});
