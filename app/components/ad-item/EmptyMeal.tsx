import React from 'react';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

function EmptyAd({route, navigation}) {

	useFocusEffect(
		React.useCallback(() => {
			navigation.navigate({name: 'ad-update', merge: true});
		}, [route])
	);
	return (
		<View/>
	);
}

export default EmptyAd;
