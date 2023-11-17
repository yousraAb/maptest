import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';

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
    requestLocationPermission();
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleDragEnd = useCallback(
    (e, locationType) => {
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

  const showAlert = () => {
    Alert.alert(
      'Chosen Locations',
      `Departure: ${departure.latitude}, ${departure.longitude}\nArrival: ${arrival.latitude}, ${arrival.longitude}`
    );
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
