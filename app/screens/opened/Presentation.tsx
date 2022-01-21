import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { colors, globalStyles, IMAGES_URL } from '../../utils';

function Presentation({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	return (
		<View style={[globalStyles.container]}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={[styles.wrapper]}>
					<View style={styles.top}>
						<Text style={styles.logo}>LE GANDA</Text>
						<Text style={styles.description}>Votre coin qualité</Text>
					</View>
					<View style={styles.bottom}>
						<Text style={styles.h1Text}>Manges des bons plats</Text>
						<Text style={styles.h1Text}>Faits maison</Text>
						<View style={styles.account}>
							<View style={styles.separation}/>
							<TouchableHighlight style={[styles.button]}
												underlayColor={colors.primary}
												onPress={() => navigation.navigate('location')}>
								<Text style={[styles.buttonText]}>
									Continuer
								</Text>
							</TouchableHighlight>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	account: {},
	bottom: {
		paddingBottom: 20,
		paddingHorizontal: 30
	},
	button: {
		paddingVertical: 8,
		backgroundColor: colors.primary,
		borderRadius: 5,
	},
	buttonText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'normal'
	},
	description: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 21,
		fontWeight: 'bold',
	},
	logo: {
		textAlign: 'center',
		color: '#F2785C',
		textTransform: 'uppercase',
		fontSize: 30,
		fontWeight: 'bold',
	},
	wrapper: {
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		flex: 1,
		justifyContent: 'space-between'
	},
	h1Text: {
		fontSize: 30,
		color: colors.white,
		fontWeight: 'bold',
		lineHeight: 35,
		textAlign: 'center'
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
	separation: {
		backgroundColor: colors.white,
		height: 0.5,
		marginVertical: 10
	},
	top: {
		paddingTop: 80,
		paddingBottom: 10,
		paddingHorizontal: 10
	}
})

export default Presentation;
