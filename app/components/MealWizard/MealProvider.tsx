import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, TextInput, View } from 'react-native';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { BACKOFFICE_URL, MEALS_ENDPOINT } from '../../utils/Endpoints';
import { isValidPhoneNumber } from '../../utils/isValidPhoneNumber';
import { globalStyles } from '../../utils/Styles';
import Message from '../messages/Message';
import BottomBar from '../tabs/BottomBar';

function MealProvider() {
	const [isActivating, setIsActivating] = useState(false);
	const [message, setMessage] = useState("Un instant nous vérifions votre annonce.");

	const {state: {creationWizard: {stepIndex, meal}}, updateMeal, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});

	const onSubmit = async (infos) => {
		setIsActivating(true);
		try {
			const {status, data: {id}} = await axios(
				`${BACKOFFICE_URL}/${MEALS_ENDPOINT}`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify({...meal, profile: infos['profile']})
				}
			);
			setIsActivating(false);

			if (status === 201) {
				updateMeal({infos: {id, profile: infos['profile'], active: false}});
				setIsActivating(false);
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

	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Parlez nous de vous</Text>
			</View>
			<View style={globalStyles.creationBody}>
				{isActivating ? (<Message firstText={message}/>) : (
					<>
						<View
							style={[globalStyles.creationBodyContent, {paddingTop: 30, paddingBottom: 0}]}>
							<View>
								<Text style={globalStyles.fieldFont}>Votre prénom</Text>
								<View
									style={[globalStyles.creationBodyFieldGroup, errors?.profile?.firstName ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
									<Controller
										name="profile.firstName"
										control={control}
										defaultValue={meal?.profile?.firstName}
										rules={{
											required: true,
										}}
										render={({field: {onChange, onBlur, value}}) => (
											<TextInput
												style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="Exemple: Jean paul"
											/>
										)}
									/>
								</View>
								{errors?.profile?.firstName &&
                                <Text style={globalStyles.error}>Cette donnée est requise</Text>}
							</View>
							<View>
								<Text style={globalStyles.fieldFont}>Votre nom</Text>
								<View
									style={[globalStyles.creationBodyFieldGroup, errors?.profile?.lastName ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
									<Controller
										name="profile.lastName"
										control={control}
										defaultValue={meal?.profile?.lastName}
										rules={{
											required: true,
										}}
										render={({field: {onChange, onBlur, value}}) => (
											<TextInput
												style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="Exemple: KAMGUIA"
											/>
										)}
									/>
								</View>
								{errors?.profile?.lastName &&
                                <Text style={globalStyles.error}>Cette donnée est requise</Text>}
							</View>
							<View>
								<Text style={globalStyles.fieldFont}>Votre téléphone</Text>
								<View
									style={[globalStyles.creationBodyFieldGroup, errors?.profile?.phone ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
									<Controller
										name="profile.phone"
										control={control}
										defaultValue={meal?.profile?.phone}
										rules={{
											required: true,
											validate: (value) => isValidPhoneNumber(value)
										}}
										render={({field: {onChange, onBlur, value}}) => (
											<TextInput
												style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												keyboardType="numeric"
												maxLength={10}
												placeholder="Exemple: 0615020608"
											/>
										)}
									/>
								</View>
								{errors?.profile?.phone &&
                                <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
							</View>
						</View>
						<BottomBar
							stepIndex={stepIndex}
							nextDisabled={!isValid}
							previousStep={previousStep}
							nextStep={handleSubmit(onSubmit)}
						/>
					</>
				)}
			</View>
		</View>
	)
}

export default MealProvider;
