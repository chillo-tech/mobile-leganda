import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {BACKOFFICE_URL, colors, globalStyles, isValidEmail, isValidPhoneNumber} from '../../utils';
import {Controller, useForm} from "react-hook-form";
import {LinearGradient} from 'expo-linear-gradient';
import Message from '../../components/messages/Message';
import axios from 'axios';
import BackButton from '../../components/buttons/BackButton';

function SignInScreen({navigation}) {
	const message = "Un instant nous vérifions votre compte.";
	const [isActivating, setIsActivating] = useState(false);
	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			active: false
		}
	});
	const onSubmit = async (profile: Profile) => {
		setIsActivating(true);
		try {
			const {data} = await axios(
				`${BACKOFFICE_URL}/signin`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(profile)
				}
			);
			setIsActivating(false);
		} catch (error) {
			Alert.alert(
				"Une erreur est survenue",
				error?.response?.data?.message,
				[
					{text: "OK"}
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
		<ScrollView contentContainerStyle={styles.container}>
			<LinearGradient
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				colors={[colors.warning, colors.primary]}
				style={styles.container}
			>
				<View style={globalStyles.creationHeader}>
					<Text style={globalStyles.creationTitle}>Saisis tes identifiants</Text>
				</View>

				<View style={styles.formContainer}>
					{isActivating
						? (<Message firstText={message}/>)
						: (
							<>
								<View
									style={[globalStyles.creationBodyFieldGroup, errors?.phone ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
									<Controller
										name="phone"
										control={control}
										rules={{
											required: true,
											validate: (value) => isValidPhoneNumber(value) || isValidEmail(value)
										}}
										render={({field: {onChange, onBlur, value}}) => (
											<TextInput
												style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="Téléphone ou Email"
											/>
										)}
									/>
								</View>
								{errors?.phone &&
                                <Text style={globalStyles.error}>Cette donnée est invalide</Text>}

								<View
									style={[globalStyles.creationBodyFieldGroup, errors?.password ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
									<Controller
										name="password"
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
												secureTextEntry={true}
												placeholder="Mot de passe"
											/>
										)}
									/>
								</View>
								{errors?.password &&
                                <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
								<TouchableOpacity
									style={[styles.button]}
									onPress={handleSubmit(onSubmit)}
									activeOpacity={1}
								>
									<Text style={[styles.buttonLabel]}>Je me connecte</Text>
								</TouchableOpacity>
								<View style={styles.account}>
									<Text style={styles.accountText}>Pas encore de compte ? </Text>
									<TouchableOpacity
										onPress={() => navigation.navigate('signup')}
										activeOpacity={1}
									>
										<Text style={styles.accountButton}>Créé ton compte</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.account}>
									<TouchableOpacity
										onPress={() => navigation.navigate('newPassword')}
										activeOpacity={1}
									>
										<Text style={styles.accountButton}>Mot de pass oublié ?</Text>
									</TouchableOpacity>
								</View>
							</>
						)}
				</View>
			</LinearGradient>
		</ScrollView>
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
		backgroundColor: colors.primary,
		borderRadius: 5
	},
	buttonLabel: {
		color: colors.white,
		textAlign: 'center',
		padding: 10,
		fontSize: 22
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
	}
})
export default SignInScreen;
