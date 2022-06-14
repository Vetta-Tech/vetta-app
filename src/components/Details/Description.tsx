import {Text, StyleSheet, View, Pressable} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class Description extends Component {
  state = {
    showDescription: false,
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: '#ededed',
          padding: 10,
          borderRadius: 12,
        }}>
        <Pressable
          onPress={() =>
            this.setState({
              showDescription: !this.state.showDescription,
            })
          }>
          <View
            style={[
              styles.detailsStyle,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: 'black',
              }}>
              Description
            </Text>
            <Icon
              name={`${
                this.state.showDescription ? 'chevron-up' : 'chevron-down'
              }`}
              size={35}
              color="black"
            />
          </View>
          {this.state.showDescription ? (
            <View
              style={{
                padding: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                }}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Similique iure recusandae perspiciatis atque eius quasi natus,
                aperiam quidem placeat id, aliquam dolorum mollitia repellat!
                Provident id culpa minima recusandae sequi.
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailsStyle: {
    padding: 10,
  },
});
