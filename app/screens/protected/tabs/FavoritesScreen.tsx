import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Message from '../../../components/messages/Message';
import {ApplicationContext} from '../../../context/ApplicationContextProvider';
import {ADS_ENDPOINT, globalStyles} from '../../../utils';
import AdItem from '../../../components/ad-item/adItem';
import {SecurityContext} from '../../../context/SecurityContextProvider';
import FavoritesEmpty from '../favorites/FavoritesEmpty';

function SearchScreen({route, navigation}) {
	const url = `${ADS_ENDPOINT}/search`;
	const [active, setActive] = useState(true);
	const [favorites, setFavorites] = useState([]);
	const {
		state,
		updateAds,
		updateSelectedItemId,
		updateSearchCriteria
	} = useContext(ApplicationContext);

	const {protectedAxios} = useContext(SecurityContext);
	const [isLoading, setIsloading] = useState(true);

	const displayAd = (id: string) => {
		updateSelectedItemId(id);
		navigation.push("ad-detail", {selectedId: id});
	}

	const search = async () => {
		const {authenticatedUser} = state;
		const {location: {coordinates: authenticatedUserCoordinates}} = authenticatedUser;
		try {
			const {data = []} = await protectedAxios.post(url);
			setIsloading(false);
			setFavorites(data);
		} catch (e) {
			setIsloading(false);
		}
	};
	useFocusEffect(
		React.useCallback(
			() => {
				search();
			}, [])
	);

	return (
		<View style={{flex: 1}}>
			{isLoading ?
				(
					<View style={[globalStyles.container, {justifyContent: 'center'}]}>
						<Message firstText="Un instant nous recherchons des plats"/>
					</View>
				)
				:
				<View style={{flex: 1}}>
					<SafeAreaView style={[globalStyles.container]}>
						{
							favorites.length ?
								(
									<FlatList
										contentContainerStyle={styles.searchResultsContainer}
										scrollEventThrottle={150}
										onEndReachedThreshold={2}
										data={favorites}
										keyExtractor={(item, index) => `${item.id}-${index}`}
										renderItem={({item}) => (
											<AdItem ad={item} displayAd={displayAd}/>
										)}
									/>
								)
								: (
									<FavoritesEmpty navigation={navigation}/>
								)
						}

					</SafeAreaView>
				</View>
			}
		</View>);
}

const styles = StyleSheet.create({
	searchResultsContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	}
});
export default SearchScreen;
