import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  actionContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actionCard: {
    backgroundColor: '#f2f2f2',
    height: 80,
    width: Dimensions.get('window').width / 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  icon: {
    height: 28,
    width: 28,
  },
  actionCardText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginTop: 6,
    color: 'black',
    textTransform: 'capitalize',
  },
});
