import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Presentation from '../screens/opened/Presentation';
import LocationSearchScreenBack from '../screens/shared/LocationSearchScreen';

function OpenedStack() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Presentation"
				component={Presentation}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="location"
				component={LocationSearchScreenBack}
				options={{headerShown: false}}
				initialParams={{
					title: 'Indiques ta position',
					subtitle: 'elle permet de proposer des lieux proche',
					buttonLabel: 'Valider',
					nextPage: 'Protected',
					cancellable: false,
					userLocation: true
				}}
			/>
		</Stack.Navigator>
	)
}

export default OpenedStack;

