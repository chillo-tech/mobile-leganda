import React, {useContext, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {ADDRESS_ENDPOINT, ADS_ENDPOINT, BACKOFFICE_URL, cleanString, colors, globalStyles, GOOGLE_PACES_API_BASE_URL, GOOGLE_PACES_API_KEY, GOOGLE_PACES_CENTER_COORDINATES} from '../../utils';
import BottomBar from '../tabs/BottomBar';
import {SecurityContext} from '../../context/SecurityContextProvider';
import Message from '../messages/Message';

function AdAddress() {
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
	const [address, setAddress] = useState();
	const [isActivating, setIsActivating] = useState(false);

	useEffect(() => {
		setQuery(ad?.address?.street || '');
	}, [])

	const setSelectedAddress = async (selectedLocation: any) => {
    const {place_id, formatted_address, geometry: {location}} = selectedLocation;
    if (place_id.length) {
      try {
        setAddress({
          street: formatted_address,
          location: {
            type: 'Point',
            coordinates: [
                location.lng,
                location.lat
            ]
        }})
        setQuery(cleanString(formatted_address));
        setSearchResults([]);

      } catch (error) {
        console.log(error);
      }
    }
	}

  const onInputChange =  async (queryParam: string) => {
    setQuery(queryParam);
    setAddress(undefined);
		if (queryParam.length) {
      try {
        const queryParams = {
          query: queryParam, 
          key: GOOGLE_PACES_API_KEY, 
          radius: '50',
          language: 'fr',
          fields: 'formatted_address',
          origin: `${authenticatedUserCoordinates[1]},${authenticatedUserCoordinates[0]}`
        };
        const params =  new URLSearchParams(queryParams);
        const response = await fetch(`${GOOGLE_PACES_API_BASE_URL}/textsearch/json?${params}`);
        const { results } = await response.json();
				setSearchResults(results);
      } catch (error) {
        
      }
    }
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

	const onSubmit = async () => {
		try {
			setIsActivating(true);
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
									onChangeText={onInputChange}
									value={query || ''}
									placeholder="Exemple: 10 rue dalby, 56000 Vannes"
									
								/>
							</View>
							{
                searchResults.length ? (
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    data={searchResults ? searchResults.sort(function (a, b) {
                      if (cleanString(a.formatted_address).toLowerCase().length < cleanString(b.formatted_address).toLowerCase().length) return -1;
                      if (cleanString(a.formatted_address).toLowerCase().length > cleanString(b.formatted_address).toLowerCase().length) return 1;
                      return 0;
                    }) : []}
                    renderItem={({item}) =>
                      <TouchableOpacity
                        key={item.place_id}
                        style={styles.resultItem}
                        onPress={() => setSelectedAddress(item)}>

                        <Text
                          style={styles.resultItemFirstText}>{cleanString(item.formatted_address.substring(0, item.formatted_address.indexOf(',')))}</Text>

                        <Text
                          style={styles.resultItemSecondText}>{cleanString(item.formatted_address.substring(item.formatted_address.indexOf(',') + 1))}</Text>

                      </TouchableOpacity>
                    }
                    keyExtractor={({place_id}) => {
                      return place_id
                    }}
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
