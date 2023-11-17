import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';

const MapComponent = () => {
  const [pin, setPin] = useState({
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
    // Request location permission when the component mounts
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

  const handleDragStart = useCallback((e) => {
    console.log('Drag start', e.nativeEvent.coordinate);
  }, []);

  const handleDragEnd = useCallback((e) => {
    setPin({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  }, []);

  return (
    <View style={{ marginTop: 0, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Callout>
            <Text>My location</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} />
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
