import {StyleSheet} from 'react-native';

export const colors = {
	success: '#146608',
	primary: '#30698C',
	error: '#F22727',
	gray: "#333333",
	warning: "#F2785C",
	white: "#ffffff",
}

export const globalStyles = StyleSheet.create({
	container: {
		width: '100%',
		marginTop: 0,
		backgroundColor: "#f6ece7",
		flex: 1,
		flexDirection: 'column',
		fontFamily: 'roboto'
	},
	error: {
		color: colors.error,
		fontSize: 18,
		marginBottom: 20
	},
	inputField: {
		paddingVertical: 15,
		paddingHorizontal: 0,
		width: '100%'
	},
	inputGroupDefault: {
		marginBottom: 20,
	},
	inputGroupError: {
		borderBottomWidth: 1,
		borderColor: colors.error,
	},
	inputGroup: {
		borderBottomWidth: 1,
		borderColor: colors.primary,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputIcon: {
		textAlign: 'center',
		padding: 10,
		width: 40,
		height: 40,
		backgroundColor: colors.gray,
		borderTopLeftRadius: 11,
		borderBottomLeftRadius: 11,
		display: 'none'
	},
	inputTextarea: {
		borderBottomWidth: 1,
		borderColor: colors.primary
	},
	inputTextAreaPadding: {
		paddingTop: 20,
		paddingBottom: 20,
	},
	inputTitle: {
		fontWeight: '700',
		fontSize: 20,
		color: colors.primary
	},
	textBlue: {
		color: colors.primary
	},
	creationContainer: {
		flex: 1,
		justifyContent: 'space-between'
	},
	creationHeader: {
		paddingHorizontal: 10,
		paddingBottom: 20,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	creationTitle: {
		fontSize: 30,
		color: colors.white
	},
	creationBody: {
		backgroundColor: colors.white,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
	},
	creationBodyContent: {
		paddingHorizontal: 10,
		paddingVertical: 60
	},
	creationBodyFieldGroup: {
		borderColor: "#cccccc",
		borderRadius: 5,
		marginVertical: 10,
		borderWidth: 2,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden'
	},
	creationBodyField: {
		flexGrow: 1,
		paddingVertical: 10,
		paddingLeft: 10
	},
	fieldFont: {
		fontStyle: 'normal',
		fontSize: 20,
		color: "#000000",
	},
	fieldIcon: {
		fontSize: 20,
		color: "#000000",
		paddingHorizontal: 10
	},
})
