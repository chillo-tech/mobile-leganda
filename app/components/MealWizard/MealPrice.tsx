import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import BottomBar from '../tabs/BottomBar';

function MealPrice() {
	const {stepIndex, previousStep, updateMeal, meal} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = data => updateMeal({data});
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Combien coûte </Text>
				<Text style={globalStyles.creationTitle}>un plat ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.price ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							name="price"
							control={control}
							defaultValue={meal["price"]}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									keyboardType="numeric"
									placeholder="Exemple 30"
								/>
							)}
						/>
						<Text style={[globalStyles.fieldIcon]}>€</Text>
					</View>
					{errors.price && <Text style={globalStyles.error}>Cette donnée est requise</Text>}
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
export default MealPrice;
