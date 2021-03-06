import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Message from '../../../components/messages/Message';
import {ApplicationContext} from '../../../context/ApplicationContextProvider';
import {colors, globalStyles} from '../../../utils';
import AdItem from '../../../components/ad-item/adItem';
import {SecurityContext} from '../../../context/SecurityContextProvider';
import SearchEmpty from '../ads/SearchEmpty';

function SearchScreen({route, navigation}) {
	const [favorites, setFavorites] = useState([]);
	const {
		updateSelectedItemId
	} = useContext(ApplicationContext);

	const {protectedAxios} = useContext(SecurityContext);
	const [isLoading, setIsloading] = useState(true);

	const displayAd = (id: string) => {
		updateSelectedItemId(id);
		navigation.push("ad-detail", {selectedId: id});
	}

	const search = async () => {
		try {
			const {data = []} = await protectedAxios.get(`favorites`);
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
		<SafeAreaView style={{flex: 1}}>
			{isLoading ?
				(
					<View style={[globalStyles.container, {justifyContent: 'center'}]}>
						<Message firstText="Un instant nous recherchons des annonces"/>
					</View>
				)
				: (
					<View style={{flex: 1}}>
						<Text style={styles.title}>Vos favoris</Text>
						<SafeAreaView style={[globalStyles.container]}>
							<FlatList
								contentContainerStyle={styles.searchResultsContainer}
								scrollEventThrottle={150}
								onEndReachedThreshold={2}
								data={favorites}
								keyExtractor={(item, index) => `${item.id}-${index}`}
								renderItem={({item}) => (
									<AdItem ad={item} displayAd={displayAd}/>
								)}
								ListEmptyComponent={<SearchEmpty/>}
							/>
						</SafeAreaView>
					</View>
				)}
		</SafeAreaView>);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},
	searchResultsContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	title: {
		backgroundColor: colors.warningLight,
		color: colors.primary,
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 50,
		paddingHorizontal: 10,
		paddingBottom: 0
	}
});
export default SearchScreen;
