import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/EvilIcons';

interface MapBottomSheetProps {
  myRef: any;
  adressRef: any;
  onPressClear: any;
  navigation: {
    navigate: any;
  };
  handleUserLocation: any;
  navigatePage: string;
}

export default class MapBottomSheet extends Component<MapBottomSheetProps> {
  render() {
    return (
      <RBSheet
        ref={this.props.myRef}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        height={Dimensions.get('window').height - 100}
        openDuration={250}
        customStyles={{
          container: {
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
          },
        }}>
        <View
          style={{
            padding: 15,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: 'black',
              marginBottom: 10,
              fontSize: 18,
            }}>
            Select Address
          </Text>

          <GooglePlacesAutocomplete
            ref={this.props.adressRef}
            styles={{
              container: {
                flex: 0,
                borderRadius: 12,
              },

              textInputContainer: {
                backgroundColor: '#f2f2f2',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
                paddingLeft: 5,
                paddingRight: 5,
              },

              textInput: {
                flexDirection: 'row',
                borderColor: '#f2f2f2',
                backgroundColor: '#f2f2f2',
                borderRadius: 10,
                color: '#5d5d5d',
                borderWidth: 1,
                width: 200,
              },
              row: {
                backgroundColor: '#FFFFFF',
                padding: 13,
                height: 55,
                flexDirection: 'row',
                fontFamily: 'Montserrat-SemiBold',
              },
              listView: {
                padding: 5,
              },
            }}
            renderRow={results => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="location" size={20} />
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Montserrat-Medium',
                      color: 'black',
                    }}>
                    {results.structured_formatting.secondary_text}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 12,
                    }}>
                    {results.description}
                  </Text>
                </View>
              </View>
            )}
            renderLeftButton={() => (
              <View>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../../assets/search1.png')}
                />
              </View>
            )}
            renderRightButton={() => (
              <TouchableOpacity onPress={() => this.props.onPressClear()}>
                <View>
                  <Image
                    style={{
                      paddingRight: 5,
                      height: 20,
                      width: 30,
                      padding: 15,
                      alignSelf: 'center',
                    }}
                    source={require('../../../assets/icons8-cross-96.png')}
                  />
                </View>
              </TouchableOpacity>
            )}
            enablePoweredByContainer={false}
            onPress={(data: any, details: any = null) => {
              this.props.navigation.navigate('Map', {
                lat: details?.geometry?.location.lat,
                lng: details?.geometry?.location.lng,
                navigatePage: this.props.navigatePage,
              });
            }}
            placeholder="Search address"
            onFail={error => console.error(error)}
            query={{
              key: 'AIzaSyAU0NABrARW4CkWHoItDHuNtARlRoiRalg',
              language: 'en', // language of the results
              components: 'country:bd',
            }}
            fetchDetails={true}
          />

          <TouchableOpacity onPress={() => this.props.handleUserLocation()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/target.png')}
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    fontFamily: 'Montserrat-SemiBold',
                    color: 'black',
                  }}>
                  Use Current Location
                </Text>
              </View>
              <View>
                <Image
                  source={require('../../../assets/icon/arrow.png')}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  }
}

const styles = StyleSheet.create({});
