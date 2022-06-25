import {Text, StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';

interface IProps {
  isVisisble: boolean;
  closeErrorModal: any;
}

export default class ErrorModal extends Component<IProps> {
  render() {
    return (
      <View>
        <Modal
          onBackdropPress={() => this.props.closeErrorModal()}
          backdropOpacity={0.4}
          isVisible={this.props.isVisisble}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 12,
                  color: 'black',
                }}>
                It looks like you have turned off permissions required for this
                feature.It can be enabled under Phone Setting {'>'} Apps {'>'}{' '}
                Vetta {'>'} Permissions
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: '100%',
                  padding: 5,
                }}>
                <TouchableOpacity onPress={() => Linking.openSettings()}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 16,
                      color: 'black',
                      width: 100,
                      textAlign: 'center',
                    }}
                    numberOfLines={2}>
                    Go To Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 10,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
    height: 120,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
