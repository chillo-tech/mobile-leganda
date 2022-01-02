import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../utils/Styles';

function ListItem({item, onContactPressed}) {
	return (
		<TouchableHighlight underlayColor={colors.white} onPress={() => onContactPressed(item)}>
			<View style={styles.container}>
				<View style={styles.iconText}>
					<FontAwesome5 name={item.icon} size={18} color={colors.black}/>
					<Text style={styles.title}>{item.title}</Text>
				</View>
				<AntDesign name="right" size={18} color={colors.black}/>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingVertical: 18,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightgray,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iconText: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		marginLeft: 12,
		fontSize: 18,
		color: colors.black
	},
})
export default ListItem;
