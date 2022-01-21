import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import { colors, IMAGES_URL } from '../../../utils';

function HomeScreen({navigation}) {

	const {signOut} = React.useContext<any>(ApplicationContext);
	const image = {uri: `${IMAGES_URL}/poulet.jpeg`};
  
	return (
		<View style={[styles.container]}>
			<ImageBackground source={image} resizeMode="cover"
							 style={styles.image}>
				<View style={[styles.buttonsContainer, styles.alignment]}>
					<TouchableHighlight style={[styles.button, styles.listButton]}
										underlayColor={colors.white}
										onPress={() => navigation.navigate('MealList')}>
						<>
							<Text style={[styles.text, styles.primaryText]}>
								Découvrir et réserver
							</Text>
							<Text style={[styles.text, styles.primaryText]}>
								un repas fait maison
							</Text>
						</>
					</TouchableHighlight>
					<TouchableHighlight style={[styles.button, styles.createButton]}
										underlayColor={colors.primary}
										onPress={() => navigation.navigate('MealCreation')}>
						<>
							<Text style={[styles.text, styles.whiteText]}>Proposer mon</Text>
							<Text style={[styles.text, styles.whiteText]}>délicieux repas</Text>
						</>
					</TouchableHighlight>

					<TouchableHighlight style={[styles.button, styles.createButton]}
										underlayColor={colors.primary}
										onPress={() => signOut()}>
						<>
							<Text style={[styles.text, styles.whiteText]}>Me deconnecter</Text>
						</>
					</TouchableHighlight>
					
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
		flexDirection: 'column'
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
		backgroundColor: colors.primary,
		shadowColor: colors.white,

	},
	listButton: {
		backgroundColor: colors.white,
	},
	text: {
		fontWeight: 'normal',
		fontSize: 30,
		textAlign: 'center',
		lineHeight: 40
	},
	whiteText: {
		color: colors.white,
	},
	primaryText: {
		color: colors.primary,
	}
})
export default HomeScreen;
