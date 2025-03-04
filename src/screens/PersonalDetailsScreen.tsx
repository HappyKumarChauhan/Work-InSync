import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ThemeContext from '../theme/ThemeContext';
import Header from '../components/Header';
import FormContainer from '../components/personal-details/FormContainer'

const PersonalDetailsScreen = ({ navigation }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Custom Header */}
      <Header title="Personal Details" navigation={navigation} />
      <FormContainer navigation={navigation}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PersonalDetailsScreen;