import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CalendarList} from 'react-native-calendars';
import ThemeContext from '../../../theme/ThemeContext';
import Header from '../../../components/Header';
import axios from '../../../config/axios';
import LoadingModal from '../../../components/LoadingModal';

const CheckInOutScreen = ({navigation, route}) => {
  const {property} = route.params;
  const {colors} = useContext(ThemeContext);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = day => {
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

  const handleGuestsChange = action => {
    if (action === 'increase') {
      setNumberOfGuests(prev => prev + 1);
    } else if (action === 'decrease' && numberOfGuests > 1) {
      setNumberOfGuests(prev => prev - 1);
    }
  };

  const handleBooking = async () => {
    if (!selectedStartDate || !selectedEndDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('/booking/check-availability', {
        propertyId: property._id,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });

      if (!response.data.available) {
        alert('Selected dates are not available. Please choose different dates.');
        return;
      }
    } catch (error) {
      console.log(error.response);
      alert('Failed to check availability. Please try again.');
      return;
    }finally{
      setLoading(false);
    }
    navigation.navigate('Details', {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      guests: numberOfGuests,
      property,
    });
  };

  const getMarkedDates = () => {
    let markedDates = {};

    if (selectedStartDate) {
      markedDates[selectedStartDate] = {
        startingDay: true,
        color: 'green',
        textColor: 'white',
      };
    }

    if (selectedEndDate) {
      markedDates[selectedEndDate] = {
        endingDay: true,
        color: 'red',
        textColor: 'white',
      };
    }

    if (selectedStartDate && selectedEndDate) {
      let start = new Date(selectedStartDate);
      let end = new Date(selectedEndDate);
      let current = new Date(start);

      while (current < end) {
        let dateString = current.toISOString().split('T')[0];
        if (
          dateString !== selectedStartDate &&
          dateString !== selectedEndDate
        ) {
          markedDates[dateString] = {color: 'gray', textColor: 'white'};
        }
        current.setDate(current.getDate() + 1);
      }
    }

    return markedDates;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header navigation={navigation} title="Select Dates" />
      {/* Location Search */}
      <View style={styles.locationSection}>
        <TextInput
          style={[
            styles.locationSearchBar,
            {backgroundColor: colors.secondaryBg},
          ]}
          placeholder="Search for a location"
          placeholderTextColor={colors.secondaryColor}
          onChangeText={text => setLocation(text)}
          value={location}
        />
        <Icon
          name="search"
          size={20}
          style={[styles.searchIcon, {color: colors.color}]}
        />
      </View>

      {/* Calendar (Vertically Scrollable by Default) */}
      <View
        style={[
          styles.calendarContainer,
          {backgroundColor: colors.secondaryBg},
        ]}>
        <CalendarList
          onDayPress={handleDateChange}
          markingType={'period'}
          markedDates={getMarkedDates()}
          pastScrollRange={0} // Disable scrolling to past months
          futureScrollRange={12} // Allow scrolling up to 12 months ahead
          minDate={new Date().toISOString().split('T')[0]}
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
          horizontal={false}
        />
      </View>

      {/* Check-in/Check-out Section */}
      <View style={styles.dateSummaryContainer}>
        <View style={styles.dateSummaryItem}>
          <Text style={[styles.dateLabel, {color: colors.color}]}>
            Check In
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.dateValue, {color: colors.secondaryColor}]}>
              {selectedStartDate || 'Select Date'}
            </Text>
            <Icon
              name="calendar-month"
              size={20}
              color="white"
              style={styles.arrowIcon}
            />
          </View>
        </View>
        <Icon
          name="arrow-forward"
          size={30}
          color="white"
          style={styles.arrowIcon}
        />
        <View style={styles.dateSummaryItem}>
          <Text style={[styles.dateLabel, {color: colors.color}]}>
            Check Out
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.dateValue, {color: colors.secondaryColor}]}>
              {selectedEndDate || 'Select Date'}
            </Text>
            <Icon
              name="calendar-month"
              size={20}
              color="white"
              style={styles.arrowIcon}
            />
          </View>
        </View>
      </View>

      {/* Number of Guests Section */}
      <View style={styles.guestSelector}>
        <Text style={[styles.guestLabel, {color: colors.color}]}>
          Number of Guests
        </Text>
        <View style={styles.guestControls}>
          <TouchableOpacity
            onPress={() => handleGuestsChange('decrease')}
            disabled={numberOfGuests == 1}
            style={[styles.guestButton, {backgroundColor: colors.secondaryBg}]}>
            <Icon name="remove" size={24} color={colors.color} />
          </TouchableOpacity>
          <Text style={[styles.guestCount, {color: colors.color}]}>
            {numberOfGuests}
          </Text>
          <TouchableOpacity
            onPress={() => handleGuestsChange('increase')}
            style={[styles.guestButton, {backgroundColor: colors.secondaryBg}]}>
            <Icon name="add" size={24} color={colors.color} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        style={[styles.bookButton, {backgroundColor: colors.buttonBg}]}
        onPress={handleBooking}>
        <Text style={[styles.bookButtonText, {color: colors.buttonText}]}>
          Book Now
        </Text>
      </TouchableOpacity>
      <LoadingModal message="" visible={loading} />
    </KeyboardAvoidingView>
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
    borderRadius: 20,
    paddingLeft: 40,
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
  },
  calendarContainer: {
    flex: 1,
    marginVertical: 20,
    borderRadius: 10,
    padding: 10,
  },
  dateSummaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
    shadowOffset: {width: 0, height: 2},
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
