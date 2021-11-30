import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, TouchableHighlight, View} from 'react-native';
import {ApplicationContext} from '../context/ApplicationContextProvider';
import MealItem from '../components/mealItem/MealItem';
import {BACKOFFICE_URL, MEALS_ENDPOINT} from '../utils/Endpoints';
import axios from 'axios';
import {colors, globalStyles} from '../utils/Styles';
import {useFocusEffect} from '@react-navigation/native';
import Message from '../components/Components/Message';

function SearchScreen({route, navigation}) {
	const {updateMeals, setSelectedId} = useContext(ApplicationContext);
	const [isLoading, setIsloading] = useState(true);
	const [meals, setMeals] = useState([]);
	const url = `${BACKOFFICE_URL}/${MEALS_ENDPOINT}`;
	const displayMeal = (id: string) => {
		setSelectedId(id);
		navigation.push("MealDetail", {selectedId: id});
	}
	const search = async () => {
		try {
			const {data} = await axios(
				url,
				{

					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				}
			);
			setMeals(data);
			setIsloading(false);
			updateMeals(data);
		} catch (e) {
			setIsloading(false);
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			search();
		}, [route])
	);

	return (
		isLoading ?
			(
				<View style={[globalStyles.container, {justifyContent: 'center'}]}>
					<Message firstText="Un instant nous recherchons des plats"/>
				</View>
			)
			: (
				<View style={{flex: 1}}>
					<SafeAreaView style={[globalStyles.container, styles.container]}>
						<FlatList
							data={meals}
							renderItem={({item}) => (
								<TouchableHighlight style={styles.item} underlayColor={'transparent'}
													onPress={() => displayMeal(item.id)}>
									<MealItem meal={item}/>
								</TouchableHighlight>
							)}
							keyExtractor={item => item.id}
						/>
					</SafeAreaView>
				</View>
			));
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 5
	},
	defaultText: {
		color: colors.primary,
		fontSize: 20
	}
})
export default SearchScreen;
