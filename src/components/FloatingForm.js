import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

const apiKey = "AIzaSyBvWMRC1y9vyGNtNMVvVAnakhNFYr5qsGc";

const FloatingForm = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
        // Handle denied permission (e.g., show an error message to the user)
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Departure"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('Departure:', data, details);
          setDeparture(data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:us',
          // types: 'establishment',
        }}
        styles={{
          container: styles.inputContainer,
          textInput: styles.input,
          listView: styles.suggestionList,
        }}
      />

      <GooglePlacesAutocomplete
        placeholder="Arrival"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('Arrival:', data, details);
          setArrival(data.description);
        }}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:us',
          // types: 'establishment',
        }}
        styles={{
          container: [styles.inputContainer, styles.arrivalInputContainer],
          textInput: styles.input,
          listView: styles.suggestionList,
        }}
      />

      {/* Add your search button or other UI elements here */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flex: 0,
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  arrivalInputContainer: {
    top: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  suggestionList: {
    backgroundColor: 'white',
    zIndex: 2, 
  },
});

export default FloatingForm;
