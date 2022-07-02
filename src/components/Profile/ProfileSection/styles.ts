import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  headerTxt: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    fontSize: 16,
  },
  listcontainer: {},

  itemListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 8,
  },

  imgContainer: {
    padding: 6,
    borderRadius: 50,
  },
  img: {
    height: 20,
    width: 20,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 8,
  },
  leftTxt: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
    marginLeft: 10,
    textTransform: 'capitalize',
  },
});
