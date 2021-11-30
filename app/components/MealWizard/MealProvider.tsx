import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {isValidPhoneNumber} from '../../utils/isValidPhoneNumber';
import BottomBar from '../tabs/BottomBar';
import axios from 'axios';
import {ACCOUNT_ENDPOINT, BACKOFFICE_URL} from '../../utils/Endpoints';

function MealProvider() {
	const {stepIndex, previousStep, updateMeal, meal} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});

	const onSubmit = async (data) => {
		try {
			const {status} = await axios(
				`${BACKOFFICE_URL}/${ACCOUNT_ENDPOINT}/add-profile`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(data["profile"])
				}
			);
			if (status === 201) {
				updateMeal({data: {...data, profile: {...data["profile"], active: false}}});
			}
		} catch (e) {
		}
	}

	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Parlez nous de vous</Text>
			</View>
			<View style={globalStyles.creationBody}>
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
			</View>
		</View>

	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between'
	}
})
export default MealProvider;
