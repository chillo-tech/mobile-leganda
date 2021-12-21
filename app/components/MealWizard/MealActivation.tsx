import React, {useContext, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import axios from 'axios';
import {BACKOFFICE_URL, MEALS_ENDPOINT} from '../../utils/Endpoints';
import Message from '../messages/Message';
import BottomBar from '../tabs/BottomBar';

function MealActivation() {
	const {state: {creationWizard: {stepIndex, meal}}, updateMeal, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});
	const [isActivating, setIsActivating] = useState(false);

	const handleAlertAction = (button) => {
	}
	const onSubmit = async (data) => {
		setIsActivating(true);
		try {
			await axios(
				`${BACKOFFICE_URL}/${MEALS_ENDPOINT}/activate`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify({phone: meal?.profile?.phone, itemId: meal.id, ...data})
				}
			);
			updateMeal({});
			setIsActivating(false);
		} catch (error) {
			Alert.alert(
				"Une erreur est survenue",
				error?.response?.data?.message,
				[
					{
						text: "Cancel",
						onPress: () => handleAlertAction("CANCEL"),
						style: "cancel"
					},
					{text: "OK", onPress: () => handleAlertAction("OK")}
				]
			);

			setIsActivating(false);
		}
	}
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Confirmez votre</Text>
				<Text style={globalStyles.creationTitle}>numéro de téléphone</Text>
			</View>

			<View style={globalStyles.creationBody}>
				{isActivating ? (<Message firstText="Un instant nous vérifions votre numéro"/>) : (
					<>
						<View
							style={[globalStyles.creationBodyContent]}>
							<Text style={[globalStyles.fieldFont, {
								fontSize: 15,
								marginVertical: 5,
								textAlign: 'center'
							}]}>
								Nous vous avons transmis un code par sms
							</Text>
							<Text style={[globalStyles.fieldFont, {fontSize: 15, textAlign: 'center'}]}>
								Veuillez saisir ce code dans le champ ci dessous
							</Text>
							<View
								style={[globalStyles.creationBodyFieldGroup, errors.token ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
								<Controller
									name="token"
									control={control}
									rules={{
										required: true,
										pattern: /\d{6}/
									}}
									render={({field: {onChange, onBlur, value}}) => (
										<TextInput
											style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
											onBlur={onBlur}
											onChangeText={onChange}
											value={value || ''}
											keyboardType="numeric"
											maxLength={6}
											placeholder="Exemple: 615066"
										/>
									)}
								/>
							</View>
							{errors.token && <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
						</View>
						<BottomBar
							stepIndex={stepIndex}
							nextDisabled={!isValid}
							previousStep={previousStep}
							nextStep={handleSubmit(onSubmit)}
						/>
					</>)}
			</View>
		</View>
	);
}

export default MealActivation;
