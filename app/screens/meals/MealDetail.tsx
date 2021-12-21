import React, {useContext, useState} from 'react'
import {Alert, Linking, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {colors, globalStyles} from '../../utils/Styles';
import {AntDesign, Feather, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import {phonePrefix, smsDivider} from '../../utils/providers';
import PictureDisplay from '../../components/Image/PictureDisplay';
import {useFocusEffect} from '@react-navigation/native';
import BackButton from '../../components/buttons/BackButton';
import {getDisplayedDate, getFormattedTime} from '../../utils/DateFormat';
import axios from 'axios';
import {BACKOFFICE_URL, MEALS_ENDPOINT} from '../../utils/Endpoints';

const MealDetail = ({route, navigation}) => {
	const selectedId = route.params?.selectedId;
	const {state: {meals}} = useContext(ApplicationContext);
	const [meal, setMeal] = useState();
	const getMeal = async () => {
		setMeal(meals.find(({id}) => id === selectedId))
		const {data} = await axios(
			`${BACKOFFICE_URL}/${MEALS_ENDPOINT}/${selectedId}`,
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		setMeal(data);
	}

	const navigate = ({street, coordinates: {coordinates: [lat, long]}}) => {
		const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
		const url = `http://maps.google.com/maps?q=${long},${lat}&z=7&t=h`;
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
									<View style={styles.label}>
										<AntDesign name="eye" size={20} color={colors.darkgray}/>
										<Text>{meal.views ? meal.views : 0}</Text>
									</View>
								</View>
							</View>
							<View style={styles.row}>
								<Text style={styles.name}>{meal.name}</Text>
								<Text style={styles.price}>{meal.price} €</Text>
							</View>
							{
								meal?.validity?.date ?
									(
										<View style={styles.row}>
											<Text
												style={styles.profile}>
												{getDisplayedDate(meal?.validity?.date)}
											</Text>
											<Text
												style={styles.profile}>
												{getFormattedTime(new Date(meal?.validity?.start))}
											</Text>
										</View>
									) : null
							}
							<Text style={styles.description}>
								{meal?.description}
							</Text>
						</ScrollView>
						<View>
							<View style={styles.row}>

								<TouchableHighlight underlayColor={'transparent'}
													onPress={() => navigate(meal?.address)}>
									<Text style={[styles.profile]}>
										{meal?.address?.street}
									</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.contact}>
								<View style={[styles.contactItem, {alignItems: 'flex-start'}]}>
									<TouchableHighlight underlayColor={'transparent'}
														onPress={() => handleContactPressed({
															name: 'phone',
															phone: meal?.profile?.phone
														})}>
										<Feather name="phone" size={32} color={colors.warning}/>
									</TouchableHighlight>

								</View>
								<View style={[styles.contactItem]}>
									<TouchableHighlight underlayColor={'transparent'}
														onPress={() => handleContactPressed({
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
					</View>
				) : null
			}

		</View>
	)
}

export default MealDetail;

const styles = StyleSheet.create({
	gallery: {
		backgroundColor: colors.primary,
		height: 450,
		marginBottom: 20
	},
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'space-between'
	},
	containerInner: {},
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
		color: colors.darkgray,
		fontSize: 16,
		fontWeight: "normal",
		textTransform: 'capitalize'
	},
	iconLabel: {
		textAlign: "center",
		alignItems: 'center',
		justifyContent: 'center'
	},
	label: {
		fontSize: 14,
		color: colors.darkgray,
		textAlign: "center",
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		minWidth: 35,
		paddingHorizontal: 0
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		textTransform: 'capitalize',
		color: colors.primary
	},
	price: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.warning,
	},
	description: {
		fontSize: 18,
		paddingHorizontal: 10,
		paddingVertical: 30,
		color: colors.black
	},
})
