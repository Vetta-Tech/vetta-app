import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  TopProfileSection,
  ActionContainer,
  ProfileSectionContainer,
  SettingsItemIndivisal,
  TopCart,
  TopNavCheckout,
  LogoutModal,
  LogoLoading,
} from '../../components';
import {info, writemail, logout, report, arrow} from '../../constants/images';
import React, {Component} from 'react';

import {styles} from './styles';
import {styles as s} from '../../components/Profile/ProfileSection/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState} from '../../state/store';
import {connect} from 'react-redux';
import {resetStatus} from '../../state/actionCreatores/auth';

interface ProfileProps {
  navigation: any;
  resetStatus: any;
}

type Props = LinkStateToProps & ProfileProps;

class Profile extends Component<Props> {
  state = {
    showModal: false,
    isAuthenticated: null,
    loading: true,
  };

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        this.setState(
          {
            isAuthenticated: false,
            loading: false,
          },
          () => {
            this.props.navigation.push('AuthSelect', {
              redirectScreen: 'ProfileNew',
            });
          },
        );
      } else {
        this.setState({
          isAuthenticated: true,
          loading: false,
        });
      }
    });

    this.props.navigation.addListener('blur', async () => {
      this.setState({
        isAuthenticated: null,
      });
    });
  }

  setShow = () => {
    this.setState({
      showModal: false,
    });
  };

  handleLogout = async () => {
    console.log('logged out');
    await AsyncStorage.removeItem('token');
    this.setState(
      {
        showModal: false,
      },
      () => {
        this.props.resetStatus();
      },
    );
    this.props.navigation.replace('AuthSelect');
  };

  render() {
    return (
      <>
        {this.state.isAuthenticated === false ? (
          <Text>Error</Text>
        ) : (
          <>
            <ScrollView style={styles.container}>
              <View style={{marginBottom: 10}}>
                <TopNavCheckout
                  naviagtion={this.props.navigation}
                  name="Profile"
                />
              </View>
              <TopProfileSection />
              <ActionContainer navigation={this.props.navigation} />
              <ProfileSectionContainer navigation={this.props.navigation} />
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <SettingsItemIndivisal
                  navigation={this.props.navigation}
                  img={info}
                  title="About"
                  screen_name="AboutUs"
                />
                <SettingsItemIndivisal
                  navigation={this.props.navigation}
                  img={writemail}
                  title="send feedback"
                  screen_name="FeedBack"
                />
                <SettingsItemIndivisal
                  navigation={this.props.navigation}
                  img={report}
                  title="Rate us"
                  rate_url="https://play.google.com/store/apps/details?id=com.romexbd"
                  screen_name="AboutUs"
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      showModal: true,
                    })
                  }>
                  <View
                    style={[
                      s.itemListContainer,
                      {
                        backgroundColor: '#f2f2f2',
                        borderRadius: 12,
                        marginBottom: 10,
                      },
                    ]}>
                    <View style={s.leftContainer}>
                      <Image source={logout} style={s.img} />
                      <Text style={s.leftTxt}>Logout</Text>
                    </View>
                    <Image source={arrow} style={s.img} />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <LogoutModal
              setShow={this.setShow}
              handleLogout={this.handleLogout}
              showModal={this.state.showModal}
            />
          </>
        )}

        {this.state.loading && <LogoLoading />}
      </>
    );
  }
}

interface LinkStateToProps {
  isAuthenticated: boolean;
}
export default connect(null, {resetStatus})(Profile);
