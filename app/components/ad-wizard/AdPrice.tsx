import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, Text, TextInput, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';

function AdPrice() {
	const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = infos => updateAd({infos});
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={globalStyles.creationContainer}
		>
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Combien </Text>
				<Text style={globalStyles.creationTitle}>demandez vous ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.price ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							name="price"
							control={control}
							defaultValue={ad["price"]}
							rules={{
								required: true,
								pattern: /[1-9]{1,8}(?:[.]\d{1,2})?/g
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
									onBlur={onBlur}
									onChangeText={(entry) => {
										entry = entry.replace(/[^\d.-]/g, '');
										onChange(entry);
									}}
									value={value}
									keyboardType="numeric"
									placeholder="Exemple 30"
								/>
							)}
						/>
						<Text style={[globalStyles.fieldIcon]}>€</Text>
					</View>
					{errors.price && <Text style={globalStyles.error}>Cette donnée est invalide</Text>}
				</View>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!isValid}
					previousStep={previousStep}
					nextStep={handleSubmit(onSubmit)}
				/>
			</View>
		</View>
		</KeyboardAvoidingView>
	);
}

export default AdPrice;
