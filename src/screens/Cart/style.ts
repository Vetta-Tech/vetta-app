import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },

  containerBody: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  cartInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  containerSummary: {
    borderRadius: 120,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});
