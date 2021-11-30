import React from 'react';
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {colors} from '../../utils/Styles';

const BottomBar = ({
					   stepIndex,
					   previousStep,
					   nextStep,
					   nextDisabled,
					   previousDisabled = false,
					   previousLabel = "Retour",
					   nextLabel = "Suivant"
				   }) => {
	return (
		<View style={styles.container}>
			{stepIndex != 0 ? (
				<TouchableHighlight style={[styles.button]} underlayColor={'transparent'} onPress={previousStep}>
					<Text style={styles.previousButtonLabel}>{previousLabel}</Text>
				</TouchableHighlight>
			) : <View/>}

			<TouchableOpacity
				style={[
					styles.nextButton,
					styles.button,
					nextDisabled ? styles.nextButtonInActive : styles.nextButtonActive
				]}
				onPress={nextStep}
				disabled={nextDisabled}
				activeOpacity={1}
			>
				<Text style={[
					styles.nextButtonLabel,
					nextDisabled ? styles.nextButtonInActiveLabel : styles.nextButtonActiveLabel
				]}>{nextLabel}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default BottomBar;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 10,
		borderRadius: 5,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	nextButton: {
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	nextButtonActive: {
		backgroundColor: colors.warning,
	},
	nextButtonInActive: {
		backgroundColor: "#eeeeee",
	},
	nextButtonLabel: {
		fontSize: 18,
	},
	nextButtonActiveLabel: {
		color: colors.white
	},
	nextButtonInActiveLabel: {
		color: "#000000"
	},
	previousButtonLabel: {
		fontSize: 18,
		color: colors.gray,
		borderBottomWidth: 1
	}
})
