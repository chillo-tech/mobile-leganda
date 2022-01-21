import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { globalStyles } from '../../utils/Styles';
import BottomBar from '../tabs/BottomBar';

function MealDescription() {
	const {state: {creationWizard: {stepIndex, meal}}, updateMeal, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = infos => updateMeal({infos});
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Veuillez présenter, </Text>
				<Text style={globalStyles.creationTitle}>votre plat </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent, {paddingVertical: 30}]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.description ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							control={control}
							defaultValue={meal["description"]}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									style={[
										globalStyles.fieldFont,
										globalStyles.creationBodyField,
										errors.description ? globalStyles.inputGroupError : globalStyles.inputGroupDefault
									]}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="Quels sont les ingrédients de votre plat ?"
									numberOfLines={4}
									multiline
								/>
							)}
							name="description"
						/>
					</View>
					{errors.description && <Text style={globalStyles.error}>Cette donnée est requise.</Text>}
				</View>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!isValid}
					previousStep={previousStep}
					nextStep={handleSubmit(onSubmit)}
				/>
			</View>
		</View>
	);
}

export default MealDescription;
