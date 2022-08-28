import React, {useContext, useState} from 'react';
import {Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles, IMAGES_URL} from '../../utils';
import BackButton from '../../components/buttons/BackButton';
import {Controller, useForm} from 'react-hook-form';
import CountryPicker, {Country, CountryCode} from 'react-native-country-picker-modal'
import Message from '../../components/messages/Message';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {SecurityContext} from '../../context/SecurityContextProvider';

function UserPhoneScreen({navigation}) {
	const image = {uri: `${IMAGES_URL}/bg-home.jpeg`};
	const message = "Un instant nous vérifions votre compte.";
	const {signIn} = useContext(ApplicationContext);
	const {publicAxios} = useContext(SecurityContext);
	const [isActivating, setIsActivating] = useState(false);
	const [countryPhoneIndex, setCountryPhoneIndex] = useState('+33');
	const [countryCode, setCountryCode] = useState<CountryCode>('FR')
	const {control, handleSubmit, formState: {errors}} = useForm({
		defaultValues: {
			phone: ''
		}
	});

	const onSubmit = async (profile: Profile) => {
		setIsActivating(true);
		try {
			const {status} = await publicAxios.post(
				"phone-activation-code",
				{...profile, phoneIndex: countryPhoneIndex}
			);
			signIn({...profile, phoneIndex: countryPhoneIndex});
			setIsActivating(false);
			if (status === 201) {
				navigation.navigate('accountValidation');
			}
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
	}
	const onCountrySelected = async ({cca2, callingCode}: Country) => {
		setCountryCode(cca2);
		setCountryPhoneIndex(`+${callingCode[0]}`);
	}
	React.useLayoutEffect(() => {
		//signOut();
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
				<View style={[globalStyles.wrapper]}>
					<View style={styles.form}>
						{isActivating
							? (<Message firstText={message}/>)
							: (
								<>
									<Text style={styles.logo}>Quel est votre numéro ?</Text>
									<Text style={styles.description}>Nous vous transmettrons des offres sur ce
										numéro</Text>

									<View
										style={[globalStyles.creationBodyFieldGroup, errors?.phone ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
										<View style={styles.countryFlag}>
											<CountryPicker

												{...{
													withFilter: true,
													onSelect: onCountrySelected,
													countryCode,
												}} visible={false}/>

										</View>
										<Text style={styles.countryFlag}>
											{countryPhoneIndex}
										</Text>
										<Controller
											name="phone"
											control={control}
											rules={{
												required: true,
												pattern: /0?\d{9}/
											}}
											render={({field: {onChange, onBlur, value}}) => (
												<TextInput
													style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
													onBlur={onBlur}
													onChangeText={onChange}
													value={value || ''}
													keyboardType="numeric"
													maxLength={10}
													placeholder="761705745"
												/>
											)}
										/>
									</View>
									{errors.phone && <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
									<View style={styles.bottom}>
										<TouchableOpacity
											style={[globalStyles.button]}
											onPress={handleSubmit(onSubmit)}
											activeOpacity={1}
										>
											<Text style={[globalStyles.buttonText]}>Continuer</Text>
										</TouchableOpacity>
									</View>
								</>
							)
						}
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	bottom: {
		marginTop: 15
	},

	countryFlag: {
		paddingLeft: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		fontSize: 20
	},
	description: {
		textAlign: 'center',
		color: colors.primary,
		fontSize: 15,
		fontWeight: 'normal',
		marginBottom: 20
	},
	form: {
		backgroundColor: colors.white,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
	inputWraper: {
		marginVertical: 30,
		borderRadius: 5,
		borderColor: colors.darkgray
	},
	logo: {
		textAlign: 'center',
		color: colors.warning,
		fontSize: 25,
		fontWeight: 'normal',
	},
	h1Text: {
		fontSize: 30,
		color: colors.white,
		fontWeight: 'normal',
		lineHeight: 35,
		textAlign: 'center'
	},

})

export default UserPhoneScreen;
