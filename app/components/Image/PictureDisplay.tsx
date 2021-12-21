import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { colors } from '../../utils/Styles';

const getUri = (picture: Picture) => {  
	if (picture && picture.uri)
		return picture.uri.replace("http://localhost:27191/images", "http://192.168.1.11:27191/images");

	if (picture && picture.base64)
		return `data:image/png;base64,${picture.base64}`;
}

function PictureDisplay({picture = null, editable = false, onDeletePressed = () => null}) {
	const source = {uri: `${getUri(picture)}`};
	return (
		<View style={styles.container}>
			<Image style={styles.picture} resizeMode="cover" source={source}/>
			{editable
			&& (
				<TouchableHighlight style={[styles.delete]}
									onPress={() => onDeletePressed(picture.id)}>
					<Text style={styles.deleteText}>X</Text>
				</TouchableHighlight>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		overflow: 'hidden',
		width: "100%",
	},
	delete: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 5,
		top: 5,
		width: 30,
		height: 30,
		backgroundColor: colors.white,
		borderRadius: 50,
		textAlign: 'center'
	},
	deleteText: {
		color: colors.error,
		fontWeight: "bold",
		fontSize: 20
	},
	picture: {
		width: "100%",
		height: "100%",
	},
	overlay: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: colors.error,
		zIndex: 3
	}
})
export default PictureDisplay;
