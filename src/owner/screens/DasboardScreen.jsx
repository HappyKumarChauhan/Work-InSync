import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import Card from '../components/Card';
import CardTwo from '../components/CardTwo';
import ThemeContext from '../../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from '../../config/axios'
import LoadingModal from '../../components/LoadingModal'

const DashboardScreen = ({navigation}) => {
  const {colors} = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [myProperties, setMyProperties] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProperties=async()=>{
    setLoading(true)
    try{
      const response=await axios.get('properties/my-properties')
      setMyProperties(response.data)
      console.log(response.data)
    }catch(error){
      console.log(error)
      Alert.alert('Something went wrong', error.response?.data?.message || 'Something went wrong.');
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProperties()
  }, [])
  

  const upcomingData = [
    {id: '1', title: 'Bengaluru Brigade', desk: 'BM-8F-WS-26-2nd Floor'},
    {id: '2', title: 'Bengaluru Brigade', desk: 'BM-8F-WS-26-2nd Floor'},
    {id: '3', title: 'Bengaluru Brigade', desk: 'BM-8F-WS-26-2nd Floor'},
    {id: '4', title: 'Bengaluru Brigade', desk: 'BM-8F-WS-26-2nd Floor'},
  ];

  if (!myProperties) return (<LoadingModal message="Fetching Properties..." visible={loading} />)

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={[styles.iconButton, {backgroundColor: colors.secondaryBg}]}
        >
          <Icon name="menu" size={30} color={colors.color} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.color}]}>
          Dashboard
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={[styles.iconButton, {backgroundColor: colors.secondaryBg}]}
        >
          <Icon name="notifications" size={30} color={colors.color} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Upcoming' && {
              borderBottomColor: colors.color,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('Upcoming')}
        >
          <Text style={[styles.tabText, {color: colors.color}]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'My List' && {
              borderBottomColor: colors.color,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('My List')}
        >
          <Text style={[styles.tabText, {color: colors.color}]}>My List</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'Upcoming' ? upcomingData : myProperties}
        keyExtractor={item => item._id}
        renderItem={({item}) =>
          activeTab === 'Upcoming' ? (
            <Card title={item.title} desk={item.desk} />
          ) : (
            <CardTwo key={item._id} data={item} />
          )
        }
        contentContainerStyle={{padding: 10}}
      />
      <TouchableOpacity
        style={[
          styles.addPropertyButton,
          {backgroundColor: colors.cardBgColors[0]},
        ]}
        onPress={()=>{navigation.navigate('PropertyDetails')}}
      >
        <Icon name="add" color="#ffffff" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginTop: 25,
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: Platform.OS === 'ios' ? 40 : 20, // Adjust margin for iOS
    backgroundColor: 'white',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
  },
  addPropertyButton: {
    backgroundColor: 'rgba(12, 25, 34, 1)',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default DashboardScreen;