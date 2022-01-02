import React, {useContext, useState} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import {ApplicationContext} from '../context/ApplicationContextProvider';
import MealItem from '../components/mealItem/MealItem';
import {BACKOFFICE_URL, MEALS_ENDPOINT} from '../utils/Endpoints';
import axios from 'axios';
import {globalStyles} from '../utils/Styles';
import {useFocusEffect} from '@react-navigation/native';
import Message from '../components/messages/Message';
import MealSearch from '../components/MealWizard/MealSearch';
import SearchEmpty from './meals/SearchEmpty';

function SearchScreen({route, navigation}) {
	const url = `${BACKOFFICE_URL}/${MEALS_ENDPOINT}/search`;
	const {state: {searchCriteria, meals}, updateMeals, updateSelectedItemId, updateSearchCriteria} = useContext(ApplicationContext);
	const {query, pushResults, page, size, address: {coordinates: {coordinates}}} = searchCriteria;
	const [isLoading, setIsloading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh =() => {
		updateSearchCriteria({pushResults: false});
		setRefreshing(true);
	};

	const displayMeal = (id: string) => {
		updateSelectedItemId(id);
		navigation.push("MealDetail", {selectedId: id});
	}

	const search =  React.useCallback(async(caller) => {
		try {
			console.log({caller, searchCriteria})
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
					data: JSON.stringify({coordinates, query})
				}
			);
			setIsloading(false);
			setRefreshing(false);

			if (pushResults) {
				updateMeals([...meals, ...searchResult]);
			} else {
				updateMeals(searchResult);
			}
		} catch (e) {
			setIsloading(false);
			updateSearchCriteria({pushResults: false});
		}
	}, [searchCriteria])

	const fetchMore = () => {
		updateSearchCriteria({pushResults: true, page: (page+1)});
	};

	React.useLayoutEffect(
		() => {
			search("useFocusEffect");
		}
	,[searchCriteria]);
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
						<MealSearch navigation={navigation} route={route}/>
						<SafeAreaView style={[globalStyles.container]}>
							<FlatList
								contentContainerStyle={styles.searchResultsContainer}
								scrollEventThrottle={150}
								onEndReachedThreshold={0.8}
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
