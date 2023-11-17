import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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

  const handlePlaceSelect = useCallback((data, details, inputType) => {
    const placeName = details.description;
    
    if (inputType === 'departure') {
      setDeparture(placeName);
    } else if (inputType === 'arrival') {
      setArrival(placeName);
    }

    showAlert();
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Chosen Locations',
      `Departure: ${departure}\nArrival: ${arrival}`
    );
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Departure"
        fetchDetails={true}
        onPress={(data, details) => {console.log('Departure:', data, details); handlePlaceSelect(data, details, 'departure')}}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:us',
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
        onPress={(data, details) => handlePlaceSelect(data, details, 'arrival')}
        query={{
          key: apiKey,
          language: 'en',
          components: 'country:us',
        }}
        styles={{
          container: [styles.inputContainer, styles.arrivalInputContainer],
          textInput: styles.input,
          listView: styles.suggestionList,
        }}
      />
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
