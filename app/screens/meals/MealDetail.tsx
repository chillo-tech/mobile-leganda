import React, {useContext, useState} from 'react'
import {Alert, Linking, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {colors, globalStyles} from '../../utils/Styles';
import {Feather, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import {phonePrefix, smsDivider} from '../../utils/providers';
import PictureDisplay from '../../components/Image/PictureDisplay';
import {useFocusEffect} from '@react-navigation/native';
import BackButton from '../../components/buttons/BackButton';

const MealDetail = ({route, navigation}) => {
	const selectedId = route.params?.selectedId;
	const {meals,} = useContext(ApplicationContext);
	const [meal, setMeal] = useState();
	const getMeal = () => {
		setMeal(meals.find(({id}) => id === selectedId))
	}

	const navigate = ({street, coordinates: {coordinates: [lat, long]}}) => {
		const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
		const url = scheme + `${lat},${long}`;
		Linking.openURL(url);


	}
	const handleContactPressed = async ({name, phone}) => {
		let phoneNumber = `${phonePrefix()}:${phone}`;
		if (name === 'sms') {
			phoneNumber = `sms:${phone}${smsDivider()}body=`;
		}
		if (name === 'whatsapp') {
			phoneNumber = `whatsapp://send?phone=${phone}&text=`;
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

	useFocusEffect(
		React.useCallback(() => {
			getMeal();
		}, [route])
	);
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: "",
			title: "",
			headerBackTitleVisible: false,
			headerTransparent: true,
			headerShadowVisible: false,
			headerLeft: () => (
				<BackButton navigation={navigation}/>
			),
		});
	}, [navigation]);
	return (
		<View style={globalStyles.container}>
			{
				meal ? (
					<View style={styles.container}>
						<ScrollView style={styles.informations}>
							<View style={styles.gallery}>
								<PictureDisplay picture={meal.pictures[0]}/>
							</View>
							<View style={styles.row}>
								<Text style={styles.profile}>
									{meal?.profile?.firstName}&nbsp; {meal?.profile?.lastName[0]}.
								</Text>
								<View style={styles.iconLabel}>
									<Text style={styles.label}>4.3</Text>
								</View>
							</View>
							<View style={styles.row}>
								<Text style={styles.name}>{meal.name}</Text>
								<Text style={styles.price}>{meal.price} €</Text>
							</View>

							<Text style={styles.description}>
								{meal?.description}
							</Text>
						</ScrollView>
						<View style={styles.contact}>
							<View style={[styles.contactItem, {alignItems: 'flex-start'}]}>
								<TouchableHighlight underlayColor={'transparent'} onPress={() => handleContactPressed({
									name: 'phone',
									phone: meal?.profile?.phone
								})}>
									<Feather name="phone" size={32} color={colors.warning}/>
								</TouchableHighlight>

							</View>
							<View style={[styles.contactItem]}>
								<TouchableHighlight underlayColor={'transparent'} onPress={() => handleContactPressed({
									name: 'sms',
									phone: meal?.profile?.phone
								})}>
									<FontAwesome5 name="sms" size={32} color={colors.primary}/>
								</TouchableHighlight>
							</View>
							<View style={[styles.contactItem, {alignItems: 'flex-end'}]}>
								<TouchableHighlight underlayColor={'transparent'}
													onPress={() => navigate(meal?.address)}>
									<FontAwesome name="map-marker" size={32} color={colors.success}/>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				) : null
			}

		</View>
	)
}

export default MealDetail

const styles = StyleSheet.create({
	gallery: {
		height: 400,
		marginBottom: 20
	},
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'space-between'
	},
	containerInner: {
		borderColor: 'red',
		borderWidth: 1
	},
	contact: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		color: colors.white,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contactItem: {
		flexGrow: 1,
		flexBasis: 0,
		alignItems: 'center',
		paddingVertical: 10,
		fontWeight: '100'
	},
	informations: {
		paddingBottom: 0,
	},
	row: {
		paddingVertical: 0,
		marginVertical: 0,
		paddingHorizontal: 10,
		display: "flex",
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: "center",
		alignItems: 'center'

	},
	profile: {
		color: colors.gray,
		fontSize: 16,
		fontWeight: "normal",
		textTransform: 'capitalize'
	},
	iconLabel: {
		textAlign: "center",
		backgroundColor: "#dddddd",
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		width: 30,
		height: 30,
	},
	label: {
		fontSize: 16,
		color: "#000000",
		textAlign: "center"
	},
	name: {
		paddingVertical: 5,
		fontSize: 24,
		fontWeight: "bold",
		textTransform: 'capitalize',
		color: colors.primary
	},
	price: {
		paddingVertical: 5,
		fontSize: 24,
		fontWeight: "bold",
		color: colors.warning,
	},
	description: {
		fontSize: 18,
		paddingHorizontal: 10,
		paddingBottom: 20,
		color: colors.gray
	},
})
