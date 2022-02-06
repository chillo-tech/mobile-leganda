import React, {useContext, useState} from 'react'
import {
	Alert,
	Linking,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native'
import {ApplicationContext} from '../../../context/ApplicationContextProvider';
import {ADS_ENDPOINT, colors, getDisplayedDate, getFormattedTime, globalStyles} from '../../../utils';
import {AntDesign, Feather, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import {phonePrefix, smsDivider} from '../../../utils/providers';
import PictureDisplay from '../../../components/Image/PictureDisplay';
import {useFocusEffect} from '@react-navigation/native';
import BackButton from '../../../components/buttons/BackButton';
import {SecurityContext} from '../../../context/SecurityContextProvider';

const AdDetail = ({route, navigation}) => {
	const selectedId = route.params?.selectedId;
	const {protectedAxios} = useContext(SecurityContext);
	const {state: {ads}} = useContext(ApplicationContext);
	const [ad, setAd] = useState();
	const getAd = async () => {
		setAd(ads.find(({id}) => id === selectedId))
		const {data} = await protectedAxios.get(`${ADS_ENDPOINT}/${selectedId}`);
		setAd(data);
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
			getAd();
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
		<SafeAreaView style={globalStyles.container}>
			{
				ad ? (
					<SafeAreaView style={styles.container}>
						<ScrollView style={styles.informations}>
							<View style={styles.gallery}>
								<PictureDisplay picture={ad.pictures[0]}/>
							</View>
							<View style={styles.row}>
								<Text style={styles.profile}>
									{ad?.profile?.firstName}&nbsp; {ad?.profile?.lastName[0]}.
								</Text>
								<View style={styles.iconLabel}>
									<View style={styles.label}>
										<AntDesign name="eye" size={20} color={colors.darkgray}/>
										<Text>&nbsp;{ad.views ? ad.views : 0}</Text>
									</View>
								</View>
							</View>
							<View style={styles.row}>
								<Text style={styles.name}>{ad.name}</Text>
								<Text style={styles.price}>{ad.price} €</Text>
							</View>
							{
								ad?.validity?.date ?
									(
										<View style={styles.row}>
											<Text
												style={styles.profile}>
												<FontAwesome5 name="clock" color={colors.darkgray}
															  size={14}/>
												&nbsp;
												{getDisplayedDate(ad?.validity?.date)}
											</Text>
											<Text
												style={styles.profile}>
												{getFormattedTime(new Date(ad?.validity?.start))}
											</Text>
										</View>
									) : null
							}
							<View style={styles.description}>
								<Text style={styles.descriptionTitle}>Ingrédients</Text>
								<Text style={styles.descriptionBody}>{ad?.description}</Text>
							</View>
						</ScrollView>
						<TouchableHighlight underlayColor={'transparent'} onPress={() => navigate(ad?.address)}>
							<View style={styles.address}>
								<View style={styles.addressmarker}>
									<FontAwesome name="map-marker" size={18} color={colors.primary}
												 style={styles.addressicon}/>
									<Text style={styles.addresslabel}>
										{ad?.address?.street.length > 50
											? `${ad?.address?.street.substring(0, 50)}...`
											: ad?.address?.street
										}
									</Text>
								</View>
								<AntDesign name="right" size={16} color={colors.primary}/>
							</View>
						</TouchableHighlight>

						<View style={styles.contact}>
							<View style={[styles.contactItem]}>
								<TouchableHighlight underlayColor={'transparent'}
													onPress={() => handleContactPressed({
														name: 'phone',
														phone: ad?.profile?.phone
													})}>
									<Feather name="phone" size={32} color={colors.warning}/>
								</TouchableHighlight>

							</View>
							<View style={[styles.contactItem]}>
								<TouchableHighlight underlayColor={'transparent'}
													onPress={() => handleContactPressed({
														name: 'sms',
														phone: ad?.profile?.phone
													})}>
									<FontAwesome5 name="sms" size={32} color={colors.primary}/>
								</TouchableHighlight>
							</View>
							<View style={[styles.contactItem]}>
								<TouchableHighlight underlayColor={'transparent'}
													onPress={() => navigate(ad?.address)}>
									<FontAwesome name="map-marker" size={32} color={colors.success}/>
								</TouchableHighlight>
							</View>
						</View>
					</SafeAreaView>
				) : null
			}

		</SafeAreaView>
	)
}

export default AdDetail;

const styles = StyleSheet.create({
	address: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: colors.lightgray,
		borderBottomColor: colors.lightgray
	},

	contact: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: colors.lightgray
	},
	addressicon: {
		marginRight: 10
	},
	addressmarker: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	addresslabel: {
		color: colors.primary,
		fontSize: 16,
		width: '92%'
	},
	gallery: {
		backgroundColor: colors.primary,
		height: 370,
		marginBottom: 20
	},
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'space-between'
	},
	containerInner: {},

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
		marginVertical: 0,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: "center"
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
		fontSize: 22,
		fontWeight: "bold",
		textTransform: 'capitalize',
		color: colors.primary
	},
	price: {
		fontSize: 22,
		fontWeight: "bold",
		color: colors.warning,
	},
	description: {
		borderTopWidth: 1,
		borderTopColor: colors.lightgray,
		fontSize: 18,
		paddingHorizontal: 10,
		color: colors.black,
		paddingVertical: 5,
		marginVertical: 10
	},
	descriptionTitle: {
		color: colors.black,
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 10
	},
	descriptionBody: {
		fontSize: 18,
		color: colors.darkgray,
		paddingHorizontal: 10
	}
})
