import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors, globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import axios from 'axios';
import {ADDRESS_ENDPOINT, BACKOFFICE_URL} from '../../utils/Endpoints';
import BottomBar from '../tabs/BottomBar';

function MealAddress() {
	const url = `${BACKOFFICE_URL}/${ADDRESS_ENDPOINT}`;
	const [searchResults, setSearchResults] = useState([]);
	const {updateMeal, meal, stepIndex, previousStep} = useContext<any>(ApplicationContext);
	const [query, setQuery] = useState("");
	const [errors, setErrors] = useState({});
	const [address, setAddress] = useState();

	useEffect(() => {
		setQuery(meal?.address?.street || '');
	}, [])
	const setSelectedAddress = (selectedAddress: any) => {
		delete selectedAddress["id"];
		setAddress(selectedAddress);
		updateMeal({
			data: {
				address: selectedAddress
			}
		})
		setSearchResults([]);
	}
	const cleanString = (entry: string) => {
		return entry ? entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : '';
	}
	const onChange = async (queryParam: string) => {
		setQuery(queryParam);
		if (queryParam.length) {
			try {
				const {data} = await axios(
					`${url}?query=${queryParam}`,
					{
						headers: {
							'X-Requested-With': 'XMLHttpRequest',
							"Content-Type": "application/x-www-form-urlencoded",
							Accept: "application/json"
						},
					});
				if (data.length) {
					setSearchResults(data);
				} else {
					setSearchResults([]);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
	const onSubmit = () => {
		if (typeof address === 'undefined') {
			setErrors({...errors, date: true});
			return;
		}

		if (meal?.address?.street) {
			updateMeal({
				data: {
					address: meal?.address?.street
				}
			});
		}
	};
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quelle est</Text>
				<Text style={globalStyles.creationTitle}>votre adresse ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent]}>
					<View
						style={[globalStyles.creationBodyFieldGroup]}>
						<TextInput
							style={[globalStyles.fieldFont, globalStyles.creationBodyField]}
							onChangeText={onChange}
							value={query || ''}
							placeholder="Exemple: 10 rue dalby, 56000 Vannes"
						/>
					</View>
					{
						searchResults.length ? (
							<FlatList
								keyboardShouldPersistTaps="always"
								data={searchResults}
								renderItem={({item}) =>
									<TouchableOpacity
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
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!address}
					previousStep={previousStep}
					nextStep={onSubmit}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between'
	},
	inputField: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 0
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
		color: colors.gray,
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 18,
	}
})
export default MealAddress;
