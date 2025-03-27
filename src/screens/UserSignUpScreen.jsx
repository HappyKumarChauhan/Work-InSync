import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Main from '../components/signup/Main';

const UserSignUpScreen = ({navigation, route}) => {
  const {role} = route.params;
  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg',
      }}
      style={styles.background}>
      <View style={styles.overlay}>
        <Main role={role}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(12, 25, 34, 0.6)',
  },
});

export default UserSignUpScreen;
