import React from 'react';
import { View, StyleSheet } from 'react-native';
import FloatingForm from '../components/FloatingForm';
import MapComponent from '../components/MapComponent';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapComponent />
      <FloatingForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
