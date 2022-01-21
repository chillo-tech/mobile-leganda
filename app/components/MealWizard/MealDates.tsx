import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { ApplicationContext } from '../../context/ApplicationContextProvider';
import { getFormattedDate, getFormattedTime } from '../../utils/DateFormat';
import { globalStyles } from '../../utils/Styles';
import BottomBar from '../tabs/BottomBar';

function MealDates() {
	const {state: {creationWizard: {stepIndex, meal}}, updateMeal, previousStep} = useContext(ApplicationContext);
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

	const onSubmit = () => {
		if (typeof date === 'undefined') {
			setErrors({...errors, date: true});
			return;
		}
		if (!start) {
			setErrors({...errors, start: true});
			return;
		}
		updateMeal({infos: {validity: {date, start}}});
	};
	
	useEffect(() => {
		const selectedDate = meal?.validity?.date;
		const selectedStart = meal?.validity?.start;
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
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quand vendez vous</Text>
				<Text style={globalStyles.creationTitle}>ce plat ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View>
						<Text style={globalStyles.fieldFont}>Date</Text>
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
						<Text style={globalStyles.fieldFont}>Heure</Text>
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
	);
}

export default MealDates;
