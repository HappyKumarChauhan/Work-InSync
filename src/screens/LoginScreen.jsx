import React, {  useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Main from '../components/login/Main'
import { UserContext } from '../context/UserContext';

const LogInScreen = ({ navigation }) => {
  const {user}=useContext(UserContext)
  useEffect(() => {
    if(user){
      navigation.replace('Dashboard')
    }
  }, [])
  

  return (
    <ImageBackground
            source={{ uri: 'https://cdn.decoist.com/wp-content/uploads/2015/08/Upholstered-daybed-for-the-contemporary-home-office.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{ backgroundColor: 'gray', borderRadius: 5, marginRight: 5 }}>
                        <Icon name='keyboard-double-arrow-right' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <Main navigation={navigation}/>
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
    justifyContent: 'space-between',
    backgroundColor: 'rgba(12, 25, 34, 0.6)',
  },
});

export default LogInScreen;