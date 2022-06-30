import {connect} from 'react-redux';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {authCheckState} from './state/actionCreatores/auth';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import BottomTab from './naviagtions/tabs';
import {
  AuthSelect,
  Category,
  Details,
  Map,
  PhoneInputComp,
  ProductList,
  ProductListBrands,
  SplashScreen,
  FeaturedProducts,
  PopularProducts,
  BrandDeatils,
  AllBrands,
  Checkout,
  MapSearch,
  Cart,
  PaymentDone,
} from './screens';
import Search from './screens/Search';
import VerifyOtp from './screens/VerifyOtp';
import {RootState} from './state/store';
import {API_URL_IMAGE} from '@env';
import linking from './linking';
import Test2 from './screens/Test/Test2';
import Test1 from './screens/Test/Test1';

const Stack = createSharedElementStackNavigator();

interface CoreProps {
  onTryAutoSignUp: any;
  token: string | null;
}

const leftToRightAnimation = {
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

class Core extends Component<CoreProps, any> {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={'SplashScreen'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen
            name="AllBrands"
            options={() => ({
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            })}
            component={AllBrands}
          />

          <Stack.Screen
            options={leftToRightAnimation}
            name="FeaturedProducts"
            component={FeaturedProducts}
          />
          <Stack.Screen name="PopularProducts" component={PopularProducts} />
          <Stack.Screen
            name="BrandDeatils"
            component={BrandDeatils}
            sharedElements={(route, otherRoute, showing) => {
              const item = route.params;
              return [`item.${item.slug}.photo`];
            }}
            options={() => ({
              gestureEnabled: false,

              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {
                    opacity: progress,
                  },
                };
              },
            })}
          />

          <Stack.Screen name="Category" component={Category} />

          <Stack.Screen
            options={() => ({
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
            })}
            name="Checkout"
            component={Checkout}
          />
          <Stack.Screen
            options={() => ({
              cardStyleInterpolator:
                CardStyleInterpolators.forRevealFromBottomAndroid,
            })}
            name="Cart"
            component={Cart}
          />
          <Stack.Screen name="Payment" component={PaymentDone} />

          <Stack.Screen
            name="ProductListBrands"
            component={ProductListBrands}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={() => ({
              cardStyleInterpolator:
                CardStyleInterpolators.forBottomSheetAndroid,
            })}
            sharedElements={(route, otherRoute, showing) => {
              const item = route.params;
              return [`item.${item.slug}.photo`];
            }}
          />
          <Stack.Screen name="Home" component={BottomTab} />
          <Stack.Screen name="AuthSelect" component={AuthSelect} />
          <Stack.Screen
            options={() => ({
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            })}
            name="Map"
            component={Map}
          />
          <Stack.Screen name="MapSearch" component={MapSearch} />

          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="PhoneInputComp" component={PhoneInputComp} />
          <Stack.Screen
            name="VerifyOtp"
            options={leftToRightAnimation}
            component={VerifyOtp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: RootState) => {
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
