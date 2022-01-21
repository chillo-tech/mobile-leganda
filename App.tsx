import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import ApplicationContextProvider from './app/context/ApplicationContextProvider';
import RootStack from './app/stacks/RootStack';
import { AUTHENTICATED_USER } from './app/utils';

export default function App() {
	useEffect(() => {
		(async () => {
			let {status} = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert(
					'Permettez nous de vous localiser',
					`[${status}] Cliquez que OK pour permettre votre localisation.`,
					[{text: 'OK'}],
					{cancelable: false}
				);
			}

			const {coords} = await Location.getCurrentPositionAsync({accuracy: 6});
			if (coords) {
				const {latitude, longitude} = coords;
				const response = await Location.reverseGeocodeAsync({latitude, longitude});
				for (let item of response) {
					const selectedLocation = {
						street: item.city,
						location: {
							coordinates: [longitude, latitude],
							type: "Point"
						}
					}
					await AsyncStorage.setItem(AUTHENTICATED_USER, JSON.stringify({...selectedLocation}));
				}
			}
		})();
	}, []);
	return (
		<NavigationContainer>
			<ApplicationContextProvider>
				<RootStack/>
			</ApplicationContextProvider>
		</NavigationContainer>
	);
}
