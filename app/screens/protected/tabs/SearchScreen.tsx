import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import SearchForm from '../../../components/form/SearchForm';
import Message from '../../../components/messages/Message';
import {ApplicationContext} from '../../../context/ApplicationContextProvider';
import {ADS_ENDPOINT, globalStyles} from '../../../utils';
import SearchEmpty from '../ads/SearchEmpty';
import AdItem from '../../../components/ad-item/adItem';
import {SecurityContext} from '../../../context/SecurityContextProvider';

function SearchScreen({route, navigation}) {
	const url = `${ADS_ENDPOINT}/search`;
	const {
		state,
		signOut,
		updateAds,
		updateSelectedItemId,
		updateSearchCriteria
	} = useContext(ApplicationContext);

	const {protectedAxios} = useContext(SecurityContext);
	let isActive = true;
	const {searchCriteria, ads} = state;
	const {query, pushResults, page, location: {coordinates}} = searchCriteria;
	const [isLoading, setIsloading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = () => {
		updateSearchCriteria({page: 0, pushResults: false});
		setRefreshing(true);
	};

	const displayAd = (id: string) => {
		updateSelectedItemId(id);
		navigation.push("ad-detail", {selectedId: id});
	}

	const search = async () => {
		const {authenticatedUser} = state;
		const authenticatedUserCoordinates = authenticatedUser?.location?.coordinates;
		const queryCoordinates = coordinates.length ? coordinates : authenticatedUserCoordinates;
		try {
			const {data: searchResult = []} = await protectedAxios.post(
				url,
				{
					coordinates: queryCoordinates,
					query,
					proximity: `${authenticatedUserCoordinates[0]},${authenticatedUserCoordinates[1]}`
				}
			);
			if (pushResults) {
				updateAds([...ads, ...searchResult]);
			} else {
				updateAds(searchResult);
			}
			setIsloading(false);
			setRefreshing(false);
		} catch (e) {
			setIsloading(false);
		}
	};

	const fetchMore = () => {
		updateSearchCriteria({pushResults: true, page: (page + 1)});
	};

	useFocusEffect(
		React.useCallback(() => {
			signOut();
			if (isActive) {
				const {authenticatedUser} = state;
				const coordinates = authenticatedUser?.location?.coordinates;
				if (coordinates) {
					search();
				} else {
					navigation.push(
						"location-search",
						{
							title: 'Indiquez votre ville',
							subtitle: 'elle permet de proposer des lieux proche',
							placeholder: 'Recherchez votre ville',
							buttonLabel: 'Valider',
							nextPage: 'Protected',
							cancellable: false,
							userLocation: true
						}
					);
				}
			}
			return () => {
				isActive = false;
			};
		}, [searchCriteria])
	);

	return (
		<View style={{flex: 1}}>
			{isLoading ?
				(
					<View style={[globalStyles.container, {justifyContent: 'center'}]}>
						<Message firstText="Un instant nous recherchons des annonces"/>
					</View>
				)
				: (
					<View style={{flex: 1}}>
						<SearchForm navigation={navigation} route={route}/>
						<SafeAreaView style={[globalStyles.container]}>
							<FlatList
								contentContainerStyle={styles.searchResultsContainer}
								scrollEventThrottle={150}
								onEndReachedThreshold={2}
								onEndReached={fetchMore}
								data={ads}
								keyExtractor={(item, index) => `${item.id}-${index}`}
								renderItem={({item}) => (
									<AdItem ad={item} displayAd={displayAd}/>
								)}
								refreshControl={
									<RefreshControl
										refreshing={refreshing}
										onRefresh={onRefresh}
									/>
								}
								ListEmptyComponent={<SearchEmpty/>}
							/>
						</SafeAreaView>
					</View>
				)}
		</View>);
}

const styles = StyleSheet.create({
	searchResultsContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10
	}
});
export default SearchScreen;
