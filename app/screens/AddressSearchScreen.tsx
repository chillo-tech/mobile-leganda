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
import {colors, globalStyles} from '../utils/Styles';
import axios from 'axios';
import {ADDRESS_ENDPOINT, BACKOFFICE_URL} from '../utils/Endpoints';
import {ApplicationContext} from '../context/ApplicationContextProvider';
import BackButton from '../components/buttons/BackButton';
import {LinearGradient} from 'expo-linear-gradient';
import {MaterialIcons} from '@expo/vector-icons';
import * as Location from 'expo-location';

function AddressSearchScreen({navigation}) {
	const {state: {searchCriteria}, updateSearchCriteria} = useContext<any>(ApplicationContext);
	const url = `${BACKOFFICE_URL}/${ADDRESS_ENDPOINT}`;
	const [searchButtonVisible, setSearchButtonVisible] = useState(true);
	const [locationVisible, setLocationVisible] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [query, setQuery] = useState(searchCriteria?.address?.street);

	const cleanString = (entry: string) => {
		return entry ? entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : '';
	}

	const setSelectedAddress = (selectedAddress: any) => {
		setQuery(cleanString(selectedAddress.street.split(/,(.+)/)[0]));
		updateSearchCriteria({
			pushResults: false,
			page: 0,
			address: selectedAddress
		})
		setSearchResults([]);
		setSearchButtonVisible(true)
	}

	const onChange = async (queryParam: string) => {
		setQuery(queryParam);
		setSearchButtonVisible(false);
		if (queryParam.length) {
			try {
				const {data} = await axios(
					`${url}?query=${queryParam}&types=place`,
					{
						headers: {
							'X-Requested-With': 'XMLHttpRequest',
							"Content-Type": "application/x-www-form-urlencoded",
							Accept: "application/json"
						},
					});
				setSearchResults(data);
			} catch (error) {
				Alert.alert(
					"Une erreur est survenue",
					error?.response?.data?.message,
					[
						{text: "OK"}
					]
				);
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
			return;
		}

		try {
			setLocationVisible(false);
			const {coords} = await Location.getCurrentPositionAsync({accuracy: 6});
			if (coords) {
				const {latitude, longitude} = coords;
				const response = await Location.reverseGeocodeAsync({latitude, longitude});
				for (let item of response) {
					setQuery(item.city);
					updateSearchCriteria({
						pushResults: false,
						page: 0,
						address: {
							street: item.city,
							coordinates: {
								coordinates: [longitude, latitude],
								type: "Point"
							}
						}
					})
				}
			}

			setLocationVisible(true);
			setSearchResults([]);
			setSearchButtonVisible(true)
		} catch (error) {
			setLocationVisible(true);
		}
	}

	const startSearch = () => {
		navigation.navigate({
			name: 'MealsList',
			merge: true,
		});
	}

	React.useLayoutEffect(() => {
		setQuery('');
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
						<Text style={styles.pageDescriptionText}>Choisis une ville</Text>
						<Text style={styles.pageDescriptionText}>pour avoir liste de lieux</Text>
					</View>
					<BackButton navigation={navigation} icon="closecircle" color={colors.primary}/>
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
								placeholder="Choisir par ville"
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
							<TouchableHighlight underlayColor={colors.warning} style={styles.searchFormSearch}
												onPress={startSearch}>
								<Text style={styles.searchFormSearchText}>Lancer la recherche</Text>
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
		paddingBottom: 20,
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
		paddingVertical: 20,
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
export default AddressSearchScreen;
