// import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
// import FloatingForm from './src/components/FloatingForm';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* Add more screens as needed */}
       </Tab.Navigator> 
    </NavigationContainer>
  );
};
export default App;

// import * as React from "react"
// import { Dimensions, StyleSheet, Text, View } from "react-native"
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
// import MapView, { Callout, Circle, Marker } from "react-native-maps"
// import MapComponent from "./src/components/MapComponent"
// import FloatingForm from "./src/components/FloatingForm"

// export default function App() {
	

// 	return (
// 		// <View style={{ marginTop: 50, flex: 1 }}>
//     <NavigationContainer>
//         <Tab.Navigator>
//        <Tab.Screen name="Home" component={HomeScreen} />
//          {/* Add more screens as needed */}
//         <View style={styles.container}>

//           <FloatingForm />
          
//           <MapComponent/>
          
//         </View>
//       </Tab.Navigator> 
//     </NavigationContainer>
// 	)
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
//     marginTop: 50
// 	},
	
// })