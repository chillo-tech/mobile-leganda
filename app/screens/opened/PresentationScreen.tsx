import React, {useContext} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles, IMAGES_URL} from '../../utils';
import {SecurityContext} from "../../context/SecurityContextProvider";
import {ApplicationContext} from "../../context/ApplicationContextProvider";

function PresentationScreen({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	const {state, signIn, signOut} = React.useContext(ApplicationContext);
	const {authenticatedUser = {}} = state;
	const {accessToken, refreshToken, location} = authenticatedUser;

	React.useLayoutEffect(() => {

	});
	return (
		<View style={[globalStyles.container]}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={[globalStyles.wrapper, {
					justifyContent: 'space-between'
				}]}>
					<View style={styles.top}>
						<Text style={styles.logo}>LE GANDA</Text>
						<Text style={styles.description}>Votre coin qualité</Text>
					</View>
					<View style={styles.bottom}>
						<Text style={styles.h1Text}>De belles annonces</Text>
						<Text style={styles.h1Text}>près de vous</Text>
						<View style={styles.account}>
							<View style={styles.separation}>
								<View style={styles.leftBlock}/>
								{/*<Text style={styles.separationContent}>continuer avec mon compte</Text>*/}
								<View style={styles.rightBlock}/>
							</View>
							{/*
								<View style={styles.bottomLinks}>
								<TouchableHighlight style={[styles.buttomLink]}
													underlayColor="none"
													onPress={() => navigation.navigate('location')}>
									<Image style={styles.providerIcon} resizeMode="cover"
										   source={{uri: `${IMAGES_URL}/facebook.png`}}/>
								</TouchableHighlight>
								<TouchableHighlight style={[styles.buttomLink, {marginHorizontal: 15}]}
													underlayColor="none"
													onPress={() => navigation.navigate('location')}>
									<Image style={styles.providerIcon} resizeMode="cover"
										   source={{uri: `${IMAGES_URL}/google.png`}}/>
								</TouchableHighlight>
								<TouchableHighlight underlayColor="none"
													onPress={() => navigation.navigate('signup')}>
									<Feather name="phone" size={24} color="black"
											 style={{backgroundColor: colors.white, borderRadius: 50, padding: 12}}/>
								</TouchableHighlight>
							</View>
							*/
							}
							<TouchableOpacity
								style={[styles.button, {backgroundColor: colors.warning}]}
								onPress={() => navigation.navigate('phonescreen')}
								activeOpacity={1}
							>
								<Text style={[styles.buttonText]}>Je me connecte</Text>
							</TouchableOpacity>
							{/*
							<TouchableOpacity
								onPress={() => navigation.navigate('signup')}
								activeOpacity={1}
							>
								<Text style={[styles.buttonText]}>Je créé mon compte</Text>
							</TouchableOpacity>
							*/
							}
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	bottom: {
		paddingBottom: 20
	},
	bottomLinks: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttomLink: {
		backgroundColor: colors.white,
		borderRadius: 50,
		padding: 5,
		alignContent: 'center',
		textAlign: 'center'
	},
	providerIcon: {
		width: 40,
		height: 40,
		borderRadius: 50
	},
	button: {
		backgroundColor: colors.primary,
		borderRadius: 5,
	},
	buttonText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'normal',
		paddingVertical: 10
	},
	description: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 30,
		fontWeight: 'normal',
	},
	logo: {
		textAlign: 'center',
		color: '#F2785C',
		textTransform: 'uppercase',
		fontSize: 50,
		fontWeight: 'bold',
	},
	h1Text: {
		fontSize: 30,
		color: colors.white,
		fontWeight: 'normal',
		lineHeight: 35,
		textAlign: 'center'
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
	separation: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20
	},
	leftBlock: {
		backgroundColor: colors.white,
		height: 1,
		flex: 1
	},
	rightBlock: {
		backgroundColor: colors.white,
		height: 1,
		flex: 1
	},
	separationContent: {
		color: colors.white,
		marginHorizontal: 5
	},
	top: {
		paddingTop: 80,
		paddingBottom: 10,
		paddingHorizontal: 10
	}
})

export default PresentationScreen;
