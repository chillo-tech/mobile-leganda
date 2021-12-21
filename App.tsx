import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ApplicationContextProvider from './app/context/ApplicationContextProvider';
import AddressSearchScreen from './app/screens/AddressSearchScreen';
import MealDetail from './app/screens/meals/MealDetail';
import MealUpdate from './app/screens/meals/MealUpdate';
import NavigationScreen from './app/screens/NavigationScreen';
import UnProtectedStack from './app/screens/signin/UnProtectedStack';

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
						<Stack.Screen name="AddressSearch" component={AddressSearchScreen}
									  options={{headerShown: false}}/>
						<Stack.Screen name="Signin" component={UnProtectedStack} options={{headerShown: false}}/>
					</Stack.Group>
				</Stack.Navigator>
			</ApplicationContextProvider>
		</NavigationContainer>
	);
}
