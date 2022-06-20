import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/Styles';

function ListHeaderComponent(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>LE GANDA</Text>
			<Text style={styles.description}>Votre coin qualité</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 80,
	},
	title: {
		color: colors.warning,
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: 36,
		fontWeight: 'bold'
	},
	description: {
		color: colors.primary,
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'normal'
	}
})
export default ListHeaderComponent;
