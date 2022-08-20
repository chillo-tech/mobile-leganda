import React, {useContext} from 'react';
import {colors} from '../../utils';
import {StackActions} from '@react-navigation/native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import IconButton from './IconButton';

function BackButton({navigation, icon = "arrowleft", color = colors.primary}) {
	const {resetAd} = useContext(ApplicationContext);
	const goBack = () => {
		resetAd();
		const popAction = StackActions.pop(1);
		navigation.dispatch(popAction);
    if(icon != "arrowleft") {
		  navigation.navigate('AdList');
    }
	}
	return (
		<IconButton icon={icon} color={color} onclick={goBack}/>
	);
}

export default BackButton;
