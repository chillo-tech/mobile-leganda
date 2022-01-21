import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MealDetail from '../screens/protected/meals/MealDetail';
import MealUpdate from '../screens/protected/meals/MealUpdate';
import NavigationScreen from '../screens/protected/tabs/NavigationScreen';
import LocationSearchScreenBack from '../screens/shared/LocationSearchScreen';

function ProtectedStack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator>
			<Stack.Screen name="Meals" component={NavigationScreen} options={{headerShown: false}}/>
			<Stack.Screen name="MealDetail" component={MealDetail}/>
			<Stack.Screen name="MealCreation" component={MealUpdate}/>
			<Stack.Screen
				name="locationSearch"
				component={LocationSearchScreenBack}
				options={{headerShown: false}}
				initialParams={{
					title: 'Indiques ta ville',
					subtitle: 'elle permet de proposer des lieux proche',
					buttonLabel: 'Rechercher',
					nextPage: 'Meals',
					cancellable: true,
					userLocation: false
				}}
			/>
		</Stack.Navigator>
	)
}

export default ProtectedStack;
