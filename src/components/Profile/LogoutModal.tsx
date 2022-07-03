import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';

type Props = {
  showModal: boolean;
  setShow: any;
  handleLogout: any;
};

export default class LogoutModal extends Component<Props> {
  render() {
    return (
      <Modal
        onBackdropPress={this.props.setShow}
        isVisible={this.props.showModal}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: 90,
              backgroundColor: '#f2f2f2',
              borderRadius: 12,
              padding: 15,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
              }}>
              Are you sure want to logout?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 18,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={this.props.setShow}>
                <View
                  style={{
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                    }}>
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.handleLogout}>
                <View
                  style={{
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'red',
                    }}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
