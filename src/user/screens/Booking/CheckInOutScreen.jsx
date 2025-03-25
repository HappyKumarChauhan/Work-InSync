import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import { TextInput } from 'react-native-gesture-handler';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';

const CheckInOutScreen = ({ navigation,route }) => {
  const {property}=route.params;
  const { colors } = useContext(ThemeContext)
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [location, setLocation] = useState('');
  const [selectedTab, setSelectedTab] = useState('dates'); // Track selected tab

  const handleDateChange = (day) => {
    if (!selectedStartDate) {
      setSelectedStartDate(day.dateString);
    } else if (!selectedEndDate) {
      if (new Date(day.dateString) > new Date(selectedStartDate)) {
        setSelectedEndDate(day.dateString);
      } else {
        setSelectedStartDate(day.dateString);
        setSelectedEndDate('');
      }
    } else {
      setSelectedStartDate(day.dateString);
      setSelectedEndDate('');
    }
  };

  const handleGuestsChange = (action) => {
    if (action === 'increase') {
      setNumberOfGuests((prev) => prev + 1);
    } else if (action === 'decrease' && numberOfGuests > 1) {
      setNumberOfGuests((prev) => prev - 1);
    }
  };

  // Navigate to the DetailsScreen
  const handleBooking = () => {
    navigation.navigate('Details', {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      guests: numberOfGuests,
      property
    });
  };

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header Section */}
        <Header navigation={navigation} title="Select Dates" />
        <ScrollView style={styles.container}>

        {/* Location Section */}
        <View style={styles.locationSection}>
          <TextInput
            style={[styles.locationSearchBar, { backgroundColor: colors.secondaryBg }]}
            placeholder="Search for a location"
            placeholderTextColor={colors.secondaryColor}
            onChangeText={(text) => setLocation(text)}
            value={location}
          />
          <Icon name="search" size={20} color="#333" style={[styles.searchIcon, { color: colors.color }]} />
        </View>

        {/* Date Selector Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, { backgroundColor: colors.secondaryBg }, selectedTab === 'dates' && styles.activeTab]}
            onPress={() => setSelectedTab('dates')}
          >
            <Text style={[styles.tabText, { color: colors.color }]}>Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, { backgroundColor: colors.secondaryBg }, selectedTab === 'months' && styles.activeTab]}
            onPress={() => setSelectedTab('months')}
          >
            <Text style={[styles.tabText, { color: colors.color }]}>Months</Text>
          </TouchableOpacity>
        </View>

        {/* Conditional rendering of calendar */}
        {selectedTab === 'dates' ? (
          <View style={[styles.calendarContainer, { backgroundColor: colors.secondaryBg }]}>
            <Calendar
              onDayPress={handleDateChange}
              markedDates={{
                [selectedStartDate]: { selected: true, selectedColor: 'green', selectedTextColor: 'white' },
                [selectedEndDate]: { selected: true, selectedColor: 'red', selectedTextColor: 'white' },
              }}
              minDate={new Date().toISOString().split('T')[0]}
              theme={{
                textSectionTitleColor: colors.color,
                monthTextColor: colors.color,
                calendarBackground: colors.secondaryBg,
                arrowColor: colors.color,
                dayTextColor: colors.color,
                textDisabledColor: colors.secondaryColor,
                todayTextColor: colors.linkColor,
                todayBackgroundColor: 'gray',
                selectedDayBackgroundColor: 'green',
                selectedDayTextColor: 'white',
              }}
            />
          </View>
        ) : (
          <View style={[styles.calendarContainer, { backgroundColor: colors.secondaryBg }]}>
            <Calendar
              monthFormat={'yyyy MM'}
              onMonthChange={(month) => console.log('month changed', month)}
              theme={{
                textSectionTitleColor: colors.color,
                calendarBackground: colors.secondaryBg,
                monthTextColor: colors.color,
                arrowColor: colors.color,
                dayTextColor: colors.color,
                textDisabledColor: colors.secondaryColor,
                todayTextColor: colors.linkColor,
                selectedDayBackgroundColor: 'green',
                selectedDayTextColor: 'white',
              }}
            />
          </View>
        )}

        {/* Check-in/Check-out Section */}
        <View style={styles.dateSummaryContainer}>
          <View style={styles.dateSummaryItem}>
            <Text style={[styles.dateLabel, { color: colors.color }]}>Check In</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.dateValue, { color: colors.secondaryColor }]}>{selectedStartDate || 'Select Date'}</Text>
              <Icon name="calendar-month" size={20} color="white" style={styles.arrowIcon} />
            </View>
          </View>
          <Icon name="arrow-forward" size={30} color="white" style={styles.arrowIcon} />
          <View style={styles.dateSummaryItem}>
            <Text style={[styles.dateLabel, { color: colors.color }]}>Check Out</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.dateValue, { color: colors.secondaryColor }]}>{selectedEndDate || 'Select Date'}</Text>
              <Icon name="calendar-month" size={20} color="white" style={styles.arrowIcon} />
            </View>
          </View>
        </View>

        {/* Number of Guests Section */}
        <View style={styles.guestSelector}>
          <Text style={[styles.guestLabel, { color: colors.color }]}>Number of Guests</Text>
          <View style={styles.guestControls}>
            <TouchableOpacity onPress={() => handleGuestsChange('decrease')} disabled={numberOfGuests == 1} style={[styles.guestButton, { backgroundColor: colors.secondaryBg }]}>
              <Icon name="remove" size={24} color={colors.color} />
            </TouchableOpacity>
            <Text style={[styles.guestCount, { color: colors.color }]}>{numberOfGuests}</Text>
            <TouchableOpacity onPress={() => handleGuestsChange('increase')} style={[styles.guestButton, { backgroundColor: colors.secondaryBg }]}>
              <Icon name="add" size={24} color={colors.color} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={[styles.bookButton, { backgroundColor: colors.buttonBg }]} onPress={handleBooking}>
          <Text style={[styles.bookButtonText, { color: colors.buttonText }]}>Book Now</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationSection: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationSearchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 10,
    fontSize: 16,
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  activeTab: {
    backgroundColor: 'gray',
    borderBottomColor: 'black',  // Background color for active tab
    borderBottomWidth: 1,
    width: 'auto',
  },
  tabText: {
    fontSize: 16,
    color: '#052659',
  },
  calendarContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  dateSummaryItem: {
    borderBottomColor: 'white',
    paddingBottom: 5,
    borderBottomWidth: 0.5,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#052659',
  },
  dateValue: {
    fontSize: 16,
    color: '#999',

  },
  arrowIcon: {
    marginHorizontal: 10,
    padding: 1,
    borderRadius: 40,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#000',
  },
  guestSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guestLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#052659',
    flex: 1,
  },
  guestControls: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  guestButton: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    // marginHorizontal: 10,
    // borderWidth: 2,
    borderColor: '#000',
    // Adding shadow and elevation similar to top icons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  guestCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#052659',
    marginHorizontal: 10,
  },
  bookButton: {
    backgroundColor: 'black',
    marginHorizontal: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: 190,
    height: 50,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckInOutScreen;
