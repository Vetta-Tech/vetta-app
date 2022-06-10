import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {
  PopularCurationsCard,
  PopularSearchCard,
  TopBar,
} from '../../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppStyles from '../../constants/AppStyles';
import {categoryData} from '../../constants/dummydata';

type RootStackParamList = {
  Pdp: undefined;
};

interface IPdpPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pdp'>;
}

export default class Search extends Component<IPdpPageProps> {
  renderItem = () => {
    return (
      <TouchableOpacity>
        <View style={{paddingRight: 10, paddingTop: 10}}>
          <Image
            source={require('../../../assets/1.png')}
            style={{borderRadius: 15, width: 100, height: 100}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Montserrat-Medium',
              color: 'black',
              width: 100,
              margin: 'auto',
              justifyContent: 'center',
            }}>
            Text Here
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderWhatSNew = () => {
    return (
      <TouchableOpacity>
        <View style={{paddingRight: 10, paddingTop: 10}}>
          <Image
            source={require('../../../assets/1.jpg')}
            style={{borderRadius: 0, width: 160, height: 200}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
          }}>
          <Text style={{color: 'black', fontFamily: 'Montserrat-Medium'}}>
            ₹899
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              fontFamily: 'Montserrat-Light',
              color: '#DFDFDE',
            }}>
            ₹999
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderTrending = () => {
    return (
      <TouchableOpacity>
        <View style={{paddingRight: 10, paddingTop: 10}}>
          <Image
            source={require('../../../assets/3.jpg')}
            style={{borderRadius: 0, width: 160, height: 200}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
          }}>
          <Text style={{color: 'black', fontFamily: 'Montserrat-Medium'}}>
            ₹899
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              fontFamily: 'Montserrat-Light',
              color: '#DFDFDE',
            }}>
            ₹999
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

          <View style={{marginTop: 15}}>
            <View style={styles.searchBar__unclicked}>
              <EvilIcons
                name="search"
                size={30}
                color="black"
                style={{marginLeft: 1}}
              />

              <TextInput
                style={styles.searchBar__unclicked}
                placeholder="Search the VETTA store"
                onChange={() => console.log('clicked')}
              />
            </View>
          </View>
        </View>
        <ScrollView style={[AppStyles.container, {backgroundColor: 'white'}]}>
          <View style={{marginTop: 0}}>
            <Text style={styles.headline}>Popular Searched</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <PopularSearchCard name="T-Shirts" />
              <PopularSearchCard name="Shorts" />
              <PopularSearchCard name="Shirts" />
              <PopularSearchCard name="Anime" />
              <PopularSearchCard name="Buy 2 at 599" />
              <PopularSearchCard name="Shoes" />
              <PopularSearchCard name="Shoes" />
              <PopularSearchCard name="Bags" />
              <PopularSearchCard name="Marvel" />
              <PopularSearchCard name="Sliders" />
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={styles.headline}>Popular Curations</Text>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 0}}>
              <FlatList
                scrollEnabled={false}
                contentContainerStyle={{
                  alignSelf: 'flex-start',
                }}
                numColumns={categoryData.length / 2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={categoryData}
                renderItem={this.renderItem}
              />
            </ScrollView>
          </View>
          <View style={{marginTop: 25}}>
            <Text style={styles.headline}>What's New</Text>
            <View>
              <FlatList
                horizontal
                data={categoryData}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderWhatSNew}
                contentContainerStyle={{paddingVertical: 4}}
              />
            </View>
          </View>
          <View style={{marginTop: 25, marginBottom: 25}}>
            <Text style={styles.headline}>Trending</Text>
            <View>
              <FlatList
                horizontal
                data={categoryData}
                showsHorizontalScrollIndicator={false}
                renderItem={this.renderTrending}
                contentContainerStyle={{paddingVertical: 4}}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    alignItems: 'center',
  },
  search_icon: {
    position: 'absolute',
    top: 10,
    width: '10%',
    padding: 1,
  },
  headline: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
});
