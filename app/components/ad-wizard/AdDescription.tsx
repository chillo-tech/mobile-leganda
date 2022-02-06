import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';

function AdDescription() {
	const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = infos => updateAd({infos});
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quelques mots</Text>
				<Text style={globalStyles.creationTitle}>sur votre annonce ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent, {paddingVertical: 30}]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.description ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							control={control}
							defaultValue={ad["description"]}
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
									placeholder="Du fait maison"
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

export default AdDescription;
