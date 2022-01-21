import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import SearchForm from '../../../components/form/SearchForm';
import MealItem from '../../../components/mealItem/MealItem';
import Message from '../../../components/messages/Message';
import { ApplicationContext } from '../../../context/ApplicationContextProvider';
import { BACKOFFICE_URL, globalStyles, MEALS_ENDPOINT } from '../../../utils';
import SearchEmpty from '../meals/SearchEmpty';

function SearchScreen({route, navigation}) {
	const url = `${BACKOFFICE_URL}/${MEALS_ENDPOINT}/search`;
	const {
		state,
		updateMeals,
		updateSelectedItemId,
		updateSearchCriteria
	} = useContext(ApplicationContext);
  let isActive = true;
	const {searchCriteria, meals} = state;
	const {query, pushResults, page, size, location: {coordinates}} = searchCriteria;
	const [isLoading, setIsloading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = () => {
		updateSearchCriteria({page: 0, pushResults: false});
		setRefreshing(true);
	};

	const displayMeal = (id: string) => {
		updateSelectedItemId(id);
		navigation.push("MealDetail", {selectedId: id});
	}

	const search = async () => {
		const {authenticatedUser} = state;
		const {location: {coordinates: authenticatedUserCoordinates}} = authenticatedUser;
    const queryCoordinates = coordinates.length? coordinates: authenticatedUserCoordinates;
		try {
			const {data: searchResult = []} = await axios(
				url,
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					params: {
						page,
						size
					},
					data: JSON.stringify({
						coordinates : queryCoordinates,
						query,
						proximity: `${authenticatedUserCoordinates[0]},${authenticatedUserCoordinates[1]}`
					})
				}
			);
			if (pushResults) {
				updateMeals([...meals, ...searchResult]);
			} else {
				updateMeals(searchResult);
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
      if(isActive) {
        search();
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
						<Message firstText="Un instant nous recherchons des plats"/>
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
								data={meals}
								keyExtractor={(item, index) => `${item.id}-${index}`}
								renderItem={({item}) => (
									<MealItem meal={item} displayMeal={displayMeal}/>
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
