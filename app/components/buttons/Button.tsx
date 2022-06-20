import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import {colors} from '../../utils';

const Button = ({label = "Continuer", onPress}) => {
	return (
		<TouchableHighlight style={styles.container} onPress={onPress}>
			<Text style={styles.label}>{label}</Text>
		</TouchableHighlight>
	)
}

export default Button;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.warning,
		alignItems: 'center',
		paddingVertical: 8,
		borderRadius: 5,
	},
	label: {
		fontSize: 20,
		color: colors.white
	}
})
