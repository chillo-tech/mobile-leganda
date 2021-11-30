import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors, globalStyles} from '../../utils/Styles';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import BottomBar from '../tabs/BottomBar';
import * as FileSystem from 'expo-file-system';
import PictureUpload from '../Image/PictureUpload';
import PictureDisplay from '../Image/PictureDisplay';

function MealPictures() {
	const {stepIndex, previousStep, updateMeal, meal, deleteMealImage} = useContext(ApplicationContext);
	const [isCOnverting, setIsConverting] = useState(false);
	const [error, setError] = useState(null);
	const onSubmit = async () => {
		if (meal.pictures && meal.pictures.length) {
			setIsConverting(true);
			const {pictures} = meal;
			const mappedPictures = await Promise.all(pictures.map(async (picture) => {
				const base64 = await FileSystem.readAsStringAsync(picture.uri, {encoding: 'base64'});
				return {...picture, base64};
			}));
			setError(null);
			updateMeal({data: {pictures: mappedPictures}, goToNextStep: true});
			return () => setIsConverting(false);
		} else {
			setError("Veuilez ajouter des images de votre plat");
		}
	}

	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Veuillez ajouter, </Text>
				<Text style={globalStyles.creationTitle}>une image de votre plat </Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent, {paddingVertical: 30}]}>
					{(meal.pictures && meal.pictures.length)
						? (<SafeAreaView style={styles.pictures}>
							<FlatList
								keyExtractor={image => image.id}
								data={meal.pictures}
								horizontal={false}
								numColumns={1}
								renderItem={({item, index, separators}) => (
									<View style={[styles.item]}>
										<PictureDisplay picture={item} onDeletePressed={deleteMealImage}
														editable={true}/>
									</View>
								)}
							/>
						</SafeAreaView>)
						: (<PictureUpload/>)
					}
					{error && !(meal.pictures && meal.pictures.length) ? (
						<Text style={styles.errorsText}>{error}</Text>) : null}
				</View>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!(meal.pictures && meal.pictures.length)}
					previousStep={previousStep}
					nextStep={onSubmit}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		height: '100%',
		justifyContent: 'space-between'
	},
	errorsText: {
		color: colors.error,
		borderWidth: 1,
		borderColor: colors.error,
		paddingVertical: 40,
		borderRadius: 5,
		fontSize: 18,
		textAlign: 'center',
		overflow: 'hidden'
	},
	pictures: {},
	item: {
		backgroundColor: colors.warning,
		marginVertical: 5,
		height: 380,
		borderRadius: 5,
		overflow: 'hidden'
	},
	itemMarginLeft: {
		marginLeft: "2%"
	}
})
export default MealPictures;
