import {AntDesign} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, {useEffect, useRef} from 'react';
import {Platform, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {IMAGES_CONFIG, NB_MAX_IMAGES} from '../../utils/options';
import {colors} from '../../utils/Styles';
import PicturePicker from './PicturePicker';


const PictureUpload = ({pictures, handleSelectedImage}) => {
	const ref = useRef({current: {}});
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

	const openModal = () => {
		ref.current.open();
	}

	const handleSelectedItem = async (item) => {
    try {
      ref.current.close();
      const result = item === "CAMERA" ? await ImagePicker.launchCameraAsync(IMAGES_CONFIG) : await ImagePicker.launchImageLibraryAsync(IMAGES_CONFIG);
      console.log({result});
      
      if (!result.cancelled) {
        const selectedImageData = {
          ...result,
          id: Date.now(),
          name: Date.now()
        }
        handleSelectedImage(selectedImageData);
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
	
	}

	return (
		<View style={[styles.container]}>
			<TouchableHighlight
				underlayColor={'trabsparent'}
				style={[styles.button, pictures.length === NB_MAX_IMAGES ? styles.disabled : styles.active]}
				onPress={openModal} disabled={pictures.length === NB_MAX_IMAGES}>
				<>
					<AntDesign name="camera" size={48}
							   color={pictures.length === NB_MAX_IMAGES ? colors.lightgray : colors.warning}/>
					<Text
						style={[styles.buttonText, pictures.length === NB_MAX_IMAGES ? styles.disabled : styles.active]}>
						Ajouter une image
					</Text>
				</>
			</TouchableHighlight>
			<PicturePicker ref={ref} onItemSelected={handleSelectedItem}/>
		</View>
	)
}

export default PictureUpload;

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
		borderColor: `${colors.lightgray}`,
		color: `${colors.lightgray}`
	},
	buttonText: {
		fontWeight: 'bold'
	}
})
