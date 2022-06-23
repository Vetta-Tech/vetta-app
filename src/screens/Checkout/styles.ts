import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  phoneTop: {
    marginTop: 30,
  },
  headingText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginBottom: 15,
    color: 'black',
  },
  searchBar__unclicked: {
    padding: 6,
    flexDirection: 'row',
    // width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    alignItems: 'center',
  },
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
});
