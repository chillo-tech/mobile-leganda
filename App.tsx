import {NavigationContainer} from '@react-navigation/native';
import * as Location from 'expo-location';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import ApplicationContextProvider from './app/context/ApplicationContextProvider';
import RootStack from './app/stacks/RootStack';
import SecurityContextProvider from './app/context/SecurityContextProvider';

import { SafeAreaProvider } from 'react-native-safe-area-context';
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
		})();
	}, []);
	return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ApplicationContextProvider>
          <SecurityContextProvider>
            <RootStack/>
          </SecurityContextProvider>
        </ApplicationContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
	);
}
