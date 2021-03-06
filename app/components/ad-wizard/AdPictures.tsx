import React, {useContext, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {colors, globalStyles} from '../../utils';
import PictureDisplay from '../Image/PictureDisplay';
import PictureUpload from '../Image/PictureUpload';
import BottomBar from '../tabs/BottomBar';

function AdPictures() {
	const {state: {creationWizard: {stepIndex, ad}}, updateAd, previousStep} = useContext(ApplicationContext);
	const [pictures, setPictures] = useState(ad.pictures);
	const [error, setError] = useState('');
	const onSubmit = async () => {
		if (pictures && pictures.length) {
			updateAd({infos: {pictures}})
		} else {
			setError("Veuilez ajouter des images de votre plat");
		}
	}
	const onImageSelected = (picture) => {
		setPictures(current => ([...current, picture]));
	}
	const deleteAdImage = (id: number) => {
		setPictures(pictures.filter(item => item.id !== id))
	}
	return (
		<View style={globalStyles.creationContainer}>
			<View style={globalStyles.creationHeader}>
				<Text style={globalStyles.creationTitle}>Veuillez ajouter, </Text>
				<Text style={globalStyles.creationTitle}>une image</Text>
			</View>
			<View style={globalStyles.creationBody}>
				<View
					style={[globalStyles.creationBodyContent, {paddingVertical: 30}]}>
					{(pictures && pictures.length)
						? (<SafeAreaView style={styles.pictures}>
							<FlatList
								keyExtractor={image => image.id}
								data={pictures}
								horizontal={false}
								numColumns={1}
								renderItem={({item, index, separators}) => (
									<View style={[styles.item]}>
										<PictureDisplay picture={item} onDeletePressed={deleteAdImage}
														editable={true}/>
									</View>
								)}
							/>
						</SafeAreaView>)
						: (<PictureUpload pictures={pictures} handleSelectedImage={onImageSelected}/>)
					}
					{error && !(pictures && pictures.length) ? (
						<Text style={styles.errorsText}>{error}</Text>) : null}
				</View>
				<BottomBar
					stepIndex={stepIndex}
					nextDisabled={!(pictures && pictures.length)}
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
export default AdPictures;
