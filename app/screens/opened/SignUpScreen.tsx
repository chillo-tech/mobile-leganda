import React, {useContext, useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles, IMAGES_URL, isValidEmail} from '../../utils';
import {Controller, useForm} from "react-hook-form";
import Message from '../../components/messages/Message';
import BackButton from '../../components/buttons/BackButton';
import jwt_decode from 'jwt-decode';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {SecurityContext} from '../../context/SecurityContextProvider';

function SignUpScreen({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	const message = "Un instant nous vérifions votre compte.";
	const [isActivating, setIsActivating] = useState(false);
	const {publicAxios} = useContext(SecurityContext);
	let {state: {authenticatedUser}, signIn} = useContext(ApplicationContext);

	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: ''
		}
	});
	const onSubmit = async (userProfile: Profile) => {
		setIsActivating(true);
		try {
			const {data: {accessToken, refreshToken}} = await publicAxios.post(
				"update-user-profile",
				{...userProfile, ...authenticatedUser}
			);
			setIsActivating(false);
			if (accessToken) {
				const decoded = jwt_decode<Profile>(accessToken);
				authenticatedUser = {...authenticatedUser, ...decoded, accessToken, refreshToken}
			}
			signIn(authenticatedUser);
			navigation.navigate('location')
		} catch (error) {
			Alert.alert(
				"",
				error?.response?.data?.message,
				[
					{text: "J'ai compris"}
				]
			);
			setIsActivating(false);
		}
	};

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
				style={globalStyles.bacgroundImage}
			>
				<View style={[globalStyles.wrapper]}>
					<View style={globalStyles.creationHeader}>
						<Text style={globalStyles.creationTitle}>Comment devons nous vous appeler</Text>
					</View>

					<View
						style={[styles.formContainer]}>
						{isActivating
							? (<Message firstText={message}/>)
							: (
								<>
									<View
										style={[globalStyles.creationBodyFieldGroup, errors?.firstName ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
										<Controller
											name="firstName"
											control={control}
											rules={{
												required: true
											}}
											render={({field: {onChange, onBlur, value}}) => (
												<TextInput
													style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													placeholder="Prénom"
												/>
											)}
										/>
									</View>
									{errors?.firstName &&
                                    <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
									<View
										style={[globalStyles.creationBodyFieldGroup, errors?.lastName ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
										<Controller
											name="lastName"
											control={control}
											rules={{
												required: true
											}}
											render={({field: {onChange, onBlur, value}}) => (
												<TextInput
													style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													placeholder="Nom"
												/>
											)}
										/>
									</View>
									{errors?.lastName &&
                                    <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
									<View
										style={[globalStyles.creationBodyFieldGroup, errors?.email ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
										<Controller
											name="email"
											control={control}
											rules={{
												validate: (value) => isValidEmail(value)
											}}
											render={({field: {onChange, onBlur, value}}) => (
												<TextInput
													style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
													onBlur={onBlur}
													onChangeText={onChange}
													value={value}
													placeholder="Email"
												/>
											)}
										/>
									</View>
									{errors?.email &&
                                    <Text style={globalStyles.error}>Cette donnée est invalide</Text>}

									<TouchableOpacity
										style={[styles.button]}
										onPress={handleSubmit(onSubmit)}
										activeOpacity={1}
									>
										<Text style={[styles.buttonLabel]}>Continuer</Text>
									</TouchableOpacity>
								</>
							)}
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	account: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10
	},
	accountButton: {
		color: colors.primary,
		fontSize: 16,
		fontWeight: 'normal',
		marginLeft: 5
	},
	accountText: {
		fontSize: 16,
		fontWeight: 'normal',
		color: colors.darkgray
	},
	button: {
		backgroundColor: colors.warning,
		borderRadius: 5
	},
	buttonLabel: {
		color: colors.white,
		textAlign: 'center',
		padding: 10,
		fontSize: 20
	},
	container: {
		backgroundColor: colors.primary,
		justifyContent: 'flex-end',
		flex: 1
	},
	formContainer: {
		backgroundColor: colors.white,
		padding: 10,
		marginHorizontal: 5,
		borderRadius: 5
	},
	keyboardVisible: {
		marginTop: 150
	},
	keyboardHidden: {
		marginTop: 0
	}
})
export default SignUpScreen;
