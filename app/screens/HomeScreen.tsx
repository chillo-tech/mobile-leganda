import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/Styles';

function HomeScreen({navigation}) {
	return (
		<View style={[styles.container]}>
			<ImageBackground source={require('../../assets/images/poulet.jpeg')} resizeMode="stretch"
							 style={styles.image}>
				<View style={[styles.buttonsContainer, styles.alignment]}>
					<TouchableOpacity style={[styles.button, styles.listButton]}
									  onPress={() => navigation.navigate('MealsList')}>
						<Text style={[styles.text, styles.primaryText]}>
							Découvrir et réserver
						</Text>
						<Text style={[styles.text, styles.primaryText]}>
							un repas fait maison
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button, styles.createButton]}
									  onPress={() => navigation.navigate('NewMeal')}>
						<Text style={[styles.text, styles.whiteText]}>Proposer mon</Text>
						<Text style={[styles.text, styles.whiteText]}>délicieux repas</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonsContainer: {
		width: '100%',
		marginTop: 0,
		backgroundColor: "rgba(254,234,221,0.2)",
		paddingHorizontal: 10,
		paddingVertical: 10,
		flex: 1,
		flexDirection: 'column',
		fontFamily: 'roboto'
	},
	image: {
		flex: 1,
		justifyContent: "center"
	},
	alignment: {
		justifyContent: 'center'
	},
	button: {
		alignItems: "center",
		borderRadius: 10,
		padding: 10,
		marginBottom: 30,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	createButton: {
		backgroundColor: `${colors.primary}`,
		shadowColor: `${colors.white}`,

	},
	listButton: {
		backgroundColor: `${colors.white}`,
	},
	text: {
		fontWeight: 'normal',
		fontSize: 30,
		textAlign: 'center',
		lineHeight: 40
	},
	whiteText: {
		color: `${colors.white}`,
	},
	primaryText: {
		color: `${colors.primary}`,
	}
})
export default HomeScreen;
