import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    padding: 10,
  },
  profileTopContainer: {
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  profileName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: 'black',
  },
  profileEmail: {
    fontFamily: 'Montserrat-Medium',
  },
});
