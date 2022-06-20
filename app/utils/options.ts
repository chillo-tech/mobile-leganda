import * as ImagePicker from 'expo-image-picker';

export const HEADER_OPTIONS = {
	title: "LE GANDA",
	headerStyle: {
		backgroundColor: '#ffffff',
	},
	headerTintColor: '#f4511e',
	headerTitleStyle: {
		fontWeight: 'bold',
	},
}

export const NB_MAX_IMAGES = 4;

export const IMAGES_CONFIG = {
	mediaTypes: ImagePicker.MediaTypeOptions.Images,
	base64: true,
	allowsEditing: true,
	aspect: [4, 3],
	quality: 1,
}
