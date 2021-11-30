import React from 'react';
import {colors} from '../../utils/Styles';
import {StyleSheet, Text, View} from 'react-native';

function Message({firstText}) {
	return (
		<View style={styles.container}>
			<Text style={styles.defaultText}>{firstText}</Text>
		</View>
	);
}

export default Message;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 130,
		borderRadius: 10
	},
	defaultText: {
		color: colors.primary,
		fontSize: 20
	}

})
