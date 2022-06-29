import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  topNav: {
    paddingLeft: 15,
    paddingRight: 15,
    padding: 10,
  },

  variantSelect: {
    padding: 18,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  variantSelectActive: {
    padding: 18,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#76BA99',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  variantSelectText: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 16,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartBtn: {
    padding: 14,
    backgroundColor: 'black',
    borderRadius: 12,
  },
});
