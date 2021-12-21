import React from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

function EmptyMeal({route, navigation}) {

	useFocusEffect(
		React.useCallback(() => {
			navigation.navigate({name: 'MealCreation', merge: true});
		}, [route])
	);
	return (
		<View/>
	);
}

export default EmptyMeal;
