import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {colors} from '../../utils';

function IconButton({icon, onclick, color = colors.primary}) {
	return (
		<TouchableOpacity activeOpacity={1} onPress={onclick} style={styles.button}>
			<AntDesign name={icon} size={18} color={color}/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.white,
		borderRadius: 50,
		marginLeft: 10,
		width: 28,
		height: 28,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		color: colors.primary,
	}
});
export default IconButton;
