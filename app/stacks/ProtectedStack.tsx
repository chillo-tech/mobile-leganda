import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AdDetail from '../screens/protected/ads/AdDetail';
import AdUpdate from '../screens/protected/ads/AdUpdate';
import NavigationScreen from '../screens/protected/tabs/NavigationScreen';
import LocationSearchScreen from '../screens/shared/LocationSearchScreen';

function ProtectedStack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name="ads" component={NavigationScreen} options={{headerShown: false}}/>
			<Stack.Screen name="ad-detail" component={AdDetail}/>
			<Stack.Screen name="ad-update" component={AdUpdate}/>
			<Stack.Screen
				name="location-search"
				component={LocationSearchScreen}
				options={{headerShown: false}}
				initialParams={{
					title: 'Indiquez votre ville',
					subtitle: 'elle permet de proposer des lieux proche',
					buttonLabel: 'Rechercher',
					placeholder: 'Recherchez votre ville',
					nextPage: 'ads',
					stack: 'protected',
					cancellable: false,
					userLocation: true
				}}
			/>
		</Stack.Navigator>
	)
}

export default ProtectedStack;
