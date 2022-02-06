import React, {useContext, useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles, IMAGES_URL} from '../../utils';
import {Controller, useForm} from "react-hook-form";
import Message from '../../components/messages/Message';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import BackButton from '../../components/buttons/BackButton';
import jwt_decode from "jwt-decode";
import {SecurityContext} from '../../context/SecurityContextProvider';

function ValidationScreen({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	const message = "Un instant nous vérifions votre compte.";
	const [isActivating, setIsActivating] = useState(false);
	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			token: ''
		}
	});
	const {publicAxios} = useContext(SecurityContext);
	let {state: {authenticatedUser}, updateUserInfos} = useContext(ApplicationContext);
	const onSubmit = async (tokenData) => {
		setIsActivating(true);
		try {
			const {data: {accessToken, refreshToken}} = await publicAxios.post(
				"activate-phone",
				{...tokenData, ...authenticatedUser}
			)
			setIsActivating(false);
			let nextScreen = "signup";
			if (accessToken) {
				nextScreen = "location";
				const decoded = jwt_decode<Profile>(accessToken);
				authenticatedUser = {...authenticatedUser, ...decoded, accessToken, refreshToken}
			}
			navigation.navigate(nextScreen);
			updateUserInfos({...authenticatedUser});
		} catch (error) {
			Alert.alert(
				"Une erreur est survenue",
				error?.response?.data?.message
			);

			setIsActivating(false);
		}
	}
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
						<Text style={globalStyles.creationTitle}>Confirmez votre</Text>
						<Text style={globalStyles.creationTitle}>compte</Text>
					</View>

					<View style={styles.formContainer}>
						{isActivating
							? (<Message firstText={message}/>)
							: (
								<>
									<Text style={[globalStyles.fieldFont, {
										fontSize: 15,
										marginVertical: 5,
										textAlign: 'center'
									}]}>
										Nous vous avons transmis un code
									</Text>
									<Text style={[globalStyles.fieldFont, {
										fontSize: 15,
										textAlign: 'center',
										marginBottom: 10
									}]}>
										Merci de saisir ce code dans le champ ci dessous
									</Text>
									<View
										style={[globalStyles.creationBodyFieldGroup, errors?.token ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
										<Controller
											name="token"
											control={control}
											rules={{
												required: true,
												pattern: /\d{6}/
											}}
											render={({field: {onChange, onBlur, value}}) => (
												<TextInput
													style={[globalStyles.fieldFont, globalStyles.creationBodyField, {textAlign: 'center'}]}
													onBlur={onBlur}
													onChangeText={onChange}
													value={value || ''}
													keyboardType="numeric"
													maxLength={6}
													placeholder="615066"
												/>
											)}
										/>
									</View>
									{errors.token && <Text style={globalStyles.error}>Cette donnée est invalide</Text>}

									<TouchableOpacity
										style={[styles.button]}
										onPress={handleSubmit(onSubmit)}
										activeOpacity={1}
									>
										<Text style={[styles.buttonLabel]}>Valider mon compte</Text>
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
		color: colors.primary
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
		margin: 5,
		borderRadius: 5
	},
	wrapper: {
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		flex: 1,
		justifyContent: 'flex-end',
		padding: 10
	},

})
export default ValidationScreen;
