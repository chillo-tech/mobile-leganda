import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import AdDetail from '../screens/protected/ads/AdDetail';
import AdUpdate from '../screens/protected/ads/AdUpdate';
import NavigationScreen from '../screens/protected/tabs/NavigationScreen';
import LocationSearchScreenBack from '../screens/shared/LocationSearchScreen';
import {ApplicationContext} from '../context/ApplicationContextProvider';

function ProtectedStack() {
	const Stack = createNativeStackNavigator();
	const {state: {authenticatedUser: {location}}} = useContext<any>(ApplicationContext);
	return (
		<Stack.Navigator initialRouteName={location ? 'ads' : 'location-search'}>
			<Stack.Screen name="ads" component={NavigationScreen} options={{headerShown: false}}/>
			<Stack.Screen name="ad-detail" component={AdDetail}/>
			<Stack.Screen name="ad-update" component={AdUpdate}/>
			<Stack.Screen
				name="location-search"
				component={LocationSearchScreenBack}
				options={{headerShown: false}}
				initialParams={{
					title: 'Indiquez votre ville',
					subtitle: 'elle permet de proposer des lieux proche',
					buttonLabel: 'Rechercher',
					placeholder: 'Recherchez votre ville',
					nextPage: 'ads',
					cancellable: false,
					userLocation: true
				}}
			/>
		</Stack.Navigator>
	)
}

export default ProtectedStack;
