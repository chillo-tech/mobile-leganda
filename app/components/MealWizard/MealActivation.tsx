import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import Button from '../Components/Button';
import axios from 'axios';
import {ACCOUNT_ENDPOINT, BACKOFFICE_URL, MEALS_ENDPOINT} from '../../utils/Endpoints';
import Message from '../Components/Message';
import BottomBar from '../tabs/BottomBar';

function MealActivation() {
	const {stepIndex, previousStep, updateMeal, meal} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});
	const [isActivating, setIsActivating] = useState(false);

	const saveMeal = async () => {
		try {
			await axios(
				`${BACKOFFICE_URL}/${MEALS_ENDPOINT}`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify({...meal, profile: {...meal['profile'], active: true}})
				}
			);
			setIsActivating(false);
			updateMeal({meal});
		} catch (e) {
			console.log(e)
		}
	}

	const onSubmit = async (data) => {
		setIsActivating(true);
		try {
			const {status} = await axios(
				`${BACKOFFICE_URL}/${ACCOUNT_ENDPOINT}/activate`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify({phone: meal?.profile?.phone, ...data})
				}
			);
			saveMeal();
		} catch (e) {
			console.log(e)
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
	return (
		isActivating ? (<Message firstText="Un instant nous vérifions votre numéro"/>) :
			(
				<View style={styles.container}>
					<View style={{marginBottom: 20}}>
						<Text style={[globalStyles.inputTitle, {textAlign: 'center'}]}>
							Confirmez votre numéro de téléphone</Text>
						<Text style={[globalStyles.textBlue, {fontSize: 15, marginVertical: 5, textAlign: 'center'}]}>
							Nous vous avons transmis un code par sms
						</Text>
						<Text style={[globalStyles.textBlue, {fontSize: 15, textAlign: 'center'}]}>
							Veuillez saisir ce code dans le champ ci dessous
						</Text>
					</View>
					<View>
						<View
							style={[globalStyles.inputGroup, errors.token ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
							<Controller
								name="token"
								control={control}
								rules={{
									required: true,
									pattern: /\d{6}/
								}}
								render={({field: {onChange, onBlur, value}}) => (
									<TextInput
										style={[globalStyles.fieldFont, globalStyles.inputField]}
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
						{errors.token && <Text style={globalStyles.error}>Le code sasi est invalide</Text>}
					</View>
					<Button onPress={handleSubmit(onSubmit)}/>
				</View>)

	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between'
	}
})
export default MealActivation;
