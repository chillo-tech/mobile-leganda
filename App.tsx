import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationScreen from './app/screens/NavigationScreen';
import ApplicationContextProvider from './app/context/ApplicationContextProvider';
import MealDetail from './app/screens/meals/MealDetail';
import MealUpdate from './app/screens/meals/MealUpdate';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<ApplicationContextProvider>
				<Stack.Navigator initialRouteName="Meals">
					<Stack.Group>
						<Stack.Screen name="Meals" component={NavigationScreen} options={{headerShown: false}}/>
						<Stack.Screen name="MealDetail" component={MealDetail}/>
						<Stack.Screen name="MealCreation" component={MealUpdate}/>
					</Stack.Group>
				</Stack.Navigator>
			</ApplicationContextProvider>
		</NavigationContainer>
	);
}
