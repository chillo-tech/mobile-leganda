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
	View,
  Dimensions,
  StatusBar
} from 'react-native';
import BackButton from '../../components/buttons/BackButton';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {ADDRESS_ENDPOINT, BACKOFFICE_URL, cleanString, colors, globalStyles, GOOGLE_PACES_API_BASE_URL, GOOGLE_PACES_API_KEY, GOOGLE_PACES_CENTER_COORDINATES} from '../../utils';
import {SecurityContext} from '../../context/SecurityContextProvider';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import BaseScreen from './BaseScreen';

function LocationSearchScreen({navigation, route}: any) {
	const url = `${BACKOFFICE_URL}/${ADDRESS_ENDPOINT}`;
	const {params} = route;
	const {protectedAxios} = useContext(SecurityContext);
	const {state, updateUserInfos, updateSearchCriteria} = useContext<any>(ApplicationContext);
	const {authenticatedUser, searchCriteria} = state;
	const [searchButtonVisible, setSearchButtonVisible] = useState(true);
	const [authenticatedUserCoordinates, setAuthenticatedUserCoordinates] = useState({});
	const [locationVisible, setLocationVisible] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [locations, setLocations] = useState([]);
	const [location, setLocation] = useState({});
	const [zoom, setZoom] = useState(10);
	const [region, setRegion] = useState(GOOGLE_PACES_CENTER_COORDINATES);
	const [query, setQuery] = useState(searchCriteria?.location?.street);

	const setSelectedAddress = async (selectedLocation: any) => {
        setSearchResults([]);
    const {place_id, structured_formatting: {main_text}} = selectedLocation;
		setQuery(cleanString(main_text));
    
    if (place_id.length) {
      try {
        const params =  new URLSearchParams({
          key: GOOGLE_PACES_API_KEY,
          fields: 'formatted_address,geometry,place_id',
          place_id
        });
        const response = await fetch(`${GOOGLE_PACES_API_BASE_URL}/details/json?${params}`);
        const data = await response.json();
        
        const {result: {formatted_address, geometry: {location}}} = data; 
        setLocation({
          street: formatted_address,
          location: {
            type: 'Point',
            coordinates: [
                location.lng,
                location.lat
            ]
        }
        });
        setSearchResults([]);
        setLocations([ {latlng: {latitude: location.lat, longitude: location.lng}}]);
        setRegion({
          ...region,
          latitude: location.lat,
          longitude: location.lng
        });
        setZoom(12);
        setSearchButtonVisible(true);

      } catch (error) {
        console.log(error);
      }
    }
	}

  const onInputChange =  async (queryParam: string) => {
    
    setQuery(queryParam);
		setSearchButtonVisible(false);
		if (queryParam.length) {
      try {
        let queryParams = {
          input: queryParam, 
          key: GOOGLE_PACES_API_KEY, 
          types: '(cities)', 
          radius: '50',
          lang: 'FR',
          fields: 'formatted_address'
        }
        queryParams = Object.keys(authenticatedUserCoordinates).length ? {
          ...queryParams, 
          origin: `${authenticatedUserCoordinates[1]},${authenticatedUserCoordinates[0]}`
        }: {
          ...queryParams, 
          origin: `${GOOGLE_PACES_CENTER_COORDINATES['latitude']},${GOOGLE_PACES_CENTER_COORDINATES['longitude']}`
        };
        const params =  new URLSearchParams(queryParams);
       
        
        const response = await fetch(`${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?${params}`);
        const {predictions}  = await response.json();
        //const {place_id, structured_formatting: {main_text, secondary_text} } = predictions;
				setSearchResults(predictions);
      } catch (error) {
        console.log(error);
        
      }
    }
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
				console.log(error)
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
			query: '',
			pushResults: false,
			page: 0,
			...location
		})
		if (params.userLocation) {
			try {
				await protectedAxios.post(
					'add-address',
					location
				);
				updateUserInfos(location);
			} catch (error) {
				console.log(error)
			}
		}

		if (!params.userLocation) {
			navigation.navigate({
				name: params.nextPage,
				merge: true
			});
		}
	}

	React.useLayoutEffect(() => {
		setQuery('');
		if (authenticatedUser) {
			const {location} = authenticatedUser;
			if (location) {
				const {coordinates: coordinatesToSave} = location;
				setAuthenticatedUserCoordinates(coordinatesToSave);
				setRegion({
          ...region,
          latitude: coordinatesToSave[1],
          longitude: coordinatesToSave[0]
        });
			}
		}
	}, [navigation]);

	React.useEffect(() => {
    if (Object.keys(authenticatedUserCoordinates).length) {
      setRegion({
        ...region,
        latitude: authenticatedUserCoordinates[1],
        longitude: authenticatedUserCoordinates[0]
      });

    }
	}, [authenticatedUserCoordinates]);

	return (
    <BaseScreen isSafe={false}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[colors.warning, colors.primary]}
        style={StyleSheet.absoluteFillObject}
      >
        <MapView 
            style={StyleSheet.absoluteFillObject} 
            region={region}
            maxZoomLevel={zoom}
            provider={PROVIDER_GOOGLE}
          >
            {locations.length ? locations.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker.latlng}
                />
              )): null}
          </MapView>
        <SafeAreaView style={[styles.container]}>
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
                  onChangeText={onInputChange}
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
                    if (cleanString(a?.structured_formatting.main_text).toLowerCase().length < cleanString(b.structured_formatting.main_text).toLowerCase().length) return -1;
                    if (cleanString(a?.structured_formatting.main_text).toLowerCase().length > cleanString(b.structured_formatting.main_text).toLowerCase().length) return 1;
                    return 0;
                  }) : []}
                  renderItem={({item}) =>
                    <TouchableOpacity
                      key={item.place_id}
                      style={styles.resultItem}
                      onPress={() => setSelectedAddress(item)}>

                      <Text
                        style={styles.resultItemFirstText}>{cleanString(item.structured_formatting.main_text)}</Text>

                      <Text
                        style={styles.resultItemSecondText}>{cleanString(item.structured_formatting.secondary_text)}</Text>

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
        </SafeAreaView>
      </LinearGradient>
    </BaseScreen>
	);
}

const styles = StyleSheet.create({
	pageDescription: {
		paddingHorizontal: 10,
		backgroundColor: colors.white,
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

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 43,
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
