import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useContext, useEffect, useState} from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {colors, getFormattedDate, getFormattedTime, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';

function AdDates() {
	const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
	const [now, setNow] = useState<Date>(new Date());
	const [date, setDate] = useState<Date>();
	const [start, setStart] = useState<Date>();
	const [errors, setErrors] = useState({});
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	const onChange = ({type}, selectedDate) => {
		setShow(false);
		if (type !== "dismissed") {
			const currentDate = selectedDate;
			setShow(Platform.OS === 'ios');
			if (mode === 'date') {
				if (currentDate.getTime() < now.getTime()) {
					setErrors({...errors, date: true})
					setDate(null);
				} else {
					setDate(currentDate);
					const udatedErrors = delete errors["date"];
					setErrors(udatedErrors);
				}
			} else {
				setStart(currentDate);
				const udatedErrors = delete errors["start"];
				setErrors(udatedErrors);
			}
		}
	};

	const showMode = (currentMode: string) => {
		setShow(true);
		setMode(currentMode);
	};

	const setRandomDate = () => {
		setDate(new Date(new Date().getFullYear(), 11, 31));
	}
	const setRandomHour = () => {
		const date = new Date();
		date.setHours(23, 58)
		setStart(date);
	}
	const onSubmit = () => {
		if (typeof date === 'undefined') {
			setErrors({...errors, date: true});
			return;
		}
		if (!start) {
			setErrors({...errors, start: true});
			return;
		}
		updateAd({infos: {validity: {date, start}}});
	};

	useEffect(() => {
		const selectedDate = ad?.validity?.date;
		const selectedStart = ad?.validity?.start;
		if (selectedDate) {
			setDate(selectedDate)
		}

		if (selectedStart) {
			const currentDate = new Date(selectedStart);
			setStart(currentDate);
		}
		setNow(new Date());
	}, []);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={globalStyles.creationContainer}
		>
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quelles sont</Text>
				<Text style={globalStyles.creationTitle}>vos disponibilités? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View>
						<View style={styles.labelButton}>
							<Text style={globalStyles.fieldFont}>Date</Text>
							<TouchableHighlight style={[styles.button]} underlayColor={'transparent'}
												onPress={setRandomDate}>
								<Text style={styles.button}>Peu importe</Text>
							</TouchableHighlight>
						</View>
						<TouchableOpacity onPress={() => showMode('date')}
										  activeOpacity={1}
										  style={[
											  globalStyles.creationBodyFieldGroup,
											  errors.hasOwnProperty('date') ?
												  globalStyles.inputGroupError :
												  globalStyles.inputGroupDefault
										  ]}
						>

							{date ?
								(
									<Text style={[globalStyles.fieldFont, globalStyles.creationBodyField]}>
										{`${getFormattedDate(date)}`}
									</Text>
								)
								: (
									<Text style={[globalStyles.placaholderFieldFont, globalStyles.creationBodyField]}>
										{`Exemple ${getFormattedDate(new Date())}`}
									</Text>
								)
							}
							{show && (
								<DateTimePicker
									minimumDate={new Date()}
									value={date ? date : new Date()}
									mode={mode}
									is24Hour={true}
									display="default"
									onChange={onChange}
								/>
							)}
						</TouchableOpacity>
						{errors.hasOwnProperty('date') &&
                        <Text style={globalStyles.error}>La date sasie est incorrecte</Text>}
					</View>
					<View>
						<View style={styles.labelButton}>
							<Text style={globalStyles.fieldFont}>Heure</Text>
							<TouchableHighlight style={[styles.button]} underlayColor={'transparent'}
												onPress={setRandomHour}>
								<Text style={styles.button}>Peu importe</Text>
							</TouchableHighlight>
						</View>
						<TouchableOpacity onPress={() => showMode('time')}
										  activeOpacity={1}
										  style={[
											  globalStyles.creationBodyFieldGroup,
											  errors.hasOwnProperty('start') ?
												  globalStyles.inputGroupError :
												  globalStyles.inputGroupDefault
										  ]}
						>
							{start ?
								(
									<Text style={[globalStyles.fieldFont, globalStyles.creationBodyField]}>
										{`${getFormattedTime(start)}`}
									</Text>
								)
								: (
									<Text style={[globalStyles.placaholderFieldFont, globalStyles.creationBodyField]}>
										{`Exemple 12:00`}
									</Text>
								)
							}
							{show && (
								<DateTimePicker
									testID="TimePicker"
									minimumDate={new Date()}
									value={date ? date : new Date()}
									mode={mode}
									is24Hour={true}
									display="default"
									onChange={onChange}
								/>
							)}
						</TouchableOpacity>
						{errors.hasOwnProperty('start') &&
                        <Text style={globalStyles.error}>Cette donnée est requise</Text>}
					</View>
				</View>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!start || !date}
					previousStep={previousStep}
					nextStep={onSubmit}
				/>
			</View>
		</View>
		</KeyboardAvoidingView>
	);
}


const styles = StyleSheet.create({
	labelButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10
	},

	button: {
		fontSize: 18,
		color: colors.warning
	}
});

export default AdDates;
