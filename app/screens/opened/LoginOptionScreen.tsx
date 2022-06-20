import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles, IMAGES_URL} from '../../utils';
import {Feather} from '@expo/vector-icons';
import BackButton from '../../components/buttons/BackButton';

function LoginOptionScreen({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			title: "",
			headerBackTitleVisible: false,
			headerTransparent: true,
			headerShadowVisible: false,
			headerLeft: () => (
				<BackButton navigation={navigation}/>
			),
		});
	}, [navigation]);
	return (
		<View style={[globalStyles.container]}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={[globalStyles.wrapper, {
					justifyContent: 'center'
				}]}>
					<>
						<Text style={styles.logo}>Connectez vous avec</Text>
						<View style={styles.bottom}>
							<TouchableOpacity
								style={[styles.button]}
								onPress={() => navigation.navigate('phonescreen')}
								activeOpacity={1}
							>
								<Feather name="phone" size={24} color={colors.white} style={styles.icon}/>
								<Text style={[styles.buttonText]}>Votre nunéro</Text>
							</TouchableOpacity>
						</View>
					</>
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
		backgroundColor: colors.warning,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 30
	},
	buttonText: {
		color: colors.white,
		textAlign: 'center',
		fontSize: 20,
		paddingVertical: 10
	},
	description: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 30,
		fontWeight: 'normal',
	},
	icon: {
		marginHorizontal: 10
	},
	logo: {
		textAlign: 'center',
		color: colors.white,
		fontSize: 30,
		marginBottom: 15
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
		paddingBottom: 10
	}
})

export default LoginOptionScreen;
