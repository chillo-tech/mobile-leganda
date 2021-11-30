import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {Controller, useForm} from 'react-hook-form';
import BottomBar from '../tabs/BottomBar';

function MealDescription() {
	const {stepIndex, previousStep, updateMeal, meal} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = data => updateMeal({data});

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

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between'
	}
})
export default MealDescription;
