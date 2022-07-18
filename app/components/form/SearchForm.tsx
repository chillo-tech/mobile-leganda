import {AntDesign, EvilIcons, FontAwesome5} from '@expo/vector-icons';
import React, {useContext, useState} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {colors} from '../../utils';

const SearchForm = ({navigation}) => {
	const {
		state,
		updateSearchCriteria
	} = useContext(ApplicationContext);
	const {authenticatedUser, searchCriteria} = state;
	const {location: criteriaLocation} = searchCriteria;

	const selectedCityName = () => {
		let name = 'Choisir une ville';
		if (authenticatedUser.street) {
			name = authenticatedUser.street;
		}
		if (searchCriteria.street) {
			name = searchCriteria.street;
		}

		return name.split(',').map((item: string) => item.trim()).splice(0, 2).join(', ');
	}
	const [selectedcity, setSelectedCity] = useState(selectedCityName());
	const [displayCancelButton, setDisplayCancelButton] = useState(false);
	const [query, setQuery] = useState('');

	const updateCity = () => {
		navigation.push(
			"location-search",
			{
				title: 'Indiquez votre ville',
				subtitle: 'elle permet de proposer des lieux proche',
				buttonLabel: 'Rechercher',
				placeholder: 'Recherchez votre ville',
				nextPage: 'ads',
				cancellable: true,
				userLocation: false
			}
		);
	}

	const handleFocus = () => {
		setDisplayCancelButton(query.length);
	}

	const handleChange = (value) => {
		const updatedValue = value || '';
		setDisplayCancelButton(updatedValue.length);
		setQuery(updatedValue);
		updateSearchCriteria({pushResults: false, query: updatedValue, page: 0})
	}

	const handleSubmit = ({nativeEvent: {text}}) => {
		const updatedValue = text || '';
		setDisplayCancelButton(false);
		setQuery(updatedValue);
		updateSearchCriteria({pushResults: false, query: updatedValue, page: 0})
		Keyboard.dismiss();
	}

	const resetQuery = () => {
		setQuery('');
		setDisplayCancelButton(false);
	}


	React.useLayoutEffect(() => {
		setSelectedCity(selectedCityName());
	}, [navigation, authenticatedUser, criteriaLocation]);


	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Découvrir</Text>
			</View>
			<View style={styles.cityContainer}>
				<View style={styles.selectedCity}>
					<FontAwesome5 name="map-marker-alt" size={18} color={colors.primary}/>
					<View style={styles.selectedCityDescription}>
						<Text style={styles.selectedCityLabel} numberOfLines={1}>
							{
								selectedcity.length > 32
									? `${selectedcity.substring(0, 30)}...`
									: selectedcity
							}
						</Text>
						<Text style={styles.selectedCityDistance}>A moins de 30 Km</Text>
					</View>
				</View>
				<TouchableHighlight
					activeOpacity={0.6}
					underlayColor={colors.white}
					onPress={updateCity}>
					<View style={styles.cityWrapper}>
						<Text style={styles.city} numberOfLines={1}
							  ellipsizeMode='tail'>Changer</Text>
					</View>
				</TouchableHighlight>
			</View>
			<View style={styles.filterContainer}>
				<EvilIcons name="search" size={24} color={colors.primary}/>
				<TextInput
					placeholder="Plats, boissons, restaurants, ..."
					onSubmitEditing={handleSubmit}
					onChangeText={handleChange}
					onFocus={handleFocus}
					value={query}
					style={styles.filterInput}/>
				{
					displayCancelButton ?
						<TouchableHighlight onPress={resetQuery}>
							<AntDesign name="closecircle" size={24} color={colors.primary}/>
						</TouchableHighlight>
						: null
				}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	filterContainer: {
		backgroundColor: colors.white,
		borderRadius: 10,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: colors.primary,
		paddingHorizontal: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	filterInput: {
		color: colors.primary,
		marginHorizontal: 5,
		paddingVertical: 5,
		fontSize: 16,
		paddingHorizontal: 5,
		flexGrow: 1
	},
	cityWrapper: {
		backgroundColor: colors.lightgray,
		paddingHorizontal: 20,
		paddingVertical: 5,
		borderRadius: 10
	},
	city: {
		fontSize: 12,
		color: colors.primary
	},

	cityContainer: {
		marginVertical: 5,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	selectedCity: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	selectedCityDistance: {
		fontSize: 12,
		color: colors.primary
	},
	selectedCityDescription: {
		marginLeft: 10
	},
	selectedCityLabel: {
		fontSize: 14,
		color: colors.primary,
		fontWeight: 'bold',
	},
	container: {
		backgroundColor: colors.white,
		paddingTop: 40,
		paddingBottom: 5,
		paddingHorizontal: 10,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18
	}
})
export default SearchForm;
