import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import EmptyMeal from '../../../components/mealItem/EmptyMeal';
import BottomTab from '../../../components/tabs/BottomTab';
import HomeScreen from './HomeScreen';
import MoreScreen from './MoreScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

function NavigationScreen() {

	return (

		<Tab.Navigator
			tabBar={props => <BottomTab {...props} />}
		>
			<Tab.Screen name="MealsHome" component={HomeScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="MealList" component={SearchScreen}
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
