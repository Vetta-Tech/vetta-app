import {Text, StyleSheet, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

class Checkout extends Component {
  constructor(props: any) {
    super(props);
    this.bottomSheetRef = React.createRef();
  }

  componentDidMount() {
    this.bottomSheetRef.open();
  }

  render() {
    return (
      <View>
        <RBSheet
          ref={ref => {
            this.bottomSheetRef = ref;
          }}
          closeOnDragDown={false}
          //   dragFromTopOnly={true}
          height={Dimensions.get('window').height}
          openDuration={250}
          customStyles={{
            container: {
              borderTopStartRadius: 12,
              borderTopEndRadius: 12,
            },
          }}></RBSheet>
      </View>
    );
  }
}

export default Checkout;
const styles = StyleSheet.create({});
