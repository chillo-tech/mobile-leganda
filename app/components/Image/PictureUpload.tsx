import {AntDesign} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, {useContext, useEffect} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ApplicationContext} from '../../context/ApplicationContextProvider';
import {NB_MAX_IMAGES} from '../../utils/options';
import {colors} from '../../utils/Styles';


const PictureUpload = () => {
	const {updateMeal, meal: {pictures = []}} = useContext<any>(ApplicationContext);

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			updateMeal({
				goToNextStep: false,
				data: {
					pictures: [...pictures, {
						id: Date.now(),
						name: Date.now(),
						uri: result.uri,
						type: 'image/jpg'
					}]
				}
			})
		}
	};
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				style={[styles.button, pictures.length === NB_MAX_IMAGES ? styles.disabled : styles.active]}
				onPress={pickImage} disabled={pictures.length === NB_MAX_IMAGES}>
				<AntDesign name="camera" size={48}
						   color={pictures.length === NB_MAX_IMAGES ? colors.gray : colors.warning}/>
				<Text style={[styles.buttonText, pictures.length === NB_MAX_IMAGES ? styles.disabled : styles.active]}>Ajouter
					une image</Text>
			</TouchableOpacity>
		</View>
	)
}

export default PictureUpload

const styles = StyleSheet.create({
	container: {
		backgroundColor: `${colors.white}`,
	},
	button: {
		backgroundColor: `${colors.white}`,
		alignItems: 'center',
		borderRadius: 5,
		borderStyle: 'dashed',
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 160
	},
	active: {
		borderColor: `${colors.warning}`,
		color: `${colors.warning}`,
	},
	disabled: {
		borderColor: `${colors.gray}`,
		color: `${colors.gray}`
	},
	buttonText: {
		fontWeight: 'bold'
	}
})
