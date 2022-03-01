import {MaterialIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, {useContext, useState} from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	View
} from 'react-native';
import BackButton from '../../components/buttons/BackButton';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {ADDRESS_ENDPOINT, BACKOFFICE_URL, cleanString, colors, globalStyles} from '../../utils';
import {SecurityContext} from '../../context/SecurityContextProvider';


function LocationSearchScreen({navigation, route}) {
	const {params} = route;
	const {protectedAxios} = useContext(SecurityContext);
	const {state, updateUserInfos, updateSearchCriteria} = useContext<any>(ApplicationContext);
	const {authenticatedUser, searchCriteria} = state;
	const url = `${BACKOFFICE_URL}/${ADDRESS_ENDPOINT}`;
	const [searchButtonVisible, setSearchButtonVisible] = useState(true);
	const [authenticatedUserCoordinates, setAuthenticatedUserCoordinates] = useState({});
	const [locationVisible, setLocationVisible] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [location, setLocation] = useState({});
	const [query, setQuery] = useState(searchCriteria?.location?.street);

	const setSelectedAddress = (selectedLocation: any) => {
		setQuery(cleanString(selectedLocation.street.split(/,(.+)/)[0]));
		setLocation({
			street: selectedLocation.street,
			location: selectedLocation.coordinates
		});
		setSearchResults([]);
		setSearchButtonVisible(true)
	}

	const onChange = async (queryParam: string) => {
		setQuery(queryParam);
		setSearchButtonVisible(false);
		if (queryParam.length) {
			try {
				const {data} = await protectedAxios.get(
					url,
					{
						params: {
							proximity: `${authenticatedUserCoordinates[0]},${authenticatedUserCoordinates[1]}`,
							query: queryParam,
							types: 'place'
						}
					});

				setSearchResults(data);
			} catch (error) {

			}
		}
	}

	const getUserLocation = async () => {
		let {status} = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'Permettez nous de vous localiser',
				'Cliquez que OK pour permettre votre localisation.',
				[{text: 'OK'}],
				{cancelable: false}
			);
		}

		try {
			setLocationVisible(false);
			const {coords} = await Location.getCurrentPositionAsync({accuracy: 6});
			if (coords) {
				const {latitude, longitude} = coords;
				const response = await Location.reverseGeocodeAsync({latitude, longitude});
				for (let item of response) {
					const selectedLocation = {
						street: item.city,
						location: {
							coordinates: [longitude, latitude],
							type: "Point"
						}
					}
					setLocation(selectedLocation);
					setQuery(item.city);
				}
			}

			setLocationVisible(true);
			setSearchResults([]);
			setSearchButtonVisible(true)
		} catch (error) {
			setLocationVisible(true);
		}
	}

	const startSearch = async () => {
		updateSearchCriteria({
			pushResults: false,
			page: 0,
			...location
		})
		if (params.userLocation) {
			updateUserInfos(location);
		}

		navigation.navigate({
			name: params.nextPage,
			merge: true
		});
	}

	React.useLayoutEffect(() => {
		setQuery('');
		if (authenticatedUser) {
			const {location} = authenticatedUser;
			if (location) {
				const {coordinates: coordinatesToSave} = location;
				setAuthenticatedUserCoordinates(coordinatesToSave);
			}
		}
	}, [navigation]);

	return (
		<LinearGradient
			start={{x: 0, y: 0}}
			end={{x: 1, y: 1}}
			colors={[colors.warning, colors.primary]}
			style={styles.container}
		>
			<View style={[styles.container]}>
				<View style={styles.pageDescription}>
					<View/>
					<View>
						<Text style={styles.pageDescriptionText}>{params?.title}</Text>
						<Text style={styles.pageDescriptionText}>{params?.subtitle}</Text>
					</View>
					{Boolean(params.cancellable) ?
						<BackButton navigation={navigation} icon="closecircle" color={colors.primary}/> : <View/>}
				</View>
				<View style={styles.searchFormContainer}>
					<View>
						<View
							style={[globalStyles.creationBodyFieldGroup]}>
							<TextInput
								style={[globalStyles.fieldFont, globalStyles.creationBodyField, styles.searchFormUserPositionText]}
								onChangeText={onChange}
								onFocus={() => setSearchButtonVisible(false)}
								value={query || ''}
								placeholder={params.placeholder}
							/>
						</View>
						{
							locationVisible ? (
									<TouchableHighlight underlayColor={colors.white}
														style={styles.searchFormUserPosition}
														onPress={getUserLocation}>
										<>
											<MaterialIcons name="my-location" size={16} color={colors.primary}/>
											<Text style={styles.searchFormUserPositionText}>Utiliser ma position
												actuelle</Text>
										</>
									</TouchableHighlight>
								) :
								(
									<View
										style={styles.searchFormUserPosition}>
										<ActivityIndicator color={colors.primary}/>
									</View>
								)
						}

						{searchButtonVisible ?
							<TouchableHighlight underlayColor={colors.warning} style={globalStyles.button}
												onPress={startSearch}>
								<Text style={globalStyles.buttonText}>{params?.buttonLabel}</Text>
							</TouchableHighlight>
							: null
						}
					</View>
					{
						searchResults.length ? (
							<FlatList
								keyboardShouldPersistTaps="always"
								data={searchResults ? searchResults.sort(function (a, b) {
									if (cleanString(a.street.split(/,(.+)/)[0]).toLowerCase().length < cleanString(b.street.split(/,(.+)/)[0]).toLowerCase().length) return -1;
									if (cleanString(a.street.split(/,(.+)/)[0]).toLowerCase().length > cleanString(b.street.split(/,(.+)/)[0]).toLowerCase().length) return 1;
									return 0;
								}) : []}
								renderItem={({item}) =>
									<TouchableOpacity
										key={item.id}
										style={styles.resultItem}
										onPress={() => setSelectedAddress(item)}>

										<Text
											style={styles.resultItemFirstText}>{cleanString(item.street.split(/,(.+)/)[0])}</Text>

										<Text
											style={styles.resultItemSecondText}>{cleanString(item.street.split(/,(.+)/)[1])}</Text>

									</TouchableOpacity>
								}
								keyExtractor={(item) => item.id}
								style={styles.searchResultsContainer}
							/>
						) : null
					}
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	pageDescription: {
		paddingHorizontal: 10,
		backgroundColor: colors.white,
		paddingTop: 50,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	pageDescriptionText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
		color: colors.primary
	},
	container: {
		flex: 1,
		justifyContent: 'space-between'
	},
	searchResultsContainer: {
		backgroundColor: colors.white,
	},
	resultItem: {
		paddingVertical: 13,
		paddingHorizontal: 5,
		borderBottomWidth: 1,
		borderBottomColor: "#EDEDEDFF"
	},
	resultItemFirstText: {
		padding: 0,
		margin: 0,
		fontSize: 16,
		fontWeight: '600',
		lineHeight: 18,
		marginBottom: 5,
		color: colors.primary
	},
	resultItemSecondText: {
		padding: 0,
		margin: 0,
		color: colors.lightgray,
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 18,
	},
	searchFormContainer: {
		backgroundColor: colors.white,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	searchFormUserPosition: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginBottom: 15
	},
	searchFormUserPositionText: {
		marginLeft: 5,
		color: colors.primary,
		textAlign: 'center',
		fontSize: 16
	},
	searchFormSearch: {
		backgroundColor: colors.warning,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		borderRadius: 10
	},
	searchFormSearchText: {
		color: colors.white
	}
});
export default LocationSearchScreen;
