import React from 'react';
import {Alert, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles} from '../utils/Styles';
import {EMAIL, PHONE, smsDivider} from '../utils/providers';

const MoreScreen = () => {
	const handleContactPressed = async ({name}) => {
		let phoneNumber = null;
		if (name === 'sms') {
			phoneNumber = `sms:${PHONE}${smsDivider()}body=''`;
		}
		if (name === 'email') {
			phoneNumber = `mailto:${EMAIL}`;
		}
		try {
			const supported = await Linking.openURL(phoneNumber);
			if (!supported) {
				Alert.alert('Phone number is not available');
			} else {
				return Linking.openURL(phoneNumber);
			}
		} catch (e) {
		}
	}
	return (
		<View style={globalStyles.container}>
			<View style={styles.container}>
				<View>
					<View style={styles.item}>
						<Text style={styles.itemTitle}>
							Vous avez une question
						</Text>
						<Text style={styles.itemDescription}>Nous répondons 7J/7</Text>
						<TouchableOpacity onPress={() => handleContactPressed({name: 'sms'})}>
							<Text style={styles.itemPhone}>(+33) 07 61 70 57 45</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleContactPressed({name: 'email'})}>
							<Text style={styles.itemEmail}>achille.mbougueng@yahoo.fr</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.item}>
						<Text style={styles.itemTitle}>
							Recommandez
						</Text>
						<Text style={styles.itemEmail}>LE GANDA</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

export default MoreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		paddingHorizontal: 10
	},
	item: {
		marginVertical: 15,
		borderRadius: 10,
		backgroundColor: colors.white,
		paddingHorizontal: 10,
		paddingVertical: 10,
		alignContent: "center",
		alignItems: "center",
		shadowColor: colors.gray,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	itemTitle: {
		color: colors.primary,
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 5
	},
	itemDescription: {
		color: colors.primary,
		fontWeight: "normal",
		fontSize: 18,
		marginVertical: 5,
	},
	itemPhone: {
		color: colors.success,
		fontWeight: "normal",
		fontSize: 18,
		marginVertical: 5,
	},
	itemEmail: {
		color: colors.warning,
		fontWeight: "normal",
		fontSize: 18,
		marginVertical: 5,
	}
})
