import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {colors} from '../../utils/Styles';
import {StackActions} from '@react-navigation/native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';

function BackButton({navigation, icon = "leftcircle", color = colors.white}) {
	const {resetMeal} = useContext(ApplicationContext);
	const goBack = () => {
		resetMeal();
		const popAction = StackActions.pop(1);
		navigation.dispatch(popAction);
	}
	return (
		<TouchableOpacity activeOpacity={1} onPress={goBack}>
			<AntDesign name={icon} size={28} color={color}/>
		</TouchableOpacity>
	);
}

export default BackButton;
