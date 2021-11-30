import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import BottomBar from '../tabs/BottomBar';

function MealName() {
	const {stepIndex, previousStep, updateMeal, meal} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = data => updateMeal({data});
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quel est le nom </Text>
				<Text style={globalStyles.creationTitle}>de votre plat ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.name ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							name="name"
							control={control}
							defaultValue={meal["name"]}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder="Exemple: Attiéké"
								/>
							)}
						/>
					</View>
					{errors.name && <Text style={globalStyles.error}>Cette donnée est requise</Text>}
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

const styles = StyleSheet.create({})
export default MealName;
