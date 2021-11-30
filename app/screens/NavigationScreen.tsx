import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import MoreScreen from './MoreScreen';
import HomeScreen from './HomeScreen';
import BottomTab from '../components/tabs/BottomTab';
import EmptyMeal from '../components/mealItem/EmptyMeal';

const Tab = createBottomTabNavigator();

function NavigationScreen() {

	return (

		<Tab.Navigator
			tabBar={props => <BottomTab {...props} />}

		>
			<Tab.Screen name="MealsHome" component={HomeScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="MealsList" component={SearchScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="NewMeal" component={EmptyMeal}
						options={{headerShown: false}}/>
			<Tab.Screen name="More" component={MoreScreen}
						options={{headerShown: false}}/>
			{/*<Tab.Screen name="MealDetail" component={MealDetail}
						options={{headerShown: false}}/>*/}
		</Tab.Navigator>
	);
}

export default NavigationScreen;
