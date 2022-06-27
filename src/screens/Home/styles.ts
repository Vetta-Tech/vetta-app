import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  spinnerView: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  },
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
