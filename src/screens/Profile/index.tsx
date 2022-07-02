import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import {
  TopProfileSection,
  ActionContainer,
  ProfileSectionContainer,
  SettingsItemIndivisal,
  TopCart,
  TopNavCheckout,
} from '../../components';
import {info, writemail, logout, report} from '../../constants/images';

import {styles} from './styles';

interface ProfileProps {
  navigation: any;
}

const Profile = (props: ProfileProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{marginBottom: 10}}>
        <TopNavCheckout naviagtion={props.navigation} name="Profile" />
      </View>
      <TopProfileSection />
      <ActionContainer navigation={props.navigation} />
      <ProfileSectionContainer />
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}>
        <SettingsItemIndivisal
          navigation={props.navigation}
          img={info}
          title="About"
          screen_name="AboutUs"
        />
        <SettingsItemIndivisal
          navigation={props.navigation}
          img={writemail}
          title="send feedback"
          screen_name="FeedBack"
        />
        <SettingsItemIndivisal
          navigation={props.navigation}
          img={report}
          title="Rate us"
          screen_name="AboutUs"
        />
        <SettingsItemIndivisal
          navigation={props.navigation}
          img={logout}
          title="Logout"
          screen_name="AboutUs"
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
