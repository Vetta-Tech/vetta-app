import {connect} from 'react-redux';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {authCheckState} from './store/actions';

import BottomTab from './naviagtions/tabs';
import {AuthSelect, Details, Map, PhoneInputComp, Splash} from './screens';
import Search from './screens/Search';
import VerifyOtp from './screens/VerifyOtp';
import {State} from './store/reducers';

const Stack = createStackNavigator();

interface CoreProps {
  onTryAutoSignUp: any;
  token: string | null;
}

class Core extends Component<CoreProps, any> {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    console.log('token is core', this.props.token);

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="AuthSelect" component={AuthSelect} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="PhoneInputComp" component={PhoneInputComp} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    loading: state.auth.loading,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Core);