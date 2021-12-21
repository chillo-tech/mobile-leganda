import React, {useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import axios from 'axios';
import {ACCOUNT_ENDPOINT, BACKOFFICE_URL, MEALS_ENDPOINT} from '../../utils/Endpoints';


function LoginScreen() {
	const [isActivating, setIsActivating] = useState(false);
	const [message, setMessage] = useState("Un instant nous vérifions votre compte.");
	const {stepIndex, meal, previousStep, updateMeal, goToStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange'});


	const saveMeal = async (updatedData) => {
		setMessage("Un instant nous vérifions votre annonce.");
		try {
			await axios(
				`${BACKOFFICE_URL}/${MEALS_ENDPOINT}`,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					data: JSON.stringify(updatedData)
				}
			);
			setIsActivating(false);
			goToStep(stepIndex + 2);
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

	const onSubmit = async (data) => {
		setIsActivating(true);
		try {
			const {status, data: profile} = await axios(
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
			if (status === 200) {
				const updatedData = {...meal, profile}
				updateMeal({data: updatedData, goToNextStep: false});
				saveMeal(updatedData);
			}
			if (status === 201) {
				updateMeal({data: {...data, profile: {...data["profile"], active: false}}});
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
		</View>
	)
}

export default LoginScreen;
