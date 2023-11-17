import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

const MapComponent = () => {
  const [departure, setDeparture] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [arrival, setArrival] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    Geocoder.init('AIzaSyBvWMRC1y9vyGNtNMVvVAnakhNFYr5qsGc');
  }, []);

  const handleDragEnd = useCallback(
    async (e, locationType) => {
      const newLocation = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };

      if (locationType === 'departure') {
        setDeparture(newLocation);
      } else if (locationType === 'arrival') {
        setArrival(newLocation);
      }

      showAlert();
    },
    [setDeparture, setArrival]
  );

  const handleMapPress = useCallback(
    (e) => {
      setArrival({
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      });

      showAlert();
    },
    [setArrival]
  );

  const showAlert = async () => {
    try {
      const [departureName, arrivalName] = await Promise.all([
        getPlaceName(departure.latitude, departure.longitude),
        getPlaceName(arrival.latitude, arrival.longitude),
      ]);

      Alert.alert(
        'Chosen Locations',
        `Departure: ${departureName}\nArrival: ${arrivalName}`
      );
    } catch (error) {
      console.error('Error fetching place names:', error);
    }
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      return address;
    } catch (error) {
      console.error('Error fetching place name:', error);
      return 'Unknown Place';
    }
  };

  return (
    <View style={{ marginTop: 0, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={(e) => handleMapPress(e)}
      >
        <Marker
          coordinate={departure}
          pinColor="blue"
          draggable={true}
          onDragEnd={(e) => handleDragEnd(e, 'departure')}
        >
          <Callout>
            <Text>Departure</Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={arrival}
          pinColor="red"
          draggable={true}
          onDragEnd={(e) => handleDragEnd(e, 'arrival')}
        >
          <Callout>
            <Text>Arrival</Text>
          </Callout>
        </Marker>

        <Circle center={arrival} radius={1000} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapComponent;
