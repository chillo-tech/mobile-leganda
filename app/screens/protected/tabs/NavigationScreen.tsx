import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomTab from '../../../components/tabs/BottomTab';
import MoreScreen from './MoreScreen';
import SearchScreen from './SearchScreen';
import EmptyAd from '../../../components/ad-item/EmptyMeal';
import FavoritesScreen from './FavoritesScreen';

const Tab = createBottomTabNavigator();

function NavigationScreen() {

	return (

		<Tab.Navigator initialRouteName="AdList"
					   tabBar={props => <BottomTab {...props} />}
		>
			<Tab.Screen name="NewAd" component={EmptyAd}
						options={{headerShown: false}}/>
			<Tab.Screen name="AdList" component={SearchScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="favorites" component={FavoritesScreen}
						options={{headerShown: false}}/>
			<Tab.Screen name="More" component={MoreScreen}
						options={{headerShown: false}}/>
			{/*<Tab.Screen name="ad-detail" component={AdDetail}
						options={{headerShown: false}}/>*/}
		</Tab.Navigator>
	);
}

export default NavigationScreen;
