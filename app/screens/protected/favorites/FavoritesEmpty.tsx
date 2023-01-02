import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../../utils';

function FavoritesEmpty({navigation}: any) {

	const startSearch = () => {
		navigation.navigate({
			name: "AdList",
			merge: true
		});
	}

	return (
		<View style={[styles.container]}>
			<Text style={styles.title}>Pas encore de favoris</Text>
			<View style={styles.descriptionWrapper}>
				<Text style={styles.description}>
					Sur une annonce appuyez sur le coeur.
				</Text>
				<Text style={styles.description}>
					L'annonce d'affichera ici
				</Text>
			</View>
			<TouchableHighlight underlayColor={colors.warning} style={styles.button}
								onPress={startSearch}>
				<Text
					style={styles.buttonText}>
					Recherchez une annonce
				</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		color: colors.warning,
		borderColor: colors.warning,
		borderWidth: 1,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '70%',
		marginHorizontal: '15%'
	},
	buttonText: {
		color: colors.warning,
		textAlign: 'center',
		fontSize: 20,
		paddingVertical: 10
	},
	container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
		flex: 1,
    paddingVertical: 30,
		justifyContent: 'center'
	},
	description: {
		textAlign: 'center',
		fontWeight: 'normal',
		fontSize: 16
	},
	descriptionWrapper: {
		marginVertical: 50
	},
	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25
	}
});
export default FavoritesEmpty;
