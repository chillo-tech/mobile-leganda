import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {ADDRESS_ENDPOINT, ADS_ENDPOINT, BACKOFFICE_URL, colors, globalStyles} from '../../utils';
import BottomBar from '../tabs/BottomBar';
import {SecurityContext} from '../../context/SecurityContextProvider';
import Message from '../messages/Message';

function AdAddress() {
	const url = `${BACKOFFICE_URL}/${ADDRESS_ENDPOINT}`;
	const message = "Un instant nous vérifions votre annonce.";
	const {protectedAxios} = useContext(SecurityContext);
	const {state, updateAd, previousStep} = useContext(ApplicationContext);
	const {
		authenticatedUser,
		creationWizard: {stepIndex, ad}
	} = state;
	const {location: {coordinates: authenticatedUserCoordinates}} = authenticatedUser;
	const [searchResults, setSearchResults] = useState([]);
	const [query, setQuery] = useState("");
	const [errors, setErrors] = useState({});
	const [address, setAddress] = useState();
	const [isActivating, setIsActivating] = useState(false);

	useEffect(() => {
		setQuery(ad?.address?.street || '');
	}, [])
	const setSelectedAddress = (selectedAddress: any) => {
		delete selectedAddress["id"];
		setAddress(selectedAddress);
		setQuery(selectedAddress?.street);
		setSearchResults([]);
	}
	const cleanString = (entry: string) => {
		return entry ? entry.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : '';
	}
	const onChange = async (queryParam: string) => {
		setQuery(queryParam);
		if (queryParam.length) {
			try {
				const {data} = await protectedAxios.get(
					ADDRESS_ENDPOINT,
					{
						params: {
							proximity: `${authenticatedUserCoordinates[0]},${authenticatedUserCoordinates[1]}`,
							query: queryParam
						}
					}
				);
				setSearchResults(data);
			} catch (error) {
			}
		}
	}
	const oldonSubmit = () => {
		if (typeof address === 'undefined') {
			setErrors({...errors, date: true});
			return;
		}

		if (ad?.address?.street) {
			updateAd({
				data: {
					address: ad?.address?.street
				}
			});
		}
	};

	const onSubmit = async () => {
		try {
			const finalAd = {
				...ad,
				address,
				active: true,
			}
			await protectedAxios.post(
				ADS_ENDPOINT,
				finalAd
			);
			setIsActivating(false);
			updateAd(finalAd);
		} catch (error) {
			Alert.alert(
				"Une erreur est survenue",
				error?.response?.data?.message,
				[
					{text: "OK"}
				]
			);
			setIsActivating(false);
		}
	}

	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Quelle est</Text>
				<Text style={globalStyles.creationTitle}>votre adresse ? </Text>
			</View>
			<View style={globalStyles.creationBody}>
				{isActivating ? (<Message firstText={message}/>) : (
					<>
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
						<BottomBar
							nextLabel="Enregistrer"
							stepIndex={stepIndex}
							nextDisabled={!address}
							previousStep={previousStep}
							nextStep={onSubmit}
						/>
					</>
				)}
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
		color: colors.lightgray,
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 18,
	}
})
export default AdAddress;
