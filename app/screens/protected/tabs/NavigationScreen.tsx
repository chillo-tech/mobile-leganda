import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTab from '../../../components/tabs/BottomTab';
import HomeScreen from './HomeScreen';
import MoreScreen from './MoreScreen';
import SearchScreen from './SearchScreen';
import EmptyAd from '../../../components/ad-item/EmptyMeal';

const Tab = createBottomTabNavigator();

function NavigationScreen() {

	return (

		<Tab.Navigator
			tabBar={props => <BottomTab {...props} />}
		>
			<Tab.Screen name="AdsHome" component={HomeScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="AdList" component={SearchScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="NewAd" component={EmptyAd}
						options={{headerShown: false}}/>
			<Tab.Screen name="More" component={MoreScreen}
						options={{headerShown: false}}/>
			{/*<Tab.Screen name="ad-detail" component={AdDetail}
						options={{headerShown: false}}/>*/}
		</Tab.Navigator>
	);
}

export default NavigationScreen;
