import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ThemeContext from '../theme/ThemeContext';

const LoadingModal = ({ visible, message = 'Loading...' }) => {
  const { colors } = React.useContext(ThemeContext);
  
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.message, { color: colors.color }]}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoadingModal;