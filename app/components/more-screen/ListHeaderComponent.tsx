import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import {colors} from '../../utils/Styles';
import {FontAwesome} from '@expo/vector-icons';

function ListHeaderComponent(props) {

	const {state: {authenticatedUser: {prenom, nom}}} = useContext<any>(ApplicationContext);
	return (
		<View style={styles.container}>
				<FontAwesome name="user-circle-o" size={50} color={colors.primary} />
        <Text style={styles.description}>{prenom} {nom[0]}.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 20
	},
	description: {
    marginLeft: 10,
		color: colors.primary,
		textAlign: 'center',
		fontSize: 24,
    textTransform: 'capitalize',
		fontWeight: '600'

	}
})
export default ListHeaderComponent;
