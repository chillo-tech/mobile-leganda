import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {AD_PLACEHOLDER, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';

function AdName() {
	const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
	const {control, handleSubmit, formState: {errors, isValid}} = useForm({mode: 'onChange',});
	const onSubmit = infos => updateAd({infos});
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Donnez un nom à votre </Text>
				<Text style={globalStyles.creationTitle}>annonce </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View
						style={[globalStyles.creationBodyFieldGroup, errors.name ? globalStyles.inputGroupError : globalStyles.inputGroupDefault]}>
						<Controller
							name="name"
							control={control}
							defaultValue={ad["name"]}
							rules={{
								required: true,
							}}
							render={({field: {onChange, onBlur, value}}) => (
								<TextInput
									placeholder={`Exemple: ${AD_PLACEHOLDER[Math.floor(Math.random() * AD_PLACEHOLDER.length)]}`}
									style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
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

export default AdName;
